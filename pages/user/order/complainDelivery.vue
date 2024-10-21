<template>
	<view class="complain-delivery-page">
		<view class="delivery-info">
			<view class="flex-between">
				<view>订单最晚交货日期</view>
				<view>{{deliveryDate}}</view>
			</view>
			<view class="flex-between">
				<view>超期天数</view>
				<view>{{postponeDate}}天</view>
			</view>
		</view>
		<view class="complain-delivery-content">
			<view class="content-title flex-between">
				<view><text class="redFont">*</text>投诉详情</view>
				<view>{{content.length > 500 ? 500 : content.length}}/500字</view>
			</view>
			<view>
				<textarea v-model="content" placeholder="请输入投诉内容" maxlength="500"></textarea>
			</view>
		</view>
		<view class="submit-btn" @click="submit">提交</view>
		<complainSuccess v-if="isShow"></complainSuccess>
	</view>
</template>

<script>
	import api from '@/store/order/index.js'
	import complainSuccess from './components/complainSuccess.vue'
	export default{
		data(){
			return {
				orderId: '',
				deliveryDate: '',
				postponeDate: '',
				content: '',
				isShow: false
			}
		},
		components:{complainSuccess},
		onLoad(option) {
			this.orderId = option.orderId
			this.getComplaintReady()
		},
		methods:{
			getComplaintReady(){
				this.$request(api.overdueComplaintReady, {orderId: this.orderId}, 'POST', '', 1).then(res => {
					this.deliveryDate = res.data.deliveryDate
					this.postponeDate = res.data.postponeDate
				})
			},
			submit(){
				let param = {
					complaintBody: this.content,
					deliveryDate: this.deliveryDate,
					orderId: this.orderId,
					postponeDate: this.postponeDate
				}
				this.$request(api.insertOverdueComplaint, param, 'POST', '', 1).then(res => {
					if (res.code == 200) {
						this.isShow = true
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './style/complainDelivery.scss'
</style>
