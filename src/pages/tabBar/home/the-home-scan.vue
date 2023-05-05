<script>
export default {
	name: "the-home-app",
	data() {
		return {
		
		};
	},
	methods: {
		openScan(){
			uni.scanCode({
				onlyFromCamera: true,
				success: function (res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
				}
			});
		}
	},
	mounted() {
	},
};
</script>
