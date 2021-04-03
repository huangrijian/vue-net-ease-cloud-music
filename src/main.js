import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import store from './store/index'

// 引入NewIcon.css
import './assets/css/NewIcon/iconfont.css';

// 导入axios
import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://bao.lqjhome.cn:3000'
    // 全局配置  挂载到vue的原型对象上  这样每个vue组件都可以通过this.$http 使用axios
Vue.prototype.$http = axios;

// 注册事件总线
Vue.prototype.$bus = new Vue()


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')