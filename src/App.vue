<script>
import {WebSocketClient} from "@/common/js/WebSocketClient";

export default {
	globalData: {
		loading: false,
	},
	watch: {
		loading() {
			uni.showLoading(this.loading);
		},
	},
	methods: {
		loadOn() {
			let _that = this;
			// 登出服务
			uni.$on("logout", function (data) {
				console.log("监听到事件来自 logout ，携带参数 msg 为：" + data);
				_that.logout()
			});
			// 判定zeus服务信息不存在 重新加载
			uni.$on("server_info", function (data) {
				console.log("监听到事件来自 server_info ，携带参数 msg 为：" + data);
				uni.reLaunch({
					url: "/pages/loading/loading",
				});
			});
			// 上传人员定位
			uni.$on("upload_geo", (data) => {
				console.log("监听到事件来自 upload_geo ，携带参数 msg 为：" + data);
				_that.upload_geo(data)
			});
			// 连接socket
			uni.$on("client_socket", (data) => {
				console.log("监听到事件来自 client_socket ，携带参数 msg 为：" + data);
				_that.clientWebSocket()
			})
		},
		unloadOn() {
			uni.$off("logout")
			uni.$off("server_info")
			uni.$off("upload_geo")
			uni.$off("client_socket")
		},
		
		// 获取系统信息
		getSystemInfo() {
			uni.getSystemInfo({
				success: (res) => {
					// 设置状态栏高度
					this.$x.UIConfig.statusBarHeight = res.statusBarHeight || 0;
					
					// #ifdef MP-WEIXIN
					// 获取菜单按钮栏高度
					let custom = uni.getMenuButtonBoundingClientRect()
					this.$x.UIConfig.navbarHeight = custom.height + 10
					this.$x.UIConfig.navRight = custom.right - custom.left
					// #endif
					
					// #ifndef MP-WEIXIN
					this.$x.UIConfig.navbarHeight = (res.platform === 'android' ? 48 : 44);
					// #endif
					// 设置导航栏高度
				},
			});
		},
		logout() {
			uni.$x.localStorage.removeStore("userInfo");
			uni.$x.localStorage.removeStore("is_login");
			uni.reLaunch({
				url: "/pages/loading/loading",
			});
		},
		upload_geo(data) {
			let params = {
				type: 'wgs84',
				geocode: true,
			}
			let user_info = uni.$x.localStorage.getStore("userInfo");
			let user_id = user_info.user_id
			let geo_key = "user_geo_" + user_id;
			let polyline_key = "user_polyline_" + user_id;
			let geoArray = uni.$x.localStorage.getStore(geo_key) || []
			let polylineArray = uni.$x.localStorage.getStore(polyline_key) || []
			setInterval(() => {
				uni.getLocation(params).then(res => {
					let params = {
						uploadTime: Date.now(),
						id: Date.now(),
						iconPath: 'https://a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
						latitude: res[1].latitude + Math.random() / 1000,
						longitude: res[1].longitude - Math.random() / 1000
					}
					geoArray.push([params])
					polylineArray.push({points: [{latitude: params.latitude, longitude: params.longitude}], color: '#0542a4'})
					uni.$x.localStorage.setStore(geo_key, geoArray)
					uni.$x.localStorage.setStore(polyline_key, polylineArray)
				});
			}, 3000)
		},
		clientWebSocket() {
			let u_type = 'h'
			// #ifdef APP-PLUS
			 u_type = uni.getSystemInfoSync().platform === 'ios' ? 'i' : 'a'
			// #endif
			
			// #ifndef APP-PLUS
			u_type = 'w'
			// #endif
			
			let user_info = uni.$x.localStorage.getStore("userInfo");
			let user_id = user_info.user_id
			let user_message = uni.$x.localStorage.getStore(`msg_${user_id}`) || [];
			const client = new WebSocketClient(uni.$x.zeusConfig.getWsUrl() + `/wss/cannon?pid=119&uid=${user_id}&utype=${u_type}`);
			client.connect();
			client.onmessage = (event) => {
				const message = event.data;
				user_message.push(message)
				console.log('WebSocket收到消息:', message);
				
				// 处理消息内容
				const parsedMessage = JSON.parse(message);
				console.log('解析后的消息:', parsedMessage);
				
				// 发送回复消息
				const replyMessage = { type: 'reply', content: '收到消息' };
				client.send(JSON.stringify(replyMessage));
			};
		}
	},
	onUnload() {
		this.unloadOn()
	},
	onLaunch: function () {
		// 开发中因为热加载会多次监听
		this.unloadOn()
		this.loadOn()
		// 初始化 就获取导航栏信息 一次性计算避免抖动
		this.$nextTick(() => {
			this.getSystemInfo();
		})
		console.log("App Launch");
	},
	onShow: function () {
		console.log("App Show");
	},
	onHide: function () {
		console.log("App Hide");
	},
};
</script>

<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";
@import "@/uni_modules/uni-scss/index.scss";
@import "@/common/css/common.scss";
@import "@/common/css/flex.scss";
@import "@/common/font/iconfont.css";

//去除地图图标
::v-deep .amap-logo {
  opacity: 0 !important;
}

::v-deep .amap-copyright {
  opacity: 0 !important;
}
</style>
