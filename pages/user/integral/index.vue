<template>
	<view>
		<view class="hreader" :style="{'padding-top':paddingT+'px'}">
			<view class="bartop">
				<text class="iconfont icon-fanhui" @tap="navigateBack"></text>
				
				积分
			</view>
			<view class="banner">
				<view class="jf">
					<view class="">
						<text class="txt">可用积分</text>
						<text class="num">{{usePoint}}</text>
					</view>	
					<!-- <button>赚积分</button> -->
					<navigator url="/pages/home/index" open-type="switchTab" >赚积分</navigator>
				</view>
				<view class="msg">消费可获赠同等金额的积分哦</view>
			</view>	
		</view>
		
		<view class="detailMsg" v-if="list.length>0">- 积分明细 -</view>
		<view class="detailMsg" v-else>- 暂无积分 -</view>	
		<view class="list">
			<view class="item" v-for="(item,index) in list" :key="index">
				<view class="date">
					<text>{{item.mouth}}</text>
					<view class="integral">
						<view class="acquisition">获得：{{item.integralTotal}}</view>
						<view class="pastDue">过期：{{item.integralExpire}}</view>
					</view>	
				</view>
				<view class="child" v-for="(child,key) in item.sdbB2cMemberIntegralrecordList" :key="key">
					<view class="info">
						<view class="type" v-if="child.channelId">
							消费<text>（订单号{{child.channelId}}）</text>
						</view>
						<view class="type" v-else>
							积分过期
						</view>
						<text class="time">{{dateFormat(child.updateTime,1)}}</text>
					</view>
					<text class="add" :class="{'fontRed':child.type==2}">{{child.type == 1 ? "+" : "-"}}{{child.point}}</text>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import api from "@/store/account/index.js"
	import { dateFormat } from "@/utils/util.js"
	export default {
		data(){
			return {
				paddingT: 20,
				imgBaseUrl: this.imgBaseUrl,
				userInfo: uni.getStorageSync("userInfo"),
				month: [],
				monthIndex: 0,
				usePoint: 0,
				list: [],
				allLength: 0
			}
		},
		onReachBottom() {
			if((this.month.length-1) > this.monthIndex){
				this.monthIndex++;
				this.detailsForPoints(this.month[this.monthIndex])
			}
		},
		onReady() {
			let that=this;
			const query = uni.createSelectorQuery().in(this);
			uni.getSystemInfo({
			    success: function (res) {
					that.paddingT=res.statusBarHeight;
			    }
			});
		},
		onLoad() {
			let getintegralUrl = api.getintegral+this.userInfo.memberId;
			this.$request(api.getMouthList,"","get").then(res=>{
				this.month = res.data;
				this.detailsForPoints(this.month[this.monthIndex])
			})
			this.$request(api.getintegral,"","get").then(res=>{
				this.usePoint = res.data.usePoint;
			})
		},
		methods:{
			dateFormat,
			navigateBack(){
				uni.navigateBack({
					delta:1
				})
			},
			detailsForPoints(month){
				if(month){
					this.$request(api.detailsForPoints+"/"+month,"","get").then(res=>{
						res.data.mouth = res.data.mouth.split("-")[0] +"年"+ res.data.mouth.split("-")[1]+"月";
						this.list.push(res.data)
						this.allLength += res.data.sdbB2cMemberIntegralrecordList.length;
						if((this.allLength<10)&&(this.month.length-1 > this.monthIndex)){
							this.monthIndex++;
							this.detailsForPoints(this.month[this.monthIndex])
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.hreader{
		background: url(https://xpl-smallbatch.gdoss.xstore.ctyun.cn/dzj/img_jifen_top_bg@2x.png) no-repeat;
		height: 512rpx;
		background-size: 750rpx 630rpx;
		background-repeat: no-repeat;
		position: relative;
		.bartop{
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			font-size: 34rpx;
			text{
				position: absolute;
				left: 30rpx;
				color: #000000;
			}
		}
		.banner{
			bottom: 0;
			left: 0;
			right: 0;
			position: absolute;
			width: 100%;
			height: 270rpx;
			background: url(https://xpl-smallbatch.gdoss.xstore.ctyun.cn/dzj/img_jifen_bg@2x.png) no-repeat;
			background-size: 100% 270rpx;
			margin: auto;
			margin-top: 122rpx;
			padding: 0 70rpx;
			display: flex;
			flex-direction: column;
			.jf{
				flex: 1;
				display: flex;
				color: white;
				view{
					flex: 1;
				}
				.txt{
					margin-top: 40rpx;
					color: white;
					font-size: 28rpx;
					display: block;
				}
				.num{
					font-size: 64rpx;
					color: white;
				}
				navigator{
					width: 160rpx;
					height: 72rpx;
					line-height: 72rpx;
					border-radius: 36rpx;
					background: white;
					font-size: 28rpx;
					color: #F9353B;
					margin-top: 97rpx;
					text-align: center;
				}
			}
			.msg{
				height: 72rpx;
				line-height: 72rpx;
				color: white;
			}
		}
	}
	.detailMsg{
		text-align: center;
		margin: 40rpx 0 30rpx 0;
		font-size: 28rpx;
		color: #999999;
	}
	.list{
		.item{
			margin-bottom: 64rpx;
			.date{
				padding: 0 30rpx;
				display: flex;
				color: #333333;
				font-size: 32rpx;
				line-height: 80rpx;
				background: #FFF7EB;
				margin-bottom: 40rpx;
				text{
					flex: 1;
				}
				.integral{
					display: flex;
					height: 80rpx;
					font-size: 28rpx;
					text-align: right;
					view{
						color: #666666;						
					}
					.pastDue{
						margin-left: 40rpx;
					}
				}
			}
			.child{
				padding: 0 30rpx;
				margin-bottom: 48rpx;
				display: flex;
				height: 95rpx;
				.info{
					flex: 1;
					color: #333333;
					.type{
						font-size: 28rpx;
						padding-bottom: 16rpx;
					}
					text{
						color: #999999;
						font-size: 24rpx;
					}
				}
				.add{
					line-height: 95rpx;
					font-size: 32rpx;
					color: #333333;
					&.fontRed{
						color: #F9353B;
					}
				}
			}
		}
	}
</style>