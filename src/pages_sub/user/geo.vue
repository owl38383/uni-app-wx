<template>
    <view>
        <map ref="mapUser" id="mapUser" style="width: 600px; height: 600px;" :show-location="true">
        </map>
        {{ user_geo }}
    </view>
</template>

<script>
export default {
	data() {
		return {
			aMap: {},
			latitude: 0,
			longitude: 0,
			user_geo: [],
			user_polyline: []
		}
	},
	computed: {},
	methods: {},
	onShow() {
		let user_info = uni.$x.localStorage.getStore("userInfo");
		let user_id = user_info.user_id
		let aMap = uni.createMapContext("mapUser", this)
		this.aMap = aMap.$getAppMap;
 
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

<style scoped>

</style>
