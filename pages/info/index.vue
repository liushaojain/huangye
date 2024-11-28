<template>
	<view class="page">
		<long-date chooseNum="30" @select="Time"></long-date>
		
		<gpp-date-picker @onCancel="onCancel" @onConfirm="onConfirm" :startDate="startDate" :endDate="endDate" :defaultValue="pickerDate">
		    {{pickerDate}}
		</gpp-date-picker>
	</view>
</template>

<script>
	import longDate from "@/components/long-date/long-date.vue"
	import gppDatePicker from "@/components/gpp-datePicker/gpp-datePicker.vue"
	export default {
	    components: {
	        longDate,
			gppDatePicker,
	    },
	    data() {
	        return {
				startDate: "1970-01-01",
				endDate: "2024-09-20",
				pickerDate: '2024-09-20'
			}
	    },
	    methods: {
	        Time(val) {
	            console.log(val);
	        },
			onCancel(e){
				console.log(e);
			},
			onConfirm(e){
				this.pickerDate = e.dateValue;
			}
	    }
	};
</script>

