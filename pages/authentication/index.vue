 <template>
	 <view class="container">
		 <view class="header">
		 	<image class="img" :src="baseImg+'Maskgroupwhy@2x.png'" mode=""></image>
		 </view>
	 	<view class="content">
			<view class="item">
				<view class="title">基本认证信息</view>
				<view class="childItem">
					<view class="itemT">
						<view class="flex itemsCenter">
							<image class="icon" :src="baseImg+'authentication(3).png'" mode=""></image>
							实名认证	
						</view>
						<view class="status" @click="goPage()">已认证</view>
					</view>
					<view class="itemContent">荒野是一个真人社交平台，我们需要确保你的真实信息，实名后匹配对象将会更精准</view>
				</view>
				<view class="childItem">
					<view class="itemT">
						<view class="flex itemsCenter">
							<image class="icon" :src="baseImg+'authentication(4).png'" mode=""></image>
							离婚认证	
						</view>
						<view class="status">已认证</view>
					</view>
					<view class="itemContent">荒野是专注离异群体的社交平台，进行婚姻认证将极大提高你的脱单效率</view>
				</view>
			</view>
	 		<view class="item more">
	 			<view class="title">更多认证信息</view>
	 			<view class="childItem">
	 				<view class="itemT">
	 					<view class="flex itemsCenter">
	 						<image class="icon" :src="baseImg+'authentication(5).png'" mode=""></image>
	 						学历认证	
	 					</view>
	 					<view class="status">已认证</view>
	 				</view>
	 				<view class="itemContent">完成学历认证可以增加你的信誉，匹配对象将会更精准</view>
	 			</view>
	 			<view class="childItem">
	 				<view class="itemT">
	 					<view class="flex itemsCenter">
	 						<image class="icon" :src="baseImg+'authentication(1).png'" mode=""></image>
	 						房子认证	
	 					</view>
	 					<view class="status">已认证</view>
	 				</view>
	 				<view class="itemContent">工作认证可以增加你的信誉，匹配对象将会更精准</view>
	 			</view>
				<view class="childItem">
					<view class="itemT">
						<view class="flex itemsCenter">
							<image class="icon" :src="baseImg+'authentication(2).png'" mode=""></image>
							车辆认证	
						</view>
						<view class="status status1">已认证</view>
					</view>
					<view class="itemContent">工作认证可以增加你的信誉，匹配对象将会更精准</view>
				</view>
	 		</view>
	 	</view>
	 </view>
</template>

<script>
	export default {
		data(){
			return {
				baseImg: this.imgBaseUrl
			}
		},
		methods:{
			goPage(){
				
			}
		},
		onShow() {
			
		}
	}
</script>

<style lang="scss" scoped> 
	.header{
		.img{
			height: 632rpx;
			width: 100%;
		}
	}
	.content{
		padding: 48rpx;
		background: white;
		position: relative;
		top: -100rpx;
		border-radius: 36rpx;
		.title{
			font-size: 32rpx;
			font-weight: bold;
		}
		.childItem{
			width: 654rpx;
			height: 188rpx;
			padding: 28rpx;
			background: rgba(247,80,115,0.06);
			border-radius: 12rpx;
			margin-top: 28rpx;
		}
		.itemT{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.icon{
				height: 48rpx;
				width: 48rpx;
				margin-right: 14rpx;
			}
			.status{
				width: 152rpx;
				height: 46rpx;
				background: #F75073;
				border-radius: 23rpx;
				color: white;
				text-align: center;
				line-height: 46rpx;
				&.status1{
					background: #FFA85B;
				}
			}
		}
		.itemContent{
			margin-top: 24rpx;
		}
	}
	.more{
		margin-top: 48rpx;
	}
	
</style>