module.exports = [
  {
    root: "pages/tabBar",
    pages: [
      {
        path: "index/index",
        style: {
          navigationBarTitleText: "",
	        navigationStyle: "custom" ,// 隐藏系统导航栏
          enablePullDownRefresh: false,
        },
      },
    ],
  },
];
