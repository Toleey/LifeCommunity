<template>
	<view>

		<view class="content">
			<view class="title">我们会帮助你找回密码</view>
			<input class="phoneNumber" placeholder="请输入手机号" v-model="phoneNumber" />
			<view class="sendCode" @click="toSendSMS()">发送验证码</view>
			<input class="verificationCode" placeholder="请输入" v-model="verificationCode" />
			<button class="login" type="default" @click="toFind()">找回密码</button>
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
				verificationCode: "",
				smsCode:0
			};
		},
		methods: {
			...mapMutations(['login', 'logout']),
			
			toSendSMS(){
				if(this.phoneNumber==""){ //还没有输入手机号
					uni.showToast({
						title:"您还没有输入手机号"
					})
				}else{
					this.smsCode=Math.random().toString().slice(-6)
					console.log(this.smsCode)
					uni.showToast({
						title:this.smsCode
					})
					alert(this.smsCode)
				}
				
				
				
			},
			toFind() {
				console.log(this.smsCode)
				console.log(this.verificationCode)
				if(this.smsCode==0){//还没有发送验证码
					uni.showToast({
						title:"请先点击“先发送验证码”"
					})
				}else{
					
					
					if (this.smsCode == this.verificationCode) { //输入的验证吗正确
					
						uni.request({
							url: "http://127.0.0.1:8088/user/getAUserByPhoneNumber",
							method: "GET",
							header: {
								'content-type': "application/x-www-form-urlencoded"
							},
							data: {
								'phoneNumber': this.phoneNumber,
							},
							success: (res) => {
								console.log(res.data)
								if(res.data==""){ //没这个账户
									uni.showToast({
										title:"您的手机号尚未注册"
									})
								}else{
									uni.showToast({
										title:"您的密码是："+res.data.password
									})
								}
								this.smsCode=0
								this.phoneNumber=""
								this.verificationCode=""
								
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
							title: "验证码输入错误"
						})
					}
					
					
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
