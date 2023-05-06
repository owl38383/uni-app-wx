module.exports = [
  {
    root: "pages_sub/user",
    pages: [
      {
        path: "user",
        style: {
          navigationBarTitleText: "",
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
    ],
  },
];
