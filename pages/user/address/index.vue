<template>
	<view class="addressList">
		<template v-if="addressList.length > 0">
			<view class="item" v-for="(item,index) in addressList" :key="index">
				<view @click="selectAndBack(item)">
					<view class="info">
						<view>
							<text class="name">{{item.name}}</text>
							<text class="phone">{{item.mobile}}</text>
							<text class="active" v-if="item.defAddr">默认</text>
						</view>
						<view>{{item.area}} {{item.addr}}</view>
					</view>
					<view class="operation" v-if="!addressIsOpen">
						<view>
							<view class="icon" :class="{'borderN':item.defAddr}"  @click.stop="radioChange(item,index)"><text v-if="item.defAddr" class="iconfont icon-pic_info_success"></text></view>设为默认
						</view>
						<view @click.stop="deleteItem(item)">删除</view>
					</view>
					<image class="iconDelete" :src="imgBaseUrl+'ico_edit@2x.png'" mode="" @click.stop="editAddr(item.addrId)" v-if="!addressIsOpen"></image>
					<!-- <text class="iconfont icon-icon_rank_block" @click.stop="editAddr(item.addrId)"></text> -->
				</view>
			</view>
		</template>
		<template v-else>
			<view class="empty">
				<image :src="imgBaseUrl+'noAddress.png'"></image>
				<view>暂无地址</view>
			</view>
		</template>
		
		
		<view class="footer">
			<navigator hover-class="none" url="./addAddrss" v-if="!addressIsOpen">添加地址</navigator>
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
				addressList:"",
				current:0,
				fromPage:'',
				selectObject: null,
				imgBaseUrl: this.imgBaseUrl
			}
		},
		computed: {
			addressIsOpen: function() {
				return userStore.state.userInfo.addressIsOpen;
			}
		},
		onShow() {
			if(!userStore.state.token){
				uni.navigateTo({ url: '/pages/user/login/index?back=1' })
				return false
			}
			this.mbrAddrList()
		},
		onLoad(option) {
			this.fromPage = option.fromPage
			if (option.addrId) {
				this.selectObject = {
					addrId: option.addrId
				}
			}
		},
		methods:{
			mbrAddrList(){
				let that=this;
				let params = {}
				if(that.addressIsOpen) {
					that.$request(orderApi.businessInfo,{}, 'GET', '', 1).then(res => {
						if (res.code == 200) {
							params.businessId = res.data.businessId;
							that.$request(api.mbrAddrList,params,"POST",1,1).then((res)=>{
								that.addressList="";
								that.addressList=res.data.records;
							})
						}
					})
				}else{
					that.$request(api.mbrAddrList,"","POST",1,1).then((res)=>{
						that.addressList="";
						that.addressList=res.data.records;
					})
				}
				// that.$request(api.mbrAddrList,"","POST",1,1).then((res)=>{
				// 	that.addressList="";
				// 	that.addressList=res.data.records;
				// })
			},
			editAddr(id){
				uni.navigateTo({
					url:'addAddrss?id='+id
				})
			},
			deleteItem(item){
				let that=this;
				uni.showModal({
					title:"是否确定删除？",
					cancelText:"取消",
					success:(e)=>{
						if(e.confirm){
							that.$request(api.delAddrById,{addrId:item.addrId},"POST",1).then((res)=>{
								if(res.code==200){
									if (that.selectObject && that.selectObject.addrId == item.addrId) {
										let pages = getCurrentPages();
										let prevPage = pages[pages.length - 2]; //上一个页面
										prevPage.$vm.onChangeAddr({});
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
					item.defAddr=false;
					let that=this;
					this.$request(api.setDefAddr,{addrId:item.addrId},"POST",1,1).then((res)=>{
						if(res.code==200){
							this.mbrAddrList()
							uni.showToast({
								title:"设置成功",
								icon:"none"
							})
						}
					})
				}
			},
			selectAndBack(item){
				if (!this.fromPage) return
				this.selectObject = item
				let pages = getCurrentPages();
				let prevPage = pages[pages.length - 2]; //上一个页面
				prevPage.$vm.onChangeAddr(item);
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
			padding: 30rpx 30rpx 10rpx 30rpx;
			margin-bottom: 30rpx;
			border-radius: 12rpx;
			position: relative;
			.info{
				flex: 1;
				padding-right: 50rpx;
				.name{
					font-size: 30rpx;
					color: #303336;
				}
				.phone{
					margin: 0 10rpx;
					font-size: 24rpx;
					color: #93989F;
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
		.iconDelete{
			position: absolute;
			right: 30rpx;
			top: 30rpx;
			width: 40rpx;
			height: 40rpx;
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
			border-radius: 44rpx;
			margin: 16rpx auto;
			background: #F9353B;
			color: white;
			font-size: 32rpx;
			text-align: center;
			line-height: 88rpx;
		}
	}
	
</style>
