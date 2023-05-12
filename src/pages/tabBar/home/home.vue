<template>
    <view class="u-flex-column" style="height: 100%">
        <u-overlay :show="show">
            <the-check-company :duration="400" :opacity="0.3" :z-index="999" class="rect" @close="show = false"
                               @tap.stop/>
        </u-overlay>
        <x-navbar>
            <view slot="left" @click="openScan">
                <u-icon name="scan" size="20"/>
            </view>

            <view slot="title" class="u-flex-row u-flex-start">
                <view class=" x-ellipsis" @click="showCheckCompany">
                    {{ company.checkCompany.name }}
                </view>
                <u-icon v-show="showSelect" name="arrow-down" size="20"/>
            </view>
        </x-navbar>

        <view class="u-flex-fill u-flex-column x-page" style="padding: 5px">
            <!-- 将内容区域包裹在容器元素内 -->
            <view class="count-card">
                <view class="u-flex u-flex-row u-flex-between">
                    <view class="">设备总数:
                        <u-count-to :duration="2000" :endVal="statistics.device_total" :startVal="0" :useEasing="false"
                                    fontSize="14"/>
                    </view>
                    <view class="">火警设备:
                        <u-count-to :duration="2000" :endVal="statistics.count_alarm_device" :startVal="0"
                                    :useEasing="false"
                                    fontSize="14"/>
                    </view>
                    <view class="">故障设备:
                        <u-count-to :duration="2000" :endVal="statistics.count_fault_device" :startVal="0"
                                    :useEasing="false"
                                    fontSize="14"/>
                    </view>
                </view>
            </view>
		        
            <view :scroll-x="true" class="app-card">
                <view v-for="(item, index) in appList" v-if="getShowAppStatus(item)" :key="index" class="app-card-item"
                      @click="navicatPath(item)">
                    <u-icon :label="item.label" :name="item.icon" color="#2c70b4" labelPos="bottom" labelSize="12" size="38"></u-icon>
                </view>
            </view>
            <u-sticky :offsetTop="10">
                <u-subsection :current="curStatusCategory" :list="status_category_list" mode="button"
                              @change="changeStatusCategory"/>
            </u-sticky>

            <scroll-view :enable-back-to-top="true" :refresher-triggered="device_loading"
                         :scroll-top="scrollTop" :scroll-y="true" class="device-card u-flex-fill"
                         @scroll="scroll" @scrolltolower="loadMore">
                <view v-for="(item,index) in deviceData.list" :key="index" class="device-cell" @click="toInfo(item)">
                    <u-divider :text="item.info_device.name" textPosition="left"></u-divider>
                    <view class="u-flex u-flex-row">
                        <view class="text" style="-webkit-flex: 1;flex: 1;">
                            <view class="">编号 {{ item.info_device.thing_id }}</view>
                            <view class="">位置 {{ item.info_device.specific }}</view>
                            <view class="">{{ item.info_device.last_active_time }}</view>
                        </view>
                        <view class="text" style="width: 100rpx;">
                            <u-icon :color="item.info_device.enum_device_online_status.status == '在线'?'#5ac725':''"
                                    :label="item.label"
                                    :name="item.info_device.enum_device_online_status.status == '在线'?'wifi':'wifi-off'"
                                    labelPos="bottom" labelSize="12" size="38"></u-icon>
                        </view>
                    </view>
                </view>
                <u-divider v-if="deviceData.list.length >=10"
                           :text="`点击这里返回顶部 共${deviceData.total }条，已加载${deviceData.list.length}条`"
                           style="height: 10px" @tap="goTop"></u-divider>
                <u-empty v-if="!deviceData.list || deviceData.list.length === 0" mode="data"/>
            </scroll-view>

        </view>
    </view>
</template>

<script>
import TheHomeCard from "@/pages/tabBar/home/the-home-card.vue";
import TheHomeDevice from "@/pages/tabBar/home/the-home-device.vue";
import TheHomeApp from "@/pages/tabBar/home/the-home-app.vue";
import TheHomeScan from "@/pages/tabBar/home/the-home-scan.vue";
import TheCheckCompany from "@/pages/tabBar/home/the-check-company.vue";
import {dateUtils} from "@/common/js/util.js"

export default {
	mixins: [TheHomeCard, TheHomeDevice, TheHomeApp, TheHomeScan,],
	components: {TheCheckCompany},
	data() {
		return {
			company: uni.$x.localStorage.getStore("company"),
			userInfo: uni.$x.localStorage.getStore("userInfo"),
			show: false,
		};
	},
	computed: {
		showSelect() {
			return this.company.type !== "info_company_cared"
		}
	},
	watch: {
		company() {
			uni.$emit("barTitle", this.company.checkCompany.name);
		},
	},
	methods: {
		showCheckCompany() {
			if (this.showSelect) this.show = !this.show
		},
		loadOn() {
			let that = this;
			uni.$on("switchCompany", (data) => {
				console.log("监听到事件来自 switchCompany ，携带参数 msg 为：" + data);
				that.$x.localStorage.setStore("company", data);
				that.company = data;
				this.show = false;
				that.get_card_count()
				// 初始化设备
				that.initLoad()
			});
		},
	},
	mounted() {
		this.loadOn()
	},
	
};
</script>

<style lang="scss" scoped>
.count-card {
  min-height: 30px;
}

.app-card {
  white-space: nowrap;
  height: 80px;
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  align-items: center;

  .app-card-item {
    flex: none;
    display: inline-block;
    height: 100%;
    width: 70px;
    padding: 4px;
    box-sizing: border-box;
    border-radius: 4px;
    margin: 4px;
  }
}

.device-card {
  height: 100%;
	padding: 10px;
	box-sizing: border-box;
  .device-cell {
    background: #FFFFFF;
    box-shadow: $uni-shadow-base;
    min-height: 110px;
    margin-bottom: 6px;
    padding: 5px;
    border-radius: 8px;
  }
}

@keyframes shadow-inset-center {
  0% {
    box-shadow: inset 0 0 0 0 transparent
  }
  100% {
    box-shadow: inset 0 0 14px 0 rgba(0, 0, 0, .5)
  }
}

.rect {
  width: 100%;
  height: 100%;
  animation: shadow-inset-center .4s cubic-bezier(.25, .46, .45, .94) both
}


</style>
