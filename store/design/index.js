const designApi = {
	// 设计风格列表
	getDesignStyleList: "smallbatch/design/anon/designStyleList",
	// 计算设计订单价格
	calcDesignOrderPrice: "smallbatch/design/calcDesignOrderPrice",
	// 提交设计需求订单
	postDesignOrder: "smallbatch/design/postDesignOrder",
	// 支付订单
	payDesignOrder: "smallbatch/design/payOrder",
	// 设计商品明细
	toDesignDetail: "smallbatch/design/toDesignDetail",
	// 设计商品明细
	anonToDesignDetail: "smallbatch/design/anon/toDesignDetail",
	// 设计方向
	designTypeList: "smallbatch/design/anon/designTypeList",
	// 检查用户是否注册
	checkUser: "smallbatch/sdb-b2-c-members-ssq/checkUser",
	// 注册用户
	designRegUser: "smallbatch/sdb-b2-c-members-ssq/regUser",
	// 创建并上传合同
	creatContract: "smallbatch/sdb-b2-c-members-ssq/creatContract",
	// 设计协议
	designLicense: "smallbatch/sdb-base-setting/anon/designLicense",
	// 获取明星设计师信息
	getDesignStarAndWork: "smallbatch/sdb-design-star/anon/getDesignStarAndWork",
	// 获取明星设计师作品信息
	getDesignStarWork: "smallbatch/sdb-design-star/anon/getDesignStarWork",
	// 获取作品列表
	getWorks: "smallbatch/sdb-b2-c-winecustom-works/pages",
	// 删除作品
	batchDel: "smallbatch/sdb-b2-c-winecustom-works/batchDel",
	// 判断是否能新增/删除/替换商品
	editWorkCheck: "smallbatch/sdb-b2-c-winecustom-works/anon/editWorkCheck"
}
export default designApi