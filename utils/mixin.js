import common from './common.js';
export default {
	data(){
		return{
			imgBaseUrl:this.imgBaseUrl
		}
	},
    methods: {
		async to(url){
			if(url=='plugin://myPlugin/chat'){
				var userInfo=await this.apis.get_userInfo({});
				this.configYsf();
				return
			}
			uni.navigateTo({
				url:url
			});
		},
		uni_switchTab(url){
			uni.switchTab({
				url:url
			});
		},
		goBack(delta){
			uni.navigateBack({
				delta:delta
			})
		},
		showToast(text){
				uni.showToast({
					title: text,
					duration: 2000,
					icon:'none'
				});
		},
		openh5(type){
			if(type==1||type==2){
				uni.navigateTo({
					url:"/pages/publicWebview/publicWebview?url="+encodeURIComponent(this.h5BaseUrl+'agreement.html?type='+type)
				})
			}else{
				uni.navigateTo({
					url:"/pages/publicWebview/publicWebview?url="+encodeURIComponent(type)
				})
			}
		},
		get_memberId(){
			var userInfo=uni.getStorageSync('userInfo');
			if(userInfo.memberId){
				return userInfo.memberId;
			}else{
				return ''
			}
			
		},
		
		get_businessId(){
			var userInfo=uni.getStorageSync('userInfo');
			if(userInfo.businessId){
				return userInfo.businessId;
			}else{
				return ''
			}
			
		},
		copyText(text){
			uni.setClipboardData({
				data: text+'',
				showToast:false,
				success: function () {
					uni.showToast({
						title:'已复制！'
					});
				}
			});
		},
		async configYsf(){
			var myPluginInterface = requirePlugin('myPlugin');
			var appId = '0BERztD1zGC';
			myPluginInterface.__configAppId(appId);  // 不是微信的appId，是七鱼后台生成的appId
			myPluginInterface._$configAppKey('6a7a68f1028b30d54ef16196ea8a1afa'); // 申请企业的appKey
				var userInfo=uni.getStorageSync('userInfo');
				if(!userInfo){
					return
				}
				var userInfo2 = {
				        userId: userInfo.memberId,
				        data: [
				          { "key": "real_name", "value": userInfo.mobile||'' },
				          { "key": "mobile_phone", "value": '','hidden':true},
				          { "key": "email", "value": userInfo.email||'' },
						  // { "index": 1, "key": "userId", "label": "用户ID", "value": userInfo.memberId },
						  { "index": 1, "key": "mobile", "label": "手机号", "value": userInfo.mobile||'' },
						  { "index": 1, "key": "saleMemberName", "label": "所属业务员", "value": userInfo.saleMemberName||'' },
						  { "index": 2, "key": "customerDevlopStageStr", "label": "客户开发阶段", "value": userInfo.customerDevlopStageStr||'' },
						  { "index": 3, "key": "regtime", "label": "注册时间", "value": common.formatTime(userInfo.regtime)},
						  { "index": 4, "key": "avatar", "label": "头像", "value": userInfo.avatar }
				        ]
				      }
					
				
				myPluginInterface._$setUserInfo(userInfo2);
				myPluginInterface._$setVipLevel(userInfo.memberLvId);
				uni.redirectTo({
					url:'plugin://myPlugin/chat'
				});
				
			myPluginInterface._$onClickAction((data, navigateTo) => {
			  const extraParam=data.extraParam;
			  if(extraParam){
				  const type=extraParam.type;
				  if(type=="goodsDetails"){
				  		navigateTo({
				  		  url: `/pages/goods/details/index?goodsId=${data.extraParam.goodsId}`
				  		});		 
				  }
				  return
			  }
			 if(data.url){ 
				  navigateTo({
				    url: '/'+data.url
				  });
			  }
			});
			myPluginInterface._$configAutoCopy(false);
			
			
			
		},
		logOutYsf(){
			var myPluginInterface = requirePlugin('myPlugin');
			myPluginInterface._$logout().then(()=>{
			});
		},
		
		configProductSync(data){
			var myPluginInterface = requirePlugin('myPlugin');
			var product = {
			    title: data.name,
			    desc: data.brief||'',
			    note: '销售价:￥'+data.price,
			    picture: data.images.length!=0?data.images[0]:'',
			    url: '',
			    isShow: 1,
			    sendByUser: 1,
			    extraParam: {
				  type:'goodsDetails',
				  goodsId:data.goodsId
			    }
			  };
			
			myPluginInterface._$configProductSync(product);
		},
		
		clearProduct(){
			var myPluginInterface = requirePlugin('myPlugin');
			myPluginInterface._$clearProduct();
		}
		
		
    }
  }