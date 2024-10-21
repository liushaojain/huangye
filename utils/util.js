import designApi from '@/store/design/index.js'
import $request from '@/utils/ajax.js'
let basehost ="";
let diyHost ="";
if(process.env.NODE_ENV === 'development'){
	if(process.env.isformal=='1'){
		basehost="http://47.119.182.138:88/"
	}else if(process.env.isformal=='2'){
		basehost="http://47.119.182.138:88/"
	}else if(process.env.isformal=='3'){
		basehost="http://47.119.182.138:88/"
	}else{
		basehost="http://47.119.182.138:88/"
	}
}else{
	if(process.env.isformal=='3'){
		basehost="http://47.119.182.138:88/"
	}else{
		basehost = 'http://47.119.182.138:88/'		
	}
}

export {basehost}
export {diyHost}
export function moneyFormat(val) {
  if (!val) return '0.00'
  let value = val.toString()
  const i = Math.floor(value)
  const d = (value.split('.')[1] && (value.split('.')[1].length == 1 ? value.split('.')[1] + '0' : (value.split('.')[1].length > 2 ? value.split('.')[1].slice(0, 2) : value.split('.')[1]))) || '00'
  return i.toLocaleString('en-US') + '.' + d
}

export function confirmReceipt(orderId){
	uni.navigateTo({
		url:'/pages/user/order/receipt?orderId=' + orderId
	})
}

export function seeSchedule(orderId){
	uni.navigateTo({
		url:"/pages/user/order/schedule?orderId=" + orderId
	})
}

export function seeLogistics(orderId){
	uni.navigateTo({
		url:"/pages/user/order/viewLogistics?orderId=" + orderId
	})
	// uni.showToast({
	// 	title:"开发中，敬请期待！",
	// 	icon:"none"
	// })
}

export function goEvaluate(orderId){
	uni.navigateTo({
		url:"/pagesA/evaluate/index?orderId=" + orderId
	})
}

export function buyAgain(type, goodsId,orderId){
	// uni.showToast({
	// 	title:"开发中，敬请期待！",
	// 	icon:"none"
	// })
	// return
	if(type=='设计'){
		// uni.navigateTo({
		// 	url:"/pages/advisory/design/routine?productId="+goodsId
		// })	
	}else{
		uni.navigateTo({
			url:"/pages/product/details?goodsId="+goodsId+"&orderId="+orderId
		})					
	}
}

export function toSignature(orderId){
	uni.navigateTo({
		url: `/pages/sign/index?orderNo=${orderId}`
	})
}

export function checkUser(orderNo){
	$request(designApi.checkUser, {}, 'GET',"",1).then(res => {
		console.log('检查用户是否注册', res)
		// 未注册，跳转签约电子章页面
		// orderSource:来源 1订单列表中心 0支付中心
		if (!res.data) {
			uni.navigateTo({
				url: `/pages/sign/index?orderNo=${orderNo}`
			})
		}else{
			$request(designApi.creatContract, {from: 1, orderId: orderNo},"POST","",1).then(res => {
				console.log('创建并上传合同 >>>', res)
				uni.navigateTo({
					url: '/pages/common/index?link=' + encodeURIComponent(res.data.url)
				})
			})
		}
	})
}

export function toPaySuccess(orderId, orderAmount, isPay, isError){
	uni.navigateTo({
		url:"/pages/user/order/paySuccess?orderId=" + orderId + (orderAmount ? "&orderAmount=" + orderAmount : "") + (isPay ? "&isPay=" + isPay : "") + (isError ? "&isError=" + isError : "")
	})
}

export function getWeixinCode(){
	return new Promise((resolve, reject) => {
		uni.login({
		  provider: 'weixin',
		  success: (loginRes) => {
			  console.log(loginRes)
			resolve(loginRes.code)
		  },
		  fail(res) {
		  	console.log(res,111)
		  }
		});
	})
}

export function orderComplain(orderId){
	// uni.showToast({
	// 	title:"开发中，敬请期待！",
	// 	icon:"none"
	// })
	uni.navigateTo({
		url: "/pages/user/order/complain?orderId="+orderId
	})
}
export function dateFormat(thisDate,type) {
	// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
	let date = new Date(thisDate*1000);
	let Y = date.getFullYear() + '-';
	let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
	let D = (date.getDate()<10?"0"+date.getDate():date.getDate()) + ' ';
	let h = (date.getHours()<10?"0"+date.getHours():date.getHours()) + ':';
	let m = (date.getMinutes()<10?"0"+date.getMinutes():date.getMinutes()) + ':';
	let s = (date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds());
	if(type == 1){
		return Y+M+D+h+m+s;
	}else if(type == 2){
		return (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1)+"月"+(date.getDate()<10?"0"+date.getDate():date.getDate())+"日";
	}else{
		return Y+M+D;
	}
}
export function toEffect(orderId,type){
	// uni.showToast({
	// 	title:"开发中，敬请期待！",
	// 	icon:"none"
	// })
	uni.navigateTo({
		url: "/pages/user/order/confirmDesign?orderId="+orderId+"&type="+type
	})
}