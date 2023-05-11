import {axios_before_data} from '@/common/js/yuanzifengzhang.js'

function formatRequest(config) {
	// 拼接url
	config.header = {
		'Content-Type': 'application/json;charset=UTF-8',
		'Authorization': 'token ' + uni.$x.localStorage.getStore('userInfo')?.token
	}
	
	let params = {}
	if (!!uni.$x.localStorage.getStore('userInfo')?.token) {
		let paramType = config?.custom?.paramType;
		/**
		 * paramType:undefined  当前选中company
		 * paramType:1          用户company
		 * paramType:2          请求本身携参
		 */
		
		if (paramType == undefined) {
			params = {
				uid: uni.$x.localStorage.getStore('userInfo')?.user_id,
				company_id: uni.$x.localStorage.getStore('company')?.checkCompany?.id,
				company_type: uni.$x.localStorage.getStore('company')?.checkCompany?.type
			}
		} else if (paramType == 1) {
			params = {
				uid: uni.$x.localStorage.getStore('userInfo').user_id,
				company_id: uni.$x.localStorage.getStore('userInfo').company_id,
				company_type: uni.$x.localStorage.getStore('userInfo').company_type
			}
		} else if (paramType == 2) {
			params = {}
		}
	}
	let params_obj = Object.assign(params, config.data)
	let before_data = axios_before_data(config.method.toLowerCase(), params_obj, params?.uid)
	
	let host = uni.$x.zeusConfig.getHost();
	// console.log(config.url)
	if ('/zeus/serviceinfo/nologin_info/' == config.url) {
		host = uni.$x.zeusConfig.getZeusUrl()
	} else if (!host) {
		uni.$emit('server_info', config.url);
	}
	config.url = `${host}${config.url}?${Object.keys(before_data.params).map(key => `${key}=${before_data.params[key]}`).join('&')}`
	config.data = before_data.data
	return config;
}

function formatResponse(response) {
	let res = response.data
	if (res.code == 0 || res.err_code == 0) {
		return res.data;
	} else if (res.code == 201 || res.code == 9996) {
		// 假设201为token失效，这里跳转登录
		uni.showToast({
			title: '验证失败，请重新登录',
			icon: "none",
		});
		uni.$emit('logout', 1);
	} else {
		uni.showToast({
			title: res.msg,
			icon: "none",
		});
	}
}

uni.addInterceptor('request', {
	invoke(args) {
		args = formatRequest(args)
		// console.debug('interceptor-invoke',args.url)
	},
	success(args) {
		// 请求成功后，修改code值为1
		formatResponse(args)
		// console.debug('interceptor-success',args)
	},
	fail(err) {
		console.debug('interceptor-fail', err)
	},
	complete(res) {
		// console.log('interceptor-complete', res)
	}
})
