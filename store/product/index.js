const productApi = {
	getRecommendGoods: "smallbatch/sdb-b2-c-index/anon/getRecommendGoods", //快速推荐
	ratePags: "smallbatch/sdb-b2-c-goods/anon/ratePags", //相关商品列表
	details: "smallbatch/sdb-b2-c-products/anon/details", //商品详情
	quotes: "smallbatch/sdb-b2-c-products/anon/quotes", //商品价格计算
	combinations: "smallbatch/sdb-b2-c-products/anon/combinations", //配件总价计算
	goodsAdjunct: "smallbatch/sdb-b2-c-products/anon/goodsAdjunct", //配件单价计算
	goodsTotalPrice: "smallbatch/sdb-b2-c-products/anon/goodsTotalPrice", //商品套餐总价计算
	recommendGoods: "smallbatch/sdb-b2-c-products/anon/diyRecommendGoods", //配件列表
	supportList: "smallbatch/sdb-b2-c-products/anon/supportList", //内托列表
	addCart: "smallbatch/sdb-b2-c-wxcart/addCart", //加入购物车
	selectList: "smallbatch/sdb-b2-c-order-items/selectList", //获取订单商品
	diyGoodsLicense: 'smallbatch/sdb-base-setting/anon/diyGoodsLicense', //DIY商品设计协议
	kaGoodsLicense: 'smallbatch/sdb-base-setting/anon/kaGoodsLicense', //卡盒商品协议	
	parts: 'smallbatch/sdb-b2-c-products/anon/parts', //VC商品部件
	partsQuotes: 'smallbatch/sdb-b2-c-products/anon/partsQuotes', //vc商品报价
	getLinkNum: 'smallbatch/sdb-b2-c-products/anon/getLinkNum', //获取拼连数
	getSalesRule: 'smallbatch/sdb-b2-c-products/getSalesRule', //促销活动价格
	userLicense: 'smallbatch/sdb-base-setting/anon/userLicense', //用户隐私协议
	recommendedListByGoodsId: 'smallbatch/sdb-b2-c-wine-cap/anon/recommendedListByGoodsId',//定制酒配件
	goodsTemplateList: "smallbatch/sdb-b2-c-winecustom-works/anon/goodsTemplateList",//模板选择
	wineBottles: "smallbatch/sdb-b2-c-winecustom-works/anon/wineBottles",//内装瓶型列表
	saveWorks: "smallbatch/sdb-b2-c-winecustom-works/saveWorks",//保存作品
	getListByGoods: "smallbatch/sdb-b2-c-active-coupon/anon/getListByGoodsId/",//优惠券
	worksInfo: 'smallbatch/sdb-b2-c-winecustom-works/anon/worksInfo/',//作品包含的商品
	getPriceByNumAndProductId: 'smallbatch/sdb-b2-c-winecustom-works/anon/getPriceByNumAndProductId',//商品报价
	replaceWork: 'smallbatch/sdb-b2-c-winecustom-works/anon/replaceWork',//修改商品
}
export default productApi
