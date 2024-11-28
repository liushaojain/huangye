<template>
	<view>
		<view class="long-data-picker" >
			<picker-view :indicator-style="itemHeight" @change="bindDateChange">

				<picker-view-column>
					<view class="long-datetime-item" v-for="(item,index) in dates" :key="index">{{item}}</view>
				</picker-view-column>

				<picker-view-column>
					<view class="long-datetime-item" v-for="(item,index) in hours" :key="index" >{{item}}</view>
				</picker-view-column>

				<picker-view-column>
					<view class="long-datetime-item" v-for="(item,index) in minutes" :key="index" >{{item}}</view>
				</picker-view-column>

			</picker-view>
		</view>
	</view>

</template>

<script>
	import moment from './moment.js'//导入文件
	moment.locale('zh-cn') 
	export default {
		name: "long-date",
		props: {
			
			chooseNum:{
				type:Number,
				default:30
			}

		},



		data() {
			return {
				itemHeight: `height: ${uni.upx2px(88)}px;`,
				dates: [],
				hours: [],
				minutes: [],
				formatdates:[]
			};
		},

		computed: {
			//自动计算当前时间
			currentdateindex:function(nv){
				console.log(nv)
				if(nv==0){
					let h = parseInt(moment().format("HH")) 
					this.hours = []
					for (let i = h; i < 24; i++) {
						let str = i;
						if (i < 10) {
							str = '0' + str;
						} else {
							str = '' + str;
						}
						this.hours.push(str);
					}
					this.minutes = []
					let m = parseInt(moment().format("mm")) 
					for (let i = m; i < 60; i++) {
						let str = i;
						if (i < 10) {
							str = '0' + str;
						} else {
							str = '' + str;
						}
						this.minutes.push(str);
					}
				}
			}
			
		},
		mounted() {
			this.initDate();
		},
		methods: {
			//初始化时间
			initDate() {
				let currentdate = moment().format("MMM Do");
				//设置日期数组
				this.dates = []
				//格式化日期数组
				this.formatdates = []
			
				
				for (let i = 0; i <= this.chooseNum; i++) {
					this.formatdates.push(moment().add(i, 'days').format("YYYY-MM-DD"))
					this.dates.push(moment().add(i, 'days').format("MMM Do dddd"))
				}
				let h = parseInt(moment().format("HH"))
				this.hours = []
				for (let i = h; i < 24; i++) {
					let str = i;
					if (i < 10) {
						str = '0' + str;
					} else {
						str = '' + str;
					}
					this.hours.push(str);
				}
				this.minutes = []
				let m = parseInt(moment().format("mm")) 
				for (let i = m; i < 60; i++) {
					let str = i;
					if (i < 10) {
						str = '0' + str;
					} else {
						str = '' + str;
					}
					this.minutes.push(str);
				}

			},


			//滚动切换时间
			bindDateChange(e) { //有效日期的滚动日期时间方法
				let valueArr = e.detail.value
				this.hours = []
				this.minutes = []
				if(valueArr[0]!=0){
					for (let i = 0; i < 24; i++) {
						let str = i;
						if (i < 10) {
							str = '0' + str;
						} else {
							str = '' + str;
						}
						this.hours.push(str);
					}
					for (let i = 0; i < 60; i++) {
						let str = i;
						if (i < 10) {
							str = '0' + str;
						} else {
							str = '' + str;
						}
						this.minutes.push(str);
					}
				}else{
					let h = parseInt(moment().format("HH"))
					this.hours = []
					for (let i = h; i < 24; i++) {
						let str = i;
						if (i < 10) {
							str = '0' + str;
						} else {
							str = '' + str;
						}
						this.hours.push(str);
					}
					this.minutes = []
					let m = parseInt(moment().format("mm")) 
					for (let i = m; i < 60; i++) {
						let str = i;
						if (i < 10) {
							str = '0' + str;
						} else {
							str = '' + str;
						}
						this.minutes.push(str);
					}
				}
				
				let dateStr = this.formatdates[valueArr[0]];
				let hourStr = this.hours[valueArr[1]];
				let minuteStr = this.minutes[valueArr[2]];
				console.log(dateStr + ' ' + hourStr + ':' + minuteStr)
				this.$emit("select", {
					time: moment(dateStr + ' ' + hourStr + ':' + minuteStr).format("YYYY-MM-DD HH:mm")
				});
			}

		},

	}
</script>

<style>
	.long-data {
		margin-top: 30rpx;
		height: 80rpx;
		background: #FFFFFF;
		line-height: 80rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		border-bottom: 1px solid #eee;
		/* position: relative; */
	}

	.long-data-check {
		height: 40rpx;
		width: 100%;
		background: #e54d42;
		position: absolute;
		left: 0;
		top: 18rpx;
		color: #fff;
		line-height: 45rpx;
		border-radius: 0rpx;
		padding: 0px 20rpx;
		font-size: 20rpx;
		text-align: center;
		border-radius: 20rpx;

	}

	.long-data-check-triangle {
		width: 0;
		height: 0;
		border-top: 12rpx solid transparent;
		border-left: 10rpx solid #e54d42;
		border-bottom: 12rpx solid transparent;
		position: absolute;
		right: 223rpx;
		top: 26rpx;


	}


	.long-data-fl {
		float: left;
	}

	.long-data-fr {
		float: right;
	}

	.long-data-changeTime {
		color: #888;
		font-size: 25rpx;
		position: relative;
		text-align: right;
		padding: 0rpx 20rpx;
	}

	.long-data-changeTimeIcon {
		color: #888;
	}

	.long-data-picker {
		width: 100%;
		height: 250rpx;
		overflow: hidden;
		background: #fff;
		transition: height 0.3s;
	}

	.long-datetime-item {
		text-align: center;
		width: 100%;
		height: 88upx;
		line-height: 88upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 30upx;
	}

	.long-data-picker picker-view {
		height: 100%;
	}
</style>
