const crypto_js=require('crypto-js');

const CryptoJSAES = crypto_js.AES;
const encutf8=crypto_js.enc.Utf8;

const miyao = 'sndfkei83534jhf34994';

/* 储存localStorage */
const  setStore = (name, value) => {
  if (!name) {
    return false;
  }
  if (typeof value !== 'string') {
		value = JSON.stringify(value);
  }
	try {
		//加密
		let string_value = CryptoJSAES.encrypt(value, miyao);
		uni.setStorageSync(`${uni.$x.zeusConfig.getChannel()}_${name}`,string_value.toString());
		// uni.setStorageSync(name, value);
	} catch (error) {
	  console.log(error);
	}
}

/* 获取指定的localstorage */
const getStore = (name) => {
  if (!name) return false;
  try {
		let value = uni.getStorageSync(`${uni.$x.zeusConfig.getChannel()}_${name}`);
    if (value && value.length > 1) {
      let return_string = CryptoJSAES.decrypt(value, miyao);
      return_string=return_string.toString(encutf8);
      try {
        return JSON.parse(return_string);
      } catch (error) {
        return return_string;
      }
    }
		// return JSON.parse(value);
  } catch (error) {
    console.log(error);
  }

  return false;

}

/* 删除指定的localStorage */
const removeStore = (name) => {
	try {
		let value = uni.getStorageSync(name);
		if (!name || !value) return false;
		uni.removeStorageSync(name);
	} catch (error) {
	  console.log(error);
	}
}

export default {
    setStore,
    getStore,
    removeStore
}
