<template>
	<view class="container">
		<!-- 未匹配到用户信息 -->
		<view class="info">
			<image :src="imgBaseUrl+'/icon/icon_info_tips@2x.png'" mode=""></image>
			<view>如果您是老用户，建议您绑定原有账号，同步个人订单信息</view>
		</view>

		<view class="btnGroup" v-if="type==1">
			<button type="default" @click="bindType(3)">绑定原账号</button>
			<button type="default" @click="wxNewUser">我是新用户</button>
		</view>

		<!-- 匹配到用户信息 短信绑定 -->
		<view class="form" v-if="type==2">
			<view>
				<text>用户名</text>
				<input type="text" v-model="userInfo.userName" disabled="true">
			</view>
			<view>
				<text>手机号</text>
				<input type="text" v-model="userInfo.phone" disabled="true">
			</view>
			<view>
				<text>公司名称</text>
				<input type="text" v-model="userInfo.companyName" disabled="true">
			</view>
			<view class="lastIpt">
				<input type="text" v-model="smsCode">
				<text class="clickGet" placeholder="请输入手机验证码" :class="{'MsmCode':isMsmCode}" @click="getMsmCode(1)">{{MSMtext}}</text>
			</view>
			<button type="default" class="binding" @click="bindUser">绑定</button>
		</view>

		<!-- 未匹配到用户信息 短信验证码绑定 -->
		<view class="form" v-if="type==3">
			<view>
				<input type="number" maxlength="11" v-model="newmsgFrom.phone" placeholder="请输入手机号" class="tLeft">
			</view>
			<view class="lastIpt">
				<input type="text" v-model="newmsgFrom.msmCode" placeholder="请输入手机验证码">
				<text class="clickGet" :class="{'MsmCode':isMsmCode}" @click="getMsmCode(2)">{{MSMtext}}</text>
			</view>
			<button type="default" class="binding" @click="newMsmBind">绑定</button>
			<view class="userBind" @click="bindType(4)">账号密码绑定</view>
		</view>

		<!-- 未匹配到用户信息 账号密码绑定 -->
		<view class="form" v-if="type==4">
			<view>
				<input type="text" v-model="newaccountFrom.account" placeholder="请输入账号" class="tLeft">
			</view>
			<view class="lastIpt">
				<input :type="pasType?'password':'text'" placeholder="请输密码" v-model="newaccountFrom.passeWrod">
				<text class="iconfont icon_password_off" v-if="pasType" @click="switchPas()">&#xeab0;</text>
				<text class="iconfont icon_password_on" v-if="!pasType" @click="switchPas()">&#xeab2;</text>
			</view>
			<view class="lastIpt" v-if="resCode==301">
				<input type="text" placeholder="请输入图片验证码"  v-model="newaccountFrom.code">
				<image class="baseImg" :src="imageData" @click="createVerifycode" mode="aspectFit"></image>
			</view>
			<button type="default" class="binding" @click="wxBindForUsername">绑定</button>
			<view class="userBind msg" @click="bindType(3)">短信验证绑定</view>
		</view>
		<!--   -->
		<!-- <popUp :text="text" type="succeed"></popUp> -->
	</view>

</template>

<script>
	import api from "@/store/account/index.js"
	import popUp from "@/components/popUp/index.vue"
	import { userStore } from "@/store/account/userInfo.js"
	import commons from '@/utils/common.js'
	import homeApi from "@/store/home/index.js"	
	export default {
		data() {
			return {
				type: 1,
				pasType: true,
				text: "绑定成功",
				userInfo: "",
				MSMtext: "点击获取",
				isMsmCode: false,
				code: "",
				smsCode: "",
				openid: "",
				unionid:"",
				newmsgFrom: {// 短信绑定
					phone: "",
					msmCode: "",
				},
				newaccountFrom:{// 账户绑定
					account:"",
					passeWrod:"",
					code:"",
					verifiyCodeKey:""
				},
				imageData: "",
				back:"",
				phoneNumber:"",
				resCode:"",
				imgBaseUrl: this.imgBaseUrl
			}
		},
		onLoad(e) {
			this.back=e.back;
			if(e.phoneNumber){
				this.phoneNumber=e.phoneNumber
			}
			// this.createVerifycode()
			if (userStore.state.userInfo) {
				this.userInfo = userStore.state.userInfo;
				this.userInfo.companyName=this.userInfo.companyName||"无"
				if (userStore.state.userInfo.haveUser == "true") {
					this.type = 2;
				} else if (userStore.state.userInfo.haveUser == "false") {
					this.type = 1;
				}
			}
			let that = this;
			uni.login({
				provider: 'weixin',
				success: function(res) {
					that.code = res.code
					that.$request(api.wxopenid, {
						code: res.code
					}).then(function(res) {
						that.openid = res.data.openid;
						that.unionid = res.data.unionid;
					})
				}
			});
		},
		methods: {
			createVerifycode() {
				let that = this;
				this.$request(api.createVerifycode, {
					phoneNumber: that.userInfo.phone,
					type: 5
				}, "GET").then((res) => {
					that.newaccountFrom.verifiyCodeKey=res.data.verifyKey;
					that.imageData = "data:image/jpg;base64," + res.data.imageData;
				})
			},
			bindType(type) {
				this.type = type;
			},
			switchPas() {
				this.pasType = !this.pasType;
			},
			// 获取验证码
			getMsmCode(type) {
				if (this.MSMtext != "点击获取") {
					return false;
				}
				let phone = "";
				if (type == 2) {
					phone = this.newmsgFrom.phone;
					if (this.newmsgFrom.phone == "") {
						uni.showToast({
							title: '请输入手机号码',
							icon: "none",
							duration: 2000
						});
						return false
					} else if (!commons.checkPhone(this.newmsgFrom.phone)) {
						uni.showToast({
							title: '手机号码格式错误',
							icon: "none",
							duration: 2000
						});
						return false
					}
				} else {
					phone = this.userInfo.phone
				}
				let nums = 60;
				let that = this;
				this.$request(api.sendsms, {
					phoneNum: phone,
					type: 5,
				}).then(function(res) {
					that.isMsmCode = true;
					that.MSMtext = nums + '后重发'
					let msmCode = setInterval(() => {
						that.MSMtext = (nums--) + '后重发';
						if (nums == 0) {
							that.isMsmCode = false;
							that.MSMtext = "点击获取";
							clearInterval(msmCode)
						}
					}, 1000)
				})
			},
			// 微信未获取到账户信息的老用户绑定
			bindUser() {
				if (this.smsCode == "") {
					uni.showToast({
						title: '验证码不能为空',
						icon: "none",
						duration: 2000
					});
					return false
				}
				let that = this;
				this.$request(api.wxBindForPhone, {
					memberId: that.userInfo.memberId,
					phoneNumber: that.userInfo.phone,
					smsCode: that.smsCode,
					openId: that.openid,
					unionid: that.unionid
				},"POST","",2).then((res) => {
					if(res.code==200){						
						userStore.commit('setToken', res.data);	
						that.goHome()
					}
				})
			},
			// 新用户短信绑定
			newMsmBind() {
				if (this.newmsgFrom.phone == "") {
					uni.showToast({
						title: '手机号码不能为空',
						icon: "none",
						duration: 2000
					});
				} else if (this.newmsgFrom.msmCode == "") {
					uni.showToast({
						title: '验证码不能为空',
						icon: "none",
						duration: 2000
					});
				} else if (!commons.checkPhone(this.newmsgFrom.phone)) {
					uni.showToast({
						title: '手机号码格式错误',
						icon: "none",
						duration: 2000
					});
				} else {
					let that = this;
					this.$request(api.wxBindForPhone, {
						phoneNumber: that.newmsgFrom.phone,
						smsCode: that.newmsgFrom.msmCode,
						openId: that.openid,
						unionid:that.unionid
					},"POST","",2).then((res) => {
						if(res.code==200){
							userStore.commit('setToken', res.data);
							that.goHome()
						}
					})
				}
			},
			wxNewUser() {
				let that = this;
				this.$request(api.wxNewUser, {
					openId: that.openid,
					unionid:that.unionid,
					phoneNumber: that.phoneNumber
				},"POST","",2).then((res) => {
					if(res.code==200){
						userStore.commit('setToken', res.data);
						that.goHome()						
					}
				})
			},
			// 账号密码绑定
			wxBindForUsername(){
				let that=this;
				if(that.newaccountFrom.account==""){
					uni.showToast({
						title: '账号不能为空',
						icon: "none",
						duration: 2000
					});
					return false
				}else if(that.newaccountFrom.passeWrod==""){
					uni.showToast({
						title: '密码不能为空',
						icon: "none",
						duration: 2000
					});
					return false
				}
				if(that.newaccountFrom.code==""&&that.code==301){
					uni.showToast({
						title: '验证码不能为空',
						icon: "none",
						duration: 2000
					});
					return false
				}
				let postData="";
				if(that.resCode==301){
					postData={
						unionid: that.unionid,
						openId: that.openid,
						userName:that.newaccountFrom.account,
						passWord: that.newaccountFrom.passeWrod,
						verifiyCode: that.newaccountFrom.code,
						verifiyCodeKey: that.newaccountFrom.verifiyCodeKey
					}
				}else{
					postData={
						unionid: that.unionid,
						openId: that.openid,
						userName:that.newaccountFrom.account,
						passWord: that.newaccountFrom.passeWrod,
					}
				}
				
				
				this.$request(api.wxBindForUsername,postData,"POST","",2).then((res) => {
					if(res.code==200){
						userStore.commit('setToken',res.data);
						that.goHome()
					}else{
						if(res.code==301){
							this.resCode=301
							this.createVerifycode()
						}
					}
				})
			},
			goHome(){
				this.$request(api.userInfo,"","GET","",2).then(e=>{
					let userInfo = userStore.state.userInfo;
					if(userInfo.brandId){						
						e.data.brandName=userInfo.brandName;
						e.data.brandId=userInfo.brandId;
					}
					// userInfo.newPhone=e.data.loginAccount;
					userStore.commit('setUserInfo', e.data);
					if(this.back){
						uni.navigateBack({
							delta:2
						})
						return false
					}
					uni.switchTab({
						url: "/pages/home/index"
					})
				})
			},
			updBrand(){
				let that = this;
				if(userStore.state.userInfo){
					if(userStore.state.userInfo.brandId){
						this.$request(homeApi.updBrandId,{brandId:userStore.state.userInfo.brandId}).then(res=>{
							that.goHome()
						})						
					}
				}else{
					that.goHome()
				}				
			}
		},
		components: {
			popUp
		}
	}
</script>

<style lang="scss">
	page {
		.tLeft {
			text-align: left !important;
		}

		background: white;

		.info {
			width: 600rpx;
			margin: auto;
			text-align: center;

			image {
				width: 128rpx;
				height: 128rpx;
				display: block;
				padding-top: 100rpx;
				margin: auto;
			}

			view {
				margin-top: 40rpx;
				color: #303336;
				font-size: 32rpx;
			}
		}

		.form {
			margin-top: 40rpx;

			view {
				height: 88rpx;
				line-height: 88rpx;
				display: flex;
				border-bottom: 2rpx solid #E9EBEC;
				width: 630rpx;
				margin: auto;

				text {
					font-size: 30rpx;
					color: #60656C;
				}

				&.lastIpt {
					input {
						text-align: left;
					}
					text{						
						padding: 0 40rpx;
					}
				}
				.baseImg{
					height: 88rpx;
					width: 176rpx;
				}
				input {
					flex: 1;
					text-align: right;
					height: 88rpx;
					font-size: 30rpx;
				}

				.clickGet {
					border: none !important;
					background: white;
					color: #F9353B;
					font-size: 30rpx;
					box-sizing: border-box;

					&.MsmCode {
						color: #93989F;
					}
				}
			}

			.binding {
				width: 630rpx;
				height: 88rpx;
				background: #F9353B;
				border-radius: 44rpx;
				font-size: 32rpx;
				color: white;
				margin-top: 40rpx;
			}
		}

		.btnGroup {
			button {
				width: 630rpx;
				height: 88rpx;
				background: #F9353B;
				border-radius: 44rpx;
				font-size: 32rpx;
				color: white;
				margin-top: 30rpx;

				&:first-child {
					margin-top: 60rpx;
				}

				&:last-child {
					border: 2rpx solid #F9353B;
					color: #F9353B;
					background: white;
				}
			}
		}

		.userBind {
			border: none !important;
			display: flex;
			justify-content: center;
			line-height: center;
			color: #F9353B;
			font-size: 28rpx;

			&.msg {
				color: #F9353B;
			}
		}

	}
</style>
