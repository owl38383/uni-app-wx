<template>
    <view>
        <map style="width: 100%; height: 100%;"  :markers="covers">
        </map>
        <view v-for="(item,index) in geoData" :key="index">
		        {{ item }}
        </view>
    </view>
</template>

<script>
export default {
	data() {
		return {
			geoData: [],
		}
	},
	computed:{
		covers(){
			console.log(this.geoData.flatMap(res => res[1]))
			return this.geoData.flatMap(res => res[1])
		}
	},
	methods: {},
	onLoad() {
		let user_info = uni.$x.localStorage.getStore("userInfo");
		let user_id = user_info.user_id
		this.geoData = uni.$x.localStorage.getStore("user_geo_" + user_id)
	}
}
</script>

<style scoped>

</style>
