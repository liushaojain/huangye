<template>
	<view class="cus">
		<view class="cus_box">
			<!-- <view class="tac ft30 p30">设计筛选</view> -->
			<view class="plr30">
				<view class="pt10 label">设计状态</view>
				<view class="tags flex flex_w">
					<text 
						v-for="item in tag1" 
						@tap="filtrate('status',item.key)"
						:key="item.key" 
						:class="{'active':status==item.key}">
						{{item.text}}
					</text>				
				</view>
			</view>
			<view class="mt20 plr30">
				<view class="label">更新时间</view>
				<view class="tags flex flex_w">
					<text 
						v-for="item in tag2" 
						@tap="filtrate('timeType',item.key)"
						:key="item.key" 
						:class="{'active':timeType==item.key}">
						{{item.text}}
					</text>
				</view>
			</view>
			<view class="mt20 plr30">
				<view>自定义查询</view>
				<view class="mt10">
					<view class="c5">
						<view class="flex_a">
							<text class="iconfont icon-icon_search plr20"></text>
							<input v-model="customQuery" type="text" placeholder="输入名称/ID搜索">
						</view>
					</view>
				</view>
			</view>
			<view class="btns flex_sb">
				<view @tap="designFiltrate(false)">取消</view>
				<view @tap="designFiltrate(true)">确定</view>
			</view>	
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tag1:[
					{text:"待确认",key:1},
					{text:"已签名",key:2},
					{text:"已购",key:4},
					{text:"已失效",key:5}
				],
				tag2: [
					{text:"近一周",key:4},
					{text:"近一个月",key:1},
					{text:"近三个月",key:2},
					{text:"近六个月",key:3}
				],
				status:"",
				timeType:"",
				customQuery:""
				
			}
		},
		props:['res','sendData'],
		created() {
			this.status = this.sendData.status;
			this.timeType = this.sendData.timeType;
			this.customQuery=this.sendData.customQuery;
		},
		mounted() {
			
		},
		methods:{
			resut(){
				this.status = '';
				this.timeType = '';
				this.customQuery='';
			},
			filtrate(type,key){
				if(this[type]==key){
					this[type]=''
				}else{
					this[type] = key;
				}
			},
			designFiltrate(comfirm){
				if(comfirm){
					this.$emit('designSelectCall',{"status":this.status,timeType:this.timeType,customQuery:this.customQuery})
				}else{
					this.status = this.sendData.status;
					this.timeType = this.sendData.timeType;
					this.customQuery=this.sendData.customQuery;
					this.$emit('designSelectCall',comfirm)
				}
			}
		}
	}
</script>

<style lang="scss">
	.cus{
		position: fixed;
		left:0;
		top:100rpx;
		right:0;
		bottom:0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 20;
		.label{
			color: #333333;
			
		}
		.cus_box{
			background-color: #ffffff;
			width:100%;
			font-size: 28rpx;
			// border-radius: 15rpx;
			// padding:30rpx 30rpx 0 30rpx;
			// position: absolute;
			// left:50%;
			// top:50%;
			// transform: translate(-50%,-50%);
			.tags{
				text{
					display: block;
					background-color: #F7F4F8;
					width:162rpx;
					height:75rpx;
					margin-top:20rpx;
					margin-right: 10rpx;
					text-align: center;
					line-height: 75rpx;
					border-radius: 10rpx;
				}
				text:nth-of-type(3n+1){
					margin-left:0;
				}
				text.active{
					background-color: #FFEFF0;
					color: #F9353B;
				}
			}
			
			.btns{
				border-top:1px solid #eee;
				margin-top:60rpx;
				padding: 20rpx;
				view{
					width: 339rpx;
					height: 80rpx;
					background: #FFFFFF;
					border-radius: 40rpx;
					border: 1px solid #CCCCCC;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 32rpx;
				}
				view:nth-child(2){
					border:1px solid #F9353B;
					color:#F9353B;
				}
			}
			
		}
	}
	
	.c5{
		// background-color: #F5F5F5;
		width:100%;
		// position: fixed;
		// left:0;
		// top:0;
		border-radius: 40rpx;
		// z-index: 20;
		padding-top:10rpx;
		>view{
			width:100%;
			margin:0 auto;
			background-color: #ffffff;
			height:80rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
			border:1px solid #eee;
			input{
				width: 100%;
			}
		}
	}
</style>