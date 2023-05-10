<template>
  <view>
    <u-loading-page :loading="true" loading-mode="spinner"></u-loading-page>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    async login_before() {
      return new Promise((resolve) => {
        uni.$x.api.no_login_info().then((res) => {
          if (res) {
            uni.$x.zeusConfig.setHost(res.host);
            console.log(uni.$x.zeusConfig.getHost());
            resolve();
          } else {
          }
        });
      });
    },
    initData() {
      this.login_before().then((res) => {
        if (uni.$x.localStorage.getStore("is_login") == true) {
          uni.reLaunch({
            url: "/pages/tabBar/index/index",
          });
	        // 发送上传位置事件
	        uni.$emit('upload_geo')
	        // 连接socket
	        uni.$emit('client_socket')
        } else {
          uni.reLaunch({
            url: "/pages/login/login",
          });
        }
      });
    },
  },
  mounted() {
    this.initData();
  },
};
</script>

<style lang="scss"></style>
