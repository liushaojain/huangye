<template>
	<view class="paySuccess">
		<image :src="baseImg+'icon_chenggong@2x.png'" mode=""></image>
		<view class="status">支付成功</view>
		<view class="price">
			￥ <text>{{moneyFormat(orderAmount)}}</text>
		</view>
		<view class="btnGroup">
			<navigator class="goOrder" url="/pages/user/order/index?type=1">查看订单</navigator>
			<navigator class="goHome" url="/pages/home/index" open-type="switchTab">回到首页</navigator>
		</view>
	</view>
</template>
	
<script>
	import {moneyFormat} from '@/utils/util.js'
	export default {
		data(){
			return {
				baseImg: this.imgBaseUrl,
				orderAmount: ''
			}
		},
		onLoad(e) {
			this.orderAmount = e.orderAmount;
		},
		onUnload() {
			uni.switchTab({
				url:"/pages/home/index"
			})
		},
		methods:{
			moneyFormat
		}
	}
</script>

<style lang="scss">
	page{
		background: #F5F5F5;
	}
	.paySuccess{
		padding-top: 200rpx;
		text-align: center;
		image{
			width: 160rpx;
			height: 160rpx;
		}
		.status{
			padding-top: 40rpx;
			color: #666666;
			font-size: 30rpx;
		}
		.price{
			font-size: 32rpx;
			padding-top: 30rpx;
			color: #F9353B;
			text{
				font-size: 48rpx;
			}
		}
		.btnGroup{
			margin-top: 150rpx;
			display: flex;
			justify-content: center;
			navigator{
				width: 240rpx;
				height: 80rpx;
				line-height: 80rpx;
				background: #E6E6E6;
				border-radius: 40rpx;
				margin: 0 20rpx;
				&.goOrder{
					color: #666666;
					background-color: #E6E6E6;
				}
				&.goHome{
					color: #FFFFFF;
					background-color: #F9353B;
				}
			}
		}
	}
</style>