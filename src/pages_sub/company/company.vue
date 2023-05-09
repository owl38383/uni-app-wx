<template>
    <view class="x-page x-padding-10">
        <u-skeleton :loading="loading" :rowsHeight="120" :title="false" rows="10">
            <u-form v-if="!loading" labelPosition="left" labelWidth='120'>
                <u-form-item label="单位名称">
                    <text class="u-info">{{ company_info.info_company.company_name }}</text>
                </u-form-item>
                <u-form-item label="单位地址">
                    <text class="u-info">{{ company_info.info_company.company_address }}</text>
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

import {loadingStatus} from "@/common/js/decorator";

export default {
	data() {
		return {
			company: uni.$x.localStorage.getStore("company"),
			company_info: {},
			loading: true,
		}
	},
	methods: {
		// @loadingStatus('loading')
		get_company_info() {
			let params = {}
			return uni.$x.api.get_company_cared().then(res => {
				console.log(res)
				this.company_info = res
			})
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
