<template>
	<view class="confirm-order-page" :class="isShowMeal ? 'bottom-fixed' : ''">
		<navigator hover-class="none" class="pay-address flex-between" v-if="JSON.stringify(address) != '{}'" :url="'/pages/user/address/index?fromPage=confirmOrder&addrId=' + address.addrId">
			<view class="pay-address-left">
				<view class="pay-address-top flex-start">
					<image class="addressIcon" :src="imgBaseUrl+'ico_shouhuodizhi@2x.png'" mode=""></image>
					<text class="name">{{address.name}}</text>
					<text class="phone">{{address.mobile}}</text>
				</view>
				<view class="address">{{address.area}}{{address.addr}}</view>
			</view>
			<view class="arrow-right">
				<text class="iconfont icon-icon_label_arrow_right top16"></text>
			</view>
		</navigator>
		<navigator hover-class="none" class="pay-address pay-address-empty flex-between itemsCenter" v-else url="/pages/user/address/index?fromPage=confirmOrder">
			<view class="flex-start">
				<image class="addressIcon" :src="imgBaseUrl+'ico_shouhuodizhi@2x.png'" mode=""></image>
				<text style="font-size: 30rpx;margin-left: 12rpx;">请选择收货地址</text>
			</view>
			<view class="arrow-right">
				<text class="iconfont icon-icon_label_arrow_right"></text>
			</view>
		</navigator>
		<view class="pay-goods">
			<view class="pay-goods-item" v-for="(item, index) in goodsList" :key="index">
				<view class="pay-goods-main flex-between">
					<image :src="item.url" mode="aspectFill"></image>
					<view class="pay-goods-item-content flex-start">
						<view class="pay-goods-item-title">
							<view class="first-title">{{item.workname ? item.workname : item.name}}</view>
							<view class="last-title" v-if="item.workname && item.name">(商品原名称:{{item.name}})</view>
							<view class="pay-goods-item-tag mainTag">主商品</view>
							<view class="mt10"><text class="last-title">模板名称:{{item.templateName}}</text></view>
						</view>
						<view class="pay-goods-item-meal" v-if="item.isVcGoods && item.mealName" @click.stop="showMeal(item)"><text class="mealName" style="max-width: 450rpx;">{{item.mealName}}</text><text class="iconfont" :class="isShowMeal ? 'iconicon_arrow_up' : 'iconicon_arrow_down_white'"></text></view>
						<view class="pay-goods-item-specification" v-if="item.specInfo">
							<view class="ellipsis">{{item.specInfo}}</view>
						</view>
						
						<view class="pay-goods-item-bottom">
							<view class="redFont" v-if="goodsPriceShow">
								¥{{item.singlePrice|toFixed_f}}
								<text class="ellipsis costPrice" v-if="item.preferentialPirce">￥{{item.costPrice|toFixed_f}} </text>
							</view>
							<view>x {{item.nums}}个</view>
						</view>
					</view>
				</view>
				<view class="pay-goods-parts" v-if="item.items.length > 0">
					<view class="pay-goods-parts-item flex-between" v-for="(part , part_index) in item.items" :key="part_index">
						<image class="pay-goods-item-info-img" :src="part.url" mode="aspectFill"></image>
						<view class="pay-goods-item-content flex-start">
							<view class="pay-goods-item-title">
								<!-- <text class="first-title">{{part.name}}</text> -->
								
								<view class="first-title">{{part.workname ? part.workname : part.name}}</view>
								<view class="last-title" v-if="part.workname && part.name">(商品原名称:{{part.name}})</view>
								<view class="pay-goods-item-tag" v-if="part.winDiy === 'true' && (part.customType == 'outer_box'||part.customType == 'bag')">定制</view>
								<view class="pay-goods-item-tag" v-if="part.winDiy === 'false' && (part.customType == 'outer_box'||part.customType == 'bag')">非定制</view>
								<view class="mt10" v-if="part.templateName"><text class="last-title">模板名称:{{part.templateName}}</text></view>
							</view>
							<view class="pay-goods-item-meal" v-if="part.isVcGoods && part.mealName" @click.stop="showMeal(part)"><text class="mealName" style="max-width: 380rpx;">{{part.mealName}}</text><text class="iconfont" :class="isShowMeal ? 'iconicon_arrow_up' : 'iconicon_arrow_down_white'"></text></view>
							<view class="pay-goods-item-bottom">
								<view class="redFont" v-if="goodsPriceShow">¥{{part.singlePrice|toFixed_f}}</view>
								<view>x {{part.nums}}个</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- <view class="pay-goods-bottom flex-end">
				<template v-if="orderPrice.preferentialPirce > 0">
					<view class="pay-goods-discount">已优惠<text>¥{{moneyFormat(orderPrice.preferentialPirce)}}</text></view>
				</template>
				<view class="pay-goods-amount">小计<text>¥{{moneyFormat(orderPrice.goodsPirce)}}</text></view>
			</view> -->
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
							<text>{{currentDistribution.dt_name}}<text v-if="goodsPriceShow" class="distribution-money">，¥{{orderPrice.yfandProPirce|toFixed_f}}</text></text>
						</template>
						<template v-else><text>{{currentDistribution.dt_name}}</text></template>
					</template>
					<text class="iconfont icon-icon_label_arrow_right"></text>
				</view>
			</view>
			<view class="item-content flex-between">
				<view>开具发票</view>
				<view @click="invoiceShow = true" class="flex-end itemsCenter">{{invoiceChecked == '开具发票' ? invoiceObject.taxTitle : invoiceChecked}}<text class="iconfont icon-icon_label_arrow_right"></text></view>
			</view>
			<view class="item-content flex-between">
				<view>订单备注</view>
				<view @click="$refs.remark.showRemark()" class="tae">{{memo||'请输入'}}</view>
				<!-- <input @focus="$refs.remark.showRemark()" type="text" v-model="memo" maxlength="200" class="remark-input" placeholder="请输入" placeholder-style="color:#C9CBCF" style="color: #60656C;"> -->
			</view>
			<view class="item-content flex-between">
				<view>优惠券</view>
				<view class="textR itemsCenter ellipsis" @click="goToMyCoupon">
					{{orderPrice.isUseCoupon ? (currentCoupon ? currentCoupon.name : '请选择优惠券') : '暂无优惠券'}}
					<text class="iconfont icon-icon_label_arrow_right"></text>
				</view>
			</view>
		</view>
		<view class="pay-discount pay-detail" v-if="goodsPriceShow">
			<view class="item-content flex-between">
				<view>小计</view>
				<view class="discount-amount flex-end itemsCenter goodsPirce">￥<text>{{moneyFormat(orderPrice.goodsPirce)}}</text></view>
			</view>
			<view class="item-content flex-between" v-if="orderPrice.couponPrice > 0">
				<view>优惠</view>
				<view class="discount-amount flex-end itemsCenter redFont">
					-￥<text class="couponPrice">{{moneyFormat(orderPrice.couponPrice)}}</text> 
				</view>
			</view>
			<view class="item-content flex-between" v-if="orderPrice.preferentialPirce > 0">
				<view>折扣</view>
				<view class="discount-amount flex-end itemsCenter redFont">
					-￥<text>{{moneyFormat(orderPrice.preferentialPirce)}}</text> 
				</view>
			</view>
			<view class="item-content flex-between" v-if="payMoney > 0">
				<view>需支付</view>
				<view class="discount-amount flex-end itemsCenter redFont">￥<text class="pay">{{moneyFormat(payMoney)}}</text></view>
			</view>
		</view>
		<view class="submit-btn">
			<view class="pay-money" v-if="goodsPriceShow">合计：
				<text v-if="payMoney>0">¥{{moneyFormat(payMoney)}}</text>
				<text v-else>¥0.00</text>
			</view>
			<view class="pay-money" v-else></view>
			<view class="submit-order blueBg whiteFont" @click="submitOrder" v-if="payMsg.creditInfoResult && payMsg.creditInfoResult.specialRequisition == 1">申请特批</view>
			<view class="submit-order blueBg whiteFont" @click="submitOrder" v-else-if="payMsg.creditInfoResult && payMsg.creditInfoResult.specialRequisition == 500">提交订单</view>
			<view class="submit-order blueBg whiteFont" @click="submitOrder" v-else>提交订单</view>
		</view>
		<action-sheet :actionsheet="distributionTypes" ref="actionSheet" @change="handleChange"></action-sheet>
		<check-select :select="invoiceTypes" ref="invoiceCheckSelect" :checked="invoiceChecked" @transfer="handleCheckedInvoice" v-show="invoiceShow"></check-select>
		<check-select :select="percentageTypes" ref="percentageCheckSelect" :checked="percentageChecked" @transfer="handleCheckedPercentage" v-show="percentageShow"></check-select>
		<pre-paid ref="prepaid" :orderNo="payOrders.orderId" :payPrice="payMoney" @sendPassword="handleReceivePassword"></pre-paid>
		
		<check-select :select="discountsTypes" ref="discounts" :checked="discountsChecked" @transfer="discounts" v-show="discountsShow" discount="true" name="name"></check-select>
	
		<remark ref="remark" v-on:remarkCall="remarkCall"></remark>
	</view>
</template>

<script>
	import actionSheet from '../components/actionSheet.vue'
	import checkSelect from '@/components/checkselect/index.vue'
	import prePaid from '@/components/payModal/prepaid.vue'
	// import technology from "./components/technology.vue"
	import amountApi from "@/store/account/index.js"
	import orderApi from "@/store/order/index.js"
	// import spacificationTmpl from '../cart/components/spacification.vue';
	import {moneyFormat, toPaySuccess} from '@/utils/util.js'
	import { userStore } from "@/store/account/userInfo.js"
	import api from "@/store/account/index.js"
	import remark from '../cus/remark.vue'
	export default {
		data(){
			return {
				imgBaseUrl: this.imgBaseUrl,
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
				orderData:"",
				isShowMeal:false,
				templateData:{},
				dataAttr:{
					specification:false,
					price:"",
					goodsId:"",
					quantity:"",
					select_configs:"",
					mainproducts:1,
					isStopEvent:false
				},
				depositDeduction: 0,
				proofingDeduction: 0,
				isDeposit: 0,
				isProofingDeposit: 0,
				designOrderId: '',
				bankItem: "",
				discountsShow: false,
				discountsTypes: [],
				discountsChecked: "",
				creating: false,
				source: 1, //默认1，2订单列表订单详情
			}
		},
		computed: {
			goodsPriceShow: function() {
				return userStore.state.userInfo.goodsPriceShow;
			}
		},
		components:{actionSheet, checkSelect, prePaid,remark},
		onLoad(option) {
			this.source = option.source;
			
			this.orderData={worksIds:option.ids.split(",")};
			this.getGoodsList()
			this.getDefaultAddress()
			// this.getListBank()
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
		methods:{
			moneyFormat,
			remarkCall(val){
				this.memo=val;
			},
			getListBank(){
				let that=this;
				this.$request(api.getListBank,"","GET","",1).then((res)=>{
					this.bankItem = res.data.find(item=>{
						return item.defAccount == 1
					})
				})
			},
			showMeal1(item){
				this.dataAttr.price=item.cartTotalPrice;
				this.dataAttr.goodsId=item.goodsId;
				this.dataAttr.quantity=item.nums;
				this.dataAttr.selectConfig=item.selectvalue
				this.dataAttr.specification=true;
			},
			getSelectConfigs(e){
				if(e==false){
					this.dataAttr.specification=false
				}
			},
			getData(){
				let that=this;
				// 主商品
				let orderData={
					"orderItems":[
						{
							"productId":that.orderData.productId,
							"nums":that.orderData.quantity,
							"type":1,
							"workname":that.orderData.workname,
							"workName":that.orderData.workname,
							"designOrderId": this.designOrderId
						}
					]
				}
				if(that.orderData.params){//vc商品
					orderData.orderItems[0].params = that.orderData.params;
					if(that.orderData.params.mealId){
						orderData.orderItems[0].mealId=that.orderData.params.mealId;
						orderData.orderItems[0].mealName=that.orderData.params.mealName;
					}
				}else if(that.orderData.select_configs){
					orderData.orderItems[0].selectConfig=that.orderData.select_configs
				}
				
				if(that.orderData.designOrderId){
					orderData.orderItems[0].designOrderId=that.orderData.designOrderId
				}
				
				// 内托
				if(that.orderData.supportproductId){
					let item={
						"productId":that.orderData.supportproductId,
						"nums":that.orderData.quantity,
						"type":2,
						"workName":that.orderData.supportWorkname,
						"workname":that.orderData.supportWorkname,
					}
					if(that.orderData.supportParams){
						item.params = that.orderData.supportParams;
						if(!item.workName){
							item.workname = that.orderData.supportParams.workname
							item.workName = that.orderData.supportParams.workname
						}
						if(that.orderData.mealName){
							item.mealName=that.orderData.supportParams.mealName;
						}
					}else if(that.orderData.support_select_configs){
						item.selectConfig=that.orderData.support_select_configs
					}
					orderData.orderItems.push(item)
				}
				
				//配件
				if(that.orderData.combinationReqs){
					for(let index in that.orderData.combinationReqs){
						let	val=that.orderData.combinationReqs[index];
						let item={
							"productId":val.productId,
							"nums":val.quantity,
							"type":3,
							"workname":val.workname,
							"workName":val.workname
						}
						if (val.params) {
							item.params = val.params;
							if(val.params.mealName){
								item.mealName=val.params.mealName;
							}
						}
						orderData.orderItems.push(item)
					}
				}
				if(this.address.addrId){
					orderData.addrId=this.address.addrId
				}
				
				return orderData
			},
			getDefaultAddress(){
				if(userStore.state.userInfo.addressIsOpen) {
					this.$request(orderApi.businessInfo,{}, 'GET', '', 1).then(res => {
						if (res.code == 200) {
							this.$request(amountApi.getDefAddr, {businessId: res.data.businessId}, 'GET', '', 0).then(res => {
								this.address = res.data || {}
								this.getOrderPrice()
							})
						}
					})
				}else {
					this.$request(amountApi.getDefAddr, {}, 'GET', '', 0).then(res => {
				  	this.address = res.data || {}
				  	this.getOrderPrice()
			  	})
				}
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
					this.address = val;
					
					this.currentDistribution=null;
					
					this.getShippingFreight(this.address.addrId)
					await this.getShippingFreight(this.address.addrId)
					
					this.getOrderPrice()
				}
			},
			getGoodsList(){
				let that=this;
				// if(that.orderData.supportParams.workname){
				// 	that.orderData.supportWorkname=that.orderData.supportParams.workname;
				// }
				this.$request(orderApi.getGoodsListV2,that.orderData, 'POST', '', 1,1).then(function(res){
					if(that.orderData && that.orderData.workname){
						res.data.workname=that.orderData.workname;
					}
					
					that.goodsList = [];
					that.goodsList =that.goodsList.concat(res.data)
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
					let orderData=this.orderData
					if(addrId){
						orderData.addrId=this.address.addrId
					}
					
					this.$request(orderApi.shippingFreightV2, orderData, 'POST', '', 1).then(res => {
						if (this.currentDistribution) {
							let oldDis = JSON.parse(JSON.stringify(this.currentDistribution))
							this.currentDistribution = this.distributionTypes.filter(item => item.dt_id == this.currentDistribution.dt_id)[0]
							this.$set(this.currentDistribution, 'isProtect', oldDis.isProtect)
						}
						this.distributionTypes = res.data;
						
						if(res.code!=200){
							this.currentDistribution=null;
							this.distributionTypes=[];
						}
						
						resolve()
					})
				})
			},
			getOrderPrice(){
				let orderData={};
				orderData.worksIds = this.orderData.worksIds;
				orderData.addrId = this.address.addrId;
				if (this.currentCoupon) {
					orderData.memcCode = this.currentCoupon.couponNumber
				}
				if (this.currentDistribution) {
					orderData.shippingId = this.currentDistribution.dt_id
					orderData.isProtect = this.currentDistribution.isProtect ? this.currentDistribution.isProtect : false
				}
				this.$request(orderApi.orderPriceV2, orderData, 'POST', '', 1).then(res => {
					this.orderPrice = res.data;
					this.goodsList.forEach(item => {
						let ite = this.orderPrice.goods.find(ele => ele.productId == item.productId && item.type==1)
						this.$set(item, 'singlePrice', ite.goodsPrice)
						if (item.items && item.items.length > 0) {
							item.items.forEach(item_ => {
								let ite_ = this.orderPrice.goods.find(ele_ => ele_.productId == item_.productId && item_.type!=1)
								this.$set(item_, 'singlePrice', ite_.goodsPrice)
							})
						}
					})
					this.depositDeduction = parseFloat(res.data.depositDeduction);
					this.proofingDeduction = parseFloat(res.data.proofingDeduction);
					this.payMsg = res.data.payTypes
					// this.payType = res.data.payTypes.payments.filter(item => item.checked)[0].payMethod;
					let payTypes1 = res.data.payTypes.payments.filter(item => item.checked)[0].payMethod;
					let payTypes2 = res.data.payTypes.payments.filter(item => item.payMethod == "wxpayjsapi");
					this.payType = payTypes2.length>0?payTypes2[0].payMethod:payTypes1;
					this.percentageTypes = [`预付${this.payMsg.payPercentage * 100}%`, '全款']
					this.percentageChecked = `预付${this.payMsg.payPercentage * 100}%`
					this.bankMsg = res.data.payTypes.payments.filter(item => item.payMethod == 'offline')[0]
					this.payMoney = this.orderPrice.orderPrice.toFixed(2)
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
							url:"/pages/user/invoice/list?fromPage=confirmOrder" + (this.invoiceObject ? "&id=" + this.invoiceObject.id : "")
						})
					}
				}
				this.invoiceShow = false
			},
			handleCheckedPercentage(e){
				if (e) {
					this.percentageChecked = e
					this.payMoney = this.percentageChecked == '全款' ? this.orderPrice.orderPrice.toFixed(2) : this.payMsg.curPayAmount.toFixed(2)
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
				let goods = [];
				let gnsIds = [] 
				this.goodsList.forEach(item => {
					goods.push({
						goodsId: item.goodsId,
						goodsAmount: item.cartTotalPrice
					})
				})
				this.orderPrice.goods.forEach(item => {
					if(item.gnsId){
						gnsIds.push(item.gnsId)
					}
				})
				this.getCanUseCouponList(goods,gnsIds)
			},
			
			getCanUseCouponList(goods,gnsIds){
				this.$request(api.orderUseList,{goods:goods,gnsIds:gnsIds}, 'PUT', '', 1).then(res => {
					for(let index in res.data){
						let item = res.data[index];
						item.index = index;
					}
					this.discountsTypes = res.data;
					this.discountsShow = true;
				})
			},
			discounts(res){
				if(res){
					this.discountsChecked = res;
					this.currentCoupon = res;
				}else{
					this.currentCoupon = "";
					this.discountsChecked = "";
				}
				this.discountsShow = false;
				this.getOrderPrice()
			},
			submitOrder(){
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
				if(this.creating){
					return false
				}else{
					this.creating = true;
				}
				
				let params = {
					worksIds: this.orderData.worksIds,
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
				
				// diy商品
				if(this.orderData.worksId){
					params.worksId = this.orderData.worksId;
				}
				
				if (this.invoiceObject) {
					params.taxinfoId = this.invoiceObject.id;
				}
				if (this.currentCoupon) {
					params.memcCode = this.currentCoupon.couponNumber;
				}
				if (this.goodsPriceShow) {
					params.isOpenBusinessPay = 0
				}else {
					params.isOpenBusinessPay = 1
				}
				
				let that = this;
				uni.requestSubscribeMessage({
					tmplIds: ['M0ZtVrxiVQ4SRPmSjUQsdDjuNtaS7lAgqS8xP7URRHs','S80yqdrxhHfSJ9jpiG6iz3DOCMvLXKn7uyU_U8iNUWg'],
					success (res) {console.log(1,res)},
					fail(res){console.log(2,res)},
					complete(e){
						that.creating = false;
						that.$request(orderApi.createOrder, params, 'POST', '', 1).then(async res => {
							that.payOrders = res.data.orders
							if(that.goodsPriceShow) {
								if(that.source==2){
									uni.navigateTo({
										url:"/pages/user/order/payment?isComfirmOrder=1&orderId=" + res.data.orders.orderId
									})
								}else{
									uni.reLaunch({
										url:"/pages/user/order/payment?isComfirmOrder=1&orderId=" + res.data.orders.orderId
									})
								}
							}else {
								that.$request(orderApi.businessInfo, {}, 'GET', '', 1).then(result => {
									if (result.code == 200) {
										uni.showModal({
											title: '提示',
											content: `订单创建成功，订单号${res.data.orders.orderId}, 请联系商家确认订单并付款哦, 商家联系方式：${result.data.phone}`,
											showCancel: false,
											confirmText:'确定',
											success: (result) => {
												if (result.confirm) {
													uni.switchTab({
														url:"/pages/user/index?toOrderList=1"
													})
												}
											}
										});
									}
								})
							}
							return false
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
								if (that.payMsg.setPayPassword) {
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
								payParams.code = await that.getWeixinCode()
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
												toPaySuccess(that.payOrders.orderId)
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
							that.creating = false;
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
				// return
				if (this.percentageChecked == '全款') {
					// payParams.curPayAmount = res.data.totalAmount>0?res.data.totalAmount:'0'
					payParams.curPayAmount = this.payMoney>0?this.payMoney:'0'
				} else {
					payParams.curPayAmount = this.payMoney>0?this.payMoney:'0'
				}
				this.$request(orderApi.payOrder, payParams, 'POST', '', 1).then(res => {
					if (res.code == 200) {
						this.$refs.prepaid.isPasswordShow = false
						uni.showToast({
							title: "支付成功!"
						})
						toPaySuccess(this.payOrders.orderId)
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
					this.payMoney = this.percentageChecked == '全款' ? this.orderPrice.orderPrice.toFixed(2) : this.payMsg.curPayAmount.toFixed(2)
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
					}
				})
			},
			showMeal(item) {
				this.$set(this.templateData, 'goodsId', item.goodsId)
				this.$set(this.templateData, 'quantity', item.nums)
				let variablevalue = JSON.parse(item.variablevalue)
				let select_configs = {
					meal_vals: {
						...JSON.parse(item.selectvalue),
						box:{
							box_high: variablevalue.box_high,
							box_long: variablevalue.box_long,
							box_wide: variablevalue.box_wide,
							_other_tech: variablevalue.other_tech || [],
							other_thick: variablevalue.other_thick || '',
							other_high: variablevalue.other_high || ''
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

<style lang="scss" scoped>
	@import './confirm.scss'
</style>
<style lang="scss">
	page{
		background-color: #f5f5f5;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
	.redFont{
		.costPrice{
			color: #93989F;
			text-decoration: line-through;
			margin-left: 16rpx;
		}
	}
	.parameter .materials .items{
		&.checked{
			display: block !important;
		}
		display: none !important;
	}
	.parameter .materials .label .cancel,.parameter .materials .addAttr,.technology .confirm,.meal{
		display: none;
	}
	.pay-goods-item-specification text:first-child{
		max-width: 460rpx;
		display: inline-block;
	}
	.pay-goods-item-specification text:last-child{
		font-size: 30rpx;
	}
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
	.technology .container{
		height: 840rpx !important;
	}
	.technology .SBhhh {
	    height: 655rpx !important;
	}
	.checkeBank{
		max-width: 220rpx;
	}
</style>

