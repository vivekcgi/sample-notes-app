import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import "@/assets/custom.css";
import HTTP from "./axios";

Vue.use(Buefy, { defaultIconPack: "fas" });
Vue.config.productionTip = false;
// Add a response interceptor
HTTP.interceptors.response.use(
  response => {
    if (response.data instanceof Blob) {
      return response.data;
    }
    return response.data.data || {};
  },
  error => {
    if (error.response) {
      console.log(error.response);
      Vue.prototype.$buefy.toast.open({
        message: error.response.data.message || "Something went wrong",
        type: "is-danger"
      });
    } else {
      Vue.prototype.$buefy.toast.open({
        message: "Unable to connect to server",
        type: "is-danger"
      });
    }
    return Promise.reject(error);
  }
);

Vue.prototype.$http = HTTP;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
