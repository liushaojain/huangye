<template>
	<view class="receipt-page">
		<view class="receipt-list">
			<view class="receipt-item"
				v-for="(item, index) in receiptList"
				 v-if="item.deliverGoodsN!=item.recNumber"
				:key="index"
				:class="item.parts.length > 0 ? 'hasChild' : ''">
				<view class="receipt-item-main">
					<view class="receipt-item-top">
						<label class="radio" @click="changeItemSelect(index, item)">
							<radio :value="item.id" :checked="item.checked" color="#F9353B" style="transform: scale(0.7);"/><text>发货单： {{item.deliveryId}}</text>
						</label>
					</view>
					<view v-for="(val,key) in item.listConfirmReceipt" :key="key" v-if="val.number!=val.recNumber">
						<view class="receipt-item-content">
							<!-- <image :src="val.img" mode="aspectFit"></image> -->
							<view class="receipt-item-info">
								<view class="receipt-item-info-title">
									<text>{{val.productionName?val.productionName:val.name}}</text> 
									<text class="receipt-item-info-subTitle" v-if="val.productionName">（{{val.name}}）</text> 
									<text class="receipt-item-info-tag" v-if="val.itemTypeName">{{val.itemTypeName}}</text>
								</view>
								<!-- <view class="receipt-item-info-subTitle"><text>原商品名称{{val.name}}</text></view> -->
								<view class="receipt-item-info-count">×{{val.number}}</view> 
								<!-- <view class="receipt-item-info-count" v-if="val.recNumber">已收货数量：{{val.recNumber}}</view> -->
								
							</view>
						</view>
						<!-- s -->
					</view>
				</view>
				<!-- <template v-if="item.parts.length >0">
					<view v-for="(ite, ind) in item.parts" :key="ind" class="receipt-item-part" :class="ind != item.parts.length - 1 ? 'borderBottom' : ''">
						<view class="receipt-item-content">
							<image :src="item.img" mode="aspectFit"></image>
							<view class="receipt-item-info">
								<view class="receipt-item-info-title"><text>{{item.title}}</text></view>
								<view class="receipt-item-info-tag"><text>配件</text></view>
								<view class="receipt-item-info-count">发货数量：{{item.count}}</view>
							</view>
						</view>
						<view class="receipt-item-real-count">
							<view><text>*</text>实际发货数量</view>
							<view>{{item.realCount}}</view>
						</view>
					</view>
				</template> -->
			</view>
		</view>
		<view class="confirm-receipt">
			<label class="radio" @click="checkAll">
				<radio color="#F9353B" style="transform: scale(0.7);" :value="isAll" :checked="isAllChecked"></radio><text>全选</text>
			</label>
			<view class="confirm-receipt-btn" @click="showConfirm">确认收货</view>
		</view>
		<confirm-receipt 
			v-show="isShow" 
			:receiptList="receiptList" 
			:allReceive="isAllChecked" 
			:orderId="orderId"
			@receiptSure="handleReceiptSure"
			@close="handleClose">
		</confirm-receipt>
		<receipt-success class="receipt-success" v-if="isSuccess" @backList="handleBackList"></receipt-success>
	</view>
</template>

<script>
	import confirmReceipt from "./components/confirmReceipt.vue"
	import receiptSuccess from "./components/receiptSuccess.vue"
	import api from '@/store/order/index.js'
	import {moneyFormat} from '@/utils/util.js'
	export default{
		components:{confirmReceipt, receiptSuccess},
		data(){
			return{
				orderId:'',
				orderDetail:{},
				receiptList:[],
				isShow:false,
				isSuccess: false,
				isAllChecked:false
			}
		},
		onLoad(option) {
			this.orderId = option.orderId
			this.getOrderDetail()
		},
		methods:{
			getOrderDetail(){
				this.$request(api.getConfirmReceiptListByOrderId, {orderId: this.orderId}, 'GET', '', 1).then(res => {
					for(let item of res.data){
						item.checked= false;
						item.allnum= 0;
						item.recNumber= 0;
						item.deliverGoodsN= 0;
						for(let val of item.listConfirmReceipt){
							val.number= parseInt(val.number);
							// 发货单总数量
							item.deliverGoodsN+= parseInt(val.number);
							//  发货单已发货数量
							item.recNumber+= parseInt(val.recNumber);
							val.realQuantity= "";
							val.recNumber= parseInt(val.recNumber);
						}
					}
					this.receiptList = res.data
				})
			},
			changeItemSelect(index,item){
				item.checked=!item.checked;
				let allChecked=true;
				for(let item of this.receiptList){
					if(item.checked==false){
						allChecked=false;
					}
				}
				this.isAllChecked=allChecked;
			},
			checkAll(){
				this.isAllChecked=!this.isAllChecked;
				for(let item of this.receiptList){
					item.checked=this.isAllChecked;
				}
			},
			handleReceiptSure(val){
				this.isShow = false
				this.isSuccess = true
			},
			handleClose(){
				this.isShow = false
			},
			handleBackList(){
				uni.navigateTo({
					url:"/pages/user/order/index?type=1"
				})
			},
			showConfirm(){
				let confirmlist=[];
				for(let item of this.receiptList){
					if(item.checked){
						let realQuantity=[];
						
						confirmlist.push(item)
					}
				}
				if(confirmlist.length>0){
					this.isShow = true;
				}else{
					uni.showToast({
						icon:"none",
						title:"请选择发货单"
					})
				}
			},
			changeQuantity(val,item){
				if(val.recNumber!=0){
					let residueN= parseInt(val.number)-parseFloat(val.recNumber)
					if(residueN<parseInt(val.realQuantity)){
						uni.showToast({
							icon:"none",
							title:"实际收货数量不能大于剩余收货数量"
						})
						val.realQuantity=val.number;
					}
				}else if(parseInt(val.number)<parseInt(val.realQuantity)){
					uni.showToast({
						icon:"none",
						title:"实际收货数量不能大于发货数量"
					})
					val.realQuantity=val.number;
				}
				let allnum=0;
				for(let val of item.listConfirmReceipt){
					if(val.realQuantity){
						allnum+=parseInt(val.realQuantity);
					}
				}
				item.allnum=allnum;
			}
		}
	}
</script>

<style lang="scss">
	@import './style/receipt.scss'
</style>
<style lang="scss">
	page{background-color: #f5f5f5;}
	.receipt-item-real-count{
		input{
			width: 240rpx;
			text-align: right;
			background-color: #F4F5F6;
			border-radius: 8rpx;
			font-size: 28rpx;
			color: #93989F;
			padding-right: 16rpx;
			height: 60rpx;
		}
	}
</style>

