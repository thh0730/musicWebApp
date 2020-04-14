import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'

// 解决移动端点击事件延迟
fastclick.attach(document.body)

// 懒加载
Vue.use(VueLazyload, {
  // 设置图片未加载好之前的占位图片
  loading: require('./assets/images/loading.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
