<template>
	<view class="content">

		<view class="messageBox" v-for="message in messageList" @click="toDetail(message.id)">

			<view class="message">
				<view class="message-content-user">
					<view class="avatorImg">
						<image :src="message.avatorImg"></image>
					</view>
					<view class="userName">
						<text>{{message.userName}}</text>
					</view>

				</view>
				<view class="message-content-pic">
					<image :src="message.pic"></image>
				</view>
				<view class="message-content-title">
					<text>{{message.title}}</text>
				</view>
				<view class="message-content-timeAndLike">
					<view class="time">
						<text>{{message.createdTime}}</text>
					</view>
					<view class="like">
						<span class="iconfont icon-kongxin"></span>
						<text>{{message.like}}</text>
					</view>
				</view>

			</view>


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
				messageList: []
			}
		},
		onLoad() {
			this.getMessage()
		},
		onShow() {
			this.getMessage()
		},
		methods: {
			...mapMutations(['login', 'logout']),
			
			getMessage() {
				uni.request({
					url: "http://127.0.0.1:8088/work/getOpusForIndex",
					method: "GET",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {

					},
					success: (res) => {
						this.messageList = res.data
						console.log(res)
					},
					fail: () => {
						console.log("获取方法执行失败了")
					},
					complete: () => {
						console.log("获取方法调用执行")
					}
				})
			},


			toDetail(id) {
				uni.navigateTo({
					url: "../detail/detail?id="+id
				})
			}


		},
		computed: {
			...mapState({}),
			...mapGetters(['getHasLogin','getPhoneNumber'])
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}

	.messageBox {
		// border: 1px solid black;
		width: 100%;
		height: 720rpx;
		background-color: white;
		margin-bottom: 30rpx;



		.message {
			// border: 1px solid black;
			width: 94%;
			height: 700rpx;
			margin: 10rpx auto;
			background-color: white;


			.message-content-user {
				//border: 1px solid black;
				width: 100%;
				height: 100rpx;
				display: flex;

				.avatorImg {
					// //border: 1px solid black;
					// width: 90rpx;
					// height: 90rpx;
					// border-radius: 50%;

					image {
						//border: 1px solid black;
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
					}

				}

				.userName {
					//border: 1px solid black;
					min-width: 400rpx;
					height: 100rpx;
					line-height: 100rpx;
					margin-left: 20rpx;

				}

			}

			.message-content-pic {
				//border: 1px solid black;
				width: 100%;
				height: 400rpx;

				image {
					//border: 1px solid black;
					width: 400rpx;
					height: 400rpx;
					border-radius: 5%;
				}

			}

			.message-content-title {
				//border: 1px solid black;
				width: 100%;
				height: 100rpx;

				text {

					line-height: 100rpx;
					font-weight: 400;
					font-size: 36rpx;
					font-family: '';

				}

			}

			.message-content-timeAndLike {
				//border: 1px solid black;
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: space-between;


				.time {
					//border: 1px solid black;

					text {
						font-size: 30rpx;
						color: #878787;
					}
				}

				.like {
					//border: 1px solid black;
					line-height: 80rpx;
				}
			}

		}

	}
</style>
