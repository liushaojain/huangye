<template>
	<view class="complain-page">
		<view class="complain-title">请选择投诉类型</view>
		<view class="complain-list">
			<view class="flex-between itemsCenter" :class="deliveryDisabled ? 'disabled' : 'active'" @click="toDeliveryComplain">
				<view class="flex-start itemsCenter">
					<text class="iconfont iconico_time_complaint" :class="deliveryDisabled ? '' : 'blueFont'"></text>
					<view class="complain-item">
						<view>交期投诉</view>
						<view>商品超过预定交期仍未收货</view>
					</view>
				</view>
				<text class="iconfont iconicon_label_arrow_right"></text>
			</view>
			<view class="flex-between itemsCenter" :class="qualityDisabled ? 'disabled' : 'active'" @click="toQualityComplain">
				<view class="flex-start itemsCenter">
					<text class="iconfont iconico_quality" :class="qualityDisabled ? '' : 'blueFont'"></text>
					<view class="complain-item">
						<view>品质投诉</view>
						<view>商品质量有问题</view>
					</view>
				</view>
				<text class="iconfont iconicon_label_arrow_right"></text>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/store/order/index.js'
	export default{
		data(){
			return{
				orderId: '',
				deliveryDisabled: true,
				qualityDisabled: true
			}
		},
		onLoad(option) {
			this.orderId = option.orderId
			this.getComplaintReady()
		},
		methods:{
			toDeliveryComplain(){
				if (this.deliveryDisabled) return
				uni.navigateTo({
					url: '/pages/user/order/complainDelivery?orderId=' + this.orderId
				})
			},
			toQualityComplain(){
				if (this.qualityDisabled) return
				uni.navigateTo({
					url: '/pages/user/order/complainQuality?orderId=' + this.orderId
				})
			},
			getComplaintReady(){
				this.$request(api.getComplaintReady, {orderId: this.orderId}, 'POST', '', 1).then(res => {
					this.deliveryDisabled = res.data.overdueComplaintReadyRes === null
					this.qualityDisabled = res.data.qualityComplaintReadyResList === null
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './style/complain.scss'
</style>

<style lang="scss" scoped>
	.disabled{
		view, .iconfont{color: #C9CBCF !important;}
	}
</style>
