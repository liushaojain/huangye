import http from '../../ajax.js';
const worksApi = {
	createWorks(data){
		return http('smallbatch/sdb-b2-c-winecustom-works/createWorks',data,'post',false,true,true);
	},
	diyWorksItem(data){
		return http('smallbatch/sdb-b2-c-winecustom-works/diyWorksItem',data,'post',false,true,true);
	},
	replaceTemplate(data){
		return http('smallbatch/sdb-b2-c-winecustom-works/replaceTemplate',data,'post',false,true,true);
	},
	confirmDesign(data){
		return http('smallbatch/sdb-b2-c-winecustom-works/confirmDesign',data,'post',false,true,true);
	},
	purchasingGoods(data){
		return http('smallbatch/sdb-b2-c-winecustom-works/purchasingGoods',data,'post',false,true,true);
	},
	getWorks(worksId){
		return http(`smallbatch/sdb-b2-c-winecustom-works/anon/getWorks/${worksId}`,'','get',false,true,true);
	},
	updateShoppingCart(data){
		return http('smallbatch/sdb-b2-c-winecustom-works/updateShoppingCart',data,'post',false,true,true);
	},
	orderPreview(worksId){
		return http(`smallbatch/sdb-b2-c-checkOut/orderPreview/${worksId}`,'','get',false,true,true);
	}
	
}
export default worksApi