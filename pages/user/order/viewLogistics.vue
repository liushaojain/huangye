<template>
	<view>
		<view class="item bf mt24 p20 border-r2" v-for="(item,index) in list" :key='index'>
			<view class="flex_sb bdb p20">
				<view class="flex_aj"><image class="icon1" :src="imgBaseUrl+'/icon/wl.png'" mode="aspectFit"></image><text class="ml24">{{item.statusTxt}}</text></view>
				<view class="c9">{{item.shipperName||''}}：{{item.logisticCode}}</view>
			</view>
			<view class="mt20">
				<!-- <template> -->
					<view v-for="(item2,index2) in item.deliveryDataRes" :key="index2">
						<view v-if="item2.isPart!=1" class="flex">
							<view style="width:30%;"><image class="goodsImg1" :src="item2.imageUrl" mode=""></image></view>
							<view style="width:65%;" class="ml20">
								<view>{{item2.productionName}}</view>
								<view class="c9 ft25 mt10">(原商品名称：{{item2.goodsName}})</view>
								<view class="c9 ft25 ellipsis">{{item2.selectValues||''}}</view>
								<view class="flex_sb mt20"><text></text><text class="c9">x {{item2.sendQty}}</text></view>
							</view>
						</view>
						<view v-if="item2.isPart==1" class="mt10">
							<view class="flex">
								<view style="width:30%;"><image class="goodsImg1" :src="item2.imageUrl" mode=""></image></view>
								<view style="width:65%;" class="ml20">
									<view class="flex_a"><text style="width:10%;" class="tag1 tac">配件</text><text style="width:85%;" class="ml10">{{item2.productionName}}</text></view>
									<view class="c9 ft25 mt10">(原商品名称：{{item2.goodsName}})</view>
									<view class="flex_sb mt10"><text></text><text class="c9">x {{item2.sendQty}}</text></view>
								</view>
							</view>
						</view>
					</view>
				<!-- </template> -->
			</view>
			<view class="flex jce"><text @click="logistcsDetails(item)" class="btn">物流详情</text></view>
		</view>
	</view>
</template>

<script>
	import api from "@/store/order/index.js"
	export default{
		data(){
			return{
				orderId:'',
				imgBaseUrl: this.imgBaseUrl,
				list:[]
			}
		},
		onShow() {
			
		},
		onLoad(e) {
			this.orderId=e.orderId;
			this.getData();
		},
		methods:{
			getData(){
				this.$request(api.getLogistics, {
					orderId:this.orderId
				}, 'GET', '', 1).then(res => {
					let list=res.data||[];
					list.map(res2=>{
						res2.deliveryDataRes.sort((a,b)=>{
							return a.isPart-b.isPart
						});
					})
					this.list=list;
				})
			},
			logistcsDetails(item){
				uni.navigateTo({
					url:'/pages/user/order/logisticsDetails?logisticCode='+item.logisticCode+'&shipperCode='+item.deliveryDataRes[0].shipperCode+'&orderId='+this.orderId
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		font-size:14px;
		background-color: #F5F5F5;
	}
	.icon1{
		width:40rpx;
		height: 40rpx;
	}
	.goodsImg1{
		width:200rpx;
		height:200rpx;
		border:1px solid #eee;
		border-radius: 5rpx;
		overflow: hidden;
	}
	.tag1{
		color:#1F90FF;
		background-color: #DEEFFF;
		font-size: 10px;
		padding:2px 5px;
	}
	
	.btn{
		border:1px solid #C9CBCF;
		padding:10rpx 20rpx;
		border-radius: 40rpx;
	}
</style>
