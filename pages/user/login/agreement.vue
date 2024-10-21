<template>
	<view class="vcLicense">
		<rich-text :nodes="html"></rich-text>
		<button @tap="back()">我已阅读并同意</button>
	</view>
</template>

<script>
	import productApi from "@/store/product/index.js"
	export default {
		data(){
			return {
				html:''
			}
		},
		onLoad() {
			this.$request(productApi.diyGoodsLicense,"","POST","",1).then(res=>{
				this.html=res.data;
			})
		},
		methods:{
			back(){
				var pages = getCurrentPages();
				var prevPage = pages[pages.length - 2]; //上一个页面
				 //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
				// 上一个页面最后设置userdata
				prevPage.setData({
					userdata: {
						'vcLicense':true
					}
				})
				uni.navigateBack({//返回
					delta: 1
				})				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vcLicense{
		padding:0 30rpx 130rpx 30rpx;
		button{
			position: fixed;
			bottom: 20rpx;
			left: 30rpx;
			right: 30rpx;
			height: 88rpx;
			line-height: 88rpx;
			background: #1F90FF;
			color: white;
			font-size: 30rpx;
		}
	}
</style>
