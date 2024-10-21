const api={
	getHomePageMessage: 'smallbatch/sdb-b2-c-message/getHomePageMessage', // 获取未读消息个数
	clearUnread:'smallbatch/sdb-b2-c-message/clearUnreadByMemberId', // 消除未读
	getSystemMessage:'smallbatch/sdb-b2-c-message/getSystemMessageByMemberId' ,// 系统消息列表
	submitFeedBack:"smallbatch/sdb-b2-c-member-complaint/insertOpinionSuggestion", // 提交意见建议
}
export default api