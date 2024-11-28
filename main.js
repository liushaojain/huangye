import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'

import request from './utils/ajax.js'
import share from './utils/share.js'
import mixin from './utils/mixin.js';
import common from './utils/common.js';
import apis from './Api/index.js';
Vue.prototype.$request = request;
Vue.prototype.publicFun = common;
Vue.prototype.$apis = apis;
Vue.prototype.imgBaseUrl = 'http://47.119.182.138:89/images/'
Vue.mixin(mixin);
Vue.use(uView)
Object.keys(common).forEach(key => {
	Vue.filter(key, common[key])
});
App.mpType = 'app'
Vue.mixin(share)
const app = new Vue({
	...App,
	share
})
app.$mount()
// 宝塔账号密码 
// https://47.119.182.138:26031/files lhnfebt7 cad2a228
// https://lanhuapp.com/link/#/invite?sid=lXgugTma
// 小程序sercret 8fca07b1b3028131a1c25fa90f315fcb