<template>
    <view class="map-canvas" @click="showMax">
        <canvas :ref="canvasId" :canvas-id="canvasId" :style="style" type="2d" @tap="onTap"></canvas>
    </view>
</template>

<script>
export default {
	props: {
		mapUrl: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		points: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			canvasId: 'map-canvas',
			canvasWidth: 0,
			canvasHeight: 0,
			ctx: null,
			style: {}
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.initCanvas();
		})
	},
	methods: {
		showMax() {
			uni.previewImage({
				urls: [this.mapUrl]
			})
		},
		async initCanvas() {
			let size = this.$refs[this.canvasId].$el
			this.canvasHeight = size?.offsetHeight || 300
			this.canvasWidth = size?.offsetWidth || 225
			this.style = {
				height: this.canvasHeight,
				width: this.canvasWidth
			}
			const canvas = uni.createCanvasContext(this.canvasId, this)
			this.ctx = canvas
			if (this.ctx) {
				await this.loadImage();
				await this.loadText();
				this.ctx.draw(false, (res) => {
					console.log(res)
				})
			}
		},
		
		loadImage() {
			let _that = this;
			return new Promise(resolve => {
				uni.getImageInfo({
					src: _that.mapUrl,
					// src: 'https://api.likepoems.com/img/bing',
					success: (res) => {
						let scale = Math.min(_that.canvasWidth / res.width, _that.canvasHeight / res.height);
						let x = (this.canvasWidth / 2) - (res.width / 2) * scale;
						let y = (this.canvasHeight / 2) - (res.height / 2) * scale;
						_that.ctx.drawImage(res.path, x, y, res.width * scale, res.height * scale);
						_that.drawPoints();
						resolve()
					},
				});
			})
		},
		loadText() {
			return new Promise(resolve => {
				this.ctx.fillText(this.text, 0, 16)
				this.ctx.setFontSize(48)
				resolve()
			})
		},
		drawPoints() {
			if (!this.ctx) {
				return;
			}
			this.points.forEach((point) => {
				this.ctx.beginPath();
				this.ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
				this.ctx.fillStyle = '#0071c2';
				this.ctx.fill();
			});
		},
		onTap(event) {
			const x = event.detail.x;
			const y = event.detail.y;
			this.points.push({x, y});
			this.drawPoints();
		},
		onChange(event) {
			console.log(event)
		},
		onScroll(event) {
			console.log(event)
		}
	}
};
</script>

<style scoped>
.map-canvas {
    width: 100%;
    height: 100%;
    min-width: 300px;
    min-height: 225px;
    background: #414141;
    padding: 10px;
    box-sizing: border-box;
}
</style>
