<template>
	<view class="container" :style="{paddingTop: statusBarHeight+'px'}">
		<view class="header">
			<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
			<text class="txt">来自星星</text>
			<button class="bnt">预览</button>
		</view>
		<view class="tabList">
			<u-tabs :list="tabList" @click="tabChange" lineColor="#FF7390" lineWidth="25" :current='current'></u-tabs>
		</view>
		<view class="contentBox">
			<view class="content">
				<view class="baseInfo" v-if="!current">
					<view class="item">
						<view class="titleBox">
							<text class="title">基本信息</text>
							<navigator url="/pages/user/InformationEntry/index?pageIndex=0" hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="tagList">
							<text class="tag">一周健身一次</text>
							<text class="tag">偶尔喝酒</text>
							<text class="tag">有猫有狗</text>
							<text class="tag">不抽烟</text>
							<text class="tag">期望一年内结婚</text>
							<text class="tag">吸猫人</text>
						</view>
					</view>
					
					<view class="item">
						<view class="titleBox">
							<text class="title">婚姻资料</text>
							<navigator hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="tagList">
							<text class="tag">一周健身一次</text>
							<text class="tag">偶尔喝酒</text>
							<text class="tag">有猫有狗</text>
							<text class="tag">不抽烟</text>
							<text class="tag">期望一年内结婚</text>
							<text class="tag">吸猫人</text>
						</view>
					</view>
					
					<view class="item">
						<view class="titleBox">
							<text class="title">生活爱好</text>
							<navigator hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="tagList">
							<text class="tag">一周健身一次</text>
							<text class="tag">偶尔喝酒</text>
							<text class="tag">有猫有狗</text>
							<text class="tag">不抽烟</text>
							<text class="tag">期望一年内结婚</text>
							<text class="tag">吸猫人</text>
						</view>
					</view>
					
					<view class="item">
						<view class="titleBox">
							<text class="title">我理想中的TA</text>
							<navigator hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="tagList">
							<text class="tag">一周健身一次</text>
							<text class="tag">偶尔喝酒</text>
							<text class="tag">有猫有狗</text>
							<text class="tag">不抽烟</text>
							<text class="tag">期望一年内结婚</text>
							<text class="tag">吸猫人</text>
						</view>
						<view class="Description">这个是文本，这个是文本这个是文本，这个是文本这个是文本，这个是文本</view>
					</view>
					
					
					<view class="item">
						<view class="titleBox">
							<text class="title">关于我</text>
							<navigator hover-class="none" class="edit">编辑</navigator>
						</view>
						<view class="aboutMe">这个是文本，这个是文本这个是文本，这个是文本这个是文本，这个是文本</view>
					</view>
				</view>
				<view class="imgBox" v-else>
					<view class="imgList">
						<view class="item">
							<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
						</view>
						<view class="item">
							<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
						</view>
						<view class="item">
							<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
						</view>
						<view class="item">
							<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
						</view>
						<view class="item">
							<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
						</view>
						<view class="item">
							<image class="img" src="../../../static/img/logo.png" mode="aspectFill"></image>
						</view>
						
						
					</view>
					
					<view class="imgFooter">
						<button class="bnt">上传照片</button>
						<view class="delete">
							<u-icon label="删除" label-size="12" size="26" name="trash"></u-icon>
						</view>
					</view>
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
				current: 0,
				tabList:[
					{name: '基本信息'},
					{name: '生活照'}
				]
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
			tabChange(item){
				this.current = item.index;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>