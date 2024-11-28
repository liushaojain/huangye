<template>
	<view class="uni-numbox">
		<view @click.stop="_calcValue('minus')" class="uni-numbox__minus">
			<text class="uni-numbox--text" style="margin-top: -8rpx;" :class="{ 'uni-numbox--disabled': inputValue <= min || disabled }">-</text>
		</view>
		<input :disabled="disabled" @blur="_onBlur" class="uni-numbox__value" type="number" v-model="inputValue" @click.stop="(e) => {return false}" />
		<view @click.stop="_calcValue('plus')" class="uni-numbox__plus">
			<text class="uni-numbox--text" style="margin-top: -4rpx;" :class="{ 'uni-numbox--disabled': inputValue >= max || disabled }">+</text>
		</view>
	</view>
</template>
<script>
	export default {
		name: "UniNumberBox",
		props: {
			value: {
				type: [Number, String],
				default: 1
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				inputValue: +this.value
			};
		},
		watch: {
			value(val) {
				this.inputValue = +val;
			},
			// inputValue(newVal, oldVal) {
			// 	if (+newVal !== +oldVal) {
			// 		this.$emit("change", newVal);
			// 	}
			// }
		},
		methods: {
			_calcValue(type) {
				if (this.disabled) {
					return;
				}
				const scale = this._getDecimalScale();
				let value = this.inputValue * scale;
				let step = this.step * scale;
				if (type === "minus") {
					value -= step;
					if (value < this.min) {
						return;
					}
					if(value > this.max){
						value = this.max
					}
				} else if (type === "plus") {
					value += step;
					if (value > this.max) {
						return;
					}
					if(value < this.min){
						value = this.min
					}
				}

				this.inputValue = String(value / scale);
				this.$emit('change', this.inputValue)
			},
			_getDecimalScale() {
				let scale = 1;
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + "").split(".")[1].length);
				}
				return scale;
			},
			_onBlur(event) {
				let value = event.detail.value;
				if (!value) {
					// this.inputValue = 0;
					return;
				}
				value = +value;
				if (value > this.max) {
					value = this.max;
				} else if (value < this.min) {
					value = this.min;
				}
				this.inputValue = value;
				this.$emit('change', this.inputValue)
			}
		}
	};
</script>
<style lang="scss" scoped>
	$box-height: 56rpx;
	/* #ifdef APP-NVUE */
	$box-line-height: 56rpx;
	/* #endif */
	$box-line-height: 56px;
	$box-width: 56rpx;

	.uni-numbox {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: space-between;
		height: $box-height;
		line-height: $box-height;
		width: 221rpx;
	}

	.uni-numbox__value {
		background-color: #f4f5f6;
		width: 105rpx;
		height: $box-height;
		text-align: center;
		font-size: 26rpx;
	}

	.uni-numbox__minus {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: $box-width;
		height: $box-height;
		// line-height: $box-line-height;
		// text-align: center;
		font-size: 50rpx;
		color: $uni-text-color;
		background-color: #f4f5f6;
		border-radius: 6rpx 0rpx 0rpx 6rpx;
	}

	.uni-numbox__plus {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: $box-width;
		height: $box-height;
		background-color: #f4f5f6;
		border-radius: 0px 6rpx 6rpx 0px;
	}

	.uni-numbox--text {
		font-size: 50rpx;
		color: #1F90FF;
		line-height: $box-line-height;
	}

	.uni-numbox--disabled {
		color: $uni-text-color-disable;
	}
</style>
