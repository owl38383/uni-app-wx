module.exports = [
	{
		root: "pages_sub/company",
		pages: [
			{
				path: "company",
				style: {
					navigationBarTitleText: "单位管理",
					enablePullDownRefresh: true,
				},
			}, {
				path: "company_info",
				style: {
					navigationBarTitleText: "单位信息",
					enablePullDownRefresh: false,
				},
			},
		],
	},
];
