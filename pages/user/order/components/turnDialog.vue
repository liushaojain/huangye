<template>
	<view class="turn-dialog">
		<view class="turn-dialog-container" :class="proofing?'proofing':''">
			<template v-if="turnStep == 1">
				<view class="turn-step-1">
					<view class="turn-dialog-title">提示</view>
					<view><text class="iconfont iconpic_info_success" style="color: #1F90FF;"></text></view>
					<view  v-if="proofing">已通知交付专员，请耐心等待交付专员与您联系</view>
					<view v-else>已通知设计师上传印刷文件确认函，请耐心等待</view>
					<view class="sure-btn" @click="sure">确定</view>
					<view class="flow" v-if="proofing!=true" @click="turnStep = 2">设计订单转印刷流程<text class="iconfont iconicon_label_arrow_right"></text></view>
				</view>
			</template>
			<template v-else>
				<view class="turn-step-2">
					<view class="step-title"><text class="iconfont iconfanhui" @click="turnStep = 1"></text>设计订单转印刷流程</view>
					<view class="step-list">
						<view class="step-item flex-start itemsCenter">
							<view>1</view>
							<view>用户点击"我要印刷"，系统通知设计师上传文件确认函</view>
						</view>
						<view class="step-item flex-start itemsCenter">
							<view>2</view>
							<view>设计师上传文件确认函</view>
						</view>
						<view class="step-item flex-start itemsCenter">
							<view>3</view>
							<view>用户签署文件确认函</view>
						</view>
						<view class="step-item flex-start itemsCenter">
							<view>4</view>
							<view>用户点击"直接印刷"，选择商品参数并确认订单</view>
						</view>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				turnStep: 1
			}
		},
		props:['proofing'],
		methods:{
			sure(){
				this.$emit('showDialog', {flag: false, index: this.index})
			}
		}
	}
</script>

<style lang="scss">
	@import '../style/turnDialog.scss'
</style>
