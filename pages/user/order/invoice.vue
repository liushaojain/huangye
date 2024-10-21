<template>
	<view class="invoice-page">
		<view class="invoice-warn flex-start">
			<text class="iconfont iconicon_info_warning_tips blueFont"></text>
			<text class="warn-text blueFont">开具发票后，设计订单转印刷时，设计押金不能抵扣印刷订单金额</text>
		</view>
		<view class="invoice-detail">
			<view class="flex-between">
				<view>订单号</view>
				<view style="color: #60656C;">{{orderId}}</view>
			</view>
			<!-- <view class="flex-between">
				<view>开票金额</view>
				<view class="redFont">¥1200.00 <text class="iconfont iconicon_info_tips_line" style="color: #93989F;margin-left: 12rpx;" @click="isShowDialog = true"></text></view>
			</view> -->
		</view>
		<view class="invoice-add flex-between">
			<view>选择收票地址</view>
			<view class="blueFont" @click="editAddr('')">+新增地址</view>
		</view>
		<view class="addressList">
			<template v-if="addrList.length > 0">
				<view class="item" v-for="(item,index) in addrList" :key="index">
					<view @click="checkCurrent(item)" class="flex-between itemsCenter">
						<view class="flex-between itemsCenter">
							<view class="icon" :class="{'borderN':selectAddr.addrId == item.addrId}"><text v-if="selectAddr.addrId == item.addrId" class="iconfont iconpic_info_success"></text></view>
							<view class="info" style="width: 500rpx;">
								<view>
									<text class="name">{{item.name}}</text>
									<text class="phone">{{item.mobile}}</text>
									<text class="active" v-if="item.defAddr">默认</text>
								</view>
								<view>{{item.area}} {{item.addr}}</view>
							</view>
						</view>
						<text class="iconfont iconicon_edit" @click.stop="editAddr(item.addrId)"></text>
					</view>
				</view>
			</template>
			<template v-else-if="isLoaded && addrList.length == 0">
				<view class="empty">
					<image :src="imgBaseUrl+'/icon/noAddress.png'"></image>
					<view>暂无地址，请先新增地址</view>
				</view>
			</template>
		</view>
		
		<view class="apply-btn flex-around itemsCenter">
			<view class="alignCenter" @click="submitApply">提交申请</view>
		</view>
		<!-- <view class="invoice-explain-dialog" v-show="isShowDialog">
			<view class="dialog-content">
				<view class="dialog-title alignCenter">开票金额说明</view>
				<view class="dialog-text flex-between"><view class="point"></view><view>开票金额为消费者实付款金额，折扣、优惠券等不在开票范围内。</view></view>
				<view class="dialog-text flex-between"><view class="point"></view><view>如订单发生退货退款，开票金额将变更为最终实付款金额。</view></view>
				<view class="dialog-bottom blueFont alignCenter" @click="isShowDialog = false">知道了</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import api from "@/store/account/index.js"
	import orderApi from "@/store/order/index.js"
	export default{
		data(){
			return{
				addrList:[],
				orderId:'',
				selectAddr:null,
				isLoaded:false,
				imgBaseUrl: this.imgBaseUrl
			}
		},
		onLoad(option) {
			this.orderId = option.orderId
		},
		onShow() {
			this.isLoaded = false
			this.getAddrList()
		},
		methods:{
			getAddrList(){
				this.$request(api.mbrAddrList,"","POST","",1).then((res)=>{
					this.isLoaded = true
					this.addrList = res.data.records
					if (this.selectAddr) return
					this.selectAddr = this.addrList.find(item => item.defAddr)
				})
			},
			checkCurrent(item){
				this.selectAddr = item
			},
			submitApply(){
				this.$request(orderApi.applyForMakeOutAnInvoice,{orderId: this.orderId, addrId: this.selectAddr.addrId},"POST","",1).then((res)=>{
					if(res.code == 200) {
						uni.showToast({
							title:"申请成功"
						})
						setTimeout(() => {
							let pages = getCurrentPages();
							let prevPage = pages[pages.length - 2]; //上一个页面
							prevPage.$vm.onRefrash();
							uni.navigateBack()
						}, 1000)
					}
				})
			},
			editAddr(id){
				uni.navigateTo({
					url:'/pages/address/addAddrss' + (id ? '?id=' + id : '')
				})
			}
		}
	}
</script>

<style lang="scss">
	
</style>
<style lang="scss" scoped>
	.addressList{
		padding: 30rpx 30rpx 120rpx 30rpx;
		box-sizing: border-box;
		.item{
			background: white;
			padding: 30rpx;
			margin-bottom: 30rpx;
			border-radius: 16rpx;
			position: relative;
			.info{
				flex: 1;
				padding-right: 50rpx;
				.name{
					font-size: 30rpx;
					color: #303336;
				}
				.phone{
					margin: 0 10rpx;
					font-size: 24rpx;
					color: #93989F;
				}
				.active{
					width: 80rpx;
					height: 40rpx;
					background: #DEEFFF;
					border-radius: 4rpx;
					color: #1F90FF;
					font-size: 24rpx;
					display: inline-block;
					text-align: center;
					line-height: 40rpx;
				}
				view{
					font-size: 24rpx;
					color: #60656C;
					&:last-child{
						margin-top: 10rpx;
					}
					radio{
						transform: scale(0.6);
					}
				}
			}
		}
		.iconicon_edit{
			font-size: 40rpx;
		}
		.icon{
			height: 40rpx;
			width: 40rpx;
			border: 4rpx solid #C9CBCF;
			box-sizing: border-box;
			border-radius: 50%;
			position: relative;
			margin-right: 10rpx;
			.iconfont{
				color: #1F90FF;
				font-size: 40rpx;
			}
		}
	}
	.empty{
		text-align: center;
		image{
			width: 340rpx;
			height: 200rpx;
			margin: 0 auto;
		}
		view{
			margin-top: 40rpx;
			line-height: 42rpx;
			font-size: 30rpx;
			color: #60656C;
		}
	}
</style>
<style>
	page{background-color: #f5f5f5;}
</style>

