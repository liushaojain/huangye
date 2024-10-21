<template>
	<view class="order-page">
		<view class="order-list-type">
			<view class="order-list-type-item" 
				:class="currentType == item.id ? 'active' : ''" 
				v-for="item in orderTypes" 
				:key="item.id" 
				@click="changeOrderType(item.id)">
				{{item.label}}
				<image class="img" v-if="currentType == item.id" :src="imgBaseUrl+'img_selectmark@2x.png'" mode="aspectFit"></image>
			</view>
		</view>
		<template v-if="orderList.length > 0">
			<view class="order-list">
				<view class="order-list-item" v-for="(item, index) in orderList" :key="index">
					<order-list-item 
						:ref="'item_' + index"
						:item="item"
						:index="index"
						@showMore="handleShowMore"
						@showCancelDialog="handleShowCancelDialog"
						@deleteOrder="handleDelete"
						@applyInvoice="applyInvoice"
						@error="errorHandle($event, index)"
						@errorPart="errorPartHandle($event, index)"
						@showDialog="showDialogHandle"
						@printNow="printNowHandle"
					></order-list-item>
				</view>
			</view>
		</template>
		<template v-if="isLoaded && orderList.length == 0">
			<view class="order-empty">
				<image :src="imgBaseUrl+'noproductList.png'" ></image>
				<view>暂无订单</view>
			</view>
		</template>
		<uni-load-more :status="status" v-show="status != 'more' && orderList.length > 0"></uni-load-more>
		<cancel-order ref="cancelOrder" v-show="isShowCancel" @cancelSure="handleCancelSure" @close="handleClose" @move="moveHandle"></cancel-order>
		<turnDialog ref="turnDialog" v-show="isShowTurnDialog" @showDialog="showDialogHandle" :proofing="proofing"></turnDialog>
	</view>
</template>

<script>
	import orderListItem from './components/orderListItem.vue'
	import cancelOrder from './components/cancelOrder.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import api from "@/store/order/index.js"
	import turnDialog from './components/turnDialog.vue'
	const defaultUrl = "https://xpl-smallbatch.oos-gz.ctyunapi.cn/icon/default4.png"
	import orderApi from "@/store/order/index.js"
	export default {
		data(){
			return {
				page:1,
				pagesize:10,
				orderTypes:[{
					id:1,
					label: '全部'
				},{
					id:2,
					label:'待付款'
				},{
					id:8,
					label:'待发货'
				},{
					id:3,
					label:'待收货'
				},{
					id:4,
					label:'已完成'
				}],
				currentType: "1",
				orderList:[],
				isShowCancel:false,
				currentId:'',
				status:"more",
				isLoading:false,
				isLoaded:false,
				isShowTurnDialog: false,
				imgBaseUrl: this.imgBaseUrl,
				proofing: false,
			}
		},
		watch:{
			currentType(val){
				this.onRefrash()
			}
		},
		onShow() {
			let pages = getCurrentPages();
			let curPage = pages[pages.length - 1];
			if(curPage.data.orderId){
				for(let item of this.orderList){
					if(item.orderId==curPage.data.orderId){
						item.commentsStatus = 1;
						curPage.data.orderId = "";
					}
				}
			}
		},
		components:{orderListItem, cancelOrder, uniLoadMore, turnDialog},
		onLoad(option) {
			this.currentType = option.type;
			this.onRefrash()
		},
		onUnload() {
			uni.switchTab({
				url: "/pages/user/index"
			})
		},
		onReachBottom() {
			if (this.isShowCancel) return
			if (!this.isLoading) {
				this.isLoading = true
				this.status = 'loading'
				this.page++
				this.getOrderList()
			}
		},
		methods:{
			async getOrderList(){
				let result = await this.orderListFun()
				this.isLoaded = true;
				if(this.page==1){
					this.orderList = result.records
				}else{
					this.orderList = this.orderList.concat(result.records)
				}
				if (result.records.length < this.pagesize) {
					this.isLoading = true
					this.status = 'moMore'
				} else {
					this.isLoading = false
				}
			},
			orderListFun(){
				return new Promise((resolve, reject) => {
					this.$request(api.orderList, {
						page:this.page,
						pagesize: this.pagesize,
						type: this.currentType
					}, 'GET', '', 1).then(res => {
						resolve(res.data)
					})
				})
			},
			changeOrderType(id){
				this.currentType = id
			},
			handleShowCancelDialog(val){
				this.currentId = val.orderId
				this.isShowCancel = true
				this.$refs.cancelOrder.reasons = val.reasonList
			},
			handleClose(){
				this.isShowCancel = false
			},
			handleCancelSure(val){
				this.$request(api.orderCancel, {
					orderId: this.currentId,
					reasonDesc: val.otherReason,
					reasonType: val.checkReason
				}, 'POST', '', 1).then(res => {
					if (res.code == 200) {
						this.$refs.cancelOrder.checkReason = ''
						this.$refs.cancelOrder.otherReason = ''
						this.isShowCancel = false
						uni.showToast({
							title:"取消成功"
						})
						setTimeout(() => {
							this.onRefrash()
						}, 2000)
					}
				})
			},
			requestDelFun(orderId){
				return new Promise((resolve, reject) => {
					this.$request(api.orderDel, {orderId: orderId}, 'GET', '', 1).then(res => {
						if (res.code == 200) {
							resolve()
						}
					})
				})
			},
			handleDelete(e){
				uni.showModal({
					title:`删除后不能恢复，确定删除该订单？`,
					success: async (res) => {
						if (res.confirm) {
							await this.requestDelFun(e)
							uni.showToast({
								title:"删除成功"
							})
							setTimeout(() => {
								this.onRefrash()
							}, 2000)
						}
					},
					fail: (err) => {
						
					}
				})
			},
			handleShowMore(e){
				this.orderList.forEach((item, index) => {
					if (index == e.index) {
						this.$refs[`item_${e.index}`][0].changeShowMore(e.value)
					} else {
						this.$refs[`item_${index}`][0].changeShowMore(false)
					}
				})
			},
			onRefrash(){
				this.page = 1
				this.isLoaded = false
				this.orderList = []
				this.getOrderList()
			},
			applyInvoice(e){
				uni.showModal({
					title:`开具发票后，设计订单转印刷时，设计押金不能抵扣印刷订单金额`,
					success: (res) => {
						if (res.confirm) {
							this.$request(api.applyForMakeOutAnInvoice,{orderId: e},"POST","",1).then((res)=>{
								if(res.code == 200) {
									uni.showToast({
										title:"申请成功"
									})
									setTimeout(() => {
										this.onRefrash()
									}, 1000)
								}
							})
						}
					},
					fail: (err) => {
						
					}
				})
				
			},
			errorHandle(e, index){
				this.$set(this.orderList[index].myOrdersItems[e.index], 'imageUrl', this.imgBaseUrl+"goods_avatar.png")
			},
			errorPartHandle(e, index) {
				this.$set(this.orderList[index].myOrdersItems[e.index].relevanceParts[e.part_index], 'imageUrl', this.imgBaseUrl+"goods_avatar.png")
			},
			// 点击我要印刷 更改designToPrint为1，此时进入等待设计师环节
			showDialogHandle(e){
				// if (!e.flag) {
				// 	this.$set(this.orderList[e.index], 'designToPrint', 1)
				// }
				this.isShowTurnDialog = e.flag
				if (e.flag) {
					this.proofing=e.proofing?true:false;
					this.$refs.turnDialog.index = e.index;
				}
				if(e.designOrderId){
					this.getOrderDetail(e.designOrderId,e.index)
				}
			},
			printNowHandle(e){
				let postData= {};
				if(this.orderList[e.index].selectValues){
					postData = {
						orderId: e.orderId,
						select_configs: {
							meal_vals: this.orderList[e.index].selectValues
						},
						quantity: this.orderList[e.index].orderNum
					}
				}else{
					postData = {
						orderId: e.orderId
					}
				}
				if(e.proofing){
					postData.proofing = e.proofing;
				}
				
				uni.navigateTo({
					url:'/pages/product/index?productId=' + e.productId + '&isPrintNow=true',
					events: {
						// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
						acceptDataFromOpenedPage: function(data) {
						},
						someEvent: function(data) {
						}
					},
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('acceptDataFromOpenerPage', {
							data: postData
						})
					}
				})
			},
			getOrderDetail(orderId,index){
				let params = {
					orderId: orderId
				}
				
				this.$request(orderApi.orderDetail, params, 'GET', '', 1).then(res => {
					let data= res.data;
					this.orderList[index] = data;
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './style/order.scss'
</style>
<style>
	page{background-color: #f5f5f5;}
</style>
