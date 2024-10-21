<template>
	<view class="addressList">
		<template v-if="addressList.length >0">
			<view class="item" v-for="(item,index) in addressList" :key="index" @click="selectAndBack(item)">
				<text v-if="item.taxIssuedTypeName=='个人'" class="invoiceType">个人</text>
				<text v-if="item.taxIssuedTypeName=='企业'" class="invoiceType invoiceType1">公司</text>
				<view>
					<view class="info">
						<view>
							<text class="name">{{item.taxTitle}}</text>
							<text class="active" v-if="item.defTax">默认</text>
						</view>
						<view v-if="item.taxCompanyTaxNo">税号：{{item.taxCompanyTaxNo}}</view>
					</view>
					<view class="operation" v-if="goodsPriceShow">
						<view>
							<view class="icon" :class="{'borderN':item.defAddr}"  @click.stop="radioChange(item,index)">
								<text v-if="item.defTax" class="iconfont icon-pic_info_success"></text>
							</view>设为默认
						</view>
						<view @click.stop="deleteItem(item)">删除</view>
					</view>
					<text class="iconfont icon-icon_rank_block" @click.stop="editAddr(item.id)" v-if="goodsPriceShow"></text>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="empty">
				<image :src="imgBaseUrl+'noInvoice.png'"></image>
				<view>暂无发票</view>
			</view>
		</template>
		
		<view class="footer" v-if="goodsPriceShow">
			<navigator hover-class="none" url="/pages/user/invoice/add">新增发票</navigator>
		</view>
	</view>
</template>

<script>
	import { userStore } from "@/store/account/userInfo.js"
	import api from "@/store/account/index.js"
	import orderApi from "@/store/order/index.js"
	export default {
		data(){
			return {
				addressList:[],
				current:0,
				postData:{pagesize:20,page:1},
				allPage:"",
				fromPage:'',
				selectObject: null,
				imgBaseUrl: this.imgBaseUrl
			}
		},
		computed: {
			goodsPriceShow: function() {
				return userStore.state.userInfo.goodsPriceShow;
			}
		},
		onShow() {
			if(!userStore.state.token){
				uni.navigateTo({ url: '/pages/user/login/index?back=1' })
				return false
			}
		},
		onLoad(option) {
			this.fromPage = option.fromPage
			if (option.id) {
				this.selectObject = {
					id: option.id
				}
			}
			this.mbrAddrList()
		},
		onReachBottom() {
			if(this.allPage>this.postData.page){
				this.postData.page++;
				this.mbrAddrList()
			}
		},
		methods:{
			mbrAddrList(){
				let that=this;
				if(!userStore.state.userInfo.goodsPriceShow) {
					that.$request(orderApi.businessInfo,{}, 'GET', '', 1).then(res => {
						if (res.code == 200) {
							let params = {
								...that.postData,
								businessId: res.data.businessId,
							};
				
							this.$request(api.discountsList,params,"POST","",1).then((res)=>{
								that.allPage=res.data.pages
								that.addressList = that.addressList.concat(res.data.records);
							})
						}
					});
				}else {
					this.$request(api.discountsList,that.postData,"POST","",1).then((res)=>{
						that.allPage=res.data.pages
						that.addressList = that.addressList.concat(res.data.records);
					})
				}
			},
			editAddr(id){
				uni.navigateTo({
					url:'add?id='+id
				})
			},
			deleteItem(item){
				let that=this;
				uni.showModal({
					title:"是否确定删除？",
					cancelText:"取消",
					success:(e)=>{
						if(e.confirm){
							that.addressList=[];
							that.$request(api.discountsDelete+item.id,"","DELETE").then((res)=>{
								if(res.code==200){
									if (that.selectObject && that.selectObject.id == item.id) {
										let pages = getCurrentPages();
										let prevPage = pages[pages.length - 2]; //上一个页面
										prevPage.$vm.onChangeInvoice(null);
									}
									this.mbrAddrList()
									uni.showToast({
										title:"删除成功",
										icon:"none"
									})
								}
							})
						}
					}
				})
			},
			radioChange(item,index){
				
				
				if(!item.defAddr){
					let that=this;
					this.$request(api.setDefTax,{id:item.id},"POST","",1).then((res)=>{
						if(res.code==200){
							that.addressList=[];
							this.mbrAddrList()
							uni.showToast({
								title:"设置成功",
								icon:"none"
							})
							
						}
					})
				}
			},
			selectAndBack(object){
				if (!this.fromPage) return
				this.selectObject = object
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.$vm.onChangeInvoice(object);
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #F5F5F5;
	}
	.addressList{
		padding: 30rpx 30rpx 120rpx 30rpx;
		box-sizing: border-box;
		.item{
			background: white;
			padding: 60rpx 30rpx 10rpx 30rpx;
			margin-bottom: 30rpx;
			border-radius: 12rpx;
			position: relative;
			overflow: hidden;
			.invoiceType{
				position: absolute;
				top: 0;
				left: 0;
				width: 108rpx;
				height: 40rpx;
				font-size: 24rpx;
				color: white;
				background: #39C564;
				border-radius: 0px 0px 32rpx 0px;
				text-align: center;
				line-height: 40rpx;
				&.invoiceType1{
					background: #F9353B;
				}
			}
			.info{
				flex: 1;
				padding-right: 50rpx;
				.name{
					font-size: 30rpx;
					color: #303336;
					margin-right: 10rpx;
				}
				.active{
					width: 80rpx;
					height: 40rpx;
					background: #FFECEC;
					border-radius: 4rpx;
					color: #F9353B;
					font-size: 24rpx;
					display: inline-block;
					text-align: center;
					line-height: 40rpx;
				}
				view{
					font-size: 24rpx;
					color: #60656C;
					&:last-child{
						margin-top: 10rpx;
					}
					radio{
						transform: scale(0.6);
					}
				}
			}
		}
		.icon-icon_rank_block{
			font-size: 40rpx;
			position: absolute;
			top: 30rpx;
			right: 30rpx;
		}
		.operation{
			display: flex;
			height: 80rpx;
			line-height: 80rpx;
			margin-top: 20rpx;
			border-top: 1px solid #E9EBEC;
			// align-items: center;
			.icon{
				display: inline-block;
				height: 40rpx;
				width: 40rpx;
				border: 4rpx solid #C9CBCF;
				box-sizing: border-box;
				border-radius: 50%;
				position: relative;
				margin-right: 10rpx;
				top: 12rpx;
				.iconfont{
					color: #F9353B;
					position: absolute;
					left: -4rpx;
					top: -22rpx;
					font-size: 40rpx;
				}
			}
			view{
				color: #60656C;
				font-size: 24rpx;
				&:first-child{
					flex: 1;
				}
			}
		}
	}
	.empty{
		padding-top: 232rpx;
		text-align: center;
		image{
			width: 340rpx;
			height: 200rpx;
			margin: 0 auto;
		}
		view{
			margin-top: 40rpx;
			line-height: 42rpx;
			font-size: 30rpx;
			color: #60656C;
		}
	}
	.footer{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 120rpx;
		background: #FFFFFF;
		navigator{
			width: 690rpx;
			height: 88rpx;
			margin: 16rpx auto;
			background: #F9353B;
			color: white;
			font-size: 32rpx;
			border-radius: 44rpx;
			text-align: center;
			line-height: 88rpx;
		}
	}
	
</style>
