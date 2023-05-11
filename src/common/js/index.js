import local_storage from "@/common/js/local_storage";
import * as request from "@/common/js/request/request";
import * as api from "@/common/js/request/api";
import * as pageMixins from "@/common/js/pagemixins";
import {ZeusConfig} from "@/common/js/request/zeusConfig";

const zeusUrl = 'https://admin.ansource.cn';
const sign_key = 'Fubang.119*(';
// const channel = 'XCXC' //120
// const channel = 'XCDEV' //119
const channel = 'XC' // 阿

const UIConfig = {
	statusBarHeight: 0,
	navbarHeight: 0,
	navRight: 0,
}
const $x = {
	zeusConfig: new ZeusConfig(zeusUrl, sign_key, channel),
	localStorage: local_storage,
	request,
	api,
	pageMixins,
	UIConfig
}

// $u挂载到uni对象上
uni.$x = $x
uni.$x.zeusConfig.setHost(uni.$x.localStorage.getStore('zeusConfig'))
const install = (Vue) => {
	// #ifndef APP-NVUE
	// 只有vue，挂载到Vue.prototype才有意义，因为nvue中全局Vue.prototype和Vue.mixin是无效的
	Vue.prototype.$x = $x
	// #endif
}

export default {
	install
}
