<template>
	<view class="reject-dialog" v-if="isShow">
		<view class="reject-dialog-content">
			<view class="reject-title">拒绝采纳建议<image @click="close" class="close" :src="imgBaseUrl+'/icon/ic_popup_close@2x.png'"></image></view>
			<view class="reject-dialog--body">
				<view class="reject-reason">
					<view class="reject-reason-title flex-between">
						<view>
							<text class="redFont">*</text>拒绝理由
						</view>
						<view>{{reason.length}}/500字</view>
					</view>
					<textarea v-model="reason" maxlength="500" placeholder="请输入拒绝理由" placeholder-style="color: #C9CBCF;font-size: 30rpx;" />
				</view>
				<view class="reject-imgs-box">
					<view class="reject-imgs-title">上传图片<text>(支持JPG、JPEG和PNG格式)</text></view>
					<view class="reject-imgs">
						<template v-if="complaintPostImageList.length > 0">
							<view class="reject-img" v-for="(item, index) in complaintPostImageList" :key="index">
								<image class="img" :src="item" mode="aspectFill" @click="previewImg(complaintPostImageList, index)"></image>
								<image @click="del(index)" class="del" :src="imgBaseUrl+'/icon/icon_delete_32.png'"></image>
							</view>
						</template>
						<view class="upload-btn" @click="takePhoto">
							<view><text class="iconfont iconicon_shaitu"></text></view>
							<view>上传</view>
						</view>
					</view>
				</view>
			</view>
			<view class="submit-btn"><view @click="submitHandle">确定</view></view>
		</view>
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
	export default{
		data(){
			return{
				isShow: false,
				reason: '',
				complaintPostImageList: [],
				imgBaseUrl: this.imgBaseUrl
			}
		},
		props:['complaintId'],
		methods:{
			takePhoto(){
				let that = this
				uni.chooseImage({
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera', 'album'], //拍照，从相册选择
					success: async (res) => {
						var imagePathArr = res.tempFilePaths
						for(let i=0;i<imagePathArr.length;i++){
							await this.uploadFileFun(imagePathArr[i])
						}
					}
				})
			},
			uploadFileFun(filePath){
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
							this.complaintPostImageList.push(resData.data)
							resolve()
						}
					});
				})
			},
			submitHandle(){
				if (!this.reason.trim()){
					uni.showToast({
						title:"请填写拒绝理由",
						icon: "none"
					})
					return
				}
				let param = {
					complaintPost: this.reason,
					complaintId: this.complaintId,
					isAccept: false,
					imageList: this.complaintPostImageList
				}
				this.$request(api.updateComplaintPost, param, 'POST', '', 1).then(res => {
					uni.showToast({
						title:"已拒绝",
						icon: "none"
					})
					this.reason = ''
					this.complaintPostImageList = []
					this.$emit('close', true)
				})
			},
			close(){
				this.$emit('close', false)
			},
			del(index){
				this.complaintPostImageList.splice(index, 1)
			},
			previewImg(urls, index){
				uni.previewImage({
					urls: urls,
					current: index
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '../style/complainDetail.scss'
</style>
