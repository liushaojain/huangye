<template>
	<view class="form">
		<u--form labelPosition="left" :borderBottom='false' :model="userInfo" :rules="rules" ref="forms" label-width="120">
			<u-form-item label="婚姻状态" prop="marital_status" borderBottom ref="item1" @click="maritalStatusShow = true; hideKeyboard()">
				<u--input suffixIcon="arrow-right" inputAlign="right" disabled disabledColor="transparent" placeholder="请选择" v-model="userInfo.marital_status" border="none"></u--input>
			</u-form-item>
			<!-- <u-form-item label="是否有孩子" prop="height" borderBottom ref="item1">
				 <u--input suffixIcon="arrow-right" inputAlign="right" disabled disabledColor="transparent" placeholder="请选择" v-model="userInfo.height" border="none"></u--input>
			</u-form-item> -->
			<u-form-item label="孩子抚养情况" prop="child_status" borderBottom ref="item1" @click="childStatusShow = true">
				<u--input inputAlign="right" v-model="userInfo.child_status" disabled disabledColor="transparent" placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>				
			</u-form-item>
			<u-form-item label="抚养费支出" prop="alimony_payment" borderBottom ref="item1"  @click="alimonyPaymentShow = true">
				 <u--input suffixIcon="arrow-right" inputAlign="right" v-model="userInfo.alimony_payment" disabled disabledColor="transparent" placeholder="请选择" border="none"></u--input>
			</u-form-item>
			<u-form-item label="家庭背景" prop="family_background" borderBottom ref="item1" @click="familyBackgroundShow=true">
				 <u--input suffixIcon="arrow-right" inputAlign="right" placeholder="请选择" disabled  disabledColor="transparent" border="none" v-model="userInfo.family_background"></u--input>
			</u-form-item>
			<u-form-item label="探望子女周期" prop="child_visit_cycle" borderBottom ref="item1" @click="childVisitCycleShow=true">
				 <u--input suffixIcon="arrow-right" inputAlign="right" placeholder="请选择" disabled  disabledColor="transparent" border="none" v-model="userInfo.child_visit_cycle"></u--input>
			</u-form-item>
			<u-form-item label="离异时间" prop="divorce_time" borderBottom ref="item1" @click="datetimeShow = true">
				 <u--input suffixIcon="arrow-right" inputAlign="right" placeholder="请选择" disabled  disabledColor="transparent" border="none" v-model="userInfo.divorce_time"></u--input>
			</u-form-item>
			<u-form-item label="交友目的" prop="dating_purpose" borderBottom ref="item1" @click="datingPurposeShow = true">
				 <u--input suffixIcon="arrow-right" inputAlign="right" placeholder="请选择" disabled  disabledColor="transparent" border="none" v-model="userInfo.dating_purpose"></u--input>
			</u-form-item>
			<u-form-item label="期望结婚时间" prop="expected_marriage_time" borderBottom ref="item1" @click="timeShow = true">
				<u--input suffixIcon="arrow-right" inputAlign="right" placeholder="请选择" disabled  disabledColor="transparent" border="none" v-model="userInfo.expected_marriage_time"></u--input>
			</u-form-item>
			<u-form-item label="是否打算要孩子" prop="intention_to_have_children" borderBottom ref="item1" @click="intentionToHaveChildrenShow=true">
				 <u--input suffixIcon="arrow-right" inputAlign="right" placeholder="请选择" disabled  disabledColor="transparent" border="none" v-model="userInfo.intention_to_have_children" ></u--input>
			</u-form-item>
			<u-form-item label="为什么离异" prop="divorce_reason" borderBottom ref="item1" class="textareaItem" labelPosition ="top">
				<u--textarea class="textarea" border="none" v-model="userInfo.divorce_reason" placeholder="请输入" maxlength="300" count></u--textarea>
			</u-form-item>
		</u--form>
		<u-action-sheet :show="maritalStatusShow" :actions="marital_status" title="婚姻状态" @close="maritalStatusShow = false" @select="Select($event,'marital_status')"></u-action-sheet>		
		<u-action-sheet :show="childStatusShow" :actions="child_status" title="孩子抚养情况" @close="childStatusShow = false" @select="Select($event,'child_status')"></u-action-sheet>
		<u-action-sheet :show="alimonyPaymentShow" :actions="alimony_payment" title="抚养费支出" @close="alimonyPaymentShow = false" @select="Select($event,'alimony_payment')"></u-action-sheet>
		<u-action-sheet :show="familyBackgroundShow" :actions="family_background" title="家庭背景" @close="familyBackgroundShow = false" @select="Select($event,'family_background')"></u-action-sheet>
		<u-action-sheet :show="childVisitCycleShow" :actions="child_visit_cycle" title="探望子女周期" @close="childVisitCycleShow = false" @select="Select($event,'child_visit_cycle')"></u-action-sheet>
		<u-action-sheet :show="datingPurposeShow" :actions="dating_purpose" title="交友目的" @close="datingPurposeShow = false" @select="Select($event,'dating_purpose')"></u-action-sheet>
		<u-action-sheet :show="intentionToHaveChildrenShow" :actions="intention_to_have_children" title="交友目的" @close="intentionToHaveChildrenShow = false" @select="Select($event,'intention_to_have_children')"></u-action-sheet>
		<u-action-sheet :show="timeShow" :actions="expected_marriage_time" title="期望结婚时间" @close="timeShow = false" @select="Select($event,'expected_marriage_time')"></u-action-sheet>
		
		<u-datetime-picker :show="datetimeShow" v-model="datetimeValue" mode="date" @confirm="Dateconfirm($event,'divorce_time')" @cancel="datetimeShow = false" ></u-datetime-picker>
		<!-- <u-datetime-picker :show="expectedMarriageTimeShow" v-model="expectedMarriageTime" mode="date" @confirm="Dateconfirm($event,'expected_marriage_time')" @cancel="expectedMarriageTimeShow = false" ></u-datetime-picker> -->
		

		<barry-picker ref="placeDialog" @get-address="getPlace"></barry-picker>
		<barry-picker ref="hometownDialog" @get-address="getHometown"></barry-picker>
	</view>
</template>

<script>
	import {dateFormat} from '@/utils/util.js'
	export default {
		data() {
			return {
				maritalStatusShow: false,
				childStatusShow: false,
				alimonyPaymentShow: false,
				familyBackgroundShow: false,
				childVisitCycleShow: false,
				datingPurposeShow: false,
				intentionToHaveChildrenShow: false,
				expectedMarriageTimeShow: false,
				datetimeShow: false,
				timeShow: false,
				datetimeValue: Number(new Date()),
				expectedMarriageTime: Number(new Date()),
				
				userInfo: {
					marital_status: '',
					// is_childer: '',
					child_status: '',
					alimony_payment: '',
					family_background: '',
					child_visit_cycle: '',
					divorce_time: '',
					dating_purpose: '',
					expected_marriage_time: '',
					intention_to_have_children: '',
					divorce_reason: ''
				},
				rules: {
					'marital_status': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					// 'is_childer': [{
					// 	type: 'string',
					// 	required: true,
					// 	message: '选择是否有孩子',
					// 	trigger: ['blur', 'change']
					// }],
					'child_status': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'alimony_payment': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'family_background': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'child_visit_cycle': [{
						type: 'string', 
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'divorce_time': [{
						type: 'string',
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					'dating_purpose': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'expected_marriage_time': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'intention_to_have_children': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'divorce_reason': [{
						type: 'string',
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
				},
				radio: '',
				switchVal: false,
				Enum: {},
				marital_status: [],
				child_status: [],
				alimony_payment: [],
				family_background: [],
				child_visit_cycle: [],
				dating_purpose: [],
				expected_marriage_time: [],
				education:[],
				livingStatus: [],
			};
		},
		methods: {
			dateFormat,
			Select(e,key) {
				this.userInfo[key] = e.name;
				this.$refs.forms.validateField(key)
			},
			getselectData(Enum,index){
				let data = [];
				for(let key in Enum.MemberMarriageInfo[index]){
					data.push({
						name: Enum.MemberMarriageInfo[index][key],
						key
					})
				}
				console.log('data',data)
				return data;
			},
			Dateconfirm(date,key){
				const divorce_time = this.dateFormat(date.value)
				this.userInfo[key] = divorce_time;
				this.$refs.forms.validateField(key)
				this.datetimeShow = false;
				this.expectedMarriageTimeShow = false;
			},
			DateCancel(e){
				this.datetimeShow = false;
			},
			async submit(){
				this.$refs.forms.validate().then(res=>{
					this.$apis.uesrApi.setMarryInfo(this.userInfo).then(data=>{
						console.log(data)
					})
				}).catch(errors => {
					uni.$u.toast('请完善信息')
				})
			},
			hideKeyboard(){
				uni.hideKeyboard()
			},
			getHometown(e){
				this.userInfo.hometown = e.value.join('-');
				this.$nextTick(()=>{
					this.$refs.forms.validateField('hometown');
				})
			},
			getPlace(e){
				this.userInfo.place = e.value.join('-')
				this.$nextTick(()=>{
					this.$refs.forms.validateField('place');
				})
			},
			openHometown(){
				this.$refs.hometownDialog.show = true;
			},
			openPlace(){
				this.$refs.placeDialog.show = true;
			},
		},
		mounted() {
			let Enum = uni.getStorageSync('Enum');
			if(typeof(Enum)!=='object'){
				Enum = JSON.parse(Enum)
			}
			this.marital_status = this.getselectData(Enum,'marital_status');
			this.child_status = this.getselectData(Enum,'child_status');
			this.alimony_payment = this.getselectData(Enum,'alimony_payment');
			this.family_background = this.getselectData(Enum,'family_background');
			this.child_visit_cycle = this.getselectData(Enum,'child_visit_cycle');
			this.dating_purpose = this.getselectData(Enum,'dating_purpose');
			this.intention_to_have_children = this.getselectData(Enum,'intention_to_have_children');
			this.expected_marriage_time = this.getselectData(Enum,'expected_marriage_time');
			
			
			this.education = this.getselectData(Enum,'education');
			this.livingStatus = this.getselectData(Enum,'living_status');
			this.$nextTick(()=>{
				this.$refs.forms.setRules(this.rules)
			})
		},
	};
</script>
<style lang="scss" scoped>
	.form{
		padding: 32rpx;
		background: white;
		border-radius: 28rpx;
	}
</style>