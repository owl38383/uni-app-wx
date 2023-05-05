import App from "./App";

// #ifndef VUE3
import Vue from "vue";

Vue.config.productionTip = false;

import uView from "@/uni_modules/uview-ui";
import authorization from "@/common/util/authorization";
import globalFilter from "@/common/util/globalFilter.js";
import xView from "@/common/js/index";

App.mpType = "app";
const app = new Vue({
  ...App,
});
Vue.use(uView);
Vue.use(xView);
Vue.use(globalFilter);
// 权限
Vue.use(authorization);
app.$mount();
// #endif
