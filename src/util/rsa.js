import JSEncrypt from "jsencrypt"
import localStorage from './storage'


export async function rsa (options) {
  const encrypt = new JSEncrypt();// 实例化加密对象

  if (localStorage.getPublicKey()){

    encrypt.setPublicKey(localStorage.getPublicKey()); // 设置公钥
    const encryptData = encrypt.encrypt(options) // 加密明文
    console.log(encryptData)
    return encryptData
  }

}