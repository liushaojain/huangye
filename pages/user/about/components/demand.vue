<template>
	<view>
		<u-popup :show="show" @close="close" @open="open">
			<view>
				<view class="title">交友要求</view>
				<view class="content">
					<view class="item">
						<text class="label">婚姻状态</text>
						<view class="tagcontainer">
							<view class="tag" :class="{'selected':item.key === marital_status}"
								v-for="item in maritalStatusData" @click="marital_status = item.key">
								{{item.label}}
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
							<view class="maxTag" :class="{'selected':item.key === child_status}"
								v-for="item in childStatusData" @click="child_status = item.key">
								{{item.label}}
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
	export default {
		data() {
			return {
				show: false,
				rangeMin: 20,
				rangMax: 65,
				rangeValue: [10, 50],
				marital_status: "",
				child_status: '',
				maritalStatusData: [{
						label: '离异',
						key: 'divorced'
					},
					{
						label: '丧偶',
						key: 'widowed'
					},
				],
				childStatusData: [{
						label: '无孩子',
						key: 'no_children'
					},
					{
						label: '有孩子，自己带',
						key: 'own_with_children'
					},
					{
						label: '有孩子，对方带',
						key: 'other_with_children'
					},
					{
						label: '双方都有孩子自己带',
						key: 'both_with_children_ow'
					}
				]
			}
		},
		components: {
			SliderRange
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
					id: userInfo.id,
					member_id: 0,
					marital_status: this.marital_status,
					min_age: this.rangeValue[0],
					max_age: this.rangeValue[1],
					child_status: this.child_status
				})
				console.log(res);
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