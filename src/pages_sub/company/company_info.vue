<template>
    <view class="x-page x-padding-10">
        <u-skeleton :loading="loading" :rowsHeight="30" :title="false" rows="10">
            <u-form v-if="!loading" labelPosition="left" labelWidth='120'>
                <u-form-item>
                    <map :latitude="company_info.info_location.latitude"
                         :longitude="company_info.info_location.longitude"
                         :markers="[{
													 id: company_info.info_company.company_id,
													 latitude: company_info.info_location.latitude,
													 longitude: company_info.info_location.longitude,
													 iconPath:'/static/image/location.png'
												 }]"
                         style="width: 100vw;height: 200px"></map>
                </u-form-item>
                <u-form-item label="单位名称">
                    <text class="u-info">{{ company_info.info_company.company_name }}</text>
                </u-form-item>
                <u-form-item label="单位类别">
                    <text class="u-info">{{ company_info.info_company.enum_company_type.name }}</text>
                </u-form-item>
                <u-form-item label="所属区域">
                    <text class="u-info">{{ company_info.info_company.company_region }}</text>
                </u-form-item>
                <u-form-item label="单位地址">
                    <text class="u-info">{{ company_info.info_company.company_address }}</text>
                </u-form-item>
                <u-form-item label="联网状态">
                    <text class="u-info">{{ company_info.info_company_cared.enum_networking_status.name }}</text>
                </u-form-item>
                <u-form-item label="成立时间">
                    <text class="u-info">{{ company_info.info_company.setup_time }}</text>
                </u-form-item>
                <u-form-item label="单位占地面积（㎡）">
                    <text class="u-info">{{ company_info.info_company_cared.site_area }}</text>
                </u-form-item>
                <u-form-item label="总建筑面积（㎡）">
                    <text class="u-info">{{ company_info.info_company_cared.building_area }}</text>
                </u-form-item>
                <u-form-item label="联系电话">
                    <text class="u-info">{{ company_info.info_company.contact_phone }}</text>
                </u-form-item>
                <u-form-item label="组织机构代码">
                    <text class="u-info">{{ company_info.info_company.company_code }}</text>
                </u-form-item>
                <u-form-item label="入网日期">
                    <text class="u-info">{{ company_info.info_company.networking_time }}</text>
                </u-form-item>
                <u-form-item label="上级主管单位名称">
                    <text class="u-info">{{ company_info.info_company_cared.dominate_company_name }}</text>
                </u-form-item>
                <u-form-item label="管辖单位名称">
                    <text class="u-info">{{ company_info.info_company_cared.dominate_company_name }}</text>
                </u-form-item>
                <u-form-item label="所属中心">
                    <text class="u-info">{{ company_info.info_company_cared.center_name }}</text>
                </u-form-item>
                <u-form-item label="职工总人数">
                    <text class="u-info">{{ company_info.info_company.staff_total }}</text>
                </u-form-item>
                <u-form-item label="消防控制室电话">
                    <text class="u-info">{{ company_info.info_company_cared.control_room_phone }}</text>
                </u-form-item>
                <u-form-item label="消防安全责任人姓名">
                    <text class="u-info">{{ company_info.info_company_cared.safety_responsibility_name }}</text>
                </u-form-item>
                <u-form-item label="消防安全责任人电话">
                    <text class="u-info">{{ company_info.info_company_cared.safety_responsibility_phone }}</text>
                </u-form-item>
                <u-form-item label="消防安全责任人电话">
                    <text class="u-info">{{ company_info.info_company_cared.safety_responsibility_phone }}</text>
                </u-form-item>
                <u-form-item label="单位坐标">
                    <text class="u-info">
                        {{ company_info.info_location.latitude }}, {{ company_info.info_location.longitude }}
                    </text>
                </u-form-item>
            </u-form>
        </u-skeleton>
    </view>
</template>

<script>

export default {
	data() {
		return {
			company: uni.$x.localStorage.getStore("company"),
			company_info: {},
			loading: true,
			vPage: {
				company_id: ''
			}
		}
	},
	methods: {
		async initData() {
			this.loading = true;
			await this.get_company_info()
			this.loading = false;
		},
		get_company_info() {
			return uni.$x.api.get_company_cared(this.vPage).then(res => {
				console.log(res)
				this.company_info = res
			})
		}
	},
	onLoad(option) {
		console.log('device_info接收到上个页面的msg', JSON.stringify(option)); //打印出上个页面传递的参数。
		if (Object.keys(option).length > 0) {
			this.vPage.company_id = option.company_id;
			this.initData()
		} else if (this.company.checkCompany.type === 'info_company_cared') {
			this.initData()
		} else {
			uni.showToast({
				title: '当前只允许查看联网单位详情',
				icon: "none",
				mask: true
			})
			let back = setTimeout(() => {
				uni.navigateBack({
					delta: 1,//返回层数，2则上上页
				})
				clearTimeout(back)
			}, 1000)
			
		}
	}
}
</script>

<style scoped>

</style>
