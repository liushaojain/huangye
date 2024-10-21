<template>
	<view class="complain-detail-page" :style="{paddingBottom: infoData.isAccept == '1' ? '96rpx' : '0'}">
		<view class="complain-detail-item">
			<view class="item-info flex-between">
				<view>投诉单号</view>
				<view>{{infoData.complaintNum}}</view>
			</view>
			<view class="item-info flex-between itemsCenter">
				<view>处理状态</view>
				<text class="item-status" :class="infoData.isAccept == '3' ? 'blue-text' : 'red-text'">{{statusFormat(infoData.isAccept)}}</text>
			</view>
			<view class="item-info flex-between">
				<view>投诉类型</view>
				<view>{{infoData.complaintType}}</view>
			</view>
			<view class="item-info flex-between">
				<view>投诉时间</view>
				<view>{{timeFormat(infoData.createtime)}}</view>
			</view>
		</view>
		<template v-if="infoData.complaintType == '交期投诉'">
			<view class="complaint-detail-title">投诉详情</view>
			<view class="complain-detail-item detail-content">{{infoData.complaintBody}}</view>
		</template>
		<template v-else>
			<view class="complaint-quality-message">投诉商品信息</view>
			<view :style="{marginBottom: infoData.sdbB2cMemberComplaintPostResList && infoData.sdbB2cMemberComplaintPostResList.length > 0 ? '0' : '24rpx'}">
				<view class="order-item" v-for="(item, index) in infoData.complaintPostProductResList" :key="index"  :class="item.isShowFeedbackMore ? '' : 'hideMore'">
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
						<view class="question-type">问题类型</view>
						<view class="question-item-box">
							<view class="question-item-mask"></view>
							<view v-for="(ite, ind) in item.questionType_" :key="ind" class="question-item">
								<label>
									<checkbox :value="ite.name" :checked="ite.checked" color="#1F90FF" style="transform: scale(0.7);"/>{{ite.name}}
								</label>
							</view>
						</view>
						<view class="question-textarea-text">{{item.content}}</view>
						<view class="flex-between complaint-info-num">
							<view>品质问题商品数量</view>
							<view style="font-size: 30rpx;color: #60656C;">{{item.questionQuantity}}</view>
						</view>
						<view class="complaint-info-content">
							<view class="flex-between complaint-info-number">
								<view>投诉详情</view>
								<view></view>
							</view>
							<view class="complaint-info-complaintBody">{{item.complaintBody}}</view>
						</view>
					</view>
					<view class="complaint-imgs-box" v-if="item.imgUrlList.length > 0">
						<view class="complaint-imgs-title">图片</view>
						<view class="complaint-imgs">
							<view class="complaint-img" v-for="(ele, i) in item.imgUrlList" :key="i">
								<image class="img" :src="ele" mode="aspectFill" @error="errorHandle(index, i)" @click="previewImg(item.imgUrlList, i)"></image>
							</view>
						</view>
					</view>
					<view class="show-btn" @click="showHandle(item)">
						<text>{{item.isShowFeedbackMore ? '收起' : '展开'}}<text class="iconfont" style="font-size: 24rpx;" :class="item.isShowFeedbackMore ? 'iconicon_arrow_up' : 'iconicon_arrow_down_white'"></text></text>
					</view>
				</view>
			</view>
		</template>
		<template v-if="infoData.sdbB2cMemberComplaintPostResList && infoData.sdbB2cMemberComplaintPostResList.length > 0">
			<view class="complaint-detail-title">交流记录</view>
			<view class="contact-logs complain-detail-item">
				<view class="log-item" v-for="(item, index) in infoData.sdbB2cMemberComplaintPostResList" :key="index">
					<view class="flex-between log-title">
						<view>{{item.complaintPostTitle}}</view>
						<view>{{timeFormat(item.createtime)}}</view>
					</view>
					<view class="log-content">{{item.complaintPost}}</view>
					<view class="log-imgs flex-start">
						<image :src="ite" v-for="(ite, ind) in item.complaintPostImageList" :key="ind" @click="previewImg(item.complaintPostImageList, ind)"></image>
					</view>
				</view>
			</view>
		</template>
		<view class="complaint-bottom" v-if="infoData.sdbB2cMemberComplaintPostResList && infoData.sdbB2cMemberComplaintPostResList.length > 0 && infoData.isAccept != '3' && infoData.isAccept != '2'">
			<view @click="showRejectDialog">拒绝</view>
			<view @click="makeSure">采纳</view>
		</view>
		<rejectTmpl ref="reject" @close="closeHandle" :complaintId="complaintId"></rejectTmpl>
	</view>
</template>

<script>
	import api from '@/store/order/index.js'
	import rejectTmpl from './components/reject.vue'
	export default{
		data(){
			return {
				complaintId: '',
				infoData:{},
				imgBaseUrl: this.imgBaseUrl
			}
		},
		components:{rejectTmpl},
		onLoad(option) {
			this.complaintId = option.complaintId
			this.getComplainDetailData()
		},
		onUnload() {
			let pages = getCurrentPages();
			let prevPage = pages[pages.length - 2]; //上一个页面
			prevPage.$vm.getOrderDetail()
		},
		methods:{
			getComplainDetailData(){
				this.$request(api.getComplaintPost, {complaintId:this.complaintId}, 'POST', '', 1).then(res => {
					this.infoData = res.data
					if(this.infoData.complaintType == '品质投诉') {
						this.infoData.complaintPostProductResList.forEach(item => {
							if (this.hasOther(item.questionType, item.complaintList)){
								let questionType = JSON.parse(item.questionType)
								let questionType_ = Object.assign([], questionType)
								questionType_.splice(questionType_.length-1, 1, '其他')
								let questionType__ = questionType_.map(ite => {
									return {
										name: ite,
										checked: true
									}
								})
								this.$set(item, 'questionType_', questionType__)
								this.$set(item, 'content', questionType[questionType.length-1])
							} else {
								let questionType__ = JSON.parse(item.questionType).map(ite => {
									return {
										name: ite,
										checked: true
									}
								})
								this.$set(item, 'questionType_', questionType__)
							}
						})
					}
				})
			},
			timeFormat(time){
				if (!time) return ''
				let date = new Date(time * 1000)
				return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0')
			},
			statusFormat(status){
				let str = ''
				if (status == '0' || status == '2') {
					str = '待处理'
				} else if (status == '1') {
					str = '待采纳'
				} else {
					str = '已采纳'
				}
				return str
			},
			showRejectDialog(){
				this.$refs.reject.isShow = true
			},
			makeSure(){
				uni.showModal({
					title:`确定采纳建议？`,
					success: (res) => {
						if (res.confirm) {
							this.$request(api.updateComplaintPost, {complaintId:this.complaintId, isAccept: true}, 'POST', '', 1).then(res => {
								this.getComplainDetailData()
							})
						}
					},
					fail: (err) => {
						
					}
				})
			},
			closeHandle(e){
				this.$refs.reject.isShow = false
				if (e){
					this.getComplainDetailData()
				}
			},
			previewImg(urls, index){
				uni.previewImage({
					urls: urls,
					current: index
				})
			},
			showHandle(item){
				this.$set(item, 'isShowFeedbackMore', !item.isShowFeedbackMore)
			},
			errorHandle(index, i){
				this.$set(this.infoData.complaintPostProductResList[index].imgUrlList, i, this.imgBaseUrl+"/icon/default4.png")
			},
			hasOther(str, arr) {
				let str_ = JSON.parse(str).join(',')
				let str__ = arr.join(',')
				return str__.indexOf(str_) == -1
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './style/complainDetail.scss';
	@import './style/complainQuality.scss';
</style>

<style lang="scss">
	page{background-color: #f5f5f5;}
	.order-item {
		.order-info-item, .complaint-goods, .complaint-info, .complaint-imgs-box{
			padding-left: 0 !important;
		}
		.complaint-goods{
			.pay-goods-item-content{
				width: 510rpx !important;
			}
		}
		.complaint-info-complaintBody{
			font-size: 30rpx;
			color: #60656C;
			line-height: 42rpx;
		}
		.question-type, .question-item{
			padding-left: 20rpx;
		}
		.question-item-box{
			position: relative;
			.question-item-mask{
				position: absolute;
				width: 100%;
				height: 100%;
				z-index: 10;
				left: 0;
				top: 0;
			}
		}
	}
</style>
