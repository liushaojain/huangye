<template>
	<view class="choose" :class="{'hide':!isload}">
		<view class="partsTop">
			<view class="title">
				<view class="flex_aj changeGoods">
					<text>{{editTypeTitle}}</text>
					<image @click="toggleTs" class="ml10" style="width:40rpx;height:40rpx;" src="../../../static/img/wenhao.png" mode="aspectFit"></image>
					<view class="ts" v-if="showTs">
						<view><text>1、若你想要取消购买部分商品，你可以取消勾选对应的商品哦。但是，酒盒和外箱是必选商品。</text></view>
						<view class="mt10"><text>2、若你想要更换酒瓶，你可以点击“更换酒瓶”按钮重选酒瓶，但是更换酒瓶需要重新编辑瓶标模板哦。</text></view>
					</view>
				</view>
				<text class="iconfont icon-guanbi" @tap="close"></text>
			</view>
		</view>	
		<view class="allGoods">
			<view class="goods mainGoods" v-if="partsAll.length>0">
				<view class="goodsContainer">
					<view
						class="goodsItem"
						v-for="(item,index) in partsAll" 
						@tap="checkparts(item)" 
						:class="{'checked':item.good.checked}" 
						:key="index">
						<image class="img" :src="item.good.url" mode="aspectFill"></image>
						<view class="goodsName">{{item.good.goodsName}}</view>
						<view class="price" v-if="goodsPriceShow"><text class="label">单价</text> ￥ {{moneyFormat(item.good.price)}}</view>
						<view class="price"><text class="label">数量</text> {{item.good.quantity}}个</view>
					</view>
				</view>	
			</view>
		</view>
		<view class="goodsBuy">
			<view class="label">定制数量(件)</view>
			<view class="num">
				<text @tap="quantity(-1)">-</text>
				<input type="digit" v-model="piece" @change="quantity()">
				<text @tap="quantity(1)">+</text>
			</view>	
		</view>
		<view class="allPrice" v-if="goodsPriceShow">
			<view class="label">商品总价<text>（不含运费）</text></view>
			<view class="price"><text class="text">￥</text> {{moneyFormat(totalPrice)}}</view>
		</view>
		<view class="btnGroup">
			<button class="comfirmGoods" @tap="comfirmPrint">确认无误，去印刷</button>
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
				partsAll:[],
				partsShow: false,
				piece: "",
				packPrice: 0,
				recommendList: "",
				totalPrice: '',
				allTotalPrice: 0,
				mainTotalPrice: 0,
				wineBottle: "",
				worksInfo: "",
				isWinBottle: false,
				isload: false,
				showTs:false
			}
		},
		props:["activeWorksId","packNum","isChangeGoods","memberId","editWorkType","editTypeTitle"],
		computed: {
			goodsPriceShow: function() {
				return userStore.state.userInfo.goodsPriceShow;
			}
		},
		created() {
			this.piece = this.packNum;
			this.recommendGoods();
			// this.quotes();
		},
		methods:{
			toggleTs(){
				this.showTs=this.showTs?false:true;
			},
			moneyFormat,
			goodsPrice(allTotalPrice,mainTotalPrice){
				let price = allTotalPrice+mainTotalPrice
				return (allTotalPrice+mainTotalPrice).toFixed(2)
			},
			unitPrice(allTotalPrice,mainTotalPrice){
				if(!this.piece||this.piece==0||this.piece==""){
					setTimeout(()=>{
						// this.piece=this.details.piece;
					},300);
				}
				
				if(Infinity==(allTotalPrice+mainTotalPrice)/this.piece){
					return '0.00'
				}
				if(isNaN((allTotalPrice+mainTotalPrice)/this.piece)){
					return '0.00'
				}
				return ((allTotalPrice+mainTotalPrice)/this.piece).toFixed(2)
			},
			close(){
				this.$emit("close",false)
			},
			quantity(num){
				if(this.piece==""){
					this.piece=1;
				}
				let quantity = parseInt(this.piece)
				if(num){
					quantity += num
				}
				this.piece = quantity
				this.goodsTotalPrice(true);
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
			checkparts(item){
				if(item.catGray == "win_box"){
					uni.showToast({
						title: "酒盒不能取消选择",
						icon: "none"
					})
					return false
				}
				if(item.catGray == "outer_box"){
					uni.showToast({
						title: "外箱不能取消选择",
						icon: "none"
					})
					return false
				}
				item.good.checked = !item.good.checked;
				if(item.catGray == "bottle_cover"){
					for(let val of this.partsAll){
						if(val.catGray == "bottle_cover"){
							val.good.checked = item.good.checked;
						}
					}
				}
				this.goodsTotalPrice()
			},
			recommendGoods(changeBuy) {
				this.$request(productApi.worksInfo+this.activeWorksId,"","GET","",1,"",1).then((res)=>{
					if(res.code==200){
						this.worksInfo = res.data;
						this.partsAll = res.data.workItemsListV2;
						this.piece = res.data.num;
						this.wineBottle = res.data.wineBottle;
						this.isWinBottle = res.data.workItemsListV2.find((item)=>{
							return item.catGray == "bottle_cover"
						})
						let productId = "";
						for(let itemGoods of res.data.workItemsListV2){
							if(itemGoods.catGray == "win_box"){
								this.$emit("getProductId",itemGoods.productId)
							}
						}
						this.goodsTotalPrice()
						this.isload = true;
						this.$emit("eidtShow",true)
					}else{
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
						this.$emit("eidtShow",false)
					}
				})
			},
			goodsTotalPrice(num){
				let allTotalPrice = 0;
				let postData = {
					num: this.piece
				}
				// {"num":17,"win_box":{"productId":1315},"win_bottle":{"productId":1295},"win_cover":{"productId":1296}}
				for(let item of this.partsAll){
					postData[item.good.addcartBuyType] = {
						productId: item.good.productId,
						checked: item.good.checked
					}
					if(item.gnsId){
						postData[item.good.addcartBuyType].gnsId = item.gnsId;
						if(item.good.addcartBuyType == "win_box"){
							this.$emit("getGnsId",item.gnsId)
						}
					}
				}
				this.$request(productApi.getPriceByNumAndProductId,postData,"POST").then((res)=>{
					let data = res.data;
					this.totalPrice = res.data.totalPrice;
					for(let item of this.partsAll){
						let goodsType = item.good.addcartBuyType;
						item.good.quantity = data[goodsType].quantity;
						item.good.price = data[goodsType].price;
					}
				})
				this.allTotalPrice = allTotalPrice;
				
			},
			getcheckGoods(num){
				let quantity = num ? num : parseInt(this.piece)*6;
				let postData = {
					productId: this.details.productId,
					quantity: quantity,
				};
				let combinationReqs = [];
				if(this.partsAll.mainGoods){
					for (let item of this.partsAll.mainGoods) {
						if (item.checked) {
							let recommendItem = {
								goodsId: this.details.goodsId,
								productId: item.productId,
								quantity: item.buyNum,
								addcartBuyType: item.addcartBuyType
							};
							combinationReqs.push(recommendItem)
						}
					}
				}
				
				if(!num){
					if(this.partsAll.bottle_lable){
						for (let item of this.partsAll.bottle_lable) {
							if (item.checked) {
								let recommendItem = {
									goodsId: this.details.goodsId,
									productId: item.productId,
									quantity: item.buyNum,
									addcartBuyType: item.addcartBuyType
								};
								combinationReqs.push(recommendItem)
							}
						}
					}
					if(this.partsAll.win_bottle){
						for (let item of this.partsAll.win_bottle) {
							if (item.checked) {
								let recommendItem = {
									goodsId: this.details.goodsId,
									productId: item.productId,
									quantity: item.buyNum,
									addcartBuyType: item.addcartBuyType
								};
								combinationReqs.push(recommendItem)
							}
						}
					}
					if(this.partsAll.win_cover){
						for (let item of this.partsAll.win_cover) {
							if (item.checked) {
								let recommendItem = {
									goodsId: this.details.goodsId,
									productId: item.productId,
									quantity: item.buyNum,
									addcartBuyType: item.addcartBuyType
								};
								combinationReqs.push(recommendItem)
							}
						}
					}
				}
				if (combinationReqs.length > 0) {
					postData.combinationReqs = combinationReqs;
				}
				return postData
			},
			changeGoods(data){
				if(data.editWorkType == 1){
					let win_box = this.partsAll.find(item=>{
						return item.catGray=="win_box"
					})
					let programmeId = win_box.programmeId;
					
					for(let item of data.checkedAllgoods.combinationReqs){
						let itemGoods = {
							good: item,
							productId: item.productId,
							goodsId: item.goodsId,
							templateId: item.templateId,
							catGray: item.addcartBuyType,
							programmeId: programmeId,
							newGoods: true
						}
						if(item.addcartBuyType == "bottle_lable" || item.addcartBuyType == "win_bottle" || item.addcartBuyType == "win_cover"){
							console.log('itemGoods',itemGoods)
							// itemGoods.templateId = data.templateId.bottle_all;
							var template = data.templateId.bottle_all;
							itemGoods.templateId = template.templateId;
							itemGoods.cwitId = template.cwitId;
						}else{
							var template = data.templateId[item.addcartBuyType];
							itemGoods.templateId = template.templateId;
							itemGoods.cwitId = template.cwitId;
						}
						itemGoods.good.checked = true;
						console.log("itemGoods",itemGoods)
						this.partsAll.push(itemGoods)
					}
					
				}else{
					let bottle_cover = {};
					let deleteDesignId = "";
					for(let item of data.checkedAllgoods.combinationReqs){
						bottle_cover[item.addcartBuyType] = item;
					}
					for(let item of this.partsAll){
						if(item.catGray=="bottle_cover"){
							let bottleCoverType = item.good.addcartBuyType;
							item.good.goodsName = bottle_cover[bottleCoverType].goodsName;
							item.productId = bottle_cover[bottleCoverType].productId;
							item.goodsId = bottle_cover[bottleCoverType].goodsId;
							item.good.productId = bottle_cover[bottleCoverType].productId;
							item.good.url = bottle_cover[bottleCoverType].url;
							item.good.checked = true;
							// item.templateId = data.templateId.bottle_all;
							var template = data.templateId.bottle_all;
							item.templateId = template.templateId;
							item.cwitId = template.cwitId;
							deleteDesignId = item.designId;
							item.designId = "";
						}
					}
					if(deleteDesignId){
						for(let item of this.partsAll){
							if(item.designId==deleteDesignId){
								item.designId = "";
							}
						}
					}	
				}
				console.log(data)
				this.goodsTotalPrice();
			},
			async comfirmPrint(){
				let bottle_cover = this.partsAll.find((item)=>{
					return item.good.addcartBuyType == "win_bottle"
				})
				let bottle_lable = this.partsAll.find((item)=>{
					return item.good.addcartBuyType == "bottle_lable"
				})
				let isBottleChecked = false;
				
				let workItemsListV2 = this.worksInfo.workItemsListV2.filter(item=>{
					return item.good.checked
				})
				
				let deleteDesignId = [];
				for(let item of this.worksInfo.workItemsListV2){
					if(!item.good.checked){
						deleteDesignId.push(item.designId)
					}
				}
				let isChangeDiy = false;
				for(let item of workItemsListV2){
					if(deleteDesignId.indexOf(item.designId)>=0){
						item.designId = "";
					}
				}
				
				if(bottle_lable){
					if(bottle_lable.catGray == "bottle_lable"&&bottle_lable.newGoods==true){
						isChangeDiy = true;
					}
				}
				
				let bottle_coverV2 = workItemsListV2.find((item)=>{
					return item.good.addcartBuyType == "win_bottle"
				})
				let bottle_lableV2 = workItemsListV2.find((item)=>{
					return item.good.addcartBuyType == "bottle_lable"
				})
				
				if(bottle_coverV2){
					if(!bottle_coverV2.designId){
						bottle_lableV2.designId = "";
					}
				}
				this.worksInfo.workItemsListV2 = workItemsListV2;
				if(bottle_cover){
					isBottleChecked = bottle_cover.good.checked
				}
				this.worksInfo.isChange = isChangeDiy;
				
				if((isBottleChecked)||(this.wineBottle&&this.wineBottle!="0")){
					this.worksInfo.editWorkType = this.editWorkType;
					let replaceWork = await this.$request(productApi.replaceWork,this.worksInfo,"POST","",1);
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
					this.$emit('seleteOther',this.worksInfo)
				}
			},
		},
	}
</script>

<style lang="scss">
	.choose{
		display: flex;
		flex-direction: column;
		position: fixed;
		top: 180rpx;
		left: 0;
		bottom: 0;
		right: 0;
		border-radius: 24rpx 24rpx 0px 0px;
		padding: 30rpx 0 14rpx 0;
		background: white;
		z-index: 9999;
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
				// flex-wrap: nowrap;
				.goodsContainer{
					width: 100%;
					overflow: auto;
					margin-top: 24rpx;
					display: flex;
					flex-wrap: wrap;
				}
				.goodsItem{
					&:nth-child(3n){
						margin-right: 0;
					}
					background: white;
					border-radius: 12rpx;
					width: 180rpx;
					padding-bottom: 10rpx;
					font-size: 24rpx;
					object-fit: contain;
					text-align: center;
					border: 2rpx solid #CCC;
					margin-right: 18rpx;
					margin-bottom: 18rpx;
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
		.btnGroup{
			display: flex;
			padding: 0 30rpx;
			.comfirmGoods{
				flex: 1;
				height: 76rpx;
				background: #F9353B;
				border-radius: 40px;
				font-size: 32rpx;
				color: white;
				margin-top:14rpx;
			}
			.changeBtn{
				margin-right: 20rpx;
				border: 1px solid #F9403A;
				color: #F9403A;
				background: white;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
	
	.changeGoods{
		position: relative;
		.ts{
			position: absolute;
			background-color: #fff;
			// border:1px solid #eee;
			left:50%;
			top:60rpx;
			transform: translate(-50%,0);
			width:80%;
			border-radius: 10rpx;
			box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
			padding:15rpx;
			font-size:25rpx;
			text-align: left;
		}
	}
</style>