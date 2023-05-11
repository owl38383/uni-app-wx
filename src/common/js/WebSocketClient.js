import {log} from "@dcloudio/vue-cli-plugin-uni/lib/format-log";

export class WebSocketClient {
	constructor(url, protocols = []) {
		this.url = url;
		this.protocols = protocols;
		this.socket = null;
		this.reconnectInterval = 1000; // 重连间隔时间
		this.reconnectAttempts = 0; // 重连尝试次数
		this.maxReconnectAttempts = 10; // 最大重连尝试次数
		this.onopen = null;
		this.onmessage = null;
		this.onclose = null;
		this.onerror = null;
	}
	
	connect() {
		let _that = this;
		this.socket  = uni.connectSocket({
			url: _that.url,
			header: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			protocols: this.protocols,
			method: 'GET',
			complete:()=>{}
		})
		console.debug(this.socket)
		uni.onSocketOpen(function (event) {
			console.log('WebSocket连接已打开');
			_that.send('connection success')
			_that.reconnectAttempts = 0; // 重置重连尝试次数
			if (_that.onopen) {
				_that.onopen(event);
			}
		});
		
		uni.onSocketError(function (error) {
			console.error('WebSocket连接发生错误:', error);
			if (_that.onerror) {
				_that.onerror(error);
			}
		});
		
		uni.onSocketMessage(function (event) {
			// console.log('WebSocket收到消息:', event.data);
			if (_that.onmessage) {
				_that.onmessage(event);
			}
		});
		
		uni.onSocketClose(function (event) {
			console.log('WebSocket连接已关闭:', event.code, event.reason);
			if (_that.onclose) {
				_that.onclose(event);
			}
			if (_that.reconnectAttempts < _that.maxReconnectAttempts) {
				setTimeout(() => {
					console.log('WebSocket正在尝试重新连接...');
					_that.reconnectAttempts++;
					_that.connect();
				}, _that.reconnectInterval);
			} else {
				console.log('WebSocket连接尝试次数已达到最大值，停止重连');
			}
		});
	}
	
	send(message) {
		if (this.socket && this.socket.readyState === 1) {
			uni.sendSocketMessage({data: message});
		} else {
			console.error('WebSocket连接未打开，无法发送消息');
		}
	}
	
	close() {
		if (this.socket) {
			this.socket.close();
		}
	}
}
