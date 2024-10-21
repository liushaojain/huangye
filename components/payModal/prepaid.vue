<template>
	<view class="">
		<view class="hc-password-modal" v-if="isPasswordShow">
			<view class="hc-password-con">
				<view class="hc-title">
					<text></text>
					<text class="hc-text">请输入支付密码</text>
					<text class="hc-icon iconfont icon-guanbi" @click="close"></text>
				</view>
				<view class="hc-con">
					<view class="hc-tips">应付款</view>
					<view class="hc-deposit">
						<text>¥</text>
						{{moneyFormat(payPrice)}}
					</view>
					<view class="hc-password">
						<input class="weui-input" password type="text" placeholder="请输入密码" v-model="payPassword" />
					</view>
					<view class="hc-btn" @click="confirmPay">立即付款</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		moneyFormat
	} from "@/utils/util.js"
	import designApi from '@/store/design/index.js'
	export default {
		props: ['orderNo', 'payPrice', 'isFlag'],
		data() {
			return {
				isPasswordShow: false,
				payPassword: '',
				userInfo: {}
			}
		},
		methods: {
			moneyFormat,
			open() {
				this.userInfo = wx.getStorageSync('userInfo')
				this.isPasswordShow = true
			},
			close() {
				this.isPasswordShow = false
				if (!this.isFlag) {
					uni.navigateTo({
						url: `/pages/user/order/detail?orderId=${this.orderNo}&status=0&fromPage=confirmOrder`
					})
				}
			},
			// 预存款输入密码确认支付
			confirmPay() {
				if (this.payPassword == '') {
					wx.showToast({
						title: '请输入支付密码',
						icon: 'none'
					})
					return
				}
				let regNum = /^[0-9]{6}$/
				if (!regNum.test(this.payPassword)) {
					wx.showToast({
						title: '支付密码错误',
						icon: 'none'
					})
					return
				}
				this.$emit('sendPassword', this.payPassword)
			}
		}
	}
</script>

<style lang="scss">
	.hc-password-modal {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba($color: #000, $alpha: 0.5);
		z-index: 100;

		.hc-password-con {
			width: 70%;
			background: #fff;
			min-height: 200rpx;
			position: absolute;
			left: 15%;
			top: 40%;
			transform: translateY(-50%);
			border-radius: 20rpx;

			.hc-title {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 20rpx;
				height: 88rpx;
				border-bottom: 1px solid #E9EBEC;

				.hc-text {
					color: #303336;
					font-size: 32rpx;
					font-weight: 600;
				}

				.hc-icon {
					color: #999;
					font-size: 26rpx;
				}
			}

			.hc-con {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0 0 40rpx;

				.hc-tips {
					line-height: 76rpx;
					color: #303336;
					font-size: 28rpx;
				}

				.hc-deposit {
					color: #303336;
					font-weight: 600;
					line-height: 80rpx;
					font-size: 64rpx;

					text {
						font-size: 44rpx;
						margin: 8rpx;
					}
				}

				.hc-password {
					width: 80%;
					margin-top: 20rpx;

					.weui-input {
						border: 1px solid #C9CBCF;
						padding: 0 20rpx;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 30rpx;
					}
				}

				.hc-btn {
					line-height: 80rpx;
					height: 80rpx;
					border-radius: 44rpx;
					width: 80%;
					text-align: center;
					margin-top: 40rpx;
					background: #F9353B;
					color: #fff;
					font-size: 30rpx;
				}
			}
		}
	}
</style>
