<template>
	<view class="selectSexBox">
		<view class="ft36 ">你的年龄</view>
		<view class="ft22 c9 mt6">我们会根据你的年龄帮你匹配合适的异性</view>
		<view class="selectSex">
			<gpp-date-picker class="datePicker" @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate" :defaultValue="pickerDate"></gpp-date-picker>
		</view>
		<button class="confirm" @tap="comfirm">确定</button>
	</view>
</template>

<script>
	import gppDatePicker from "@/components/gpp-datePicker/gpp-datePicker.vue"
	export default {
		components: {
			gppDatePicker,
		},
		data(){
			return {
				startDate: "1970-01-01",
				endDate: "2024-09-20",
				pickerDate: '1990-01-01'
			}
		},
		methods:{
			comfirm(){
				this.$emit("getAge",this.pickerDate)
			},
			onCancel(){
				
			},
			onConfirm(){
				
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
	.datePicker{
		width: 100%;
	}
</style>