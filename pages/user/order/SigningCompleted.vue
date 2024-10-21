<template>
	<view v-if="isLoad">
		<view class="info">
			<text class="iconfont" :class="isError ? 'iconpic_info_failure' : 'iconpic_info_success'"></text>
			<template v-if="isError">
				<view class="title">提交审批失败，请重新申请</view>
			</template>
			<template v-else>
				<view v-if="isPay" class="title">付款成功</view>
				<view class="title" v-else-if="orderDetail.payment == 'credit' && orderDetail.payStatus == 0"  >提交审批成功，请耐心等待</view>
				<view class="title" v-else>{{orderDetail.payment == 'offline' ? '您已成功下单，请24小时内完成支付' : '您已成功下单'}}</view>
			</template>
			
			
			
			<!-- <view class="hint">您已成功下单</view> -->
			<view class="orderId">
				<text class="label">订单编号：</text>
				<text>{{orderId}}</text>
			</view>
			<view class="orderId" v-if="orderDetail.orderType!='design'">
				<text class="label">收货信息：</text>
				<text v-if="orderDetail.shipName">{{orderDetail.shipName}}  {{orderDetail.shipTel || ''}}
					<text class="displayB">{{orderDetail.shipAddr}}</text>					
				</text>
			</view>
			<view class="orderId">
				<text class="label">下单时间：</text>
				<text v-if="orderDetail.createtime">{{orderDetail.createtime}}</text>
			</view>
			<view class="orderId" v-if="orderDetail.paytime">
				<text class="label">支付时间：</text>
				<text>{{orderDetail.paytime || ''}}</text>
			</view>
		</view>
		
		<view class="signUp"  v-if="((orderDetail.payment != 'credit')||(orderDetail.payment == 'credit'&&orderDetail.payStatus != 0))&&orderDetail.isSignature!=1">
			<view class="label">
				<text>*</text>签约方式
			</view>
			<view class="text" @click="signSelect">
				{{checked}}<text class="iconfont iconicon_label_arrow_right"></text>
			</view>
		</view>
		<button class="sign" v-if="isError" @click="applyInvoice">申请特批</button>
		<button class="sign" v-if="((orderDetail.payment == 'credit'&& orderDetail.payStatus != 0)||checked=='在线签约')&&orderDetail.isSignature!=1" @click="checkUser(orderId)">在线签约</button>
		<navigator 
			v-if="(orderDetail.status==0||orderDetail.status==1)&&orderDetail.payment != 'credit'&&orderDetail.payment != 'offline'" 
			class="goHome payment" 
			:url="'/pages/user/order/detail?orderId='+orderId+'&status='+orderDetail.status">
			继续付款
		</navigator>
		<navigator class="goHome" v-if="checked!='在线签约'" :url="'/pages/user/order/detail?orderId=' + orderId + '&status=' + orderDetail.status">查看订单</navigator>
		<navigator class="goHome" v-if="checked!='在线签约'" url="/pages/home/index" open-type="switchTab">返回首页</navigator>
	
		<checkselect 
			v-if="selectShow" 
			name="name"
			:select="select" 
			:checked="checked" 
			@transfer="getchecked()">
		</checkselect>
	</view>
</template>

<script>
	import api from "@/store/order/index.js"
	import checkselect from "@/components/checkselect/index.vue"
	import {checkUser} from "@/utils/util.js"
	export default {
		data () {
			return {
				url:'',
				orderId:"",
				selectShow:false,
				checked:"在线签约",
				select:[
					{name:"在线签约",value:1},
					{name:"线下签约",value:2}
				],
				orderDetail:{},
				isPay:false,
				isLoad:false,
				isError:false
			}
		},
		components:{
			checkselect
		},
		onLoad(e) {
			if(e.isPay){
				this.isPay=e.isPay
			}
			if(e.title){
				uni.setNavigationBarTitle({
					title:e.title
				})
			}
			if (e.isError) {
				this.isError = e.isError
			}
			this.orderId=e.orderId
			this.$request(api.orderDetail,{orderId:e.orderId},"GET","",1).then((res)=>{
				this.orderDetail = res.data;
				
				if(this.orderDetail.payment == 'credit'&& this.orderDetail.payStatus == 0){
					this.checked="线下签约"
				}
				
				if(res.data.status==1){
					uni.setNavigationBarTitle({
						title:"部分付款"
					})
				}
				this.isLoad=true;
				
			})
		},
		methods:{
			checkUser,
			signSelect(){
				this.selectShow=true;
			},
			getchecked(e){
				if(e){
					this.checked=e.name
				}
				this.selectShow=false;
			},
			applyInvoice(){
				this.$request(api.creditApply, {orderId: this.orderId, vtext: ""}, 'POST', '', 1).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: "提交审批成功!"
						})
						this.isError = false
						uni.setNavigationBarTitle({
							title: "等待审批"
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				})
			}
		},
		onUnload(){
			uni.navigateBack({
				delta: 2  
			});
		}
	}
</script>

<style lang="scss">
	page{
		background: #F5F5F5;
	}
	.displayB{
		display: block;
	}
	.signUp{
		height: 88rpx;
		line-height: 88rpx;
		padding: 0 30rpx;
		background: #FFFFFF;
		border-radius: 24rpx;
		display: flex;
		color: #303336;
		margin-bottom: 40rpx;
		.label{
			width: 160rpx;
			text{
				color: #FF3931;
			}
		}
		.text{
			text-align: right;
			text{
				margin-left: 6rpx;
			}
		}
		view{
			font-size: 30rpx;
			&:last-child{
				flex: 1;
			}
		}
	}
	.info{
		margin: 20rpx 0;
		background: white;
		padding:48rpx 30rpx;
		border-radius: 24rpx;
		text-align: center;
		.iconfont{
			font-size: 112rpx;
			display: block;
			color: #1F90FF;
			margin-bottom: 16rpx;
		}
		.title{
			color: #303336;
			font-size: 32rpx;
			line-height: 42rpx;
			padding-bottom: 48rpx;
			margin-bottom: 40rpx;
		}
		.hint{
			color: #60656C;
			font-size: 28rpx;
			margin-top: 6rpx;
		}
		.orderId{
			// border-top: 1px solid #E9EBEC;
			margin-top: 20rpx;
			display: flex;
			&:last-child{
				margin-bottom: 0;
			}
			.label{
				width: 200rpx;
			}
			text{
				color: #60656C;
				font-size: 28rpx;
				text-align: left;
				&:last-child{
					flex: 1;
				}
			}
		}
	}
	navigator,.sign{
		width: 690rpx;
		height: 88rpx;
		background: #FFFFFF;
		border-radius: 44rpx;
		margin:50rpx 30rpx 30rpx 30rpx;
		color: #60656C;
		font-size: 32rpx;
		text-align: center;
		line-height: 88rpx;
		&::after{
			display: none;
		}
	}
	.sign{
		background: #1F90FF;
		color: white;
	}
	.goHome{
		margin-top: 0;
		&.payment{
			border: 1rpx solid #1F90FF;
			color: #1F90FF;
		}
	}
</style>
