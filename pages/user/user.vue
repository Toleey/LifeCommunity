<template>
	<view>
		<view>

			<view class="list" @click="updateAvator" >
				<view class="list-title">
					我的头像
				</view>
				<view class="list-content">
					<image :src="user.avator"></image>
					<span class="iconfont icon-xiangyoujiantou"></span>
				</view>
			</view>

			<view class="list" @click="updateUserName">
				<view class="list-title">
					我的昵称
				</view>
				<view class="list-content">
					<view>{{user.userName}}</view>
					<span class="iconfont icon-xiangyoujiantou"></span>
				</view>
			</view>

			<view class="list" @click="updatePassword">
				<view class="list-title">
					修改密码
				</view>
				<view class="list-content">
					<view>{{user.password}}</view>
					<span class="iconfont icon-xiangyoujiantou"></span>
				</view>
			</view>

			<view class="list" @click="updatePhoneNumber">
				<view class="list-title">
					联系方式
				</view>
				<view class="list-content">
					<view>{{user.phoneNumber}}</view>
					<span class="iconfont icon-xiangyoujiantou"></span>
				</view>
			</view>

			<view class="list" @click="updateCreatedTime">
				<view class="list-title">
					注册时间
				</view>
				<view class="list-content">
					<view>{{user.createdTime}}</view>
					<span class="iconfont icon-xiangyoujiantou"></span>
				</view>
			</view>

			<view class="list" @click="toFeedback">
				<view class="list-title">
					意见反馈
				</view>
				<view class="list-content">
					<view></view>
					<span class="iconfont icon-xiangyoujiantou"></span>
				</view>
			</view>

			<button type="default" @click="toLogin">退出登录</button>

		</view>

		<uni-popup ref="popupAvator" type="dialog">
			<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="closeAvator"
				@confirm="confirmAvator"></uni-popup-dialog>
		</uni-popup>

		<uni-popup ref="popupUserName" type="dialog">
			<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="closeUserName"
				@confirm="confirmUserName"></uni-popup-dialog>
		</uni-popup>

		<uni-popup ref="popupPassword" type="dialog">
			<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="closePassword"
				@confirm="confirmPassword"></uni-popup-dialog>
		</uni-popup>
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
				user: {},

			};
		},
		onLoad() {
			this.getUser()
		},
		onShow() {

		},
		methods: {
			...mapMutations(['login', 'logout']),
			//头像
			updateAvator() {
				console.log("我的头像")
				
				//this.$refs.popupAvator.open()

				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album','camera'],

					success: (chooseImageRes) => {
						// 获取的格式是数组，多选会同时返回，单选只返回一项
						const tempFilePaths = chooseImageRes.tempFilePaths;
						// 若多选，需循环调用uni.uploadFile ，因微信小程序只支持单文件上传
						console.log(tempFilePaths[0])

						uni.uploadFile({
							url: 'https://kjava.com/zs/api/upload',
							method:'POST',
							fileType: 'image', //图片类型
							name: 'file',
							filePath: tempFilePaths[0], //哪张图片
							// header: {
							// 	'Content-Type': 'multipart/form-data',
							// },
							formData: {
								image:tempFilePaths[0],
								token:'KASgjB4hFZPZtXZQ3ff9cizIIFQpAkrP',
								
							},
							success: (uploadFileRes) => {
								console.log("成功了")
								// 根据接口具体返回格式   赋值具体对应url
								console.log(uploadFileRes);
							},
							fail: () => {
								console.log("失败了")
							},
							complete: () => {
								console.log("发到API服务器了")
							}

						})

					},
					fail: () => {
						console.log("图片上传失败了")
					},
					complete: () => {
						console.log("图片反正是上传了")
					},
				});
				
			},
			confirmAvator(value){
				console.log(value)
				
				uni.request({
					url: "http://127.0.0.1:8088/user/updateAvator",
					method: "POST",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"avator": value.trim(),
						"phoneNumber": this.getPhoneNumber
					},
					success: (res) => {
						console.log("修改成功了")
						this.getUser()
					},
					fail: () => {
						console.log("修改失败了")
					},
					complete: () => {
						console.log("修改方法执行了")
					}
				})
				
				this.$refs.popupAvator.close()
				
			},
			closeAvator() {
				this.$refs.popupAvator.close()
			},
			//用户名
			updateUserName() {
				this.$refs.popupUserName.open()
				console.log("我的昵称")
			},

			closeUserName() {
				this.$refs.popupUserName.close()
			},

			confirmUserName(value) {
				console.log(value)

				uni.request({
					url: "http://127.0.0.1:8088/user/updateUserName",
					method: "POST",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"userName": value.trim(),
						"phoneNumber": this.getPhoneNumber
					},
					success: (res) => {
						console.log("修改成功了")
						this.getUser()
					},
					fail: () => {
						console.log("修改失败了")
					},
					complete: () => {
						console.log("修改方法执行了")
					}
				})

				this.$refs.popupUserName.close()
			},
			//密码
			updatePassword() {
				this.$refs.popupPassword.open()
				console.log("修改密码")
			},

			closePassword() {
				this.$refs.popupPassword.close()
			},

			confirmPassword(value) {
				console.log(value)

				uni.request({
					url: "http://127.0.0.1:8088/user/updatePassword",
					method: "POST",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"password": value,
						"phoneNumber": this.getPhoneNumber
					},
					success: (res) => {
						console.log("修改成功了")
						this.getUser()
					},
					fail: () => {
						console.log("修改失败了")
					},
					complete: () => {
						console.log("修改方法执行了")
					}
				})

				this.$refs.popupPassword.close()
			},

			updatePhoneNumber() {
				console.log("联系方式")
				uni.showToast({
					title: "联系方式暂不支持修改",

				})
			},

			updateCreatedTime() {
				console.log("注册时间")
			},

			toFeedback() {
				console.log("意见反馈")

			},

			toLogin() {
				this.logout()

				uni.switchTab({
					url: "../index/index"
				})
			},

			getUser() {

				uni.request({
					url: "http://127.0.0.1:8088/user/getAUserByPhoneNumber",
					method: "GET",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"phoneNumber": this.getPhoneNumber
					},
					success: (res) => {
						this.user = res.data
					},
					fail: () => {
						console.log("登录方法执行失败了")
					},
					complete: () => {
						console.log("登录方法调用执行")
					}
				})

			}

		},
		computed: {
			...mapState({}),
			...mapGetters(['getPhoneNumber'])
		}
	}
</script>

<style lang="scss">
	.list {
		// border: 1px solid black;
		width: 730rpx;
		height: 100rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		margin-top: 10rpx;
		cursor: pointer;

		.list-title {
			// border: 1px solid black;
			font-weight: bold;
		}

		.list-content {
			// border: 1px solid black;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;

			image {
				// border: 1px solid black;	
				width: 100rpx;
				height: 100rpx;
			}

			span {
				// border: 1px solid black;
				font-weight: bold;
				margin-left: 20rpx;
				margin-right: 20rpx;
			}

			view {
				font-weight: bold;

			}

		}


	}

	button {
		width: 730rpx;
		margin: 0 auto;
		// color: red;
		// background-color: white;
	}
</style>
