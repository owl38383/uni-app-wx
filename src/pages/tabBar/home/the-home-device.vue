<script>
export default {
	name: "the-home-device",
	data() {
		return {
			status_category_list: [
				{
					name: "火警",
					type: "alarm",
					icon: "custom-icon-alarm",
					color: "#fa3534",
				},
				{
					name: "故障",
					type: "fault",
					icon: "custom-icon-guzhang-guzhangliebiao u-bold",
					color: "#ff9900",
				},
				{
					name: "异常",
					type: "abnormal",
					icon: "custom-icon-tishifill",
					color: "#0084ff",
				},
				// {
				//   name: '动作',
				//   type: 'operation',
				//   icon: 'custom-icon-dongzuo',
				//   color: '#0084ff',
				// }
			],
			deviceData: {
				total: 0,
				list: [],
			},
			device_list_params: {
				page_no: 0,
				page_size: 10,
				status_category: "",
			},
			curStatusCategory: -1,
			scrollTop: 0,
			old: {
				scrollTop: 0
			}
		};
	},
	watch: {
		curStatusCategory() {
			this.device_list_params.status_category = this.status_category_list[this.curStatusCategory].type;
			this.initLoad()
		}
	},
	methods: {
		// 默认加载
		initLoad(){
			this.deviceData = {
				total: 0,
				list: [],
			}
			this.device_list_params.page_no = 0;
			this.get_device_list();
		},
		get_device_list() {
			uni.$x.api
				.get_device_list_by_any_ids(this.device_list_params)
				.then((res) => {
					let oldList = this.deviceData.list
					this.deviceData.list = oldList.concat(res.list);
					this.deviceData.total = res.total;
				});
		},
		toInfo(item){
			uni.navigateTo({
				url:`/pages_sub/device/device_info?device_id=${item.info_device.thing_id}&device_type=${item.info_device.thing_type}`
			})
		},
		// 改变状态
		changeStatusCategory(e) {
			uni.$u.throttle(() => {
				this.curStatusCategory = e
				// this.curStatusCategory = e.index
			}, 1000);
		},
		// 下拉刷新
		refresherPulling(){
			this.initLoad()
		},
		// 加载更多
		loadMore() {
			uni.$u.throttle(() => {
				this.device_list_params.page_no = (this.device_list_params.page_no + 1)
				this.get_device_list()
			}, 1000);
		},
		scroll(e) {
			this.old.scrollTop = e.detail.scrollTop
		},
		// 回到顶部
		goTop(e) {
			// 解决view层不同步的问题
			this.scrollTop = this.old.scrollTop
			this.$nextTick(function () {
				this.scrollTop = 0
			});
		},
	},
	mounted() {
		// 用watch 属性加载数据
		this.curStatusCategory = 0;
	},
};
</script>
