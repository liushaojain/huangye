<template>
	<view class="container">
		<view class="meal">
			<view class="title">工艺套餐</view>
			<view class="item checked">{{infoData.craftPackage}}</view>
		</view>
		
		<parameter v-if="show" :productDtails="productDtails" :select_configs="checkSelect" :isStopEvent="isStopEvent" :quantity="quantity"></parameter>
	</view>
</template>

<script>
	import productApi from "@/store/product/index.js"
	import parameter from "@/pages/product/components/parameter.vue"
	export default {
		data(){
			return {
				checkSelect: null,
				productDtails:{},
				hcProductsParts: [],
				page_product_basic:{},
				size_limit:{},
				show: false,
				isStopEvent: true,
				quantity: ''
			}
		},
		components:{
			parameter
		},
		props: ['infoData'],
		watch:{
			infoData(val){
				if (val) {
					this.checkSelect = {
						meal_vals: val.techVals
					}
					this.quantity = val.buyNum
					this.getParts()
				}
			}
		},
		methods:{
			getParts(){
				this.$request(productApi.parts,{goodsId:this.infoData.goodsId},"GET","",1).then(res=>{
					this.productDtails=res.data;
					this.show = true
				})
			}
		}
	}
</script>

<style lang="scss">
	@import  '../../../../pages/product/index.scss'
</style>

<style lang="scss">
	.container{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 24rpx;
		padding: 30rpx;
		margin-bottom: 24rpx;
		.meal{
			.title{
				font-size: 26rpx;
				color: #60656C;
			}
			.item{
				max-width: 690rpx;
				height: 72rpx;
				line-height: 72rpx;
				text-align: center;
				background: #F4F5F6;
				border-radius: 8rpx;
				margin:0 18rpx 0 0;
				font-size: 26rpx;
				color: #303336;
				box-sizing: border-box;
				display: inline-block;
				padding: 0 20rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				&:nth-child(2n){
					margin-right: 0;
				}
				&.checked{
					border: 1px solid #1F90FF;
					color: #1F90FF;
					line-height: 70rpx;
					background: white;
				}
			}
		}
		.checked{
			position: relative;
			overflow: hidden;
			display: block;
			text{
				position: absolute;
				bottom: -20rpx;
				right: -2rpx;
			}
		}
	}
</style>