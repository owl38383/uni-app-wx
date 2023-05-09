<script>
export default {
	name: "the-home-app",
	data() {
		return {
			appList: [
				{
					icon: "IE-circle-fill",
					label: "独立式设备",
					page: '/pages_sub/device/device?device_thing_type=info_device_dtu&title=独立式设备'
				},
				{
					icon: "google-circle-fill",
					label: "部件",
					page: '/pages_sub/device/device?device_thing_type=info_device_component&title=部件'
				},
				{
					icon: "apple-fill",
					label: "控制器",
					page: '/pages_sub/device/device?device_thing_type=info_device_controller&title=控制器'
				},
				{
					icon: "android-fill",
					label: "传输设备",
					page: '/pages_sub/device/device?device_thing_type=info_device_transmission&title=传输设备'
				},
				{
					icon: "email-fill",
					label: "建筑列表",
					page: '/pages_sub/building/building'
				},
				{
					icon: "weixin-circle-fill",
					label: "单位信息",
					page: '/pages_sub/company/company'
				},
				{
					icon: "chrome-circle-fill",
					label: "系统管理",
					page: ''
				},
			],
		};
	},
	methods: {
		navicatPath(item) {
			uni.navigateTo({
				url: item.page
			})
		}
	},
	mounted() {
	},
};
</script>
