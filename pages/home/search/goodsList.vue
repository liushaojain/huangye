<template>
	<view class="content">
		<navBar title="搜索" :bgImg="true" v-on:goBack="goBack(1)"></navBar>
	
		<view class="hreader">
			<navigator hover-class="none" url="/pages/home/search/index" delta="1" open-type="navigateBack" class="searchBox">
				<view class="searchIpt">
					<text class="iconfont icon-icon_search"></text>
					<text>{{postData.keywords}}</text>
				</view>
			</navigator>
			
			<view class="menu">
				<view class="options">
					<view
						@click="switchSort(5)" 
						:class="{'active':sortShow}">
						综合
						<image v-if="postData.rank==5"  class="sortImg" :src="imgBaseUrl+sort1" mode=""></image>
						<image v-if="postData.rank==6" class="sortImg" :src="imgBaseUrl+sort2" mode=""></image>
					</view>
					<view :class="{'active':postData.orderBy==3}" @click="switchSort(1)" >
						价格 
						<image v-if="postData.rank==1" class="sortImg" :src="imgBaseUrl+sort1" mode=""></image>
						<image v-if="postData.rank==2" class="sortImg" :src="imgBaseUrl+sort2" mode=""></image>
					</view>					
					<view :class="{'active':filtrateShow}" @click="switchSort(3)">
						销量 
						<image v-if="postData.rank==3" class="sortImg" :src="imgBaseUrl+sort1" mode=""></image>
						<image v-if="postData.rank==4" class="sortImg" :src="imgBaseUrl+sort2" mode=""></image>
					</view>
					<view class="icon">
						<text class="iconfont icon-icon_rank_list" v-if="!isList" @click="switchStyle(true)"></text>
						<text class="iconfont icon-icon_rank_block" v-if="isList" @click="switchStyle(false)"></text>
					</view>
				</view>
				<view>
					
				</view>
			</view>
			
			
			
			
		</view>
		<view class="producrContainer" v-if="load">
			<productList :dataList="product" @errorImg="errorImg" :isList="isList" :sold="true" toUrl="details"></productList>
		</view>
		<!-- <uni-load-more v-if="isAdd" IconType="circle"></uni-load-more> -->
	</view>
</template>

<script>
	import productList from "@/components/productList/index.vue"
	import productApi from "@/store/product/index.js"
	import homeApi from "@/store/home/index.js"
	export default {
		components: {
			productList
		},
		data() {
			return {
				postData:{
					page: 1,
					pagesize: 10,
					keywords: "",
					rank:5
				},
				allPage: "",
				load: false,
				product: [],
				isList: false,
				imgBaseUrl: this.imgBaseUrl,
				sort1: "icon_jiangxu@2x.png",
				sort2: "icon_shengxu@2x.png"
			};
		},
		onLoad(options) {
			this.postData.keywords = options.inputContent;
			this.getRecommendGoods(this.postData);
			
		},
		onReachBottom() {
			if(this.postData.page<this.allPage){
				this.postData.page+=1;
				// this.isAdd=true;
				this.getRecommendGoods(this.postData);
			}
			
		},
		methods:{
			errorImg(index){
				this.product[index].url = this.imgBaseUrl+"goods_avatar.png";
			},
			digit(key){
				let that=this;
				let item=that.postData[key];
				that.$nextTick(function() {
					that.postData[key] = (item.match(/^\d*(\.?\d{0,2})/g)[0])
				})
			},
			switchTo(e){
				this.postData.rank = e;
				this.postData.page = 1;
				this.getRecommendGoods(this.postData)
			},
			getRecommendGoods(data){
				let that=this;
				this.$request(homeApi.diyPages,this.postData,'POST','',1).then((res)=>{
					if(res.data){
						if(that.postData.page==1){
							if(res.data){
								that.product=res.data.records;
								that.allPage=res.data.pages;
							}else{
								that.product=[];
							}
						}else{
							let records = res.data.records;
							let product = that.product;
							this.product=this.product.concat(records);
							this.isAdd=false;
						}
					this.load=true;
					}
				})
			},
			switchStyle(type){
				this.isList=type;
			},
			switchSort(e){
				let rank = this.postData.rank == e ? this.postData.rank+1 : e;
				this.postData.rank = rank;
				this.postData.page = 1;
				this.getRecommendGoods(this.postData)
			},
			filtrate(){
				this.filtrateShow=!this.filtrateShow;
				this.sortShow=false
			},
			selectIndustry(item,index){
				
				this.industryActive=index;
				this.postData.brandId=item.brandId;
			},
			search(){
				// this.product=[];
				if(this.postData.maxPrice!=""&&this.postData.minPrice!=""){
					if(parseFloat(this.postData.maxPrice)<=parseFloat(this.postData.minPrice)){
						uni.showToast({
							icon:"none",
							title:"价格区间最大值不能小于等于最小值"
						})
						return false
					}					
				}
				this.postData.page=1;
				this.load=false;
				if (this.bannerActivityId) {
					this.getActivityList(this.postData)
				} else {
					this.getRecommendGoods(this.postData)
				}
				uni.pageScrollTo({
					scrollTop:0
				})
				this.filtrateShow=false;
			},
			orderByT(e,text){
				this.postData.orderBy=e;
				this.postData.page=1;
				// this.product=[];
				this.load=false;
				if (this.bannerActivityId) {
					this.getActivityList(this.postData)
				} else {
					this.getRecommendGoods(this.postData)
				}
				uni.pageScrollTo({
					scrollTop:0
				})
				if(text){
					this.sortType=text;
				}else{
					this.sortType="综合";
				}
				this.sortShow=false;
			},
			reset(){
				this.postData.brandId = ''
				this.postData.minPrice = ''
				this.postData.maxPrice = ''
			},
			// 获取活动推广列表
			getActivityList(data) {
				// let params = {
				// 	carouselId: this.bannerActivityId,
				// 	page: this.postData.page,
				// 	pagesize: this.postData.pagesize,
				// }
				// data && Object.keys(data).forEach(item => {
				// 	if (item !== 'ifSearchPage' && item!== 'bannerActivityId' && item !== 'message') {
				// 		params[item]= data[item]
				// 	}
				// })
				this.$request(homeApi.getActiveGoodsList,data).then(res => {
					if(this.postData.page==1){
						if(res.data){
							this.product=res.data.records;
							this.allPage=res.data.pages;
						}else{
							this.product=[];
						}
					}else{
						let records=res.data.records
						let product=this.product
						this.product=this.product.concat(records)
						this.isAdd=false
					}
					// this.postData.ifSearchPage=0;
					this.load=true;
				})
			}
		}
	};
</script>
<style lang="scss">
	.producrContainer /deep/ .noProductList image{
		padding-top: 200rpx;
	}

	
	page{
		padding-top:160rpx;
		background: #f5f5f5;
		.searchBox .uni-searchbar,.searchIpt{
			background:transparent;
			margin: 40rpx 0;
		}
		.searchBox{
			display: flex;
		}
		.searchBox .searchIpt{
			height: 64rpx;
			flex:1;
		}
		.searchIpt{
			background: #F4F5F6;
			margin:0 30rpx;
			border-radius: 32rpx;
			padding: 0 20rpx;
			line-height: 64rpx;
			color: #C9CBCF;
			font-size: 26rpx;
		}
		.searchIpt .iconfont{
			margin-right: 10rpx;
		}
		
		.hreader{
			// padding-top:30rpx;
			// position: fixed;
			background: white;
			// top: 150rpx;
			// left: 0;
			// right: 0;
			// z-index: 999;
			// height: 144rpx;
			// padding-top:180rpx;
			&.hreader1{
				top: 88rpx;
			}
			.options{
				display: flex;
				text-align: center;
				padding: 0 20rpx;
				font-size: 28rpx;
				height: 80rpx;
				line-height: 80rpx;
				color: #303336;
				.sortImg{
					height: 28rpx;
					width: 28rpx;
					margin-left: 4rpx;
				}
				view{
					&.active{
						color: #F9353B;
					}
					text.active{
						transform: rotate(180deg);
					}
					flex:2;
					display: flex;
					justify-content: center;
					align-items: center;
					&:last-child{
						flex:1;
						text-align: right;
						text{
							font-size: 36rpx;
							margin-right: 10rpx;
						}
					}
					text{
						color: #C9CBCF;
						font-size: 20rpx;
						margin-left: 10rpx;
						display: block;
					}
				}
			}
			.popUp{
				position: fixed;
				background: rgba(0,0,0,0.5);
				top: 144rpx;
				left: 0;
				right: 0;
				bottom: 0;
				&.popUp1{
					top: 232rpx;
				}
			}
			.peiceType{
				background: white;
				border-radius: 0 0 24rpx 24rpx;
				color: #303336;
				view{
					height: 88rpx;
					line-height: 88rpx;
					padding: 0 20rpx;
					font-size: 28rpx;
					&.active{
						color: #F9353B;
					}
				}
			}
			
		}
		.producrContainer{
			margin-top: 15rpx;
		}
		.filtrate{
			background: white;
			padding: 0 20rpx;
			border-radius: 0 0 24rpx 24rpx;
			.title{
				height: 80rpx;
				line-height: 80rpx;
				color: #60656C;
				font-size: 26rpx;
			}
			.industrySelect{
				display: flex;
				flex-wrap: wrap;
				max-height: 480rpx;
				overflow: auto;
				view{
					width: 160rpx;
					height: 64rpx;
					text-align: center;
					line-height: 64rpx;
					background: #F4F5F6;
					border-radius: 10rpx;
					box-sizing: border-box;
					margin-right: 22rpx;
					margin-bottom: 22rpx;
					color: #303336;
					font-size: 26rpx;
					&:nth-child(4n){
						margin-right: 0;
					}
					&.active{
						color: #F9353B;
						background: white;
						border: 1px solid #F9353B;
						position: relative;
					}
					text{
						position: absolute;
						right: 0;
						bottom: -16rpx;
						color: #F9353B;
					}
				}
			}
			.btnGroup{
				display: flex;
				padding-bottom: 20rpx;
				button{
					flex: 1;
					width: 330rpx;
					height: 80rpx;					
					border-radius: 44rpx;
					font-size: 30rpx;
					color: #303336;
					border: none;
				}
				.reset{
					margin-right: 40rpx;
					background: #F4F5F6;
				}
				.accomplish{
					background: #F9353B;
					color: white;
				}
			}
			.inputGroup{
				display: flex;
				margin-bottom: 40rpx;
				height: 60rpx;
				input{
					flex: 1;
					border: 1px solid #c6c6c6;
					height: 60rpx;
					border-radius: 8rpx;
					font-size: 26rpx;
					text-align: center;
					&:last-child{
						margin-left: 40rpx;
					}
				}
			}
		}
	}
</style>
