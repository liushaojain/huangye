import http from '../utils/ajax.js';
const uesrApi = {
	login(data){
		return http({
			url: 'api/login',
			data,
			method: 'POST',
			loadType: 2
		});
	},
	updateProfile(data){
		return http({
			url: 'api/member/updateProfile',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	updateDatingRequirements(data){
		return http({
			url: 'api/member/updateDatingRequirements',
			data,
			method: 'POST',
			loadType: 1
		});
	},
}
export default uesrApi
