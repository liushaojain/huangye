<template>
	<view class="order-detail-page" :class="isShowMeal ? 'bottom-fixed' : ''">
		<!-- <view class="top-schedule flex-between" v-if="orderDetail.orderTypeName == '印刷' && (status == '2' || status == '3' || status == '4')">
			<view class="whiteFont flex-start item-content">
				<text class="iconfont" :class="status == '2' ? 'iconicon_havepay' : 'iconicon_fahuo'"></text>
				<text>{{status == '2' ? '已付款' : status == '4' ? '部分发货' : '已发货'}}</text>
			</view>
			<view style="display: none;" v-if="orderDetail.shipStatus!='1'&&orderDetail.shipStatus!='2'"></view>
			<view v-if="orderDetail.shipStatus=='1'||orderDetail.shipStatus=='2'" class="alignCenter whiteFont" @click="seeLogistics(orderId)">查看物流</view>
		</view>
		<view class="feedback-box" v-if="orderDetail.sdbB2cMemberComplaints && orderDetail.sdbB2cMemberComplaints.length > 0">
			<view class="feedback-title">反馈信息</view>
			<view :class="isShowFeedbackMore ? '' : 'hideMore'">
				<view class="feedback-item" v-for="(item, index) in orderDetail.sdbB2cMemberComplaints" :key="index" @click="toComplainDetail(item.complaintId)">
					<view class="feedback-type flex-start itemsCenter">{{item.complaintType}}<text :class="item.isAccept == '3' ? 'blue-text' : 'red-text'">{{statusFormat(item.isAccept)}}</text></view>
					<view class="feedback-info flex-between">
						<view>投诉单号：<text>{{item.complaintNum}}</text></view>
						<view>{{timeFormat(item.createtime)}}</view>
					</view>
				</view>
			</view>
			<view class="show-btn" @click="isShowFeedbackMore = !isShowFeedbackMore" v-show="orderDetail.sdbB2cMemberComplaints && orderDetail.sdbB2cMemberComplaints.length > 2">
				<text>{{isShowFeedbackMore ? '收起' : '展开'}}<text class="iconfont" style="font-size: 24rpx;" :class="isShowFeedbackMore ? 'iconicon_arrow_up' : 'iconicon_arrow_down_white'"></text></text>
			</view>
		</view> -->
		<view class="pay-address flex-between">
			<view class="pay-address-left">
				<view class="pay-address-top flex-start">
					<image class="addressIcon" :src="imgBaseUrl+'ico_shouhuodizhi@2x.png'" style="width: 64rpx;height: 64rpx;" mode=""></image>
					<text class="name">{{orderDetail.shipName || ''}}</text>
					<text class="phone">{{orderDetail.shipTel || ''}}</text>
				</view>
				<view class="address">{{orderDetail.shipAddr || ''}}</view>
			</view>
		</view>
		
		<view class="pay-goods">
			<template v-if="!proofing">
				<view class="pay-goods-item" v-for="(item, index) in orderDetail.myOrdersItems" :key="index" @click="goToGoodsDetail(item)">
					<view class="pay-goods-main flex-between" :style="{paddingBottom: item.relevanceParts.length > 0 && !item.deliveryTime ? '16rpx' : '0'}">
						<image :src="item.imageUrl" mode="aspectFill" @error="errorHandle(index)"></image>
						<view class="pay-goods-item-content flex-start">
							<view class="pay-goods-item-title">
								<view class="flex_a">
									<view class="order-parts-tag main-tag">主商品</view>
									<text class="first-title">{{item.name ? item.name : item.productionName}}</text>
								</view>
								<view class="mt10">
									<text class="last-title" v-if="item.productionName && item.name">作品名称:{{item.productionName}}</text>
								</view>
								<view class="mt10">
									<text class="last-title">作品编号:{{item.winecustomWorksId}}</text>
								</view>
								<view class="mt10">
									<text class="last-title" v-if="item.templateName">模板名称:{{item.templateName}}</text>
								</view>
			
							</view>
							<view class="pay-goods-item-meal" v-if="item.isVcGoods && item.selectValues" @click.stop="showMeal(item)"><text class="mealName" style="max-width: 450rpx;">{{item.mealName}}</text><text class="iconfont" :class="isShowMeal ? 'iconicon_arrow_up' : 'iconicon_arrow_down_white'"></text></view>
							<view class="pay-goods-item-specification" v-if="item.processRoute"><view class="ellipsis">{{item.processRoute}}</view></view>
							<view class="pay-goods-item-bottom">
								<view>
									<text class="redFont" v-if="item.price && orderDetail.isOpenBusinessPay!='1'">¥{{moneyFormat(item.price)}}</text>
									<text class="redFont" v-else></text>
									<text style="text-decoration: line-through;margin-left: 8rpx;color: #93989F;" v-if="discount > 0">¥{{moneyFormat(item.cost)}}</text>
								</view>
								<view>x {{item.nums}}个</view>
							</view>
						</view>
					</view>
					<view style="display: flex;justify-content: space-between;margin-top: 16rpx;" v-if="orderDetail.produceInfoRes">
						<!-- <view class="pay-goods-info-time">预计交货时间：{{dateFormat(orderDetail.produceInfoRes.idealDeliveryDate)}}</view> -->
					</view>
					<view class="pay-goods-parts" v-if="item.relevanceParts.length > 0">
						<view class="pay-goods-parts-item" v-for="(part , part_index) in item.relevanceParts" :key="part_index">
							<view class="flex-between">
								<image class="pay-goods-item-info-img" :src="part.imageUrl" mode="aspectFill" @error="errorPartHandle(index, part_index)"></image>
								
								<view class="pay-goods-item-content flex-start">
									<view class="pay-goods-item-title">
										<view class="flex_a">
											<view class="order-parts-tag" v-if="part.winDiy==='false' && (part.customType == 'outer_box'||part.customType == 'bag')">非定制</view>
											<view class="order-parts-tag" v-if="part.winDiy==='true' && (part.customType == 'outer_box'||part.customType == 'bag')">定制</view>
											<text class="first-title">{{part.name ? part.name : part.productionName}}</text>
										</view>
										<view class="mt10">
											<text class="last-title" v-if="part.productionName && part.name">作品名称:{{part.productionName}}</text>
										</view>
										<view class="mt10">
											<text class="last-title">作品编号:{{item.winecustomWorksId}}</text>
										</view>
										<view class="mt10">
											<text class="last-title" v-if="part.templateName">模板名称:{{part.templateName}}</text>
										</view>
									</view>
									<view class="pay-goods-item-meal" v-if="part.isVcGoods && part.selectValues" @click.stop="showMeal(part)"><text class="mealName" style="max-width: 380rpx;">{{part.mealName}}</text><text class="iconfont" :class="isShowMeal ? 'iconicon_arrow_up' : 'iconicon_arrow_down_white'"></text></view>
									<view class="pay-goods-item-bottom">
										<view class="redFont" v-if="orderDetail.isOpenBusinessPay!='1'">¥{{part.price|toFixed_f}}</view>
										<view>x {{part.nums}}个</view>
									</view>
								</view>
							</view>
							<view style="display: flex;justify-content: space-between;margin-top: 16rpx;" v-if="orderDetail.produceInfoRes">
								<!-- <view class="pay-goods-info-time">预计交货时间：{{dateFormat(orderDetail.produceInfoRes.idealDeliveryDate)}}</view> -->
							</view>
						</view>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="pay-goods-item proofinginfo" v-for="(item, index) in orderDetail.proofingOrderItems" :key="index">
					<view class="pay-goods-main flex-between" :style="{paddingBottom: item.relevanceParts.length > 0 && !item.deliveryTime ? '16rpx' : '0'}">
						<image :src="item.imageUrl" mode="aspectFill" @error="errorHandle(index)"></image>
						<view class="pay-goods-item-content flex-start">
							<view class="pay-goods-item-title">
								<text class="first-title">{{item.productName}}</text>
								<text>x {{item.proofingNums}}</text>
							</view>
							<view class="pay-goods-item-meal" v-if="item.isVcGoods && item.selectValues" @click.stop="showMeal(item)"><text class="mealName" style="max-width: 450rpx;">{{item.mealName}}</text><text class="iconfont" :class="isShowMeal ? 'iconicon_arrow_up' : 'iconicon_arrow_down_white'"></text></view>
							<view class="pay-goods-item-specification" v-if="item.processRoute"><view class="ellipsis">{{item.processRoute}}</view></view>
							<view class="pay-goods-item-bottom">
								<view>
									<text class="redFont" v-if="item.price">¥{{moneyFormat(item.price)}}</text>
									<text class="redFont" v-else></text>
									<text style="text-decoration: line-through;margin-left: 8rpx;color: #93989F;" v-if="discount > 0">¥{{moneyFormat(item.cost)}}</text>
								</view>
								<view class="technology">{{item.technologyOther}}</view>
							</view>
						</view>
					</view>
				</view>
			</template>
		</view>
		<view class="pay-remark pay-detail" v-if="!proofing">
			<view class="item-content flex-between" v-if="orderDetail.orderTypeName == '印刷'">
				<view>配送方式</view>
				<view class="flex-end itemsCenter">{{orderDetail.shipping || ''}}<text v-if="orderDetail.costFreight">，</text><text class="redFont" v-if="orderDetail.costFreight">¥{{moneyFormat(orderDetail.costFreight + orderDetail.costProtect)}}</text></view>
			</view>
			<view class="item-content flex-between">
				<view>开具发票</view> 
				<view class="flex-end itemsCenter">{{orderDetail.isTax == 'true' ? (orderDetail.taxCompany || '空') : '不开具发票'}}</view>
			</view>
			<view class="item-content flex-between">
				<view>订单备注</view>
				<view class="flex-end itemsCenter">{{orderDetail.memo ? orderDetail.memo : '无'}}</view>
			</view>
			<view class="item-content flex-between">
				<view>优惠券</view>
				<view class="flex-end itemsCenter">{{orderDetail.bindingDiscountCouponName ? orderDetail.bindingDiscountCouponName : '暂无优惠券'}}</view>
			</view>
		</view>
		<view class="pay-orderNo pay-detail">
			<view class="item-content flex-between">
				<view>作品名称</view>
				<view class="flex-end itemsCenter" v-if="orderDetail.myOrdersItems[0].productionName"><text @click="copyText(orderDetail.myOrdersItems[0].productionName)" class="mr20" style="color: #1F90FF;">复制</text>{{orderDetail.myOrdersItems[0].productionName || ''}}</view>
			</view>
			<view class="item-content flex-between">
				<view>订单编号</view>
				<view class="flex-end itemsCenter"><text @click="copyText(orderDetail.orderId)" class="mr20" style="color: #1F90FF;">复制</text>{{orderDetail.orderId || ''}}</view>
			</view>
			<view class="item-content flex-between">
				<view>订单类型</view>
				<view class="flex-end itemsCenter">{{orderDetail.orderTypeName || ''}}订单</view>
			</view>
			<view class="item-content flex-between">
				<view>下单时间</view>
				<view class="flex-end itemsCenter">{{orderDetail.createtime || ''}}</view>
			</view>
			<view class="item-content flex-between" v-if="status != '0'">
				<view>付款时间</view>
				<view class="flex-end itemsCenter">{{orderDetail.paytime || ''}}</view>
			</view>
		</view>
		<view class="pay-amount pay-detail" style="margin-bottom: 0;" v-if="!proofing && orderDetail.isOpenBusinessPay!='1'">
			<view class="item-content flex-between">
				<view>运费</view>
				<view class="flex-end itemsCenter">¥{{moneyFormat(orderDetail.costFreight)}}</view>
			</view>
			<view class="item-content flex-between">
				<view>商品总价</view>
				<view class="flex-end itemsCenter">¥{{moneyFormat(orderDetail.costItem-orderDetail.costFreight)}}</view>
			</view>
			<view class="item-content flex-between" v-if="orderDetail.pmtOrder">
				<view>优惠</view>
				<view class="flex-end itemsCenter payMoney">¥{{moneyFormat(orderDetail.pmtOrder)}}</view>
			</view>
			<view class="item-content flex-between" v-if="orderDetail.wineDiscount">
				<view>折扣</view>
				<view class="flex-end itemsCenter payMoney">¥{{moneyFormat(orderDetail.wineDiscount)}}</view>
			</view>
			<view class="item-content flex-between">
				<view>{{status==0?"需付款":"实付款"}}</view>
				<view class="flex-end itemsCenter payMoney">¥<text>{{moneyFormat(orderDetail.finalAmount)}}</text></view>
			</view>
			
		</view>
		<!-- <view class="pay-type" v-if="status == '0' || status == '1'">
			<view class="pay-type-title" v-if="payMsg.memberCategory == 'A' && payMsg.creditInfoResult && payMsg.creditInfoResult.specialRequisition == 2"><text class="redFont">您当前可用信用额不足，请耐心等待系统审批</text></view>
			<view class="pay-type-title" v-else>支付方式</view>
			
			<view class="pay-type-list">
				<view v-for="(item, index) in payMsg.payments" :key="index" class="pay-type-item" @click="changeItemSelect(item)">
					<view>
						<text class="iconfont" :class="item.payMethod == 'deposit' ? 'iconicon_premoney' : item.payMethod == 'wxpayjsapi' ? 'iconicon_wechatpay' : 'iconxianxiazhifu'"></text>
						<text>{{item.payMethodName}}</text>
						<text v-if="item.payMethod == 'deposit'" class="redFont">(¥{{moneyFormat(payMsg.advance)}})</text>
					</view>
					<label class="radio">
						<radio :value="item.payMethod" :checked="item.checked" color="#1F90FF" style="transform: scale(0.7);" :disabled="!item.enabled"/>
					</label>
				</view>
			</view>
			
		</view> -->
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
		<view class="order-detail-btns" v-if="status == '0'">
			<template>
				<view class="more-text">
					<text @click="isShowMore = !isShowMore">更多</text>
					<view class="more-btns" v-show="isShowMore">
						<view @click="showCancelDialog">取消订单</view>
					</view>
				</view>
				<view class="btn grey-btn" v-if="orderDetail.isSignature == '0' && orderDetail.isOpenBusinessPay!='1'" @click="checkUser(orderId)">签约</view>
				<view class="btn grey-btn" v-else-if="orderDetail.isSignature !== '0'" @click="downloadPdf">下载合同</view>
				<template>
					<view class="blue-btn btn" @click="payment(orderDetail.isOpenBusinessPay)">去付款</view>
				</template>
			</template>
		</view>
		<view class="order-detail-btns" v-else-if="status == '1'">
			<view class="btn grey-btn" v-if="orderDetail.isSignature == '0' && orderDetail.isOpenBusinessPay!='1'" @click="checkUser(orderId)">签约</view>
			<view class="btn grey-btn" v-else-if="orderDetail.isSignature !== '0'" @click="downloadPdf">下载合同</view>
			<view class="blue-btn btn" @click="printNow(orderDetail.worksIds)">再次购买</view>
		</view>
		<view class="order-detail-btns" v-if="status == '2'">
			<view class="btn grey-btn" v-if="orderDetail.isSignature == '0' && orderDetail.isOpenBusinessPay!='1'" @click="checkUser(orderId)">签约</view>
			<view class="btn grey-btn" v-else-if="orderDetail.isSignature !== '0'" @click="downloadPdf">下载合同</view>
			<view class="blue-btn btn" @click="printNow(orderDetail.worksIds)">再次购买</view>
		</view>
		<view class="order-detail-btns" v-else-if="status == '3' || status == '4'">
			<view class="btn grey-btn" v-if="orderDetail.isSignature == '0' && orderDetail.isOpenBusinessPay!='1'" @click="checkUser(orderId)">签约</view>
			<view class="btn grey-btn" v-else-if="orderDetail.isSignature !== '0'" @click="downloadPdf">下载合同</view>
			<view class="blue-btn btn" @click="printNow(orderDetail.worksIds)">再次购买</view>
			<view class="blue-btn btn" v-if="orderDetail.ifAllTakeDeliveryOfGoods" @click="confirmReceipt(orderId)">确认收货</view>
		</view>
		<view class="order-detail-btns" v-else-if="status == '5'">
			<view class="more-text">
				<text @click="isShowMore = !isShowMore">更多</text>
				<view class="more-btns" v-show="isShowMore">
					<view @click="delOrder">删除订单</view>
				</view>
			</view>
			<view class="btn grey-btn" v-if="orderDetail.isSignature != '0'" @click="downloadPdf">下载合同</view>
			<view class="blue-btn btn" @click="printNow(orderDetail.worksIds)">再次购买</view>
		</view>
		<view class="order-detail-btns" v-else-if="status == '6' || status == '7'">
			<view class="more-text">
				<text @click="isShowMore = !isShowMore">更多</text>
				<view class="more-btns" v-show="isShowMore">
					<view @click="delOrder">删除订单</view>
				</view>
			</view>
			<view class="btn grey-btn" v-if="orderDetail.isSignature != '0'" @click="downloadPdf">下载合同</view>
			<view class="blue-btn btn" @click="printNow(orderDetail.worksIds)">再次购买</view>
		</view>
		<cancel-order class="cancel-order" ref="cancelOrder" v-show="isShowCancel" @cancelSure="handleCancelSure" @close="handleClose"></cancel-order>
		<pre-paid ref="prepaid" :orderNo="orderId" :payPrice="payMoney" @sendPassword="handleReceivePassword" :isFlag="true"></pre-paid>
		<check-select :select="percentageTypes" ref="percentageCheckSelect" :checked="percentageChecked" @transfer="handleCheckedPercentage" v-show="percentageShow"></check-select>
		<turnDialog ref="turnDialog" v-show="isShowTurnDialog" @showDialog="showDialogHandle"></turnDialog>
	</view>
</template>

<script>
	import amountApi from "@/store/account/index.js"
	import cancelOrder from './components/cancelOrder.vue'
	import orderApi from "@/store/order/index.js"
	import prePaid from '@/components/payModal/prepaid.vue'
	import checkSelect from '@/components/checkselect/index.vue'
	import { userStore } from "@/store/account/userInfo.js"
	// import spacificationTmpl from '../../cart/components/spacification.vue';
	import {moneyFormat, confirmReceipt, seeLogistics, seeSchedule, goEvaluate, toSignature, checkUser, toPaySuccess, getWeixinCode, orderComplain, buyAgain, toEffect, dateFormat} from '@/utils/util.js'
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
				isShowCancel:false,
				payType:'',
				percentageTypes:[],
				percentageChecked:'',
				bankMsg:'',
				status: '',
				isShowMore: false,
				providerList:[],
				payMoney:0,
				finalAmount: 0,
				percentageShow:false,
				fromPage: '',
				messageId: '',
				isShowTurnDialog:false,
				isShowMeal: false,
				templateData:{},
				isShowFeedbackMore: false,
				imgBaseUrl: this.imgBaseUrl,
				proofing:false,
			}
		},
		components:{cancelOrder, prePaid, checkSelect},
		computed:{
			discount(){
				return Number(this.orderDetail.discount) + Number(this.orderDetail.impositionDiscount) + Number(this.orderDetail.pmtGoods)
			},
		},
		onUnload() {
			if (this.fromPage == 'confirmOrder') {
				uni.navigateBack({
					delta: 2
				})
			}
		},
		onShow() {
			
			
			let pages = getCurrentPages();
			let curPage = pages[pages.length - 1];
			if(curPage.data.orderId){
				this.orderDetail.commentsStatus = 1;
				curPage.data.orderId = "";
			}
			if(!userStore.getters.token){
				uni.navigateTo({ url: '/pages/user/login/index?back=1' })
				return false
			}
		},
		
		onLoad(option) {
			
			this.fromPage = option.fromPage;
			this.orderId = option.orderId;
			this.status = option.status;
			this.creditApprovalStatus = option.creditApprovalStatus;
			this.messageId = option.messageId;
			if(option.proofing){
				this.proofing = true;
			}
			if(!userStore.getters.token){
				return false
			}
			this.getOrderDetail()
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
			confirmReceipt,
			seeLogistics,
			seeSchedule,
			goEvaluate,
			toSignature,
			checkUser,
			getWeixinCode,
			orderComplain,
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
			setPageTitle(status){
				let title = ''
				switch (status) {
					case '0':
						title = "等待买家付款"
						if (this.creditApprovalStatus == 2) {
							title = "等待系统审批"
						}
						break;
					case '1':
						title = "买家部分付款"
						break;
					case '2':
						title = "买家已付款"
						break;
					case '3':
						title = "卖家已发货"
						break;
					case '4':
						title = "卖家已部分发货"
						break;
					case '5':
						title = "交易成功"
						break;
					case '6':
						title = "订单已作废"
						break;
					case '7':
						title = "交易关闭"
						break;
				}
				uni.setNavigationBarTitle({
					title:title
				})
			},
			feedBackPageHandle(orderId){
				this.isShowMore = false;
				uni.navigateTo({
					url:"/pagesA/evaluate/index?orderId="+orderId,
				})
			},
			getOrderDetail(){
				let params = {
					orderId: this.orderId
				}
				if (this.messageId) {
					params.messageId = this.messageId
				}
				this.$request(orderApi.orderDetail, params, 'GET', '', 1).then(res => {
					this.orderDetail = res.data
					this.finalAmount = res.data.finalAmount.toFixed(2)
					if (this.status == '0' || this.status == '1' || res.data.payStatus == 3 ) {
						this.getCheckoutOrderMsg()
					}
					this.status = this.orderDetail.status;
					this.setPageTitle(this.orderDetail.status)
				})
			},
			getCheckoutOrderMsg(payAmountFront, payment){
				let params = {
					orderId: this.orderId
				}
				if (payAmountFront) {
					params.payAmountFront = payAmountFront
				}
				if (payment) {
					params.payment = payment
				}
				this.$request(orderApi.checkoutAfterOrder, params, 'POST', '', 1).then(res => {
					this.payMsg = res.data
					this.payType = res.data.payments.filter(item => item.checked)[0].payMethod
					this.percentageTypes = [`预付${this.payMsg.payPercentage * 100}%`, '全款']
					this.percentageChecked = `预付${this.payMsg.payPercentage * 100}%`
					this.bankMsg = res.data.payments.filter(item => item.payMethod == 'offline')[0]
					this.payMoney = res.data.curPayAmount.toFixed(2)
				})
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
				this.handleShowCancelDialog(reasonList)
			},
			getCancelReason(){
				return new Promise((resolve, reject) => {
					this.$request(orderApi.orderCancelReason, {}, 'GET', '', 1).then(res => {
						resolve(res.data)
					})
				})
			},
			handleShowCancelDialog(val){
				this.isShowCancel = true
				this.$refs.cancelOrder.reasons = val
			},
			handleClose(){
				this.isShowCancel = false
			},
			handleCancelSure(val){
				this.$request(orderApi.orderCancel, {
					orderId: this.orderId,
					reasonDesc: val.otherReason,
					reasonType: val.checkReason
				}, 'POST', '', 1).then(res => {
					this.$refs.cancelOrder.checkReason = ''
					this.$refs.cancelOrder.otherReason = ''
					this.isShowCancel = false
					if(res.code == 200) {
						uni.showToast({
							title:"取消成功"
						})
						setTimeout(() => {
							uni.navigateTo({
								url:"/pages/user/order/index?type=1"
							})
						}, 2000)
					}
				})
			},
			changeItemSelect(item){
				if (!item.enabled) return
				this.payType = item.payMethod
				this.getCheckoutOrderMsg('', item.payMethod)
			},
			requestDelFun(){
				return new Promise((resolve, reject) => {
					this.$request(orderApi.orderDel, {orderId: this.orderId}, 'GET', '', 1).then(res => {
						if (res.code == 200) {
							resolve()
						}
					})
				})
			},
			delOrder(){
				uni.showModal({
					title:`删除后不能恢复，确定删除该订单？`,
					success: async (res) => {
						if (res.confirm) {
							await this.requestDelFun()
							uni.showToast({
								title:"删除成功"
							})
							setTimeout(() => {
								if (this.messageId) {
									uni.navigateBack()
								} else {
									let pages = getCurrentPages();
									let prevPage = pages[pages.length - 2]; //上一个页面
									prevPage.$vm.page = 1
									prevPage.$vm.onRefrash()
									uni.navigateBack()
								}
							}, 2000)
						}
					},
					fail: (err) => {
						
					}
				})
			},
			async handlePayMoney(){
				// if (this.payMsg.memberCategory == 'A' && this.payMsg.creditInfoResult.specialRequisition == 500) {
				// 	return
				// }
				let payParams = {
					orderId: this.orderId,
					payment: this.payType,
					curPayAmount: this.payMoney
				}
				if (this.payType == 'deposit') {
					if (!userStore.getters.userInfo.mobile) {
						uni.showToast({
							title:"系统检测您没有绑定手机号，无法完成预存款支付，请选择其他支付方式！",
							icon:"none"
						})
						return
					}
					if (this.payMsg.setPayPassword){
						uni.showToast({
							title: "系统检测您没有设置支付密码，请先设置支付密码！",
							icon:"none"
						})
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/set/sms"
							})
						}, 2000)
						return
					}
					this.$refs.prepaid.open()
					return
				} else if (this.payType == 'wxpayjsapi'){
					payParams.code = await this.getWeixinCode()
				}
				if (this.payMsg.creditInfoResult && this.payMsg.creditInfoResult.specialRequisition == 1) {
					this.applyApproval(payParams)
					return
				}
				let response = await this.payOrderFun(payParams)
				if (this.payType == 'wxpayjsapi') {
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
							toPaySuccess(this.orderId, '', true)
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
					uni.showToast({
						title: response.data.payStatusMsg,
						icon:"none"
					})
				}
			},
			payOrderFun(payParams){
				return new Promise((resolve, reject) => {
					this.$request(orderApi.payOrder, payParams, 'POST', '', 1).then(response => {
						resolve(response)
					})
				})
			},
			handleReceivePassword(val){
				let payParams = {
					orderId: this.orderId,
					payment: this.payType,
					payPwd: val,
					curPayAmount: this.payMoney
				}
				this.$request(orderApi.payOrder, payParams, 'POST', '', 1).then(res => {
					if (res.code == 200) {
						this.$refs.prepaid.isPasswordShow = false
						uni.showToast({
							title: "支付成功!"
						})
						toPaySuccess(this.orderId, '', true)
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				})
			},
			handlePayMoneyBlur(e){
				let val = e.detail.value
				// if (val < 1){
				// 	uni.showToast({
				// 		title:"请输入大于1元",
				// 		icon:"none"
				// 	})
				// 	this.payMoney = 1.00
				// 	return
				// }
				if ((this.payMsg.showPreProductionMsg && ((this.percentageChecked == '全款' && val > this.payMsg.remainAmount) || (this.percentageChecked != '全款' && val > this.payMsg.curPayAmountMax))) || (this.payMsg.showPreDeliveryMsg && val > this.payMsg.curPayAmountMax) || (!this.payMsg.showPreProductionMsg && !this.payMsg.showPreDeliveryMsg && val > this.payMsg.curPayAmountMax)) {
					this.payMoney = this.payMsg.showPreDeliveryMsg ? this.payMsg.curPayAmount.toFixed(2) : (this.payMsg.showPreProductionMsg && this.percentageChecked == '全款' ? this.payMsg.remainAmount.toFixed(2) : this.payMsg.curPayAmount.toFixed(2))
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
			},
			handleCheckedPercentage(e){
				if (e) {
					this.percentageChecked = e
					this.payMoney = this.percentageChecked == '全款' ? this.payMsg.remainAmount.toFixed(2) : this.payMsg.curPayAmount.toFixed(2)
				}
				this.percentageShow = false
			},
			downloadPdf(){
				this.$request(orderApi.downloadContract, {orderId: this.orderId}, 'POST', '', 1).then(res => {
					this.isShowMore = false
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
			goToGoodsDetail(item){
				if (this.orderDetail.orderTypeName == '设计' || (this.orderDetail.orderType == 'diy')) {
					return
				}
				uni.navigateTo({
					url:"/pages/product/index?goodsId=" + item.goodsId
				})
			},
			applyApproval(payParams){
				this.$request(orderApi.creditApply, {orderId: this.orderId, vtext: this.payMsg.creditInfoResult.vtext}, 'POST', '', 1).then(async res => {
					if (res.code == 200) {
						setTimeout(() => {
							uni.showToast({
								title: "申请成功!"
							})
							toPaySuccess(this.orderId, '等待审批')
						}, 1000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				})
			},
			errorHandle(index){
				this.$set(this.orderDetail.myOrdersItems[index], 'url', this.imgBaseUrl+"/icon/default4.png")
			},
			errorPartHandle(index, part_index){
				this.$set(this.orderDetail.myOrdersItems[index].relevanceParts[part_index], 'url', "https://smalldev.huyizy.com/image/goods_avatar.png")
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
			toPrint(){
				this.$request(orderApi.ajaxInformDesigner, {orderId: this.orderId}, 'POST', '', 1).then(res => {
					if (res.code == 200) {
						this.isShowTurnDialog = true
					}
				})
			},
			showDialogHandle(){
				this.isShowTurnDialog = false
			},
			applyInvoice(){
				uni.showModal({
					title:`开具发票后，设计订单转印刷时，设计押金不能抵扣印刷订单金额`,
					success: (res) => {
						if (res.confirm) {
							this.$request(orderApi.applyForMakeOutAnInvoice,{orderId: this.orderId},"POST","",1).then((res)=>{
								if(res.code == 200) {
									uni.showToast({
										title:"申请成功"
									})
									this.$set(this.orderDetail, 'ifShowMakeInvoice', false)
								}
							})
						}
					},
					fail: (err) => {
						
					}
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
					
					let res=await this.apis.checkGoodsNewDiySpecDeleted({worksId:worksIds[0]});
					if(res.data.deleted){
						return uni.showToast({
							title:res.data.goodsName,
							duration:3000,
							icon:'none',
							mask:true
						});
					}else{
						uni.navigateTo({
							url:'/pages/my_design/comfirmOrder/index?ids=' + worksIds.toString()+'&source=2'
						})						
					}
				}else{
					uni.showToast({
						title:"作品已失效",
						icon:"none"
					})
				}
				
			},
			// 签署确认函
			signLetter(){
				if (this.orderDetail.designToPrint == 2) {
					uni.showToast({
						title:"待设计师上传确认函",
						icon: "none"
					})
					return
				}
				uni.navigateTo({
					url:'/pages/user/order/signLetter?orderId=' + this.orderId + '&fromPage=detail'
				})
			},
			showMeal(item) {
				this.$set(this.templateData, 'goodsId', item.goodsId)
				this.$set(this.templateData, 'quantity', item.nums)
				let select_configs = {
					meal_vals: item.selectValues ? {
						...JSON.parse(item.selectValues), 
						box:{
							box_high: item.boxHigh,
							box_long: item.boxLong,
							box_wide: item.boxWide,
							_other_tech: JSON.parse(item.otherSelectValues),
							other_thick: item.otherThick,
							other_high: item.otherHigh
						},
						_print_color: item.printColor ? JSON.parse(item.printColor) : {}
					} : {}
				}
				this.$set(this.templateData, 'select_configs', select_configs)
				this.$set(this.templateData, 'price', item.price)
				this.$set(this.templateData, 'name', item.name)
				this.$set(this.templateData, 'workname', item.productionName)
				this.$set(this.templateData, 'costPrice', item.cost)
				this.$set(this.templateData, 'isStopEvent', true)
				this.isShowMeal = true;
			},
			spacificationClose(){
				this.isShowMeal = false;
			},
			timeFormat(time){
				if (!time) return ''
				let date = new Date(time * 1000)
				return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
			},
			statusFormat(status){
				let str = ''
				if (status == '0' || status == '2') {
					str = '待处理'
				} else if (status == '1') {
					str = '待采纳'
				} else {
					str = '已采纳'
				}
				return str
			},
			toComplainDetail(complaintId){
				uni.navigateTo({
					url:"/pages/user/order/complainDetail?complaintId=" + complaintId 
				})
			},
			async payment(isOpenBusinessPay){
				var worksIds = this.orderDetail.worksIds;
				let res1=await this.apis.checkWorksGoods({
					worksIds:worksIds,
					isPrint:1
				});
				console.log(worksIds)
				if(res1.code!=200){
					return uni.showToast({
						title:res1.msg,
						duration:3000,
						icon:'none',
						mask:true
					});
				}
				let res=await this.apis.checkGoodsNewDiySpecDeleted({worksId:worksIds[0]});
				if(res.data.deleted){
					return uni.showToast({
						title:res.data.goodsName,
						duration:3000,
						icon:'none',
						mask:true
					});
				}
				
				if(isOpenBusinessPay == '1') {
					this.$request(orderApi.businessInfo, {}, 'GET', '', 1).then(res => {
						if (res.code == 200) {
							uni.showModal({
								title: '提示',
								content: `订单创建成功，订单号${this.orderDetail.orderId}, 请联系商家确认订单并付款哦, 商家联系方式：${res.data.phone}`,
								showCancel: false,
								confirmText:'确定',
								success: (res) => {
								}
							});
						}
					})
				}else {
					uni.navigateTo({
						url:"/pages/user/order/payment?orderId=" + this.orderDetail.orderId + "&isBack=true" + "&isSignature=" + this.orderDetail.isSignature
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	@import './style/detail.scss'
</style>
<style lang="scss">
	page{background-color: #f5f5f5;}
	.parameter .materials .items{
		&.checked{
			display: block !important;
		}
		display: none !important;
	}
	.parameter .materials .label .cancel,.parameter .materials .addAttr,.technology .confirm,.meal{
		display: none;
	}
	.parameter input{
		ime-mode: disabled;
	}
	.feedback-box{
		background-color: #FFFFFF;
		border-radius: 24rpx;
		margin: 16rpx 0;
		padding: 24rpx 30rpx;
		.feedback-title{
			font-size: 30rpx;
			line-height: 44rpx;
			margin-bottom: 10rpx;
		}
		.feedback-item{
			padding: 20rpx 0;
			border-bottom: 1rpx solid #E9EBEC;
			&:last-child{
				border-bottom: none;
			}
			.feedback-type{
				font-size: 28rpx;
				line-height: 34rpx;
				font-weight: 500;
				text{
					display: inline-block;
					padding: 0 8rpx;
					margin-left: 12rpx;
					font-size: 20rpx;
					line-height: 32rpx;
					border-radius: 4rpx;
					font-weight: normal;
					&.red-text{
						color: #FF5C33;
						background-color: #FFEEEA;
					}
					&.blue-text{
						color: #1F90FF;
						background-color: #DEEFFF;
					}
				}
			}
			.feedback-info{
				line-height: 32rpx;
				margin-top: 20rpx;
				font-size: 24rpx;
				view{
					color: #60656C;
				}
			}
		}
	}
	.show-btn{
		font-size: 24rpx;
		color: #93989F;
		text-align: center;
		margin-top: 24rpx;
	}
	.hideMore{
		max-height: 256rpx;
		overflow: hidden;
	}
	.technology .container{
		height: 840rpx !important;
	}
	.technology .SBhhh {
	    height: 655rpx !important;
	}
</style>
