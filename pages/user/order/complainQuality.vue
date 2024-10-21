<template>
	<view class="complain-quality-page">
		<view>
			<view class="order-item" v-for="(item, index) in infoData" :key="index"  :class="item.isShowFeedbackMore ? '' : 'hideMore'">
				<view class="item-radio">
					<label @click="changeItemSelect(index)">
						<radio :value="item.deliveryId" :checked="item.checked" color="#1F90FF" style="transform: scale(0.7);"/>是否投诉
					</label>
				</view>
				<view class="order-info-item flex-start">
					<view>发货单号：</view>
					<view>{{item.deliveryId}}</view>
				</view>
				<view class="order-info-item flex-start">
					<view>发货数量：</view>
					<view>{{item.deliveryCount}}</view>
				</view>
				<view class="order-info-item flex-start" v-if="item.complaintNumber">
					<view>投诉数量：</view>
					<view>{{item.complaintNumber}}</view>
				</view>
				<view class="complaint-goods">
					<view class="complaint-title">发货商品</view>
					<view class="complaint-goods-item" v-for="(ite, ind) in item.qualityComplaintProductResList" :key="ind">
						<view class="pay-goods-main flex-between">
							<image :src="ite.imageDefaultId" mode="aspectFill" @error="errorHandle(index, ind)"></image>
							<view class="pay-goods-item-content flex-start">
								<view class="pay-goods-item-title">
									<view class="pay-goods-item-tag" v-if="ite.itemType != 'product'">{{ite.itemType == 'netto' ? '内托' : '配件'}}</view>
									<text class="first-title">{{ite.productionName ? ite.productionName : ite.name}}</text>
									<text class="last-title" v-if="ite.productionName && ite.name">(商品原名称:{{ite.name}})</text>
								</view>
								<view class="pay-goods-num"><text>下单数量：</text><text>{{ite.number}}</text></view>
								<view class="pay-goods-num"><text>发货数量：</text><text>{{ite.deliveryNumber}}</text></view>
							</view>
						</view>
					</view>
				</view>
				<view class="complaint-info">
					<view class="complaint-info-title">投诉内容</view>
					<view class="question-type"><text class="redFont">*</text>问题类型</view>
					<view v-for="(ite, ind) in item.complaintListCopy" :key="ind" class="question-item">
						<label @click="changeQuestionSelect(index, ind)">
							<checkbox :value="ite.name" :checked="ite.checked" color="#1F90FF" style="transform: scale(0.7);"/>{{ite.name}}
						</label>
					</view>
					<textarea v-if="item.otherChecked" class="question-textarea" v-model="item.content" maxlength="20" placeholder="请输入其他问题" placeholder-style="fonr-size: 30rpx;color: #C9CBCF;" />
					<view class="flex-between complaint-info-num">
						<view><text class="redFont">*</text>品质问题商品数量</view>
						<input type="number" @blur="questionQuantityBlur($event, index)" placeholder="请输入" v-model="item.questionQuantity" style="text-align: right;">
					</view>
					<view class="complaint-info-content">
						<view class="flex-between complaint-info-number">
							<view><text class="redFont">*</text>投诉详情</view>
							<view>{{item.complaintBody.length > 500 ? 500 : item.complaintBody.length}}/500字</view>
						</view>
						<textarea class="complaint-textarea" v-model="item.complaintBody" placeholder="请输入投诉内容" placeholder-style="fonr-size: 30rpx;color: #C9CBCF;"></textarea>
					</view>
				</view>
				<view class="complaint-imgs-box">
					<view class="complaint-imgs-title">上传图片<text>(支持JPG、JPEG和PNG格式)</text></view>
					<view class="complaint-imgs">
						<template v-if="item.imageList.length > 0">
							<view class="complaint-img" v-for="(ele, i) in item.imageList" :key="i">
								<image class="img" :src="ele" mode="aspectFill" @click="previewImg(item.imageList, i)"></image>
								<image @click="del(index, i)" class="del" :src="imgBaseUrl+'/icon/icon_delete_32.png'"></image>
							</view>
						</template>
						<view class="upload-btn" @click="takePhoto(index)">
							<view><text class="iconfont iconicon_shaitu"></text></view>
							<view>上传</view>
						</view>
					</view>
				</view>
				<view class="show-btn" @click="showHandle(item)">
					<text>{{item.isShowFeedbackMore ? '收起' : '展开'}}<text class="iconfont" style="font-size: 24rpx;" :class="item.isShowFeedbackMore ? 'iconicon_arrow_up' : 'iconicon_arrow_down_white'"></text></text>
				</view>
			</view>
		</view>
		<view class="submit-btn"><view @click="submit">提交</view></view>
		<complainSuccess v-if="isShow"></complainSuccess>
	</view>
</template>

<script>
	import api from '@/store/order/index.js'
	import {
		userStore
	} from "@/store/account/userInfo.js"
	import {
		basehost
	} from "@/utils/util.js"
	import complainSuccess from './components/complainSuccess.vue'
	export default{
		data(){
			return {
				orderId: '',
				infoData: [],
				isShow: false,
				imgBaseUrl: this.imgBaseUrl
			}
		},
		onLoad(option) {
			this.orderId = option.orderId
			this.getQualityInfo()
		},
		components:{complainSuccess},
		methods:{
			getQualityInfo(){
				this.$request(api.qualityComplaintReady, {orderId: this.orderId}, 'POST', '', 1).then(res => {
					this.infoData = res.data.data
					this.infoData.forEach(item => {
						this.$set(item, 'isShowFeedbackMore', false)
						this.$set(item, 'imageList', [])
						this.$set(item, 'complaintBody', '')
						this.$set(item, 'questionQuantity', '')
						this.$set(item, 'questionType', '')
						this.$set(item, 'content', '')
						this.$set(item, 'otherChecked', false)
						item.complaintListCopy = item.complaintList.map((ite, ind) => {
							return {
								name: ite,
								checked: false
							}
						})
						item.complaintListCopy.push({
							name: '其他',
							checked: false
						})
					})
				})
			},
			takePhoto(index){
				let that = this
				uni.chooseImage({
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //拍照，从相册选择
					success: async (res) => {
						var imagePathArr = res.tempFilePaths
						for(let i=0;i<imagePathArr.length;i++){
							await this.uploadFileFun(imagePathArr[i], index)
						}
					}
				})
			},
			uploadFileFun(filePath, index){
				return new Promise(resolve => {
					uni.uploadFile({
						url: `${basehost}upload/put`,
						filePath: filePath,
						name: 'file',
						header: {
							'Authorization': 'Bearer ' + userStore.state.token
						},
						success: (res1) => {
							let resData = JSON.parse(res1.data)
							this.infoData[index].imageList.push(resData.data)
							resolve()
						}
					});
				})
			},
			showHandle(item){
				this.$set(item, 'isShowFeedbackMore', !item.isShowFeedbackMore)
			},
			errorHandle(index, ind){
				this.$set(this.infoData[index].qualityComplaintProductResList[ind], 'imageUrl', this.imgBaseUrl+"/icon/default4.png")
			},
			errorPartHandle(index, ind, i){
				this.$set(this.infoData[index].qualityComplaintProductResList[ind].relevanceParts[i], 'imageUrl', this.imgBaseUrl+"/icon/default4.png")
			},
			changeQuestionSelect(index, ind){
				let checked = this.infoData[index].complaintListCopy[ind].checked ? false : true
				this.$set(this.infoData[index].complaintListCopy[ind], 'checked', checked)
				if (ind == 3) {
					this.$set(this.infoData[index], 'otherChecked', this.infoData[index].complaintListCopy[ind].checked)
				}
			},
			del(index, i) {
				this.infoData[index].imageList.splice(i, 1)
			},
			previewImg(urls, index){
				uni.previewImage({
					urls: urls,
					current: index
				})
			},
			changeItemSelect(index){
				this.$set(this.infoData[index], 'checked', this.infoData[index].checked ? false : true)
			},
			questionQuantityBlur(e, index) {
				if (parseInt(e.target.value) < 0) {
					uni.showToast({
						title:'数量必须大于0',
						icon:'none'
					})
					this.infoData[index].questionQuantity = ''
				}
				if (parseInt(e.target.value) > this.infoData[index].deliveryCount - parseInt(this.infoData[index].complaintNumber)) {
					uni.showToast({
						title:'数量不能大于可投诉数量',
						icon:'none'
					})
					this.infoData[index].questionQuantity = this.infoData[index].deliveryCount - parseInt(this.infoData[index].complaintNumber)
				}
			},
			submit(){
				let checkItems = this.infoData.filter(item => item.checked)
				if (checkItems.length == 0) {
					uni.showToast({
						title:'请选择投诉的发货单号',
						icon:'none'
					})
					return
				}
				let flag = true
				checkItems.forEach(item => {
					let questionTypeChecked = item.complaintListCopy.filter(ite => ite.checked)
					if (!item.content.trim() && item.complaintListCopy.find(ite => ite.name == '其他').checked || questionTypeChecked.length == 0){
						flag = false
						uni.showToast({
							title:'请选择问题类型',
							icon:'none'
						})
					} else {
						let questionTypeChecked_ = questionTypeChecked.map(ite => {
							return ite.name
						})
						let otherIndex = questionTypeChecked_.indexOf('其他')
						if (otherIndex > -1) {
							questionTypeChecked_.splice(otherIndex, 1, item.content)
						}
						item.questionTypeChecked_ = questionTypeChecked_
					}
					if (!item.complaintBody.trim()){
						flag = false
						uni.showToast({
							title:'请输入投诉详情',
							icon:'none'
						})
					}
					if (!item.questionQuantity) {
						flag = false
						uni.showToast({
							title:'请输入数量',
							icon:'none'
						})
					}
				})
				if (!flag) return
				let param = {
					orderId: this.orderId,
					qualityComplaintReqList: checkItems.map(ite => {
						return {
							complaintBody: ite.complaintBody,
							deliveryId: ite.deliveryId,
							imageList: ite.imageList,
							questionQuantity: ite.questionQuantity,
							questionType: JSON.stringify(ite.questionTypeChecked_),
							isComplaintNum:ite.deliveryCount - parseInt(ite.complaintNumber)
						}
					})
				}
				this.$request(api.insertQualityComplaint, param, 'POST', '', 1).then(res => {
					this.isShow = true
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './style/complainQuality.scss'
</style>
<style lang="scss">
	page{background-color: #f5f5f5;}
</style>
