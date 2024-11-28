<template>
	<view class="container">
		<view class="content">
			<view class="txtItem">
				<image class="img" :src="imgBaseUrl+'Group664@2x.png'" mode=""></image>
				<view class="ft48 mt10">关于你</view>
				<view class="ft22 mt6">荒野是真实可靠的一个异性交友平台</view>
				<view class="ft22 mt2">你的信息越准确，匹配的成功率越高</view>
			</view>
			<sex v-if="type==='gender'" @getSex="getSex"></sex>
			<age v-if="type==='age'" @getAge="getAge"></age>
			<MaritalStatus v-if="type==='marital_status'" @getMaritalStatus="getMaritalStatus"></MaritalStatus>
			<city v-if="type==='city'" @getCity="getCity"></city>
			<demand ref="eldemand"></demand>
		</view>
		
	</view>
</template>

<script>
	import sex from "./components/sex.vue"
	import age from "./components/age.vue"
	import MaritalStatus from "./components/MaritalStatus.vue"
	import city from "./components/city.vue"
	import demand from "./components/demand.vue"
	import {
		userStore
	} from "@/store/account/userInfo.js"
	export default {
		data(){
			return {
				imgBaseUrl: this.imgBaseUrl,
				type: 'gender',
				info:{
					gender: '',
					birth_date: '',
					marital_status: '',
					hometown: [],
					// hometown_code: []
				}
				
			}
		},
		components:{
			sex,
			age,
			MaritalStatus,
			city,
			demand
		},
		async onShow() {
			const res = await this.$apis.uesrApi.enum();
			userStore.commit('setEnum',res.data);
		},
		methods:{
			getSex(gender){
				this.info.gender = gender;
				this.type = 'age'
			},
			getAge(pickerDate){
				this.info.birth_date = pickerDate;
				this.type = 'marital_status';
			},
			getMaritalStatus(marital_status){
				this.info.marital_status = marital_status;
				this.type = 'city';
			},
			async getCity(e){
				this.info.hometown = e.value;
				// this.info.hometown_code = e.indexs;
				this.$refs.eldemand.open();
				const res = await this.$apis.uesrApi.updateProfile(this.info);
				console.log('res',res);
				
			}
		}
	}
</script>

<style lang="scss">
	$bg-image-url: 'http://47.119.182.138:89/images/';
	.container{
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: url($bg-image-url+'Group717@2x.png');
		background-size: cover;
		padding: 264rpx 48rpx 0 48rpx;
	}
	.content{
		background: rgba(255, 255, 255, 0.2);
		padding-top:44rpx ;
		border-radius: 16rpx;
	}
	.txtItem{
		padding-left: 36rpx;
		view{
			color: #EA365B;
		}
		.img{
			width: 94rpx;
			height: 40rpx;
		}
	}
	.selectSexBox{
		padding: 28rpx 44rpx;
		background: white;
		border-radius: 16rpx;
		margin-top: 32rpx;
		.selectSex{
			display: flex;
			padding: 36rpx 0px 14rpx 0rpx;
			justify-content: center;
			.imgBox{
				&:last-child{
					margin-left: 48rpx;
				}
			}			
			.img{
				width: 230rpx;
				height: 370rpx;
			}
		}
		.confirm{
			width: 520rpx;
			height: 88rpx;
			background: linear-gradient( 271deg, #F5496D 0%, #FF7592 100%);
			border-radius: 200rpx 200rpx 200rpx 200rpx;
			display: block;
			margin: 48rpx auto;
			color: white;
			font-size: 36rpx;
			letter-spacing: 4rpx;
		}
	}
</style>