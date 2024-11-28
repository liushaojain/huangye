<template>
	<view class="selectSexBox">
		<view class="ft36 ">选择你的性别</view>
		<view class="ft22 c9 mt6">我们会给你推荐平台认证的离异异性对象</view>
		<view class="selectSex">
			<view class="imgBox">
				<image v-if="gender === 'female'" class="img" :src="imgBaseUrl+'Group667@2x.png'" mode=""></image>
				<image v-else class="img" @click="gender = 'female'" :src="imgBaseUrl+'Group667_1@2x.png'" mode=""></image>
			</view>
			<view class="imgBox">
				<image v-if="gender === 'male'" class="img" :src="imgBaseUrl+'Group668@2x.png'" mode=""></image>
				<image v-else class="img" @click="gender = 'male'" :src="imgBaseUrl+'Group668_1@2x.png'" mode=""></image>
			</view>
		</view>
		<button class="confirm" @tap="comfirm">确定</button>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				imgBaseUrl: this.imgBaseUrl,
				gender: 'female'
			}
		},
		methods:{
			comfirm(){
				console.log(this.gender)
				this.$emit("getSex",this.gender)
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
			padding: 36rpx 0px 14rpx 0rpx;
			justify-content: center;
			.imgBox{
				&:last-child{
					margin-left: 48rpx;
				}
			}			
			.img{
				width: 230rpx;
				height: 370rpx;
			}
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
</style>