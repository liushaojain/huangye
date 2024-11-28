<template>
	<view class="container" :style="{'padding-top': statusBarHeight+'px'}">
		<view class="header">
			<u-navbar class="uNavbar" @leftClick="leftClick" :autoBack="true" title="匹配设置" :bgColor='bgColor' :height="titleHeight"></u-navbar>
			<view class="headerB">
				<image class="img" :src="imgBaseUrl+'Group742_1@2x.png'" mode="aspectFill"></image>
				<view class="txt">
					<text >完成匹配规则设置之后，荒野会为你精准匹配合适的对象!</text>
				</view>
			</view>
		</view>
		<view class="info">
			<image class="img1" :src="imgBaseUrl+'Group_1@2x.png'" mode="aspectFill"></image>
			<view class="infoItem">
				<view class="li flex flex-between">
					<view class="label">居住地</view>
					<view class="val" @click="openLocation">{{formData.location}}</view>
					
				</view>
				<view class="li flex flex-between">
					<view class="label">家乡</view>
					<view class="val" @click="openHomeTown">{{formData.HomeTown}}</view>
				</view>
				<view class="switch">
					<text>当前城市人数不足时，推荐附近地区的嘉宾</text>
					<u-switch v-model="formData.Nearby" @change="change" active-color="#F75073" size="18"></u-switch>
				</view>
				<view class="li">
					<view class="label">学历</view>
					<view class="tagList">
						<text v-for="(item,key) in education_level" :key="key" class="tag" :class="{'selected': formData.education_level === key}"  @click="changeForm(key,'education_level')">{{item}}</text>
					</view>
				</view>
				<view class="li">
					<view class="label">身高</view>
					<slider-range class="sliderRange" :value="height.rangeValue" :min="height.rangeMin" :max="height.rangMax"
						:step="1" :block-size="18" background-color="#D9D9D9" active-color="#F75073"
						:format="heightFormat" :decorationVisible="false" blockColor="#F75073"
						@change="heightChange">
					</slider-range>
				</view>
				<view class="li">
					<view class="label">年龄</view>
					<slider-range class="sliderRange" :value="age.rangeValue" :min="age.rangeMin" :max="age.rangMax"
						:step="1" :block-size="18" background-color="#D9D9D9" active-color="#F75073"
						:format="ageFormat" :decorationVisible="false" blockColor="#F75073"
						@change="ageChange">
					</slider-range>
				</view>
			</view>
		
			<view class="infoItem">
				<view class="title"><image class="img" :src="imgBaseUrl+'Maskgroup_1@2x.png'" mode="aspectFill"></image>VIP尊享筛选</view>
				<view class="li">
					<view class="label">实名真人认证</view>
					<view class="tagList">
						<text v-for="(item,key) in identity_verification" :key="key" class="tag" :class="{'selected': formData.identity_verification === key}" @click="changeForm(key,'identity_verification')">{{item}}</text>
					</view>
				</view>
				<view class="li">
					<view class="label">婚姻状态</view>
					<view class="tagList">
						<text v-for="(item,key) in marital_status" :key="key" class="tag" :class="{'selected': formData.marital_status === key}"  @click="changeForm(key,'marital_status')">{{item}}</text>
					</view>
				</view>
				<view class="li">
					<view class="label">婚姻认证</view>
					<view class="tagList">
						<text v-for="(item,key) in marriage_verification" :key="key" class="tag" :class="{'selected': formData.marriage_verification === key}" @click="changeForm(key,'marriage_verification')">{{item}}</text>
					</view>
				</view>
				<view class="li">
					<view class="label">房产认证</view>
					<view class="tagList">
						<text v-for="(item,key) in marriage_verification1" :key="key" class="tag" :class="{'selected': formData.marriage_verification1 === key}" @click="changeForm(key,'marriage_verification1')">{{item}}</text>
					</view>
				</view>
				<view class="li">
					<view class="label">车辆认证</view>
					<view class="tagList">
						<text v-for="(item,key) in marriage_verification2" :key="key" class="tag" :class="{'selected': formData.marriage_verification2 === key}" @click="changeForm(key,'marriage_verification2')">{{item}}</text>
					</view>
				</view>
			</view>
			
			<view class="infoItem">
				<view class="li">
					<view class="label">期待结婚时间</view>
					<view class="tagList">
						<text v-for="(item,key) in marriage_time" class="tag" :key="key" :class="{'selected': formData.marriage_time === key}"  @click="changeForm(key,'marriage_time')">{{item}}</text>
					</view>
				</view>
				<view class="li">
					<view class="label">家务劳动</view>
					<view class="tagList">
						<text v-for="(item,key) in housework_allocation" class="tag" :key="key" :class="{'selected': formData.housework_allocation === key}"  @click="changeForm(key,'housework_allocation')">{{item}}</text>
					</view>
				</view>
				<view class="li">
					<view class="label">收入分配</view>
					<view class="tagList">
						<text v-for="(item,key) in income_allocation" class="tag" :key="key" :class="{'selected': formData.income_allocation === key}"  @click="changeForm(key,'income_allocation')">{{item}}</text>
					</view>
				</view>
				<view class="li">
					<view class="label">孩子情况</view>
					<view class="tagList">
						<text v-for="(item,key) in income_allocation" class="tag" :key="key" :class="{'selected': formData.income_allocation === key}"  @click="changeForm(key,'income_allocation')">{{item}}</text>
					</view>
				</view>
				
				<view class="li">
					<view class="label">婚后生娃打算</view>
					<view class="tagList">
						<text v-for="(item,key) in child_intention" class="tag" :key="key" :class="{'selected': formData.child_intention === key}"  @click="changeForm(key,'child_intention')">{{item}}</text>
					</view>
				</view>
				
				<view class="li">
					<view class="label">交友目的</view>
					<view class="tagList">
						<text v-for="(item,key) in dating_purpose" class="tag" :key="key" :class="{'selected': formData.dating_purpose === key}"  @click="changeForm(key,'dating_purpose')">{{item}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer">
			<button class="btn" @click="save">保存规则，开始精准匹配</button>
			<view class="txt">
				注:如当前筛选无法全部满足，荒野将会为你推荐 最合适的匹配嘉宾
			</view>
		</view>
		
		<barry-picker ref="openLocation" @get-address="getLocation"></barry-picker>
		<barry-picker ref="openHomeTown" @get-address="getHomeTown"></barry-picker>
	</view>
</template>

<script>
	import SliderRange from '@/components/primewind-sliderrange/components/primewind-sliderrange/index.vue'
	export default {
		data(){
			return {
				imgBaseUrl: this.imgBaseUrl,
				bgColor: 'transparent',
				statusBarHeight: '',
				titleHeight: 44,
				height:{
					rangeMin: 150,
					rangMax: 200,
					rangeValue: [150, 200],
				},
				age:{
					rangeMin: 20,
					rangMax: 65,
					rangeValue: [20, 65],
				},
				education_level: [],
				marital_status: [],
				marriage_time: [],
				housework_allocation: [],
				income_allocation: [],
				child_status: [],
				child_intention: [],
				dating_purpose: [],
				marriage_verification: {
					yes: '已认证',
					no: '未认证'
				},
				marriage_verification1: {
					yes: '已认证',
					no: '未认证'
				},
				marriage_verification2: {
					yes: '已认证',
					no: '未认证'
				},
				identity_verification: {
					yes: '实名认证',
					no: '不限制'
				},
				formData: {
					education_level: '',//学历
					min_height: '150',
					max_height: '200',
					min_age: '20',
					max_age: '65',
					location: '广东东莞',//居住地
					HomeTown: '广东东莞',//家乡
					Nearby: false,
					identity_verification: '',//实名认证
					marital_status: '',//婚姻状态
					marriage_verification: '',//离婚状态
					marriage_verification1: '',//房产认证
					marriage_verification2: '',//车辆认证
					marriage_time: '',//结婚时间
					housework_allocation: '',// 家务劳动
					income_allocation: '',//收入分配
					child_status: '',// 孩子情况
					child_intention: '',// 婚后生娃打算
					dating_purpose: '',//交友目的
				}
			}
		},
		components: {
			SliderRange
		},
		onShow() {
			let that = this;
			uni.getSystemInfo({
			  success: function (info) {
			    var statusBarHeight = info.statusBarHeight;
				that.statusBarHeight = info.statusBarHeight + that.titleHeight;
			  }
			});
			
			let Enum = uni.getStorageSync('Enum');
			if (typeof(Enum) !== 'object') {
				Enum = JSON.parse(Enum)
			}
			const MachingExpectations = Enum.MachingExpectations;
			this.education_level = MachingExpectations.education_level;
			this.marital_status = MachingExpectations.marital_status;
			this.marriage_time = MachingExpectations.marriage_time;
			this.housework_allocation = MachingExpectations.housework_allocation;
			this.income_allocation = MachingExpectations.income_allocation;
			this.child_intention = MachingExpectations.child_intention;
			this.dating_purpose = MachingExpectations.dating_purpose;
		},
		onLoad() {
			
		},
		onPageScroll(e) {
			if(e.scrollTop >= 35){
				this.bgColor = 'white'
			}else{
				this.bgColor = 'transparent'
			}
		},
		methods:{
			getLocation(e) {
				this.formData.location = e.value.join("-");
			},
			getHomeTown(e) {
				this.formData.HomeTown = e.value.join("-");
			},
			openLocation() {
				this.$refs.openLocation.show = true
			},
			openHomeTown() {
				this.$refs.openHomeTown.show = true
			},
			changeForm(val,key){
				this.formData[key] = val;
			},
			change(){
				
			},
			heightChange(e) {
				this.formData.min_height = e[0];
				this.formData.max_height = e[1];
			},
			heightFormat(val) {
				return val
			},
			ageChange(e) {
				this.formData.min_age = e[0];
				this.formData.max_age = e[1];
			},
			ageFormat(val) {
				return val
			},
			leftClick(){
				uni.navigateBack();
			},
			save(){
				const res = this.$apis.homeApi.matchSet(this.formData);
				console.log(res)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>