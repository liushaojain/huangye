<template>
	<view class="vcLicense">
		<view class="detailDesc">
			<rich-text :nodes="html"></rich-text>
		</view>
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
		onLoad(e) {
			this.$request(productApi.userLicense,"","POST","",1).then(res=>{
				this.html=res.data;
			})
		},
		methods:{
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
		.detailDesc{			
			/deep/ view {
				color: inherit;
			}
		}
	}
	.wxParser-span,.MsoNormal{
		display: none;
	}
</style>
