import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


// 导入axios
import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = 'http://localhost:3000'
// 全局配置  挂载到vue的原型对象上  这样每个vue组件都可以通过this.$http 使用axios
Vue.prototype.$http = axios;


Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
