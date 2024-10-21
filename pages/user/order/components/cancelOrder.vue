<template>
	<view class="cancel-order">
		<view class="dialog-mask" @tap.self="closeDialog"></view>
		<view class="cancel-order-dialog order-dialog">
			<view class="dialog-title">取消订单</view>
			<view class="dialog-subTitle">取消后无法恢复，优惠券可退回，有效期内使用</view>
			<view class="dialog-reason-title">请选择取消订单原因</view>
			<scroll-view class="dialog-conent" scroll-y="true" :scroll-top="scrollTop">
				<view class="dialog-reason-list">
					<view class="dialog-reason-item" :class="checkReason == item.id ? 'active' : ''" v-for="(item, index) in reasons" :key="index" @click="changeCheckReason(item.id)">
						<view>{{item.label}}</view>
						<text class="iconfont iconicon_progress_done" v-if="checkReason == item.id"></text>
					</view>
				</view>
				<view class="other-reason" id="other" v-show="checkReason == 7">
					<textarea v-model="otherReason" style="font-size: 30rpx;" placeholder="请输入其他原因" />
				</view>
			</scroll-view>
			<view class="dialog-actions">
				<view class="dialog-close button" @click="closeDialog">暂不取消</view>
				<view class="dialog-sure button" @click="cancelSure">确定取消</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				reasons:[],
				checkReason: '',
				otherReason:'',
				scrollTop: ''
			}
		},
		methods:{
			changeCheckReason(id){
				this.checkReason = this.checkReason == id ? '' : id
				if (this.checkReason == 7) {
					this.scrollTop = 500
				}
			},
			closeDialog(){
				this.checkReason = ''
				this.$emit('close')
			},
			cancelSure(){
				if (this.checkReason == 7 && !this.otherReason.trim()) {
					uni.showToast({
						title:"请输入其他原因",
						icon:"none"
					})
					return
				}
				this.$emit('cancelSure', {checkReason: this.checkReason, otherReason: this.otherReason})
			}
		}
	}
</script>
<style lang="scss">
	@import '../style/orderDialog.scss'
</style>
