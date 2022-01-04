<template>
	<view>

		<view class="content">
<!-- 
			<view class="title">
				<h1>请选择图片上传</h1>
			</view> -->

			<view class="chooseValue">


				<uni-file-picker class="chooseImage" v-model="imageValue" file-mediatype="image" mode="grid"
					file-extname="png,jpg,jpeg" :limit="1" @progress="progress" @success="success" @fail="fail"
					@select="select" />


				<input class="input" placeholder="请输入文字" v-model="text" />
			</view>
			<button @click="toShare()">分享</button>
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
				imageValue: [],
				videoValue: [],
				text: ""
			};
		},
		onLoad() {
			if (this.getHasLogin) { //已经登录，放行

			} else { //没登录
				uni.redirectTo({
					url: "../login/login"
				})
			}
		},
		onShow() {
			
		},
		methods: {
			...mapMutations(['login', 'logout']),

			toShare() {
				if (this.image != null) {

					uni.request({
						url: "http://127.0.0.1:8088/work/shareWork",
						method: "POST",
						header: {
							'content-type': "application/x-www-form-urlencoded"
						},
						data: {
							"image": this.image,
							"text": this.text,
							"phoneNumber": this.getPhoneNumber
						},
						success: (res) => {
							console.log("创作成功了")
							this.imageValue = []
							this.text = ""
							
						},
						fail: () => {
							console.log("创作失败了")
						},
						complete: () => {
							console.log("创作方法执行了")
						}
					})

					uni.switchTab({
						url: "../index/index"
					})


				} else {
					uni.showToast({
						title: "你还没有上传图片啊"
					})
				}

			},

			// 获取上传状态
			select(chooseImageRes) {
				const tempFilePaths = chooseImageRes.tempFilePaths;
				uni.uploadFile({
					url: 'http://127.0.0.1:8088/work/uploadWork',
					method: 'POST',
					fileType: 'image', //图片类型
					name: 'file',
					filePath: tempFilePaths[0], //哪张图片
					formData: {
						image: tempFilePaths[0],
					},
					success: (uploadFileRes) => {
						console.log("成功了")
						// 根据接口具体返回格式   赋值具体对应url
						console.log(uploadFileRes);
						this.image = uploadFileRes.data
					},
					fail: () => {
						console.log("失败了")
					},
					complete: () => {
						console.log("发到API服务器了")
					}

				})

			},
			// 获取上传进度
			progress(e) {
				console.log('上传进度：', e)
			},

			// 上传成功
			success(e) {
				console.log('上传成功')
			},

			// 上传失败
			fail(e) {
				console.log('上传失败：', e)
			}
		},
		computed: {
			...mapState({}),
			...mapGetters(['getHasLogin', 'getPhoneNumber'])
		}
	}
</script>

<style lang="scss">
	.content {
		// border: 1px solid black;
		margin: 0 auto;
		// display: flex;
		// flex-flow: column nowrap;

		.title {
			// border: 1px solid black;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.chooseValue {
			// border: 1px solid black;
			min-height: 400rpx;

			.chooseImage {
				// border: 1px solid black;
			}

			.input {
				// border: 1px solid black;
				min-height: 160rpx;
				font-size: 80rpx;
			}

		}

	}
</style>
