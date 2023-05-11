<template>
    <view>
        <u-cell-group>
            <u-cell v-for="(item,index) in auth" :key="index" :label="item.desc" :title="item.title" :value="item.status"
                    @click="gotoPermission(item.key)"/>
        </u-cell-group>
    </view>
</template>

<script>
import permission from "@/common/permission";

export default {
	data() {
		return {
			auth: {
				push: {
					title: '消息通知',
					status: '',
					ios: 'push',
					android: ['android.permission.ACCESS_NOTIFICATION_POLICY'],
					desc: '用于与发布通知关联的权限'
				},
				location: {
					title: '开启地理位置定位',
					status: '',
					ios: 'location',
					android: ['android.permission.ACCESS_FINE_LOCATION'],
					desc: '用于允许访问设备位置的权限'
				},
				camera: {
					title: '允许访问相机',
					status: '',
					ios: 'camera',
					android: ['android.permission.CAMERA'],
					desc: '用于与访问相机或从设备捕获图像/视频相关联的权限。'
				},
				photoLibrary: {
					title: '允许读取/写入相册',
					status: '',
					ios: 'photo',
					android: ['android.permission.READ_EXTERNAL_STORAGE', 'android.permission.WRITE_EXTERNAL_STORAGE'],
					desc: '需要能够从共享存储中读取图像和视频文件'
				},
				record: {
					title: '麦克风',
					status: '',
					ios: 'record',
					android: ['android.permission.READ_CONTACTS', 'android.permission.WRITE_CONTACTS'],
					desc: '用于访问用户信息的权限。'
				},
				contact: {
					title: '允许读取/写入通讯录',
					status: '',
					ios: 'contact',
					android: ['android.permission.READ_CONTACTS', 'android.permission.WRITE_CONTACTS'],
					desc: '允许读取/写入通讯录。'
				},
			}
		}
	},
	methods: {
		gotoPermission() {
			permission.gotoAppSetting()
		},
	},
	onLoad() {
		let _that = this;
		// #ifdef APP-PLUS
		for (const argumentsKey in this.auth) {
			if (permission.isIOS) {
				permission.requestIOS(_that.auth[argumentsKey].ios).then(res => {
					if (res !== 1 || res !== 4) {
						_that.auth[argumentsKey].status = '未授权'
					} else {
						_that.auth[argumentsKey].status = '已授权'
					}
				})
			} else {
				permission.requestAndroid(..._that.auth[argumentsKey].android).then(res => {
					if (res !== 1) {
						_that.auth[argumentsKey].status = '未授权'
					} else {
						_that.auth[argumentsKey].status = '已授权'
					}
				})
			}
		}
		// #endif
	}
}
</script>

<style scoped>

</style>
