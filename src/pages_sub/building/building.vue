<template>
    <view>

    </view>
</template>

<script>
export default {
	data() {
		return {
			buildingData: {}
		}
	},
	methods: {
		get_building_list() {
			uni.$x.api.get_building_list().then(res => {
				console.log(res)
				this.buildingData = res;
			})
		}
	},
	onLoad(){
		this.get_building_list()
	}
}
</script>

<style scoped>

</style>
