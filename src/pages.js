const { hot } = require("uni-pages-hot-modules");
module.exports = hot((pagesJson) => {
  let basePages = [
    {
      path: "pages/loading/loading",
      style: {
        navigationBarTitleText: "",
        enablePullDownRefresh: false,
        disableSwipeBack: true,
      },
    },
    {
      path: "pages/login/login",
      style: {
        disableSwipeBack: true,
        navigationBarTitleText: "登录",
        enablePullDownRefresh: false,
        topWindow: false,
        // 当前页面不显示 topWindow
      },
    },
  ];
  return {
    // 合并pages.json的内容
    ...pagesJson,
    pages: [...basePages],
    subPackages: [
			...require("./router/index.js"),
	    ...require("./router/index_device.js"),
	    ...require("./router/index_company.js"),
	    ...require("./router/index_building.js"),
	    ...require("./router/index_user.js"),
    ],
  };
});
