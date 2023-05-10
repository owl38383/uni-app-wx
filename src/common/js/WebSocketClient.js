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
		this.socket = new WebSocket(this.url, this.protocols);
		
		this.socket.onopen = (event) => {
			console.log('WebSocket连接已打开');
			this.reconnectAttempts = 0; // 重置重连尝试次数
			if (this.onopen) {
				this.onopen(event);
			}
		};
		
		this.socket.onmessage = (event) => {
			console.log('WebSocket收到消息:', event.data);
			if (this.onmessage) {
				this.onmessage(event);
			}
		};
		
		this.socket.onclose = (event) => {
			console.log('WebSocket连接已关闭:', event.code, event.reason);
			if (this.onclose) {
				this.onclose(event);
			}
			if (this.reconnectAttempts < this.maxReconnectAttempts) {
				setTimeout(() => {
					console.log('WebSocket正在尝试重新连接...');
					this.reconnectAttempts++;
					this.connect();
				}, this.reconnectInterval);
			} else {
				console.log('WebSocket连接尝试次数已达到最大值，停止重连');
			}
		};
		
		this.socket.onerror = (error) => {
			console.error('WebSocket连接发生错误:', error);
			if (this.onerror) {
				this.onerror(error);
			}
		};
	}
	
	send(message) {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(message);
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
