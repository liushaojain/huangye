<template>
	<view class="form">
		<view class="ipt marginT20">
			<view class="label"><text>*</text>收货人</view>
			<input type="text" v-model="from.name" placeholder="请输入">
		</view>
		<view class="ipt">
			<view class="label"><text>*</text>手机号码</view>
			<input type="number" v-model="from.mobile" placeholder="请输入">
		</view>
		<view class="ipt">
			<view class="label"><text>*</text>所在地区</view>
			<input type="number" placeholder="请选择" v-model="from.area" disabled  @tap="openLevel">
			<text class="iconfont iconicon_label_arrow_right"></text>
		</view>
		<view class="ipt textarea">
			<view class="label"><text>*</text>详细地址</view>
			<textarea value="" v-model="from.addr" placeholder="请输入" />
		</view>
		<view class="ipt marginT20 switch">
			<view>设为默认地址</view>
			<switch :checked="from.defAddr" @change="switchChange" color="#F9353B"/>
		</view>
		<button type="default" @click="save" class="save">保存</button>
			<level-linkage v-if="treeData" ref="levelLinkage" 
			            :pickerValueDefault="pickerValueDefault" 
			            :allData="treeData"
			            @onConfirm="onConfirm" themeColor='#007AFF'>请选择</level-linkage>
	</view>
</template>

<script>
	import levelLinkage from "@/components/three-level-linkage/linkage.nvue"
	import api from "@/store/account/index.js"
	import {store} from "@/store/account/userInfo.js"
	import commons from '@/utils/common.js'
	export default {
		data(){
			return {
				from:{
					addr:"",
					area:"",
					defAddr:false,
					mobile:"",
					name:""
				},
				treeData:false,
				pickerValueDefault: [0, 0, 0],
				picker: '',
				addrId:"",
				ognArea:"",
				isSave:true
			}
		},
		components:{
			levelLinkage
		},
		onLoad(e) {
			let that=this;
			this.addrId=e.id;
			if(e.id){
				uni.setNavigationBarTitle({title:"编辑地址"})
				this.$request(api.getAddrById,{addrId:e.id},"POST",1).then(res=>{
					delete res.data.addrId;
					this.picker=res.data.area;
					this.from=res.data;
					this.ognArea=res.data.ognArea;
				})
			}
			this.$request(api.getRegList,"POST").then(function(data){
				let city=[];
				for(let item of data.data.tree[0]){
					var province={
						name:data.data.info[item].local_name,
						id:data.data.info[item].region_id,
						code:data.data.info[item].region_id
					}
					if(data.data.tree[item]){
						province.children=[];
						for(let key of data.data.tree[item]){
							var citys={
								name:data.data.info[key].local_name,
								id:data.data.info[key].region_id,
								code:data.data.info[key].region_id
							}                    
							if(data.data.tree[key]){
								citys.children=[];
								for(let val of data.data.tree[key]){
									var county={
										name:data.data.info[val].local_name,
										id:data.data.info[val].region_id,
										code:data.data.info[val].region_id
									}
									citys.children.push(county)
								}
							}else{
								citys.children=[]
							}
							province.children.push(citys)
						}
					}
					city.push(province)
				}
				that.treeData=city;
			})
		},
		methods:{
			onConfirm(e){
				this.picker=e;
				this.from.area=this.picker.firstPick.name+" "+this.picker.secondPick.name+" "+this.picker.thirdPick.name
			},
			openLevel(){
				this.$refs.levelLinkage.open();
			},
			save(){
				if(this.isSave==false){
					return false
				}
				if(this.from.name==""){
					uni.showToast({title: "收货人不能为空",icon:"none"});
					return false
				}else if(this.from.mobile==""){
					uni.showToast({title: "手机号不能为空",icon:"none"});
					return false
				}else if(this.from.addr==""){
					uni.showToast({title: "地址详情不能为空",icon:"none"});
					return false
				}else if(this.from.area==""){
					uni.showToast({title: "所在地不能为空",icon:"none"});
					return false
				}else if (!commons.checkPhone(this.from.mobile)) {
					uni.showToast({title: '手机号码格式错误',icon:"none"});
					return false
				}
				let data=this.from;
				let area="";
				
				if(this.picker.constructor === Object){	
					if(this.picker.thirdPick.name){
						area='mainland:'+this.picker.firstPick.name+"/"+this.picker.secondPick.name+"/"+this.picker.thirdPick.name+':'+this.picker.thirdPick.id
					}else{
						area='mainland:'+this.picker.firstPick.name+"/"+this.picker.secondPick.name+':'+this.picker.secondPick.id
					}
				}else{
					area=this.ognArea
				}
				
				
				this.isSave=false;
				
				if(this.addrId){
					this.$request(api.editAddr,{
						area:area,
						mobile:this.from.mobile,
						name:this.from.name,
						addr:this.from.addr,
						defAddr:this.from.defAddr,
						addrId:this.addrId
					},"POST",1).then((res)=>{
						uni.navigateBack({
							delta:1
						})
						this.isSave=true;
					})
				}else{
					this.$request(api.saveAddr,{
						area:area,
						mobile:this.from.mobile,
						name:this.from.name,
						addr:this.from.addr,
						defAddr:this.from.defAddr
					},"POST",1).then((res)=>{
						uni.navigateBack({
							delta:1
						})
						this.isSave=true;
					})					
				}
			},
			switchChange(e){
				this.from.defAddr=e.detail.value
			}
		}
	}
	
	
</script>

<style lang="scss">
	page{
		background: #F5F5F5;
		.form{
			.ipt{
				padding:0 30rpx;
				height: 88rpx;
				line-height: 88rpx;
				display: flex;
				background: white;
				&.switch{
					font-size: 30rpx;
					view{
						flex: 1;
					}
					switch{
						position: relative;
						left: 36rpx;
					}
				}
				input{
					flex: 1;
					text-align: right;
					height: 88rpx;
					line-height: 88rpx;
					font-size: 30rpx;
				}
				text{
					color: #303336;
				}
				.label{
					font-size: 30rpx;
					text{
						color: #FF3931;
						margin-right: 10rpx;
					}					
				}
			}
			.textarea{
				flex-direction: column;
				height: 148rpx;
				textarea{
					height: 44rpx;
					line-height: 44rpx;
					width: 100%;
					font-size: 30rpx;
				}
			}
		}
		.save{
			width: 690rpx;
			height: 88rpx;
			margin: 40rpx auto;
			color: white;
			background: #F9353B;
			border-radius: 44rpx;
			font-size: 32rpx;
		}
	}
</style>
