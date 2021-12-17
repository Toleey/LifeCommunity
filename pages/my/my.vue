<template>
	<view>
		
		<view class="header">
			<view class="avator">
				<image src="https://gravatar.zeruns.tech/avatar/2aeb599ab872efb092bce259f75d6154?s=256&d=wavatar"></image>
			</view>
			<view class="userInfo">
				<view class="userInfo-name">
					<text class="userInfo-name-title">泡泡龙</text>
					<span class="userInfo-name-icon iconfont icon-icon-xiugai"></span>
				</view>
				<view class="userInfo-id">
					<text>emodId:</text>
					<text>15</text>
				</view>
				
			</view>
			<view class="message">
				<text class="message-num">0</text>
				<text class="message-name">消息</text>
			</view>
		</view>
		
		<view class="chooseMenu">
			<view class="post">
				<text class="post-name">发布</text>
				<text class="post-num">0</text>
			</view>
			<view class="private">
				<text class="private-name">私有</text>
				<text class="private-num">0</text>
			</view>
			<view class="like">
				<text class="like-name">喜欢</text>
				<text class="like-num">0</text>
			</view>
		</view>
		
		<view class="nocontent" v-show="false">暂无作品</view>
		
		
		<view class="content">
			<view>
				<image src="https://www.qinqinghu.top/static/dyImgs/7026645239490301217_1636285435380.jpg"></image>
			</view>
			<view>
				<image src="https://www.qinqinghu.top/static/imgs/Re62kcU_1634996356581.jpg"></image>
			</view>
			<view>
				<image src="https://www.qinqinghu.top/static/upload/1635648215296_mmexport1628866204399.jpg"></image>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
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
			width: 250rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			border-bottom: 5rpx solid #E70008;
			
			.post-name{
				
			}
			
			.post-num{
				margin-left: 10rpx;
				
			}
			
		}
		
		.private{
			//border: 1px solid black;
			width: 250rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			
			.private-name{
				
			}
			
			.private-num{
				margin-left: 10rpx;
				
			}
			
		}
		
		.like{
			//border: 1px solid black;
			width: 250rpx;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			
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
	
	.content{
		//border: 1px solid black;
		width: 750rpx;
		min-height: 700rpx;
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

</style>
