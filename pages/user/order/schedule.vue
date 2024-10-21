<template>
	<view class="schedule-page">
		<view class="header">
			<view class="order-no">
				<view>订单编号</view>
				<view>{{orderId}}</view>
			</view>
			
			<!-- <view class="order-no ordern" v-if="stateName==''">
				<view>订单数量</view>
				<view>{{scheduleData.orderNum}}</view>
			</view> -->
			
			<!-- <view class="starts" v-if="stateName">
				<view class="text">印刷</view>
				<view class="iconstart">
					<view class="first">
						<text class="icon1"></text>
						<text class="icon2"></text>
						<text class="icon3"></text>
						<text class="icon4"></text>
					</view>
					<view :class="productProgress.state==2?'exceedText':''">{{stateName}}</view>
					<view class="last">
						<text class="icon4"></text>
						<text class="icon3"></text>
						<text class="icon2"></text>
						<text class="icon1"></text>
					</view>
				</view>
				<view class="text">发货</view>
			</view> -->
			
			<!-- <view class="orderNumber" v-if="stateName">
				已生产数量/订单数量<text>{{scheduleData.prodeceNum}}</text>/{{scheduleData.orderNum}}
			</view> -->
			
			<view class="plr30 pb20 ft25" v-if="details.isProduce">
				<!-- <view class="flex_sb c9">
					<text>实际开始 {{details.produceInfo.produceStartTime|timeFormat}}</text>	<text>计划完成 {{details.produceInfo.producePlanEndTime|timeFormat}}</text>
				</view>		
				<view class="flex_sb mt20">
					<view class="ft40">08:00</view>
					<view class="flex_aj">
						<view class="flex_aj d_24"> <text></text> <text></text> <text></text> <text></text> </view>
						<view class="mlr24 d_23">4天后完成</view>
						<view class="flex_aj d_24 flex_d_rr"><text></text><text></text><text></text><text></text></view>
					</view>	
					<view class="ft40">22:00</view>	
				</view>	
				<view class="mt20 c9">原计划：04/09 18:00</view> -->
				
				<!-- <view class="">订单{{item.orderId}}{{item.produceInfo?item.produceInfo.produceStatusStr:'已部分发货'}}</view> -->
				
				<view class="flex_sb"><text>印刷</text><text>发货</text></view>
				
				<view v-if="details.produceInfo&&details.produceInfo.produceStartTime" class="flex_sb mt10 c9">
					<text>实际开始 {{details.produceInfo.produceStartTime|timeFormat}}</text>
					<text v-if='details.produceInfo.produceEndTime'>实际完成 {{details.produceInfo.produceEndTime|timeFormat}}</text>
					<text v-if="!details.produceInfo.produceEndTime">计划完成：{{details.produceInfo.producePlanEndTime|timeFormat}}</text>	
				</view>		
				<view v-if="details.produceInfo&&!details.produceInfo.produceStartTime" class="mt10 flex_sb c9">
					<text>计划开始：{{details.produceInfo.producePlanStartTime|timeFormat}}</text>
					<text>计划完成：{{details.produceInfo.producePlanEndTime|timeFormat}}</text>	
				</view>
				<view v-if="!details.produceInfo" class="flex_sb mt20 c9">
					<text>计划发货</text>	<text>实际发货</text>
				</view>	
				<view class="flex_sb mt20">
					<view v-if="details.produceInfo&&details.produceInfo.produceStartTime" class="ft40">{{details.produceInfo.produceStartTime|timeFormat2}}</view>
					<view v-if="details.produceInfo&&!details.produceInfo.produceStartTime" class="ft40">{{details.produceInfo.producePlanStartTime|timeFormat2}}</view>
					<view v-if="details.planeTime" class="ft25">{{details.planeTime|timeFormat}}</view>
					
					<view v-if='details.produceInfo'>
						<view v-if='details.state=="0"' class="flex_aj v16">
							<text></text><text></text><text></text><text></text><text></text><text></text><text></text><text></text><text></text><text></text>
						</view>
					</view>
					<view class="flex_aj" v-if='details.state!="0"'>
						<view :class="['flex_aj','d_24',details.state==2?'d_25':'']"> <text></text> <text></text> <text></text> <text></text> </view>
						<view :class="['mlr24','d_23',details.state==2?'d_26':'']" v-if="details.produceInfo">{{details.produceInfo.produceStr}}</view>
						<view :class="['mlr24','d_23',details.state==2?'d_26':'']" v-if="!details.produceInfo">{{details.stateName}}</view>
						<view :class="['flex_aj','d_24','flex_d_rr',details.state==2?'d_25':'']"><text></text><text></text><text></text><text></text></view>
					</view>	
					
					<view v-if="details.produceInfo&&!details.produceInfo.produceEndTime" class="ft40">{{details.produceInfo.producePlanEndTime|timeFormat2}}</view>
					<view v-if="details.produceInfo&&details.produceInfo.produceEndTime" class="ft40">{{details.produceInfo.produceEndTime|timeFormat2}}</view>
					<view v-if="details.sendTime" class="ft25">{{details.sendTime|timeFormat}}</view>
				</view>	
				<view v-if="details.produceInfo&&details.produceInfo.produceStartTime" class="mt20 flex_sb c9">
					<text>原计划：{{details.produceInfo.producePlanStartTime|timeFormat(2)}}</text>
					<text v-if="details.produceInfo.produceEndTime">原计划：{{details.produceInfo.producePlanEndTime|timeFormat(2)}}</text>	
				</view>
				
				
				
			</view>
			
		</view>
		<!-- <view class="schedule-content">
			<view class="schedule-content-title">生产进度</view>
			<view class="schedule-content-list">
				<view class="schedule-content-item" v-for="(item, index) in scheduleContentList" :key="index">
					<view class="schedule-item-left">
						<view class="schedule-num" :class="item.status == 'active' ? 'active' : item.status == 'actived' ? 'actived' : 'unActive'">
							<view v-if="item.status == 'actived'" class="actived"><text class="iconfont iconicon_progress_done"></text></view>
							<template v-else>
								<view :class="item.status == 'active' ? 'active' : 'unActive'">{{index + 1}}</view>
							</template>
						</view>
						<view class="schedule-name" :style="{color: item.status == 'active' ? '#1F90FF' : item.status == 'actived' ? '#60656C' : '#93989F'}">{{item.name}}</view>
					</view>
					<view class="schedule-item-right" v-if="item.time">{{item.time}}</view>
				</view>
			</view>
		</view> -->
		<view class="schedule-content-info">
			<view class="schedule-content-title">生产详情</view>
			<view class="schedule-info-list">
				<view class="info-item" v-for="(item, index) in productProgress" :key="index">
					<view class="info-time" :class="item.status == 'active' ? 'active' : ''">
						<view>{{item.date}}</view>
						<view>{{item.time}}</view>
					</view>
					<template v-if="index==0">
						<text class="endStart" :class="item.status == scheduleData.orderStatusNow ? 'active':''">
							<text class=""></text>
						</text>
					</template>
					<template v-else-if="item.status == scheduleData.orderStatusNow">
						<text class="iconstart activeIcon"></text>
					</template>
					<template v-else-if="item.status > scheduleData.orderStatusNow">
						<text class="iconstart noStarted">
							<text></text>
						</text>
					</template>
					<template v-else-if="item.status < scheduleData.orderStatusNow">
						<text class="iconstart started">
							<text></text>
						</text>
					</template>
					<template v-else>
						<text class="iconstart actived-icon"></text>
					</template>
					<view class="info-info" :class="item.status == 'active' ? 'active' : ''">
						<view class="starte" :class="{'normalSta':item.state==1,'normal':item.state==1}">
							<text class="name">{{item.name}}</text>
							<!-- <view v-if="item.stateName" class="statusLine flex_aj"> <text></text> <text></text> </view>	 -->
							<view class="satateTxt exceed" v-if="index==1&&item.state==2&&item.stateName">
								<text class="exceedText">{{item.stateName}}</text>
							</view>
							<view class="satateTxt" v-else-if="index==1&&item.stateName">
								<text>{{item.stateName}}</text>
							</view>
							<view class="satateTxt" v-else-if="item.status <= scheduleData.orderStatusNow&&item.state" :class="item.state==2?'exceed':''">
								<text class="iconfont icona-icon_Progressline1"></text>
								<text v-if="item.state==1">正常</text>
								<text v-else-if="item.state==2">超期</text>
							</view>
							<view class="satateTxt exceed" v-else-if="item.state==2">
								<text class="exceedText">超期</text>
							</view>
						</view>
						<view class="time" v-if="index!=0&&index!=5&&item.planeTime">
							<text class="iconfont iconclock_icon"></text>计划{{scheduleData.orderStatusNow>=item.status?'完成':'开始'}}时间：{{item.planeTime}}
						</view>
						<view class="time" v-if="index!=0&&index!=5&&item.produceTime">
							<text class="iconfont iconclock_icon"></text>实际完成时间：{{item.produceTime}}
						</view>
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
				scheduleContentList:[
					{
						status:'none',
						name:'提交订单',
						time:''
					},
					{
						status:'none',
						name:'付款成功',
						time:''
					},
					{
						status:'none',
						name:'生产印刷',
						time:''
					},
					{
						status:'none',
						name:'工艺制作',
						time:''
					},
					{
						status:'none',
						name:'产品组装',
						time:''
					},
					{
						status:'none',
						name:'已发货',
						time:''
					},
					{
						status:'none',
						name:'确认收货',
						time:''
					}
				],
				productProgress: [],
				scheduleData: {},
				scheduleInfoList:[],
				stateName: "",
				orderId:'',
				
				details:{}
			}
		},
		onLoad(option) {
			this.orderId = option.orderId
			this.getScheduleList();
			this.getProduceProgressInfoV2();
		},
		filters:{
			timeFormat:function(val,state){
				
					var d=new Date(val*1000);
					var nowDate=new Date();
					var nowYear=nowDate.getFullYear();
				    var year=d.getFullYear();
				    var month=change(d.getMonth()+1);
				    var day=change(d.getDate());
				    var hour=change(d.getHours());
				    var minute=change(d.getMinutes());
				    var second=change(d.getSeconds());
				    function change(t){
				        if(t<10){
				          return "0"+t;
				        }else{
				          return t;
				        }
				    }
					if(year==nowYear){
						if(state==2){
							var time=month+'/'+day+' '+hour+':'+minute;
						}else{
							var time=month+'/'+day;
						}
					}else{
						if(state==2){
							var time=year+'/'+month+'/'+day+' '+hour+':'+minute;
						}else{
							var time=year+'/'+month+'/'+day;
						}
					}
				    
				   return time
			},
			timeFormat2:function(val){
					var d=new Date(val*1000);
				    var year=d.getFullYear();
				    var month=change(d.getMonth()+1);
				    var day=change(d.getDate());
				    var hour=change(d.getHours());
				    var minute=change(d.getMinutes());
				    var second=change(d.getSeconds());
				    function change(t){
				        if(t<10){
				          return "0"+t;
				        }else{
				          return t;
				        }
				    }
				    var time=hour+':'+minute;
				   return time
			}
		},
		methods:{
			getProduceProgressInfoV2(){
				this.$request(api.getProduceProgressInfoV2,{orderId:this.orderId},'GET','',1).then(res=>{
					var data=res.data;
					if(data.produceInfo){	
						data.state=data.produceInfo.produceState;
					}
					this.details=res.data;
				});
			},
			getScheduleList(){
				this.$request(api.getProduceProgressInfo, {orderId: this.orderId}, 'GET', '', 1).then(res => {
					let list = res.data.showList;
					this.stateName = res.data.productProgress[4].stateName
					this.scheduleData = res.data;
					// this.scheduleData.orderStatusNow=4;
					for(let item of res.data.productProgress){
						if(item.leftTime){							
							item.date = item.leftTime.split(" ")[0];
							item.time = item.leftTime.split(" ")[1];
						}
					}
					this.productProgress = res.data.productProgress.reverse()
					// if (list && list.length > 0) {
					// 	list.forEach((item, index) => {
					// 		this.$set(this.scheduleContentList[index], 'time', item.time)
					// 		if (index < res.data.orderStatusNow - 1) {
					// 			this.$set(this.scheduleContentList[index], 'status', 'actived')
					// 		} else if (index == res.data.orderStatusNow - 1){
					// 			this.$set(this.scheduleContentList[index], 'status', 'active')
					// 		}
					// 	})
					// }
					// this.scheduleInfoList = res.data.detailsLogs.reverse().map((item, index) => {
					// 	return {
					// 		...item,
					// 		status: index == 0 ? 'active' : 'none'
					// 	}
					// })
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './style/schedule.scss';
	
	page{background-color: #f5f5f5;}
	.d_24 text{
		display: inline-block;
		width:10rpx;
		height:10rpx;
		background-color: #1F90FF;
		margin:0 8rpx;
		border-radius: 50%;
	}
	.d_24 text:nth-child(1){
		opacity: 0.3;
	}
	.d_24 text:nth-child(2){
		opacity: 0.5;
	}
	.d_24 text:nth-child(3){
		opacity: 0.7;
	}
	.d_24 text:nth-child(4){
		opacity: 1;
	}
	
	.d_23{
		background-color: #EBF5FF;
		padding:5rpx 20rpx;
		border-radius: 10rpx;
		color:#1F90FF;
	}
	
	.d_25 text{
		background-color: #FC5D2F;
	}
	.d_26{
		background-color: #FFF2F0;
		color:#FC5D34;
	}
	
	.v16 text{
		display: inline-block;
		width:10rpx;
		height:10rpx;
		background-color: #999;
		margin:0 15rpx;
		border-radius: 50%;
	}
	
	.statusLine text:nth-child(1){
		width: 0;
		height: 0;
		border-top:8rpx solid transparent;
		border-left: 13rpx solid red;
		border-bottom: 8rpx solid transparent;	
	}
	.statusLine text:nth-child(2){
		border-bottom:1px dashed red;
		width:200rpx;
		margin-left:5rpx;
		position: relative;
		top:2rpx;
	}
</style>

