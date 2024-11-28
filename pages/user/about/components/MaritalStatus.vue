<template>
	<view class="selectSexBox">
		<view class="ft36 ">选择你的婚姻状态</view>
		<view class="ft22 c9 mt6">我们提倡真实社交</view>
		<view class="selectSex">
			<view class="checked" v-for="(item,index) in statusData" :class="{'noChecked':marital_status!==index}" @click="marital_status=index" :key="index">
				{{item}}
			</view>
			
			
			<!-- <view class="checked" :class="{'noChecked':marital_status!=='divorced'}" @click="marital_status='divorced'">
				离异
			</view>
			<view class="checked" :class="{'noChecked':marital_status!=='widowed'}" @click="marital_status = 'widowed'">
				丧偶
			</view> -->
		</view>
		<button class="confirm" @tap="comfirm">确定</button>
	</view>
</template>

<script>
	import {
		userStore
	} from "@/store/account/userInfo.js"
	export default {
		data(){
			return {
				imgBaseUrl: this.imgBaseUrl,
				marital_status: 'divorced',
				statusData: []
			}
		},
		created() {
			this.statusData = userStore.state.Enum.MemberProfile.marital_status;
		},
		methods:{
			comfirm(){
				console.log(this.marital_status)
				this.$emit("getMaritalStatus",this.marital_status)
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
			align-items: center;
			.checked{
				width: 224rpx;
				height: 236rpx;
				background: rgba(234,54,91,0.08);
				border-radius: 16rpx 16rpx 16rpx 16rpx;
				border: 2rpx solid #EA365B;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 40rpx;
				&.noChecked{
					opacity: 0.25;
				}
				&:last-child{
					margin-left: 48rpx;
				}
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