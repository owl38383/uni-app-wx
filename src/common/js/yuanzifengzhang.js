import md5 from '@/common/js/md5.js'

export const axios_before_data = (type, data, user_id) => {
	if (typeof data === 'undefined') {
		data = {};
	} else if (typeof data.sign != 'undefined') {
		delete data.sign;
	}

	let res = uni.getSystemInfoSync()
	let appBaseInfo = uni.getAppBaseInfo()
	let platform = res.platform == 'ios' ? 'I10.0' : 'A4.4'
	let sign_key = uni.$x.zeusConfig.getSignKey();
	let obj = {
		view_type: 'h5',
		cc: 'G9000',
		ua: '',
		cv: '',
		sign_time: '1520931947',
		sign_random: 'Y2zX0ZNi',
		imei: '1520931947',
		imsi: '222222222',
		sign_id: '10000',
	}
	obj.cv = uni.$x.zeusConfig.getChannel() + appBaseInfo.appVersion + '.00_' + platform;
	obj.ua = res.deviceModel.replace(/\s+/g, '');
	obj.imei = res.deviceId;
	let temp_obj = {
		uid: '',
		sign_time: '1520931947',
		sign_random: 'Y2zX0ZNi',
	}
	temp_obj.uid = data.uid || user_id || '-1';
	temp_obj.sign_time = Math.ceil((new Date()).getTime() * 1000 / (1000 * 1000));
	temp_obj.sign_random = Math.ceil(Math.random() * 10000000);

	let md5_before =
		`&uid=${temp_obj.uid}&cv=${temp_obj.cv}&sign_time=${temp_obj.sign_time}&sign_random=${temp_obj.sign_random}`;

	for (let index in temp_obj) {
		obj[index] = temp_obj[index];
	}
	if (type === 'get' || type === 'delete') {
		for (let index in data) {
			if (data[index] === '') {
				delete data[index];
			}
		}
		for (let index in obj) {
			data[index] = obj[index];
		}

		let href = '';
		for (let index in data) {
			href += '&' + index + '=' + data[index];
		}

		let aa = `method=${type}&sign_key=${sign_key}${href}`
		data.sign = md5.md5_32(aa);
	} else {
		let href = '';
		for (let index in obj) {
			href += '&' + index + '=' + obj[index];
		}
		obj.sign = md5.md5_32(`method=${type}&sign_key=${sign_key}${href}`);

	}
	return {
		params: obj,
		data: data,
	}
}
