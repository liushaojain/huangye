<template>
	<view class="confirm-order-page" :class="isShowMeal ? 'bottom-fixed' : ''">
		<navigator hover-class="none" class="pay-address flex-between" v-if="JSON.stringify(address) != '{}'" :url="'/pages/address/index?fromPage=confirmOrder&addrId=' + address.addrId">
			<view class="pay-address-left">
				<view class="pay-address-top flex-start">
					<text class="iconfont icondizhi blueFont"></text>
					<text class="name">{{address.name}}</text>
					<text class="phone">{{address.mobile}}</text>
				</view>
				<view class="address">{{address.area}}{{address.addr}}</view>
			</view>
			<view class="arrow-right">
				<text class="iconfont iconicon_label_arrow_right"></text>
			</view>
			
		</navigator>
		<navigator hover-class="none" class="pay-address pay-address-empty flex-between itemsCenter" v-else url="/pages/address/index?fromPage=confirmOrder">
			<view class="flex-start">
				<text class="iconfont icondizhi blueFont"></text>
				<text style="font-size: 30rpx;margin-left: 12rpx;">请选择收货地址</text>
			</view>
			<view class="arrow-right">
				<text class="iconfont iconicon_label_arrow_right"></text>
			</view>
		</navigator>
		<view class="pay-goods">
			<view class="pay-goods-item" v-for="(item, index) in goodsList" :key="index">
				<view class="pay-goods-main flex-between">
					<image :src="item.url" mode="aspectFill" @error="errorHandle(index)"></image>
					<view class="pay-goods-item-content flex-start">
						<view class="pay-goods-item-title">
							<text class="first-title">{{item.workname ? item.workname : item.name}}</text>
							<text class="last-title" v-if="item.workname && item.name">(商品原名称:{{item.name}})</text>
						</view>
						<view class="pay-goods-item-meal" v-if="item.isVcGoods && item.mealName" @click.stop="showMeal(item)"><text class="mealName" style="max-width: 450rpx;">{{item.mealName}}</text><text class="iconfont" :class="isShowMeal ? 'iconicon_arrow_up' : 'iconicon_arrow_down_white'"></text></view>
						<view class="pay-goods-item-specification" v-if="item.specInfo"><view class="ellipsis">{{item.specInfo}}</view></view>
						<view class="pay-goods-item-bottom flex-between">
							<view>
								<text class="redFont">¥{{moneyFormat(item.singlePrice)}}</text>
								<template v-if="item.salesRuleMatching">
									<text style="text-decoration: line-through;margin-left: 8rpx;color: #93989F;">¥{{moneyFormat(item.costPrice)}}</text>
								</template>
							</view>
							<view>x {{item.nums}}</view>
						</view>
					</view>
				</view>
				<view class="pay-goods-parts" v-if="item.items.length > 0" style="padding-left: 46rpx;">
					<view class="pay-goods-parts-item flex-between" v-for="(part , part_index) in item.items" :key="part_index">
						<image class="pay-goods-item-info-img" :src="part.url" mode="aspectFill" @error="errorPartHandle(index, part_index)"></image>
						<view class="pay-goods-item-content flex-start" style="width: 464rpx;">
							<view class="pay-goods-item-title">
								<view class="pay-goods-item-tag">{{part.typeName}}</view>
								<text class="first-title">{{part.workname ? part.workname : part.name}}</text>
								<text class="last-title" v-if="part.workname && part.name">(原商品名称:{{part.name}})</text>
							</view>
							<view class="pay-goods-item-meal" v-if="part.isVcGoods && part.mealName" @click.stop="showMeal(part)"><text class="mealName" style="max-width: 380rpx;">{{part.mealName}}</text><text class="iconfont" :class="isShowMeal ? 'iconicon_arrow_up' : 'iconicon_arrow_down_white'"></text></view>
							<view class="pay-goods-item-bottom flex-between">
								<view class="redFont">¥{{moneyFormat(part.singlePrice)}}</view>
								<view>x {{part.nums}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="pay-goods-bottom flex-end">
				<template v-if="orderPrice.preferentialPirce > 0">
					<view class="pay-goods-discount">已优惠<text>¥{{moneyFormat(orderPrice.preferentialPirce)}}</text></view>
				</template>
				<view class="pay-goods-amount">小计<text>¥{{moneyFormat(orderPrice.goodsPirce)}}</text></view>
			</view>
		</view>
		<view class="pay-remark pay-detail">
			<view class="item-content flex-between">
				<view><text class="redFont">*</text>配送方式</view>
				<view @click="showActionSheet" class="flex-end itemsCenter">
					<template v-if="!currentDistribution">
						<text>请选择</text>
					</template>
					<template v-else>
						<template v-if="currentDistribution.money">
							<text>{{currentDistribution.dt_name}}，<text class="distribution-money">¥{{orderPrice.yfandProPirce}}</text></text>
						</template>
						<template v-else><text>{{currentDistribution.dt_name}}</text></template>
					</template>
					<text class="iconfont iconicon_label_arrow_right"></text>
				</view>
			</view>
			<view class="item-content flex-between">
				<view>开具发票</view>
				<view @click="invoiceShow = true" class="flex-end itemsCenter">{{invoiceChecked == '开具发票' ? invoiceObject.taxTitle : invoiceChecked}}<text class="iconfont iconicon_label_arrow_right"></text></view>
			</view>
			<view class="item-content flex-between">
				<view>订单备注</view>
				<input type="text" v-model="memo" maxlength="200" class="remark-input" placeholder="请输入" placeholder-style="color:#C9CBCF" style="color: #60656C;">
			</view>
		</view>
		<view class="pay-discount pay-detail" :style="{marginBottom: payMsg.payPercentage == 1 ? '0' : '16rpx'}">
			<view class="item-content flex-between">
				<view><text class="iconfont iconicon_coupon"></text>优惠券</view>
				<view class="textR itemsCenter ellipsis" @click="goToMyCoupon(currentCoupon.cpnsName)">
					{{orderPrice.isUseCoupon ? (currentCoupon ? currentCoupon.cpnsName : '请选择优惠券') : '暂无优惠券'}}
					<text class="iconfont iconicon_label_arrow_right"></text>
				</view>
			</view>
			<view class="item-content flex-between" v-if="currentCoupon && orderPrice.couponPrice != 0">
				<view>商品优惠</view>
				<view class="discount-amount flex-end itemsCenter"><text class="redFont">-¥{{currentCoupon ? orderPrice.couponPrice : '0.00'}}</text></view>
			</view>
			<template v-if="depositDeduction">
				<view class="item-content flex-between">
					<view>使用设计订单金额抵扣<text class="redFont">¥{{depositDeduction}}</text></view>
					<label class="radio">
						<radio :value="depositDeduction" :checked="isDeposit" color="#1F90FF" style="transform: scale(0.7);" @click="changeDeduction"/>
					</label>
				</view>
			</template>
			<template v-if="proofingDeduction">
				<view class="item-content flex-between">
					<view>使用打样订单金额抵扣<text class="redFont">¥{{proofingDeduction}}</text></view>
					<label class="radio">
						<radio :value="proofingDeduction" :checked="isProofingDeposit" color="#1F90FF" style="transform: scale(0.7);" @click="changeProofing"/>
					</label>
				</view>
			</template>
			
			<template v-if="depositDeduction||proofingDeduction">
				<view class="item-content itemsCenter flex-start" style="color: #93989F;"><text class="iconfont iconicon_info_warning_tips" style="color: #1F90FF;margin-right: 12rpx;"></text>订单金额抵扣后，不能申请开票</view>
			</template>
		</view>
		<view class="pay-half pay-detail" v-if="payMsg.payPercentage < 1 || payMsg.memberCategory == 'B'">
			<view class="item-content flex-between">
				<view>订单总金额</view>
				<view class="flex-end itemsCenter">¥{{orderPrice.orderPrice}}</view>
			</view>
			<view class="item-content flex-between">
				<view>支付比例</view>
				<view class="flex-end itemsCenter" @click="percentageShow = true">{{percentageChecked}}<text class="iconfont iconicon_label_arrow_right"></text></view>
			</view>
			<view class="item-content flex-between" style="margin-bottom: 20rpx;">
				<view>此次应付金额</view>
				<view class="flex-end itemsCenter"><input class="pay-harf-input" v-model="payMoney" :disabled="percentageChecked == '全款'" type="digit" @blur="handlePayMoneyBlur">元</view>
			</view>
			<view class="pay-harf-warn flex-start" v-if="percentageChecked != '全款'">
				<text class="iconfont iconicon_info_warning_tips blueFont"></text>
				<text class="warn-text">订单支持预付部分金额和多次付款，但需支付完<text class="redFont">{{moneyFormat(payMsg.curPayAmount)}}元({{payMsg.payPercentage * 100}}%)</text>，订单商品才会进入生产。</text>
			</view>
		</view>
		<view class="pay-type">
			<view class="pay-type-title">支付方式</view>
			<!-- 除去信用支付 -->
			<!-- <view class="pay-type-list" v-if="payMsg.memberCategory != 'A'"> -->
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
			<!-- <view class="pay-type-list" v-else>
				<view class="credit-pay-item">
					<view class="credit-pay-item-title">
						<view>
							<text class="iconfont iconicon_xinyong_pay"></text>
							<text>信用支付</text>
						</view>
						<label>
							<radio checked="true" color="#1F90FF" style="transform: scale(0.7);"></radio>
						</label>
					</view>
					<view class="credit-pay-item-money">
						<view>可用信用额</view>
						<view v-if="payMsg.creditInfoResult && payMsg.creditInfoResult.specialRequisition == 500"><text class="redFont">--</text></view>
						<view v-else>¥{{payMsg.creditInfoResult.creditAmount > 0 ? moneyFormat(payMsg.creditInfoResult.creditAmount) : '0.00'}}</view>
					</view>
					<view class="credit-pay-item-level">
						<view>风险等级</view>
						<view v-if="payMsg.creditInfoResult && payMsg.creditInfoResult.specialRequisition == 500"><text class="redFont" style="margin-right: 0;">--</text></view>
						<view v-else :class="payMsg.creditInfoResult.creditWarning"><text></text>{{payMsg.creditInfoResult.creditWarning == 'green' ? '绿色' : payMsg.creditInfoResult.creditWarning == 'red' ? '红色' : '黄色'}}</view>
					</view>
					<view class="credit-pay-item-warn" v-if="payMsg.creditInfoResult && payMsg.creditInfoResult.specialRequisition == 500">暂未查到当前账号的信用信息，请联系客服</view>
					<view class="credit-pay-item-warn" v-else-if="payMsg.creditInfoResult.creditWarning != 'green'">您当前可用信用额不足，您可以联系客服或申请特批</view>
				</view>
			</view> -->
		</view>
		<view class="bank-msg" v-if="payType == 'offline'">
			<view class="bank-msg-content">
				<view class="item-content flex-between">
					<view><!-- <text class="redFont">*</text> -->转账账户</view>
					<view @click="checkeBank" class="flex-end itemsCenter">
						<template v-if="bankItem">
							<text class="ellipsis checkeBank">{{bankItem.accountName}}</text>
						</template>
						<template v-else>
							<text class="ellipsis">请选择</text>
						</template>
						<text class="iconfont iconicon_label_arrow_right"></text>
					</view>
				</view>
				<view class="item-content flex-between">
					<view class="hintBank">
						<text class="iconfont icontishi"></text>
						<text>线下公对公转账时，转账账户需和此处选择的转账账户保持一致</text>
					</view>
				</view>
			</view>
			
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
				<view class="item-content flex-between">
					<view class="hintBank">
						<text class="iconfont icontishi"></text>
						<text>线下公对公转账时，请在备注栏填写订单号</text>
					</view>
				</view>
			</view>
		</view>
		<view class="submit-btn">
			<view class="pay-money">合计：
				<text v-if="payMoney>0">¥{{moneyFormat(payMoney)}}</text>
				<text v-else>¥0.00</text>
			</view>
			<template v-if="isLoaded">
				<view class="submit-order blueBg whiteFont" @click="submitOrder" v-if="payMsg.creditInfoResult && payMsg.creditInfoResult.specialRequisition == 1">申请特批</view>
				<view class="submit-order whiteFont" style="background-color: rgba(31, 144, 255, 0.5);" @click="submitOrder" v-else-if="payMsg.creditInfoResult && payMsg.creditInfoResult.specialRequisition == 500">提交订单</view>
				<view class="submit-order blueBg whiteFont" @click="submitOrder" v-else>提交订单</view>
			</template>
		</view>
		<action-sheet :actionsheet="distributionTypes" ref="actionSheet" @change="handleChange"></action-sheet>
		<check-select :select="invoiceTypes" ref="invoiceCheckSelect" :checked="invoiceChecked" @transfer="handleCheckedInvoice" v-show="invoiceShow"></check-select>
		<check-select :select="percentageTypes" ref="percentageCheckSelect" :checked="percentageChecked" @transfer="handleCheckedPercentage" v-show="percentageShow"></check-select>
		<pre-paid ref="prepaid" :orderNo="payOrders.orderId" :payPrice="payMoney" @sendPassword="handleReceivePassword"></pre-paid>
		<spacificationTmpl @close="spacificationClose" v-if="isShowMeal" :templateData="templateData" ></spacificationTmpl>
	</view>
</template>

<script>
	import actionSheet from './components/actionSheet.vue'
	import checkSelect from '@/components/checkselect/index.vue'
	import prePaid from '@/components/payModal/prepaid.vue'
	import amountApi from "@/store/account/index.js"
	import orderApi from "@/store/order/index.js"
	import {moneyFormat, toPaySuccess} from '@/utils/util.js'
	import { userStore } from "@/store/account/userInfo.js"
	import spacificationTmpl from '../../cart/components/spacification.vue';
	import api from "@/store/account/index.js"
	export default {
		data(){
			return {
				itemsIds:[],
				address:{},
				goodsList:[],
				payMsg:{
					payments:[],
					payPercentage: 0.5,
					curPayAmount:0,
					creditInfoResult:{}
				},
				payType: '',
				distributionTypes:[],
				currentDistribution: null,
				currentChecked: null,
				invoiceTypes:['不开具发票', '开具发票'],
				invoiceChecked: '不开具发票',
				invoiceObject:null,
				invoiceShow: false,
				currentCoupon:null,
				memo:'',
				orderPrice:{
					goodsPirce: 0,
					couponPrice:0,
					orderPrice: 0,
					shippingPirce: 0,
					protect: 0
				},
				percentageTypes:[],
				percentageChecked:'',
				percentageShow: false,
				bankMsg:{},
				providerList:[],
				payOrders: null,
				payMoney: 0,
				isLoaded: false,
				isShowMeal:false,
				templateData:{},
				depositDeduction: 0,
				proofingDeduction: 0,
				isDeposit: 0,
				bankItem: "",
				imgBaseUrl: this.imgBaseUrl,
				isProofingDeposit: 0
			}
		},
		components:{actionSheet, checkSelect, prePaid, spacificationTmpl},
		onLoad(option) {
			this.itemsIds = option.ids.split(',')
			this.getDefaultAddress()
			this.getGoodsList()
		},
		filters:{
			activityExpirationConvert(millisecond){
				let endDate = new Date(millisecond * 1000);
				let month = endDate.getMonth()+1;
				let day = endDate.getDate();
				if(day<10) day = "0"+day;
				let hour =  endDate.getHours();
				if(hour<10) hour = "0"+hour;
				let minute =  endDate.getMinutes();
				if(minute<10) minute = "0"+minute;
				return `${month}月${day}日${hour}:${minute}`;
			}
		},
		onShow() {
			if (!this.invoiceObject) {
				this.invoiceChecked = '不开具发票'
			}
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
			getListBank(){
				let that=this;
				this.$request(api.getListBank,"","GET","",1).then((res)=>{
					this.bankItem = res.data.find(item=>{
						return item.defAccount == 1
					})
				})
			},
			getDefaultAddress(){
				this.$request(amountApi.getDefAddr, {}, 'GET', '', 0).then(res => {
					this.address = res.data || {}
					this.getOrderPrice()
				})
			},
			async onChangeBank(val){
				if(val){
					this.bankItem = val
				}else{
					this.bankItem = "";
				}
			},
			async onChangeAddr(val){
				if (val) {
					this.address = val
					this.getOrderPrice()
					await this.getShippingFreight(this.address.addrId)
				}
			},
			getGoodsList(){
				this.$request(orderApi.orderGoodsList, {itemsIds: this.itemsIds}, 'POST', '', 1).then(res => {
					this.goodsList = res.data
				})
			},
			async showActionSheet(){
				if (JSON.stringify(this.address) == '{}') {
					uni.showToast({
						title:"请先选择地址",
						icon:"none"
					})
					return
				}
				if (this.distributionTypes.length == 0) {
					await this.getShippingFreight(this.address.addrId)
				}
				this.$refs.actionSheet.isShow = true
				this.$refs.actionSheet.selectId = this.currentDistribution ? this.currentDistribution.dt_id : ''
			},
			getShippingFreight(addrId){
				return new Promise((resolve, reject) => {
					this.$request(orderApi.shippingFreight, {itemsIds: this.itemsIds, addrId}, 'POST', '', 1).then(res => {
						this.distributionTypes = res.data
						if (this.currentDistribution) {
							let oldDis = JSON.parse(JSON.stringify(this.currentDistribution))
							this.currentDistribution = this.distributionTypes.filter(item => item.dt_id == this.currentDistribution.dt_id)[0]
							this.$set(this.currentDistribution, 'isProtect', oldDis.isProtect)
						}
						resolve()
					})
				})
			},
			getOrderPrice(){
				let params = {
					itemsIds: this.itemsIds,
					addrId: this.address.addrId
				}
				if (this.currentCoupon) {
					params.memcCode = this.currentCoupon.memcCode
				}
				if (this.currentDistribution) {
					params.shippingId = this.currentDistribution.dt_id
					params.isProtect = this.currentDistribution.isProtect ? this.currentDistribution.isProtect : false
				}
				
				this.$request(orderApi.orderPrice, params, 'POST', '', 1).then(res => {
					this.isLoaded = true
					this.orderPrice = res.data
					this.goodsList.forEach(item => {
						let ite = this.orderPrice.goods.find(ele => ele.itemsId == item.itemsId)
						this.$set(item, 'singlePrice', ite.goodsPrice)
						if (item.items && item.items.length > 0) {
							item.items.forEach(item_ => {
								let ite_ = this.orderPrice.goods.find(ele_ => ele_.itemsId == item_.itemsId)
								this.$set(item_, 'singlePrice', ite_.goodsPrice)
							})
						}
					})
					this.depositDeduction = parseFloat(res.data.depositDeduction);
					this.proofingDeduction = parseFloat(res.data.proofingDeduction);
					this.payMsg = res.data.payTypes;
					this.payType = res.data.payTypes.payments.filter(item => item.checked)[0].payMethod
					this.percentageTypes = [`预付${this.payMsg.payPercentage * 100}%`, '全款']
					this.percentageChecked = `预付${this.payMsg.payPercentage * 100}%`
					this.bankMsg = res.data.payTypes.payments.filter(item => item.payMethod == 'offline')[0]
					this.payMoney = this.percentageChecked == '全款' ? this.orderPrice.orderPrice.toFixed(2) : this.payMsg.curPayAmount.toFixed(2)
					this.changePayMoney("all")
				})
			},
			changeItemSelect(item){
				if (!item.enabled) return
				this.payType = item.payMethod
				this.payMsg.payments.forEach(ite => {
					this.$set(ite, 'checked', false)
				})
				this.$set(item, 'checked', true)
				
				if(this.payType == 'offline'){
					this.$nextTick(function() {
						setTimeout(() => { uni.pageScrollTo({scrollTop: 99999, duration: 0});}, 50);
					});
				}
			},
			
			handleChange(e){
				this.currentDistribution = e
				this.getOrderPrice()
			},
			handleCheckedInvoice(e) {
				if (e) {
					this.invoiceChecked = e
					if(e=="开具发票"){
						uni.navigateTo({
							url:"/pages/invoice/list?fromPage=confirmOrder" + (this.invoiceObject ? "&id=" + this.invoiceObject.id : "")
						})
					}
				}
				this.invoiceShow = false
			},
			handleCheckedPercentage(e){
				if (e) {
					this.percentageChecked = e
					this.payMoney = this.percentageChecked == '全款' ? this.orderPrice.orderPrice : this.payMsg.curPayAmount
				}
				this.percentageShow = false
			},
			// 确认选中开具发票
			onChangeInvoice(object){
				if (!!object){
					this.invoiceChecked = '开具发票'
					this.invoiceObject = object
				} else {
					this.invoiceObject = null
					this.invoiceChecked = '不开具发票'
				}
			},
			onChangeCoupon(object){
				this.currentCoupon = object
				this.getOrderPrice()
			},
			goToMyCoupon(cpnsName){
				if(!this.orderPrice.isUseCoupon) return
				let goodIds = [], allCount = 0
				this.goodsList.forEach(item => {
					allCount += item.nums
					goodIds.push(item.goodsId)
					item.items.forEach(ite => {
						allCount += item.nums
						goodIds.push(ite.goodsId)
					})
				})
				this.getCanUseCouponList(goodIds.join(','), allCount, this.orderPrice.goodsPirce, this.currentCoupon.memcCode, "")
			},
			
			getCanUseCouponList(goodIds, allCount, allPrice, memcCode, orderType){
				let params = {
					goodIds, 
					allCount, 
					allPrice
				}
				if (orderType) {
					params.orderType = orderType
				}
				this.$request(api.getNowConformToConditionCoupons, params, 'GET', '', 1).then(res => {
					this.isLoading = true
					this.couponList = res.data.listCanUseCoupons
					this.invalidList = res.data.listUnUseCoupons
					if (memcCode) {
						this.currentChecked = this.couponList.find(item => item.memcCode == memcCode)
					}
				})
			},
			submitOrder(){
				if (this.payMsg.creditInfoResult && this.payMsg.creditInfoResult.specialRequisition == 500) {
					return
				}
				if (!this.address.addrId) {
					uni.showToast({
						title:"请选择地址",
						icon:"none"
					})
					return
				}
				if (!this.currentDistribution) {
					uni.showToast({
						title:"请选择配送方式",
						icon:"none"
					})
					return
				}
				
				// if (this.payType=="offline"&&!this.bankItem) {
				// 	uni.showToast({
				// 		title:"请选择转账账户",
				// 		icon:"none"
				// 	})
				// 	return
				// }
				
				let params = {
					itemsIds: this.itemsIds,
					addrId: this.address.addrId,
					isTax: this.invoiceChecked == '开具发票',
					memo: this.memo,
					shippingId: this.currentDistribution.dt_id,
					shippingPrice: this.currentDistribution.money,
					isProtect: this.currentDistribution.isProtect ? this.currentDistribution.isProtect : false,
					payment: this.payType,
					isDeposit: this.isDeposit,
					isProofingDeposit: this.isProofingDeposit
				}
				
				if (this.payType=="offline" && this.bankItem){
					params.bankAccountId = this.bankItem.addrId;
				}
				
				if (this.invoiceObject) {
					params.taxinfoId = this.invoiceObject.id
				}
				if (this.currentCoupon) {
					params.memcCode = this.currentCoupon.memcCode
				}
				
				let that = this;
				uni.requestSubscribeMessage({
					tmplIds: ['MxECqNfPcCuKEtwDdMOUSkW-4COyV1hMPd-m4KIsW0c'],
					success (res) { },
					fail(res){ },
					complete(e){
						that.$request(orderApi.createOrder, params, 'POST', '', 1).then(async res => {
							that.payOrders = res.data.order
							if (that.payMsg.creditInfoResult && that.payMsg.creditInfoResult.specialRequisition == 1) {
								that.applyApproval()
								return
							}
							let payParams = {
								orderId: that.payOrders.orderId,
								payment: that.payType
							}
							if (that.percentageChecked == '全款') {
								payParams.curPayAmount = res.data.totalAmount>0?res.data.totalAmount:'0'
							} else {
								payParams.curPayAmount = that.payMoney>0?that.payMoney:'0'
							}
							if (that.payType == 'deposit') {
								if (!userStore.getters.userInfo.mobile) {
									uni.showToast({
										title:"系统检测您没有绑定手机号，无法完成预存款支付，请选择其他支付方式！",
										icon:"none"
									})
									setTimeout(() => {
										uni.navigateTo({
											url: `/pages/user/order/detail?orderId=${that.payOrders.orderId}&status=0&fromPage=confirmOrder`
										})
									}, 2000)
									return
								}
								if (that.payMsg.setPayPassword){
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
								if (that.payOrders.finalAmount == 0) {
									that.handleReceivePassword('')
									return
								}
								that.$refs.prepaid.open()
								return
							} else if (that.payType == 'wxpayjsapi'){
								payParams.code = await that.getWeixinCode();
							}
							that.$request(orderApi.payOrder, payParams, 'POST', '', 1).then(response => {
								if (response.code == 200) {
									if (that.payType == 'credit') {
										toPaySuccess(that.payOrders.orderId)
									} else if (that.payType == 'wxpayjsapi') {
										if (that.payOrders.finalAmount == 0) {
											toPaySuccess(that.payOrders.orderId, '', true)
											return
										}
										uni.requestPayment({
											provider: that.providerList[0].id,
											timeStamp: response.data.jsapiParams.timeStamp,
											paySign: response.data.jsapiParams.paySign,
											package: 'prepay_id=' + response.data.jsapiParams.prepayId,
											signType: response.data.jsapiParams.signType,
											nonceStr: response.data.jsapiParams.nonceStr,
											success: (e) => {
												uni.showToast({
													title: "支付成功!"
												})
												toPaySuccess(that.payOrders.orderId, '', true)
											},
											fail: (e) => {
												uni.showModal({
													content: "支付已取消",
													showCancel: false
												})
												setTimeout(() => {
													uni.navigateTo({
														url: `/pages/user/order/detail?orderId=${that.payOrders.orderId}&status=0&fromPage=confirmOrder`
													})
												}, 2000)
											},
											complete: () => {
												that.providerList[0].loading = false;
											}
										})
									} else {
										toPaySuccess(that.payOrders.orderId)
									}
								} else {
									setTimeout(() => {
										uni.navigateTo({
											url: `/pages/user/order/detail?orderId=${that.payOrders.orderId}&status=0&fromPage=confirmOrder`
										})
									}, 1000)
								}
							})
						})
					}
					
				})
			},
			handleReceivePassword(val){
				let payParams = {
					orderId: this.payOrders.orderId,
					payment: this.payType,
					payPwd: val
				}
				if (this.percentageChecked == '全款') {
					payParams.curPayAmount = res.data.totalAmount>0?res.data.totalAmount:'0'
				} else {
					payParams.curPayAmount = this.payMoney>0?this.payMoney:'0'
				}
				this.$request(orderApi.payOrder, payParams, 'POST', '', 1).then(res => {
					if (res.code == 200) {
						this.$refs.prepaid.isPasswordShow = false
						uni.showToast({
							title: "支付成功!"
						})
						toPaySuccess(this.payOrders.orderId, '', true)
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				})
			},
			getWeixinCode(){
				return new Promise((resolve, reject) => {
					uni.login({
					  provider: 'weixin',
					  success: (loginRes) => {
						resolve(loginRes.code)
					  }
					});
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
			handlePayMoneyBlur(e){
				let val = e.detail.value
				if (val < 1){
					uni.showToast({
						title:"请输入大于1元",
						icon:"none"
					})
					this.payMoney = 1
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
				if ((this.percentageChecked == '全款' && val > this.orderPrice.orderPrice) || (this.percentageChecked != '全款' && val > this.payMsg.curPayAmount)) {
					this.payMoney = this.percentageChecked == '全款' ? this.orderPrice.orderPrice : this.payMsg.curPayAmount
					uni.showToast({
						title:"不能大于应付金额",
						icon:"none"
					})
					return
				}
				this.payMoney = val
			},
			applyApproval(){
				this.$request(orderApi.creditApply, {orderId: this.payOrders.orderId, vtext: this.payMsg.creditInfoResult.vtext}, 'POST', '', 1).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: "申请成功!"
						})
						toPaySuccess(this.payOrders.orderId, '等待审批')
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
						toPaySuccess(this.payOrders.orderId, '申请审批', false, true)
					}
				})
			},
			errorHandle(index){
				this.$set(this.goodsList[index], 'url', this.imgBaseUrl+"/icon/default4.png")
			},
			errorPartHandle(index, part_index){
				this.$set(this.goodsList[index].items[part_index], 'url', this.imgBaseUrl+"/icon/default4.png")
			},
			showMeal(item) {
				this.$set(this.templateData, 'goodsId', item.goodsId)
				this.$set(this.templateData, 'quantity', item.nums)
				let variablevalue = JSON.parse(item.variablevalue)
				let select_configs = {
					meal_vals:{
						...JSON.parse(item.selectvalue),
						box:{
							box_high: variablevalue.box_high,
							box_long: variablevalue.box_long,
							box_wide: variablevalue.box_wide,
							other_thick: variablevalue.other_thick || '',
							other_high: variablevalue.other_high || '',
							_other_tech: variablevalue.other_tech || []
						},
						_print_color:variablevalue._print_color || {}
					}
				}
				this.$set(this.templateData, 'select_configs', select_configs)
				this.$set(this.templateData, 'price', item.singlePrice)
				this.$set(this.templateData, 'name', item.name)
				this.$set(this.templateData, 'workname', item.workname)
				this.$set(this.templateData, 'costPrice', item.costPrice)
				this.$set(this.templateData, 'isStopEvent', true)
				this.isShowMeal = true;
			},
			spacificationClose(){
				this.isShowMeal = false;
			},
			changeDeduction(e){
				this.isDeposit = this.isDeposit ? 0 : 1
				this.changePayMoney(1)
			},
			changeProofing(e){
				this.isProofingDeposit = this.isProofingDeposit ? 0 : 1
				this.changePayMoney(2)
			},
			changePayMoney(type){
				this.payMoney = parseFloat(this.payMoney)
				if(type==2||type=='all'){
					if (this.isProofingDeposit) {
						this.payMoney -= this.proofingDeduction
					} else if(type!='all'){
						this.payMoney += this.proofingDeduction
					}
					
				}
				if(type==1||type=='all'){
					if (this.isDeposit) {
						this.payMoney -= this.depositDeduction
					} else if(type!='all'){
						this.payMoney += this.depositDeduction
					}
				}
			},
			checkeBank(){
				if(this.bankItem){
					uni.navigateTo({
						url:"/pages/user/bank/index?check="+this.bankItem.addrId
					})
				}else{
					uni.navigateTo({
						url:"/pages/user/bank/index?check=true"
					})					
				}
			}
		}
	}
</script>

<style lang="scss">
	@import './style/detail.scss'
</style>
<style>
	page{background-color: #f5f5f5;}
</style>
<style lang="scss">
	.parameter .materials .items{
		&.checked{
			display: block !important;
		}
		display: none !important;
	}
	.parameter .materials .label .cancel,.parameter .materials .addAttr,.technology .confirm{
		display: none;
	}
	.product-activety-info{
		font-size: 24rpx;
		>view{
			color: #FF5C33;
		}
		.activety-time{
			padding-bottom: 10rpx;
		}
	}
	.checkeBank{
		max-width: 220rpx;
	}
</style>

