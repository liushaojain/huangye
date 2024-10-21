<template>
	<view class="choose">
		<view class="partsTop">
			<view class="title">
				确认模板
				<text class="iconfont icon-guanbi" @tap="close"></text>
			</view>
		</view>	
		<view class="goods templateList">
			
			<view class="child" v-if="templateList.bag.length>0">
				<view class="type">
					<text class="typeName">手提袋</text>
					<text class="checkedTemplate">已选“{{templateList.bag[checkedAll.bag].templateName}}”</text>
				</view>
				<view class="template">
					<view class="item" 
						@click="checked(item,index,'bag')" 
						v-for="(item,index) in templateList.bag" 
						:key="index" 
						:class="{'checked':checkedAll.bag==index}">
						<image :src="item.screenshot" mode="aspectFit"></image>
						<view class="templateName ellipsis2">{{item.templateName}}</view>
					</view>
				</view>
			</view>
			<view class="child" v-if="templateList.bottle_all.length>0">
				<view class="type">
					<text class="typeName">{{bottle_name}}</text>
					<text class="checkedTemplate">已选“{{templateList.bottle_all[checkedAll.bottle_all].templateName}}”</text>
				</view>
				<view class="template">
					<view class="item" 
						@click="checked(item,index,'bottle_all')" 
						v-for="(item,index) in templateList.bottle_all" 
						:key="index" 
						:class="{'checked':checkedAll.bottle_all==index}">
						<image :src="item.screenshot" mode="aspectFit"></image>
						<view class="templateName ellipsis2">{{item.templateName}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btnGroup">
			<button class="comfirmGoods changeBtn" @tap="back">上一步</button>
			<button class="comfirmGoods" @tap="comfirm">下一步</button>
		</view>
	</view>
</template>



<script>
	import productApi from "@/store/product/index.js"
	import {moneyFormat} from '@/utils/util.js'
	export default {
		data(){
			return {
				shopGoods:"",
				templateList: {
					win_box: [],//酒盒
					bag: [],//手提袋
					outer_box: [],//外箱
					bottle_all: [],//酒瓶酒盖酒标
				},
				bottle_name: "",
				checkedAll:{
					win_box: 0,//酒盒
					bag: 0,//手提袋
					outer_box: 0,//外箱
					bottle_all: 0,//酒瓶酒盖酒标
				},
				otherType:{
					bottle_cover_lable:"酒瓶酒盖酒标",
					bottle_cover:"酒瓶酒盖",
					bottle_lable:"酒标"
				},
				templateImg: [],
			}
		},
		props:["checkedAllgoods","editWorkType","addInfo","goodsGnsId"],
		created() {
			this.goodsTemplateList();
		},
		methods:{
			goodsTemplateList(){
				let checkedAllgoods = this.checkedAllgoods;
				checkedAllgoods.gnsId = this.goodsGnsId;
				this.$request(productApi.goodsTemplateList,this.checkedAllgoods,"POST","","","",1).then(res=>{
					if(res.code != 200){
						uni.showToast({
							title: res.msg,
							icon:"none"
						})
						this.$emit("back",this.editWorkType);
						return false
					}
					let data = res.data;
					let winBox = data.win_box.find(item=>{
						return item.templateId == this.addInfo.winBoxTId
					})
					
					
					this.templateList.bag = winBox.bagTemplates||[];
					let bagGoods = this.checkedAllgoods.combinationReqs.find(itemGoods=>{
						return itemGoods.addcartBuyType == "bag"
					})
					
					let bottleGoods = this.checkedAllgoods.combinationReqs.find(itemGoods=>{
						return itemGoods.addcartBuyType == "win_bottle"
					})
					
					if(bagGoods&&data.bag.length==0){
						uni.showToast({
							title:"暂无匹配的模板，请重新选择商品",
							icon:"none"
						})
						this.$emit("back",this.editWorkType);
						return false
					}
					if(bottleGoods){
						if(data.win_box){
							if(data.win_box[0].otherTemplates&&data.win_box[0].otherTemplates.length>0){
								this.templateList.bottle_all = data.win_box[0].otherTemplates;
							}else{
								uni.showToast({
									title:"暂无匹配的模板，请重新选择商品",
									icon:"none"
								})
								this.$emit("back",this.editWorkType);
							}
						}else{
							uni.showToast({
								title:"暂无匹配的模板，请重新选择商品",
								icon:"none"
							})
							this.$emit("back",this.editWorkType);
						}
					}
					// this.getTemplateImg()
				})
			},
			close(){
				this.$emit("close");
			},
			back(){
				this.$emit("back",this.editWorkType);
			},
			checked(item,index,type){
				if(index == this.checkedAll[type]){
					return false
				}
				this.checkedAll[type] = index;
				if(type=="win_box"){
					this.templateList.bag = item.bagTemplates?item.bagTemplates:[];
					this.templateList.outer_box = item.outBoxTemplates?item.outBoxTemplates:[];
				}
				if(type=="win_box"&&item.otherTemplates){
					this.bottle_name = this.otherType[item.otherCatGray];
					this.templateList.bottle_all = item.otherTemplates;
					this.checkedAll.bottle_all = 0;
				}
			},
			comfirm(){
				var templateId = {}
				for(let type in this.templateList){
					let item = this.templateList[type]
					if(item.length){
						var index = this.checkedAll[type]
						templateId[type] = {
							templateId: item[index].templateId,
							cwitId: item[index].cwitId
						}
					}
				}
				this.$emit("comfirmTemplate",templateId)
			}
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
	.templateList{
		flex: 1;
		margin: 20rpx 30rpx;
		// padding: 30rpx 0rpx;
		.child{
			padding-bottom: 60rpx;
			&:last-child{
				padding: 0;
			}
			.type{
				display: flex;
				margin-bottom: 30rpx;
				.typeName{
					color: #333333;
					font-size: 30rpx;
				}
				.checkedTemplate{
					flex: 1;
					text-align: right;
					color: #666666;
					font-size: 26rpx;
				}
			}
			.template{
				display: -webkit-box;
				overflow: auto;
				.item{
					width: 180rpx;
					// height: 254rpx;
					background: white;
					border-radius: 12rpx;
					border: 2rpx solid #CCCCCC;
					padding: 10rpx 18rpx;
					font-size: 24rpx;
					
					margin-right: 20rpx;
					&.checked{
						background: white;
						border: 2rpx solid #F9353B;
					}
					image{
						width: 140rpx;
						height: 140rpx;
						margin-bottom: 20rpx;
					}
					.templateName{
						height: 64rpx;
						color: #333333;
					}
					.price{
						display: block;
						text-align: center;
						color: #FF3931;
						margin-top: 8rpx;
					}
				}
			}
		}
	}
</style>