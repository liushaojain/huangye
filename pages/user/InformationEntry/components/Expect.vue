<template>
	<view class="form">
		<u--form labelPosition="left" :borderBottom='false' :model="userInfo" :rules="rules" ref="forms"
			label-width="120">
			<u-form-item label="喝酒" prop="drinking" borderBottom ref="item1"
				@click="drinkingShow = true; hideKeyboard()">
				<u--input suffixIcon="arrow-right" inputAlign="right" disabled disabledColor="transparent"
					placeholder="请选择" v-model="userInfo.drinking" border="none"></u--input>
			</u-form-item>
			<u-form-item label="宠物" prop="pet" borderBottom ref="item1" @click="petShow = true">
				<u--input inputAlign="right" v-model="userInfo.pet" disabled disabledColor="transparent"
					placeholder="请选择" border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
			<u-form-item label="抽烟" prop="smoking" borderBottom ref="item1" @click="smokingShow = true">
				<u--input suffixIcon="arrow-right" inputAlign="right" disabled disabledColor="transparent"
					placeholder="请选择" v-model="userInfo.smoking" border="none"></u--input>
			</u-form-item>
			<u-form-item label="健身频率" prop="exercise_frequency" borderBottom ref="item1"
				@click="exercise_frequencyShow=true">
				<u--input suffixIcon="arrow-right" inputAlign="right" placeholder="请选择" disabled
					disabledColor="transparent" border="none" v-model="userInfo.exercise_frequency"></u--input>
			</u-form-item>
			<u-form-item label="旅游频率" prop="travel_frequency" borderBottom ref="item1"
				@click="travel_frequencyShow=true">
				<u--input suffixIcon="arrow-right" inputAlign="right" placeholder="请选择" disabled
					disabledColor="transparent" border="none" v-model="userInfo.travel_frequency"></u--input>
			</u-form-item>
			<u-form-item label="会不会做饭" prop="can_cook" borderBottom ref="item1" @click="can_cookShow = true">
				<u--input suffixIcon="arrow-right" inputAlign="right" placeholder="请选择" disabled
					disabledColor="transparent" border="none" v-model="userInfo.can_cook"></u--input>
			</u-form-item>
			<u-form-item label="居住状态" prop="habitability" borderBottom ref="item1" @click="habitabilityShow = true">
				<u--input suffixIcon="arrow-right" inputAlign="right" placeholder="请选择" disabled
					disabledColor="transparent" border="none" v-model="userInfo.habitability"></u--input>
			</u-form-item>
			<u-form-item label="更多补充" prop="description" borderBottom ref="item1" class="textareaItem"
				labelPosition="top">
				<u--textarea class="textarea" border="none" v-model="userInfo.description" placeholder="请输入"
					maxlength="300" count></u--textarea>
			</u-form-item>
		</u--form>
		<u-action-sheet :show="drinkingShow" :actions="drinking" title="喝酒"
			@close="drinkingShow = false" @select="Select($event,'drinking')">
		</u-action-sheet>
		<u-action-sheet :show="petShow" :actions="pet" title="宠物"
			@close="petShow = false" @select="Select($event,'pet')">
		</u-action-sheet>
		
		<u-action-sheet :show="smokingShow" :actions="smoking" title="抽烟"
			@close="smokingShow = false" @select="Select($event,'smoking')">
		</u-action-sheet>
		<u-action-sheet :show="exercise_frequencyShow" :actions="exercise_frequency" title="健身频率"
			@close="exercise_frequencyShow = false" @select="Select($event,'exercise_frequency')">
		</u-action-sheet>
		<u-action-sheet :show="travel_frequencyShow" :actions="travel_frequency" title="健身频率"
			@close="travel_frequencyShow = false" @select="Select($event,'travel_frequency')">
		</u-action-sheet>
		<u-action-sheet :show="can_cookShow" :actions="can_cook" title="会不会做饭"
			@close="can_cookShow = false" @select="Select($event,'can_cook')">
		</u-action-sheet>
		<u-action-sheet :show="habitabilityShow" :actions="habitability" title="居住状态"
			@close="habitabilityShow = false" @select="Select($event,'habitability')">
		</u-action-sheet>
	</view>
</template>

<script>
	import {
		dateFormat
	} from '@/utils/util.js'
	export default {
		data() {
			return {
				drinking: [],
				pet: [],
				smoking: [],
				exercise_frequency: [],
				travel_frequency: [],
				can_cook: [],
				habitability: [],
				
				drinkingShow: false,
				petShow: false,
				smokingShow: false,
				exercise_frequencyShow: false,
				travel_frequencyShow: false,
				can_cookShow: false,
				habitabilityShow: false,
				userInfo: {
					drinking: "",
					pet: "",
					smoking: "",
					exercise_frequency: "",
					travel_frequency: "",
					can_cook: "",
					habitability: '',
					description: '',
				},
				rules: {
					'drinking': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'pet': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'smoking': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'exercise_frequency': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'travel_frequency': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'can_cook': [{
						type: 'string',
						required: true,
						message: '请输入',
						trigger: ['blur', 'change']
					}],
					'habitability': [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					'description': [{
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

				education: [],
				livingStatus: [],
			};
		},
		methods: {
			dateFormat,
			Select(e, key) {
				this.userInfo[key] = e.name;
				this.$refs.forms.validateField(key)
			},
			getselectData(Enum, index) {
				let data = [];
				for (let key in Enum.ExpectedHim[index]) {
					data.push({
						name: Enum.ExpectedHim[index][key],
						key
					})
				}
				console.log('data', data)
				return data;
			},
			Dateconfirm(date, key) {
				const divorce_time = this.dateFormat(date.value)
				this.userInfo[key] = divorce_time;
				this.$refs.forms.validateField(key)
				this.datetimeShow = false;
				this.expectedMarriageTimeShow = false;
			},
			DateCancel(e) {
				this.datetimeShow = false;
			},
			async submit() {
				this.$refs.forms.validate().then(res => {
					this.$apis.uesrApi.expectedHim(this.userInfo).then(data => {
						console.log(data)
					})
				}).catch(errors => {
					uni.$u.toast('请完善信息')
				})
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			getHometown(e) {
				this.userInfo.hometown = e.value.join('-');
				this.$nextTick(() => {
					this.$refs.forms.validateField('hometown');
				})
			},
			getPlace(e) {
				this.userInfo.place = e.value.join('-')
				this.$nextTick(() => {
					this.$refs.forms.validateField('place');
				})
			},
			openHometown() {
				this.$refs.hometownDialog.show = true;
			},
			openPlace() {
				this.$refs.placeDialog.show = true;
			},
		},
		mounted() {
			let Enum = uni.getStorageSync('Enum');
			if (typeof(Enum) !== 'object') {
				Enum = JSON.parse(Enum)
			}
			this.drinking = this.getselectData(Enum, 'drinking');
			this.pet = this.getselectData(Enum, 'pet');
			this.smoking = this.getselectData(Enum, 'smoking');
			this.exercise_frequency = this.getselectData(Enum, 'exercise_frequency');
			this.travel_frequency = this.getselectData(Enum, 'travel_frequency');
			this.can_cook = this.getselectData(Enum, 'can_cook');
			this.habitability = this.getselectData(Enum, 'habitability');


			this.education = this.getselectData(Enum, 'education');
			this.livingStatus = this.getselectData(Enum, 'living_status');
			this.$nextTick(() => {
				this.$refs.forms.setRules(this.rules)
			})
		},
	};
</script>
<style lang="scss" scoped>
	.form {
		padding: 32rpx;
		background: white;
		border-radius: 28rpx;
	}
</style>