<template>
	<view>
		<view class="content">
		
			<view class="title">
				<h1>创作</h1>
			</view>
			
		<!--<view class="" style="display: flex;">
				<view>创作</view>
				<switch  @change="switch1Change" />
				<view>分享</view>
			</view> -->
			
		<!-- <view class="" style="display: flex;">
				<view>上传图片</view>
				<switch  @change="switch2Change" />
				<view>上传视频</view>
			</view> -->
			<view class="chooseValue" >
				
				<view @click="toUpload()" style="height: 200rpx;border: 1px solid;">
					上传图片
				</view>
				
				<uni-popup ref="popupWork" type="dialog">
					<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="closeWork"
						@confirm="confirmWork"></uni-popup-dialog>
				</uni-popup>
				
	<!-- 			<uni-file-picker
					class="chooseImage"
					v-model="imageValue"  
					file-mediatype="image"
					mode="grid"
					file-extname="png,jpg,jpeg"
					:limit="1"
					@progress="progress" 
					@success="success" 
					@fail="fail" 
					@select="select"
				/> -->
				
		<!-- 		<uni-file-picker
					v-model="videoValue"  
					file-mediatype="video"
					mode="grid"
					file-extname="mp4"
					:limit="1"
					@progress="progress" 
					@success="success" 
					@fail="fail" 
					@select="select"
				/> -->
				
				<input class="input" placeholder="请输入文字" v-model="text" />
			</view>
			<button @click="toShare()">分享</button>
		</view>
		
		<uni-popup ref="popupWork" type="dialog">
			<uni-popup-dialog mode="input" message="成功消息" :duration="2000" :before-close="true" @close="closeWork"
				@confirm="confirmWork"></uni-popup-dialog>
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
				imageValue:[],
				videoValue:[],
				image:"",
				text:""
			};
		},
		onLoad() {
			if(this.getHasLogin){ //已经登录，放行
				
			}else{ //没登录
				uni.redirectTo({
					url:"../login/login"
				})
			}
		},
		onShow() {
			
		},
		methods:{
			...mapMutations(['login', 'logout']),
			
			toShare(){
				console.log("ha")
				if(this.image!=null){
					
					uni.request({
						url: "http://127.0.0.1:8088/work/shareWork",
						method: "POST",
						header: {
							'content-type': "application/x-www-form-urlencoded"
						},
						data: {
							"image": this.image,
							"text":this.text,
							"phoneNumber": this.getPhoneNumber
						},
						success: (res) => {
							console.log("创作成功了")
							this.image=null
							this.text=null
						},
						fail: () => {
							console.log("创作失败了")
						},
						complete: () => {
							console.log("创作方法执行了")
						}
					})
					
					uni.switchTab({
						url:"../index/index"
					})
					
					
				}else{
					uni.showToast({
						title:"你还没有上传图片啊"
					})
				}
				
			},
			toUpload(){
				this.$refs.popupWork.open()
			},
			confirmWork(value){
				console.log(value)
				this.image=value
				this.$refs.popupWork.close()
			},
			closeWork(){
				this.$refs.popupWork.close()
			},
			
			
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
		},
		computed: {
			...mapState({}),
			...mapGetters(['getHasLogin','getPhoneNumber'])
		}
	}
</script>

<style lang="scss">
	.content{
		border: 1px solid black;
		margin: 30% auto;
		// display: flex;
		// flex-flow: column nowrap;
		
		.title{
			border: 1px solid black;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.chooseValue{
			height: 400rpx;
			border: 1px solid black;
			
			.chooseImage{
				border: 1px solid black;
			}
			
			.input{
				border: 1px solid black;
				min-height: 160rpx;
				font-size: 80rpx;
			}
		
		}
		
	}

</style>
