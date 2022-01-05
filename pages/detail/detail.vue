<template>
	<view>

		<view class="contentBox">
			<swiper class="carsouel" :indicator-dots="false" indicator-active-color="rgba(253, 128, 8, 1.0)"
				autoplay="true" circular="true">
				<swiper-item>
					<!-- <swiper-item v-for="(pic,i) in pictureList" :key=i> -->
					<image @click="toPreview" :src="message.pic"></image>
					<!-- <image @click="toPreview(pic.pic)" :src="pic.pic"></image> -->
				</swiper-item>
			</swiper>
		</view>


		<view class="detailContent">
			<view class="title">{{message.title}}</view>
			<!-- <view class="time"><text>{{message.createdTime}}</text></view> -->
			<uni-dateformat :date="message.createdTime" :threshold="[60000, 3600000]"></uni-dateformat>
			<view class="user">
				<view class="user-left">
					<view class="avator">
						<image :src="message.avatorImg"></image>
					</view>
					<view class="userName">{{message.userName}}</view>
				</view>
				<view class="user-right" @click="toWorkLike(message.id)">
					<span class="iconfont icon-kongxin"></span>
					<text>{{message.like}}</text>
				</view>
			</view>



			<input class="commentInput" placeholder="请输入评论" confirm-type="send" @click="toComment()" />

			<view class="commentContent" v-for="c in commentList">
				<view class="commentAvator">
					<image :src="c.avatorImg"></image>
				</view>
				<view class="commentInfo">
					<view class="commentUserName"><text>{{c.userName}}</text></view>
					<view class="commentTitle"><text>{{c.content}}</text></view>
					<!-- <view class="commentTime"><text>{{c.createdTime}}</text></view> -->
					<uni-dateformat :date="c.createdTime" :threshold="[60000, 3600000]"></uni-dateformat>
				</view>
				<!-- <view class="commentLike" @click="toCommentLike(c.id)"> -->
				<view class="commentLike" @click="getCommentIsLike(c.id)">
					<span class="iconfont icon-kongxin"></span>
					<text>{{c.like}}</text>
				</view>
			</view>

		</view> <!-- 为了comment距离 -->

		<!-- </view>  为了照顾list -->

		<uni-popup ref="popupComment" type="dialog">
			<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="closeComment"
				@confirm="confirmComment"></uni-popup-dialog>
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
				message: {},
				commentList: [],
				work: {},
				pictureList: [],
				workLike: 0,
				commentLike: 0
			};
		},
		onLoad(e) {
			this.getAMessage(e)
			this.getComments(e)
			this.getWorkId(e)
			this.getAllPictures(e)
			this.getWorkIsLike(e)
		},
		onUnload() {

		},
		methods: {
			...mapMutations(['login', 'logout']),

			getCommentIsLike(commentId) {

				uni.request({
					url: "http://127.0.0.1:8088/comment/getCommentIsLike",
					method: "GET",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"commentId": commentId,
						"phoneNumber": this.getPhoneNumber
					},
					success: (res) => {
						this.commentLike = res.data
						this.toCommentLike(commentId)
					},
					fail: () => {

					},
					complete: () => {

					}
				})

			},

			getWorkIsLike(e) {

				uni.request({
					url: "http://127.0.0.1:8088/work/getIsLike",
					method: "GET",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"workId": e.id,
						"phoneNumber": this.getPhoneNumber
					},
					success: (res) => {
						this.workLike = res.data

					},
					fail: () => {

					},
					complete: () => {

					}
				})

			},

			getAllPictures(e) {

				uni.request({
					url: "http://127.0.0.1:8088/work/getAllPictures",
					method: "GET",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"workId": e.id
					},
					success: (res) => {
						this.pictureList = res.data

					},
					fail: () => {

					},
					complete: () => {

					}
				})


			},
			toPreview() {
				uni.previewImage({
					urls: [this.message.pic]

				})
			},
			// toPreview(i){
			// 	// console.log(this.message.pic)
			// 	console.log(i)


			// 	uni.previewImage({
			// 		urls:[i]

			// 	})
			// },
			toCommentLike(commentId) {
				// console.log(commentId)
				if (this.getHasLogin) { //已经登录，放行

					// this.getCommentIsLike(commentId) //调用方法，检查是否点赞

					console.log(this.commentLike)

					if (this.commentLike != 0) { //已经点赞过了，不执行
						uni.showToast({
							title: "你已经点过赞了！"
						})
					} else { //还没有点赞，可以点赞

						uni.request({
							url: "http://127.0.0.1:8088/comment/toLike",
							method: "GET",
							header: {
								'content-type': "application/x-www-form-urlencoded"
							},
							data: {
								"commentId": commentId
							},
							success: (res) => {
								this.getComments(this.work)

							},
							fail: () => {

							},
							complete: () => {

							}
						})

						uni.request({
							url: "http://127.0.0.1:8088/comment/likeThisComment",
							method: "GET",
							header: {
								'content-type': "application/x-www-form-urlencoded"
							},
							data: {
								"commentId": commentId,
								"phoneNumber": this.getPhoneNumber
							},
							success: (res) => {
								this.getComments(this.work)

							},
							fail: () => {

							},
							complete: () => {

							}
						})

					}
				} else { //没登录
					uni.redirectTo({
						url: "../login/login"
					})
				}

				this.commentLike = 0

			},
			toWorkLike(workId) {
				if (this.getHasLogin) { //已经登录，放行
					//console.log(workId)
					// console.log(this.workLike)
					if (this.workLike > 0) { //已经点赞过了，不执行
						uni.showToast({
							title: "你已经点过赞了！"
						})
					} else { //还没有点赞，可以点赞


						uni.request({
							url: "http://127.0.0.1:8088/work/toLike",
							method: "GET",
							header: {
								'content-type': "application/x-www-form-urlencoded"
							},
							data: {
								"workId": workId
							},
							success: (res) => {
								this.getAMessage(this.work)
							},
							fail: () => {

							},
							complete: () => {

							}
						})

						uni.request({
							url: "http://127.0.0.1:8088/work/likeThisWork",
							method: "GET",
							header: {
								'content-type': "application/x-www-form-urlencoded"
							},
							data: {
								"workId": workId,
								"phoneNumber": this.getPhoneNumber
							},
							success: (res) => {
								this.getAMessage(this.work)
								this.getWorkIsLike(this.work)
							},
							fail: () => {

							},
							complete: () => {

							}
						})



					}

				} else { //没登录
					uni.redirectTo({
						url: "../login/login"
					})
				}

			},
			getWorkId(e) {
				this.work = e
			},
			toComment() {
				if (this.getHasLogin) { //已经登录，放行
					this.$refs.popupComment.open()
				} else { //没登录
					uni.redirectTo({
						url: "../login/login"
					})
				}
			},
			confirmComment(value) {

				uni.request({
					url: "http://127.0.0.1:8088/comment/addAComment",
					method: "GET",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"workId": this.work.id,
						"content": value,
						"phoneNumber": this.getPhoneNumber
					},
					success: (res) => {
						this.getComments(this.work)
						this.commentLike = 0
					},
					fail: () => {

					},
					complete: () => {

					}
				})

				this.$refs.popupComment.close()
			},
			closeComment() {
				this.$refs.popupComment.close()
			},
			getComments(e) {
				uni.request({
					url: "http://127.0.0.1:8088/comment/getAWorkComment",
					method: "GET",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"workId": e.id
					},
					success: (res) => {
						this.commentList = res.data

					},
					fail: () => {

					},
					complete: () => {

					}
				})
			},
			getAMessage(e) {
				// console.log(e.id)
				uni.request({
					url: "http://127.0.0.1:8088/work/getAOpus",
					method: "GET",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"id": e.id
					},
					success: (res) => {
						this.message = res.data
						console.log(this.message)
					},
					fail: () => {

					},
					complete: () => {

					}
				})
			}

		},
		computed: {
			...mapState({}),
			...mapGetters(['getHasLogin', 'getPhoneNumber'])
		}

	}
</script>

<style lang="scss">
	.contentBox {
		//border: 1px solid black;
		width: 100%;
		min-height: 300rpx;

		.carsouel {
			// border: 1px solid black;
			width: 100%;
			min-height: 300rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.detailContent {
		//border: 1px solid black;
		margin: 0 auto;
		width: 720rpx;

		.title {
			height: 60rpx;
			line-height: 60rpx;
			//border: 1px solid black;
			font-size: 36rpx;
			font-weight: 400;
			font-family: '';
		}

		.time {
			height: 45rpx;
			line-height: 45rpx;

			text {
				font-size: 30rpx;
				color: #878787;
			}
		}

		.user {
			//border: 1px solid black;
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			// background-color: red;

			.user-left {
				//border: 1px solid black;
				display: flex;
				justify-content: space-between;

				.avator {

					image {
						margin: 5rpx auto;
						//border: 1px solid black;
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;

					}

				}

				.userName {
					line-height: 80rpx;
					//border: 1px solid black;
					margin-left: 10rpx;
					font-size: 35rpx;
				}

			}

			.user-right {
				//border: 1px solid black;
				display: flex;

				span {
					font-size: 40rpx;
				}

			}

		}

	}

	.commentInput {
		//border: 1px solid black;
		background-color: #F5F5F5;
		height: 70rpx;
		border-radius: 5%;
		margin: 20rpx 0 20rpx 0;
		padding-left: 20rpx;
	}

	.commentContent {
		margin-top: 20rpx;
		// border: 1px solid black;
		display: flex;
		flex-flow: row nowrap;
		height: 157rpx;
		width: 100%;

		.commentAvator {
			//border: 1px solid black;
			display: flex;
			justify-content: center;
			// align-items: center;
			width: 65rpx;

			image {

				margin: 3rpx auto;
				margin-top: 10rpx;
				//border: 1px solid black;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
			}
		}

		.commentInfo {
			//border: 1px solid black;
			display: flex;
			flex-flow: column nowrap;
			width: 656rpx;


			.commentUserName {
				//border: 1px solid black;
				height: 50rpx;

				text {
					font-size: 34rpx;
					color: #878787;
				}

			}

			.commentTitle {
				//border: 1px solid black;
				height: 60rpx;
				line-height: 60rpx;

				text {
					font-size: 34rpx;
					color: black;
				}

			}

			.commentTime {
				//border: 1px solid black;
				height: 30rpx;
				line-height: 30rpx;

				text {
					font-size: 30rpx;
					color: #878787;
				}
			}

		}

		.commentLike {
			//border: 1px solid black;
			width: 60rpx;

			display: flex;
			justify-content: center;
			align-items: center;

			span {
				font-size: 40rpx;
			}

		}

	}
</style>
