<template>
	<view class="homeContent">
		<view class="hreader mt94">
			<uni-swiper-dot :info="list" :current="current" field="content" :mode="mode" :dotsStyles='dotsStyles'>
			<swiper :style="{paddingTop: headHeight+'px'}" class="swiper" circular :autoplay="autoplay" :interval="interval"  @change="change"
				:indicator-dots="false"
				:duration="duration">
				<swiper-item v-for="(item,index) in list" :key="index">
					<view class="swiper-item uni-bg-red">
						<view class="bg">
							<image class="img" :src="item.image" mode=""></image>
						</view>
					</view>
				</swiper-item>
			</swiper>
			</uni-swiper-dot>
		</view>
		<view class="content">
			<view class="cHead">
				<view class="cHeadLine1">
					<view class="name">来自星星</view>
					<image class="img" :src="imgBaseUrl+'Group987987.png'" mode=""></image>
					<view class="msg" @click="openOtherInfo">已认证信息</view>
				</view>
				<view class="cHeadLine2">
					<view class="txt">
						<view class="txtItem">25岁</view>
						<view class="txtItem">99年</view>
						<view class="txtItem">巨蟹座</view>
					</view>
					<view class="txt">
						<view class="txtItem">165cm</view>
						<view class="txtItem">55kg</view>
					</view>
				</view>
				<view class="cHeadLine3">
					<view class="item">
						<image class="img1" :src="imgBaseUrl+'Group@2x(2).png'" mode=""></image>
						老师
					</view>
					<view class="item">
						<image class="img2" :src="imgBaseUrl+'Group@2x.png'" mode=""></image>
						东莞
					</view>
				</view>
			</view>
		
			<view class="itemBox">
				<view class="itemhead">
					<image class="img" :src="imgBaseUrl+'Group694@2x.png'" mode=""></image>
					婚姻状况
				</view>
				<view class="li">
					<text class="label">婚姻情况:</text>
					<text class="txt">已婚</text>
				</view>
				<view class="li">
					<text class="label">是否有孩子:</text>
					<text class="txt">有娃自己带</text>
				</view>
				<view class="li">
					<text class="label">抚养费支出:</text>
					<text class="txt">3000元/月</text>
				</view>
				<view class="li">
					<text class="label">家庭背景:</text>
					<text class="txt">独生子女</text>
				</view>
				<view class="li">
					<text class="label">探望子女周期:</text>
					<text class="txt">每周一次</text>
				</view>
				<view class="li">
					<text class="label">离异时间:</text>
					<text class="txt">2020年4月</text>
				</view>
				<view class="li">
					<text class="label">是否有要孩子的打算:</text>
					<text class="txt">要</text>
				</view>
			</view>
			<view class="itemBox">
				<view class="itemhead">
					<image class="img" :src="imgBaseUrl+'Group695@2x.png'" mode=""></image>
					我为什么离异
				</view>
				<view class="texts">
					简简单单说几句简简单单说几句简简单单说几句简简单单说几句简简单单说几句简简单单说几句简简单单说几句
				</view>
			</view>
			<view class="itemBox">
				<view class="itemhead">
					<image class="img" :src="imgBaseUrl+'Group696@2x.png'" mode=""></image>
					个人资料
				</view>
				<view class="li">
					<text class="label">家乡:</text>
					<text class="txt">东莞</text>
				</view>
				<view class="li">
					<text class="label">学历:</text>
					<text class="txt">本科</text>
				</view>
				<view class="li">
					<text class="label">学历:</text>
					<text class="txt">东莞</text>
				</view>
				<view class="li">
					<text class="label">居住情况:</text>
					<text class="txt">与父母一起居住</text>
				</view>
				<view class="li">
					<text class="label">房产情况:</text>
					<text class="txt">租房</text>
				</view>
				<view class="li">
					<text class="label">生日:</text>
					<text class="txt">八月二十六·农历</text>
				</view>
				<view class="li">
					<text class="label">收入情况:</text>
					<text class="txt">年收入20-30万</text>
				</view>
				
				<view class="tagbox">
					<text class="tag">一周健身两次</text>
					<text class="tag">偶尔喝酒</text>
					<text class="tag">有猫有狗</text>
					<text class="tag">不抽烟</text>
					<text class="tag">期望一年内结婚</text>
					<text class="tag">吸猫人</text>
				</view>
			</view>
			<view class="itemBox">
				<view class="itemhead">
					<image class="img" :src="imgBaseUrl+'Group697@2x.png'" mode=""></image>
					关于我
				</view>
				<view class="texts">
					简简单单说几句简简单单说几句简简单单说几句简简单单说几句简简单单说几句简简单单说几句简简单单说几句
				</view>
			</view>
			<view class="itemBox">
				<view class="itemhead">
					<image class="img" :src="imgBaseUrl+'Group697@2x.png'" mode=""></image>
					理想的 TA
				</view>
				<view class="itemContent">
					<view class="centerBox">
						<view class="txt">
							<view class="txt">期望中的</view>
							TA
						</view>
					</view>
					<view class="tagList">
						<view class="tag tag1">
							偶尔喝酒
						</view>
						<view class="tag tag2">
							不接受养大型宠物
						</view>
						<view class="tag tag3">
							偶尔健身
						</view>
						<view class="tag tag4">
							独立居住
						</view>
						<view class="tag tag5">
							独立居住
						</view>
						<view class="tag tag6">
							半年旅游一次
						</view>
					</view>
				</view>
				<view class="texts">
					简简单单说几句简简单单说几句简简单单说几句简简单单说几句简简单单说几句简简单单说几句简简单单说几句
				</view>
				<view class="imgs">
					<image class="img" :src="imgBaseUrl+'Group718@2x.png'" mode=""></image>
					<image class="img" :src="imgBaseUrl+'Group718@2x.png'" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { EventBus } from './eventBus.js';
	export default {
		data(){
			return {
				imgBaseUrl: this.imgBaseUrl,
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: false,
				interval: 2000,
				duration: 500,
				list: [
					{
						image: '../../../static/img/loginBg.png',
					},
					{
						image: '../../../static/img/loginBg.png',
					},
					{
						image: '../../../static/img/loginBg.png',
					},
				],
				current: 0,
				mode: 'round',
				dotsStyles: {
					backgroundColor: 'rgba(255,255,255,0.35)',
					border: 'none',
					selectedBackgroundColor: 'white',
					selectedBorder: 'none',
					paddingTop: this.headHeight+'px'
				},
				memberList: [],
				memberIndex: 0,
				statusBarHeight: '',
				titleHeight: 44,
				headHeight: '',
				bgColor: ''
			}
		},
		created() {
			let that = this;
			uni.getSystemInfo({
			  success: function (info) {
			    var statusBarHeight = info.statusBarHeight;
				that.statusBarHeight = statusBarHeight;
				that.headHeight = info.statusBarHeight + that.titleHeight;
			  }
			});
			this.getmember();
		},
		methods:{
			change(e) {
				this.current = e.detail.current;
			},
			getmember(){
				const memberList = this.$apis.homeApi.memberIndex({page: '1',pageSize: '10'});
				this.memberList = memberList;
			},
			openOtherInfo(){
				EventBus.$emit('message-event', 'Hello from Brother A!');
			}
		}
	}
</script>

<style lang="scss">
	@import "../index.scss";
</style>