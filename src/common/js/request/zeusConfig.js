export class ZeusConfig {
	#zeusUrl = 'https://admin.ansource.cn';
	#sign_key = 'Fubang.119*(';
	#channel = 'XCXC'
	
	#host = ''
	
	constructor(zeusUrl, sign_key, channel) {
		this.#zeusUrl = zeusUrl
		this.#sign_key = sign_key
		this.#channel = channel
		console.log(`init ZeusConfig  [zeusUrl : ${this.#zeusUrl}] ----- [channel : ${this.#channel}]`)
	}
	
	getZeusUrl = () => {
		return this.#zeusUrl
	}
	getSignKey = () => {
		return this.#sign_key
	}
	getChannel = () => {
		return this.#channel
	}
	setHost = (val) => {
		this.#host = val;
	}
	getHost = () => {
		return this.#host
	}
	getWsUrl = () => {
		return this.#host ? this.#host.replace('http', 'ws') : null
	}
	
}
