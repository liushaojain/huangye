const api={
	// 订单
	orderList:'smallbatch/sdb-b2-c-orders/getAllMyOrdersByType',//通过订单类型获取订单列表
	orderDetail: 'smallbatch/sdb-b2-c-orders/getMyOrderItem', // 订单详情信息
	orderCancelReason: 'smallbatch/sdb-b2-c-orders/anno/cancelReasonList', // 订单取消原因
	orderCancel: 'smallbatch/sdb-b2-c-orders/cancelOrder', // 订单取消
	orderDel: 'smallbatch/sdb-b2-c-orders/deleteOrder', // 订单删除
	indexNums: 'smallbatch/sdb-b2-c-orders/getMessageByMyHomePage', // 个人中心首页数量
	productionSchedule: 'smallbatch/sdb-b2-c-orders/getProductionSchedule', // 生产进度
	payTypes: 'smallbatch/sdb-b2-c-checkOut/payTypes', // 获取支付类型
	createOrder: 'smallbatch/sdb-b2-c-checkOut/createOrder', // 创建订单
	checkoutAfterOrder: 'smallbatch/sdb-b2-c-orders/checkoutAfterOrder', // 已提交的订单获取数据
	downloadContract: 'smallbatch/sdb-b2-c-members-ssq/downloadContract', //合同下载
	payOrder: 'smallbatch/design/payOrder', //支付订单
	creditApply: 'smallbatch/sdb-b2-c-checkOut/creditApply', // 申请特批
	getLogistics:'smallbatch/sdb-b2-c-delivery/anon/getLogistics',//查看物流列表
	getLogisticsTraces:'smallbatch/sdb-b2-c-delivery/anon/getLogisticsTraces',
	getTrackList:'smallbatch/sdb-b2-c-delivery/anon/getTrackList',
	businessInfo:'smallbatch/sdb-b2-c-business/anon/info', // 商家信息
	// 优惠券
	myCoupon: 'smallbatch/sdb-b2-c-coupons/getMyDiscountCoupon', // 个人中心我的优惠券列表
	getNowConformToConditionCoupons: 'smallbatch/sdb-b2-c-coupons/getNowConformToConditionCoupons', // 当前适用优惠券
	orderUseList: "smallbatch/sdb-b2-c-active-coupon/orderUseList", //订单优惠券
	// 确认订单
	orderGoodsList: 'smallbatch/sdb-b2-c-checkOut/goodsList', // 订单商品列表
	shippingFreight:'smallbatch/sdb-b2-c-checkOut/shippingFreight', // 运费计算
	orderPrice: 'smallbatch/sdb-b2-c-checkOut/orderPrice', // 确认订单计算订单价格
	// 购物车
	cartList: 'smallbatch/sdb-b2-c-wxcart/pages', // 购物车列表
	cartTotalPrice: 'smallbatch/sdb-b2-c-wxcart/totalPirce', // 勾选一个购物车商品获取价格
	cartItemInfo: 'smallbatch/sdb-b2-c-wxcart/info', // 更新购物车中一个信息
	cartNumChange: 'smallbatch/sdb-b2-c-wxcart/updNums', // 修改购物车中商品数量
	cartDel: 'smallbatch/sdb-b2-c-wxcart/delete', // 购物车删除
	// 立即购买
	getGoodsListV2: "smallbatch/sdb-b2-c-winecustom-works/goodsList",//订单商品列表（立即购买）
	orderPriceV2: "smallbatch/sdb-b2-c-checkOut/orderPriceV2",//订单运费均摊(立即购买)
	shippingFreightV2: "smallbatch/sdb-b2-c-checkOut/shippingFreightV2",//运费计算(立即购买)
	createOrder: "smallbatch/sdb-b2-c-checkOut/createOrder",//创建订单(立即购买)
	// 申请开票
	getApplyForMakeOutAnInvoiceList: 'smallbatch/sdb-b2-c-orders/getApplyForMakeOutAnInvoiceList', // 发票列表
	applyForMakeOutAnInvoice: 'smallbatch/sdb-b2-c-orders/applyForMakeOutAnInvoice', // 设计订单申请开票
	// 确认设计图
	selectList: 'smallbatch/sdb-design-design-info/selectList',//设计列表
	versionFeedbackOrConfirm: 'smallbatch/sdb-design-design-info/versionFeedbackOrConfirm',//版本确认或者提交反馈
	
	// 确认收货
	getConfirmReceiptListByOrderId: 'smallbatch/sdb-b2-c-orders/getConfirmReceiptListByOrderId',//收货信息列表,
	updateConfirmReceipt: 'smallbatch/sdb-b2-c-orders/updateConfirmReceipt',// 确认收货
	// diy作品
	workList: 'smallbatch/sdb-b2-c-diy-works/selectList',//作品列表
	setWorkStatus: 'smallbatch/sdb-b2-c-diy-works/setWorkStatus',//修改作品状态
	delAllWorks: 'smallbatch/sdb-b2-c-diy-works/delAllWorks',//删除失效作品
	// 订单投诉
	overdueComplaintReady: 'smallbatch/sdb-b2-c-member-complaint/overdueComplaintReady', // 提交交期投诉准备
	insertOverdueComplaint: 'smallbatch/sdb-b2-c-member-complaint/insertOverdueComplaint', // 提交交期投诉
	getComplaintReady: 'smallbatch/sdb-b2-c-member-complaint/getComplaintReady', //获取交期投诉准备和品质投诉准备
	getComplaintPost: 'smallbatch/sdb-b2-c-member-complaint/getComplaintPost', // 投诉详情
	updateComplaintPost: 'smallbatch/sdb-b2-c-member-complaint/updateComplaintPost', // 采纳/拒绝
	qualityComplaintReady: 'smallbatch/sdb-b2-c-member-complaint/qualityComplaintReady', // 提交品质投诉准备
	insertQualityComplaint: 'smallbatch/sdb-b2-c-member-complaint/insertQualityComplaint', // 提交品质投诉
	// 设计订单转印刷
	ajaxInformDesigner:'smallbatch/sdb-design-design-info/ajaxInformDesigner', // 我要印刷
	letterInfo: 'smallbatch/sdb-design-design-info/getInfo', // 确认函详情
	confirmReject: 'smallbatch/sdb-design-design-info/confirmReject', // 提交确认函
	
	
	getProducesByType: 'smallbatch/sdb-b2-c-orders/anon/getProducesByType',//生产进度轮播
	getProduceProgressInfo: 'smallbatch/sdb-b2-c-orders/anon/getProduceProgressInfo',//生产进度
	proofingApply: 'smallbatch/sdb-b2-c-printing/proofingApply',//我要打样
	ApplyPrinting: 'smallbatch/sdb-b2-c-printing/ApplyPrinting',//我要印刷
	
	comment: 'smallbatch/sdb-b2-c-orders/comment',//订单评价
	commentCount: 'smallbatch/sdb-b2-c-orders/commentCount',//订单评价数量
	
}
export default api