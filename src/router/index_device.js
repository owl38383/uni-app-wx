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
    ],
  },
];