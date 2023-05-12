<template>
    <view>
        <x-navbar>
            <view slot="title">
                个人中心
            </view>
        </x-navbar>

        <view class="u-page">
            <view class="my-item" @click="user">
                <u-row>
                    <u-col span="3">
                        <!--<u-avatar :src="$u.host + userInfo.user_pic[0].absolute_path" size='60' :text="userInfo.name.substr(0,1)"></u-avatar>-->
                        <u-avatar :text="userInfo.name.substr(0, 1)" size="60"></u-avatar>
                    </u-col>
                    <u-col span="9">
                        <u-cell-group :border="false">
                            <u-cell :border="false" :isLink="true" :title="userInfo.name" class="user-cell"
                                    label="更换头像、账号管理、授权信息"></u-cell>
                        </u-cell-group>
                    </u-col>
                </u-row>
            </view>
            <view class="my-item my-item-main u-margin-top-20">
                <u-cell-group :border="false">
                    <u-cell :value="userInfo.enum_user_role.name" icon="account" title="职位"></u-cell>
                    <u-cell :value="userInfo.account" icon="phone" title="电话"></u-cell>
                    <u-cell :border="false" :value="userInfo.company_name" icon="tags" title="单位"></u-cell>
                </u-cell-group>
            </view>
            <view class="my-item my-item-main u-margin-top-20">
                <u-cell-group :border="false">
                    <u-cell :isLink="true" icon="setting" title="设置" @click="toSetting"></u-cell>
                    <u-cell :isLink="true" icon="setting" title="位置信息" @click="toGeo"></u-cell>
                    <u-cell :isLink="true" icon="kefu-ermai" title="帮助" @click="helpFeedback"></u-cell>
                    <u-cell :isLink="true" icon="email" title="反馈" @click="feedback"></u-cell>
                    <u-cell :border="false" :isLink="true" icon="attach" title="关于" @click="about"></u-cell>
                </u-cell-group>
            </view>
        </view>

        <u-button @click="logout">退出登录</u-button>
    </view>
</template>

<script>

export default {
	data() {
		return {
			src: "",
			userInfo: uni.$x.localStorage.getStore("userInfo"),
		};
	},
	methods: {
		user() {
			uni.$u.throttle(() => {
				uni.navigateTo({url: "/pages_sub/user/user"});
			}, 1000);
		},
		about() {
			uni.$u.throttle(() => {
				uni.navigateTo({url: "/pages_sub/user/about?mode=0"});
			}, 1000);
		},
		toSetting() {
			uni.$u.throttle(() => {
				uni.navigateTo({url: "/pages_sub/user/settings"});
			}, 1000);
		},
		helpFeedback() {
			uni.$u.throttle(() => {
				uni.navigateTo({url: "/pages_sub/user/helpFeedback"});
			}, 1000);
		},
		feedback() {
			uni.$u.throttle(() => {
				uni.navigateTo({url: "/pages_sub/user/feedback"});
			}, 1000);
		},
		toGeo() {
			uni.$u.throttle(() => {
				uni.navigateTo({url: "/pages_sub/user/geo"});
			}, 1000);
		},
		logout() {
			uni.$emit("logout", 1);
		},
		// 默认加载
		async initLoad() {
		
		}
	},
	mounted() {
		this.userInfo = uni.$x.localStorage.getStore("userInfo");
	},
};
</script>

<style lang="scss" scoped>
.my {
  position: relative;

  &-info {
    width: 100%;
    height: calc(100vh - var(--window-bottom));
    min-height: 450px;
    background-color: #3da5f1;
    box-sizing: border-box;
    @include flex(column);
    align-items: center;
    padding-top: 10%;

    &-avatar {
      padding: 10px;
      background: rgba(255, 255, 255, 0.05);
      display: inline-block;
      border-radius: 100%;
      float: right;

      &-level-1 {
        border-radius: 100%;
        padding: 10px;
        background: rgba(255, 255, 255, 0.05);

        &-1 {
          border-radius: 100%;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
        }
      }
    }
  }

  &-setting {
    position: relative;
    height: 230px;

    &-box {
      width: 86%;
      margin-left: 7%;
      height: 400px;
      background: #fff;
      position: absolute;
      top: -200px;
      border: 1px solid #3da5f1;
      border-radius: 15px;
      margin-bottom: 30rpx;
      padding: 20rpx;
      box-sizing: border-box;
    }
  }
}

.u-page {
  // padding: 30rpx;
  box-sizing: border-box;

  .my-item {
    padding: 30px 30rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 2px;
  }

  .my-item-main {
    padding: 20rpx;
  }
}

.status_bar {
  background: #f6f6f6;
}
</style>

<style>
.user-cell .u-cell__body {
    padding: 0px !important;
}
</style>
