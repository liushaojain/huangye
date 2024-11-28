<template>
	<view class="select">
		<view class="container">
			<view class="list" v-if="discount">
				<view class="item" v-for="(item,index) in select" :class="{'active':checked.index==item.index}" :key="item" @click="getchecked(item)">
					{{item[name]}}
				</view>
			</view>
			<view class="list" v-else-if="name=='withdraw'">
				<view class="item" v-for="(item,index) in select" :class="{'active':checked.id==item.id}" :key="item" @click="getchecked(item)">
					{{item.bankName}}  {{item.cardNo}}
				</view>
			</view>
			<view class="list" v-else-if="name">
				<view class="item" v-for="(item,index) in select" :class="{'active':checked==item[name]}" :key="item" @click="getchecked(item)">
					{{item[name]}}
				</view>
			</view>
			<view class="list" v-if="!name">
				<view class="item" v-for="(item,index) in select" :class="{'active':checked==item}" :key="item" @click="getchecked(item)">
					{{item}}
				</view>
			</view>
			<view class="cancel" @click="getchecked(false)">取消</view>			
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
			}
		},
		props:["select",'checked','name',"discount"],
		created() {},
		methods:{
			getchecked(item){
				this.$emit("transfer",item)
			}
		}
	}
</script>

<style scoped lang="scss">
	.select{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 999999;
		background: rgba(0,0,0,0.4);
		.list{
			max-height: 800rpx;
			overflow: auto;
			background: #F4F5F6;
			border-radius: 24rpx 24rpx 0 0;
			.item{
				background: #FFFFFF;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				font-size: 30rpx;
				color: #303336;
				border-top: 1px solid #E9EBEC;
				box-sizing: border-box;
				&:first-child{
					border: none;
				}
				&.active{
					color: #F9353B;
				}
			}
		}
		.cancel{
			background: #FFFFFF;
			line-height: 80rpx;
			text-align: center;
			font-size: 30rpx;
			color: #303336;
			margin-top: 16rpx;
		}
	}
	.container{
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: #F4F5F6;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		overflow: hidden;
	}
</style>
