<template>
	<view>
		
		<view class="content"  v-for="m in messageList">
			<view class="avator">
				<image class="avatorImg" :src="m.avatorImg"></image>
			</view>
			<view class="message">
				<view class="message-title">
					<text>{{m.userName}}&nbsp;</text>
					<text>赞了你的作品</text>
				</view>
				<view class="message-time">
					<text>{{m.time}}</text>
				</view>
			</view>
			<view class="work">
				<image :src="m.pic"></image>
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
						id:1,avatorImg:"https://gravatar.zeruns.tech/avatar/2aeb599ab872efb092bce259f75d6154?s=256&d=wavatar",
						userName:"泡泡龙",
						time:"2021-12-15 20:43:34",
						pic:"https://www.qinqinghu.top/static/upload/1639571442927_08F8B3B2-660C-4506-8066-2A6E9208D6D8.jpeg"
					
					},
					
				]
			};
		}
	}
</script>

<style lang="scss">
	
	.content{
		// border: 1px solid black;
		width: 730rpx;
		margin: 0 auto;
		height: 130rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;
		
		.avator{
			// border: 1px solid black;
			
			.avatorImg{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
			}
			
		}
		
		.message{
			// border: 1px solid black;
			display: flex;
			flex-flow: column nowrap;
			width: 470rpx;
			
			.message-title{
				// border: 1px solid black;
				text{
					font-weight: bold;
					font-size: 36rpx;
				}
			}
			
			.message-time{
				// border: 1px solid black;
				
				text{
					color: #8E8E8E;
					font-size: 33rpx;
				}
			}
		}
		
		.work{
			display: flex;
			justify-content: center;
			align-items: center;
			
			image{
				width: 130rpx;
				height: 130rpx;
				border-radius: 10%;
			}
			
		}
		
		
	}

</style>
