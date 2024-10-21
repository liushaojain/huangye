<template>
	<view class="container">
		<view class="type">
			<view :class="{'active':!postData.customSeries}" @click="changeType">全部</view>
			<view v-for="(item,index) in diyTypeList" :key="index" @click="changeType(item)" :class="{'active':postData.customSeries==item.id}">{{item.name}}</view>
		</view>
		<view class="goodsContainer" v-if="product.length>0">
			<navigator class="goodItem" :url="'/pages/goods/details/index?goodsId='+item.goodsId" hover-class="none" v-for="(item,index) in product" :key="index">
				<image :src="item.url||item.imageUrl" mode="aspectFill" @error="HandleEvent(item)"></image>
				<view>
					<view class="goodsName"> 
						<image v-if="item.isHot==1" :src="imgBaseUrl+'ico_hot@2x(1).png'" mode="aspectFill"></image>
						{{item.name}}
					</view>
					<view class="price" v-if="goodsPriceShow">
						￥<text class="num">{{towNumber(item.price)}}</text>
						<text class="starting">起</text>
					</view>
				</view>
			</navigator>
		</view>
		<view class="goodsContainer noData" v-else-if="product==''">
			<view class="">
				
				<image :src="imgBaseUrl+'noproductList.png'" mode="aspectFill"></image>
				<text>暂无分类商品</text>
			</view>
		</view>
	</view>
</template>

<script>
	import productList from "@/components/productList/index.vue"
	import homeApi from "@/store/home/index.js"
	import { userStore } from "@/store/account/userInfo.js"
	export default {
		data(){
			return {
				title: "",
				allPages: "",
				postData:{
					pagesize:10,
					page:1,
					type: 2,
					customSeries: ""
				},
				product: [],
				sold: true,
				isList: true,
				productLists: false,
				diyTypeList:[],
				imgBaseUrl: this.imgBaseUrl,
			}
		},
		computed: {
			goodsPriceShow: function() {
				return userStore.state.userInfo.goodsPriceShow;
			}
		},
		components: {
			productList
		},
		onReady(option) {
			
		},
		// 上拉加载
		onReachBottom() {
			if((this.allPages>this.postData.page)&this.productLists){
				this.postData.page++;
				this.diyPages();
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: option.type==1?'私人定制':'企业定制'
			});
			this.postData.type = option.type;
			this.$request(homeApi.diyTypeList,{type:this.postData.type,parantId:0},"POST","",1).then(res=>{
				this.diyTypeList = res.data;
			})
			this.diyPages();
		},
		methods:{
			towNumber(price){
				return parseFloat(price).toFixed(2)
			},
			diyPages(){
				this.$request(homeApi.diyPages,this.postData,"POST","",1).then(res=>{
					if(this.postData.page==1){
						this.allPages=res.data.pages;
						this.product=res.data.records?res.data.records:''
					}else{
						this.product=this.product.concat(res.data.records)
					}
					this.productLists=true;
				})
			},
			
			changeType(item){
				this.postData.customSeries = item?item.id:"";
				this.postData.page = 1;
				this.diyPages()
			},
			HandleEvent(item){
				item.url = this.imgBaseUrl+"goods_avatar.png"
			}
		}
	}
</script>

<style lang="scss">
	.container{
		// position: absolute;
		// top: 0;
		// bottom: 0;
		// left: 0;
		// right: 0;
		display: flex;
		.type{
			width: 240rpx;
			background: #F5F5F5;
			height: 100%;
			overflow: auto;
			position: fixed;
			top: 0;
			left: 0;
			view{
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				font-size: 32rpx;
				position: relative;
				&.active{
					color: #F9353B;
					background: white;
					&::after{
						position: absolute;
						content: "";
						top: 20rpx;
						bottom: 20rpx;
						width: 6rpx;
						left: 0;
						background: #F9353B;
					}
				}
			}
		}
		.goodsContainer{
			flex: 1;
			padding: 30rpx;
			height: 100%;
			overflow: auto;
			margin-left: 240rpx;
			.goodItem{
				display: flex;
				border-bottom: 1px solid #E5E5E5;
				padding: 30rpx 0;
				&:last-child{
					border: none;
					padding-bottom: 0;
				}
				image{
					width: 150rpx;
					height: 150rpx;
					margin-right: 20rpx;
				}
				view{
					flex: 1;
					.goodsName{
						height: 76rpx;
						overflow: hidden;
						text-overflow: clip;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						color: #333333;
						font-size: 26rpx;
						image{
							width: 44rpx;
							height: 24rpx;
							vertical-align: middle;
							margin-right: 10rpx;
						}
					}
					.price{
						margin-top: 26rpx;
						color: #F9353B;
						font-size: 26rpx;
						.starting{
							font-size: 24rpx;
						}
						.num{
							font-size: 32rpx;
							margin: 0 4rpx;
						}
					}
				}
			}
		}
	}
	.noData{
		display: flex;
		justify-items: center;
		align-items: center;
		flex-direction: column;
		view{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			font-size: 28rpx;
		}
		image{
			width: 320rpx;
			height: 200rpx;
		}
	}
	// <view>
	// 	<view class="goodsName">{{item.name}}</view>
	// 	<view class="price">￥{{towNumber(item.price)}}起</view>
	// </view>
</style>
