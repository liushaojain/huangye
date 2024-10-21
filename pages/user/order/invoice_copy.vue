<template>
	<view class="invoice-page">
		<view class="invoice-warn flex-start">
			<text class="iconfont iconicon_info_warning_tips blueFont"></text>
			<text class="warn-text blueFont">开具发票后，设计订单转印刷时，设计押金不能抵扣印刷订单金额</text>
		</view>
		<view class="invoice-detail">
			<view class="flex-between">
				<view>订单号</view>
				<view style="color: #60656C;">{{orderId}}</view>
			</view>
			<!-- <view class="flex-between">
				<view>开票金额</view>
				<view class="redFont">¥1200.00 <text class="iconfont iconicon_info_tips_line" style="color: #93989F;margin-left: 12rpx;" @click="isShowDialog = true"></text></view>
			</view> -->
		</view>
		<view class="invoice-add flex-between">
			<view>选择发票信息</view>
			<view class="blueFont">+新增发票</view>
		</view>
		<template v-if="invoiceList.length > 0">
			<view class="invoice-list">
				<view class="invoice-item flex-between itemsCenter" v-for="(item, index) in invoiceList" :key="index" @click="checkCurrent(item)">
					<view class="item-left flex-start">
						<label class="radio flex-around itemsCenter">
							<radio :value="item.id" :checked="selectInvoice.id == item.id" color="#1F90FF" style="transform: scale(0.7);"></radio>
						</label>
						<view class="item-icon flex-around itemsCenter" :class="item.taxIssuedTypeName=='个人' ? 'green' : 'blue'"><text class="iconfont" :class="item.taxIssuedTypeName=='个人' ? 'iconicon_fapiao_geren' : 'iconicon_fapiao_gongsi'"></text></view>
						<view class="item-content">
							<view class="ellipsis item-title">{{item.taxTitle}}</view>
							<view class="invoice-no">
								<text class="blueFont alignCenter def-btn" v-if="item.defTax">默认</text>
								<text v-if="item.taxCompanyTaxNo">税号：{{item.taxCompanyTaxNo}}</text>
							</view>
						</view>
					</view>
					<text class="iconfont iconicon_edit" style="font-size: 32rpx;color: #60656C;" @click.stop="editInvoice(item.id)"></text>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="empty">
				<image :src="imgBaseUrl+'/icon/noInvoice@3x.png'"></image>
				<view>暂无发票，请先新增发票</view>
			</view>
		</template>
		<view class="apply-btn flex-around itemsCenter">
			<view class="alignCenter" @click="submitApply">提交申请</view>
		</view>
		<!-- <view class="invoice-explain-dialog" v-show="isShowDialog">
			<view class="dialog-content">
				<view class="dialog-title alignCenter">开票金额说明</view>
				<view class="dialog-text flex-between"><view class="point"></view><view>开票金额为消费者实付款金额，折扣、优惠券等不在开票范围内。</view></view>
				<view class="dialog-text flex-between"><view class="point"></view><view>如订单发生退货退款，开票金额将变更为最终实付款金额。</view></view>
				<view class="dialog-bottom blueFont alignCenter" @click="isShowDialog = false">知道了</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import api from "@/store/order/index.js"
	export default{
		data(){
			return{
				pagesize:10,
				page:1,
				allPage:"",
				invoiceList:[],
				memberId:'',
				orderId:'',
				selectInvoice:null,
				imgBaseUrl: this.imgBaseUrl
			}
		},
		onReachBottom() {
			if(this.allPage>this.page){
				this.page++;
				this.getInvoiceList()				
			}
		},
		onLoad(option) {
			this.orderId = option.orderId
			this.memberId = option.memberId
			this.getInvoiceList()
		},
		methods:{
			getInvoiceList(){
				this.$request(api.getApplyForMakeOutAnInvoiceList,{orderId: this.orderId, memberId: this.memberId, page:this.page, pagesize: this.pagesize},"GET","",1).then((res)=>{
					this.allPage=res.data.listInvoice.pages
					this.invoiceList = this.invoiceList.concat(res.data.listInvoice.records);
					if (this.selectInvoice) return
					this.selectInvoice = this.invoiceList.filter(item => item.defTax)[0]
				})
			},
			editInvoice(id){
				uni.navigateTo({
					url:"/pages/invoice/add?id=" + id + '&fromPage=userInvoice'
				})
			},
			checkCurrent(item){
				this.selectInvoice = item
			},
			submitApply(){
				this.$request(api.applyForMakeOutAnInvoice,{orderId: this.orderId, taxinfoId: this.selectInvoice.id},"GET","",1).then((res)=>{
					uni.showToast({
						title:"已提交，等待系统开票"
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './style/invoice_copy.scss'
</style>
<style>
	page{background-color: #f5f5f5;}
</style>

