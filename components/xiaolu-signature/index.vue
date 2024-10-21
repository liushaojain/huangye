<template>
	<view class="signa">
		<canvas class="canvas" disable-scroll="true" :style="{'width':width,'height':height}" canvas-id="designature" @touchstart="starts"
		 @touchmove="moves" @touchend="end"></canvas>
		 <view class="btn">
		 	<view class="cancel-btn" @click="clear">
		 		<image src="https://xpl-smallbatch.oos-gz.ctyunapi.cn/icon/cancel.png" mode="" class="iconfontImg"></image>
		 	</view>
		 	<!-- <view class="save-btn" @click="save">
		 		保存
		 	</view> -->
		 </view>
	</view>
</template>

<script>
	
	/*
	*	已兼容h5和小程序端
	* 
	*	如有问题可以加qq：122720267
	* 	里面的计算都是自己转换公式得出的，不容易啊
	*	使用该插件的朋友请给个好评，或者到git start一下
	* 
	*/
	import { userStore } from "@/store/account/userInfo.js"
	import { basehost } from "@/utils/util.js"
	export default {
		data() {
			return {
				resultUrl: '',
				dom: null,
				line: [],
				width: '100%',
				height: '280rpx',
				radius: 0,
				isMoves: false
			}
		},
		created() {
			// uni.getSystemInfo({
			// 	success: (res) => {
			// 		this.width = res.windowWidth - 50 + 'px';
			// 		this.height = res.windowHeight - 15 + 'px';
			// 	}
			// });
			this.dom = uni.createCanvasContext('designature',this);
		},
		methods: {
			end(e) {

			},
			distance(a, b) {
				let x = b.x - a.x;
				let y = b.y - a.y;
				return Math.sqrt(x * x + y * y);
			},
			starts(e) {
				this.line.push({
					points: [{
						time: new Date().getTime(),
						x: e.touches[0].x,
						y: e.touches[0].y,
						dis: 0
					}]
				})
				let currentPoint = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				this.currentPoint = currentPoint
				this.drawer(this.line[this.line.length - 1])
			},
			moves(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				this.lastPoint = this.currentPoint,
					this.currentPoint = point
				this.line[this.line.length - 1].points.push({
					time: new Date().getTime(),
					x: e.touches[0].x,
					y: e.touches[0].y,
					dis: this.distance(this.currentPoint, this.lastPoint)
				})
				this.drawer(this.line[this.line.length - 1])
				this.isMoves=true;
			},
			drawer(item) {
				let x1, x2, y1, y2, len, radius, r, cx, cy, t = 0.5,
					x, y;
				var time = 0;
				if (item.points.length > 2) {
					let lines = item.points[item.points.length - 3];
					let line = item.points[item.points.length - 2];
					let end = item.points[item.points.length - 1];
					x = line.x;
					y = line.y;
					x1 = lines.x;
					y1 = lines.y;
					x2 = end.x;
					y2 = end.y;
					var dis = 0;
					time = (line.time - lines.time) + (end.time - line.time)
					dis = line.dis + lines.dis + end.dis;
					var dom = this.dom;
					var or = Math.min(time / dis * this.linePressure + this.lineMin, this.lineMax);
					cx = (x - (Math.pow(1 - t, 2) * x1) - Math.pow(t, 2) * x2) / (2 * t * (1 - t))
					cy = (y - (Math.pow(1 - t, 2) * y1) - Math.pow(t, 2) * y2) / (2 * t * (1 - t))
					dom.setLineCap('round')
					dom.beginPath();
					dom.setStrokeStyle('black')
					dom.setLineWidth(5)
					dom.moveTo(x1, y1);
					dom.quadraticCurveTo(cx, cy, x2, y2);
					
					dom.stroke();
					dom.draw(true)
				}

			},
			clear() {
				this.dom.clearRect(0, 0, 1000, 1000)
				this.dom.draw();
				
				this.isMoves=false;
			},
			save() {
				if(!this.isMoves){
					uni.showToast({
						icon: "none",
						title: "请手写签名"
					})
					return false
				}
				const _self = this;
				uni.canvasToTempFilePath({
					canvasId: 'designature',
					fileType: 'png',
					quality: 1, //图片质量
					success:function(res) {
						_self.filesShow = false
						const uploadTask = uni.uploadFile({
							url: `${basehost}upload/put`,
							filePath: res.tempFilePath,
							name: 'file',
							header: {
								'Authorization': 'Bearer ' + userStore.state.token
							},
							success: function(res) {
								let resData = JSON.parse(res.data)
								_self.$emit('getImg',resData.data)
							}
						});
					},
					fail(e){
					}
				},this)
			}
		}
	}
</script>

<style scoped lang="scss">
	.signa {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		overflow: hidden;
		background-color: #fbfbfb;
		width: 100%;
		height: 320rpx;
		.canvas {
			width: 100%;
			background-color: #F4F5F6;;
			position: absolute;
			z-index: 100;
		}
		.btn {
			height: 32rpx;
			width: 32rpx;
			bottom: 10rpx;
			right: 10rpx;
			position: absolute;
			z-index: 1000;
			font-size: 32rpx;
			margin-top:10rpx;
			.iconfontImg{
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				height: 32rpx;
				width: 32rpx;
				z-index: 1000;
			}
			
			.cancel-btn {
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				top: 0;
				height: 32rpx;
				width: 32rpx;
				z-index: 10000;
			}

			// .save-btn {
			// 	position: absolute;
			// 	z-index: 999;
			// 	display: inline-flex;
			// 	margin-top: 67vh;
			// 	margin-left: -21vh;
			// 	transform: rotate(90deg);
			// 	background: #A91F52;
			// 	width: 42vh;
			// 	left: 50rpx;
			// 	border-radius: 3px;
			// 	border: 1rpx solid #A91F52;
			// 	color: #fff;
			// 	height: 65rpx;
			// 	line-height: 65rpx;
			// 	text-align: center;
			// 	justify-content: center;
			// }
		}
	}
</style>
