import http from './ajax';
import {basehost} from "@/utils/util.js"
export default{
		uploadBase64(data){
			return http('upload/anon/base64',data,'POST',false,true,true);
		},
		
		designWorks(data,isInit){
			return http('smallbatch/sdb-b2-c-winecustom-works/anon/designWorks',data,'POST',false,isInit,true);
		},
		
		editWorks(data){
			return http('smallbatch/sdb-b2-c-winecustom-works/anon/editWorks',data,'POST',false,true,true);
		},
		getBusinessMemberInfo(data){
			return http('smallbatch/sdb-b2-c-business-member/getBusinessMemberInfo',data,'GET',false,true,true);
		},
		//获取默认商家
		getDefaultBusinessInfo(data){
			return http('smallbatch/sdb-b2-c-business-member/anon/getDefaultBusinessInfo',data,'GET',false,true,true);
		},
		bind(data){
			return http('smallbatch/sdb-b2-c-business-member/bind',data,'POST',false,true,true,true);
		},
		getMemberList(data){
			return http('smallbatch/sdb-b2-c-business-member/getMemberList',data,'POST',false,true,true);
		},
		sumTotalPurseAmount(data){
			return http('smallbatch/sdb-b2-c-business-member/sumTotalPurseAmount',data,'POST',false,true,true);
		},
		diylogin(data){
			if(uni.getStorageSync('memberId')){
				data['oldMemberId']=uni.getStorageSync('memberId');
			}
			return http('smallbatch/sdb-b2-c-members/anon/diylogin',data,'POST',false,true,true);
		},
		useList(data){
			return http('smallbatch/sdb-b2-c-active-coupon/useList',data,'PUT',false,true,true);
		},
		couponInfo(id){
			return http('smallbatch/sdb-b2-c-active-coupon/couponInfo/'+id,"",'GET',false,true,true);
		},
		copyWork(data){
			return http('smallbatch/sdb-b2-c-winecustom-works/anon/copyWork/'+data.worksId,data,'PUT',false,true,true);
		},
		updWorksName(data){
			return http('smallbatch/sdb-b2-c-winecustom-works/anon/updWorksName',data,'POST',false,true,true);
		},
		editNum(data){
			return http('smallbatch/sdb-b2-c-winecustom-works/editNum',data,'POST',false,true,true);
		},
		checkWorksGoods(data){
			return http('smallbatch/sdb-b2-c-winecustom-works/checkWorksGoods',data,'POST',false,true,true,true);
		},
		checkGoodsNewDiySpecDeleted(data){
			return http('smallbatch/sdb-b2-c-orders/checkGoodsNewDiySpecDeleted',data,'GET',false,true,true,true);
		},
		updUserInfo(data){
			return http('smallbatch/sdb-b2-c-members/updUserInfo',data,'POST',false,true,true);
		},
		get_userInfo(data){
			return http('smallbatch/sdb-b2-c-members/userInfo',data,'GET',false,true,false,false);
		},
		get_userInfo2(data){
			return http('smallbatch/sdb-b2-c-members/userInfo',data,'GET',false,true,false,true);
		},
		clearWorks(data){
			return http('smallbatch/sdb-b2-c-winecustom-works/clear',data,'POST',false,true,true);
		},
		//获取实名认证信息
		crtificationInfo(){
			return http('smallbatch/sdb-b2-c-member-withdraw/crtificationInfo',"",'GET',false,true,true);
		},
		enterpriseRegister(data){
			return http('smallbatch/sdb-b2-c-member-withdraw/addCrtification',data,'POST',false,true,true,true)
		},
		getBankName(data){
			return http('smallbatch/sdb-b2-c-member-withdraw/getBankName',data,'GET',false,true,true)
		},
		accountList(data){
			return http('smallbatch/sdb-b2-c-member-withdraw/account/list',data,'POST',false,true,true)
		},
		accountPages(data){
			return http('smallbatch/sdb-b2-c-member-withdraw/account/pages',data,'POST',false,true,true)
		},
		accountSetDef(data){
			return http('smallbatch/sdb-b2-c-member-withdraw/account/setDef',data,'POST',false,true,true)
		},
		accountSetDel(data){
			return http('smallbatch/sdb-b2-c-member-withdraw/account/del',data,'POST',false,true,true)
		},
		withdrawTx(data){
			return http('smallbatch/sdb-b2-c-member-withdraw/tx',data,'POST',false,true,true)
		},
		userCheck(data){
			return http('smallbatch/sdb-b2-c-members/anon/userCheck',data,'POST',false,true,true,true)
		},
		/* 校验作品 **/
		checkWorkInfo(data) {
			return http('smallbatch/sdb-b2-c-winecustom-works/checkWorkInfo/'+data.worksId,"",'GET',false,true,true,true);
		},
		
		//绑定关系
		bindFriends(data){
			return new Promise(async (resolve,reject)=>{
				if(this.launchOptions){
					var launchOptions=this.launchOptions;
				}else{
					var launchOptions=wx.getLaunchOptionsSync();
				}
				var sceneData=decodeURIComponent(launchOptions.query.scene);
				var businessId=this.getUrlParam(sceneData,'businessId');
				var reference_id=this.getUrlParam(sceneData,'reference_id');
				if(!businessId){
					var res2=await this.getDefaultBusinessInfo({});
					var businessId=res2.data.businessId;
				}
				
				var res=await this.bind({
					businessId:businessId,
					referenceId:reference_id||''
				});
				if(res.code=='200'){
					uni.setStorageSync('businessId',res.data.businessId);
				}else if(res.code=='401'){
					uni.setStorageSync('businessId',businessId);
				}
				resolve();
			});
		},
		getUrlParam(scene,name) {
		    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		    var result = scene.substr(1).match(reg);
		    return result ? decodeURIComponent(result[2]) : null;
		},
		
		uni_uploadFile(filePath){
				return new Promise((resolve,reject)=>{
					uni.uploadFile({
								url: basehost+'upload/put', //仅为示例，非真实的接口地址
								filePath: filePath,
								name: 'file',
								header: {
								       'Authorization': 'Bearer ' + uni.getStorageSync('token')
								      },
								success: (uploadFileRes) => {
									resolve(JSON.parse(uploadFileRes.data));
								},
								fail(){
									uni.showToast({
										title:'上传出错了！'
									});
								}
							});
				});
		},
		
		uni_login(){
			return new Promise((resolve, reject)=>{
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
					resolve(loginRes);
				  }
				});
			});
		},
		
		
		uni_getUserInfo(){
			return new Promise((resolve,reject)=>{
				uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
				        resolve(infoRes);
				      }
				    });
			});
			
		},
		uni_getLocation(){
			return new Promise((resolve,reject)=>{
				uni.getLocation({
				    type: 'wgs84',
				    success: function (res) {
						resolve(res);
				    },
					fail(res){
						resolve(false);
					}
				});
			});
			
		},
		uni_chooseImage(that){
			return new Promise((resolve,reject)=>{
				var num=0;
				var arr=[];
				function uni_uploadFile(tempFilePaths){
					uni.uploadFile({
					            url: HOST+'/api/common/upload', //仅为示例，非真实的接口地址
					            filePath: tempFilePaths[num],
					            name: 'file',
					            formData: {
					               token: uni.getStorageSync('token')
					            },
					            success: (uploadFileRes) => {
									if(uploadFileRes.statusCode==200){
										var data=JSON.parse(uploadFileRes.data);
										if(data.code==1){
											arr.push(data.data.fullurl);
										}
									}
									
									if(arr.length==tempFilePaths.length){
										resolve(arr);
										uni.hideLoading();
									}else{
										num++;
										uni_uploadFile(tempFilePaths);
									}
									
									
					            }
					        });
				}
				
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
					    const tempFilePaths = res.tempFilePaths;
						uni_uploadFile(tempFilePaths);
						uni.showLoading({
							title: '请稍候...',
							mask:true,
							icon: 'none'
						});
				    }
				});
			});
		},
		uni_scanCode(){
			return new Promise((resolve,reject)=>{
				uni.scanCode({
				    success: function (res) {
				       resolve(res);
				    }
				});
			});
		},
		
		uni_requestPayment(data){
			return new Promise((resolve,reject)=>{
				uni.requestPayment({
				    provider: 'wxpay',
				    timeStamp: data.timeStamp,
				    nonceStr: data.nonceStr,
				    package: data.package,
				    signType: data.signType,
				    paySign: data.paySign,
				    success: function (res) {
						resolve(res);
				    },
				    fail: function (err) {
				    }
				});
			});
			
		},
		uni_setClipboardData(data){
			uni.setClipboardData({
			    data: data,
			    success: function () {
			        console.log('success');
			    }
			});
		},
		
		uni_openLocation(data){
			uni.openLocation({
			    latitude: data.latitude*1,
			    longitude: data.longitude*1,
				name:data.name,
				address:data.address,
			    success: function () {
			    }
			});
		},
		uni_getSystemInfo(){
			return new Promise((resolve,reject)=>{
				uni.getSystemInfo({
					success(res){
						resolve(res);
					}
				});
			});
		}
		
}