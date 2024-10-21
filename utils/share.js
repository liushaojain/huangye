export default {
	onShareAppMessage(res) { //发送给朋友
		return {
			title: "3分钟搞定包装定制，省时，省力，省心！",
			imageUrl: "https://xpl-smallbatch.gdoss.xstore.ctyun.cn/dzj/icon/share.png",
			path: "/pages/home/index"
		}
	},
	onShareTimeline(res) {//分享到朋友圈
		return {
			title: "3分钟搞定包装定制，省时，省力，省心！",
			imageUrl: "https://xpl-smallbatch.gdoss.xstore.ctyun.cn/dzj/icon/share.png",
			path: "/pages/home/index"
		}
	}    
}