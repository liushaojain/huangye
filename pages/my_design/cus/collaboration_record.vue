<template>
	<view class="cus">
		<view class="cus_box">
			<view class="tac p30 ft30">协作记录</view>
			<view class="items">
				<view class="flex_a mlr30 item" v-for="item in 10">
					<view><image style="width:100rpx;height:100rpx;" :src="imgBaseUrl+'1652924948(1).png'" mode="aspectFit"></image></view>
					<view class="ml20">
						<view class="ft30">13511111111</view>
						<view class="mt10 c9">2022年3月4日 12:33</view>
					</view>
				</view>
			</view>
			<view @click="$emit('collaborationRecordCall')" class="flex_aj color_a3 p30"><text>确定</text></view>
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
			
		}
	}
</script>

<style lang="scss">
	.cus_box{
		background-color: #ffffff;
		width:80%;
		border-radius: 15rpx;
		position: absolute;
		left:50%;
		top:50%;
		transform: translate(-50%,-50%);
	}
	.items{
		max-height: 500rpx;
		overflow-y: scroll;
	}
	.item{
		background-color: #F7F7F7;
		padding:20rpx;
		border-radius: 15rpx;
	}
</style>