// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from "vuetify"; // 追加
import "vuetify/dist/vuetify.min.css"; // 追加
import 'material-design-icons-iconfont/dist/material-design-icons.css' // 追加
import '@mdi/font/css/materialdesignicons.css' // 追加

Vue.config.productionTip = false

Vue.use(Vuetify); // 追加

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  vuetify: new Vuetify() // 追加（※）
})
