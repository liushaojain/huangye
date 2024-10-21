<template>
	<view>
		<view>
			<map id="map1" :longitude="longitude" :latitude="latitude" :scale="8" :polyline="polyline" :markers="markers" style="width:750rpx; height:80vh" name="">
				<cover-view v-if="list.length!=0" slot="callout">
				    <cover-view class="cover1" marker-id="1">
						<cover-image style="width:150rpx;height:50rpx;" :src="imgBaseUrl+'/icon/wl_1.png'" mode=""></cover-image>
						<cover-view class="text">{{items.factory||'东莞市'}}</cover-view>
					</cover-view>
				    <cover-view class="cover1" marker-id="2">
						<cover-image style="width:150rpx;height:50rpx;" :src="imgBaseUrl+'/icon/wl_2.png'" mode=""></cover-image>
						<cover-view class="text">{{items.StateEx||'运输中'}}</cover-view>
					</cover-view>
				  </cover-view>
			</map>
		</view>
		<view class="box">
			<view class="c1 bf p30 border-r3" style="">
				<view><text>物流单号：</text><text>{{items.LogisticCode}}</text><text @click="setClipboardData" class="ml20 color_2">复制</text></view>
				<view><text>运输方式：</text><text>{{items.delivery}}</text></view>
				<view><text>发货地址：</text><text>{{items.factory}}</text></view>
				<view><text>收货地址：</text><text>{{items.shipAddr}}</text></view>
			</view>
			<view class="bf border-r3 mt20 p30">
				  <view :key="index" v-for="(item,index) in items.Traces" :class="['item','flex',index==0?'item_active':'']">
					  <view :style="{border:index==items.Traces.length-1?'none':''}" class="item_left">
						  <view><text></text></view>
						  <view></view>
					  </view>
					  <view class="item_right">
						  <view><text>{{item.Action}}</text><text>{{item.AcceptTime}}</text></view>
						  <view>{{item.AcceptStation}}</view>
						  <view class="color_1">{{item.Remark||''}}</view>
					  </view>
				  </view>
			</view>
		</view>
	</view>
</template>

<script>
	import api from "@/store/order/index.js"
	export default{
		data(){
			return{
				imgBaseUrl: this.imgBaseUrl,
				logisticCode:'HC202202180001',
				shipperCode:'',
				orderId:'',
				
				longitude:'113.760025',
				latitude:'23.022565',
				polyline:[
					{
						points:[
							// {latitude:42.857156,longitude:120.754286},
							// {latitude:36.767163,longitude:109.129444},
							// {latitude:36.767163,longitude:101.129444},
						],
						color:'#e4393c',
						width:6
					}
				],
				
				
				
				markers:[
					{
						id:1,
						latitude:'',
						longitude:'',
						customCallout:{
							display:'ALWAYS',
						},
						iconPath: this.imgBaseUrl + '/icon/td.png',
						width:30,
						height:30,
						text:'1'
					},
					{
						id:2,
						latitude:'',
						longitude:'',
						customCallout:{
							display:'ALWAYS',
						},
						iconPath: this.imgBaseUrl + '/icon/td.png',
						width:30,
						height:30,
						text:'2'
					},
					
					{
						id:3,
						latitude:'',
						longitude:'',
						iconPath: this.imgBaseUrl + '/icon/cart3.png',
						width:50,
						height:50,
						rotate:60,
						anchor:{
							x:0.5,
							y:0.5
						},
						text:'2'
					}
				],
				
				items:{
					Traces:[]
				},
				
				
				list:[],
				
				step:0,
				
				mapContext:null,
				
				fag:false
				
			}
		},
		onShow() {
			uni.pageScrollTo({
				scrollTop: 300,
				duration: 0
			});
		},
		onLoad(e) {
			this.logisticCode=e.logisticCode;
			this.shipperCode=e.shipperCode;
			this.orderId=e.orderId;
			this.getLogisticsTraces();
			this.getTrackList();
		},
		methods:{
			getLogisticsTraces(){
				this.$request(api.getLogisticsTraces, {
					logisticCode:this.logisticCode,
					shipperCode:this.shipperCode,
					orderId:this.orderId
				}, 'POST', '', 1).then(res => {
					var data=res.data;
					data.Traces=data.Traces.reverse();
					this.items=data;
				})
			},
			getTrackList(){
				this.$request(api.getTrackList, {
					logisticCode:this.logisticCode||'',
					// logisticCode:'HC202202180001',
				}, 'GET', '', 1).then(res => {
					var list=res.data||[];
					if(list.length==0){
						this.markers=[];
						return;
					}
					this.list=list;
					
					var points=[];
					for(var i=0;i<list.length;i++){
						points.push(
							{latitude:list[i].lat,longitude:list[i].lng}
						);
						
						if(i==0){
							this.markers[0].latitude=list[i].lat;
							this.markers[0].longitude=list[i].lng;
							
							this.markers[2].latitude=list[i].lat;
							this.markers[2].longitude=list[i].lng;
						}
						if(i==list.length-1){
							this.markers[1].latitude=list[i].lat;
							this.markers[1].longitude=list[i].lng;
							this.latitude=list[i].lat;
							this.longitude=list[i].lng;
						}
					}
					
					
					this.polyline[0].points=points;
					
					
					this.mapContext=uni.createMapContext('map1',this);
					
					if(items.StateEx=='已签收'){
						return
					}
					this.moveCart();
				})
			},
			moveCart(){
				var that=this;
				this.mapContext.translateMarker({
					markerId:3,
					destination:{
						longitude:this.list[this.step].lng,
						latitude:this.list[this.step].lat,
					},
					// moveWithRotate:true,
					autoRotate:true,
					// duration:800,
					complete:()=>{
						if(this.fag){
							return
						}
						this.step+=10;
						if(this.step>this.list.length-1){
							this.step=this.list.length-1;
							this.fag=true;
						}
						this.moveCart();
					}
				});
			},
			setClipboardData(){
				uni.setClipboardData({
					data: this.items.LogisticCode,
					success: function () {
						uni.showToast({
							title: '复制成功！',
							duration: 2000
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
		font-size:13px;
	}
	.box{
		position: relative;
		top:-30rpx;
	}
	.c1{
		
	}
	.c1>view{
		margin-top:10rpx;
	}
	.item{
		// padding-bottom:20rpx;
		padding-left:15rpx;
		.item_left{
			width:30rpx;
			position: relative;
			border-left:1px solid #DFDFDF;
			>view:nth-child(1){
				width:30rpx;
				height:30rpx;
				background-color: #FFFFFF;
				border-radius: 50%;
				position: absolute;
				left:-55%;
				top:0;
				text{
					position: absolute;
					display: block;
					width:15rpx;
					height:15rpx;
					background: #DFDFDF;
					left:50%;
					top:50%;
					transform: translate(-50%,-50%);
					border-radius: 50%;
				}
			}
		}
		.item_right{
			margin-left:20rpx;
			padding-bottom:20rpx;
			>view{
				margin-bottom:10rpx;
			}
		}
	}
	
	.item_active{
		// padding-bottom:20rpx;
		padding-left:15rpx;
		.item_left{
			width:30rpx;
			position: relative;
			border-left:1px solid #DFDFDF;
			>view:nth-child(1){
				width:30rpx;
				height:30rpx;
				background-color: #D9EBFD;
				border-radius: 50%;
				position: absolute;
				left:-55%;
				top:0;
				text{
					position: absolute;
					display: block;
					width:15rpx;
					height:15rpx;
					background: #1F90FF;
					left:50%;
					top:50%;
					transform: translate(-50%,-50%);
					border-radius: 50%;
				}
			}
		}
		.item_right{
			margin-left:20rpx;
			padding-bottom:20rpx;
			>view{
				margin-bottom:10rpx;
			}
		}
	}
	
	.color_1{
		color:#FF5C33;
	}
	.color_2{
		color:#1F90FF;
	}
	
	.cover1{
		position: relative;
		.text{
			position: absolute;
			right:10rpx;
			top:10rpx;
			width:80rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 10px;
		}
	}
</style>
