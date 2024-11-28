<template>
	<view>
		<view class="content">
			<view class="title">
				修改作品
				<text class="iconfont icon-guanbi" @tap="this.$emit('close')"></text>
			</view>
			<view class="selectContent" @tap="editWorkCheck(1)">
				<view class="item">
					<image class="itemIcon" :src="imgBaseUrl+'icon_add@2x.png'" mode="aspectFill"></image>
					<view class="flex1">
						<view class="selectName">
							<view class="txt">新增商品</view>
							<text class="iconfont icon-icon_label_arrow_right"></text>
						</view>
						<view class="hint">需重新DIY对应的模板，并需再次签字</view>
					</view>
				</view>
			</view>
			<view class="selectContent" @tap="editWorkCheck(2)">
				<view class="item">
					<image class="itemIcon" :src="imgBaseUrl+'icon_reduce@2x.png'" mode="aspectFill"></image>
					<view class="flex1">
						<view class="selectName">
							<view class="txt">减少商品</view>
							<text class="iconfont icon-icon_label_arrow_right"></text>
						</view>
						<view class="hint">无需再次DIY，确认数量即可印刷</view>
					</view>
				</view>
			</view>
			<view class="selectContent" @tap="editWorkCheck(3)">
				<view class="item">
					<image class="itemIcon" :src="imgBaseUrl+'icon_change@2x.png'" mode="aspectFill"></image>
					<view class="flex1">
						<view class="selectName">
							<view class="txt">更换酒瓶</view>
							<text class="iconfont icon-icon_label_arrow_right"></text>
						</view>
						<view class="hint">需重新DIY酒标文件(原内容无法复用)，并需再次签字确认后才能印刷</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import designApi from "@/store/design/index.js"
	import {moneyFormat} from '@/utils/util.js'
	export default {
		data(){
			return{
				imgBaseUrl: this.imgBaseUrl
				
			}
		},
		props:["eidtWorkId"],
		created() {
			console.log(this.eidtWorkId)
		},
		methods:{
			editWorkCheck(editWorkType){
				this.$request(designApi.editWorkCheck,{
					"worksId": this.eidtWorkId,
					"editWorkType": editWorkType
				},"POST","","","",1).then(res=>{
					let content = "";
					if(editWorkType == 1){
						content = '增加酒瓶需重新设计酒标文件，会重新生成一份新设计作品，并需要重新编辑酒标文件。是否继续更换？';
					}else if(editWorkType == 3){
						content = '更换酒瓶需重新DIY酒标文件（原酒标文件无法复用），是否继续更换酒瓶？';
					}
					
					if(res.code == 200){
						this.$emit("editType",editWorkType)
					}else if(res.code == 203){
						let that = this;
						uni.showModal({
							title: '提示',
							confirmText:'确认',
							cancelText: '取消',
							content: content,
							success: function (res) {
								if (res.confirm) {
									that.$emit("editType",editWorkType)
								} else if (res.cancel) {}
							}
						});
					}else{
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		width: 640rpx;
		height: 770rpx;
		background: #F4FAFF;
		border-radius: 24rpx;
		padding: 30rpx;
		position: relative;
		.flex1{
			flex: 1;
		}
		.title{
			font-size: 32rpx;
			text-align: center;
			.iconfont{
				position: absolute;
				top: 36rpx;
				right: 30rpx;
				font-size: 28rpx;
			}
		}
		.selectContent{
			.item{
				align-items: center;
				background: white;
				display: flex;
				padding: 40rpx 27rpx;
				margin-top: 16rpx;
				border-radius: 16rpx;
				&::first-child{
					margin-top: 26rpx;
				}
				.itemIcon{
					height: 120rpx;
					width: 120rpx;
					margin-right: 25rpx;
				}
				.selectName{
					display: flex;
					.txt{
						flex: 1;
						font-size: 30rpx;
					}
					.iconfont{
						font-size: 20rpx;
					}
				}
				.hint{
					color: #666666;
					font-size: 24rpx;
					margin-top: 8rpx;
				}
			}
		}
		
	}
</style>