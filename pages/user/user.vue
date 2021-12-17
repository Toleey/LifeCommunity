<template>
	<view>
		
		<view class="list">
			<view class="list-title">
				我的头像
			</view>
			<view class="list-content">
				<image src="https://gravatar.zeruns.tech/avatar/2aeb599ab872efb092bce259f75d6154?s=256&d=wavatar"></image>
				<span class="iconfont icon-xiangyoujiantou"></span>
			</view>
		</view>
		
		<view class="list">
			<view class="list-title">
				我的昵称
			</view>
			<view class="list-content">
				<view>泡泡龙</view>
				<span class="iconfont icon-xiangyoujiantou"></span>
			</view>
		</view>
		
		<view class="list">
			<view class="list-title">
				修改密码
			</view>
			<view class="list-content">
				<view>初始密码为手机号</view>
				<span class="iconfont icon-xiangyoujiantou"></span>
			</view>
		</view>
		
		<view class="list">
			<view class="list-title">
				联系方式
			</view>
			<view class="list-content">
				<view>18812341234</view>
				<span class="iconfont icon-xiangyoujiantou"></span>
			</view>
		</view>
		
		<view class="list">
			<view class="list-title">
				修改密码
			</view>
			<view class="list-content">
				<view>初始密码为手机号</view>
				<span class="iconfont icon-xiangyoujiantou"></span>
			</view>
		</view>
		
		<view class="list">
			<view class="list-title">
				注册时间
			</view>
			<view class="list-content">
				<view>2021-12-15 20:25:01</view>
				<span class="iconfont icon-xiangyoujiantou"></span>
			</view>
		</view>
		
		<view class="list">
			<view class="list-title">
				意见反馈
			</view>
			<view class="list-content">
				<view></view>
				<span class="iconfont icon-xiangyoujiantou"></span>
			</view>
		</view>
		
		<button type="default">退出登录</button>
		
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
	
	.list{
		// border: 1px solid black;
		width: 730rpx;
		height: 100rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		margin-top: 10rpx;
		
		.list-title{
			// border: 1px solid black;
			font-weight: bold;
		}
		
		.list-content{
			// border: 1px solid black;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			
			image{
				// border: 1px solid black;	
				width: 100rpx;
				height: 100rpx;
			}
			
			span{
				// border: 1px solid black;
				font-weight: bold;
				margin-left: 20rpx;
				margin-right: 20rpx;
			}
			
			view{
				font-weight: bold;
			}
			
		}
		
		
	}
	
	button{
		width: 730rpx;
		margin: 0 auto;
		// color: red;
		// background-color: white;
	}
	

</style>
