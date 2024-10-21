<script>
	import {userStore} from "@/store/account/userInfo.js"
	export default {
		onLaunch: function(e) {
			
		},
		onShow:async function(e) {
			
			const updateManager = uni.getUpdateManager();
			updateManager.onCheckForUpdate(function (res) {
				// 请求完新版本信息的回调
				if(res.hasUpdate){}
			});
			updateManager.onUpdateReady(function (res) {
				uni.showModal({
					title: '更新提示',
					content: '新版本已经准备好，是否重启应用？',
					success(res) {
						if (res.confirm) {
						// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
							updateManager.applyUpdate();
						}
					}
				});
			
			});
			updateManager.onUpdateFailed(function (res) {
				uni.showToast({
					title: "更新失败",
					icon: "none"
				})
				// 新的版本下载失败
			});
			
		},
		onHide: function() {
		},
		onShareAppMessage:function(res){			
			return {  
				title: "3分钟搞定包装定制，省时，省力，省心！", 
				imageUrl: "https://xpl-smallbatch.oos-gz.ctyunapi.cn/dzj/icon/share.png",
				path: "/pages/home/index"
			}  
		}
	}
</script>
<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@import url("@/styles/iconfont.css");
	@import url("@/styles/index.scss");
	@import "/styles/style2/index.scss";
	/*每个页面公共css */
	
	page{
		font-size:25rpx;
		color:#333;
	}
	
	.cus{
		position: fixed;
		left:0;
		top:0;
		right:0;
		bottom:0;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 20;
	}
	
	.p_btn{
		width:90%;
		background-color: #F9353B;
		height:80rpx;
		line-height: 80rpx;
		text-align: center;
		color:#fff;
		border-radius: 40rpx;
		margin:0 auto;
	}
	
	.iconImg002{
		width:35rpx;
		height:35rpx;
	}
	
</style>
