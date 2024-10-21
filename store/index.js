import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const actions = {}
const mutations = {
    handleindustry: (state,industry) => {
        state.industry = industry
		uni.setStorageSync("industry",industry)
    }
}

const state = {
    industry:uni.getStorageSync("industry")
}
const getters = {
    userName: (state) => state.industry
}

const indexStore = new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})
export { indexStore }