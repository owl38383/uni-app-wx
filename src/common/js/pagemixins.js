module.exports = {
	data() {
		return {
			loading: true,
		}
	},
	
	methods: {
		goTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});
		},
	},
	
	// 触底函数
	onReachBottom() {
		console.log('触底了');
		this.loadMore()
	},
	// 下拉函数
	async onPullDownRefresh() {
		await this.initLoad()
		uni.stopPullDownRefresh()
	},
	
}
