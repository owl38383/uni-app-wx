// import localStorage from '@/common/js/local_storage.js'
// const http = uni.$u.http

// const install = (Vue, vm) => {
//   let host = localStorage.getStore('host');
//   let baseUrlConfig = {
//     zeus: 'https://admin.ansource.cn',
//     ws: host ? host.replace('http', 'ws') : null,
//     upload: host + '/upload/xfezt/image',
//     img: 'http://admin.ansource.cn/xc_static/icon/xcapp',
//   };

//   /**
//    * { custom: { paramType: false }
//    * paramType:undefined  当前选中company
//    * paramType:1          用户company
//    * paramType:2          请求本身携参
//    */
//   const api = {
//     // 登录前
//     nologin_info: (params = {}) => http.get(uni.$u.baseUrlConfig.zeus + '/zeus/serviceinfo/nologin_info/', { params: params, custom: { paramType: 2 } }),
//     //版本检测
//     check_update: params => request.http.get(uni.$u.baseUrlConfig.zeus + '/zeus/version/check_update/', { params: params, custom: { paramType: 2 } }),
//     //更新日志
//     update_log: params => request.http.get(uni.$u.baseUrlConfig.zeus + '/zeus/version/update_log/', { params: params, custom: { paramType: 2 } }),
//     // 登录
//     login: (params = {}) => http.post('/fe/api_proxy/user/login/', params, { custom: { paramType: 2 } }),
//     autoLogin: (params = {}) => http.post('/api/api_proxy/user/autoLogin/', params, { custom: { paramType: 2 } }),

//     // 登出
//     loginout: (params = {}) => http.get('/api/api_proxy/user/loginout/', { params: params, custom: { paramType: 2 } }),
//     // 修改密码
//     updatePwd: (params = {}) => http.post('/api/api_proxy/user/update_pwd/', params),
//     // 验证账户
//     checkAccount: (params = {}) => http.get('/api/api_proxy/user/check_account/', { params: params }),
//     // 忘记密码
//     forgetPwd: (params = {}) => http.post('/api/api_proxy/user/forget_pwd/', params),
//     smsSend: (params = {}) => http.get('/send/sms_send', { params: params }),
//     verifySms: (params = {}) => http.get('/send/verify_sms', { params: params }),
//     //登录日志
//     last_login_log: (params = {}) => http.get('/api/api_proxy/logger/last_login_log/', { params: params }),

//     // 用户注册
//     getUserInfoPut: (params = {}) => http.put('/api/api_proxy/user/info/', params, { custom: { paramType: 2 } }),
//     getUserInfo: params => request.http.get('/api/api_proxy/user/info/', { params: params }),
//     /******设备相关***************/
//     // 物联网设备详情
//     getDeviceInfoApi: params => request.http.get('/api/api_proxy/device/info/', { params: params }),
//     putDeviceInfoApi: params => request.http.put('/api/api_proxy/device/info/', params),
//     delDeviceInfoApi: params => request.http.delete('/api/api_proxy/device/info/', params),
//     // 摄像头详情
//     device_video_by_monitor: params => request.http.get('/api/api_proxy/device/device_video_by_monitor/', { params: params }),
//     /** 单位相关*/
//     // 根据单位 id和type 查所有子单位信息
//     getCompanyListApi: params => request.http.get('/api/api_proxy/company/company_list_by_company_id/', { params: params, custom: { paramType: 1 } }),
//     // 单位详情
//     getUnitInfoApi: params => request.http.get('/fe/api_proxy/company_cared/info/', { params: params }),
//     /** 建筑相关*/
//     getBuildingListPageApi: params => request.http.get('/api/api_proxy/building/format_list_by_company_id/', { params: params }),
//     // 建筑详情
//     getBuildingInfoApi: params => request.http.get('/fe/api_proxy/building/info/', { params: params }),
//     //楼层列表
//     floor_list: params => request.http.get('/api/api_proxy/floor/floor_list/', { params: params }),
//     getDeviceInfoListByArea: params => request.http.get('/api/api_proxy/device/getDeviceListByArea/', { params: params }),
//     /*****通知公告*******/
//     //单位
//     getCompanyList: params => request.http.get("/api/screen_proxy/company/getCompanyList/", { params: params }),
//     //建筑
//     // getBuildingList: params => request.http.get("/api/screen_proxy/building/getBuildingList/", { params: params }),
//     //enum
//     enumList: (one_enum) => http.get('/api/api_proxy/enum/list/' + one_enum + '/'),
//     //公共查询条件
//     get_headers: params => request.http.get('/app/api/get_headers/', { params: params }),
//     // 报警列表
//     list_events_v2: (params,fn=function (){}) => http.get('/api/api_proxy/event/list_events_v3/', { params: params, getTask:(task)=>{fn(task)}}),
//     enum_confirm_type_list: params => request.http.get('/api/api_proxy/event/enum_confirm_type_list/', { params: params }),
//     event_info_put: params => request.http.put('/api/api_proxy/event/info/', params),
//     //首页统计
//     count_by_cared_v2: params => request.http.get('/api/api_proxy/statistic/count_by_cared/', { params: params }),
//     device_count_by_mulit_params: params => request.http.get('/api/api_proxy/device/device_count_by_mulit_params/', { params: params }),
//     // 告警事件详情
//     eventInfo: params => request.http.get('/fe/api_proxy/event/info/', { params: params }),
//     // 视频联动
//     getTopVideoListByDeviceId: params => request.http.get('/api/screen_proxy/video/getTopVideoListByDeviceId/', { params: params }),
//     //位置级联
//     getFilterLinkageV2: params => request.http.get('/api/screen_proxy/other/getFilterLinkageV2/', { params: params }),
//     //视频监控
//     device_video_by_monitor_list: params => request.http.get('/api/api_proxy/device/device_video_by_monitor_list/', { params: params }),
//     //设备列表
//     device_list_by_any_ids: params => request.http.get('/api/api_proxy/device/device_list_by_any_ids/', { params: params }),
//     ////维保
//     statistic_of_status: params => request.http.get('/fe/api_proxy/maint/task/statistic_of_status/', { params: params, custom: { paramType: 1 } }),
//     // 保养任务
//     list_by_company_maint: params => request.http.get('/fe/api_proxy/maint/task/task_list_app/', { params: params, custom: { paramType: 1 } }),
//     // 保养任务详情
//     maint_info: params => request.http.get('/fe/api_proxy/maint/task/maint_info/', { params: params, custom: { paramType: 1 } }),
//     maint_info_put: params => request.http.put('/fe/api_proxy/maint/task/maint_info/', params),
//     //接收维保任务
//     acceptTask: params => request.http.get('/fe/api_proxy/maint/task/acceptTask/', { params: params, custom: { paramType: 1 } }),
//     //添加设施检查项
//     equip_confirm_list: params => request.http.get('/fe/api_proxy/maint/equip/task_related/equip_confirm/list/', { params: params, custom: { paramType: 1 } }),
//     equip_confirm_info_delete: params => request.http.delete('/fe/api_proxy/maint/equip/task_related/equip_confirm/info/', params),
//     equip_confirm_info_put: params => request.http.put('/fe/api_proxy/maint/equip/task_related/equip_confirm/info/', params),
//     //维修
//     bond_list_by_account: params => request.http.get('/api/api_proxy/company_cared/bond_list_by_account/', { params: params, custom: { paramType: 1 } }),
//     enum_task_level: params => request.http.get('/api/api_proxy/maint/enum/list/enum_task_level/', { params: params, custom: { paramType: 1 } }),
//     list_by_company_id: params => request.http.get('/api/api_proxy/user/list_by_company_id/', { params: params, custom: { paramType: 1 } }),
//     repair_info: params => request.http.post('/api/api_proxy/maint/task/repair_info/', params),
//     repair_info_get: params => request.http.get('/api/api_proxy/maint/task/repair_info/', { params: params, custom: { paramType: 1 } }),
//     repair_info_put: params => request.http.put('/api/api_proxy/maint/task/repair_info/', params),
//     //巡查
//     task_list_by_company: params => request.http.get('/api/api_proxy/patrol/task/task_list_by_company/', { params: params, custom: { paramType: 1 } }),
//     patrol_task_info: params => request.http.get('/api/api_proxy/patrol/task/info/', { params: params, custom: { paramType: 1 } }),
//     patrol_task_receive: params => request.http.get('/api/api_proxy/patrol/task/receive/', { params: params, custom: { paramType: 1 } }),
//     patrol_site_info: params => request.http.get('/api/api_proxy/patrol/site/task_site_info/', { params: params, custom: { paramType: 1 } }),
//     patrol_record_info: params => request.http.post('/api/api_proxy/patrol/record/info/', params),
//     task_count_of_status: params => request.http.get('/api/api_proxy/patrol/task/task_count_of_status/', { params: params, custom: { paramType: 1 } }),
//     list_by_site_id: params => request.http.get('/api/api_proxy/patrol/task/list_by_site_id/', { params: params, custom: { paramType: 1 } }),
//     //报告
//     list_by_company_maint_report: params => request.http.get('/api/api_proxy/maint/report/list_by_company_maint/', { params: params, custom: { paramType: 2 } }),
//     file_info: params => request.http.get('/file/info', { params: params, custom: { paramType: 2 } }),

//     ////维保
//     //反馈
//     feed_back: params => request.http.post('/app/extends/feed_back/', params),

//     //系统
//     compos_list: params => request.http.get('/api/api_proxy/system/compos_list/', { params: params }),
//     //火警故障趋势
//     event_daliy_count_for_index: params => request.http.get('/api/api_proxy/event/event_daliy_count_for_index/', { params: params }),

//     ////应用
//     all_app_application: params => request.http.get('/app/market/all_app_application/', { params: params, custom: { paramType: 2 } }),
//     my_home_page_app_application: params => request.http.get('/app/market/my_home_page_app_application/', { params: params, custom: { paramType: 2 } }),
//     add_application_to_home_page: params => request.http.post('/app/market/add_application_to_home_page/', params),

//     ////新接口
//     getFilterLinkage: params => request.http.get('/api/api_proxy/other/getFilterLinkage/', { params: params, custom: { paramType: 1 } }),
//     getBuildingList: params => request.http.get('/api/api_proxy/building/getBuildingList/', { params: params, custom: { paramType: 2 } }),
//     getFloorListByBuilding: params => request.http.get('/api/api_proxy/floor/simple_floor_list_v2/', { params: params, custom: { paramType: 2 } }),
//     getAreaListByFloor: params => request.http.get('/api/api_proxy/floor/simple_area_list_by_floor/', { params: params, custom: { paramType: 2 } }),
//     getDeviceTypeCountByAreaId: params => request.http.get('/api/api_proxy/device/getDeviceTypeByAreaId/', { params: params, custom: { paramType: 2 } }),

//     //扫码登录
//     scan_code: params => request.http.post('/api/screen_proxy/user/scan_code/', params, { custom: { paramType: 2 } }),
// 		//kv存储
// 		kv_api_add: params => request.http.post('/kv_api/', params, { custom: { paramType: 2 } }),
// 		kv_api_info: params => request.http.get('/kv_api/', { params: params, custom: { paramType: 2 } }),

//     // 场景列表
//     scene_list: params => request.http.get('/api/api_proxy/scene/list/', { params }),
//     // 场景详情
//     scene_info: params => request.http.get('/api/api_proxy/scene/info/', { params }),
//     // 场景关联设备和设施
//     scene_device_equipment: params => request.http.get('/api/api_proxy/scene/scene_device_equipment/', { params }),
//     // 获取模拟量
//     value_list_by_device_id: params => request.http.get('/api/api_proxy/analog/value_list_by_device_id/', { params }),
// 		// 应用详情
//     app_info: params => request.http.get('/app/market/app_info/', { params }),
//     mix_list_by_uid: params => request.http.get('/api/api_proxy/user/mix_list_by_uid/', { params }),
// 		digital_plan_list: params => request.http.get('/api/api_proxy/digital_plan/list/', { params }),
// 		digital_plan_info: params => request.http.get('/api/api_proxy/digital_plan/info/', { params }),
// 		put_digital_plan_info: params => request.http.put('/api/api_proxy/digital_plan/info/', params),
// 		post_digital_plan_info: params => request.http.post('/api/api_proxy/digital_plan/info/', params),
// 		del_digital_plan_info: params => request.http.delete('/api/api_proxy/digital_plan/info/', params),
// 		company_cared_list_by_authority: params => request.http.get('/api/api_proxy/company_cared/list_by_authority_id/', { params }),
// 		hazard_list_by_creater_id: params => request.http.get('/api/api_proxy/patrol/hazard/list_by_creater_id_hazard/', { params }),
// 		custom_type_list: params => request.http.get('/api/api_proxy/patrol/custom/list_by_company_custom/', { params }),
// 		by_hazard_detail: params => request.http.get('/api/api_proxy/patrol/hazard/by_hazard_detail/', { params }),
// 		hazard_list: params => request.http.get('/api/api_proxy/patrol/hazard/list_by_user_id_hazard/', { params }),
// 		item_info_by_mode: params => request.http.get('/api/api_proxy/patrol/item/info_by_mode/', { params }),
// 		patrol_detail_info: params => request.http.get('/api/api_proxy/patrol/details/info/', { params }),
// 		notification_sender_list: params => request.http.get('/api/api_proxy/notification/sender_list/', { params }),
// 		site_list_by_company_cared_app: params => request.http.get('/api/api_proxy/patrol/site/list_by_company_cared_app/', { params }),
// 		notification_receiver_list: params => request.http.get('/api/api_proxy/notification/receiver_list/', { params }),
// 		get_notification_info: params => request.http.get('/api/api_proxy/notification/info/', { params }),
// 		put_notification_info: params => request.http.put('/api/api_proxy/notification/info/', params),
// 		post_notification_info: params => request.http.post('/api/api_proxy/notification/info/', params),
// 		report_list_by_company_id: params => request.http.get('/api/api_proxy/patrol/report/list_by_company_ids/', { params }),
// 		system_list: params => request.http.get('/api/api_proxy/system/list', { params }),
// 		get_system_info: params => request.http.get('/api/api_proxy/system/info/', { params }),
// 		app_device_list: params => request.http.get('/app/api/device_list', { params }),
// 		post_app_device_info: params => request.http.post('/app/api/device_info/', params),
// 		get_equipment_info: params => request.http.get('/api/api_proxy/equipment/info/', { params }),
// 		put_equipment_info: params => request.http.put('/api/api_proxy/equipment/info/', params),
// 		equipment_list: params => request.http.get('/api/api_proxy/equipment/list/', { params }),
// 		risk_count: params => request.http.get('/api/api_proxy/risk_accessment/get_risk_count/', { params }),
// 		risk_list: params => request.http.get('/api/api_proxy/risk_accessment/get_list/', { params }),
// 		building_list: params => request.http.get('/api/api_proxy/building/list_by_company_id/', { params }),
// 		building_info: params => request.http.get('/api/api_proxy/building/info/', { params }),
// 		device_type_list: params => request.http.get('/app/api/device_type_list/', { params }),
// 		company_cared_info: params => request.http.get('/api/api_proxy/company_cared/info/', { params }),
// 		market_center: params => request.http.get('/app/market/center/', { params }),
// 		my_app: params => request.http.get('/app/market/mine/', { params }),
// 		add_my_app: params => request.http.post('/app/market/add_my_app/', params),
// 		update_my_app: params => request.http.put('/app/market/update_my_app/', params),
// 		authority_check: params => request.http.get('/app/api/authority_check/', { params }),
// 		dispost_by_confirm_hazard: params => request.http.post('/api/api_proxy/patrol/hazard/dispost_by_comfirm_hazard/', params),
// 		post_hazard_info: params => request.http.post('/api/api_proxy/patrol/hazard/info/', params),
// 		post_record_info: params => request.http.post('/api/api_proxy/patrol/record/info/', params),
// 		upload_image: params => request.http.upload('/upload/xfezt/image', params),
// 		upload_file: params => request.http.upload('/upload/xfezt/file', params),
//   }

//   uni.$u.api = api;
//   uni.$u.baseUrlConfig = baseUrlConfig;
//   uni.$u.host = host;

//   uni.$u.commonParams = () => {
//     let params = uni.$u.queryParams({
//       fb_name: encodeURI(localStorage.getStore('userInfo').company_type),
//       company_type: localStorage.getStore('userInfo').company_type,
//       token: localStorage.getStore('userInfo').token,
//       user_type_id: localStorage.getStore('userInfo').enum_user_type.id,
//       user_name: encodeURI(localStorage.getStore('userInfo').name),
//       uid: localStorage.getStore('userInfo').user_id,
//       fb_id: localStorage.getStore('userInfo').company_id,
//       sign: '0'
//     })
//     return params.replace('?', '');
//   }

//   uni.$u.updateHost = host => {
//     host = host
//     baseUrlConfig = {
// 			zeus: 'https://admin.ansource.cn',
//       ws: host ? host.replace('http', 'ws') : null,
//       upload: host + '/upload/xfezt/image',
//       img: 'http://admin.ansource.cn/xc_static/icon/xcapp',
//     }
//     uni.$u.api = api;
//     uni.$u.baseUrlConfig = baseUrlConfig;
//     uni.$u.host = host;
//     uni.$u.http.setConfig((config) => {
//       config.baseURL = host;
//       return config
//     })
//   }
// }

// export default {
//   install
// }
