<template>
    <view class="x-page">
        <u-skeleton :loading="loading" :rowsHeight="120" :title="false" rows="10">
		        <view class="u-flex-row">
				        {{company_info.info_company.company_name}}
				        {{company_info.info_company.company_address}}
				        {{company_info.info_location.address}}
				        {{company_info.info_location.latitude}}
				        {{company_info.info_location.longitude}}
		        </view>
        </u-skeleton>
    </view>
</template>

<script>

export default {
	data() {
		return {
			company: uni.$x.localStorage.getStore("company"),
			company_info: {},
			loading: false,
		}
	},
	methods: {
		get_company_info() {
			this.loading = true;
			let params = {}
			uni.$x.api.get_company_cared().then(res => {
				console.log(res)
				this.company_info = res
			}).finally(() => this.loading = false)
		}
	},
	onLoad() {
		if (this.company.checkCompany.type === 'info_company_cared') {
			this.get_company_info()
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
