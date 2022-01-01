<template>
	<view>

		<view class="content">
			<view class="title">欢迎登录</view>
			<input class="phoneNumber" placeholder="请输入手机号" v-model="phoneNumber" />
			<view class="sendCode">找回密码</view>
			<input class="verificationCode" type="password" placeholder="请输入" v-model="password" />
			<button class="login" type="default" @click="toLogin()">注册/登录</button>
		</view>


	</view>
</template>

<script>
	import store from '@/store/index.js'
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {
				phoneNumber: "",
				password: "",
			};
		},
		methods: {
			...mapMutations(['login', 'logout']),

			toLogin() {
				// console.log(this.phoneNumber)
				// console.log(this.password)

				let reg = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;

				if (reg.test(this.phoneNumber)) { //符合

					uni.request({
						url: "http://127.0.0.1:8088/user/doLogin",
						method: "POST",
						header: {
							'content-type': "application/x-www-form-urlencoded"
						},
						data: {
							'phoneNumber': this.phoneNumber,
							'password': this.password,
						},
						success: (res) => {
							if (res.data == 1 || res.data == 2) { //注册成功 登录成功

								this.login(this.phoneNumber)

								uni.switchTab({
									url: "../index/index",
								})

							} else if (res.data == 3) { //登录失败

								uni.showToast({
									title: "密码错误"
								})

							}
						},
						fail: () => {
							console.log("登录方法执行失败了")
						},
						complete: () => {
							console.log("登录方法调用执行")
						}
					})

				} else {
					uni.showToast({
						title: "手机号输入错误"
					})
				}

			}
		},
		computed: {
			...mapState({}),
			...mapGetters([''])
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}

	.content {
		width: 700rpx;
		height: 700rpx;
		// border: 1px solid black;
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		.title {
			font-size: 60rpx;
			font-weight: bold;
			text-align: center;
		}

		.phoneNumber {
			margin-top: 40rpx;
			background-color: #FFFFFF;
			height: 80rpx;
		}

		.sendCode {
			margin: 20rpx 0 20rpx 0;
			text-align: right;
			cursor: pointer;
		}

		.verificationCode {
			margin-top: 20rpx;
			background-color: #FFFFFF;
			height: 80rpx;

		}

		.login {
			margin-top: 40rpx;

		}

	}
</style>
