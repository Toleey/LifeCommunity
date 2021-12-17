<template>
	<view>
		
		<!-- <view v-for="m in messageList"> -->
			
			<view class="contentBox" v-for="m in messageList">
				<swiper class="carsouel" indicator-dots="true" indicator-active-color="rgba(253, 128, 8, 1.0)" autoplay="true" circular="true" >
					<swiper-item>
						<image :src="m.pic"></image>
					</swiper-item>
					<swiper-item>
						<image :src="m.pic"></image>
					</swiper-item>
				</swiper>
			</view>
			
			
			<view class="detailContent" v-for="m in messageList">
				<view class="title">{{m.title}}</view>
				<view class="time"><text>{{m.time}}</text></view>
				<view class="user">
					<view class="user-left">
						<view class="avator">
							<image :src="m.avatorImge"></image>
						</view>
						<view class="userName">{{m.userName}}</view>
					</view>
					<view class="user-right">
						<span class="iconfont icon-kongxin"></span>
						<text>{{m.like}}</text>
					</view>
				</view>	
			
		
			
				<input class="commentInput" placeholder="请输入评论" confirm-type="send" />
			
				<view class="commentContent" v-for="c in commentList">
					<view class="commentAvator">
						<image :src="c.avatorImge"></image>
					</view>
					<view class="commentInfo">
						<view class="commentUserName"><text>{{c.userName}}</text></view>
						<view class="commentTitle"><text>{{c.content}}</text></view>
						<view class="commentTime"><text>{{c.time}}</text></view>
					</view>
					<view class="commentLike">
						<span class="iconfont icon-kongxin"></span>
						<text>{{c.like}}</text>
					</view>
				</view>
				
			</view> <!-- 为了comment距离 -->
			
		<!-- </view>  为了照顾list -->
		
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
					
					
				],
				commentList:[
					{
						id:1,
						avatorImge:"https://gravatar.zeruns.tech/avatar/34e44bd7a11be5a7f446e3a3ffdf0bf4?s=256&d=wavatar",
						userName:"大包子",
						content:"哈哈，谢谢",
						time:"11-14 11:14",
						like:"1"
					},
					{
						id:2,
						avatorImge:"https://gravatar.zeruns.tech/avatar/34e44bd7a11be5a7f446e3a3ffdf0bf4?s=256&d=wavatar",
						userName:"大包子",
						content:"哈哈，谢谢",
						time:"11-14 11:14",
						like:"2"
					},
				]
				
			};
		}
	}
</script>

<style lang="scss">
	.contentBox{
	//border: 1px solid black;
		width: 100%;
		min-height: 300rpx;
		
		.carsouel{
		//border: 1px solid black;
			width: 100%;
			min-height: 300rpx;
		}
	}
	
	.detailContent{
	//border: 1px solid black;
		margin: 0 auto;
		width: 720rpx;
		
		.title{
			height: 60rpx;
			line-height: 60rpx;
		//border: 1px solid black;
			font-size: 36rpx;
			font-weight: 400;
			font-family: '';
		}
		.time{
			height: 45rpx;
			line-height: 45rpx;
			text{
				font-size: 30rpx;
				color: #878787;
			}
		}
		.user{
		//border: 1px solid black;
			display: flex;
			justify-content: space-between;
			height: 80rpx;
			// background-color: red;
			
			.user-left{
			//border: 1px solid black;
				display: flex;
				justify-content: space-between;
				
				.avator{
					
					image{
						margin: 5rpx auto;
					//border: 1px solid black;
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					
					}
					
				}
				.userName{
					line-height: 80rpx;
				//border: 1px solid black;
					margin-left: 10rpx;
					font-size: 35rpx;
				}
				
			}
			
			.user-right{
			//border: 1px solid black;
				display: flex;
				
				span{
					font-size: 40rpx;
				}
				
			}
			
		}
		
	}
	
	.commentInput{
	//border: 1px solid black;
		background-color: #F5F5F5;
		height: 70rpx;
		border-radius: 5%;
		margin: 20rpx 0 20rpx 0;
		padding-left: 20rpx;
	}
	
	.commentContent{
		margin-top: 20rpx;
		// border: 1px solid black;
		display: flex;
		flex-flow: row nowrap;
		height: 157rpx;
		width: 100%;
				
		.commentAvator{
		//border: 1px solid black;
			display: flex;
			justify-content: center;
			// align-items: center;
			width: 65rpx;
			
			image{
				
				margin: 3rpx auto;
				margin-top: 10rpx;
			//border: 1px solid black;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
			}
		}
		.commentInfo{
		//border: 1px solid black;
			display: flex;
			flex-flow: column nowrap;
			width: 656rpx;
			
			
			.commentUserName{
			//border: 1px solid black;
				height: 50rpx;
				text{
					font-size: 34rpx;
					color: #878787;
				}
				
			}
			.commentTitle{
			//border: 1px solid black;
				height: 60rpx;
				line-height: 60rpx;
				text{
					font-size: 34rpx;
					color: black;
				}
				
			}
			.commentTime{
			//border: 1px solid black;
				height: 30rpx;
				line-height: 30rpx;
				
				text{
					font-size: 30rpx;
					color: #878787;
				}
			}
			
		}
		.commentLike{
		//border: 1px solid black;
			width: 60rpx;
			
			display: flex;
			justify-content: center;
			align-items: center;
			
			span{
				font-size: 40rpx;
			}
			
		}
		
	}
	

</style>
