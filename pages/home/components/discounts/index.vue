<template>
	<view class="choose">
		<view class="partsTop">
			<view class="title">
				领取优惠券
				<text class="iconfont icon-guanbi" @tap="close"></text>
			</view>
		</view>	
		<view class="allGoods">
			<view class="item" :class="{'status2':item.buttonType==2}" v-for="(item,index) in couponData" :key="index">
				<view class="itemL">￥ <text>{{item.reduceMoney}}</text> </view>
				<view class="itemR">
					<view class="rule">
						<text>{{item.name}}</text>
						<button type="default" v-if="item.buttonType==0||item.buttonType==1" @click="receiveCoupon(index)">立即领取</button>
						
					</view>
					<view class="date">{{item.fromTime}} - {{item.toTime}}</view>
					<view class="info">{{item.notice}}</view>
				</view>
			</view>
		</view>
		
		<button class="comfirmGoods" @tap="close">关闭</button>
	</view>
</template>

<script>
	import homeApi from '@/store/home/index.js'
	import { userStore } from "@/store/account/userInfo.js"
	export default {
		data(){
			return {
				memberId: ''
			}
		},
		props:['couponData'],
		created() {
			if(userStore.state.userInfo.memberId){
				this.memberId=userStore.state.userInfo.memberId;
			}
		},
		methods:{
			close(){
				this.$emit("closeDiscounts")
			},
			receiveCoupon(index){
				let that = this;
				let cpnsId = this.couponData[index].id;
				this.$request(homeApi.receiveCoupon+cpnsId, "" , "PUT", "", 1).then(res => {
					if(res.code==200){
						uni.requestSubscribeMessage({
							tmplIds: ['hQ2WzborxWMbKBiU-eITXV7MGQhkK6VZdQCABsoXTz8','a2du7nlpp-vtqex9GHDC-46Am4Q13eXHwlszVHB5wek'],
							success (res) {},
							fail(res){},
							complete(e){
								uni.showToast({
									title:"领取成功",
									icon:"none"
								})
								this.$emit("getCoupon",{index:index,type:res.data})
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.status2{
		background: url("https://xpl-smallbatch.gdoss.xstore.ctyun.cn/dzj/img_yilingqu.png");
		background-position: top right;
		background-size: 136rpx 136rpx;
		background-repeat: no-repeat;
	}
	.choose{
		position: relative;
		display: flex;
		flex-direction: column;
		max-height: 900rpx;
		border-radius: 24rpx;
		padding: 30rpx 0 30rpx 0;
		background: white;
		margin: 250rpx auto 150rpx auto;
		.partsTop{
			text-align: center;
			color: #333333;
			font-size: 34rpx;
		}
		.icon-guanbi{
			position: absolute;
			top: 30rpx;
			right: 30rpx;
		}
		.allGoods{
			max-height: 670rpx;
			overflow: auto;
			margin-top: 28rpx;
			padding: 0 30rpx;
			.item{
				display: flex;
				align-items: center;
				margin-bottom: 32rpx;
				margin-top: 2rpx;
				border-radius: 20rpx;
				box-shadow: 2rpx 2rpx 4rpx 4rpx #F2F2F2;
				padding-right: 30rpx;
				.itemL{
					width: 180rpx;
					height: 160rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background-image: url("https://xpl-smallbatch.gdoss.xstore.ctyun.cn/dzj/img_youhuiquan.png");
					background-size: cover;
					font-size: 36rpx;
					color: #F9353B;
					text{
						font-size: 58rpx;
					}
				}
				.itemR{
					flex: 1;
					margin-left: 33rpx;
					.rule{
						display: flex;
						text{
							flex: 1;
							color: #333333;
							font-size: 24rpx;
							line-height: 48rpx;
						}
						button{
							width: 144rpx;
							height: 48rpx;
							text-align: center;
							line-height: 48rpx;
							background: #F9353B;
							border-radius: 48rpx;
							color: white;
							border: none;
							font-size: 24rpx;
							padding: 0;
						}
					}
					.date{
						margin-top: 10rpx;
						color: #999999;
						font-size: 24rpx;
					}
					.info{
						margin-top: 20rpx;
						font-size: 20rpx;
						color: #453D3D;
					}
				}
			}
			
		}
		.comfirmGoods{
			width: 320rpx;
			height: 80rpx;
			background: #F9353B;
			border-radius: 40px;
			font-size: 32rpx;
			color: white;
			margin-top:14rpx;
		}
	}
	// background-image: url("https://xpl-smallbatch.gdoss.xstore.ctyun.cn/dzj/bg_xiangqing@2x.png");
</style>