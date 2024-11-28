import http from '../utils/ajax.js';
const homeApi = {
	memberIndex(data){
		return http({
			url: 'api/member/index',
			data,
			method: 'POST',
			loadType: 2
		});
	},
	matchSet(data){
		return http({
			url: 'api/member/matchSet',
			data,
			method: 'POST',
			loadType: 2
		});
	},
}
export default homeApi