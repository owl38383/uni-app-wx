<script>
export default {
	name: "the-home-app",
	data() {
		return {
			appList: [
				{
					icon: "IE-circle-fill",
					label: "独立式设备",
					page: '/pages_sub/device/device?device_thing_type=info_device_dtu&title=独立式设备',
					auth: [1,2,4,6],
				},
				{
					icon: "google-circle-fill",
					label: "部件",
					page: '/pages_sub/device/device?device_thing_type=info_device_component&title=部件',
					auth: [1,2,4,6],
				},
				{
					icon: "apple-fill",
					label: "控制器",
					page: '/pages_sub/device/device?device_thing_type=info_device_controller&title=控制器',
					auth: [1,2,4,6],
				},
				{
					icon: "android-fill",
					label: "传输设备",
					page: '/pages_sub/device/device?device_thing_type=info_device_transmission&title=传输设备',
					auth: [1,2,4,6],
				},
				{
					icon: "email-fill",
					label: "建筑列表",
					page: '/pages_sub/building/building',
					auth: [1,2,4,6],
				},
				{
					icon: "weixin-circle-fill",
					label: "单位信息",
					page: '/pages_sub/company/company_info',
					auth: [2],
				},
				{
					icon: "weixin-circle-fill",
					label: "单位列表",
					page: '/pages_sub/company/company',
					auth: [1,4,6],
				},
				{
					icon: "chrome-circle-fill",
					label: "消防设置系统",
					page: '/pages_sub/device/firesystem',
					auth: [1,2,4,6],
				},
			],
		};
	},
	methods: {
		navicatPath(item) {
			uni.navigateTo({
				url: item.page
			})
		},
		getShowAppStatus(val){
			return (val.auth).includes(Number.parseInt(this.userInfo.enum_user_type.id))
		},
	},
	mounted() {
	},
};
</script>
