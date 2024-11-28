import http from '../../ajax.js';
const productApi = {
	diyGoodsDetails(data){
		return http('smallbatch/sdb-b2-c-products/anon/diyGoodsDetails',data,'POST',false,true,true);
	},
	diyQuotes(data){
		return http('smallbatch/sdb-b2-c-products/anon/diyQuotes',data,'POST',false,true,true);
	},
	wineBottles(){
		return http('smallbatch/sdb-b2-c-winecustom-works/anon/wineBottles','','get',false,true,true);
	}
	
}
export default productApi