<template>
	<view class="popUp">
		<view class="box">
			<!-- 成功 -->
			<text class="iconfont icon_toast_success" v-if="type=='succeed'">&#xeab3;</text>
			<!-- 加载中 -->
			<!-- <text class="iconfont icon_info_tips1" v-if="type=='load'">&#xeab5;</text> -->
			<!-- 失败 -->
			<text class="iconfont icon_info_tips1" v-if="type=='fail'">&#xeab5;</text>
			{{text}}
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		methods:{
			
		},
		props:["text","type"]
	}
</script>

<style lang="scss">
	.popUp{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		.box{
			min-width: 180rpx;
			padding: 30rpx;
			height: 188rpx;
			background: rgba(0, 0, 0, 0.7);
			border-radius: 16rpx;
			color: white;
			font-size: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			text{
				font-size: 68rpx;
				margin-bottom: 10rpx;
			}
		}
	}
</style>
