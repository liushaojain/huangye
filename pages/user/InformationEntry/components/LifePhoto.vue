<template>
	<view>
		<view class="uploadBox">
			<!-- <u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1"> -->
				<view class="imgUpload">
					<view class="imgList">
						<image class="img" :src="imgBaseUrl+'Maskgroup_setInfo@2x.png'" mode="widthFix"></image>
					</view>
					<text class="mt10">照片越多，缘分越多</text>
				</view>

			<!-- </u-upload> -->
			
			
			<view class="footer">
				<view class="txtCenter mb10">以下照片不能通过审核</view>
				<view class="imgList">
					<image class="img" :src="imgBaseUrl+'Group1000010716@2x.png'" mode="widthFix"></image>
					<image class="img" :src="imgBaseUrl+'Group1000010715@2x.png'" mode="widthFix"></image>
					<image class="img" :src="imgBaseUrl+'Group1000010717@2x.png'" mode="widthFix"></image>
					<image class="img" :src="imgBaseUrl+'Group1000010718@2x.png'" mode="widthFix"></image>
				</view>
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="12">
					<button class="uploadBtn">去相册选择</button>
				</u-upload>
				
			</view>
		</view>

	</view>

</template>

<script>
	import {basehost} from "@/utils/util.js"
	export default {
		data() {
			return {
				imgBaseUrl: this.imgBaseUrl,
				fileList1: []
			}
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
				}
			},
			uploadFilePromise(url) {
				console.log(url)
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: basehost+'api/member/uploadPhoto', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.imgUpload {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		color: #666666;
		.imgList{
			display: flex;
			.img{
				height: 136rpx;
				width: 136rpx;
				margin-right: 16rpx;
				&:nth-child(4){
					margin-right: 0;
				}
			}
		}
	}
	.uploadBox{
		margin: 0 36rpx;
		background: white;
		border-radius: 28rpx;
		padding: 42rpx;
	}
	
	.footer{
		margin-top: 124rpx;
		.imgList{
			display: flex;
			.img{
				height: 136rpx;
				width: 136rpx;
				margin-right: 16rpx;
				&:nth-child(4){
					margin-right: 0;
				}
			}
		}
	}
	.uploadBtn{
		width: 514rpx;
		height: 68rpx;
		line-height: 68rpx;
		background: rgba(255,65,105,0.08);
		border-radius: 200rpx;
		border: 2rpx solid #FF4169;
		color: #FF4169;
		font-size: 28rpx;
		margin-top: 60rpx;
	}
</style>
<style lang="scss">

</style>