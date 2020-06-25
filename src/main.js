import Vue from 'vue'
import App from './App.vue'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import 'vuejs-dialog/dist/vuejs-dialog.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'animate.css'
import './App.css';

import VueCookies from 'vue-cookies'
import router from "@/router/router";
import store from "@/storage/store"
import VuejsDialog from "vuejs-dialog"
import BootstrapVue from "bootstrap-vue";
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.use(BootstrapVue)
Vue.use(VuejsDialog,{
  okText:'确认',
  cancelText:'取消',
  animation: 'bounce'
});
Vue.use(VueCookies);
Vue.config.productionTip = false;
Vue.config.devtools = true;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
