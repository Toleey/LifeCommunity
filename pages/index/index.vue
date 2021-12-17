<template>
	<view class="content">
		
		<view class="messageBox" v-for="message in messageList" @click="toDetail(id)">
			
			<view class="message" >
				<view class="message-content-user">
					<view class="avatorImg">
						<image :src="message.avatorImge"></image>
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
						<text>{{message.time}}</text>
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
	export default {
		data() {
			return {
				messageList:[
					{
						id:1,
						avatorImge:"https://gravatar.zeruns.tech/avatar/5e9fdf300b97d878116e998848aaac71?s=256&d=wavatar",
						userName:"泡泡龙",
						pic:"https://www.qinqinghu.top/static/upload/1635648215296_mmexport1628866204399.jpg",
						title:"真的好有趣，一定要好好地生活啊！",
						time:"11-14 11:14",
						like:"1"
					},
					{
						id:2,
						avatorImge:"https://gravatar.zeruns.tech/avatar/5e9fdf300b97d878116e998848aaac71?s=256&d=wavatar",
						userName:"泡泡龙",
						pic:"https://www.qinqinghu.top/static/upload/1635648215296_mmexport1628866204399.jpg",
						title:"真的好有趣，一定要好好地生活啊！",
						time:"11-14 11:14",
						like:"1"
					},
				]
				
				
			}
		},
		onLoad() {

		},
		methods: {
			toDetail(id){
				uni.navigateTo({
					url:"../detail/detail"
				})
			}
		}
	}
</script>

<style lang="scss">
	
	page{
		background-color: #F5F5F5;
	}
	
	.messageBox{
		// border: 1px solid black;
		width: 100%;
		height: 720rpx;
		background-color: white;
		margin-bottom: 30rpx;
		
		
		
		.message{
			// border: 1px solid black;
			width: 94%;
			height: 700rpx;
			margin: 10rpx auto;
			background-color: white;
			
			
			.message-content-user{
				//border: 1px solid black;
				width: 100%;
				height: 100rpx;
				display: flex;
				
				.avatorImg{
					// //border: 1px solid black;
					// width: 90rpx;
					// height: 90rpx;
					// border-radius: 50%;
					
					image{
						//border: 1px solid black;
						width: 90rpx;
						height: 90rpx;
						border-radius: 50%;
					}
					
				}
				
				.userName{
					//border: 1px solid black;
					min-width: 400rpx;
					height: 100rpx;
					line-height: 100rpx;
					margin-left: 20rpx;
					
				}
				
			}
			.message-content-pic{
				//border: 1px solid black;
				width: 100%;
				height: 400rpx;
				
				image{
					//border: 1px solid black;
					width: 400rpx;
					height: 400rpx;
					border-radius: 5%;
				}
				
			}
			.message-content-title{
				//border: 1px solid black;
				width: 100%;
				height: 100rpx;
				
				text{
					
					line-height: 100rpx;
					font-weight: 400;
					font-size: 36rpx;
					font-family: '';
					
				}
				
			}
			.message-content-timeAndLike{
				//border: 1px solid black;
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				
				
				.time{
					//border: 1px solid black;
					
					text{
						font-size: 30rpx;
						color: #878787;
					}
				}
				
				.like{
					//border: 1px solid black;
					line-height: 80rpx;
				}
			}
			
		}
		
	}
	
	
	
</style>
