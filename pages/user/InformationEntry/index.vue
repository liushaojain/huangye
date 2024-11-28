<template>
	<view class="container" :style="{'padding-top': statusBarHeight+'px'}">
		<view class="header">
			<u-navbar class="uNavbar" @leftClick="leftClick" :autoBack="true" :title="pageList[pageIndex].title" :bgColor='bgColor' :height="titleHeight"></u-navbar>
		</view>
		<view class="hintImg">
			<image class="img" :src="imgBaseUrl+'loginText.png'" mode=""></image>
		</view>
		<view class="content">
			<BaseInfo ref="BaseInfo" v-if="pageIndex===0"></BaseInfo>
			<MaritalStatus ref="MaritalStatus" v-if="pageIndex===1"></MaritalStatus>
			<BeFondOf ref="BeFondOf" v-if="pageIndex===2"></BeFondOf>			
			<Expects ref="Expects" v-if="pageIndex===3"></Expects>
			<Avatar ref="Avatar" v-if="pageIndex===4"></Avatar>
			<LifePhoto ref="LifePhoto" v-if="pageIndex===5"></LifePhoto>
			<AboutMe ref="AboutMe" v-if="pageIndex===6"></AboutMe>
		</view>
		<view class="footer">
			<view class="infoListPage">
				<text v-for="(item,index) in pageList" :key="index" class="item" @click="pageIndex = index" :class="{'active':index===pageIndex}"></text>
			</view>
			<button class="confirmBtn" @click="formSubmit">确定</button>
		</view>
	</view>
</template>

<script>
	import BaseInfo from "./components/BaseInfo.vue"
	import MaritalStatus from "./components/MaritalStatus.vue"
	import BeFondOf from "./components/BeFondOf.vue"
	import Expects from "./components/Expect.vue"
	import Avatar from "./components/Avatar.vue"
	import LifePhoto from "./components/LifePhoto.vue"
	import AboutMe from "./components/AboutMe.vue"
	
	export default {
		data(){
			return {
				imgBaseUrl: this.imgBaseUrl,
				bgColor: 'transparent',
				statusBarHeight: '',
				titleHeight: 44,
				pageList: [
					{title: '基础信息', ref: 'BaseInfo'},
					{title: '婚姻信息', ref: 'MaritalStatus'},
					{title: '生活爱好', ref: 'Expects'},
					{title: '期望中的他（她）', ref: 'Expects'},
					{title: '头像上传', ref:'Avatar'},
					{title: '上传生活照', ref:'LifePhoto'},
					{title: '关于我', ref:'AboutMe'},
				],
				pageIndex: 0
			}
		},
		components:{
			BaseInfo,
			MaritalStatus,
			BeFondOf,
			Expects,
			Avatar,
			LifePhoto,
			AboutMe
		},
		onShow() {
			let that = this;
			uni.getSystemInfo({
			  success: function (info) {
			    var statusBarHeight = info.statusBarHeight;
				that.statusBarHeight = info.statusBarHeight + that.titleHeight;
			  }
			});
			uni.setNavigationBarTitle({
				title: this.pageList[this.pageIndex]
			})
		},
		onLoad() {
			
		},
		onPageScroll(e) {
			if(e.scrollTop >= 35){
				this.bgColor = 'white'
			}else{
				this.bgColor = 'transparent'
			}
		},
		methods:{
			leftClick(){
				uni.navigateBack();
			},
			formSubmit(){
				const activePage = this.pageList[this.pageIndex];
				const ref = activePage.ref;
				this.$refs[ref].submit()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>