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


export function dateFormat(timestamp) {
	const date = new Date(timestamp);
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	return `${year}-${month}-${day}`;
}
