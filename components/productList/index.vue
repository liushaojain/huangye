<template>
	<view class="productContainer">
		<view v-if="dataList.length==0||!dataList" class="noProductList">
			<view>
				<image :src="imgBaseUrl+'noproductList.png'" mode="aspectFit"></image>
				<text>没有找到相关商品</text>
			</view>
		</view>
		<view class="product" v-if="dataList.length>0" :class="{'list':isList}">
			<view class="productList" >
				<view v-for="(item, index) of dataList" @click="ToDetails(item)" :key="index">
					<view v-if="index%2==0||isList" class="item">
						<image class="imageUrl" :src="item.url||item.imageUrl" mode="aspectFill" @error="errorImg(index)"></image>
						<view class="cnt" v-if="type=='design'">
							<view class="name"><image v-if="item.isHot==1" :src="imgBaseUrl+'ico_hot@2x(1).png'" mode="aspectFill"></image> {{item.name}}</view>
							<view class="price" v-if="item.designOutSize">
								{{item.designOutSize}}
							</view>			
						</view>
						<view class="cnt" v-if="type!='design'">
							<view class="name"><image v-if="item.isHot==1" :src="imgBaseUrl+'ico_hot@2x(1).png'" mode="aspectFill"></image> {{item.name}}</view>
							<view class="specification" v-if="!sold">
								{{item.minBuy}}起订 |
								已售{{item.buyCount|fomartNum}}件
							</view>
							<view class="specification" v-if="sold">{{item.specification}}</view>
							<view class="last flex_sb" v-if="goodsPriceShow">
								<view class="price">
									￥<text> {{towNumber(item.price)}} </text>起
								</view>
								<view v-if="sold" class="sold">已售{{item.buyCount|fomartNum}}件</view>
							</view>						
						</view>
					</view>
				</view>
			</view>
			<view class="productList" v-if="!isList">
				<view v-for="(item, index) of dataList" :key="index" >
					<view v-if="index%2!=0" class="item" @click="ToDetails(item)">
						<image class="imageUrl" :src="item.url||item.imageUrl" mode="aspectFill" @error="errorImg(index)"></image>
						<view class="cnt" v-if="type=='design'">
							<view class="name"><image v-if="item.isHot==1" :src="imgBaseUrl+'ico_hot@2x(1).png'" mode="aspectFill"></image>{{item.name}}</view>
							<view class="price" v-if="item.designOutSize">
								{{item.designOutSize}}
							</view>			
						</view>
						<view class="cnt" v-if="type!='design'">
							<view class="name"><image v-if="item.isHot==1" :src="imgBaseUrl+'ico_hot@2x(1).png'" mode="aspectFill"></image>{{item.name}}</view>
							<view class="specification" v-if="!sold">
								{{item.minBuy}}起订 |
								已售{{item.buyCount|fomartNum}}件
							</view>
							<view class="specification" v-if="sold">{{item.specification}}</view>
							<view class="last flex_sb" v-if="goodsPriceShow">
								<view class="price">
									￥<text> {{towNumber(item.price)}} </text>起
								</view>
								<view v-if="sold" class="sold">已售{{item.buyCount|fomartNum}}件</view>
							</view>						
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { userStore } from "@/store/account/userInfo.js"
	export default{
		data(){
			return{
				imgBaseUrl: this.imgBaseUrl
			}
		},
		props:['dataList', "isList", "sold", "type", "bannerActivityId"],
		created() {},
		computed: {
			goodsPriceShow: function() {
				return userStore.state.userInfo.goodsPriceShow;
			}
		},
		methods:{
			errorImg(index) {
				this.$emit("errorImg",index)
			},
			ToDetails(item){			
				if(this.type=='design'){
					uni.navigateTo({
						url:"/pages/advisory/design/routine?productId="+item.productId
					})	
				}else if(item.addcartBuyType=="design_service"){
					uni.navigateTo({
						url:"/pages/advisory/design/productDetail?goodsId="+item.goodsId
					})
				}else{
					uni.navigateTo({
						url:"/pages/goods/details/index?goodsId="+item.goodsId
					})					
				}
			},
			towNumber(price){
				return parseFloat(price).toFixed(2)
			},
			isShou(index){  
				if(index%2 ==0){
					return true
				}else{
					return false
				}
			}
		}
	}
</script>

<style lang="scss">
	page{
		
		.product {
			.imageUrl{
				width: 295rpx;
				height: 295rpx;
				min-height: 200rpx;
				margin: 20rpx;
			}
			padding:0 30rpx;
			display: flex;
		}
		
		.product.list{
			display: block;
		}
		.product.list .productList{
			margin-left: 0 !important;
		}
		.product.list .productList .item{
			margin: 0 0 20rpx 0;
			display: flex;
			flex-direction: row;
			position: relative;
			image{
				width: 180rpx;
				height: 180rpx;
			}
			.cnt{
				margin-bottom: 0;
			}
			
		}
		.hc-activity-tag {
			position: absolute;
			left: 0;
			top: 0;
			width: 108rpx;
			height: 38rpx;
			background: #FF5C33;
			border-radius: 16rpx 0 20rpx 0;
			font-size: 22rpx;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.product .productList{
			flex: 1;
			&:last-child{
				margin-left: 20rpx;
			}
		}
		.discounts{
			position: absolute;
			left: 0;
			top: 0;
			padding: 4rpx 10rpx;
			background: #EBF5FE;
			color: #3195F6;
			font-size: 24rpx;
		}
		.product .item{
			position: relative;
			background: #FFFFFF;
			border-radius: 16rpx;
			overflow: hidden;
			margin-bottom: 20rpx;
			box-shadow: 0px 2rpx 20rpx 4rpx rgba(147, 134, 134, 0.12);
			border-radius: 12rpx 12rpx 12rpx 12rpx;
			opacity: 1;
		}
		.product .name{
			overflow:hidden;	
			text-overflow:clip;	
			display:-webkit-box;	
			-webkit-box-orient:vertical;	
			-webkit-line-clamp:2; 
			font-size: 28rpx;
			color: #303336;
			max-width: 290rpx;
			image{
				width: 44rpx !important;
				height: 24rpx !important;
				vertical-align: middle;
				margin-right: 10rpx;
			}
		}
		.product .specification{
			margin: 5px 0;
			font-size: 20rpx;
			color: #93989F;
			overflow:hidden;
			text-overflow:clip;	
			display:-webkit-box;	
			-webkit-box-orient:vertical;	
			-webkit-line-clamp:2; 
		}
		.product .last{
			flex-wrap: wrap;
		}
		.product .price{
			min-width: 140rpx;
		}
		.product .price,.product .sold{		
			font-size: 25rpx;
			color: #93989F;
			text-align: left;
			line-height: 40rpx;
			padding-right:10rpx;
		}
		.product .price{
			color: #FF3931;
			text-align: left;
		}
		.product .price text{
			font-size: 32rpx;
			margin: 0 6rpx;
			font-weight: 600;
			vertical-align: bottom;
		}
		.cnt{
			padding: 0 20rpx 20rpx 20rpx;		
		}
		.list{
			.cnt{
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding: 0 0 0 10rpx;
				.price {
					// margin-top: 30rpx;
				}
			}
			.item{
				flex: 1;
				display: flex;
				flex-direction: column;
				margin-bottom:0;
				padding: 0;
				margin-left: 10rpx;
			}
			.waterfalls-list{
				position: relative !important;
			}
		}
		.noProductList{
			// position: absolute;
			// bottom: -10%;
			// left: calc(50% - 170rpx);
			width: 100%;
			height: 100vh;
			margin-top: -250rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			// margin-top: 320rpx;
			image{
				height: 215rpx;
				width: 340rpx;
				display: block;
				margin: auto;
				padding: 50rpx 0 20rpx;
			}
			text{
				color: #60656C;
				font-size: 30rpx;
			}
		}
	}
</style>
