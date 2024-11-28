<template>
	<view class="container" :style="{paddingTop: statusBarHeight+'px'}">
		<view class="header">
			<image class="img" src="../../static/img/logo.png" mode="aspectFill"></image>
			来自星星
		</view>
		<view class="Records">
			<view class="item">
				<text class="num">10</text>
				<text class="label">我的浏览</text>
			</view>
			<view class="item">
				<text class="num">10</text>
				<text class="label">我心动的</text>
			</view>
			<view class="item">
				<text class="num">10</text>
				<text class="label">最近采访</text>
			</view>
		</view>
		<view class="contentBox">
			<view class="contentTop">
				<image class="img" :src="imgBaseUrl+'Group694@2x.png'" mode=""></image>
				<view class="hint">
					<view class="hintTop">回复少？升级VIP更多曝光</view>
					<view class="hintBottom">搭配曝光翻倍等权益，效果翻倍</view>
				</view>
				<button class="btn">去升级</button>
			</view>
			<view class="contentBody">
				<view class="contentBodyBar">
					<navigator class="item" url="/pages/user/userInfo/index" hover-class="none">
						<view class="icon">
							<image class="img" :src="imgBaseUrl+'Group694@2x.png'" mode=""></image>
						</view>
						<view class="label">
							基本信息
						</view>
					</navigator>
					<navigator class="item" hover-class="none">
						<view class="icon">
							<image class="img" :src="imgBaseUrl+'Group694@2x.png'" mode=""></image>
						</view>
						<view class="label">
							认证信息
						</view>
					</navigator>
					<navigator class="item" hover-class="none">
						<view class="icon">
							<image class="img" :src="imgBaseUrl+'Group694@2x.png'" mode=""></image>
						</view>
						<view class="label">
							匹配设置
						</view>
					</navigator>
				</view>
				<view class="contentList">
					<navigator hover-class="none" class="li">
						<view class="listLeft">
							<image class="img" :src="imgBaseUrl+'Group694@2x.png'" mode=""></image>
							推荐给好友
						</view>
						<u-icon name="arrow-right" color="#8B8B8B" size="18"></u-icon>
					</navigator>
					<navigator hover-class="none" class="li">
						<view class="listLeft">
							<image class="img" :src="imgBaseUrl+'Group694@2x.png'" mode=""></image>
							隐私保护政策
						</view>
						<u-icon name="arrow-right" color="#8B8B8B" size="18"></u-icon>
					</navigator>
					<navigator hover-class="none" class="li">
						<view class="listLeft">
							<image class="img" :src="imgBaseUrl+'Group694@2x.png'" mode=""></image>
							用户服务协议
						</view>
						<u-icon name="arrow-right" color="#8B8B8B" size="18"></u-icon>
					</navigator>
					<navigator hover-class="none" class="li">
						<view class="listLeft">
							<image class="img" :src="imgBaseUrl+'Group694@2x.png'" mode=""></image>
							联系我们
						</view>
						<u-icon name="arrow-right" color="#8B8B8B" size="18"></u-icon>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				statusBarHeight: 20,
			}
		},
		computed:{
			
		},
		onLoad(e) {
		},
		onShow() {
			let that = this;
			uni.getSystemInfo({
				success: function(info) {
					var statusBarHeight = info.statusBarHeight;
					that.statusBarHeight = statusBarHeight;
				}
			});
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>
