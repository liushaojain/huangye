import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}
const mutations = {
    setUserInfo: (state,userInfo) => {
        state.userInfo = userInfo
		console.log('userInfo',userInfo)
		uni.setStorageSync("userInfo",userInfo)
    },
	setToken: (state,token) => {
		console.log('token',token)
	    state.token = token
		uni.setStorageSync("token",token)
	}
}
const state = {
    userInfo:uni.getStorageSync("userInfo")||{},
	token:uni.getStorageSync("token")||""
}
// getters 只会依赖 state 中的成员去更新
const getters = {
    userInfo: (state) => state.userInfo,
    token: (state) => state.token
}

const userStore = new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
export { userStore }