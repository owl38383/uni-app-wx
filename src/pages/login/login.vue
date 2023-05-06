<template>
    <view class="x-page">
        <view class="x-page-header x-padding-10">
            <view class="common-page-head-title">欢迎登录</view>
        </view>

        <view class="x-page-body x-padding-10">
            <u-form>
                <u-form-item label="账号" prop="login_form.user_name">
                    <u-input v-model="login_form.user_name" border="bottom" clearable
                             placeholder="请输入账号"></u-input>
                </u-form-item>
                <u-form-item label="密码" prop="userInfo.name">
                    <u-input v-model="login_form.user_pwd" border="bottom" clearable placeholder="请输入密码"
                             type="password"></u-input>
                </u-form-item>
            </u-form>
            <u-button class="x-login-button" @click="formSubmit">点击登录</u-button>
        </view>
    </view>
</template>

<script>

export default {
	data() {
		return {
			login_form: {
				user_name: "15710013767",
				user_pwd: "123456",
			},
			ifRememberPsd: false,
		};
	},
	methods: {
		formSubmit() {
			uni.$x.api.login(this.login_form).then(async (res) => {
				if (this.ifRememberPsd) {
					uni.$x.localStorage.setStore("password", this.password);
					uni.$x.localStorage.setStore("username", this.username);
					uni.$x.localStorage.setStore("ifRememberPsd", true);
				} else {
					uni.$x.localStorage.setStore("password", "");
					uni.$x.localStorage.setStore("username", "");
					uni.$x.localStorage.setStore("ifRememberPsd", false);
				}
				uni.$x.localStorage.setStore(res.user_id + "_app_count", {});
				uni.$x.localStorage.setStore("is_login", true);
				uni.$x.localStorage.setStore("userInfo", res);
				getApp().globalData.loading = true;
				await this.getInfo(res);
				await this.cacheAccount(res);
				getApp().globalData.loading = false;
				await uni.showToast({
					title: "欢迎回来\t" + res.name,
					icon: "none",
				});
				// 发送上传位置事件
				uni.$emit('upload_geo')
				this.$u.route({
					type: "reLaunch",
					url: "/pages/tabBar/index/index",
				});
			});
		},
		updArray(arr, id) {
			let index = 1,
				newArr = [],
				length = arr.length;
			for (let i = 0; i < length; i++) {
				if (arr[i].id == id) {
					newArr[0] = arr[i];
				} else {
					newArr[index++] = arr[i];
				}
			}
			return newArr;
		},
		async cacheAccount(res) {
			let domain = uni.$x.localStorage.getStore("domain");
			let domainaccount = uni.$x.localStorage.getStore(domain + "-account");
			let account = {
				username: this.username,
				password: this.password,
				name: res.name,
				absolute_path: res.user_pic[0].absolute_path,
				update_time: res.update_time,
				id: res.user_id,
				account: res.account,
			};
			if (domainaccount == "") {
				uni.$x.localStorage.setStore(domain + "-account", [account]);
			} else {
				if (
					domainaccount.some((e) => {
						return e.id == res.user_id;
					})
				) {
					domainaccount = this.updArray(domainaccount, res.user_id);
				} else {
					domainaccount.unshift(account);
				}
				if (domainaccount.length == 6) {
					domainaccount.pop();
				}
				uni.$x.localStorage.setStore(domain + "-account", domainaccount);
			}
		},
		
		async getInfo(res) {
			let id = res.enum_user_type.id;
			let company = null;
			if (id == 1 || id == 4 || id == 6) {
				await uni.$x.api
					.get_company_list({
						unit_type: "info_company_cared",
					})
					.then((obj) => {
						if (obj.list.length == 0) {
							uni.showToast({
								title:
									id == 1
										? "当前中心下无联网单位,登录失败！"
										: "当前维保单位下无联网单位,登录失败！",
								icon: "none",
							});
						} else {
							company = {
								id: res.company_id,
								name: res.company_name,
								type: res.company_type,
								checkCompany: {
									id: res.company_id,
									name: res.company_name,
									type: res.company_type,
								},
							};
						}
					});
			} else if (id == 2) {
				company = {
					id: res.company_id,
					name: res.company_name,
					type: res.company_type,
					checkCompany: {
						id: res.company_id,
						name: res.company_name,
						type: res.company_type,
					},
				};
			} else {
				uni.showToast({
					title: "暂无登录权限！",
					icon: "none",
				});
				return;
			}
			uni.$x.localStorage.setStore("company", company);
		},
	},
};
</script>

<style lang="scss" scoped>
.x-login-button {
  margin-top: 20px;
}
</style>
