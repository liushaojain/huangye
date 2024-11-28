<template>
	<view class="aboutBox">
		<u--textarea height='260' class="textarea" border="none" v-model="aboutMe" placeholder="请输入" maxlength="300" count></u--textarea>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				aboutMe: ''
			}
		}
	}
</script>

<style scoped lang="scss">
	.aboutBox{
		padding-bottom: 20rpx;
	}
</style>