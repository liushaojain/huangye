<template>
	<view class="container">
		<view class="tac c9 pt30">未注册手机号登陆将自动创建账号</view>
		<view class="form" v-if="typeLogin==1">
			<view>
				<input type="text" v-model="imgCodeFrom.username" placeholder="用户名/手机号" class="tLeft">
			</view>
			<view class="lastIpt">
				<input type="password" placeholder="密码" v-model="imgCodeFrom.password">
				 
			</view>
			<view class="lastIpt" v-if="verifyCode">
				<input type="text" maxlength="6" placeholder="请输入图片验证码" v-model="imgCodeFrom.verifyCode">
				<image class="baseImg" :src="imageData" mode="aspectFit" @click="createVerifycode"></image>
			</view>
			<button type="default" :class="['binding',imgCodeFrom.username&&imgCodeFrom.password?'binding_active':'']" @click="verifyCodeLogin">登录</button>
			<view class="userBind msg" @click="switchLogin(2)">短信验证码登录</view>
		</view>
		
		<view class="form" v-if="typeLogin==2">
			<view>
				<input type="number" maxlength="11" v-model="msmCodeFrom.phoneNumber" placeholder="请输入手机号" class="tLeft">
			</view>
			<view class="lastIpt">
				<input type="text" maxlength="6" v-model="msmCodeFrom.smsCode" placeholder="请输入短信验证码">
				<text class="clickGet color_a2" :class="{'MsmCode':isMsmCode}" @click="getMsmCode(2)">{{MSMtext}}</text>
			</view>
			<view class="hint" v-if="msmErr">你的验证码输入有误，请重新输入</view>
			<button type="default" :class="['binding',msmCodeFrom.phoneNumber&&msmCodeFrom.smsCode?'binding_active':'']" @click="smsCodeLogin">登录</button>
			<view class="userBind msg" @click="switchLogin(1)">账号密码登录</view>
		</view>
		
		<!-- <popup :text="texts" :type="popUpType"></popup> -->
		
		<!--   -->
		
		
		<view class="bottomBox tac">
			<view class="c9">使用其他方式登陆</view>
			<view @click="goBack"><image style="width:120rpx;height:120rpx;" mode="aspectFit" src="https://hyxpl2019.blob.core.chinacloudapi.cn/hcxpl/ico_login_wechat.png?sp=rcw&st=2022-05-23T03:05:15Z&se=2026-01-01T11:05:15Z&sv=2020-08-04&sr=c&sig=raI0zHYDvOr0oK%2FGuwlDfAYLPKuGd2XEfDQ0Vm7ogaU%3D"></image></view>
			<view class="flex_aj">
				<view class="">
					<u-checkbox-group
					            v-model="checkboxValue1"
					            placement="column"
					            @change="checkboxChange"
					        >
					            <u-checkbox
									shape="circle"
					                :key="1"
					                :name="2"
									:size="15"
					            >
					            </u-checkbox>
					</u-checkbox-group>
				</view>	
				<view class="">已阅读并同意 <text  @click="openh5(1)" class="color_a2">《用户协议》</text> 及 <text  @click="openh5(2)" class="color_a2">《隐私协议》</text></view>		
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import popup from "@/components/popUp/index.vue"
	import api from "@/store/account/index.js"
	import homeApi from "@/store/home/index.js"	
	import { userStore } from "@/store/account/userInfo.js"
	import commons from '@/utils/common.js'
	export default{
		data(){
			return{
				fag:false,
				typeLogin:2,
				pasType:true,
				popUpType:"fail",
				texts:"登录失败",
				MSMtext: "获取验证码",
				msmErr:false,
				imageData:"",
				imgCodeFrom:{
					username:"",
					password:"",
					verifyCode:"",
					verifiyCodeKey:"",
					loginType:2,
					userType:0
				},
				msmCodeFrom:{
					phoneNumber:"",
					smsCode:"",
					loginType:3,
					activityId:''
					// userType:0
				},
				isMsmCode:false,
				verifyCode:false,
				
				checkboxValue1:[0],
				autograph:'',
				worksId:'',
				share_member_id:'',
				back:''
			}
		},
		onLoad(e) {
			this.back=e.back;
			this.autograph=e.autograph;
			this.worksId=e.worksId;
			this.share_member_id=e.share_member_id;
			
		},
		methods:{
			switchLogin(type){
				this.typeLogin=type;
				if(type==1){
					uni.setNavigationBarTitle({
						title:"账号登录"
					})
				}else{
					uni.setNavigationBarTitle({
						title:"手机登录"
					})
				}
			},
			getMsmCode(type) {
				if (this.MSMtext != "获取验证码") {
					return false;
				}
				if(this.msmCodeFrom.phoneNumber==""){
					uni.showToast({
						title: '手机号码不能为空',
						icon: "none",
						duration: 2000
					});
					return false
				}else if(!commons.checkPhone(this.msmCodeFrom.phoneNumber)){
					uni.showToast({
						title: '手机号码格式不正确',
						icon: "none",
						duration: 2000
					});
					return false
				}
				let nums = 60;
				let that = this;
				that.MSMtext="已发送"
				this.$request(api.sendsms, {
					phoneNum: this.msmCodeFrom.phoneNumber,
					type: 1,
				}).then(function(res) {
					that.isMsmCode = true;
					that.MSMtext = nums + '后重发'
					let msmCode = setInterval(() => {
						that.MSMtext = (nums--) + '后重发';
						if (nums == 0) {
							that.isMsmCode = false;
							that.MSMtext = "获取验证码";
							clearInterval(msmCode)
						}
					}, 1000)
				})
			},
			createVerifycode() {
				
				let that = this;
				this.$request(api.createVerifycode, {
					phoneNumber: that.msmCodeFrom.newPhone,
					type: 5
				}, "GET").then((res) => {
					that.imgCodeFrom.verifiyCodeKey=res.data.verifyKey;
					that.imageData = "data:image/jpg;base64," + res.data.imageData;
				})
			},
			verifyCodeLogin(){
				if(!this.fag){
					uni.showToast({
						title: '请阅读并同意用户协议及隐私协议',
						icon: "none",
						duration: 2000
					});
					return false
				}else if(this.imgCodeFrom.username==""){
					uni.showToast({
						title: '账号不能为空',
						icon: "none",
						duration: 2000
					});
					return false
				}else if(this.imgCodeFrom.password==""){
					uni.showToast({
						title: '密码不能为空',
						icon: "none",
						duration: 2000
					});
					return false
				}else if(this.imgCodeFrom.verifyCode==""&this.verifyCode){
					uni.showToast({
						title: '图形验证码不能为空',
						icon: "none",
						duration: 2000
					});
					return false
				}else{
					let that = this;
					this.$request(api.diylogin, that.imgCodeFrom,"POST","",2).then(async (res) => {
						if(res.code==200){
							userStore.commit('setToken', res.data);
							await that.apis.bindFriends();//绑定关系
							that.$request(api.userInfo,"","GET",2).then(e=>{
								let userInfo = userStore.state.userInfo;
								if(userInfo.brandId){						
									e.data.brandName=userInfo.brandName;
									e.data.brandId=userInfo.brandId;
								}
								userStore.commit('setUserInfo', e.data);
								if(this.back){
									let back = parseInt(this.back)
									let pages = getCurrentPages();
									let prevPage = pages[pages.length - (back+1)]; //上一个页面
									prevPage.onLoad(prevPage.options);
									uni.navigateBack({
										delta:parseFloat(this.back)+1
									})
									return false
								}
								uni.switchTab({
									url: "/pages/home/index"
								})
							})
						}else {
							if(res.code==301){
								this.createVerifycode()
								this.verifyCode=true;
								uni.showToast({
									title:"密码输错三次需输入验证码",
									icon:"none"
								})
							}else{
								uni.showToast({
									title:"用户名或者密码错误",
									icon:"none"
								})								
							}
						}
					})
				}
			},
			async smsCodeLogin(){
				var that=this;
				if(!this.fag){
					uni.showToast({
						title: '请阅读并同意用户协议及隐私协议',
						icon: "none",
						duration: 2000
					});
					return false
				}else if(this.msmCodeFrom.phoneNumber==""){
					uni.showToast({
						title: '手机号码不能为空',
						icon: "none",
						duration: 2000
					});
					return false
				}else if(this.msmCodeFrom.smsCode==""){
					uni.showToast({
						title: '验证码不能为空',
						icon: "none",
						duration: 2000
					});
					return false
				}else if(!commons.checkPhone(this.msmCodeFrom.phoneNumber)){
					uni.showToast({
						title: '手机号码格式不正确',
						icon: "none",
						duration: 2000
					});
					return false
				}else{
					let that = this;
					this.msmCodeFrom.activityId=uni.getStorageSync('activityId')||'';
					var res=await this.apis.diylogin(this.msmCodeFrom);
					uni.removeStorageSync('activityId');
					userStore.commit('setToken', res.data);
					await that.apis.bindFriends();//绑定关系
					that.goHome();		
							
					// this.$request(api.userlogin, that.msmCodeFrom,"POST","",2).then(async (res) => {
					
					// 	if(res.code!=200){
					// 		return
					// 	}
					// 	userStore.commit('setToken', res.data);
					// 	await that.apis.bindFriends();//绑定关系
					// 	that.$request(api.userInfo,"","GET",2).then(e=>{
					// 		let userInfo = userStore.state.userInfo;
					// 		userStore.commit('setUserInfo', e.data);
							
					// 		that.goHome()
					// 	})
					// })
					
				}
			},
			goHome(){
				this.$request(api.userInfo,"","GET",2).then(e=>{
					userStore.commit('setUserInfo', e.data);
					
					if(this.autograph=='ok'){
						uni.navigateTo({
							url:"/pages/confirmDesing/confirmDesing?autograph="+this.autograph+'&worksId='+this.worksId+'&share_member_id='+this.share_member_id
						});
						return
					}
					
					if(this.back){
						uni.navigateBack({
							delta:parseFloat(this.back)+1
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
					this.$request(homeApi.updBrandId,{brandId:userStore.state.userInfo.brandId}).then(res=>{
						that.goHome()
					})
				}else{
					that.goHome()
				}				
			},
			checkboxChange(e){
				if(e[0]==2){
					this.fag=true;
				}else{
					this.fag=false;
				}
			},
			goBack(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		components:{
			popup
		}
	}
</script>

<style lang="scss">
	page{
		overflow: hidden;
		.tLeft{
			text-align: left !important;
		}
		background: white;
		.info{
			width:600rpx;
			margin: auto;
			text-align: center;
			image{
				width: 128rpx;
				height: 128rpx;
				display: block;
				padding-top: 100rpx;
				margin:auto;
			}
			view{
				margin-top: 40rpx;
				color: #303336;
				font-size: 32rpx;
			}
		}
		.form{
			margin-top: 60rpx;
			view{
				height: 88rpx;
				line-height: 88rpx;
				display: flex;
				border-bottom: 2rpx solid #E9EBEC;
				width: 630rpx;
				margin: auto;
				text{
					font-size: 30rpx;
					color: #60656C;
				}
				&.hint{
					height: 50rpx;
					line-height: 50rpx;
					color: #FF3931;
					border: none;
					font-size: 24rpx;
				}
				&.lastIpt{
					input{
						text-align: left;
					}
				}
				input{
					flex: 1;
					text-align: right;
					height: 88rpx;
					font-size: 30rpx;
				}
				.clickGet{
					border: none !important;
					background: white;
					color: #2078F5;
					font-size: 30rpx;
					box-sizing: border-box;
					&.MsmCode {
						color: #93989F;
					}
				}
				.baseImg{
					height: 88rpx;
					width: 176rpx;
				}
			}
			.binding{
				width: 630rpx;
				height: 88rpx;
				background: #FED7D8;
				border-radius: 44rpx;
				font-size: 32rpx;
				color: white;
				margin-top: 80rpx;
			}
			.binding_active{
				background: #F9353B;
			}
		}
		.btnGroup{
			button{
				width: 630rpx;
				height: 88rpx;
				background: #F9353B;
				border-radius: 44rpx;
				font-size: 32rpx;
				color: white;
				margin-top: 30rpx;
				&:first-child{
					margin-top: 60rpx;
				}
				&:last-child{
					border:2rpx solid #F9353B;
					color: #F9353B;
					background: white;
				}
			}
		}
		.userBind{
			border: none !important;
			display: flex;
			justify-content: center;
			line-height: center;
			color: #F9353B;
			font-size: 28rpx;
			&.msg{
				color: #F9353B;
				margin-top: 20rpx;
			}
		}
		
	}
	
	.bottomBox{
		position: fixed;
		width:100%;
		left:0;
		bottom:100rpx;
	}
</style>
