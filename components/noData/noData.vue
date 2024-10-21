<template>
	<view>
		<view class="tac"><image style="width:400rpx;height:330rpx;" :src="imgBaseUrl+'noData.png'" mode="aspectFit"></image></view>
		<view class="tac">{{text}}</view>
	</view>
</template>

<script>
	export default {
		name:"noData",
		props:{
			text:{
				default:'没有任何数据~',
				type:String
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>