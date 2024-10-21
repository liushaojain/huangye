<template>
	<view>
		<view v-if="total" class="">
			<!-- <view class="c5">
				<view class="flex_a">
					<text class="iconfont icon-icon_search plr20"></text>
					<input v-model="customQuery" type="text" placeholder="输入名称/ID搜索" confirm-type="search" @input="customQueryInput" @confirm="searchData">
				</view>
			</view> -->
			<view class="c1 flex_sb">
				<view><text>有效设计 {{total}} 件</text></view>
				<view class="flex_aj btns">
					<view @click="designSelectData.show=true" class="flex_aj"><image style="width:35rpx;height:35rpx;" :src="imgBaseUrl+'ico_shaixuan@2x.png'" mode="aspectFit"></image> <text>筛选</text> </view>
					<view v-if="status==1" @click="changeStatus(2)" class="ml30 flex_aj">管理</view>
					<view v-if="status==2" @click="changeStatus(1)" class="ml30 flex_aj color_a3">完成</view>	
				</view>
			</view>
			<u-checkbox-group 
				v-model="checkboxValue1"
			    placement="column"
			    @change="checkboxChange()">
				<view class="mt100 mlr30">
					<view class="item bf mb20 p20 border-r1" v-for="(item,index) in list" :key="index">
						<view class="flex_sb">
							<view style="width:40%;" class="ellipsis"> <text class="c9">名称：</text> <text>{{item.worksName?item.worksName:""}}</text> </view>	
							<view class="" @longpress="longpressClick(item)"> 
								<text class="c9">
								<!-- {{item.worksStatus}}{{status}} -->
								设计ID：</text> <text>{{item.worksId}}</text> 
							</view>	
						</view>	
						
						<view class="flex_a">
							<view class="">
								<u-checkbox :name="index" shape="circle"></u-checkbox>	
							</view>	
							<view class="worksThumb.effectThumb" style="width:25%;" v-if="item">
								<image :src="item.effectThumb" mode="aspectFit" @tap="preview(item.effectThumb)"></image>
							</view>
							<view class="img" style="width:25%;" v-else>
								<image v-for="(img,key) in item.worksItemList" :key="key" :src="img.imageUrl" mode="aspectFit"></image>
							</view>
							<view style="width:65%;margin-left:2%;">
								<view class="tit ellipsis2"><text class="tag" style="border-radius: 10rpx;font-size: 23rpx;">
									{{item.statusStr}}</text><text>{{item.worksItemList[0].goodsName||''}}</text>
								</view>
								<!-- <view class="flex-end sNum"><text>x10件</text></view> -->
								<view class="mt30 flex-end">
									<u-number-box v-model="item.packNum" :min="item.minNum" :index="index" @change="valChange($event,item)"></u-number-box>
								</view>
							</view>
						</view>
						<view class="flex_a flex-end">
							<view class="c9 moveBox">
								<text @click="moreClick(item)">更多</text>
								<view v-if="item.showMove" class="moveBtns shadow p20">
									<view @click="lookDesign(item)" class="flex_a"> <image :src="imgBaseUrl+'lookOver.png'" mode="aspectFit"></image> <text>查看设计稿</text> </view>	
									<view @click="copy(item)" class="flex_a mt20"> <image :src="imgBaseUrl+'ico_copy@2x.png'" mode="aspectFit"></image> <text>创建副本</text> </view>	
									<!-- <view @click="showRecord(item)" class="flex_a mt20"> <image src="ico_xiezuojilu@2x.png" mode="aspectFit"></image> <text>协作记录</text> </view> -->
									<view class="flex_a mt20" @click="deleteWorks(item.id,index)"> <image :src="imgBaseUrl+'ico_delete@2x.png'" mode="aspectFit"></image> <text>删除</text> </view>
									<view class="iocn_3"></view>	
								</view>	
							</view>
							<view class="groupBtn flex1">
								<view v-if="item.isShow" @click="openComfirmGoods(item)" class="btna edit">修改作品</view>
								<view @click="toDiy(item,1)" class="btna edit">编辑</view>
								<view @click="toDiy(item,2)" class="btna">预览</view>
							</view>
						</view>	
						
					</view>
				</view>	
			</u-checkbox-group>
			
			<view v-if="noDataFag=='无筛选数据'&&(sendData.status||sendData.timeType)" class="nodata">
				<noData text="无筛选数据"></noData>	
			</view>	
			
			<view class="loseEfficacy" v-if="closeWorks.length>0">
				<view class="title">
					<text>失效设计{{total2}}件</text>
					<view class="empty" @tap="clearWorks">清空失效设计</view>
				</view>
				<u-checkbox-group
					v-model="checkboxValue2"
				    placement="column">
					<view class="mlr30">
						<view class="item bf mb20 p20 border-r1" v-for="(item,index) in closeWorks" :key="index">
							<view class="flex_sb">
								<view class=""> <text class="c9">名称：</text> <text>{{item.worksName?item.worksName:""}}</text> </view>	
								<view class=""> <text class="c9">设计ID：</text> <text>{{item.worksId}}</text> </view>	
							</view>	
							<view class="flex_a">
								<view class="" style="width:8%;">
									<u-checkbox :name="index" shape="circle" disabled="true"></u-checkbox>	
								</view>	
								<view class="worksThumb.effectThumb" style="width:25%;" v-if="item">
									<image :src="item.effectThumb" mode="aspectFit" @tap="preview(item.effectThumb)"></image>
								</view>
								<view style="width:65%;margin-left:2%;">
									<view class="tit ellipsis2">
										<text class="tag">已失效</text>
										<text>{{item.worksItemList[0].goodsName}}</text>
									</view>
									<!-- <view class="flex-end sNum"><text>x10件</text></view> -->
									
									<view class="flex_a">
										<view class="lose">作品已失效</view>	
										<!-- <view class="btna" @tap="deleteWorks(item.id,2)">删除</view> -->
									</view>	
								</view>
							</view>
							
						</view>
					</view>	
				</u-checkbox-group>
			</view>	
			
			
			<view class="flex_sb c3">
				<view class=""> <text>已选中</text> <text class="color_a3 plr10">{{checknum}}</text> <text>个设计</text> </view>	
				<view class="c3_btns">
					<view v-if="status==1" class="" @tap="pint">印刷</view>
					<view @tap="deleteWorks(0)" v-if="status==2" class="">删除</view>
				</view>	
			</view>	
		</view>
		
		
		<designSelect ref="designSelect" :res="designSelectData" @filtrate="filtrate" :sendData="sendData" v-show="designSelectData.show" v-on:designSelectCall="designSelectCall"></designSelect>		
		<collaborationRecord :res="collaborationRecordData" v-if="collaborationRecordData.show" v-on:collaborationRecordCall="collaborationRecordCall"></collaborationRecord>
		<goods 
			ref="allGoods"
			class="goodsContainer"
			:class="{'hide':comfirmgoodsShow=='hide'}"
			v-if="comfirmgoodsShow" 
			@close="closeAll"
			@changeBottle="changeGoodsShow=true;comfirmgoodsShow='hide'"
			@getProductId="getProductId"
			@seleteOther="seleteOther"
			@getGnsId="getGnsId"
			@eidtShow="eidtShow"
			:editWorkType="editWorkType"
			:editTypeTitle="editTypeTitle"
			:isChangeGoods="isChangeGoods"
			:activeWorksId="activeWorksId" 
			:memberId="memberId"
			:packNum="packNum" >
		</goods>
		
		<changeGoods
			class="goodsContainer"
			:class="{'hide':changeGoodsShow=='hide'}"
			v-if="changeGoodsShow" 
			@close="closeAll"
			@checkGoodsNext="checkGoodsNext"
			@prev="changeGoodsShow='hide';eidtWorkShow=true;"
			:bottleLableId="addInfo.bottle_lable"
			:activeGoodsId="activeGoodsId" 
			:activeProductId="activeProductId"
			:packNum="packNum" >
		</changeGoods>
		
		<selectGoods
			class="goodsContainer"
			:class="{'hide':selectGoodsShow=='hide'}"
			v-if="selectGoodsShow" 
			@close="closeAll"
			@checkGoodsNext="checkGoodsNext"
			@prev="selectGoodsShow='hide';eidtWorkShow=true;"
			:addInfo="addInfo"
			:activeGoodsId="activeGoodsId"
			:activeProductId="activeProductId"
			:packNum="packNum" >
		</selectGoods>
		
		
		<selectTemplate
			class="goodsContainer"
			:class="{'hide':selectTemplateShow=='hide'}"
			v-if="selectTemplateShow"
			@close="closeAll"
			@back="back"
			@comfirmTemplate="comfirmTemplate"
			:goodsGnsId="goodsGnsId"
			:editWorkType="editWorkType"
			:addInfo="addInfo"
			:checkedAllgoods="checkedAllgoods" >
		</selectTemplate>
		<otherGoods
			class="goodsContainer"
			v-if="otherGoodsShow"
			:class="{'hide':otherGoodsShow=='hide'}"
			@close="closeAll"
			@prev="otherGoodsShow='hide';comfirmgoodsShow=true;"
			:editWorkType="editWorkType"
			:isChangeGoods="isChangeGoods"
			:comfirmGoods="comfirmGoods"
			:memberId="memberId">
		</otherGoods>
		
		<selectEidt 
			v-if="eidtWorkShow" 
			:eidtWorkId="eidtWorkId"
			class="eidtPop"
			@editType="editType"
			@close="closeAll">
		</selectEidt>
		<view v-if="noDataFag=='您还没有任何设计方案哦'" class="nodata mt200">
			<noData text="您还没有任何设计方案哦"></noData>
			<view class="gBtn" @click="uni_switchTab('/pages/home/index')">去创作</view>		
		</view>
		
		
	</view>
</template>

<script>
	import designSelect from './cus/designSelect.vue';
	import goods from './components/goods.vue';
	import otherGoods from './components/otherGoods.vue';
	import changeGoods from './components/changeGoods.vue';
	import selectGoods from './components/selectGoods.vue';
	
	import selectTemplate from './components/selectTemplate.vue';
	import selectEidt from './components/selectEidt.vue';
	import collaborationRecord from'./cus/collaboration_record.vue';
	import noData from "../../components/noData/noData.vue"
	import designApi from "@/store/design/index.js"
	import { userStore } from "@/store/account/userInfo.js"
	export default {
		components:{
			designSelect,
			collaborationRecord,
			noData,
			changeGoods,
			selectGoods,
			otherGoods,
			selectTemplate,
			goods,
			selectEidt
		},
		data() {
			return {
				designSelectData:{
					show:false
				},
				collaborationRecordData:{
					show:false
				},
				status:1,
				noDataFag:"",
				checkboxValue1:[],
				checkboxValue2:[],
				value:'',
				list:[],
				allPage: 0,
				allclosePage: 1,
				sendData: {
					page: 1,
					pagesize: 10,
					status: "",
					timeType: "",
					worksType: 1,
					customQuery:""
				},
				sendData1: {
					page: 0,
					pagesize: 10,
					status: "",
					timeType: "",
					worksType: 2,
					customQuery:""
				},
				checknum: 0,
				total: 0,
				total2:0,
				closeWorks: [],
				labelDisabled: true,
				timer:null,
				previewShow: false,
				comfirmgoodsShow: false,
				otherGoodsShow: false,
				changeGoodsShow: false,
				selectTemplateShow: false,
				activeWorksId: "",
				packNum: "",
				activeGoodsId: "",
				activeProductId: "",
				comfirmTemplateId: "",
				checkedAllgoods: {},
				comfirmGoods: [],
				isChangeGoods: false,
				memberId: "",
				
				customQuery:'',
				eidtWorkShow: false,
				selectGoodsShow: false,
				eidtWorkId: "",
				addInfo: {
					eidtWinDiy: false,
					bottle_lable: false,
					bag: false,
					bottle_cover: false,
					winBoxTId: ""
				},
				imgBaseUrl: this.imgBaseUrl,
				editWorkType: 1,
				goodsGnsId: "",
				editTypeTitle: "",
				changeNums: 0
			};
		},
		onReachBottom() {
			if(this.sendData.page<this.allPage){
				this.sendData.page+=1;
				this.getWorks(this.sendData);
			}else{
				if(this.sendData1.page<this.allclosePage){
					this.sendData1.page += 1;
					this.getWorks(this.sendData1);
				}
			}
		},
		onShow() {
			if(this.previewShow == true){
				this.previewShow = false
				return false
			}
			this.designSelectData.show = false;
			this.collaborationRecordData.show = false;
			this.status = 1;
			this.noDataFag='';
			this.checkboxValue1 = [];
			this.checkboxValue2 = [];
			this.value = '';
			this.list = [];
			this.allPage = 0;
			this.allclosePage = 1;
			this.sendData = {
				page: 1,
				pagesize: 10,
				status: "",
				timeType: "",
				worksType: 1
			}
			this.sendData1 = {
				page: 0,
				pagesize: 10,
				status: "",
				timeType: "",
				worksType: 2
			}
			this.checknum = 0;
			this.total = 0;
			this.total2 = 0;
			this.closeWorks = [];
			this.labelDisabled = true;
			this.timer = null;
			this.sendData1.page=0;
			this.getWorks(this.sendData);
			
			
			this.$refs.designSelect.resut();
			this.designSelectData.show=false;
			this.memberId = userStore.state.userInfo.memberId;
		},
		onLoad() {
			
		},
		watch:{
			checkboxValue1(val,oval){
				if(oval.length>0&&val.length>1&&this.status==1){
					let newChecked = [];
					for(let item of val){
						if(oval.indexOf(item)==-1){
							newChecked.push(item)
						}
					}
					this.checkboxValue1 = newChecked
				}
			}
		},
		methods: {
			getGnsId(gnsId){
				this.goodsGnsId = gnsId;
			},
			customQueryInput(e){
				this.sendData.customQuery=this.customQuery;
				this.sendData1.customQuery=this.customQuery;
			},
			searchData(){
				this.noDataFag='';
				this.checkboxValue1 = [];
				this.checkboxValue2 = [];
				this.list=[];
				this.closeWorks=[];
				this.sendData.page=1;
				this.sendData1.page=0;
				this.getWorks(this.sendData,false);
			},
			seleteOther(data){
				this.comfirmgoodsShow = "hide";
				this.otherGoodsShow = true;
				this.comfirmGoods = data;
			},
			// 关闭弹窗
			closeAll(){
				this.comfirmgoodsShow = false;
				this.otherGoodsShow =false;
				this.changeGoodsShow = false;
				this.selectTemplateShow = false;
				this.selectGoodsShow = false;
				this.eidtWorkShow = false;
			},
			// 确定选择模板
			comfirmTemplate(templateId){
				this.selectTemplateShow = "hide";
				this.comfirmgoodsShow = true;
				this.comfirmTemplateId = templateId;
				this.isChangeGoods = true;
				
				var that = this;
				console.log("templateId",templateId)
				this.$refs.allGoods.changeGoods({checkedAllgoods: this.checkedAllgoods,templateId: templateId,editWorkType:this.editWorkType});
				// this.checkedAllgoods
			},
			// 返回选择商品
			back(editWorkType){
				if(editWorkType==1){
					this.selectGoodsShow = true;
					this.selectTemplateShow = false;
				}else{
					this.changeGoodsShow = true;
					this.selectTemplateShow = false;
				}
			},
			// 选择商品下一步
			checkGoodsNext(allGoods){
				this.changeGoodsShow = "hide";
				this.selectGoodsShow = "hide";
				this.selectTemplateShow = true;
				this.checkedAllgoods = allGoods;
			},
			prev(){
				this.changeGoodsShow = "hide";
				this.comfirmgoodsShow = true;
			},
			// 获取当前商品ID
			getProductId(productId){
				this.activeProductId = productId;
			},
			// 打开更换商品
			async openComfirmGoods(item){
				var mainGoods = item.worksItemList.find(item=>{
					return item.catGray == "win_box"
				})
				this.eidtWorkId = item.worksId;
				
				let outer_box = item.worksItemList.find(item=>{
					return item.catGray == "outer_box"
				})
				
				this.addInfo = {
					eidtWinDiy: false,
					bottle_lable: false,
					bag: false,
					bottle_cover: false,
					winBoxTId: ""
				};
				
				for(let worksItemList of item.worksItemList){
					if(worksItemList.catGray == "win_box"){
						this.addInfo.winBoxTId = worksItemList.templateId;
					}
					if(worksItemList.catGray == "outer_box"){
						this.addInfo.eidtWinDiy = worksItemList.winDiy;
					}
					if(worksItemList.catGray=="bottle_lable"){
						this.addInfo.bottle_lable = worksItemList.goodsId;
					}
					if(worksItemList.catGray=="bag"){
						this.addInfo.bag = true
					}
					if(worksItemList.catGray=="bottle_cover"){
						this.addInfo.bottle_cover = true
					}
				}
				
				this.packNum = item.packNum;
				this.activeGoodsId = item.goodsId;
				this.activeProductId = mainGoods.productId;
				this.activeWorksId = item.worksId;
				this.comfirmgoodsShow = "hide";
			},
			eidtShow(isShow){
				if(isShow){
					this.eidtWorkShow = true;
				}else{
					this.comfirmgoodsShow = false;
				}
			},
			preview(images) {
				let that = this;
			    wx.previewImage({
					current: images, // 当前显示图片的http链接
					urls: [images], // 需要预览的图片http链接列表
					success:function(e){
						that.previewShow = true;
					}
			    })
			},
			changeStatus(status){
				this.checkboxValue1 = [];
				this.status = status;
			},
			async valChange(e,item){
				this.changeNums += 1;
				var isChange = true;
				let that = this;
				var packNum=e.packNum;
				var res=await that.apis.editNum({
					worksId:item.worksId,
					num:e.value
				});
			},
			deleteWorks(workId,index){
				let ids = [];
				let that = this;
				if(workId=="empty"){
					for(let key of this.closeWorks){
						ids.push(this.closeWorks[key].id)
					}
				}else if(workId){
					ids.push(workId)
				}else{
					for(let key of this.checkboxValue1){
						ids.push(this.list[key].id)
					}
				}
				if(ids.length == 0){
					uni.showToast({
						title:"请选择作品",
						icon: "none"
					})
				}else{
					uni.showModal({
						title:"删除后设计不能恢复，确定删除吗？",
						success(e) {
							if(e.confirm){
								that.$request(designApi.batchDel,{ids:ids},"POST","",1).then(res=>{
									if(res.code == 200){
										uni.showToast({
											title:"删除成功",
											icon: "none"
										})
									}else{
										uni.showToast({
											title: res.msg,
											icon: "none"
										})
									}
									for(let key in that.checkboxValue1){
										that.list.splice(key,1)
									}
									if(index||index===0){
										that.list.splice(index,1)
									}
									that.sendData.page = parseInt(that.list.length/10)+1;
									that.checkboxValue1 = [];
									if(workId!="empty"){
										that.getWorks(that.sendData,true);
									}else{
										this.closeWorks = [];
									}
								})
							}
						}
					})
				}
			},
			async clearWorks(){
				var res=await this.apis.clearWorks({});
				this.closeWorks=[];
			},
			async pint(){
				let that = this;
				if(this.list[this.checkboxValue1[0]].signature==""){
					uni.showToast({
						title: "待确认的设计需签名确认后才能印刷哦",
						icon: "none"
					})
					return false
				}
				let ids = [];
				
				for(let key of this.checkboxValue1){
					ids.push(this.list[key].id)
				}
				if(ids.length==0){
					return uni.showToast({
						title:'请先选择作品'
					})
				}
				
				let res1=await this.apis.checkWorksGoods({
					worksIds:ids,
					isPrint:1
				});
				if(res1.code!=200){
					return uni.showToast({
						title:res1.msg,
						duration:3000,
						icon:'none',
						mask:true,
						success() {
							that.noDataFag='';
							that.checkboxValue1 = [];
							that.checkboxValue2 = [];
							that.list=[];
							that.closeWorks=[];
							that.sendData.page=1;
							that.sendData1.page=1;
							that.getWorks(that.sendData);
						}
					});
				}
				
				let res=await this.apis.checkGoodsNewDiySpecDeleted({
					worksId:ids[0]
				});
				if(res.data.deleted){
					return uni.showToast({
						title:res.data.goodsName,
						duration:5000,
						icon:'none',
						mask:true,
						success() {
							that.noDataFag='';
							that.checkboxValue1 = [];
							that.checkboxValue2 = [];
							that.list=[];
							that.closeWorks=[];
							that.sendData.page=1;
							that.sendData1.page=1;
							that.getWorks(that.sendData);
						}
					});
				}
				
				
				
				if(ids.length>0){
					uni.navigateTo({
						url:"/pages/my_design/comfirmOrder/index?ids="+ids.toString()
					})
				}else{
					uni.showToast({
						title:"请先选择作品",
						icon:"none"
					})
				}
			},
			checkboxChange(e,t) {
				this.checknum = e.length;
			},
			async filtrate(res){
				if(res.status){
					this.sendData.status = this.sendData.status == res.status ? "" : res.status;
				}else{
					this.sendData.timeType = this.sendData.timeType == res.timeType ? "" : res.timeType;
				}
			},
			async designSelectCall(e){
				
				if(e){
					this.noDataFag='';
					this.checkboxValue1 = [];
					this.checkboxValue2 = [];
					this.list=[];
					this.closeWorks=[];
					this.sendData.page=1;
					this.sendData1.page=0;
					
					this.sendData.page = 1;
					this.sendData.worksType = 1;
					this.sendData.timeType = e.timeType;
					this.sendData.status = e.status;
					this.sendData.customQuery=e.customQuery;
					this.getWorks(this.sendData,false,8);
				}
				this.designSelectData.show=false;
			},
			moreClick(item){
				
				if(item.showMove){
					item.showMove=false;
				}else if(item.showMove == undefined){
					this.$set(item,"showMove",true)
				}else{
					
					this.list.map(res=>{
						res.showMove=false;
					})
					
					
					item.showMove=true;
				}
			},
			showRecord(item){
				this.collaborationRecordData.show=true;
			},
			collaborationRecordCall(){
				this.collaborationRecordData.show=false;
			},
			getWorks(sendData,isDelete,p){
				this.$request(designApi.getWorks,sendData,"POST","",1).then((res)=>{
					if(res.data){
						if(sendData.worksType == 1){ 
							res.data.records.map(res5=>{
								res5.showMove=false;
							});
							if(!sendData.status&&!sendData.timeType){
								this.total = res.data.total;
							}
							if(sendData.page==1){
								this.allPage = res.data.pages;
								this.list = res.data.records;
							}else{
								if(isDelete){
									let list = this.list.slice(0,(sendData.page-1)*10);
									this.list = list.concat(res.data.records);
								}else{
									this.list = this.list.concat(res.data.records);
								}
							}
							if(this.list.length == 0){
								if(this.sendData.status||this.sendData.timeType){
									this.noDataFag = "无筛选数据";
								}else{
									this.noDataFag = "您还没有任何设计方案哦"
								}
							}
							
							if(this.list.length<10&&sendData.page==1){
								this.sendData1.page++;
								this.getWorks(this.sendData1);
							}
							
						}else{
							if(sendData.page==1){
								this.allclosePage = res.data.pages;
								this.closeWorks = res.data.records;
							}else{
								if(isDelete){
									let list = this.closeWorks.slice(0,(sendData.page-1)*10);
									this.closeWorks = closeWorks.concat(res.data.records);
								}else{
									this.closeWorks = this.closeWorks.concat(res.data.records);
								}
							}
							this.total2=res.data.total;
						}
					}
				})
			},
			async copy(item){
				item.showMove=false;
				var res=await this.apis.copyWork({
					worksId:item.worksId
				});
				this.sendData.page = 1;
				this.getWorks(this.sendData);
				uni.showToast({
					title:'副本创建成功！'
				})
				// var worksId=res.data;
				// uni.navigateTo({
				// 	url:"/pages/diy/diy?works_id="+worksId
				// })
			},
			async toDiy(item,type){
				let that = this;
				var res=await this.apis.checkWorksGoods({
					worksIds:[item.id]
				});
				if(res.code!=200&&res.code!=201){
					return uni.showToast({
						title:res.msg,
						duration:3000,
						icon:'none',
						mask:true,
						success() {
							that.noDataFag='';
							that.checkboxValue1 = [];
							that.checkboxValue2 = [];
							that.list=[];
							that.closeWorks=[];
							that.sendData.page=1;
							that.sendData1.page=0;
							that.getWorks(that.sendData);
						}
					});
					
				}
				if(type==1){
					uni.navigateTo({
						url:'/pages/diy/diy?works_id='+item.worksId+'&type=2'+'&status='+item.worksStatus
					})
				}else if(type==2){
					uni.navigateTo({
						url:'/pages/diy/diy?works_id='+item.worksId+'&show3d=ok&type=2'+'&status='+item.worksStatus
					})
				}
			},
			longpressClick(item){
				uni.setClipboardData({
					data: item.worksId,
					showToast:false,
					success: function () {
						uni.showToast({
							title:'作品ID已复制！'
						});
					}
				});
			},
			lookDesign(item){
				uni.navigateTo({
					url:"/pages/confirmDesing/confirmDesing?worksId="+item.worksId+"&member_id="+userStore.getters.userInfo.memberId
				})
			},
			editType(type){
				this.editWorkType = type;
				if(type==1){
					this.selectGoodsShow=true;
					this.eidtWorkShow=false;
					this.editTypeTitle = "新增商品";
				}else if(type==2){
					this.comfirmgoodsShow=true;
					this.eidtWorkShow=false;
					this.editTypeTitle = "减少商品";
				}else if(type==3){
					this.changeGoodsShow=true;
					this.eidtWorkShow=false;
					this.editTypeTitle = "更换酒瓶";
				}
			}
		}
	}
</script>
<style>
	page{
		background-color: #f5f5f5;
		padding-bottom: 100rpx;
	}
</style>
<style lang="scss" scoped>
	.eidtPop{
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: rgba(0,0,0,0.6);
		z-index: 99;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.c1{
		padding:20rpx 30rpx;
		position: fixed;
		left:0;
		top:0rpx;
		background: #f5f5f5f5;
		width:100%;
		z-index: 20;
	}
	
	.c2{
		padding-bottom:110rpx;
	}
	
	.c5{
		background-color: #F5F5F5;
		width:100%;
		position: fixed;
		left:0;
		top:0;
		border-radius: 40rpx;
		z-index: 20;
		padding-top:10rpx;
		>view{
			width:95%;
			margin:0 auto;
			background-color: #ffffff;
			height:80rpx;
			line-height: 80rpx;
			border-radius: 40rpx;
			input{
				width: 100%;
			}
		}
	}
	
	.btns{
		>view{
			background-color: #ffffff;
			height:60rpx;
			padding:0 30rpx;
			border-radius: 50rpx;
		}
	}
	.tit{
		line-height: 39rpx;
	}
	
	.tag{
		background-color: #3CB6FA;
		color:#fff;
		padding:5rpx 10rpx;
		border-radius: 5rpx;
		margin-right:8rpx;
	}
	.sNum{
		margin-top:30rpx;
		text{
			border:1px solid #999;
			padding:8rpx 15rpx;
			border-radius: 10rpx;
		}
	}
	.groupBtn{
		display: flex;
		justify-content: flex-end;
	}
	.btna{
		border:1px solid #F9353B;
		padding:10rpx 25rpx;
		border-radius: 30rpx;
		color: #F9353B;
		margin-left:25rpx;
	}	
	.edit{
		border-color: #2078F5;
		color:#2078F5;
	}
	
	.moveBox{
		position: relative;
	}
	.item{
		overflow: visible !important;
	}
	.moveBtns{
		position: absolute;
		bottom:-236rpx;
		left:106rpx;
		transform: translate(-50%,0);
		width:250rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		view{
			padding:8rpx 0;
			image{
				width:30rpx;
				height:30rpx;
				margin-right:10rpx;
			}
		}
		.iocn_3{
			width:0;
			height:0;
			 border-left:10px solid transparent;
			 border-right:10px solid transparent;
			border-top:10px solid #ffffff;
			position: absolute;
			bottom:-20px;
			left:50%;
			z-index: 10;
			transform: translate(-50%,0);
		}
	}
	
	.c3{
		position: fixed;
		left:0;
		bottom:0;
		// #ifdef H5
		bottom:100rpx;
		//#endif
		background-color: #fff;
		width:100%;
		height:100rpx;
		padding:0 2.5%;
		z-index: 10;
	}
	
	.c3_btns view{
		background-color: #F7343D;
		color:#fff;
		width:300rpx;
		height:80rpx;
		text-align: center;
		line-height: 80rpx;
		border-radius: 40rpx;
	}
	
	.gBtn{
		background-color: #F9353B;
		width:40%;
		margin:80rpx auto 0 auto;
		text-align: center;
		height:80rpx;
		line-height: 80rpx;
		color:#fff;
		border-radius: 40rpx;
	}
	.lose{
		color: #F9353B;
		margin-top: 50rpx;
	}
	.worksThumb{
		display: flex;
		height: 200rpx;
		image{
			flex: 1;
			height: 200rpx;
		}
	}
	.img{
		display: flex;
		height: 200rpx;
		flex-wrap: wrap;
		image{
			min-width: 80rpx;
			flex: 1;
			max-height: 100rpx;
		}
	}
	.loseEfficacy{
		.title{
			display: flex;
			font-size: 24rpx;
			margin: 0 30rpx;
			line-height: 80rpx;
			text{
				flex: 1;
			}
			.empty{
				color: #2078F5;
				text-align: right;
			}
		}
	}
	.goodsContainer{
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0,0,0,0.6);
		z-index: 9999;
	}
</style>
