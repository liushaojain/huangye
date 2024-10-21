<template>
	<view class="order-item-info">
		<view class="order-top flex-between">
			<view @longpress="longpressClick(item.orderId)" class="order-top-no">订单号：{{item.orderId}} </view>
			<view style="color: #F9353B;">{{item.statusName}}</view>
		</view>
		<view v-for="(ite, ind) in item.myOrdersItems" :key="ind" @click="toOrderDetail(item.isOpenBusinessPay,'orderClick')">
			<view class="order-item-info-main">
				<image class="order-item-info-img" :src="ite.imageUrl" mode="aspectFill" @error="errorHandle(ind)"></image>
				<view class="order-item-info-content">
					<view class="order-item-info-title">
						<view>
							<text class="blueFont mr10 p5 border-r1">主商品</text>
							<text class="first-title">{{ite.name ? ite.name : ite.productionName}}</text>
						</view>
						<view class="mt10 ellipsis2 c9" v-if="ite.productionName&&ite.name">作品名称:{{ite.productionName}}</view>
						<view class="c9 mt10">作品编号:{{ite.winecustomWorksId}}</view>
						<!-- <view class="c9 mt10" v-if="ite.templateName">模板名称:{{ite.templateName}}</view> -->
						<!-- <text class="last-title" v-if="ite.name && ite.productionName">(原商品名称:{{ite.name}})</text> -->
						
					</view>
					<view class="order-item-info-specification" v-if="ite.processRoute"><view>{{ite.processRoute}}</view></view>
					<view class="order-item-info-bottom">
						<view class="redFont" v-if="ite.price && item.isOpenBusinessPay!='1'">¥{{moneyFormat(ite.price)}}</view>
						<view class="redFont" v-else></view>
						<view>x {{ite.nums}}个</view>
					</view>
				</view>
			</view>
			
			<!-- <view style="display: flex;justify-content: space-between;margin: 16rpx 0;">
				<view  v-if="item.status == '1'"></view>
				<view class="blue-btn btn" style="font-size: 26rpx;" v-if="item.status == '1'&&ite.ifBranchPay && (item.myOrdersItems.length > 1 || (ite.relevanceParts && ite.relevanceParts.length > 0))" @click.stop="payOrderHarf(ite)">去付款</view>
			</view> -->
			
			<view class="order-parts" v-if="ite.relevanceParts && ite.relevanceParts.length > 0">
				<view v-for="(part, part_index) in ite.relevanceParts" :key="part.itemId">
					<view class="order-parts-item">
						<image class="order-item-info-img small-img" :src="part.imageUrl" mode="aspectFill" @error="errorPartHandle(ind, part_index)"></image>
						<view class="order-item-info-content">
							<view class="order-item-info-title" style="max-height: 158rpx;">
								<view>
									<text class="order-parts-tag mr10 p5 border-r1" v-if="part.winDiy === 'true' && (part.customType == 'outer_box'||part.customType == 'bag')">定制</text>
									<text class="order-parts-tag mr10 p5 border-r1" v-if="part.winDiy === 'false' && (part.customType == 'outer_box'||part.customType == 'bag')">非定制</text>
									<text class="first-title">{{part.name ? part.name : part.productionName}}</text>
								</view>
								
								<view v-if="part.name&&part.productionName" class="mt10 ellipsis2 c9">作品名称:{{part.productionName}}</view>
								<view class="c9 mt10">作品编号:{{ite.winecustomWorksId}}</view>
								<!-- <view class="c9 mt10" v-if="part.templateName">模板名称:{{part.templateName}}</view> -->
								<!-- <text class="last-title" v-if="part.productionName && part.name">(原商品名称:{{part.name}})</text> -->
								
							</view>
							<view class="order-item-info-bottom">
								<view class="redFont" v-if="part.price && item.isOpenBusinessPay!='1'">¥{{moneyFormat(part.price)}}</view>
								<view class="redFont" v-else></view>
								<view>x {{part.nums}}个</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order-item-discount-amount">
			<view v-if="item.isOpenBusinessPay!='1'">实付款<text :class="item.status == '6' || item.status == '7' ? 'greyFont' : 'redFont'">¥{{moneyFormat(item.finalAmount)}}</text></view>
		</view>
		
		
		
		
		<!-- 待付款 -->
		<view class="order-item-bottom" v-if="item.status == '0'">	
			<view class="more-text">
				<text @click="handleShowMore">更多</text>
				<view class="more-btns" v-show="isShowMore">
					<view @click="showCancelDialog">取消订单</view>
				</view>
			</view>
			<view class="grey-btn btn" v-if="item.isSignature==0 && item.isOpenBusinessPay!='1'" @click="checkUser(item.orderId)">签约</view>
			<view class="grey-btn btn" v-if="item.isSignature==1" @click="downloadPdf">下载合同</view>
			<view class="grey-btn btn" @click="toOrderDetail(item.isOpenBusinessPay, 'btnClick')">去付款</view>
		</view>
		<!-- 待发货 -->
		<view class="order-item-bottom" v-if="item.status == '2'">
			<view class="grey-btn btn" v-if="item.isSignature==0 && item.isOpenBusinessPay!='1'" @click="checkUser(item.orderId)">签约</view>
			<view class="grey-btn btn" v-if="item.isSignature==1" @click="downloadPdf">下载合同</view>
			<view class="grey-btn btn" @click="printNow(item.worksIds)">再次购买</view>
		</view>
		<!-- 待收货 -->
		<view class="order-item-bottom" v-else-if="item.status == '3' || item.status == '4'">
			<view class="grey-btn btn" v-if="item.isSignature==0 && item.isOpenBusinessPay!='1'" @click="checkUser(item.orderId)">签约</view>
			<view class="grey-btn btn" v-if="item.isSignature==1" @click="downloadPdf">下载合同</view>
			<view class="grey-btn btn" @click="confirmReceipt(item.orderId)">确认收货</view>
			<view class="grey-btn btn" @click="printNow(item.worksIds)">再次购买</view>
			
		</view>
		<!-- 已完成 -->
		<view class="order-item-bottom" v-if="item.status == '5'||item.status == '6'||item.status == '7'">
			<view class="grey-btn btn" @click="printNow(item.worksIds)">再次购买</view>
			<view class="grey-btn btn" @click="delOrder">删除订单</view>
		</view>
	</view>
</template>

<script>
	import {moneyFormat, confirmReceipt, seeSchedule, seeLogistics, goEvaluate, checkUser, buyAgain, toEffect, dateFormat} from '@/utils/util.js'
	import api from '@/store/order/index.js'
	export default{
		data(){
			return {
				isShowMore:false,
				imgBaseUrl: this.imgBaseUrl,
				type:""
			}
		},
		computed:{
			discount(){
				return Number(this.item.discount) + Number(this.item.impositionDiscount) + Number(this.item.pmtGoods) + Number(this.item.pmtOrder)
			},
			realAmount(){
				return this.item.costItem - this.discount 
			},
		},
		props:['item', 'index'],
		created() {
			this.type = this.$parent.currentType
		},
		methods:{
			moneyFormat,
			confirmReceipt,
			seeSchedule,
			seeLogistics,
			goEvaluate,
			checkUser,
			buyAgain,
			toEffect,
			dateFormat,
			buyAgain2(orderTypeName,goodsId,orderId){
				uni.showModal({
					title: '提示',
					content: '再买一次，指的是商品工艺、材料不变，印刷文件不做任何修改，是否确认再买一次？',
					confirmText:'再买一次',
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url:"/pages/product/index?goodsId="+goodsId+"&orderId="+orderId
							})
						} else if (res.cancel) {
						}
					}
				});
					
			},
			async showCancelDialog(){
				let result = await this.getCancelReason()
				let reasonList = []
				for(let key in result) {
					reasonList.push({
						id: key,
						label: result[key]
					})
				}
				this.$emit('showCancelDialog', {orderId: this.item.orderId, reasonList})
			},
			handleShowMore(){
				this.$emit('showMore', {index: this.index, value: !this.isShowMore})
			},
			changeShowMore(val){
				this.isShowMore = val
			},
			payOrderHarf(item){
				uni.navigateTo({
					url:"/pages/user/order/payment?orderId=" + this.item.orderId + "&itemId=" + item.itemId
				})
			},
			getCancelReason(){
				return new Promise((resolve, reject) => {
					this.$request(api.orderCancelReason, {}, 'GET', '', 1).then(res => {
						resolve(res.data)
					})
				})
			},
			delOrder(){
				this.$emit('deleteOrder', this.item.orderId)
			},
			sureEffect(){
				uni.navigateTo({
					url:"/pages/user/order/effect?orderId=" + this.item.orderId
				})
			},
			async toOrderDetail(isOpenBusinessPay, clickFrom){
				// console.log(this.item)
				// var worksIds = this.item.worksIds;
				// let res1=await this.apis.checkWorksGoods({
				// 	worksIds: worksIds,
				// 	isPrint:1
				// });
				// if(res1.code!=200){
				// 	return uni.showToast({
				// 		title:res1.msg,
				// 		duration:3000,
				// 		icon:'none',
				// 		mask:true
				// 	});
				// }
				
				// var res=await this.apis.checkGoodsNewDiySpecDeleted({
				// 	worksId:worksIds[0]
				// });
				// if(res.data.deleted){
				// 	return uni.showToast({
				// 		title:res.data.goodsName,
				// 		duration:3000,
				// 		icon:'none',
				// 		mask:true
				// 	});
				// }
				
				if(isOpenBusinessPay=='1' && clickFrom=='btnClick') {
					this.$request(api.businessInfo, {}, 'GET', '', 1).then(res => {
						if (res.code == 200) {
							uni.showModal({
								title: '提示',
								content: `订单创建成功，订单号${this.item.orderId}, 请联系商家确认订单并付款哦, 商家联系方式：${res.data.phone}`,
								showCancel: false,
								confirmText:'确定',
								success: (res) => {
									if (res.confirm) {
									}
								}
							});
						}
					})
				}else {
					let url = "/pages/user/order/detail?orderId=" + this.item.orderId + "&status=" + this.item.status + (this.item.creditApprovalStatus == 2 ? "&creditApprovalStatus=2" : "")
					uni.navigateTo({
						url:url
					})
				}
				// uni.navigateTo({
				// 	url:"/pages/user/order/detail?orderId=" + this.item.orderId + "&itemId=" + this.item.itemId
				// })
			},
			
			downloadPdf(){
				this.$request(api.downloadContract, {orderId: this.item.orderId}, 'POST', '', 1).then(res => {
					this.handleShowMore()
					uni.downloadFile({
					    url: res.msg, 
					    success: (response) => {
					        if (response.statusCode === 200) {
					            uni.saveFile({
					            	tempFilePath: response.tempFilePath,
									success: (re) => {
										uni.showToast({
											title:"下载成功"
										})
										//保存成功并打开文件
										uni.openDocument({
											filePath:re.savedFilePath,
											success:(r)=>{}
										})
									}
					            })
					        }
					    }
					});
				})
			},
			applyInvoice(orderId){
				this.$emit('applyInvoice', orderId)
			},
			errorHandle(index){
				this.$emit('error', {index})
			},
			errorPartHandle(index, part_index){
				
				this.$emit('errorPart', {index, part_index})
			},
			// 我要印刷
			toPrint(){
				this.$request(api.ajaxInformDesigner, {orderId: this.item.orderId}, 'POST', '', 1).then(res => {
					if (res.code == 200) {
						this.$emit('showDialog', {flag: true, index: this.index,designOrderId:this.item.orderId})
					}
				})
			},
			// 签署确认函
			signLetter(){
				if(this.item.designToPrint == 2) {
					uni.showToast({
						title:"待设计师上传确认函",
						icon: "none"
					})
					return
				}
				uni.navigateTo({
					url:'/pages/user/order/signLetter?orderId=' + this.item.orderId + '&fromPage=list'
				})
			},
			// 直接印刷
			async printNow(worksIds){
				if(worksIds){
					let res1=await this.apis.checkWorksGoods({
						worksIds:worksIds,
						isPrint:1
					});
					if(res1.code!=200){
						return uni.showToast({
							title:res1.msg,
							duration:3000,
							icon:'none',
							mask:true
						});
					}
					var res=await this.apis.checkGoodsNewDiySpecDeleted({
						worksId:worksIds[0]
					});
					if(!res.data.deleted){
						uni.navigateTo({
							url:'/pages/my_design/comfirmOrder/index?ids=' + worksIds.toString() + '&source=2'
						})
					}else{
						uni.showToast({
							title:res.data.goodsName,
							duration:3000,
							icon:'none',
							mask:true
						});
					}
				}else{
					uni.showToast({
						title:"作品已失效",
						icon:"none"
					})
				}
				
			},
			// 我要打样
			proofingApply(itemId){
				this.$request(api.proofingApply, {designOrderId: itemId}, 'POST', '', 1).then(res => {
					if (res.code == 200) {
						this.$emit('showDialog', {flag: true, index: this.index, proofing:true, designOrderId: itemId})
					}
				})
			},
			applyPrinting(itemId){
				this.$request(api.ApplyPrinting, {designOrderId: itemId}, 'POST', '', 1).then(res => {
					if (res.code == 200) {
						this.$emit('showDialog', {flag: true, index: this.index, proofing:true, designOrderId: itemId})
					}
				})
			},
			goProofing(orderId){
				uni.navigateTo({
					url:"/pagesA/proofing/details?orderId="+orderId+"&type="+this.$parent.currentType
				})
			},
			longpressClick(orderId){
				uni.setClipboardData({
					data: orderId+'',
					showToast:false,
					success: function () {
						uni.showToast({
							title:'订单号已复制！'
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.schedule{
		margin-top: 10rpx;
		navigator{
			padding: 10rpx;
			background: #F5F5F5;
			display: flex;
			border-radius: 8rpx;
			.myorderPrepays{
				width: 60rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 10rpx;
				image{
					height: 56rpx;
					width: 56rpx;					
				}
			}
			.produceInfoRes{
				flex: 1;
				view:first-child{
					flex: 1;
					display: flex;
					view:first-child{
						flex: 1;
						display: flex;
					}
					.produceTimeStr{
						color: #9A9A9A;
						font-size: 24rpx;
					}
				}
			}
			.orderId{
				font-size: 26rpx;
				flex: 1;
			}
			.time,.satateDate{
				color: #9A9A9A;
				font-size: 24rpx;
			}
			.satate{
				&.satate1{
					color: #3195F7;
				}
				&.satate2{
					color: #FF9009;
				}
				&.satate3{
					color: #FF4A40;					
				}
				margin-left: 16rpx;
				font-size: 24rpx;
			}
		}
	}
</style>
