<template>
    <view class="u-flex-column" style="height: 100vh">
        <view class="u-flex-fill">
            <map id="mapUser" ref="mapUser" :show-location="true" style="width: 100%; height: 100%"/>
        </view>
        <view class="u-flex-column" style="height: 200px">当前位置信息:
            <view>坐标 {{ curGeo.latitude }} , {{ curGeo.longitude }}</view>
            <view>速度 {{ curGeo.speed }}</view>
            <view>精确度 {{ curGeo.accuracy }}</view>
            <view>高度 {{ curGeo.altitude }}</view>
            <view>地址信息 {{ curGeo.address }}</view>
        </view>
    </view>
</template>

<script>
export default {
	data() {
		return {
			aMap: {},
			appMap: {},
			latitude: 0,
			longitude: 0,
			user_geo: [],
			user_polyline: [],
			curGeo: {},
			curGeoInterval: '',
		}
	},
	computed: {},
	methods: {
		getCurLocation() {
			return new Promise(resolve => {
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: result => {
						this.curGeo = result
						this.aMap.moveToLocation({longitude: result.longitude, latitude: result.latitude})
						resolve(result)
					}
				})
			})
		}
	},
	onReady() {
		let aMap = uni.createMapContext("mapUser", this)
		let appMap = aMap.$getAppMap()
		this.aMap = aMap;
		this.appMap = appMap;
	},
	onHide() {
		clearInterval(this.curGeoInterval)
	},
	onLoad() {
		let user_info = uni.$x.localStorage.getStore("userInfo");
		let user_id = user_info.user_id
		this.getCurLocation()
		this.curGeoInterval = setInterval(() => {
			this.getCurLocation()
		}, 3000)
		// uni.getLocation({
		// 	success:(res)=>{
		// 		uni.openLocation({
		// 			...res,
		// 			success: function () {
		// 				console.log('success');
		// 			}
		// 		});
		// 	}
		// })
		// aMap.addMarkers(uni.$x.localStorage.getStore("user_geo_" + user_id) || [])
		// this.getLocation()
		
		// this.user_polyline = uni.$x.localStorage.getStore("user_polyline_" + user_id) || []
		// this.user_geo = uni.$x.localStorage.getStore("user_geo_" + user_id) || []
	}
}
</script>

<style lang="scss" scoped>

::v-deep .amap-logo {
  opacity: 0 !important;
}

::v-deep .amap-copyright {
  opacity: 0 !important;
}
</style>
