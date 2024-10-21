<template>
	<view class="search-page">
		<navBar title="搜索" :bgImg="true" v-on:goBack="goBack(1)"></navBar>
		
		
		<view class="top-search-area flex-between itemsCenter">
			<view class="top-search-input flex-between itemsCenter">
				<text class="iconfont icon-icon_search"></text>
				<input type="text" v-model="inputContent" placeholder="输入关键词搜索商品" placeholder-style="color: #C9CBCF" confirm-type="search" @confirm="handleConfirm">
				<image class="del-btn" @click.stop="inputContent = ''" :src="imgBaseUrl+'/icon/icon_delete_32.png'" v-show="inputContent"></image>
			</view>
			<view class="blueFont search-btn" @click="handleConfirm">搜索</view>
		</view>
		<view class="search-history" v-if="historyList.length > 0">
			<view class="search-history-title flex-between">
				<view class="flex-start itemsCenter">我的历史搜索<text v-if="historyList.length>4" class="iconfont" :class="isShowAll ? 'iconicon_arrow_up' : 'iconicon_arrow_down_white'" @click="isShowAll = !isShowAll" style="font-size: 20rpx;margin-left: 8rpx;"></text></view>
				<view class="flex-end itemsCenter clearBtn" @click="clearAll" style="color: #93989F;">
					<image src="../../../static/img/icon_qingkong.png" mode="aspectFit"></image><text class="ml10">清空</text>
				</view>
			</view>
			
			<view class="flex flex_w">
				<text @click="handleSearchByHistory(item)" class="itemText" v-for="(item, index) in historyList" :key="index">{{item.message}}</text>
				<!-- <text class="itemText" v-for="item in 30">3455</text> -->
			</view>
			
			<view class="search-history-list" :style="{maxHeight: isShowAll ? 'auto' : '256rpx'}">
				<!-- <view class="history-item flex-between itemsCenter" v-for="(item, index) in historyList" :key="index">
					<view @click="handleSearchByHistory(item)" class="ellipsis" style="width: 640rpx;">{{item.message}}</view>
					<image :src="imgBaseUrl+'/icon/icon_delete_32.png'" @click="deleteItem(item)"></image>
				</view> -->
			</view>
		</view>
		
	</view>
</template>
<script>
	import api from "@/store/home/index.js"
	import navBar from "@/components/navBar/navBar.vue"
	export default{
		components:{
			navBar
		},
		data(){
			return{
				isShowAll: false,
				historyList:[],
				boxList:[],
				tagList:[],
				boxLong: '',
				boxWidth: '',
				boxHeight: '',
				inputContent: '',
				bannerActivityId: '',
				imgBaseUrl: this.imgBaseUrl
			}
		},
		onLoad(options) {
			if (options.bannerActivityId) {
				this.bannerActivityId = options.bannerActivityId
			}
			this.getBoxList()
			this.getTagsList()
			this.getHistory()
		},
		onShow() {
			this.inputContent = ''
			this.historyList = []
			this.getHistory()
		},
		methods:{
			getBoxList(){
				this.$request(api.getBoxTypeBySearch, {}, 'GET', '', 1).then(res => {
					this.boxList = res.data
				})
			},
			getTagsList(){
				this.$request(api.getAllGoodsTag, {}, 'GET', '', 1).then(res => {
					this.tagList = res.data
				})
			},
			getHistory(){
				this.$request(api.getSearchRecordByMemberId, {page:1, pagesize: 9999}, 'GET', '', 1).then(res => {
					this.historyList = res.data&&res.data.records?res.data.records:[]
				})
			},
			clearAll(){
				uni.showModal({
					title:'删除后不能恢复,确定删除搜索记录？',
					success: async (res) => {
						if (res.confirm) {
							await this.delFun('', 1)
							uni.showToast({
								title:"删除成功"
							})
							this.getHistory()
						}
					},
					fail: (err) => {
						
					}
				})
			},
			async deleteItem(item){
				await this.delFun(item.searchId, 0)
				this.getHistory()
			},
			delFun(searchId, type){
				let params = {}
				if (type == 0) {
					params.searchId = searchId
					params.type = type
				} else {
					params.type = type
				}
				return new Promise((resolve, reject) => {
					this.$request(api.deleteSearchRecordByType, params, 'GET', '', 1).then(res => {
						resolve()
					})
				})
			},
			handleSearchByHistory(item){
				// uni.navigateTo({
				// 	url:"/pages/home/search/goodsList?searchType=5&searchId=" + item.searchId 
				// })
				uni.navigateTo({
					url:"/pages/home/search/goodsList?inputContent=" + item.message
				})
			},
			handleConfirm(){
				if (!this.inputContent.trim()) return
				uni.navigateTo({
					url:"/pages/home/search/goodsList?inputContent=" + this.inputContent
				})
			},
		}
	}
</script>
<style>
	page{
		/* background-image: linear-gradient(to right, #FDF1F5 , #EBF6FE); */
		padding-top:160rpx;
	}
</style>
<style lang="scss" scoped>
	
	.clearBtn{
		image{
			width:30rpx;
			height:30rpx;
		}
	}
	
	.itemText{
		display: block;
		background-color: #F5F5F5;
		padding:10rpx 20rpx;
		border-radius: 30rpx;
		margin-right:15rpx;
		margin-top:20rpx;
	}
	
	.search-page{
		.top-search-area{
			width: 100%;
			height: 98rpx;
			padding: 0 30rpx;
			.top-search-input{
				width: 600rpx;
				background-color: #F4F5F6;
				border-radius: 36rpx;
				height: 64rpx;
				padding: 0 30rpx;
				text{
					color: #C9CBCF;
				}
				input{
					padding-left: 16rpx;
					flex: 1;
					line-height: 64rpx;
					font-size: 28rpx;
					padding-right: 8rpx;
				}
				.del-btn{
					width: 32rpx;
					height: 32rpx;
				}
			}
			.search-btn{
				height: 64rpx;
				width: 142rpx;
				font-size: 28rpx;
				background: #F9353B;
				border-radius: 40rpx;
				text-align: center;
				line-height: 64rpx;
				color: white;
				margin-left: 8rpx;
			}
		}
		.search-history{
			padding: 24rpx 30rpx;
			// border-bottom: 2rpx solid #F4F5F6;
			.search-history-title{
				height: 36rpx;
				margin-bottom: 12rpx;
				>view{
					color: #60656C;
					&:first-child{
						font-size: 26rpx;
					}
					&:last-child{
						font-size: 28rpx;
					}
				}
			}
		}
		.search-history-list{
			overflow: hidden;
			.history-item{
				height: 64rpx;
				view{
					font-size: 28rpx;
				}
				image{
					width: 32rpx;
					height: 32rpx;
				}
			}
		}
		.middle-list{
			border-bottom: 2rpx solid #F4F5F6;
			padding: 0 14rpx 14rpx 30rpx;
			.title{
				color: #60656C;
				font-size: 26rpx;
				line-height: 84rpx;
			}
			.list{
				flex-wrap: wrap;
				.item{
					min-width: 160rpx;
					line-height: 64rpx;
					background-color: #F4F5F6;
					font-size: 26rpx;
					text-align: center;
					border-radius: 8rpx;
					margin: 0 16rpx 16rpx 0;
					padding: 0 28rpx;
				}
			}
		}
		.size-input-area{
			.size-title{
				padding: 0 30rpx;
				line-height: 74rpx;
				>view{
					&:first-child{
						font-size: 26rpx;
						color: #60656C;
					}
					&:last-child{
						font-size: 30rpx;
					}
				}
			}
			.size-input-item{
				height: 88rpx;
				line-height: 44rpx;
				padding: 22rpx 30rpx;
				border-bottom: 2rpx solid #F4F5F6;
				&:last-child{
					border-bottom: none;
				}
				>view{
					&:last-child{
						input{
							text-align: right;
							font-size: 30rpx;
						}
						text{
							color: #60656C;
							font-size: 30rpx;
							margin-left: 12rpx;
						}
					}
				}
			}
		}
	}
</style>