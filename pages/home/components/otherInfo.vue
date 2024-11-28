<template>
	<u-popup :show="show" mode="center"  @close="close" @open="open" >
		<view class="popUp">
			<view class="title">
				认证信息
			</view>
			<view class="content">
				<view class="contentTop">
					为了给大家创造一个真实安全优质的单身交友平台，每个人都需要完成实名和婚姻双重认证，所有认证人工审核，已经累计拒绝了50%以上的用户。
				</view>
				<view class="userInfo">
					<view class="userInfoLeft">
						<image class="img" src="../../../static/img/logo.png" mode=""></image>
						<text class="name ft32">来自星星</text>						
					</view>
					<view class="userInfoRight">
						<view class="pinkFont ft36">93%</view>
						<view class="ft28">可信度</view>
					</view>
				</view>
				
				<view class="infoItem flex-between">
					<view class="itemLeft">
						<image class="img" :src="imgBaseUrl+'Maskgroup_3@2x.png'" mode="aspectFill"></image>
						实名认证
					</view>
					<view class="itemRight">
						<image class="img" :src="imgBaseUrl+'Group_1@2x.png'" mode="aspectFill"></image>
						<text>已认证</text>
					</view>
				</view>
				<view class="infoItem flex-between">
					<view class="itemLeft">
						<image class="img" :src="imgBaseUrl+'Maskgroup_2@2x.png'" mode="aspectFill"></image>
						离婚认证
					</view>
					<view class="itemRight">
						<image class="img" :src="imgBaseUrl+'Group_1@2x.png'" mode="aspectFill"></image>
						<text>已认证</text>
					</view>
				</view>
			</view>
			<view class="hint">
				认证信息为平台用户自主填写，平台不保证真实性
			</view>
			<button class="closeBtn" @click="closePopup">关闭</button>
		</view>
	</u-popup>
</template>

<script>
	import { EventBus } from './eventBus.js';
	export default {
		data(){
			return {
				show: false,
				imgBaseUrl: this.imgBaseUrl,
			}
		},
		created() {
			EventBus.$on('message-event', (data) => {
				console.log(data)
				this.show = true;
			});
		},
		methods:{
			open(){
				
			},
			close() {
				
			},
			closePopup(){
				this.show = false;
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.popUp{
		width: 670rpx;
		padding: 40rpx 60rpx;
		
		.title{
			text-align: center;
			font-size: 36rpx;
			padding-bottom: 32rpx;
		}
	}
	.contentTop{
		font-size: 28rpx;
		line-height: 33rpx;
		padding-bottom: 28rpx;
	}
	.userInfo{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 56rpx;
		.img{
			height: 140rpx;
			width: 140rpx;
			margin-right: 20rpx;
		}
		.userInfoLeft{
			display: flex;
			align-items: center;
		}
		.userInfoRight{
			font-size: 36rpx;
			line-height: 46rpx;
		}
	}
	.infoItem{
		height: 86rpx;
		background: rgba(247,80,115,0.06);
		border-radius: 12rpx;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 28rpx;
		padding: 0 28rpx;
		.itemLeft{
			display: flex;
			align-items: center;
			.img{
				margin-right: 16rpx;
				height: 52rpx;
				width: 52rpx;
			}
		}
		.itemRight{
			display: flex;
			align-items: center;
			color: #F85577;
			.img{
				margin-right: 16rpx;
				height: 26rpx;
				width: 32rpx;
			}
		}
		
	}
	.hint{
		color: #999999;
		margin-top: 28rpx;
	}
	::v-deep .u-popup__content{
		border-radius: 28rpx;
	}
	.closeBtn{
		width: 566rpx;
		height: 76rpx;
		background: linear-gradient( 271deg, #F5496D 0%, #FF7592 100%);
		border-radius: 200rpx;
		border:0;
		color: white;
		line-height: 76rpx;
		font-size: 32rpx;
		margin-top: 24rpx;
	}
</style>