<template>
	<view class="complain-success">
		<view class="complain-main">
			<view><text class="iconfont iconpic_info_success" style="color: #1F90FF;"></text></view>
			<view>提交成功</view>
			<view>我们会尽快安排发货。感谢对虎翼智印的支持，</view>
			<view>给您造成不便，深感抱歉！</view>
			<view class="sure-btn" @click="successHandle">确定</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			successHandle(){
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 3]; //上上一个页面
				prevPage.$vm.getOrderDetail()
				uni.navigateBack({
					delta: 2
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '../style/complainSuccess.scss'
</style>
