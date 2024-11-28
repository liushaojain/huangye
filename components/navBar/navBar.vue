<template>
	<view :class="['navBar',bgImg?'bgImg':'']">
		<view class="navBar_t"></view>
		<view class="flex_a navBar_b">
			<view @click="$emit('goBack')" class="backIcon">
				<image src="../../static/img/back.png" mode="aspectFit"></image>
			</view>
			<view class="title">{{title}}</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:['title','bgImg'],
		mounted(){
			
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.navBar{
		background-color: #fff;
		position: fixed;
		width:100%;
		top:0;
		left:0;
		z-index: 100;
		.navBar_t{
			height:80rpx;
		}
	}
	.bgImg{
		// background-image: url(' https://hyxpl2019.blob.core.chinacloudapi.cn/hcxpl/bg_sousuo.png?sp=rcw&st=2022-05-23T03:05:15Z&se=2026-01-01T11:05:15Z&sv=2020-08-04&sr=c&sig=raI0zHYDvOr0oK%2FGuwlDfAYLPKuGd2XEfDQ0Vm7ogaU%3D');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}
	.navBar_b{
		padding:0 30rpx;
		height:80rpx;
		line-height: 80rpx;
		.title{
			font-size:16px;
			margin-left:30rpx;
		}
	}
	.backIcon{
		width:40rpx;
		height:40rpx;
		line-height: 0;
		image{
			width:100%;
			height:100%;
		}
	}
</style>