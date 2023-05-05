<script>
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
			uni.$on("logout", function (data) {
				console.log("监听到事件来自 logout ，携带参数 msg 为：" + data);
				uni.$x.localStorage.removeStore("userInfo");
				uni.$x.localStorage.removeStore("is_login");
				uni.reLaunch({
					url: "/pages/loading/loading",
				});
			});
			
			uni.$on("server_info", function (data) {
				console.log("监听到事件来自 server_info ，携带参数 msg 为：" + data);
				
				uni.reLaunch({
					url: "/pages/loading/loading",
				});
			});
		},
		unloadOn() {
			uni.$off("logout")
			uni.$off("server_info")
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
					this.$x.UIConfig.navbarHeight = (res.platform === 'android' ? 48 : 44) + this.$x.UIConfig.statusBarHeight;
					// #endif
					// 设置导航栏高度
				},
			});
		},
		
	},
	onUnload() {
		this.unloadOn()
	},
	onLaunch: function () {
		// 开发中因为热加载会多次监听
		this.unloadOn()
		this.loadOn()
		this.$nextTick(()=>{
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
</style>
