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
// 生成文件名随机字符串
export function random_string(len) {
　　const strLeng = len || 32;
　　const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
　　const maxPos = chars.length;
　　let pwd = '';
　　for (let i = 0; i < strLeng; i++) {
    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

// 获取文件后缀
export function get_suffix(filename) {
    const pos = filename.lastIndexOf('.')
    let suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos)
    }
    return suffix;
}

export function get_file_name(filename) {
    const pos = filename.lastIndexOf('/')
    let suffix = ''
    if (pos != -1) {
        suffix = filename.substring(pos+1)
    }
    return suffix;
}