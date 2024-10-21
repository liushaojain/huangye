<template>
	<view class="receipte-success-dialog">
		<!-- <view class="success-icon">
			<view><text class="iconfont iconpic_info_success"></text></view>
			<view>确认收货成功</view>
		</view> -->
		<view class="back-list" @click="backList">返回订单列表</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			backList(){
				this.$emit('backList')
			}
		}
	}
</script>

<style lang="scss">
	@import '../style/receiptSuccess.scss'
</style>
