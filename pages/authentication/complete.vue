<template>
	<view class="container" :style="{'padding-top': statusBarHeight+'px'}">
		<view class="content">
			<image class="img" :src="imgBaseUrl+'Group_754@2x.png'" mode=""></image>
			<view class="text1">
				资料提交成功
			</view>
			<view class="text2">
				我们将会尽快为你审核
			</view>
		</view>
		<view class="footer">
			<button class="confirmBtn" @click="complete">确定</button>
		</view>
	</view>
</template>

<script>
	
	export default {
		data(){
			return {
				imgBaseUrl: this.imgBaseUrl
			}
		},
		components:{
		},
		onShow() {
		},
		methods:{
			complete(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	$bg-image-url: 'http://47.119.182.138:89/images/';
	page{
		background: #FAF5F8;
	}
	.content{
		width: 678rpx;
		height: 620rpx;
		margin: auto;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 8rpx 0rpx rgba(0,0,0,0.06);
		border-radius: 28rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		top: 306rpx;
		.img{
			width: 378rpx;
			height: 298rpx;
		}
		.text1{
			font-size: 36rpx;
			font-weight: 600;
		}
		.text2{
			font-size: 28rpx;
			color: #999999;
			margin-top: 8rpx;
		}
	}
	.container{
		background: url($bg-image-url+'Maskgroupuser@2x.png') no-repeat;
		background-color: #FAF5F8;
		background-size: inherit;
		padding-bottom: 150rpx;
	}
	.hintImg{
		padding: 44rpx 0 78rpx 0;
		text-align: center;
		.img{
			width: 490rpx;
			height: 32rpx;
		}
	}
	.footer{
		padding: 36rpx;
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		justify-content: space-between;
		align-items: center;
		z-index: 99;
		.confirmBtn{
			width: 100%;
			height: 76rpx;
			line-height: 76rpx;
			background: linear-gradient( 271deg, #F5496D 0%, #FF7592 100%);
			border-radius: 200rpx;
			border: none;
			color: white;
			font-size: 32rpx;
			margin: 0;
		}
		.infoListPage{
			display: flex;
			.item{
				width: 14rpx;
				height: 14rpx;
				background: #E4E4E4;
				border-radius: 0rpx 0rpx 0rpx 0rpx;
				margin-right: 28rpx;
				border-radius: 50%;
				&.active{
					background: #FD6C8A;
				}
			}
		}
	}
	.content{
		margin: 0 36rpx;
		margin-bottom: 20rpx;
	}
</style>