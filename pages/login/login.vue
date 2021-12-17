<template>
	<view>
		
		<view class="content">
			<view class="title">欢迎登录</view>
			<input class="phoneNumber" placeholder="请输入手机号" v-model="phoneNumber"/>
			<view class="sendCode">发送验证码</view>
			<input class="verificationCode" placeholder="请输入验证吗" v-model="password" />
			<button class="login" type="default" @click="toLogin()">注册/登录</button>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber:"",
				password:"",
			};
		},
		methods:{
			toLogin(){
				console.log(this.phoneNumber)
				console.log(this.password)
				
				
				uni.request({
					url:"http://127.0.0.1:8088/user/doLogin",
					method:"POST",
					header:{
						'content-type':"application/x-www-form-urlencoded"
					},
					data:{
						'phoneNumber':this.phoneNumber,
						'password':this.password
					}
				})
				
				
				
				// uni.switchTab({
				// 	url:"../index/index",
				// })
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F5F5;
	}
	.content{
		width: 700rpx;
		height: 700rpx;
		// border: 1px solid black;
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		
		.title{
			font-size: 60rpx;
			font-weight: bold;
			text-align: center;
		}
		
		.phoneNumber{
			margin-top: 40rpx;
			background-color: #FFFFFF;
			height: 80rpx;
		}
		
		.sendCode{
			margin: 20rpx 0 20rpx 0;
			text-align: right;
			cursor: pointer;
		}
		
		.verificationCode{
			margin-top: 20rpx;
			background-color: #FFFFFF;
			height: 80rpx;
			
		}
		
		.login{
			margin-top: 40rpx;
			
		}
		
	}

</style>
