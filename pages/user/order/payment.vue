<template>
	<view class="pay-order-page">
		<!-- <navBar title="订单支付" v-on:goBack="goBack"></navBar> -->
		
		<view class="hreader">
			<image :src="baseImg+'payOrder.png'" mode=""></image>
			<view class="text">您的订单已创建成功，请尽快支付！</view>
		</view>
		<view class="pay-order-detail">
			<view class="title">订单信息</view>
			<view class="pay-order-item">
				<view>订单号</view>
				<view>{{orderDetail.orderId || ''}}</view>
			</view>
			<view class="pay-order-item">
				<view>收货人</view>
				<view>{{orderDetail.shipName || ''}}</view>
			</view>
			<view class="pay-order-item">
				<view>电话号码</view>
				<view>{{orderDetail.shipTel || ''}}</view>
			</view>
			<view class="pay-order-item">
				<view class="label">收货地址</view>
				<view>{{orderDetail.shipAddr || ''}}</view>
			</view>
			<view class="pay-order-item">
				<view>应付金额</view>
				<view class="redFont">¥{{moneyFormat(payMsg.orderAmount)}}</view>
			</view>
		</view>
		
		<view class="sign" v-if="isSignature==0">
			<view class="title">合同签约</view>
			<view class="signBtn">
				<text @click="sign(true)" :class="{'active':isSign}">立即签约</text>
				<text @click="sign(false)" :class="{'active':!isSign}">暂不签约</text>
			</view>
		</view>
		
		<view class="pay-type">
			<view class="pay-type-title">支付方式</view>
			<!-- 除去信用支付 -->
			<!-- <view class="pay-type-list" v-if="payMsg.memberCategory != 'A'"> -->
			<view class="pay-type-list">
				<view v-for="(item, index) in payMsg.payments" :key="index" class="pay-type-item" @click="changeItemSelect(item)">
					<view>
						<image class="imgIcon" :src="baseImg+'icon_cunkuan@2x.png'" mode="" v-if="item.payMethod == 'deposit'"></image>
						<image class="imgIcon" :src="baseImg+'icon_weixin@2x.png'" mode="" v-else-if="item.payMethod == 'wxpayjsapi'"></image>
						<image class="imgIcon" :src="baseImg+'icon_yinlian@2x.png'" mode="" v-else></image>
						<text>{{item.payMethodName}}</text>
						<text v-if="item.payMethod == 'deposit'" class="redFont">(¥{{moneyFormat(payMsg.advance)}})</text>
					</view>
					<label class="radio">
						<radio :value="item.payMethod" :checked="item.payMethod==payType" color="#1F90FF" style="transform: scale(0.7);" :disabled="!item.enabled"/>
					</label>
				</view>
			</view>
		</view>
		<view class="bank-msg" v-if="payType == 'offline'">
			<view class="bank-msg-title flex-between">
				<view>银行信息</view>
				<view class="blueFont" @click="handleCopy">复制</view>
			</view>
			<view class="bank-msg-content">
				<view class="item-content flex-between">
					<view>开户银行</view>
					<view class="flex-end itemsCenter">{{bankMsg.bankName}}</view>
				</view>
				<view class="item-content flex-between">
					<view>收款单位</view>
					<view class="flex-end itemsCenter">{{bankMsg.bankReceiver}}</view>
				</view>
				<view class="item-content flex-between">
					<view>银行账号</view>
					<view class="flex-end itemsCenter">{{bankMsg.bankNo}}</view>
				</view>
			</view>
		</view>
		<view class="pay-btn">
			<view @click="toPay">去付款</view>
		</view>
		<pre-paid ref="prepaid" :orderNo="orderId" :payPrice="payMoney" @sendPassword="handleReceivePassword" :isFlag="true"></pre-paid>
	</view>
</template>

<script>
	import api from '@/store/order/index.js'
	import {moneyFormat, getWeixinCode, toPaySuccess,checkUser} from '@/utils/util.js'
	import checkSelect from '@/components/checkselect/index.vue'
	import prePaid from '@/components/payModal/prepaid.vue'
	import navBar from "@/components/navBar/navBar.vue"
	export default{
		data(){
			return{
				orderId:'',
				orderDetail:{},
				payMsg:{
					payTypes:[],
					payPercentage: 0.5,
					curPayAmount:0,
					creditInfoResult:{}
				},
				payType:'',
				bankMsg:'',
				payMoney:0,
				itemId:'',
				providerList:[],
				baseImg: this.imgBaseUrl,
				isSign: true,
				isSignature: 0,
				isComfirmOrder: '',
				isBack: ""
			}
		},
		components:{checkSelect, prePaid,navBar},
		onUnload() {
			// if(this.isComfirmOrder){
			// 	uni.switchTab({
			// 		url:"/pages/my_design/my_design"
			// 	})
			// }
		},
		onLoad(option) {
			this.isBack = option.isBack;
			this.isComfirmOrder = option.isComfirmOrder;
			this.isSignature = option.isSignature
			this.orderId = option.orderId
			this.itemId = option.itemId
			this.getOrderDetail()
			this.getCheckoutOrderMsg()
			uni.getProvider({
				service: "payment",
				success: (e) => {
					let providerList = [];
					e.provider.map((value) => {
						switch (value) {
							case 'wxpay':
								providerList.push({
									name: '微信',
									id: value,
									loading: false
								});
								break;
							default:
								break;
						}
						this.providerList = providerList;
					})
				}
			})
		},
		methods:{
			moneyFormat,
			getWeixinCode,
			toPaySuccess,
			checkUser,
			sign(isSign){
				this.isSign = isSign;
				if(isSign){
					this.checkUser(this.orderId)
				}
			},
			changeItemSelect(item){
				if (!item.enabled) return
				this.payType = item.payMethod
				// this.getCheckoutOrderMsg(this.payMoney)
			},
			getOrderDetail(){
				this.$request(api.orderDetail, {orderId: this.orderId}, 'GET', '', 1).then(res => {
					this.orderDetail = res.data
				})
			},
			getCheckoutOrderMsg(payAmountFront){
				let params = {
					orderId: this.orderId
				}
				this.$request(api.checkoutAfterOrder, params, 'POST', '', 1).then(res => {
					this.payMsg = res.data
					this.payType = res.data.payments.filter(item => item.checked)[0].payMethod
					this.bankMsg = res.data.payments.filter(item => item.payMethod == 'offline')[0]
					this.payMoney = res.data.curPayAmount.toFixed(2)
				})
			},
			handlePayMoneyBlur(e){
				let val = e.detail.value;
				if (val > this.payMsg.curPayAmountMax) {
					this.payMoney = this.payMsg.curPayAmount.toFixed(2)
					uni.showToast({
						title:"不能大于需付款",
						icon:"none"
					})
					return
				}
				if (val.indexOf('.') > -1 && val.split('.')[1].length > 2) {
					uni.showToast({
						title:"请输入两位小数",
						icon:"none"
					})
					this.payMoney = Number(val).toFixed(2)
					return
				}
				this.payMoney = val
				this.getCheckoutOrderMsg(this.payMoney)
			},
			async toPay(){
				if(this.isSign&&this.orderDetail.isSignature==0){
					this.checkUser(this.orderId)
					return false
				}
				if (this.payMsg.setPayPassword && this.payType == 'deposit'){
					uni.navigateTo({
						url: "/pages/set/sms"
					})
					return
				}
				let params = {
					curPayAmount: this.payMoney,
					payment: this.payType,
					orderId: this.orderId
				}
				if (this.payType == 'deposit') {
					this.$refs.prepaid.open()
					return
				} else if (this.payType == 'wxpayjsapi'){
					params.code = await this.getWeixinCode()
				}
				this.$request(api.payOrder, params, 'POST', '', 1).then(response => {
					if (this.payType == 'wxpayjsapi') {
						uni.hideLoading();
						uni.requestPayment({
							provider: this.providerList[0].id,
							timeStamp: response.data.jsapiParams.timeStamp,
							paySign: response.data.jsapiParams.paySign,
							package: 'prepay_id=' + response.data.jsapiParams.prepayId,
							signType: response.data.jsapiParams.signType,
							nonceStr: response.data.jsapiParams.nonceStr,
							success: (e) => {
								uni.showToast({
									title: "支付成功!"
								})
								toPaySuccess(this.orderId, this.payMsg.orderAmount , true)
							},
							fail: (e) => {
								uni.showModal({
									content: "支付已取消",
									showCancel: false
								})
							},
							complete: () => {
								this.providerList[0].loading = false;
							}
						})
					} else {
						let that = this;
						setTimeout(function() {
							uni.showToast({
								title: response.data.payStatusMsg,
								icon:"none",
								duration: 2000,
								complete: (res)=>{
									if(that.isBack){
										uni.navigateBack({
											delta:1
										})
									}else{
										setTimeout(function() {
											uni.reLaunch({
												url:"/pages/user/order/detail?fromPage=confirmOrder&&orderId="+that.orderId,
												fail: function(res){
													console.log(res)
												}
											})
										}, 2000);
									}
								}
							})
							
						}, 200);
					}
				})
			},
			handleReceivePassword(val){
				let payParams = {
					orderId: this.orderId,
					payment: this.payType,
					payPwd: val,
					curPayAmount: this.payMsg.curPayAmount
				}
				this.$request(api.payOrder, payParams, 'POST', '', 1).then(res => {
					if (res.code == 200) {
						this.$refs.prepaid.isPasswordShow = false
						uni.showToast({
							title: "支付成功!"
						})
						toPaySuccess(this.orderId, this.payMsg.orderAmount , true)
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				})
			},
			handleCopy(){
				uni.setClipboardData({
				    data: `开户银行：${this.bankMsg.bankName};收款单位：${this.bankMsg.bankReceiver};银行账号：${this.bankMsg.bankNo}`,
				    success: function () {
				        uni.showToast({
				        	title:"复制成功"
				        })
				    }
				});
			},
			goBack(){
				var that=this;
				uni.showModal({
					title: '确定要放弃付款吗？',
					confirmText:'继续付款',
					cancelText:'放弃',
					success: function (res) {
						if (res.confirm) {
							that.toPay();
						} else if (res.cancel) {
							if(that.isComfirmOrder){
								uni.reLaunch({
									url:"/pages/user/index?toOrderList=1"
								});
							}else{
								uni.navigateBack({
									delta:2
								})
								// uni.reLaunch({
								// 	url:"/pages/user/order/index?type=1"
								// })
							}
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import './style/payment.scss'
</style>
<style lang="scss">
	page{
		background-color: #f5f5f5;
		padding: 60rpx 30rpx 0 30rpx;
		box-sizing: border-box;
	}
	.hreader{
		padding: 30rpx 0 40rpx 0;
		text-align: center;
		image{
			width: 320rpx;
			height: 200rpx;
		}
		.text{
			margin-top: 40rpx;
			color: #999999;
			font-size: 28rpx;
		}
	}
	.redFont{
		color: #F9353B !important;
	}
	.pay-order-detail{
		.title{
			margin-bottom: 30rpx;
			color: #333333;
			font-size: 30rpx;
			font-weight: bold;
		}
	}
	.pay-order-item{
		.label{
			min-width: 140rpx;
		}
	}
</style>
