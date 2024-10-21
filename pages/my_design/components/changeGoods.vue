<template>
	<view class="choose">
		<view class="partsTop">
			<view class="title">
				更换酒瓶
				<text class="iconfont icon-guanbi" @tap="close"></text>
			</view>
		</view>	
		<view class="allGoods">
			<view class="goods" v-if="partsAll.win_bottle.length>0">
				<view class="goodsType">选购酒瓶</view>
				<view class="goodsContainer">
					<view class="goodsItem" :class="{'checked':item.checked}" @tap="checkparts(index,partsAll.win_bottle,'win_bottle')" v-for="(item,index) in partsAll.win_bottle" :key="index">
						<image class="img" :src="item.url" mode="aspectFill"></image>
						<view class="goodsName">{{item.goodsName}}</view>
						<view class="price"><text class="label">单价</text> ￥ {{moneyFormat(item.realPrice)}}</view>
						<view class="price"><text class="label">数量</text> {{item.buyNum}}</view>
					</view>
				</view>	
			</view>
			<view class="goods" v-if="partsAll.win_cover.length>0">
				<view class="goodsType">选购酒盖</view>
				<view class="goodsContainer">
					<view class="goodsItem" :class="{'checked':item.checked}" @tap="checkparts(index,partsAll.win_cover,'win_cover')" v-for="(item,index) in partsAll.win_cover" :key="index">
						<image class="img" :src="item.url" mode="aspectFill"></image>
						<view class="goodsName">{{item.goodsName}}</view>
						<view class="price"><text class="label">单价</text> ￥ {{moneyFormat(item.realPrice)}}</view>
						<view class="price"><text class="label">数量</text> {{item.buyNum}}</view>
					</view>
				</view>	
			</view>
			
			<view class="goods" v-if="partsAll.bottle_lable.length>0">
				<view class="goodsType">选购瓶标</view>
				<view class="goodsContainer">
					<view class="goodsItem" :class="{'checked':item.checked}" @tap="checkparts(index,partsAll.bottle_lable)" v-for="(item,index) in partsAll.bottle_lable" :key="index">
						<image class="img" :src="item.url" mode="aspectFill"></image>
						<view class="goodsName">{{item.goodsName}}</view>
						<view class="price"><text class="label">单价</text> ￥ {{moneyFormat(item.realPrice)}} </view>
						<view class="price"><text class="label">数量</text> {{item.buyNum}}</view>
					</view>
				</view>	
			</view>
			
		</view>
		<view class="groupBtn">
			<button class="prevGoods" @tap="prev">上一步</button>
			<button class="comfirmGoods" @tap="next">下一步</button>
		</view>
	</view>
</template>



<script>
	import productApi from "@/store/product/index.js"
	import {moneyFormat} from '@/utils/util.js'
	import { userStore } from "@/store/account/userInfo.js"
	export default {
		data(){
			return {
				partsAll:{
					mainGoods: [],
					bottle_lable: [],
					win_bottle: [],
					win_cover: [],
				},
				partsShow: false,
				recommendList: "",
			}
		},
		props:["activeGoodsId","activeProductId","packNum","bottleLableId"],
		created() {
			this.piece = this.packNum;
			this.recommendGoods();
		},
		methods:{
			moneyFormat,
			prev(){
				this.$emit("prev")
			},
			next(){
				let checkGoods = this.getcheckGoods();
				if(checkGoods.combinationReqs){					
					this.$emit("checkGoodsNext",checkGoods)
				}else{
					uni.showToast({
						title: "请选择酒瓶酒盖",
						icon: "none"
					})
				}
			},
			close(){
				this.$emit("close",false)
			},
			checkedIndex(goods){
				if(goods.length>0){
					let ItemIndex = "";
					for(let index in goods){
						if(goods[index].checked){
							return index
						}
					}
					return ItemIndex;
				}else{
					return false
				}
			},
			isChecked(goods){
				if(goods.length>0){
					let checkedItem = goods.find(item=>{
						return item.checked
					})
					return checkedItem
				}else{
					return false
				}
			},
			checkparts(index,parent,type){
				let winBottleChecked = this.isChecked(this.partsAll.win_bottle);
				if(!winBottleChecked&&type=="win_cover"){
					uni.showToast({
						title:"请选择酒瓶",
						icon:"none"
					})
					return false
				}
				let coverChecked = this.isChecked(this.partsAll.win_cover);
				
				if(parent[index].required){
					return false
				}
				if(type == "main"){
					parent[index].checked = !parent[index].checked;
				}else{
					for(let key in parent){
						if(index == key){
							if(parent[key].checked == undefined){
								this.$set(parent[key],"checked",true)
							}else{
								parent[key].checked = !parent[key].checked;
							}
						}else{
							if(parent[key].checked == undefined){
								this.$set(parent[key],"checked",false)
							}else{
								parent[key].checked = false;
							}
							
						}
					}
				}
				if(type == "win_bottle"){
					if(parent[index].checked == true){
						let win_cover = parent[index].win_cover;
						
						this.partsAll.win_cover = [];
						if(parent[index].win_cover){
							for(let item of parent[index].win_cover){
								this.partsAll.win_cover.push(item.combination)
							}
						}
						
						
						if(!this.isChecked(this.partsAll.win_cover)){
							this.partsAll.win_cover[0].checked = true;
						}
					}else{
						for(let win_cover of this.recommendList.win_cover){
							if(win_cover.checked){
								win_cover.checked = false;
							}
						}
						this.partsAll.win_cover = this.recommendList.win_cover;
					}
					
				}else if(type == "win_cover"&&!parent[index].checked){
					for(let win_bottle of this.partsAll.win_bottle){
						if(win_bottle.checked){
							win_bottle.checked = false;
						}
					}
					this.partsAll.win_cover = this.recommendList.win_cover;
				}
			},
			recommendGoods(changeBuy) {
				// 获取配件列表
				this.$request(productApi.recommendGoods, {
					goodsId: this.activeGoodsId,
					quantity: parseInt(this.packNum)*6
				}, "POST","",1).then(res => {
					let data = res.data;
					this.recommendList = res.data;
					let bottleLableId = this.bottleLableId;
					let relevanceId = [];
					let relevanceBottle = this.recommendList.bottle_lable.find(bottle_lable=>{
						return bottle_lable.goodsId == bottleLableId
					})
					if(relevanceBottle){
						relevanceId = relevanceBottle.bottleIdList;
					}
					for(let bottle_lable of this.recommendList.bottle_lable){
						if(bottle_lable.goodsId == bottleLableId){
							relevanceId = bottle_lable.bottleIdList;
						}
					}
					if(relevanceId&&relevanceId.length){
						for(let win_bottle of data.win_bottle){
							if(relevanceId.indexOf(win_bottle.productId)>=0){
								this.partsAll.win_bottle.push(win_bottle)
							}
						}	
					}else{
						this.partsAll.win_bottle = data.win_bottle||[];
					}
					
					
					
					
					if(this.partsAll.win_bottle.length>0){
						if(data.win_bottle[0].isDefaults == 1){
							data.win_bottle[0].checked = true;
							let win_cover = data.win_bottle[0].win_cover;
							if(data.win_bottle[0].win_cover){
								this.partsAll.win_cover = [];
								for(let key in data.win_bottle[0].win_cover){
									let item = data.win_bottle[0].win_cover[key];
									if(key == 0){
										item.combination.checked = true;
									}
									this.partsAll.win_cover.push(item.combination)
								}
							}
						}else{
							this.partsAll.win_cover = data.win_cover;
						}
					}
					this.partsShow = true;
				})
			},
			getcheckGoods(num){
				let quantity = num ? num : parseInt(this.piece)*6;
				let postData = {
					productId: this.activeProductId,
					quantity: quantity,
				};
				let combinationReqs = [];
				
				if(this.partsAll.win_bottle){
					for (let item of this.partsAll.win_bottle) {
						if (item.checked) {
							let recommendItem = {
								goodsId: this.activeGoodsId,
								productId: item.productId,
								quantity: item.buyNum,
								addcartBuyType: item.addcartBuyType,
								goodsName: item.goodsName,
								url: item.url,
							};
							combinationReqs.push(recommendItem)
						}
					}
				}
				if(this.partsAll.win_cover){
					for (let item of this.partsAll.win_cover) {
						if (item.checked) {
							let recommendItem = {
								goodsId: this.activeGoodsId,
								productId: item.productId,
								quantity: item.buyNum,
								addcartBuyType: item.addcartBuyType,
								goodsName: item.goodsName,
								url: item.url,
							};
							combinationReqs.push(recommendItem)
						}
					}
				}
				if (combinationReqs.length > 0) {
					postData.combinationReqs = combinationReqs;
				}
				return postData
			}
		},
	}
</script>

<style lang="scss">
	.choose{
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 220rpx;
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
			margin: 30rpx 0;
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
			flex: 1;
			overflow: auto;
			padding: 0 30rpx 30rpx 30rpx;
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
					padding-bottom: 10rpx;
					font-size: 24rpx;
					object-fit: contain;
					text-align: center;
					border: 2rpx solid #CCC;
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
						height: 64rpx;
						text-align: left;
						padding: 0 16rpx;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
						word-wrap: break-word;
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
						.img{
							width: 180rpx;
							height: 180rpx;
						}
					}
				}
			}
		}
		.allPrice{			
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
</style>