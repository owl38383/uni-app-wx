module.exports = [
  {
    root: "pages_sub/user",
    pages: [
      {
        path: "user",
        style: {
          navigationBarTitleText: "系统权限",
          enablePullDownRefresh: true,
        },
      },
	    {
        path: "geo",
        style: {
          navigationBarTitleText: "位置信息",
          enablePullDownRefresh: false,
        },
      },
	    {
        path: "settings",
        style: {
          navigationBarTitleText: "个人设置",
          enablePullDownRefresh: false,
        },
      },
    ],
  },
];
