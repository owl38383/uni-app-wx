<template>
    <view>
		    <view class="navbar" :style="{height:statusBarHeight+navbarHeight+'px'}" />
        <view :style="{ paddingRight:navRight+'px', position: 'fixed',top:0,left: 0, right: 0, }" class="navbar">
		        <view :style="{height:statusBarHeight+'px'}"></view>
            <view :style="{height:navbarHeight+'px'}"
                  class="navbar-content">
                <view class="navbar-left">
                    <slot name="left"></slot>
                </view>
                <view v-if="$slots.title" class="navbar-title">
                    <slot name="title"></slot>
                </view>
                <!-- #ifndef MP -->
                <view class="navbar-right">
                    <slot name="right"></slot>
                </view>
                <!-- #endif -->
            </view>
        </view>
    </view>
</template>

<script>
export default {
	name: 'Navbar',
	data() {
		return {
			statusBarHeight: uni.$x.UIConfig.statusBarHeight,
			navbarHeight: uni.$x.UIConfig.navbarHeight,
			navRight: uni.$x.UIConfig.navRight,
		};
	},
};
</script>

<style scoped>
.navbar {
    background: #f6f6f6;
		display: flex;
    flex-direction: column;
		z-index: 999;
}

.navbar-content {
    display: flex;
		justify-content: space-between;
		align-items: center;

}

.navbar-left,
.navbar-right {
    width: 70px;
    padding: 5px;
    box-sizing: border-box;
}

.navbar-title {
    flex-grow: 1;
    text-align: center;
    font-size: 18px;
    display: flex;
    justify-content: center;
}
</style>
