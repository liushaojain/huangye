<template>
	<view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
			}
		},
		computed:{
			
		},
		onLoad(e) {
		},
		onShow() {
						
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	page{
		background: #F5F5F5;
		padding-bottom: 10rpx;
	}
	.hreader{
		height: 520rpx;
		width: 100%;
		background: url(https://xpl-smallbatch.gdoss.xstore.ctyun.cn/dzj/img_me_top_bg@2x.png) no-repeat;
		background-size: cover;
		.flexName{
			display: flex;
			flex-direction: column;
		}
		.first{
			padding: 168rpx 30rpx 40rpx 30rpx;
			font-size: 34rpx;
			view{
				color: #333333;
				line-height: 48rpx;
				.blueFont{
					width: 172rpx;
					height: 44rpx;
					background: #FFFFFF;
					border-radius: 22rpx;
					text-align: center;
					line-height: 44rpx;
					color: #5393F5;
					font-size: 22rpx;
					margin-top: 8rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.LevelIcon{
						margin-right: 6rpx;
						height: 32rpx;
						width: 32rpx;
					}
				}
			}
			button{
				width: 160rpx !important;
				height: 160rpx !important;
				border-radius: 80rpx;
				margin-right:40rpx;
				padding:0;
			}
			image{
				// margin-right: 40rpx;
				width: 160rpx;
				height: 160rpx;
				border-radius: 80rpx;
			}
			.loginBtn{
				position: relative;
				bottom: 10rpx;
			}
			.user-level{
				background-color: #C3E1FF;
				font-size: 24rpx;
				padding: 0 24rpx;
				height: 48rpx;
				border-radius: 24rpx;
				color: #5393F5;
				font-size: 22rpx;
				margin-top: 8rpx;
			}
		}
		.last{
			height: 200rpx;
			overflow: hidden;
			margin: 0 30rpx;
			border-radius: 24rpx;
			font-size: 28rpx;
			position: relative;
			.balance{
				display: flex;
				height: 88rpx;
				line-height: 88rpx;
				padding: 0 30rpx;
				.label{
					flex: 1;
				}
				.iconfont{
					font-size: 24rpx;
				}
			}
			.list{
				width: 100%;
				display: flex;
				height: 200rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: white;
				border-radius: 24rpx;
				position: absolute;
				bottom: 0;
				left: 0;
				.navigator{
					text-align: center;
					color: #333333;
					view{
						font-size: 30rpx;
					}
					image{
						height: 72rpx;
						width: 72rpx;
						margin-right: 8rpx;
						vertical-align: middle;
					}
					text{
						display: block;
						font-size: 44rpx;
						margin-top: 10rpx;
					}
					flex: 1;
				}
			}
		}
	}
	.order{
		margin: 90rpx 30rpx 0 30rpx;
		// height: 345rpx;
		background: white;
		border-radius: 24rpx;
		display: flex;
		flex-direction: column;
		.title{
			padding: 0 30rpx;
			font-size: 28rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin-top: 10rpx;
			display: flex;
			align-items: center;
			view{
				color: #999999;				
			}
			.text{
				flex: 1;
			}
			.iconfont{
				font-size: 28rpx;
			}
		}
		>view{
			&.orderStates{
				height: 140rpx;
				display: flex;
				margin-top: 10rpx;
				image{
					height: 56rpx;
					width: 56rpx;
					display: block;
					margin: 10rpx auto;
				}
				.navigator{
					flex: 1;
					text-align: center;
					color: #333333;
					font-size: 26rpx;
					.item-img{
						position: relative;
						.item-num{
							position: absolute;
							top: -17rpx;
							left: 110rpx;
							background-color: #FF3931;
							color: #FFFFFF;
							font-size: 24rpx;
							border-radius: 17rpx;
							padding: 0 10rpx;
							line-height: 34rpx;
							height: 34rpx;
							min-width: 34rpx;
						}
					}
				}
			}
		}
		.statesSwiper{
			height: 108rpx;
			padding: 0 50rpx 26rpx 30rpx;
			.items{
				display: flex;
				align-items: center;
			}
			image{
				width: 88rpx;
				height: 88rpx;
				border-radius: 8rpx;
			}
			.info{
				flex: 1;
				margin-left: 10rpx;
				// display: flex;
				view{
					display: flex;
					margin: 4rpx;
				}
				.orderId{
					font-size: 26rpx;
					flex: 1;
				}
				.time,.satateDate{
					color: #9A9A9A;
					font-size: 24rpx;
				}
				.satate{
					color: #FF5C33;
					margin-left: 16rpx;
					font-size: 24rpx;
				}
			}
		}
	}
	.skip{
		margin: 30rpx;
		image{
			height: 114rpx;
			width: 100%;
		}
	}
	.myContent1{
		margin: 30rpx;
		display: flex;
		.item{
			height: 116rpx;
			flex: 1;
			display: flex;
			align-items: center;
			background: white;
			width: 366rpx;
			padding: 0 12rpx 0 27rpx;
			border-radius: 24rpx;
			&:first-child{
				margin-right: 18rpx;
			}
			view{
				flex: 1;
				text{
					display: block;
					&:first-child{
						font-size: 30rpx;
						color: #333333;
					}
					&:last-child{
						color: #999999;
						font-size: 24rpx;
					}
				}
			}
			image{
				width: 112rpx;
				height: 112rpx;
			}
		}
	}
	.myContent2{
		// height: 180rpx;
		padding-top: 30rpx;
		background: white;
		border-radius: 24rpx;
		margin:0 30rpx;
		
		display: flex;
		align-items: center;
		// justify-content: center;
		text-align: center;
		flex-wrap: wrap;
		.item{
			padding-bottom: 30rpx;
			// flex: 1;
			width: 230rpx;
			font-size: 26rpx;
		}
		text{
			display: block;
			margin-top: 12rpx;
		}
		image{
			width: 64rpx;
			height: 64rpx;
		}
	}
	
	.infoList{
		margin: 30rpx;
		background: white;
		border-radius: 24rpx;
		padding: 0 30rpx;
		.item{
			display: flex;
			view{
				flex: 1;
				height: 96rpx;
				line-height: 96rpx;
				font-size: 30rpx;
				display: flex;
				align-items: center;
			}
			text{
				line-height: 96rpx;
				font-size: 40rpx;
				margin-right: 10rpx;
			}
			.iconicon_label_arrow_right{
				font-size: 24rpx;
				margin: 0;
			}
		}
	}
	.quit{
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		margin: 40rpx 30rpx;
		background: white;
		border-radius: 44rpx;
		font-size: 30rpx;
		color: #60656C;
	}
	.swiper-item{
		border-top: 1px dashed #EBEBEB;
		margin-top: 30rpx;
		.title{
			padding: 0;
			font-size: 26rpx;
			color: #333333;
			margin: 0;
			line-height: 100rpx;
			image{
				height: 32rpx;
				width: 32rpx;
				vertical-align: middle;
				margin-right: 6rpx;
				
				
			}
		}
		.content{
			display: flex;
			.first,.last{
				width: 144rpx;
				font-size: 24rpx;
				line-height: 40rpx;
				color: #999999;
				display: flex;
				flex-direction: column;
				text:last-child{
					color: #333333;
					font-size: 26rpx;
				}
			}
			.desc{
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				::after{
					content: "";
					width: 50rpx;
					height: 1rpx;
					border-top: 1rpx dashed #333333;
					position: absolute;
					left: 30rpx;
					border-color: #F9353B;
					top: 40rpx;
				}
				::before{
					content: "";
					width: 50rpx;
					height: 1rpx;
					border-top: 1rpx dashed #333333;
					position: absolute;
					right: 30rpx;
					border-color: #CCCCCC;
					top: 40rpx;
				}
				text{
					width: 178rpx;
					height: 80rpx;
					background: #FFECEC;
					border-radius: 8rpx;
					color: #F9353B;
					font-size: 26rpx;
					text-align: center;
					line-height: 80rpx;
				}
			}
		}
	}
	
	
</style>
