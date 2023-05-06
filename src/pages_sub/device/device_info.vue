<template>
    <view class="u-flex-column x-padding-10">
        <u-skeleton :loading="loading" :rowsHeight="30" :title="false" rows="20">
            <u-form v-if="!loading" labelPosition="left" labelWidth='120'>
                <u-form-item>
                    <u-image :src="device_info.info_file_storage.hostname+device_info.info_file_storage.absolute_path"/>
                </u-form-item>

                <u-form-item label="历史告警">
                    <u-button color="#3DA5F1" size="small" text="查看" @click="toEvent"></u-button>
                </u-form-item>
                <u-form-item label="设备ID">
                    <text class="u-info">{{ device_info.info_device.thing_id }}</text>
                </u-form-item>
                <u-form-item label="安装位置">
                    <text class="u-info" style="color:rgba(109, 95, 253,1)">
                        {{ device_info.info_device.specific }}
                    </text>
                </u-form-item>
                <u-form-item label="设备分类">
                    <text class="u-info">{{ device_info.info_device.enum_device_class.name }}
                    </text>
                </u-form-item>
                <u-form-item label="设备类型">
                    <text class="u-info">{{ device_info.info_device.enum_device_type.name }}
                    </text>
                </u-form-item>
                <u-form-item label="设备型号">
                    <text class="u-info">{{ device_info.info_device.enum_device_model.name }}</text>
                </u-form-item>
                <u-form-item label="设备名称">
                    <text class="u-info">{{ device_info.info_device.name }}</text>
                </u-form-item>
                <u-form-item label="联网状态">
                    <text class="u-info">{{ device_info.info_device.enum_device_online_status.status }}</text>
                </u-form-item>
                <u-form-item label="设备状态">
                    <text class="u-info">{{ device_info.info_device.enum_device_status.name }}</text>
                </u-form-item>
                <u-form-item label="所属系统">
                    <text class="u-info">{{ device_info.info_system.alias_system_name }}
                    </text>
                </u-form-item>
                <u-form-item label="所属单位">
                    <text class="u-info">{{ device_info.info_company.company_name }}
                    </text>
                </u-form-item>
                <u-form-item label="所属建筑">
                    <text class="u-info">{{ device_info.info_building.building_name }}
                    </text>
                </u-form-item>
                <u-form-item label="所属楼层">
                    <text class="u-info">{{ device_info.info_floor.name }}</text>
                </u-form-item>
                <u-form-item label="所属区域">
                    <text class="u-info">{{ device_info.info_area.area_name }}</text>
                </u-form-item>
                <u-form-item label="安装位置">
                    <text class="u-info">{{ device_info.info_device.specific }}</text>
                </u-form-item>
                <u-form-item label="安装时间">
                    <text class="u-info">{{ device_info.info_device.install_time }}</text>
                </u-form-item>
                <u-form-item label="生产厂家">
                    <text class="u-info">{{ device_info.info_device.enum_device_model.manufacturer }}</text>
                </u-form-item>
                <u-form-item label="入网时间">
                    <text class="u-info">{{ device_info.info_device.networking_date }}</text>
                </u-form-item>
                <u-form-item label="最新活跃时间">
                    <text class="u-info">{{ device_info.info_device.last_active_time }}</text>
                </u-form-item>
                <u-form-item v-for="(item,index) in device_info.info_sense" :key="index" :label="item.sense_type_name">
                    <text class="u-info">
                        {{ item.latest_analog }} {{ item.enum_analog_type.unit }}
                    </text>
                </u-form-item>
            </u-form>
        </u-skeleton>
    </view>
</template>

<script>

import UImage from "@/uni_modules/uview-ui/components/u--image/u--image.vue";
import { loadingStatus, loggingDecorator} from "@/common/js/decorator";

export default {
	name: 'device_info',
	components: {UImage},
	data() {
		return {
			info_params: {
				device_id: '',
				device_type: '',
			},
			device_info: {
				info_device: {}
			},
			loading: false,
		}
	},
	methods: {
		@loadingStatus("loading")
			@loggingDecorator()
		 get_info() {
			return  uni.$x.api.get_device_info(this.info_params).then(res => {
				this.device_info = res;
			})
		},
		toEvent() {
		
		}
	},
	onLoad(option) {
		console.log('device_info接收到上个页面的msg', option); //打印出上个页面传递的参数。
		this.info_params.device_id = option.device_id;
		this.info_params.device_type = option.device_type;
		if (option.device_id && option.device_type) {
			this.get_info()
		} else {
			uni.showToast({
				title: '信息不存在',
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
