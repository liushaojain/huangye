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
	enum(data){
		return http({
			url: 'api/enum',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	setMarryInfo(data){
		return http({
			url: 'api/member/setMarryInfo',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	expectedHim(data){
		return http({
			url: 'api/member/expectedHim',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	setMemberHobbies(data){
		return http({
			url: 'api/member/setMemberHobbies',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	uploadPhoto(data){
		return http({
			url: 'api/member/uploadPhoto',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	updAvatar(data){
		return http({
			url: 'api/member/updAvatar',
			data,
			method: 'POST',
			loadType: 1
		});
	},
	getOss(){
		return http({
			url: 'api/config/getOss',
			method: 'POST',
			loadType: 1
		});
	}
}
export default uesrApi
