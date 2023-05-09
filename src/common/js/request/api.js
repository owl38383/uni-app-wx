import * as request from "@/common/js/request/request";

import './addInterceptor.js'

/**
 * paramType:undefined  当前选中company
 * paramType:1          用户company
 * paramType:2          请求本身携参
 */
const ParamTypeOne = {paramType: 1}
const ParamTypeTwo = {paramType: 2}


export const no_login_info = params => request.get('/zeus/serviceinfo/nologin_info/', params);
export const login = params => request.post('/api/api_proxy/user/login/', params);
export const checkAccount = params => request.get('/api/api_proxy/user/check_account/', params);
export const logout = params => request.get('/api/api_proxy/user/loginout/', params);
export const get_company_list = params => request.get('/api/api_proxy/company/company_list_by_company_id/', params, {}, ParamTypeOne);
export const get_filter_linkage = params => request.get('/api/api_proxy/other/getFilterLinkage/', params, {}, ParamTypeOne);
export const device_list_by_any_ids = params => request.get('/api/api_proxy/device/device_list_by_any_ids/', params);
export const get_count_by_cared_v2 = params => request.get('/api/api_proxy/statistic/count_by_cared/', params);
export const get_my_app = params => request.get('/app/market/mine/', params);
export const get_my_home_page_app_application = params => request.get('/app/market/my_home_page_app_application/', params);
export const kv_api_add = params => request.post('/kv_api/', params);
export const get_kv_api_info = params => request.get('/kv_api/', params);
export const get_headers = params => request.get('/app/api/get_headers/', params)
export const get_device_list_by_any_ids = params => request.get('/api/api_proxy/device/device_list_by_any_ids/', params)
export const get_device_info = async params => request.get('/api/api_proxy/device/info/', params)
export const enumList = params => request.get('/api/api_proxy/enum/list/' + params + '/')
export const list_events_v2 = async params => request.get('/api/api_proxy/event/list_events_v3/', params)
export const get_building_list = params => request.get('/api/api_proxy/building/format_list_by_company_id/', params)
export const get_company_cared = params => request.get('/api/api_proxy/company_cared/info/', params)
export const get_system_list = params => request.get('/api/api_proxy/system/system_list/', params)
export const get_compos_list = params => request.get('/api/api_proxy/system/compos_list/', params)
