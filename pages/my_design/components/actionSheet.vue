<template>
	<view class="action-sheet" v-show="isShow">
		<view class="action-sheet-main" v-show="!isSelectFirst">
			<view class="action-sheet-content">
				<view 
					v-for="(item, index) in actionsheet" 
					:key="index" 
					@click="checkAction(item)" 
					class="action-sheet-item flex-around alignCenter" 
					:class="select && select.dt_id == item.dt_id ? 'active': ''"
				>
					<view><text :class="select && select.dt_id == item.dt_id ? 'blueFont': ''">{{item.dt_name}}</text><text v-if="goodsPriceShow" class="money" v-show="item.money">¥{{item.money|toFixed_f}}</text></view>
					<view></view>
				</view>
			</view>
			<view class="action-sheet-cancel" @click="cancel">取消</view>
		</view>
		<view class="insurance-main" v-show="isSelectFirst">
			<view class="insurance-main-content">
				<view class="insurance-title flex-around alignCenter">
					<view class="title">已选{{select.dt_name}}</view>
					<view class="subtitle">可选物流保价</view>
				</view>
				<view class="insurance-content flex-between">
					<view class="insurance-content-left">
						<view>物流保价 <text>¥{{select.protectMoney}}</text></view>
						<view>费率{{select.protect_rate * 100}}%, 最低保价费¥{{select.minprice}}</view>
					</view>
					<switch class="switch" :checked="switchChecked" @change="switchChange" color="#1F90FF"/>
				</view>
			</view>
			<view class="insurance-btns flex-between">
				<view class="back" @click="this.isSelectFirst = false">返回</view>
				<view class="sure blueFont" @click="sure">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { userStore } from "@/store/account/userInfo.js"
	export default{
		data(){
			return{
				isShow:false,
				select:null,
				isSelectFirst: false,
				switchChecked:false
			}
		},
		props:['actionsheet'],
		computed: {
			goodsPriceShow: function() {
				return userStore.state.userInfo.goodsPriceShow;
			}
		},
		methods:{
			checkAction(item){
				this.select = item
				if (item.protect == 'true') {
					this.isSelectFirst = true
				} else {
					this.$emit("change", item)
					this.isShow = false
				}
			},
			switchChange(e){
				this.switchChecked = e.detail.value
			},
			cancel(){
				this.isShow = false
			},
			sure(){
				this.select.isProtect = this.switchChecked
				this.$emit("change", this.select)
				this.isSelectFirst = false
				this.isShow = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.action-sheet{
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		position: fixed;
		background-color: rgba(0,0,0,0.3);
		z-index: 999;
		.action-sheet-main{
			position: absolute;
			width: 100%;
			z-index: 1000;
			left: 0;
			bottom: 0;
			background-color: #FFFFFF;
			border-radius: 24rpx 24rpx 0rpx 0rpx;
			.action-sheet-item{
				flex-direction: column;
				border-bottom: 2rpx solid #E9EBEC;
				padding: 18rpx 0;
				min-height: 88rpx;
				&:last-child{
					border-bottom-width: 16rpx;
				}
				>view{
					&:first-child{
						font-size: 30rpx;
						.money{
							color: #FF3931;
							margin-left: 12rpx;
						}
					}
					&:last-child{
						font-size: 24rpx;
						color: #93989F;
					}
				}
			}
			.action-sheet-cancel{
				line-height: 88rpx;
				text-align: center;
				font-size: 30rpx;
			}
		}
		.insurance-main{
			position: absolute;
			width: 100%;
			z-index: 1000;
			left: 0;
			bottom: 0;
			background-color: #FFFFFF;
			border-radius: 24rpx 24rpx 0rpx 0rpx;
			.insurance-title{
				flex-direction: column;
				border-bottom: 2rpx solid #E9EBEC;
				padding: 18rpx 0;
				.title{
					font-size: 30rpx;
				}
				.subtitle{
					font-size: 24rpx;
					color: #93989F;
				}
			}
			.insurance-content{
				align-items: center;
				padding: 31rpx 30rpx 31rpx 24rpx;
				border-bottom: 16rpx solid #F4F5F6;
				height: 176rpx;
				.insurance-content-left{
					width: 528rpx;
					>view{
						&:first-child{
							font-size: 30rpx;
							text{
								color: #FF3931;
								margin-left: 12rpx;
							}
						}
						&:last-child{
							font-size: 24rpx;
							color: #93989F;
						}
					}
				}
				.switch{
					width: 88rpx;
					height: 48rpx;
				}
			}
			.insurance-btns{
				height: 88rpx;
				>view{
					flex: 1;
					line-height: 88rpx;
					font-size: 30rpx;
					text-align: center;
					&:first-child{
						border-right: 2rpx solid #E9EBEC;
					}
				}
			}
		}
	}
</style>
