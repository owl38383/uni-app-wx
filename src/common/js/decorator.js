/**
 * 记录函数执行时间函数
 * 想要记录完整时间 需要是async函数或者是返回的Promise的函数
 */
export const loggingDecorator = () => {
	return function (target, name, descriptor) {
		const fn = descriptor.value
		descriptor.value = async function (...rest) {
			const start = performance.now();
			await fn.call(this, ...rest);
			const end = performance.now();
			console.log(`方法${name}执行耗时${(end - start) / 1000}s`);
		};
	}
}

/**
 * 修改加载状态函数
 * @param key loading字段名
 */
export const loadingStatus = (key) => {
	return (target, name, descriptor) => {
		const fn = descriptor.value
		descriptor.value = async function (...rest) {
			this[key] = true
			await fn.call(this, ...rest);
			this[key] = false
		};
	}
}
