const homeApi={
	getSlideshow:"smallbatch/sdb-b2-c-index/anon/getSlideshow",//首页轮播图
	getBrandList:"smallbatch/sdb-b2-c-brand/anon/getBrandList",//行业列表
	getBoxList:"smallbatch/sdb-b2-c-goods-cat/anon/getBoxList",//获取推荐盒型
	getRecommendGoods:"smallbatch/sdb-b2-c-index/anon/getRecommendGoods",//快速推荐
	getMyDiscountCoupon:"smallbatch/sdb-b2-c-coupons/getMyDiscountCoupon",//获取我的优惠券数据集
	useList:"smallbatch/sdb-b2-c-active-coupon/useList",//获取我的优惠券数据集
	getDiscountCoupon:"smallbatch/sdb-b2-c-coupons/anon/getDiscountCoupon",//获取限时优惠中所有的优惠券信息
	receiveCoupon:"smallbatch/sdb-b2-c-active-coupon/receiveCoupon/",//领取优惠券
	getDiscountCouponDetail:"smallbatch/sdb-b2-c-coupons/anon/getDiscountCouponDetail",//获取指定优惠券id对应的优惠券详细记录
	updBrandId:"smallbatch/sdb-b2-c-members/updBrandId",//修改用户所属行业
	pages:"smallbatch/sdb-b2-c-goods/anon/pages",//推荐列表
	getAllLabelTagsList:"smallbatch/sdb-weixin-tag/anon/getAllLabelTagsList",//获取所有的首页展示的商品标签
	getGoodsByType:"smallbatch/sdb-weixin-tag/anon/getGoodsByType",//根据首页标签分类获取商品列表
	addEnquiry:"smallbatch/sdb-hcdb-quote-info/add",//新增询价
	boxTypes:"smallbatch/sdb-hcdb-quote-info/anon/boxTypes",//盒型类型
	buyTypes:"smallbatch/sdb-hcdb-quote-info/anon/buyTypes",//采购类型
	deliveryDateTypes:"smallbatch/sdb-hcdb-quote-info/anon/deliveryDateTypes",//期望交付日期类型
	delEnquiry:"smallbatch/sdb-hcdb-quote-info/del/",//删除询价
	detailEnquiry:"smallbatch/sdb-hcdb-quote-info/detail/",//询价详情
	pagesEnquiry:"smallbatch/sdb-hcdb-quote-info/pages",//询价列表
	updEnquiry:"smallbatch/sdb-hcdb-quote-info/upd",//编辑询价
	getBrandListForPackaging: 'smallbatch/sdb-b2-c-brand/anon/getBrandListForPackaging', // 行业盒型列表
	getAllBoxTypes: 'smallbatch/sdb-b2-c-brand/anon/getAllBoxTypes', // 定制印刷所有盒型
	searchGoodForPrintOrDesign:"smallbatch/sdb-b2-c-search-record/anon/searchGoodForPrintOrDesign",//搜索我要包装模块和我要设计模块选择条件的商品列表
	searchGoodsBySearchBox:'smallbatch/sdb-b2-c-search-record/anon/searchGoodsBySearchBox', // 关键词搜索
	searchGoodsByHistory:'smallbatch/sdb-b2-c-search-record/searchGoodsByHistory', // 历史搜索
	searchGoodsByTag: 'smallbatch/sdb-b2-c-search-record/anon/searchGoodsByTag', // 标签搜索
	searchGoodsBySize: 'smallbatch/sdb-b2-c-search-record/anon/searchGoodsBySize',// 尺寸搜索
	searchGoodsByType: 'smallbatch/sdb-b2-c-search-record/anon/searchGoodsByType', // 分类搜索
	deleteSearchRecordByType: 'smallbatch/sdb-b2-c-search-record/deleteSearchRecordByType', //删除搜索记录
	getSearchRecordByMemberId: 'smallbatch/sdb-b2-c-search-record/getSearchRecordByMemberId', //搜索记录
	getAllGoodsTag: 'smallbatch/sdb-b2-c-search-record/anon/getAllGoodsTag', // 标签列表
	getBoxTypeBySearch: 'smallbatch/sdb-b2-c-search-record/anon/getBoxTypeBySearch', //盒型列表
	// 个性定制反馈
	getFacebackDictionaries: 'smallbatch/sdb-b2-c-faceback/anon/getFacebackDictionaries', //提交反馈
	insertFacebackMessage: 'smallbatch/sdb-b2-c-faceback/insertFacebackMessage',//反馈问题列表
	getActiveGoodsList: 'smallbatch/sdb-b2-c-index/anon/getActiveGoodsList',// 获取活动列表
	diyPages: 'smallbatch/sdb-b2-c-goods/anon/diyPages', // 爆款接口，新增查询字段
	activity: 'smallbatch/sdb-b2-c-active-coupon/anon/activity/',//活动优惠券
	receiveCouponList: 'smallbatch/sdb-b2-c-active-coupon/receiveCouponList',//领取优惠券
	diyTypeList: 'smallbatch/sdb-b2-c-index/anon/diyTypeList',//定制分类列表
	logo: 'smallbatch/sdb-b2-c-business/anon/info',//商家logo
	getDiySlideshow: 'smallbatch/sdb-b2-c-index/anon/getDiySlideshow',//商家轮播图
	getDiyScenariosResList: 'smallbatch/custom-scenarios/anon/getDiyScenariosResList', // 获取定制场景列表接口
	getDiyScenariosGoods: 'smallbatch/custom-scenarios/anon/getDiyScenariosGoods', // 获取定制酒场景商品列表
	getDiyActiveGoods: 'smallbatch/sdb-b2-c-index/anon/getDiyActiveGoods' ,//获取定制酒活动列表页商品
	userCheck: 'smallbatch/sdb-b2-c-members/anon/userCheck',//登录是否有效

}
export default homeApi