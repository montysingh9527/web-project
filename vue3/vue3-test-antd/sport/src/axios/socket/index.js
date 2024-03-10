import EventBus from '../../event'
import Cookie from 'js-cookie'
import {getInitSocketUserData} from '$api/common_api'
import store from "../../store"
import {param} from '../../assets/js/util'

// 基础配置
const Socket = {
	timer: null,

	heartbeatTimer: null,

	notReplyHeartTimes: 0,

	isReload: 0, // 是否获取历史消息

	// 重连次数
	times: 0,

	// 重连间隔
	duration: 2500,

	// 是否在重连中
	reconnecting: false,

	// 链接状态
	connectState: false,

	// 是否自己关闭链接
	isOwnClose: false,

	_socket: null,

	init(option = {}, callback) {
		console.log('=====>', option)
		console.log('是否在链接中===========', this.reconnecting)


		if (!this.checkLoginState()) {
			console.log('请先登录')
			return false
		}

		if (this._socket || this.reconnecting === true || this.connectState === true) {
			this.connectState = false
			return false;
		}

		// 链接中...
		this.reconnecting = true

		const url = getDefaultSocketUrl(option)

		// 自动调用
		try {
			this._socket = new WebSocket(url)
		} catch (e) {
			this.resetConnect()
		}


		// 打开链接
		this._socket.onopen = async () => {

			if (this._socket.readyState === 1) {
				this.connectState = true

				EventBus.$emit('server-tip', '连接成功！')

				this.clearTimer()

				getInitSocketUserData()
					.then(res => {
						this.reconnecting = false

						store.commit('UPDATE_INIT_SOCKET_USER_DATA', res)

						// 调用原生Android方法
						setTimeout(() => {
							window.share && typeof window.share.bet === 'function' && window.share.bet()

							window.canShare = this.connectState

						}, 100)

						callback && callback()

						EventBus.$emit("CONNECT_SUCCESS")

						console.log('Socket 连接成功!!')

						this.startHeartbeat()

					})
					.catch(err => {
						console.log(err)
						this.reconnecting = false
					})
			}

			store.commit('UPDATE_LOADING', {show: false, text: ''})
		}

		this._socket.onmessage = (event) => {

			if (!this.checkLoginState()) return;

			this.replyHeart()

			const result = JSON.parse(event.data)

			switch (result.code) {
				case '-1':
				case '0014':
				case '0015':
				case '0016':
					EventBus.$emit("ERROR_MESSAGE", result)

					break;
				case '0001':
				case '0004':
				case '1112':
				case '0024':
				case '0025':
				case '0026':
				case '3005':

					EventBus.$emit("ROOM_MESSAGE", result)
					break;
				case '0005':

					EventBus.$emit("ONLINE_PEOPLE", result)
					break;
				case '0888':

					EventBus.$emit("CHAT_WIN", result)
					break;
			}
		}

		// 监听错误消息 重新链接
		this._socket.onerror = () => {
			console.log('socket 链接出错了')

			this.connectState = false
			this.reconnecting = false

			// 不是自己关闭 并且 没有在链接中
			this.resetConnect()
		}

		// 监听错误消息 重新链接
		this._socket.onclose = (evt) => {
			console.log('socket 链接关闭了111',evt);
			this.reconnecting = false
			this.connectState = false

			// if (!this.isOwnClose) {
			// 	this.resetConnect()
			// }
		}
	},


	// 等待上一次链接返回结果之后 再重连
	resetConnect() {
		console.log('开始重连')

		this.isReload = 1;

		// 关闭之前的链接
		this.close()

		this.clearTimer(this.timer)

		this.timer = setInterval(() => {
			this.times++

			console.log('重连次数', this.times)
			EventBus.$emit('server-tip', '网络重连,请稍后...')

			if (this.times >= 10) {
				// 服务器异常
				EventBus.$emit('server-tip', '网络异常，请换个位置尝试!')
				this.connectState = false
				this.close()
				return;
			}

			// 如果没有链接 初始化socket
			this.init({isReload: 1})

		}, this.duration)
	},

	send(data = {}) {

		if (!this._socket || this.connectState === false || this.reconnecting) {

			this.resetConnect()
			return;
		}

		this._socket.send(JSON.stringify(data))
	},


	// 关闭链接
	close() {
		EventBus.$off('MESSAGE')
		this.clearTimer(this.timer)
		this.isOwnClose = true // 前端关闭socket
		this.connectState = false // 更新链接状态
		this._socket && this._socket.close()
		this._socket = null
		this.times = 0
		store.commit('INIT_SOCKET_USER_DATA')

		console.log('链接关闭')
	},

	checkLoginState(option = {}) {
		const loginsessid = option.loginsessid || Cookie.get('loginsessid')
		const logintoken = option.logintoken || Cookie.get('logintoken')

		if (!loginsessid || !logintoken) {
			if (this._socket) this.close()

			store.commit('UPDATE_LOGINSTATUS', false)
			store.commit('UPDATE_GUESTSTATUS', false)

			return false;
		} else {
			return true;
		}
	},

	startHeartbeat() {
		clearInterval(this.heartbeatTimer)
		this.heartbeatTimer = null

		this.heartbeatTimer = setInterval(() => {
			this.send({code: 'R0001'})

			this.notReplyHeartTimes++

			if (this.notReplyHeartTimes > 10) {
				this.resetConnect()
			}
		}, 30000)
	},

	replyHeart() {
		this.connectState = true

		this.reconnecting = false

		this.notReplyHeartTimes = 0

		this.times = 0
	},

	clearTimer() {
		if (this.timer) {
			clearTimeout(this.timer)
			clearInterval(this.timer)
			this.timer = null
		}

		if (this.heartbeatTimer) {
			clearInterval(this.heartbeatTimer)
			this.heartbeatTimer = null
		}
	}
}

function getDefaultSocketUrl(option) {
	const loginsessid = option.loginsessid || Cookie.get('loginsessid')
	const logintoken = option.logintoken || Cookie.get('logintoken')

	const defaultParams = {
		logintoken,
		loginsessid,
		isReload: option.isReload || 0,
		isSelectRoom: store.getters.guestStatus ? '1' : '0',
	}

	console.log('option------>', option)

	const defaultSocketUrl = store.getters.userMsg.chat_server

	if (option.url) {
		return option.url + '?' + param(defaultParams)
	}

	return defaultSocketUrl + '?' + param(defaultParams)
}

export default Socket
