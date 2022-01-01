export default {

	state: {
		phoneNumber:null,
		hasLogin: false
	},
	mutations: {

		login(state, num) { //改变登录状态  
			state.hasLogin = true
			state.phoneNumber=num
			uni.setStorage({ //将用户信息保存在本地  
				key: 'phoneNumber',
				data: num
			})
			
		},
		logout(state) { //退出登录  
			state.hasLogin = false
			state.phoneNumber = 0
			console.log(state)
			uni.removeStorage({
				key: 'phoneNumber'
			})
		}

	},
	actions: {

	},
	getters: {
		//获取登录状态
		getHasLogin(state){
			return state.hasLogin
		},
		//获取手机号 用手机号来辨别用户
		getPhoneNumber(state){
			return state.phoneNumber
		}
	}



}
