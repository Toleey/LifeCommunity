<template>
	<view>
		
		<view class="header">
			<view class="avator" @click="toUser()">
				<image :src="user.avator"></image>
			</view>
			<view class="userInfo" @click="toUser()">
				<view class="userInfo-name">
					<text class="userInfo-name-title">{{user.userName}}</text>
					<span class="userInfo-name-icon iconfont icon-icon-xiugai"></span>
				</view>
				<view class="userInfo-id">
					<text>lid:</text>
					<text>{{user.id}}</text>
				</view>
				
			</view>
			<view class="message" @click="toMessage()">
				<!-- <text class="message-num">{{user.message}}</text>
				<text class="message-name">消息</text> -->
			</view>
		</view>
		
		<view class="chooseMenu">
			<view class="post" :style="chooseLine1" @click="toPost()">
				<text class="post-name" >发布</text>
				<text class="post-num">{{post}}</text>
			</view>
			<view class="like" :style="chooseLine2" @click="toLike()">
				<text class="like-name" >喜欢</text>
				<text class="like-num">{{like}}</text>
			</view>
		</view>
		
		<view class="nocontent" v-show="show" @click="toShow()">暂无作品</view>
		
		<swiper class="swiperBox" :current-item-id="showContent" @change="toChange">
			<swiper-item class="content" item-id="0">
				<view v-for="work in workList" @click="toDetail(work.id)">
					<image :src="work.pic"></image>
				</view>
			</swiper-item>
			<swiper-item class="content" item-id="1">
				<view v-for="like in likeList" @click="toDetail(like.id)">
					<image :src="like.pic"></image>
				</view>
			</swiper-item>
		</swiper>
		
		
		
	
		
		
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
				phoneNumber:"",
				post:0,
				like:0,
				message:0,
				user:{},
				workList:[],
				likeList:[],
				showContent:"0",
				chooseLine1:"",
				chooseLine2:"",
				show:false,
			};
		},
		onLoad() {
			this.getUser()
			this.getWorks()
			this.getWorkCount()
			this.toShow()
			this.getLikeWorks()
			this.getLikeWorkCount()
		},
		onShow() {
			if(this.getHasLogin){ //已经登录，放行
				console.log(this.getHasLogin)
			}else{ //没登录
				uni.redirectTo({
					url:"../login/login"
				})
			}
			this.getUser()
			this.getWorks()
			this.getWorkCount()
			this.chooseLine1="border-bottom: 5rpx solid #E70008;"
			this.chooseLine2=""
			this.showContent="0"
			this.toShow()
			this.getLikeWorks()
			this.getLikeWorkCount()
		},
		methods:{
			...mapMutations(['login', 'logout']),
			
			getLikeWorkCount(){
				
				uni.request({
					url: "http://127.0.0.1:8088/work/getCountLike",
					method: "GET",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"phoneNumber": this.getPhoneNumber
					},
					success: (res) => {
						this.like = res.data
						// console.log(this.post)
						if(this.post!=0){
							this.show=false
						}
					},
					fail: () => {
						console.log("获取点赞方法执行失败了")
					},
					complete: () => {
						console.log("获取点赞方法调用执行")
					}
				})
				
			},
			getLikeWorks(){
				
				uni.request({
					url: "http://127.0.0.1:8088/work/getAllLikeWork",
					method: "GET",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"phoneNumber": this.getPhoneNumber
					},
					success: (res) => {
						this.likeList = res.data
						// console.log(this.post)
						if(this.post!=0){
							this.show=false
						}
					},
					fail: () => {
						console.log("获取点赞作品方法执行失败了")
					},
					complete: () => {
						console.log("获取点赞作品方法调用执行")
					}
				})
				
			},
			toShow(){
				console.log(this.post)
				if(this.post==0){
					this.show=true
				}else{
					this.show=false
				}
			},
			toChange(e){
				if(e.detail.currentItemId==1){
					this.toLike()
				}else if(e.detail.currentItemId==0){
					this.toPost()
				}
			},
			toLike(){
				this.showContent="1"
				this.chooseLine1=""
				this.chooseLine2="border-bottom: 5rpx solid #E70008;"
			},
			toPost(){
				this.showContent="0"
				this.chooseLine1="border-bottom: 5rpx solid #E70008;"
				this.chooseLine2=""
			},
			getWorkCount(){

				uni.request({
					url: "http://127.0.0.1:8088/work/getWorkCountByPhoneNumber",
					method: "GET",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"phoneNumber": this.getPhoneNumber
					},
					success: (res) => {
						this.post = res.data
						// console.log(this.post)
						if(this.post!=0){
							this.show=false
						}
					},
					fail: () => {
						console.log("获取作品方法执行失败了")
					},
					complete: () => {
						console.log("获取作品方法调用执行")
					}
				})
				
				
			},
			
			getWorks(){
				
				uni.request({
					url: "http://127.0.0.1:8088/work/getAllWorksByPhoneNumber",
					method: "GET",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						"phoneNumber": this.getPhoneNumber
					},
					success: (res) => {
						this.workList = res.data
					},
					fail: () => {
						console.log("获取作品方法执行失败了")
					},
					complete: () => {
						console.log("获取作品方法调用执行")
					}
				})
				
			},
			getUser(){
				
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
						console.log("获取用户方法执行失败了")
					},
					complete: () => {
						console.log("获取用户方法调用执行")
					}
				})
				
			},
			toDetail(workId){
				console.log(workId)
				uni.navigateTo({
					url: "../detail/detail?id="+workId
				})
			},
			toUser(){
				uni.navigateTo({
					url:"../user/user"
				})
			},
			toMessage(){
				uni.navigateTo({
					url:"../message/message"
				})
			},
			
			
		},
		computed: {
			...mapState({}),
			...mapGetters(['getHasLogin','getPhoneNumber'])
		}
	}
</script>

<style lang="scss">

	.header{
		width: 750rpx;
		height: 150rpx;
		//border: 1px solid black;
		display: flex;
		flex-flow: row nowrap;
		cursor: pointer;
		
		.avator{
			//border: 1px solid black;
			display: flex;
			justify-content: center;
			align-items: center;
			
			image{
				width: 100rpx;
				height: 100rpx;
				border-radius: 10%;
			}
			
		}
		
		.userInfo{
			// border: 1px solid black;
			padding-left: 20rpx;
			width: 550rpx;
			display: flex;
			flex-flow: column nowrap;
			justify-content: center;
			
			.userInfo-name{
				//border: 1px solid black;
				
				.userInfo-name-title{
					font-weight: bold;
				}
				.userInfo-name-icon{
					font-size: 33rpx;
				}
				
			}
			
			.userInfo-id{
				//border: 1px solid black;
				font-size: 35rpx;
			}
			
		}
		
		.message{
			//border: 1px solid black;
			width: 100rpx;
			display: flex;
			flex-flow: column nowrap;
			// justify-content: center;
			align-items: center;
			
			.message-num{
				// //border: 1px solid black;
				margin-left: 55rpx;
				background-color: red;
				color: white;
				border-radius: 50%;
				width: 40rpx;
				height: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 20rpx;
				margin-bottom: -10rpx;
			}
			
			.message-name{
				// //border: 1px solid black;
				
			}
		}
		
	}
	.chooseMenu{
		display: flex;
		flex-flow: row nowrap;
		//border: 1px solid black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;
		width: 750rpx;
		height: 80rpx;
		
		.post{
			// //border: 1px solid black;
			width: 375rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			// border-bottom: 5rpx solid #E70008;
			
			
			.post-name{
				
			}
			
			.post-num{
				margin-left: 10rpx;
				
			}
			
		}
		
		.like{
			//border: 1px solid black;
			width: 375rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			// border-bottom: 5rpx solid #E70008;
			
			.like-name{
				
			}
			
			.like-num{
				margin-left: 10rpx;
				
			}
			
		}
		
	}
	
	.nocontent{
		margin: 50rpx;
		//border: 1px solid black;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.swiperBox{
		// border: 1px solid black;
		min-height: 700px;
		width: 750rpx;
		margin-bottom: 10rpx;
		
		.content{
			// border: 1px solid black;
			width: 750rpx;
			min-height: 700rpx;
			// height: 800rpx;
			display: flex;
			flex-flow: row wrap;
			align-content: flex-start; 
			
			image{
				margin: 5rpx;
				width: 240rpx;
				height: 240rpx;
				border-radius: 5%;
				
			}
		}
		
	}


</style>
