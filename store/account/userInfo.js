import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}
const mutations = {
    setUserInfo: (state,userInfo) => {
        state.userInfo = userInfo
		uni.setStorageSync("userInfo",userInfo)
    },
	setToken: (state,token) => {
	    state.token = token
		uni.setStorageSync("token",token)
	},
	setEnum: (state,Enum) => {
	    state.Enum = Enum
		uni.setStorageSync("Enum",Enum)
	}
}
const state = {
    userInfo:uni.getStorageSync("userInfo")||{},
	token:uni.getStorageSync("token")||"",
	Enum:uni.getStorageSync("Enum")||"",
	
}
// getters 只会依赖 state 中的成员去更新
const getters = {
    userInfo: (state) => state.userInfo,
    token: (state) => state.token,
	Enum: (state) => state.Enum,
}

const userStore = new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
export { userStore }