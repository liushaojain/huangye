<template>
	<view class="selectSexBox">
		<view class="ft36 ">选择你的婚姻状态</view>
		<view class="ft22 c9 mt6">我们提倡真实社交</view>
		<view class="selectSex">
			<view class="selectCity" @click="open">
				<view class="flex1" >
					<image :src="imgBaseUrl+'Maskgroup@2x.png'" mode="aspectFill"></image>
					<text v-if="location" class="c3">{{CityText}}</text>
					<text v-else>选择城市</text>
					
				</view>
				<u-icon name="arrow-right" color="#C0C0C0"></u-icon>
			</view>
			<barry-picker ref="dialog" @get-address="getAddress"></barry-picker>
		</view>
		<button class="confirm" @tap="comfirm">确定</button>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				imgBaseUrl: this.imgBaseUrl,
				location: '',
			}
		},
		computed:{
			CityText(){
				if(this.location){
					return this.location.value.join("-")
				}else{
					return '选择城市'
				}
				
			}
		},
		methods:{
			comfirm(){
				if(this.location){
					this.$emit("getCity",this.location)
				}
				
			},
			open() {
				this.$refs.dialog.show = true
			},
			getAddress(e) {
				this.location = e
			}
			
		}
	}
</script>

<style lang="scss">
	.selectSexBox{
		padding: 28rpx 44rpx;
		background: white;
		border-radius: 16rpx;
		margin-top: 32rpx;
		.selectSex{
			display: flex;
			height: 426rpx;
			padding: 36rpx 0px 14rpx 0rpx;
			justify-content: center;
		}
		.confirm{
			width: 520rpx;
			height: 88rpx;
			background: linear-gradient( 271deg, #F5496D 0%, #FF7592 100%);
			border-radius: 200rpx 200rpx 200rpx 200rpx;
			display: block;
			margin: 48rpx auto;
			color: white;
			font-size: 36rpx;
			letter-spacing: 4rpx;
		}
	}
	.selectCity{
		display: flex;
		align-items: center;
		width: 574rpx;
		height: 100rpx;
		background: rgba(255,255,255,0.08);
		border-radius: 16rpx 16rpx 16rpx 16rpx;
		padding: 0 16rpx;
		border: 2rpx solid #BBBBBB;
		image{
			width: 31rpx;
			height: 43rpx;
			margin-right: 10rpx;
		}
		view{
			color: #C0C0C0;
			font-size: 32rpx;
			display: flex;
			align-items: center;
		}
	}
</style>