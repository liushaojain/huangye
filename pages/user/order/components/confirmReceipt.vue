<template>
	<view class="confirm-receipt-dialog">
		<view class="dialog-mask" @tap.self="closeDialog"></view>
		<view class="receipt-order-dialog order-dialog">
			<view class="dialog-title">签名确认</view>
			<!-- <view class="dialog-subTitle">请确认本次实际收货商品数量填写正确</view> -->
			<view class="dialog-container">
				<!-- <view class="dialog-order-detail">
					<view class="diaolog-order-detail-item" v-for="(item,index) in receiptList" :key="index" v-if="item.checked&&vitem.deliverGoodsN!=item.recNumber">
						<view class="diaolog-order-detail-item-orderNo flex-item">
							<view class="item-left">发货单：{{item.deliveryId}}</view>
							<view class="item-right">发货数量：<text>{{item.deliverGoodsN}}</text></view>
						</view>
						<view class="diaolog-order-detail-item-title flex-item" v-for="(val,key) in item.listConfirmReceipt" :key="key" v-if="val.number!=val.recNumber">
							<view class="item-left" v-if="val.itemTypeName!='null'">
								{{val.productionName}}
								<text>(原商品名称：{{val.name}})</text>
								<text class="receipt-item-info-tag" v-if="val.itemTypeName">{{val.itemTypeName}}</text>
							</view>
							<view class="item-left" v-else>{{val.productionName}}<text>{{val.itemTypeName}}</text></view>
							<view class="item-right">收货数量：<text>{{val.realQuantity}}</text></view>
						</view>
						<view class="diaolog-order-detail-item-total">收货总数：<text>{{item.allnum}}</text></view>
					</view>
				</view> -->
				<view class="dialog-signature">
					<!-- <view class="dialog-signature-title">签名确认</view> -->
					<view class="dialog-signature-area">点击开始签名
						<signature ref="mychild" @getImg="getImg"></signature>
					</view>
				</view>
			</view>
			<view class="dialog-actions">
				<view class="dialog-close btn" @click="closeDialog">取消</view>
				<view class="dialog-sure btn" @click="receiptSure">确定收货</view>
			</view>
		</view>
	</view>
</template>

<script>
	import signature from "@/components/xiaolu-signature/index.vue"
	import api from '@/store/order/index.js'
	export default{
		data(){
			return{
				
			}
		},
		components:{signature},
		props:['receiptList','allReceive','orderId'],
		created() {
		},
		mounted() {
		},
		methods:{
			closeDialog(){
				this.$emit('close')
			},
			receiptSure(){
				this.$refs.mychild.save();
			},
			getDelivery(){
				let data={
					orderId: this.orderId,
					allReceive: this.allReceive,
					deliveryIds: [],
					deliveryItems: []
				}
				for(let item of this.receiptList){
					if(item.checked){
						data.deliveryIds.push(item.deliveryId);
						for(let val of item.listConfirmReceipt){
							let deliveryItem={
								deliveryId: item.deliveryId,
								orderItemId: val.orderItemId,
								recNumber: val.number
							}
							data.deliveryItems.push(deliveryItem)
						}
					}
				}
				return data
			},
			// 获取签名后确认收货
			getImg(e){
				let postData= this.getDelivery();
				postData.signatur=e;
				this.$request(api.updateConfirmReceipt,postData,"POST","",1).then(res=>{
					if(res.code==200){
						this.$emit('receiptSure')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../style/orderDialog.scss'
</style>
