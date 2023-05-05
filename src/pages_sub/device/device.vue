<template>
    <view>
        <view class="device-list">
            <u-skeleton :loading="loading" :rowsHeight="120" :title="false" rows="10">
                <view v-for="item in deviceData.list" :key="item.info_device.thing_id" class="device-card-cell"
                      @click="toInfo(item)">
                    <u-divider :text="item.info_device.name" textPosition="left"></u-divider>

                    <view class="u-flex u-flex-row">
                        <view class="text" style="-webkit-flex: 1;flex: 1;">
                            <view class="">编号 {{ item.info_device.thing_id }}</view>
                            <view class="">位置 {{ item.info_device.specific }}</view>
                        </view>
                        <view class="text" style="width: 100rpx;">
                            {{ item.info_device.enum_device_online_status.status }}
                        </view>
                    </view>
                </view>
                <u-empty v-if="!deviceData.list || deviceData.list.length === 0" mode="data"/>
            </u-skeleton>
        </view>
    </view>
</template>

<script>

export default {
	data() {
		return {
			loading: false,
			deviceData: {},
			vPage: {
				status: 'loadmore',
				page_no: 0,
				page_size: 10,
				building_id: null,
				floor_id: null,
				area_id: null,
				device_thing_type: null,
				enum_device_status: null,
				enum_device_model: null,
				enum_device_online_status: null
			},
		}
	},
	methods: {
		get_device_list() {
			this.loading = true;
			uni.$x.api.get_device_list_by_any_ids(this.vPage).then(res => {
				this.deviceData = res;
			}).finally(() => this.loading = false)
		},
		toInfo(item) {
			uni.navigateTo({
				url: `/pages_sub/device/device_info?device_id=${item.info_device.thing_id}&device_type=${item.info_device.thing_type}`
			})
		}
	},
	onLoad(option) {
		console.log(option.device_thing_type); //打印出上个页面传递的参数。
		this.vPage.device_thing_type = option.device_thing_type;
		uni.$emit("barTitle", option.title);
		this.get_device_list()
	}
}
</script>

<style lang="scss" scoped>
.device-list {
  height: 100%;
}

.device-card-cell {
  background: rgba(211, 208, 208, 0.51);
  min-height: 110px;
  margin: 8px 10px 0 10px;
  padding: 5px;
  border-radius: 8px;
}
</style>
