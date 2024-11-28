<template>
	<view>
		<u-popup :show="show" @close="close" @open="open">
			<view>
				<view class="title">交友要求</view>
				<view class="content">
					<view class="item">
						<text class="label">婚姻状态</text>
						<view class="tagcontainer">
							<view class="tag" :class="{'selected':key === marital_status}"
								v-for="(item,key) in maritalStatusData" :key="key" @click="marital_status = key">
								{{item}}
							</view>
						</view>
					</view>
					<view class="item">
						<text class="label">年龄</text>
						<view class="tagcontainer">
							<slider-range class="sliderRange" :value="rangeValue" :min="rangeMin" :max="rangMax"
								:step="1" :block-size="18" background-color="#D9D9D9" active-color="#F75073"
								:format="format" :decorationVisible="false" blockColor="#F75073"
								@change="handleRangeChange"></slider-range>
						</view>
					</view>
					<view class="item">
						<text class="label">孩子情况</text>
						<view class="tagcontainer">
							<view class="maxTag" :class="{'selected':key === child_status}"
								v-for="(item,key) in childStatusData" :key="key" @click="child_status = key">
								{{item}}
							</view>
						</view>
					</view>
				</view>
				<view class="footerBtn">
					<button class="cancel" @click="show=false">取消</button>
					<button class="comfirm" @click="comfirm">确定</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import SliderRange from '@/components/primewind-sliderrange/components/primewind-sliderrange/index.vue'
	import {
		userStore
	} from "@/store/account/userInfo.js"
	export default {
		data() {
			return {
				show: false,
				rangeMin: 20,
				rangMax: 65,
				rangeValue: [10, 50],
				marital_status: "",
				child_status: '',
				maritalStatusData: {},
				childStatusData: {}
			}
		},
		components: {
			SliderRange
		},
		created() {
			this.maritalStatusData = userStore.state.Enum.DatingRequirement.marital_status;
			this.childStatusData = userStore.state.Enum.DatingRequirement.child_status;
		},
		methods: {
			open() {
				this.show = true
			},
			close() {
				this.show = false
			},
			handleRangeChange(e) {
				this.rangeValue = e;
				console.log(this.rangeValue)
			},
			format(val) {
				return val
			},
			async comfirm() {
				if(!this.marital_status){
					return uni.showToast({
						title: '请选择婚姻状态',
						icon:"none"
					})
				}else if(!this.child_status){
					return uni.showToast({
						title: '请选择孩子情况',
						icon:"none"
					})
				}
				const userInfo = uni.getStorageSync("userInfo");
				
				const res = await this.$apis.uesrApi.updateDatingRequirements({
					marital_status: this.marital_status,
					min_age: this.rangeValue[0],
					max_age: this.rangeValue[1],
					child_status: this.child_status
				})
				uni.switchTab({
					url: '/pages/home/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.title {
		padding: 40rpx;
		text-align: center;
		font-size: 36rpx;
	}

	.content {
		padding: 0 44rpx;

		.item {
			margin-bottom: 48rpx;

			.label {
				font-size: 28rpx;
				font-weight: bold;
			}
		}

		.maxTag,
		.tag {
			width: 316rpx;
			height: 72rpx;
			background: #F7F6F5;
			border-radius: 8rpx;
			font-size: 28rpx;
			margin-right: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 24rpx;

			&:nth-child(2n) {
				margin-right: 0;
			}

			&.selected {
				background: #F75073;
				color: white;
			}
		}

		.tag {
			width: 156rpx;
			height: 72rpx;
			margin-right: 24rpx;
		}

		.tagcontainer {
			display: flex;
			flex-wrap: wrap;
			margin-top: 24rpx;
		}
	}

	.footerBtn {
		padding: 58px 44rpx 60rpx 44rpx;
		display: flex;

		.cancel {
			background: white;
			width: 320rpx;
			height: 88rpx;
			line-height: 88rpx;
			border-radius: 200rpx 200rpx 200rpx 200rpx;
			border: 2rpx solid #EA365B;
			font-size: 36rpx;
			color: #EA365B;
		}

		.comfirm {
			width: 320rpx;
			height: 88rpx;
			line-height: 88rpx;
			background: linear-gradient(271deg, #F5496D 0%, #FF7592 100%);
			border-radius: 200rpx 200rpx 200rpx 200rpx;
			font-size: 36rpx;
			color: white;
			margin-left: 22rpx;
		}
	}

	.sliderRange {
		width: 100%;
	}
</style>