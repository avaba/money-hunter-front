import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const fragment = require('vue-fragment');

Vue.use(fragment.Plugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
