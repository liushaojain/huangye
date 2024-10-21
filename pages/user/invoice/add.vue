<template>
	
	<view>
		<view class="sizeBox">
			<view class="size marginT20">
				<text class="label">
					<text>*</text>开具类型
				</text>
				<view class="ipt" @click="checkBox(1)">
					<input type="text" placeholder="请选择" v-model="form.taxIssuedType" disabled="true">
					<text class="iconfont icon_label_arrow_right">&#xeaab;</text>
				</view>
			</view>
			<view class="size marginT20" v-if="invoiceType==3||invoiceType==2">
				<text class="label">
					<text>*</text>发票类型
				</text>
				<view class="ipt" @click="checkBox(2)">
					<input type="text" placeholder="请选择" v-model="form.taxType" disabled="true">
					<text class="iconfont icon_label_arrow_right">&#xeaab;</text>
				</view>
			</view>
			<view class="size">
				<text class="label">
					<text>*</text>发票抬头
				</text>
				<view class="ipt">
					<input type="text" v-model="form.taxTitle" placeholder="请输入">
				</view>
			</view>
			
			<view class="size" v-if="invoiceType==3||invoiceType==2">
				<text class="label">
					<text>*</text>税号
				</text>
				<view class="ipt">
					<input type="text" v-model="form.taxCompanyTaxNo" placeholder="请输入">
				</view>
			</view>
			
			<view class="size" v-if="invoiceType==3">
				<text class="label">
					<text>*</text>单位地址
				</text>
				<view class="ipt">
					<input type="text" v-model="form.taxCompanyAddress" placeholder="请输入">
				</view>
			</view>	
			
			<view class="size" v-if="invoiceType==3">
				<text class="label">
					<text>*</text>电话号码
				</text>
				<view class="ipt">
					<input type="number" v-model="form.taxCompanyPhone" placeholder="请输入">
				</view>
			</view>	
			
			<view class="size" v-if="invoiceType==3">
				<text class="label">
					<text>*</text>开户银行
				</text>
				<view class="ipt">
					<input type="text" v-model="form.taxCompanyBank" placeholder="请输入">
				</view>
			</view>
			
			<view class="size" v-if="invoiceType==3">
				<text class="label">
					<text>*</text>银行账户
				</text>
				<view class="ipt">
					<input type="number" v-model="form.taxCompanyBankNo" placeholder="请输入">
				</view>
			</view>
			
			<view class="size marginT20 switch">
				<view class="label flex1">设为默认发票</view>
				<!-- <view> -->
					<switch :checked="form.defTax" @change="switchChange" color="#F9353B"/>
				<!-- </view> -->
			</view>
		</view>
		
		
		<button type="button" class="next" @click="save">保存</button>
		<checkselect v-if="selectShow" name="name" :checked="form.taxIssuedType" :selectShow="selectShow" :select="select" @transfer="getchecked"></checkselect>
		<checkselect v-if="selectShow1" name="name" :checked="form.taxType" :selectShow="selectShow" :select="select1" @transfer="getchecked1"></checkselect>
	</view>
</template>

<script>
	import checkselect from "@/components/checkselect/index.vue"
	import api from "@/store/account/index.js"
	
	export default {
		data(){
			return{
				form:{
					defTax: false,
					id: "",
					memberId: "",
					taxCompanyAddress: "",
					taxCompanyBank: "",
					taxCompanyBankNo: "",
					taxCompanyLicense: "",
					taxCompanyPhone: "",
					taxCompanyTaxNo: "",
					taxIssuedType: "",
					taxIssuedVal:"",
					taxTitle: "",
					taxType: "",
					taxVal: ""
				},
				hint:{
					taxIssuedType:{msg:"请选择开具类型",type:1},
					taxType:{msg:"请选择发票类型",type:2},
					taxTitle:{msg:"请填写发票抬头",type:1},
					taxCompanyTaxNo:{msg:"请填写税号",type:2},
					taxCompanyAddress:{msg:"请填写单位地址",type:3},
					taxCompanyPhone:{msg:"请填写电话号码",type:3},
					taxCompanyBank:{msg:"请填写开户银行",type:3},
					taxCompanyBankNo:{msg:"请填写银行账户",type:3},
				},
				selectShow:false,
				selectShow1:false,
				select:[],
				select1:[],
				invoiceType:1,
				invoice:"",
				fromPage: ''
			}
		},
		components:{
			checkselect
		},
		onLoad(e) {
			this.fromPage = e.fromPage
			let that=this;
			this.$request(api.taxIssuedTypes,"","GET").then(res=>{
				that.select=res.data;
				if(!e.id){
					that.form.taxIssuedType=res.data[0].name;
					that.form.taxIssuedVal=res.data[0].value;
				}
			})
			
			this.$request(api.taxTypes,"","GET").then(res=>{
				that.select1=res.data;
				
				if(e.id){
					that.form.id=e.id;
					that.$request(api.discountsDetail+that.form.id,"","GET").then(res=>{
						if(res.data.taxIssuedTypeName=="个人"){
							that.invoiceType=1;
						}else if(res.data.taxTypeName=="增值税普通发票"){
							that.invoiceType=2
						}else if(res.data.taxTypeName=="增值税专用发票"){
							that.invoiceType=3
						}
						for(let index in that.form){
							if(res.data[index]){
								that.form[index]=res.data[index]							
							}
						}
						that.form.taxIssuedType=res.data.taxIssuedTypeName
						that.form.taxIssuedVal=res.data.taxIssuedType;
						that.form.taxType=res.data.taxTypeName;
						that.form.taxVal=res.data.taxType;
					})
				}else{				
					that.form.taxType=res.data[0].name;
					that.form.taxVal=res.data[0].value;
				}
			})
			
		},
		methods:{
			checkBox(type){
				if(type==1){
					this.selectShow=true;
				}else{					
					this.selectShow1=true;
				}
			},
			getchecked(e){
				this.selectShow=false;
				if(e){					
					this.form.taxIssuedType=e.name;
					this.form.taxIssuedVal=e.value;
					if(e.name=="个人"){
						this.invoiceType=1
					}else if(e.name=="企业"){
						if(this.form.taxType=="增值税普通发票"){
							this.invoiceType=2
						}else if(this.form.taxType=="增值税专用发票"){
							this.invoiceType=3
						}
					}
				}
			},
			getchecked1(e){
				this.selectShow1=false;
				if(e){
					this.form.taxType=e.name;
					this.form.taxVal=e.value;
					if(this.form.taxType=="增值税普通发票"){
						this.invoiceType=2
					}else if(this.form.taxType=="增值税专用发票"){
						this.invoiceType=3
					}
				}
			},
			save(){
				let hint=this.hint;
				let postData={};
				for(let index in hint){
					if(this.invoiceType>=hint[index].type){
						if(this.form[index]==""){
							uni.showToast({
								title:hint[index].msg,
								icon:"none"
							})
							return false
						}
						if(index=="taxType"){
							postData[index]=this.form.taxVal
						}else if(index=="taxIssuedType"){
							postData[index]=this.form.taxIssuedVal
						}else{
							postData[index]=this.form[index]
						}
					}
				}
				postData.defTax=this.form.defTax;
				if(this.form.id){
					postData.id=this.form.id;
					this.$request(api.discountsUpd,postData,"POST").then(res=>{
						if(res.code==200){
							let pages = getCurrentPages();
							let prevPage = pages[pages.length - 2]; //上一个页面
							if (!this.fromPage) {
								prevPage.$vm.addressList = []
								prevPage.$vm.postData.page = 1
								prevPage.$vm.mbrAddrList();
							} else {
								prevPage.$vm.invoiceList = []
								prevPage.$vm.page = 1
								prevPage.$vm.getInvoiceList();
							}
							uni.navigateBack()
						}
					})	
				}else{
					this.$request(api.discountsAdd,postData,"POST").then(res=>{
						if(res.code==200){
							let pages = getCurrentPages();
							let prevPage = pages[pages.length - 2]; //上一个页面
							if (!this.fromPage) {
								prevPage.$vm.addressList = []
								prevPage.$vm.postData.page = 1
								prevPage.$vm.mbrAddrList();
							} else {
								prevPage.$vm.invoiceList = []
								prevPage.$vm.page = 1
								prevPage.$vm.getInvoiceList();
							}
							uni.navigateBack()
						}
					})					
				}
			},
			switchChange(e){
				this.form.defTax=e.detail.value;
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #f5f5f5;
	}
	.flex1{
		flex: 1;
	}
	.marginT20{
		margin-top: 20rpx;
	}
	.switch{
		font-size: 30rpx;
		view{
			flex: 1;
		}
		switch{
			position: relative;
			left: 36rpx;
		}
	}
	.sizeBox{
		.size{
			background: white;
			padding: 0 20rpx;
			height: 88rpx;
			line-height: 88rpx;
			border-bottom: 1rpx solid #F4F5F6;
			display: flex;
			font-size: 30rpx;
			.label{
				width: 288rpx;
				text{
					color: #FF3931;
				}
			}
			.ipt{
				flex: 1;
				display: flex;
				
				input{
					width: 460rpx;
					height: 88rpx;
					text-align: right;
					margin-right: 10rpx;
					font-size: 30rpx;
				}
				text{
					color: #60656C;
				}
			}
			&.borderN{
				border: none;
			}
		}
	}
	.next{
		position: fixed;
		bottom: 30rpx;
		left: 30rpx;
		right: 30rpx;
		height: 88rpx;
		text-align: center;
		line-height: 88rpx;
		color: white;
		background: #F9353B;
		border-radius: 44rpx;
		font-size: 32rpx;
	}
	
</style>
