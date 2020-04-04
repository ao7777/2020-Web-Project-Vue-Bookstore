import Vue from 'vue'
import App from './App.vue'
import '../node_modules/milligram/dist/milligram.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import './App.css'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

Vue.config.productionTip = false;
Vue.config.devtools = true;
new Vue({
  render: h => h(App),
}).$mount('#app');
