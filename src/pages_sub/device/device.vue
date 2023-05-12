<template>
    <view class="x-page">
        <view class="device-list">
            <u-skeleton :loading="loading" :rowsHeight="110" :title="false" rows="12" rowsWidth="100%">
                <view v-for="(item,index) in deviceData.list" :key="index" class="device-card-cell "
                      @click="toInfo(item)">
                    <u-divider :text="item.info_device.name" textPosition="left"></u-divider>

                    <view class="u-flex u-flex-row">
                        <view class="text u-flex-fill">
                            <view class="">编号 {{ item.info_device.thing_id }}</view>
                            <view class="">位置 {{ item.info_device.specific }}</view>
                        </view>
                        <view class="text">
                            {{ item.info_device.enum_device_online_status.status }}
                        </view>
                    </view>
                </view>
                <u-divider :text="`共${deviceData.total }条，已加载${deviceData.list.length}条`"
                           style="height: 10px">
                </u-divider>

                <view v-if="deviceData.list && deviceData.list.length >=10"
                      style="height: 10px;align-items: center;" @tap="goTop">点击这里返回顶部
                </view>
                <u-empty v-if="!deviceData.list || deviceData.list.length === 0" mode="data"/>
            </u-skeleton>
        </view>
    </view>
</template>

<script>


export default {
	mixins: [uni.$x.pageMixins],
	data() {
		return {
			deviceData: {
				total: 0,
				list: [],
			},
			vPage: {
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
		// 默认加载
		async initLoad() {
			this.deviceData = {
				total: 0,
				list: [],
			}
			this.vPage.page_no = 0;
			this.loading = true
			await this.get_device_list();
			this.loading = false
		},
		// @loadingStatus('loading')
		get_device_list() {
			return uni.$x.api.get_device_list_by_any_ids(this.vPage).then(res => {
				let oldList = this.deviceData.list
				this.deviceData.list = oldList.concat(res.list);
				this.deviceData.total = res.total;
			})
		},
		toInfo(item) {
			uni.navigateTo({
				url: `/pages_sub/device/device_info?device_id=${item.info_device.thing_id}&device_type=${item.info_device.thing_type}`
			})
		},
		loadMore() {
			uni.$u.throttle(() => {
				this.vPage.page_no = (this.vPage.page_no + 1)
				this.get_device_list()
			}, 1000);
		},
	},
	onLoad(option) {
		console.log(option.device_thing_type); //打印出上个页面传递的参数。
		this.vPage.device_thing_type = option.device_thing_type;
		uni.$emit("barTitle", option.title);
		this.initLoad();
	}
}
</script>

<style lang="scss" scoped>

.device-list {
  height: 100%;
}

.device-card-cell {
  min-height: 110px;
  margin: 8px 10px 0 10px;
  padding: 5px;
  border-radius: 8px;
  background: $uni-bg-color;
  box-shadow: 1px 2px 4px #6297d5;
  transition: all 0.3s;
  animation: dynamics 20s ease infinite;
  -webkit-animation: dynamics 20s ease infinite;
  -moz-animation: dynamics 20s ease infinite;
  cursor: pointer;
}
</style>
