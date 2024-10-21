<template>
	<view>
		<view v-show="show" class="cus">
			<view class="cus_box">
				<view class="cus_box_t">
					<view class="title"><text>订单备注</text></view>
					<view class="content">
						<textarea v-model="content" maxlength="200" name="" id="" cols="30" rows="10" placeholder="选填"></textarea>
						<view class="tae"><text>{{content.length}}/200</text></view>
					</view>
					<view class="close"><text class="iconfont icon-guanbi" @click="show=false"></text></view>
				</view>
				
				<view class="btn_box"><view class="btn" @click="submit">确定</view></view>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		data(){
			return{
				show:false,
				content:''
			}
		},
		mounted() {
			
		},
		methods:{
			showRemark(){
				this.show=true;
			},
			submit(){
				this.$emit('remarkCall',this.content);
				this.show=false;
			}
		}
	}
</script>

<style lang="scss" scoped>
		.cus{
			z-index: 100;
			.cus_box{
				position: absolute;
				left:0;
				bottom:0;
				width:100%;
				.cus_box_t{
					background-color: #fff;
					border-top-left-radius: 40rpx;
					border-top-right-radius: 40rpx;
					padding-bottom:20rpx;
					position: relative;
					.title{
						text-align: center;
						line-height: 100rpx;
						font-size:16px;
					}
					.content{
						background-color: #F4F4F4;
						width:90%;
						height:300rpx;
						margin:0 auto;
						border-radius: 15rpx;
						padding:20rpx;
						textarea{
							width:100%;
							height:80%;
						}
					}
					.close{
						position: absolute;
						right:25rpx;
						top:25rpx;
					}
				}
				
				.btn_box{
					background-color: #fff;
					// border-top:10rpx solid #F5F5F5;
					margin-top:10rpx;
					padding:10px 0;
				}
				.btn{
					background-color: #F9353B;
					width:90%;
					height:80rpx;
					margin:0 auto;
					text-align: center;
					line-height: 80rpx;
					color:#fff;
					border-radius: 40rpx;
				}
				
			}
		}
</style>