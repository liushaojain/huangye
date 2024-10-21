<template>
	<view class="sign-letter-page">
		<view class="sign-letter-info">
			<view class="sign-letter-info-item flex-between">
				<view>委托方</view>
				<view>{{infoData.entrustParty}}</view>
			</view>
			<view class="sign-letter-info-item flex-between">
				<view>制作方</view>
				<view>{{infoData.producer}}</view>
			</view>
			<view class="sign-letter-info-item flex-between">
				<view>设计师</view>
				<view>{{infoData.designUserName}}</view>
			</view>
			<view class="sign-letter-info-item flex-between">
				<view>产品名称</view>
				<view>{{infoData.productName}}</view>
			</view>
			<view class="sign-letter-info-item flex-between">
				<view>盒型</view>
				<view>{{infoData.catName}}</view>
			</view>
			<view class="sign-letter-info-item flex-between">
				<view>净含量</view>
				<view>{{infoData.innerWeight}}</view>
			</view>
			<view class="sign-letter-info-item flex-between">
				<view>订购量</view>
				<view>{{infoData.orderNum}}</view>
			</view>
			<view class="img-box">
				<view class="img-title">效果图</view>
				<image :src="infoData.fileUrl" mode="aspectFill" @error="errorHandle"></image>
			</view>
		</view>
		<view class="path-text">平台标准工艺路线</view>
		<view class="path-list">
			<spacificationTmpl :infoData="infoData" ></spacificationTmpl>
		</view>
		<view class="questions-list">
			<view class="questions-title redFont">
				<text class="iconfont iconic_warning_line"></text>请务必参照标准认真审核图文信息
			</view>
			<view class="questions-item" v-for="(item, index) in questions" :key="index">
				<view class="question-title"><text class="redFont">*</text>{{index + 1}}.{{item.title}}</view>
				<view class="question-option">
					<label @click="radioChange(index, true)">
						<radio value="1" :checked="item.value === 1" color="#1F90FF" style="transform: scale(0.7);"/><text>是</text>
					</label>
					<label @click="radioChange(index, false)">
						<radio value="0" :checked="item.value === 0" color="#1F90FF" style="transform: scale(0.7);"/><text>否</text>
					</label>
				</view>
			</view>
			<view class="questions-item" v-if="isShow">
				<view class="question-title">委托方最终确认</view>
				<view class="question-option">
					<label @click="auditChange(true)">
						<radio value="1" :checked="confirmValue === 1" color="#1F90FF" style="transform: scale(0.7);" :disabled="cancelNum > 0" /><text>审阅无误并确认</text>
					</label>
					<label @click="auditChange(false)">
						<radio value="0" :checked="confirmValue === 0" color="#1F90FF" style="transform: scale(0.7);" :disabled="rightNum == 4"/><text>驳回修改</text>
					</label>
				</view>
			</view>
			<textarea v-if="isShow" v-model="content" :disabled="rightNum == 4" placeholder="请输入修改说明" placeholder-style="color: #93989F;line-height: 44rpx;" />
		</view>
		<view class="letter-explain">
			<view>说明</view>
			<view>此函是在设计定稿后，交接生产之前作为印刷最终凭证，由我方发送给委托方（文图信息与工艺说明）进行审核，请务必认真负责，确认无误后签字，并回传给我方！签字后，该订单才会正式交接到生产环境，如因委托方的原因，导致生产报废，或生产的额外费用，我方不承担相关责任！</view>
			<view>提示</view>
			<view>产品六面图是基于设计师与委托方充分沟通后，输出的待确认文件，签字后，如有文字信息等需调整，仍可沟通修改！</view>
		</view>
		<view class="submit-btn" @click="submit">提交</view>
	</view>
</template>

<script>
	import spacificationTmpl from './components/spacification.vue'
	import api from '@/store/order/index.js'
	export default{
		data(){
			return{
				infoData: {},
				orderId: '',
				questions:[
					{
						title: '产品名称是否正确？',
						value: ''
					},
					{
						title: '净含量是否正确？',
						value: ''
					},
					{
						title: '配料表信息及其他图文信息是否正确？',
						value: ''
					},
					{
						title: '标注工艺是否认可？',
						value: ''
					}
				],
				confirmValue: '',
				content: '',
				fromPage: '',
				imgBaseUrl: this.imgBaseUrl
			}
		},
		onLoad(option) {
			this.orderId = option.orderId
			this.fromPage = option.fromPage
			this.getLetterInfo()
		},
		components:{spacificationTmpl},
		computed:{
			rightNum(){
				return this.questions.filter(item => item.value === 1).length
			},
			cancelNum(){
				return this.questions.filter(item => item.value === 0).length
			},
			isShow(){
				return this.questions.filter(item => item.value !== '').length == 4
			}
		},
		methods:{
			getLetterInfo(){
				this.$request(api.letterInfo, {orderId: this.orderId}, 'GET', '', 1).then(res => {
					this.infoData = res.data
				})
			},
			errorHandle(){
				this.infoData.fileUrl = this.imgBaseUrl+"/icon/default4.png"
			},
			radioChange(index, flag){
				this.$set(this.questions[index], 'value', flag ? 1 : 0)
				if ((!flag && this.confirmValue) || (flag && this.confirmValue)) {
					this.confirmValue = ''
				}
			},
			auditChange(flag){
				if (!flag && this.rightNum == 4) return
				if (flag && this.cancelNum > 0) return
				this.confirmValue = flag ? 1 : 0
			},
			submit(){
				let len = this.questions.filter(item => item.value === '').length
				if (len > 0) {
					uni.showToast({
						title:'请勾选确认信息',
						icon: 'none'
					})
					return
				}
				if (this.confirmValue === ''){
					uni.showToast({
						title:'请勾选委托方最终确认',
						icon: 'none'
					})
					return
				}
				let param = {
					nameCorrect: this.questions[0].value,
					weightCorrect: this.questions[1].value,
					mixedCorrect: this.questions[2].value,
					techCorrect: this.questions[3].value,
					orderId: this.orderId,
					confirmReject: this.confirmValue
				}
				if (this.cancelNum) {
					param.reviseRemarks = this.content
				}
				this.$request(api.confirmReject, param, 'POST', '', 1).then(res => {
					if (res.code == 200) {
						let pages = getCurrentPages();
						let prevPage = pages[pages.length - 2]; //上一个页面
						let prevPrevPage = pages[pages.length - 3]; //上上一个页面
						if (this.fromPage == 'list') {
							prevPage.$vm.onRefrash();
						} else {
							prevPrevPage.$vm.onRefrash();
							this.$set(prevPage.$vm.orderDetail, 'designToPrint', this.confirmValue == 1 ? 4 : 2)
						}
						uni.navigateBack({
							delta: 1
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './style/signLetter.scss'
</style>
