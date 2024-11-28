<template>
	<view class="container">
		<view class="flex-between title"
			:style="{paddingTop: statusBarHeight+'px',height:titleHeight+'px',background:bgColor}">
			<text class="txt">荒野</text>
			<navigator class="search" url="/pages/home/search/index" hover-class="none">
				<image class="img" :src="imgBaseUrl+'Group1000010746@2x.png'" mode=""></image>
			</navigator>
		</view>
		<homeContent></homeContent>

		<otherInfo></otherInfo>
		<view class="footerBtn">
			<view class="item">
				<image class="img" :src="imgBaseUrl+'Group713@2x.png'" mode=""></image>
			</view>
			<view class="item">
				<image class="img" :src="imgBaseUrl+'Group714@2x.png'" mode=""></image>
			</view>
		</view>



	</view>
</template>
<script>
	import homeContent from './components/homeContent.vue'
	import otherInfo from './components/otherInfo.vue'
	export default {
		components: {
			homeContent,
			otherInfo
		},
		data() {
			return {
				memberList: [],
				memberIndex: 0,
				statusBarHeight: '',
				titleHeight: 44,
				headHeight: '',
				bgColor: ''
			}
		},
		computed: {},
		onShow() {
			let that = this;
			uni.getSystemInfo({
				success: function(info) {
					var statusBarHeight = info.statusBarHeight;
					that.statusBarHeight = statusBarHeight;
					that.headHeight = info.statusBarHeight + that.titleHeight;
				}
			});
		},
		onLoad() {},
		methods: {
			getmember() {
				const memberList = this.$apis.homeApi.memberIndex({
					page: '1',
					pageSize: '10'
				});
				this.memberList = memberList;
			},
		},
		onPageScroll(e) {
			if (e.scrollTop >= 35) {
				this.bgColor = 'white'
			} else {
				this.bgColor = 'transparent'
			}
		},
	}
</script>
<style lang="scss" scoped>
	@import "./index.scss";
</style>