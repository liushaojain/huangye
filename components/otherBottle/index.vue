<template>
	<view class="choose">
		<view class="partsTop">
			<view class="title">
				内装瓶型
				<text class="iconfont icon-guanbi" @tap="close"></text>
			</view>
			<view class="itemTitle">(根据选择的瓶型生产内托)</view>
		</view>	
		<view class="allGoods">
			<view class="item" v-if="otherBottle.length>0">
				<view class="types">
					<view class="child" v-for="(item,index) in otherBottle" :key="index" :class="{'active':item.id==wineBottleId}" @click="wineBottleId=item.id">
						<image :src="item.promotion_image||imgBaseUrl+'goods_avatar.png'" mode="aspectFill" @error="HandleEvent(item)"></image>
						<text>{{item.data}}</text>
					</view>
				</view>
				
			</view>
		</view>
		<view class="hint"> 
			<u-icon name="info-circle" color="#F35959"></u-icon> <text class="txt">若没有找到对应的，请联系客服邮寄瓶子</text> 
		</view>
		<button class="comfirmGoods" @tap="comfirmGoods">确定</button>
	</view>
</template>

<script>
	import productApi from "@/store/product/index.js"
	export default {
		data(){
			return {
				wineBottleId: "",
				imgBaseUrl: this.imgBaseUrl
			}
		},
		props:["otherBottle"],
		created() {},
		methods:{
			HandleEvent(item){
				item.url = this.imgBaseUrl+"goods_avatar.png"
			},
			close(){
				this.$emit("closeother",false)
			},
			comfirmGoods(){
				if(!this.wineBottleId){
					uni.showToast({
						icon: "none",
						title: "请选择内装瓶型"
					})
					return false
				}
				const seleted = this.otherBottle.find((item)=>{
					return item.id === this.wineBottleId
				})
				this.$emit("checkOtherBootle",seleted)
			}
		},
		
	}
</script>

<style lang="scss">
	.choose{
		display: flex;
		flex-direction: column;
		position: absolute;
		max-height: 1000rpx;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 24rpx 24rpx 0px 0px;
		padding: 30rpx 0 14rpx 0;
		background: white;
		.itemTitle{
			color: #797979;
			font-size: 28rpx;
			text-align: center;
			margin-top: 8rpx;
		}
		.hint{
			display: flex;
			color: #F35959;
			font-size: 24rpx;
			justify-content: center;
			text-align: center;
			border-radius: 12rpx;
			height: 54rpx;
			line-height: 54rpx;
			.txt{
				margin-left: 6rpx;
			}
		}
		.icon-guanbi{
			position: absolute;
			top: 30rpx;
			right: 30rpx;
		}
		.partsTop{
			text-align: center;
			color: #333333;
			font-size: 34rpx;
			margin-bottom: 20rpx;
		}
		.goodsBuy{
			padding: 0 30rpx;
			margin-top: 30rpx;
			display: flex;
			height: 56rpx;
			.label{
				flex: 1;
				font-size: 28rpx;
			}
			.num{
				display: flex;
				text-align: center;
				line-height: 56rpx;
				border-radius: 6rpx;
				overflow: hidden;
				input{
					width: 105rpx;
					height: 56rpx;
					background: #F6F6F6;
					margin: 0 6rpx;
				}
				text{
					width: 56rpx;
					height: 56rpx;
					background: #F6F6F6;
					font-size: 30rpx;
				}
			}
		}
		.allGoods{
			height: 800rpx;
			overflow: auto;
			padding: 0 30rpx;
			.goodsType{
				color: #333333;
				font-size: 28rpx;
				text{
					color: #FF3931;
				}
			}
			
			.goods{
				margin-top: 40rpx;
				width: 100%;
				flex-wrap: nowrap;
				.goodsContainer{
					width: 100%;
					overflow: auto;
					margin-top: 24rpx;
					display: -webkit-box;
					display: -moz-box;
				}
				.goodsItem{
					background: white;
					border-radius: 12rpx;
					width: 180rpx;
					height: 290rpx;
					font-size: 24rpx;
					object-fit: contain;
					text-align: center;
					border: 2rpx solid #F6F6F6;
					margin-right: 24rpx;
					overflow: hidden;
					.img{
						width: 140rpx;
						height: 140rpx;
						padding: 4rpx 16rpx 0 16rpx;
						background: white;
					}
					
					.goodsName{
						color: #333333;
						margin-top: 18rpx;
					}
					.price{
						display: flex;
						color: #FF3931;
						margin-top: 6rpx;
						padding: 0 16rpx;
						.label{
							flex: 1;
							color: #666666;
							text-align: left;
						}
					}
				}
				.checked{
					background: white;
					border: 2rpx solid #F9353B;
				}
				&.mainGoods{
					.goodsItem{
						width: 216rpx;
						height: 336rpx;
						.img{
							width: 180rpx;
							height: 180rpx;
						}
					}
				}
			}
		}
		.allPrice{
			margin-top: 30rpx;
			padding: 0 30rpx;
			display: inline-flex;
			height: 80rpx;
			line-height: 80rpx;
			background: #FFF6F6;
			.label{
				color: #333333;
				text{
					color: #c6c6c6;
				}
			}
			.price{
				flex: 1;
				text-align: right;
				color: #F9353B;
				font-size: 36rpx;
				.text{
					font-size: 26rpx;
				}
			}
		}
		.comfirmGoods{
			width: 690rpx;
			height: 76rpx;
			background: #F9353B;
			border-radius: 40px;
			font-size: 32rpx;
			color: white;
			margin-top:14rpx;
		}
	}
	.item{		
		.types{
			display: flex;
			flex-wrap: wrap;
			.child{
				width: 160rpx;
				background: white;
				border-radius: 12rpx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				margin: 0 12rpx 12rpx 0;
				border: 2rpx solid #ccc;
				overflow: hidden;
				&.active{
					border: 2rpx solid #F9353B;
					text{
						background: #FFF7F7;
					}
				}
			}
			image{
				width: 138rpx;
				height: 160rpx;
				margin: 10rpx;
			}
			text{
				font-size: 26rpx;
				padding: 20rpx 0;
				text-align: center;
				background: #F2F2F2;
			}
		}
	}
</style>