<template>
    <view class="container">
        <view class="u-flex-fill">
            <home v-if="tabBarValue === 'home'"></home>
            <about v-else-if="tabBarValue === 'about'"></about>
        </view>
		    <view class="x-tabbar">
            <u-tabbar :fixed="true" :placeholder="true" :safeAreaInsetBottom="true" :value="tabBarValue"
                      transition="all 300ms ease" @change="(name) => (tabBarValue = name)">
                <u-tabbar-item v-for="item in tabBarList" :key="item.name" :name="item.name" :text="item.text">
                    <image slot="active-icon" :src="item.selectedIconPath" class="u-page__item__slot-icon"/>
                    <image slot="inactive-icon" :src="item.iconPath" class="u-page__item__slot-icon"/>
                </u-tabbar-item>
            </u-tabbar>
		    </view>
    </view>
</template>


<script>
import home from "@/pages/tabBar/home/home.vue";
import about from "@/pages/tabBar/about/about.vue";

export default {
	components: {
		home,
		about,
	},
	data() {
		return {
			tabBarValue: "home",
			tabBarList: [
				{
					text: "首页",
					name: "home",
					icon: "",
					iconPath: "/pages/tabBar/static/tabBar/home.png",
					selectedIconPath: "/pages/tabBar/static/tabBar/home-fill.png",
				},
				{
					text: "我的",
					name: "about",
					icon: "",
					iconPath: "/pages/tabBar/static/tabBar/my.png",
					selectedIconPath: "/pages/tabBar/static/tabBar/my-fill.png",
				},
			],
		};
	},
	methods: {
		unloadOn() {
			uni.$off("switchCompany")
		},
		loadOn() {
			uni.$on("barTitle", function (data) {
				console.log("监听到事件来自 barTitle ，携带参数 msg 为：" + data);
				uni.setNavigationBarTitle({
					title: data,
				});
			});
		}
	},
	onUnload() {
		this.unloadOn()
	},
	onLoad() {
		// 开发中因为热加载会多次监听
		this.unloadOn()
		uni.setNavigationBarTitle({
			title: uni.getAppBaseInfo().appName,
		});
		this.loadOn()
	},
	onShow() {
	},
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh
}

.x-tabbar {
  height: auto;
  flex-shrink: 0;
}

.u-page__item__slot-icon {
  width: 20px;
  height: 20px;
}
</style>
