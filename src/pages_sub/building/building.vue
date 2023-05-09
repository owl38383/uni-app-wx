<template>
    <view>
        <view class="building-list">
            <u-skeleton :loading="loading" :rowsHeight="120" :title="false" rows="10" rowsWidth="100%">
                <view v-for="item in buildingData.list" v-if="!loading" :key="item.info_building.building_id"
                      class="building-card-cell"
                      @click="toInfo(item)">
                    <u-divider :text="item.info_building.building_name" textPosition="left"></u-divider>

                    <view class="u-flex u-flex-row">
                        <view class="text u-flex-fill">
                            <view class="">编号 {{ item.info_building.building_id }}</view>
                            <view class="">位置 {{ item.info_location.address }}</view>
                        </view>
                        <view class="text">
                            {{ item.info_building.enum_building_type.name }}
                        </view>
                    </view>
                </view>
                <u-divider v-if="buildingData.list"
                           :text="`共${buildingData.total }条，已加载${buildingData.list.length}条`"
                           style="height: 10px" @tap="goTop"></u-divider>

                <u-divider v-if="buildingData.list && buildingData.list.length >=10"
                           :text="`点击这里返回顶部`"
                           style="height: 10px" @tap="goTop"></u-divider>

                <u-empty v-if="!buildingData.list || buildingData.list.length === 0" mode="data"/>
            </u-skeleton>
        </view>
    </view>
</template>

<script>

export default {
	mixins: [uni.$x.pageMixins],
	data() {
		return {
			buildingData: {
				total: 0,
				list: [],
			},
			vPage: {
				page_no: 0,
				page_size: 10,
			},
		}
	},
	methods: {
		toInfo() {
		
		},
		// 默认加载
		async initLoad() {
			this.buildingData = {
				total: 0,
				list: [],
			}
			this.vPage.page_no = 0;
			this.loading = true;
			await this.get_building_list();
			this.loading = false;
			
		},
		// @loadingStatus('loading')
		get_building_list() {
			return uni.$x.api.get_building_list().then(res => {
				let oldList = this.buildingData.list
				this.buildingData.list = oldList.concat(res.list);
				this.buildingData.total = res.total;
			})
		},
		loadMore() {
			uni.$u.throttle(() => {
				this.vPage.page_no = (this.vPage.page_no + 1)
				this.get_building_list()
			}, 1000);
		},
	},
	onLoad() {
		this.initLoad()
	}
}
</script>

<style lang="scss" scoped>
.building-list {
  height: 100%;
}

.building-card-cell {
  min-height: 110px;
  margin: 8px 10px 0 10px;
  padding: 5px;
  border-radius: 8px;
  border: $uni-border-3 2px solid;
  background: $uni-bg-color;
  box-shadow: $uni-shadow-base;
}
</style>
