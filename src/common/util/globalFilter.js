// 全局过滤器
// 使用示例 {{message|capitalize}}

import moment from "moment";

function filter(Vue) {

	// 去除空字符串
	Vue.filter('formatNullString', (value, defaultVal) => {
		value = value + '';
		if (typeof(value) == 'string' || typeof(value) == 'undefined') {
			if (!defaultVal) defaultVal = '-';
			value = value ? value + "" : defaultVal;
			value = value.replace(/null|undefined/g, '');
			value = value ? value + "" : defaultVal;
		}
		return value
	})

	// 去除空字符串
	Vue.filter('formatJsonString', (value, defaultVal) => {
		if (typeof(value) == 'string' || typeof(value) == 'undefined') {
			if (!defaultVal) defaultVal = '-';
			value = JSON.parse(value)
		}
		return value
	})

	// 去除空字符串
	Vue.filter('formatPhone', (value, ) => {
		return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
	})


	// 格式化时间
	Vue.filter('formatDateTime', (value, format) => {
		if (!value) return "-";
		if (!format) format = 'YYYY-MM-DD HH:mm:ss';
		return moment(value).format(format);
	})
}

export default filter
