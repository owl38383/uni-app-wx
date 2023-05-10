// 引入常量
import {
	METHOD_GET,
	METHOD_POST,
	METHOD_PUT,
	METHOD_DELETE
} from '@/common/constants.js'


// 请求列表，用于记录正在进行的请求
const requestList = [];
// 请求列表 用于缓存数据接口 加快返回
const cacheMap = new Map()

// 定时删除过期key
setInterval(() => {
	const now = Date.now()
	for (const [key, value] of cacheMap) {
		if (now > value.expiredTime) {
			console.log('delete', key)
			cacheMap.delete(key)
		}
	}
}, 1000)

/**
 * 缓存get请求方法 结合定时器，定时清除
 * time: ms
 * */
function cacheGet(target, time = 1000 * 10) {
	return async function (...args) {
		const json = JSON.stringify(arguments)
		if (navigator.onLine) {
			console.log('ajax result')
			const result = await target.apply(this, arguments);
			cacheMap.set(json, {
				result,
				expiredTime: Date.now() + time
			});
			return result;
		}else{
			console.log('cache result')
			return cacheMap.get(json).result
		}
	}
}


function request(method, url, data, header, custom) {
	return new Promise((resolve, reject) => {
		// 检查是否存在重复请求，如果存在则取消之前的请求
		const index = requestList.findIndex(req => req.url === url && req.method === method && req.data === data); // && JSON.stringify(req.data) === JSON.stringify(data));
		if (index >= 0) {
			const requestTask = requestList[index].task;
			if (requestTask && typeof requestTask.abort === 'function') {
				requestTask.abort();
			}
			requestList.splice(index, 1);
		}
		
		// 发送请求
		const requestTask = uni.request({
			method: method,
			url: url,
			data: data,
			header: header,
			custom: custom,
			success: res => {
				if (res.statusCode >= 200 && res.statusCode < 300 && res.data.code === 0) {
					resolve(res.data.data);
				} else {
					reject({
						code: res.statusCode,
						message: res.data
					});
				}
			},
			fail: err => {
				reject({
					code: -1,
					message: err.errMsg
				});
			},
			complete: () => {
				// 从请求列表中删除已完成的请求
				const reqIndex = requestList.findIndex(req => req.task === requestTask);
				if (reqIndex >= 0) {
					requestList.splice(reqIndex, 1);
				}
			}
		});
		
		// 将新请求添加到请求列表中
		requestList.push({
			url: url,
			method: method,
			data: data,
			task: requestTask
		});
	});
}

// 定义 get 请求函数
export function get(url = String, data = Object, header = {}, custom = Object, cacheTime = 10000) {
	const wrapperFunction = cacheGet(request, cacheTime)
	return wrapperFunction(METHOD_GET, url, data, header , custom, )
}

// 定义 post 请求函数
export function post(url, data, header) {
	return request(METHOD_POST, url, data, header)
}

// 定义 put 请求函数
export function put(url, data, header) {
	return request(METHOD_PUT, url, data, header)
}

// 定义 delete 请求函数
export function del(url, data, header) {
	return request(METHOD_DELETE, url, data, header)
}






