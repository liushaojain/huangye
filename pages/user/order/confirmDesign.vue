<template>
	<view class="design">
		<view class="item" v-for="(item,index) in designList" :key="index" :class="item.open?'show':'hidden'">
			<view class="title">
				<text>第{{item.versions}}版效果图</text>
				<text v-if="item.isDefault=='true'" class="Default">已确认该版本</text>
				<text class="iconfont iconicon_arrow_down_white" @click="openItem(item)"></text>
			</view>
			<view class="activeImg">
				<image :src="item.imagePrefix+'/'+item.imageList[item.activeImg].url" mode="aspectFit"></image>
			</view>
			<view class="imgList">
				<view v-for="(val,key) in item.imageList" :key="key" :class="item.activeImg==key?'active':''" @click="Switch(item,key)">
					<image :src="item.imagePrefix+'/'+val.url" mode="aspectFit"></image>
					<text>{{imgType[key]}}</text>
				</view>
			</view>
			<view class="explain">
				<view class="label">设计说明</view>
				<view class="msg">{{item.versionDesc}}</view>
			</view>
			<view class="feedback" v-if="item.versionUserReply">
				<view>我的反馈</view>
				<text class="textarea">{{item.versionUserReply}}</text>
				<!-- <textarea :disabled="!item.confirm" v-model="item.versionUserReply" placeholder="请输入反馈内容" /> -->
			</view>
			<view class="btnGroup" v-if="item.confirm&&item.isDefault!='true'&&allOpen==false">
				<text @click="openFeedback(item)">反馈</text>
				<text @click="confirm(item)">确定</text>
			</view>
		</view>
		<view class="popup" v-if="feedbackItem!=''">
			<view class="feedbackContainer">
				<view class="title">
					<text class="cancel" @click="cancelFeedback">取消</text>
					反馈意见
					<text class="submit" @click="feedback">提交</text>
				</view>
				<textarea value="" placeholder="请输入您的意见"  v-model="versionUserReply"  placeholder-style="color:#C9CBCF" />
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/store/order/index.js'
	export default {
		data(){
			return {
				designList: [],
				imgType: ['正视图','俯视图','左视图','透视图'],
				orderId: '',
				type: '',
				Default:'',
				versionUserReply: '',
				feedbackItem: '',
				allOpen: false,
				status:false,
			}
		},
		onLoad(e) {
			this.orderId= e.orderId;
			this.type= e.type;
			this.selectList();
		},
		onUnload() {
			let pages = getCurrentPages(); // 当前页面
			let beforePage = pages[pages.length - 2]; // 前一个页面
			let options = {type:this.type}
			beforePage.onLoad(options);
		},
		methods:{
			selectList(){
				this.$request(api.selectList,{orderId:this.orderId},"GET","",1).then(res=>{
					this.allOpen=false;
					for(let index in res.data){
						let item= res.data[index];
						if(item.versionUserReply){
							item.confirm= false;
						}else{
							item.confirm= true;
						}
						if(item.isDefault=='true'){
							item.open= true;
							this.allOpen= true;
						}else{
							item.open= false;
						}
						item.activeImg=0;
						item.versions=res.data.length-index;
					}
					if(this.allOpen==false){
						res.data[0].open=true;
					}
					this.designList= res.data;
				})
			},
			openItem(item){
				item.open=!item.open;
			},
			Switch(item,index){
				item.activeImg=index;
			},
			confirm(item){
				let that=this;
				uni.showModal({
					title:`是否确认第${item.versions}版为最终版本？`,
					success: async (res) => {
						if (res.confirm) {							
							let postData={
								confirm: true,
								designInfoId: item.designInfoId,
								versionId: item.versionId
							}
							that.$request(api.versionFeedbackOrConfirm,postData,'POST',"",1).then(res=>{
								if(res.code==200){
									this.designList=[];
									this.selectList();
									this.status=false;
								}
							})
						}
					}
				})
				
			},
			cancelFeedback(){
				this.feedbackItem="";
			},
			openFeedback(item){
				this.feedbackItem=item;
			},
			feedback(){
				if(this.versionUserReply==""){
					uni.showToast({
						title: "请输入反馈内容",
						icon: "none"
					})
					return false
				}
				let postData={
					confirm: false,
					designInfoId: this.feedbackItem.designInfoId,
					versionId: this.feedbackItem.versionId,
					versionUserReply: this.versionUserReply
				}
				
				this.$request(api.versionFeedbackOrConfirm,postData,'POST',"",1).then(res=>{
					if(res.code==200){
						uni.showToast({
							title: "反馈成功",
							icon: "none"
						})
						setTimeout(res=>{
							this.feedbackItem="";
							uni.navigateBack({
								delta:1
							})
						},2000)
					}
				})
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #F5F5F5;
	}
	.design{
		.item{
			background: white;
			margin: 24rpx 0;
			padding: 0 30rpx 30rpx 30rpx;
			border-radius: 24rpx;
			&.hidden{
				height: 88rpx;
				overflow: hidden;
			}
			&.show{
				.iconfont{
					transform: rotate(180deg);
				}
			}
			.activeImg{
				border: 1px dashed #E9EBEC;
				image{
					width: 690rpx;
					height: 690rpx;
				}
			}
			.title{
				height: 88rpx;
				line-height: 88rpx;
				display: flex;
				.Default{
					font-size: 30rpx;
					margin-right: 8rpx;
					color: #1F90FF;
				}
				text{
					&:first-child{
						font-size: 30rpx;
						color: #303336;
						flex: 1;
					}
					&:last-child{
						color: #C9CBCF;
					}
				}
			}
			.imgList{
				display: flex;
				padding: 22rpx 0;
				view{
					position: relative;
					height: 165rpx;
					width: 165rpx;
					margin-right: 12rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					border: 1px dashed #E9EBEC;
					&.active{
						border: 3rpx solid #1F90FF;
						&::after{
							position: absolute;
							content: "";
							width: 0;
							height: 0;
							border: 16rpx solid;
							border-color: transparent transparent #1F90FF;
							top: -32rpx;
							left: 66rpx;
						}
					}
					image{
						width: 155rpx;
						height: 155rpx;
					}
					text{
						position: absolute;
						top: 5rpx;
						left: 5rpx;
						width: 104rpx;
						height: 42rpx;
						line-height: 42rpx;
						text-align: center;
						background: rgba(48, 51, 54, 0.6);
						border-radius: 0px 0px 32rpx 0px;
						font-size: 24rpx;
						color: white;
					}
					&:last-child{
						margin: 0;
					}
				}
			}
			.explain{
				padding: 20rpx 0;
				border-top: 1px solid #E9EBEC;
				.label{
					font-size: 28rpx;
					color: #303336;
				}
				.msg{
					color: #60656C;
					font-size: 26rpx;
					margin-top: 10rpx;
					line-height: 40rpx;
				}
			}
			.feedback{
				padding: 24rpx;
				background: #F4F5F6;
				view{
					color: #303336;
					font-size: 28rpx;
				}
				.textarea{
					width: 100%;
					height: 44rpx;
					margin-top: 16rpx;
					color: #60656C;
					font-size: 26rpx;
				}
			}
			.btnGroup{
				text-align: right;
				margin-top: 30rpx;
				text{
					box-sizing: border-box;
					display: inline-block;
					width: 176rpx;
					height: 72rpx;
					text-align: center;
					line-height: 72rpx;
					background: #FFFFFF;
					border-radius: 36rpx;
					border: 1px solid #93989F;
					font-size: 28rpx;
					color: #60656C;
					margin-left: 24rpx;
					&:last-child{
						background: #1F90FF;
						border: none;
						color: #FFFFFF;
					}
				}
			}
		}
		.popup{
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			background: rgba(0,0,0,0.6);
			.feedbackContainer{
				position: absolute;
				left: 0;
				bottom: 0;
				right: 0;
				width: 750rpx;
				height: 986rpx;
				background: #FFFFFF;
				border-radius: 24rpx 24rpx 0px 0px;
				padding: 0 30rpx;
				.title{
					height: 100rpx;
					line-height: 100rpx;
					position: relative;
					font-size: 32rpx;
					text-align: center;
					margin-bottom: 20rpx;
					.cancel{
						position: absolute;
						color: #303336;
						left: 0;
					}
					.submit{
						position: absolute;
						right: 0;
						color: #1F90FF;
					}
				}
				textarea{
					font-size: 30rpx;
				}
			}
			
		}
		// <view class="popup">
		// 	<view class="feedbackContainer">
		// 		<view>
		// 			<text class="cancel">取消</text>
		// 			<text class="submit">提交</text>
		// 		</view>
		// 		<textarea value="" placeholder="请输入您的意见" />
		// 	</view>
		// </view>
	}
	
</style>
