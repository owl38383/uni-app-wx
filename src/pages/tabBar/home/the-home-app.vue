<script>
export default {
	name: "the-home-app",
	data() {
		return {
			appList: [
				{
					icon: "car-fill",
					label: "独立式设备",
					page: '/pages_sub/device/device?device_thing_type=info_device_dtu&title=独立式设备'
				},
				{
					icon: "car-fill",
					label: "部件",
					page: '/pages_sub/device/device?device_thing_type=info_device_component&title=部件'
				},
				{
					icon: "car-fill",
					label: "控制器",
					page: '/pages_sub/device/device?device_thing_type=info_device_controller&title=控制器'
				},
				{
					icon: "car-fill",
					label: "传输设备",
					page: '/pages_sub/device/device?device_thing_type=info_device_transmission&title=传输设备'
				},
				{
					icon: "rewind-right",
					label: "建筑列表",
					page: '/pages_sub/building/building'
				},
				{
					icon: "man-delete",
					label: "单位信息",
					page: '/pages_sub/company/company'
				},
				{
					icon: "volume",
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
