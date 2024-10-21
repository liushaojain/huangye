<template>
	<view class="order-evaluate">
		<view class="evaluate-main">
			<view class="order-goods flex-between">
				<image :src="imgBaseUrl+'/icon/noproductList.png'" mode="aspectFill"></image>
				<view class="order-goods-info flex-between">
					<view class="order-goods-item-title">
						<text class="first-title">GQ-009枸杞书型盒</text>
						<text class="last-title">（库存商品，有开启规格）</text>
					</view>
					<view class="order-goods-item-tag">
						<view>套餐1</view>
					</view>
				</view>
			</view>
			<template v-if="!isEvaluate">
				<view class="evaluate-content">
					<view class="evaluate-textarea">
						<view class="placeholder" v-show="isShow"><text class="iconfont iconicon_pinglun_input"></text>请输入您的评价</view>
						<textarea class="textarea" :value="evaluateContent.content" @input="handleInput" @focus="handleFocus" @blur="handleBlur" />
					</view>
					<view class="image-upload">
						<view class="upload-multiple">
							<view class="uni-uploader">
								<view class="uni-uploader-body">
									<view class="uni-uploader__files">
										<block v-for="(image,index) in evaluateContent.images" :key="index">
											<view class="uni-uploader__file">
												<icon type="cancel" size="18" class="del-icon" @click="delImage(index)"/>
												<view class="uni-uploader__file_item" @tap="showPreviewImage(index)" style="position: relative;">
													<image class="uni-uploader__img" :src="image" :data-src="image"></image>
												</view>
											</view>
										</block>
										<view class="uni-uploader__input-box" v-show="evaluateContent.images.length < 9">
											<view class="uni-uploader__input-box-icon alignCenter"><text class="iconfont iconicon_shaitu"></text></view>
											<view class="uni-uploader__input-box-text alignCenter">晒图</view>
											<view class="uni-uploader__input" @tap="takePhoto"></view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view></view>
			</template>
			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				isEvaluate:false,
				isShow: true,
				evaluateContent:{
					content:'',
					images:[]
				},
				imgBaseUrl: this.imgBaseUrl
			}
		},
		methods:{
			handleBlur(){
				this.isShow = this.evaluateContent.content ? false :true
			},
			handleInput(e){
				this.evaluateContent.content = e.detail.value
				this.isShow = this.evaluateContent.content ? false :true
			}
		}
	}
</script>

<style lang="scss">
	@import './style/evaluate.scss'
</style>
<style>
	page{background-color: #f5f5f5;}
</style>

