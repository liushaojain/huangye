<template>
	<view class="container">
		<!-- <image class="loginBg" src="../../../static/img/loginBg.png" mode=""></image> -->
		<view class="content">
			<view class="item logo">
				<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
				荒野
			</view>
			<view class="item loginText">
				<image class="img" src="../../../static/img/loginText.png" mode="aspectFill"></image>
			</view>
			<view class="item text">
				真人认证 <text class="icon"></text> 真实婚姻资料认证 <text class="icon"></text> 离异再婚专属
			</view>
		</view>
		<!-- <button type="default" open-type="getPhoneNumber" @getphonenumber="decryptPhoneNumber">获取手机号</button> -->
		<button  class="weChat" @click="wxLogin">微信登录</button>
	</view>
</template>

<script>
	import apis from '@/Api/index.js';
	import {
		userStore
	} from "@/store/account/userInfo.js"
	export default {
		data() {
			return {
				Text:"weixin",
				
			}
		},
		onShow() {
		},
		onLoad() {
		},
		methods: {
			getCode(){
				return new Promise((resolve, reject) => {
					wx.login({
					  success (res) {
						return resolve(res.code)
					  },
					  fetch(res) {
					  	return reject(res)
					  }
					})
				})
			},
			async wxLogin(){
				const code = await this.getCode();
				const userInfo = await this.$apis.uesrApi.login({code});
				userStore.commit('setToken',userInfo.data.token);
				userStore.commit('setUserInfo',userInfo.data.member);
				uni.navigateTo({
					url:'/pages/user/about/index'
				})
			},
			decryptPhoneNumber(e){
				console.log(e)
			}
		}
			
		
	}
</script>

<style lang="scss">
	$bg-image-url: 'http://47.119.182.138:89/images/';
	page {
		.container{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			background-image: url($bg-image-url+'loginBg.png');
			background-size: cover;
		}
		.loginBg{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			height: 100%;
			width: 100%;
		}
		.content{
			margin-top: 358rpx;
			margin: 358rpx 80rpx 0 80rpx;
			.logo{
				font-size: 64rpx;
				.img{
					width: 110rpx;
					height: 110rpx;
					vertical-align: middle;
					margin-right: 28rpx;
				}
			}
			.loginText{
				margin: 48rpx 0 66rpx 0;
				.img{
					width: 576rpx;
					height: 41rpx;
				}
			}
			.text{
				font-size: 28rpx;
				display: flex;
				align-items: center;
				.icon{
					margin: 0 8rpx;
					background: #666666;
					display: inline-block;
					width: 8rpx;
					height: 8rpx;
					border-radius: 50%;
				}
			}
		}
		.weChat {
			position: absolute;
			left: 60rpx;
			right: 60rpx;
			bottom: 90rpx;
			width: 630rpx;
			height: 88rpx;
			border-radius: 44rpx;
			font-size: 32rpx;
			text-align: center;
			line-height: 88rpx;
			margin: auto;
			background: linear-gradient( 271deg, #F5496D 0%, #FF7592 100%);
			color: white;
			margin-top: 80rpx;
		}
	}

</style>