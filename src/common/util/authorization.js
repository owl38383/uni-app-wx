import localStorage from '@/common/js/local_storage.js'

let auth = null
let authCompany = null
uni.$on('login', () => {
  auth = localStorage.getStore('auth')
  authCompany = localStorage.getStore('authCompany').data
})
let userInfo = localStorage.getStore('userInfo')
if (userInfo) {
  auth = localStorage.getStore('auth')
  authCompany = localStorage.getStore('authCompany').data
}

let getRole = () => {
  let role = localStorage.getStore('userInfo').enum_user_type.id;
  let roleType = null
  if (role == 1) {
    roleType = 'center'
  } else if (role == 2) {
    roleType = 'company'
  } else if (role == 4) {
    roleType = 'maint'
  } else if (role == 6) {
    roleType = 'director'
  }
  return roleType
}

let hasPermission = (role) => {
  return role.includes(getRole())
}

let testGetauth = null
let testGetAuth = (item, value) => {
  for (let i = 0; i < item.length; i++) {
    const element = item[i];
    if (element.id == value) {
      testGetauth = element
      break;
    } else {
      testGetAuth(element.children, value)
    }
  }
  return testGetauth
}

let testauth = null
let testAuth = (item, value) => {
  for (let i = 0; i < item.length; i++) {
    const element = item[i];
    if (element.id == value) {
      testauth = element
      break;
    } else {
      testAuth(element.children, value)
    }
  }
  return testauth != null && testauth.auth == '1' ? true : false
}

let testauthActive = null
let testAuthActive = (item, value) => {
  for (let i = 0; i < item.length; i++) {
    const element = item[i];
    if (element.id == value) {
      testauthActive = element
      break;
    } else {
      testAuthActive(element.children, value)
    }
  }
  return testauthActive != null && testauthActive.is_active == '1' ? true : false
}

//info_company_maint 维保
//info_company_cared 联网
//info_center 中心
//info_company_authority 主管
//auth:[]-不判断 [company,...]-判断所配单位
let testauthByCompany = null
let testAuthByCompany = (item, value, companyType) => {
  for (let i = 0; i < item.length; i++) {
    const element = item[i];
    if (element.id == value) {
      testauthByCompany = element
      break;
    } else {
      testAuthByCompany(element.children, value, companyType)
    }
  }
  if (testauthByCompany) {
    return testauthByCompany.auth.length == 0 || testauthByCompany.auth.some(e => {
      return e == (companyType == 'checkCompany' ? localStorage.getStore('company').checkCompany.type : localStorage.getStore('company').type)
    })
  } else {
    return true
  }
}

const install = (Vue, vm) => {
  uni.$u.checkRole = value => {
    if (hasPermission(value)) {
      return true;
    } else {
      return false
    }
  };

  uni.$u.getAuth = value => {
    testGetauth = null
    return testGetAuth(auth.children, value)
  };

  uni.$u.checkAuth = value => {
    testauth = null
    return testAuth(auth.children, value)
  };

  uni.$u.checkAuthActive = value => {
    testauthActive = null
    return testAuthActive(auth.children, value)
  };

  uni.$u.checkAuthByCompany = (value, companyType) => {
    testauthByCompany = null
    return testAuthByCompany(authCompany.children, value, companyType)
  };
}

export default {
  install
};
