 <template>
	 <view class="container">
		 <view class="header">
		 	<image class="img" :src="baseImg+'Maskgroupwhy@2x.png'" mode=""></image>
		 </view>
	 	<view class="content">
			<view class="title">实名认证</view>
			<view class="txt">
				荒野是一个真人社交平台，我们需要确保你的真实信息，实名后匹配对象将会更精准，实名配对成功率提高50%
			</view>
			<view class="mt10">
				<u--form labelPosition="top" :model="formData" :rules="rules" ref="forms" label-width="80">
					<u-form-item label="姓名" prop="name" ref="item1" border-bottom>
						<u--input placeholder="请输入" v-model="formData.name" border="none"></u--input>
					</u-form-item>
					<u-form-item label="身份证号码" prop="name" ref="item1" border-bottom>
						<u--input placeholder="请输入" v-model="formData.card" border="none"></u--input>
					</u-form-item>
				</u--form>	
			</view>
		</view>
		<view class="footer">
			<view class="btnSubmit">
				立即认证
			</view>
			<view class="text1">
				百分百隐私安全
			</view>
			<view class="text2">
				认证信息仅用于官方审核，无需担心信息泄露
			</view>
		</view>
	 </view>
</template>

<script>
	export default {
		data(){
			return {
				baseImg: this.imgBaseUrl,
				formData:{
					name: '',
					card: ''
				},
				rules:{
					name: [],
					card: []
				}
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
		.txt{
			color: #999999;
			margin-top: 12rpx;
			line-height: 36rpx;
		}
	}
	
	.footer{
		// margin-top: 232rpx;
		padding: 48rpx;
		text-align: center;
		
		position: fixed;
		height: 302rpx;
		left: 0;
		right: 0;
		bottom: 0;
		.btnSubmit{
			width: 654rpx;
			height: 88rpx;
			background: linear-gradient( 271deg, #F5496D 0%, #FF7592 100%);
			border-radius: 200rpx;
			color: white;
			font-size: 36rpx;
			line-height: 88rpx;
			text-align: center;
			margin-bottom: 48rpx;
		}
		.text1{
			font-size: 28rpx;
			color: #999999;
		}
		.text2{
			font-size: 24rpx;
			color: #999999;
		}
	}
</style>