<template>
	<view class="choose">
		<view class="partsTop">
			<view class="title">
				选择内装瓶型
				<text class="iconfont icon-guanbi" @tap="close"></text>
			</view>
		</view>	
		<view class="allGoods">
			<view class="item" v-if="wineBottles1.length>0">
				<view class="itemTitle">选择通用瓶型， 根据您选择的瓶型生产内托</view>
				<view class="types">
					<view class="child" v-for="(item,index) in wineBottles1" :key="index" :class="{'active':item.id==wineBottleId}" @click="wineBottleId=item.id">
						<image :src="item.promotion_image||imgBaseUrl+'goods_avatar.png'" mode="aspectFill" @error="HandleEvent(item)"></image>
						<text>{{item.data}}</text>
					</view>
				</view>
			</view>
			<view class="item" v-if="wineBottles2.length>0">
				<view class="itemTitle">选择客供瓶，需要您寄出瓶子生产内托哦</view>
				<view class="types">
					<view class="child" v-for="(item,index) in wineBottles2" :key="index" :class="{'active':item.id==wineBottleId}" @click="wineBottleId=item.id">
						<image :src="item.promotion_image||imgBaseUrl+'img_zixingtigong@2x.png'" mode="aspectFill"></image>
						<text>{{item.data}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="groupBtn">
			<button class="prevGoods" @tap="prev">上一步</button>
			<button class="comfirmGoods" @tap="comfirm">确定</button>
		</view>
	</view>
</template>

<script>
	import productApi from "@/store/product/index.js"
	export default {
		data(){
			return {
				wineBottles1: [],
				wineBottles2: [],
				wineBottleId: "",
				imgBaseUrl: this.imgBaseUrl
			}
		},
		props:["comfirmGoods","isChangeGoods","memberId","editWorkType"],
		created() {
			this.$request(productApi.wineBottles,"","GET").then(res=>{
				let wineBottles1 = [];
				let wineBottles2 = [];
				for(let item of res.data){
					if(item.data=="客供瓶"){
						wineBottles2.push(item)
					}else{
						wineBottles1.push(item)
					}
				}
				this.wineBottles2 = wineBottles2;
				this.wineBottles1 = wineBottles1;
			})
		},
		methods:{
			HandleEvent(item){
				item.url = this.imgBaseUrl+"goods_avatar.png"
			},
			close(){
				this.$emit("close")
			},
			prev(){
				this.$emit("prev")
			},
			async comfirm(){
				
				this.comfirmGoods.bottleTypeId = this.wineBottleId;
				if(this.wineBottleId){
					this.comfirmGoods.editWorkType = this.editWorkType;
					let replaceWork = await this.$request(productApi.replaceWork,this.comfirmGoods,"POST","",1);
					let newWorksId = replaceWork.data;
					let newWorkInfo = await this.apis.designWorks({ worksId: newWorksId});
					if(newWorkInfo.data.worksInfo.worksStatus == "1"){
						uni.navigateTo({
							url:'/pages/confirmDesing/confirmDesing?worksId='+newWorkInfo.data.worksId+'&member_id='+newWorkInfo.data.worksInfo.memberId
						})
					}else if(newWorkInfo.data.worksInfo.worksStatus == "2"){
						uni.navigateTo({
							url:"/pages/my_design/comfirmOrder/index?ids="+newWorkInfo.data.worksInfo.id+'&worksName='+newWorkInfo.data.worksInfo.worksName
						})
					}else if(newWorkInfo.data.worksInfo.worksStatus == "5"){
						uni.navigateTo({
							url:'/pages/diy/diy?works_id='+replaceWork.data+'&type=bottle_lable'
						})
					}
					this.$emit("close",false)
					
				}else{
					uni.showToast({
						icon: "none",
						title: "请选择内装瓶型"
					})
					return false
				}
				// uni.navigateTo({
				// 	url: '/pages/goods/template/index',
				// 	events: {
				// 		// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
				// 		shopGoods: function(data) {
				// 		}
				// 	},
				// 	success: function(res) {
				// 		// 通过eventChannel向被打开页面传送数据
				// 		res.eventChannel.emit('shopGoods', {
				// 			data: shopGoods
				// 		})
				// 	}
				// })
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
		.icon-guanbi{
			position: absolute;
			top: 30rpx;
			right: 30rpx;
		}
		.partsTop{
			text-align: center;
			color: #333333;
			font-size: 34rpx;
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
		
		.groupBtn{
			display: flex;
			padding: 0 30rpx;
			.prevGoods{
				flex: 1;
				height: 80rpx;
				// background: #EEEEEE;
				border: 1px solid #F9353B;
				color: #F9353B;
				border-radius: 40px;
				font-size: 32rpx;
				margin-top:14rpx;
				margin-right: 20rpx;
				
			}
			.comfirmGoods{
				flex: 1;
				height: 80rpx;
				background: #F9353B;
				border-radius: 40px;
				font-size: 32rpx;
				color: white;
				margin-top:14rpx;
			}
		}
		
	}
	.item{
		margin-top: 32rpx;
		.itemTitle{
			color: #333333;
			font-size: 28rpx;
		}
		.types{
			margin-top: 24rpx;
			display: flex;
			flex-wrap: wrap;
			.child{
				width: 216rpx;
				height: 256rpx;
				background: white;
				border-radius: 12rpx;
				display: flex;
				flex-direction: column;
				margin: 0 14rpx 14rpx 0;
				border: 2rpx solid #ccc;
				&.active{
					border: 2rpx solid #F9353B;
				}
			}
			image{
				width: 180rpx;
				height: 180rpx;
				margin: 6rpx 18rpx 20rpx 18rpx;
			}
			text{
				font-size: 26rpx;
				margin-bottom: 20rpx;
				text-align: center;
			}
		}
	}
</style>