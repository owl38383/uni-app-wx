module.exports = [
  {
    root: "pages_sub/device",
    pages: [
      {
        path: "device",
        style: {
          navigationBarTitleText: "",
          enablePullDownRefresh: true,
        },
      },
	    {
        path: "device_info",
        style: {
          navigationBarTitleText: "设备信息",
          enablePullDownRefresh: false,
        },
      },
	    {
        path: "firesystem",
        style: {
          navigationBarTitleText: "消防设施系统",
          enablePullDownRefresh: false,
        },
      },
    ],
  },
];
