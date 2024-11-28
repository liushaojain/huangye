export default{
	checkPhone(phone){ 
	    if(!(/^1[3456789]\d{9}$/.test(phone))){
			return false;
		}else{
			return true;
		}
	},
	timestampToDate(timestamp) {
	  const date = new Date(timestamp);
	  const year = date.getFullYear();
	  const month = date.getMonth() + 1;
	  const day = date.getDate();
	  return `${year}-${month}-${day}`;
	},
	 formatTime(date,format) {
	        console.log(date);
	        if(!date){
	            return '-'
	        }
	        if(!format){
	            format='Y-M-D h:m:s'
	        }
	        function  formatNumber(n) {
	            n = n.toString()
	            return n[1] ? n : '0' + n
	        }
	        var number=new Date(date).getTime();
	
	        var formateArr  = ['Y','M','D','h','m','s'];
	        var returnArr   = [];
	
	        number+='';
	        if(number.length==10){
	            var date = new Date(number * 1000);
	        }else{
	            var date = new Date(number*1);
	        }
	
	
	        returnArr.push(date.getFullYear());
	        returnArr.push(formatNumber(date.getMonth() + 1));
	        returnArr.push(formatNumber(date.getDate()));
	
	        returnArr.push(formatNumber(date.getHours()));
	        returnArr.push(formatNumber(date.getMinutes()));
	        returnArr.push(formatNumber(date.getSeconds()));
	
	        for (var i in returnArr)
	        {
	            format = format.replace(formateArr[i], returnArr[i]);
	        }
	        return format;
	    },
		toFixed_f(num){
			if(!num||isNaN(num)){
				return num
			}
			
			return num.toFixed(2);
			
		},

		// 节流
		myThrottle(func) {
		//	console.log(111);
			let timer = Date.now();
			return function() {
				let dateNow = Date.now();
				const context = this;
				const args = [...arguments];
				if(dateNow - timer >= 2000) {
					timer = Date.now();
				  return func.apply(context, args);
				} 
			}
		},
		
		fomartNum(num){
			if(!num||isNaN(num)){
				return '0'
			}
			
			if(num<10000){
				return num
			}
			
			if(num>10000&&num<100000){
				return (num/10000).toFixed(1)+'万';
			}
			
			if(num>=100000){
				var n=parseInt((num/10000));
				return n+'w+'
			}
		}
		
}