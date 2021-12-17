<template>
	<view>
		
		<h1>创作</h1>
		
		<view class="" style="display: flex;">
			<view>创作</view>
			<switch  @change="switch1Change" />
			<view>分享</view>
		</view>
		
		<view class="" style="display: flex;">
			<view>上传图片</view>
			<switch  @change="switch2Change" />
			<view>上传视频</view>
		</view>
		
		<uni-file-picker 
		    v-model="imageValue"  
		    file-mediatype="image"
		    mode="grid"
		    file-extname="png,jpg,jpeg"
		    :limit="1"
		    @progress="progress" 
		    @success="success" 
		    @fail="fail" 
		    @select="select"
		/>
		
		<uni-file-picker
		    v-model="videoValue"  
		    file-mediatype="video"
		    mode="grid"
		    file-extname="mp4"
		    :limit="1"
		    @progress="progress" 
		    @success="success" 
		    @fail="fail" 
		    @select="select"
		/>
		
		<input placeholder="请输入文字" />
		
		<button >分享</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageValue:[],
				videoValue:[]
			};
		},
		methods:{
			switch1Change: function (e) {
			    console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			switch2Change: function (e) {
			    console.log('switch1 发生 change 事件，携带值为', e.target.value)
			},
			 // 获取上传状态
			select(e){
				console.log('选择文件：',e)
			},
			// 获取上传进度
			progress(e){
				console.log('上传进度：',e)
			},

			// 上传成功
			success(e){
				console.log('上传成功')
			},

			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			}
		}
	}
</script>

<style lang="scss">

</style>
