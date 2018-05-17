//全局接口集合，方便维护
import request from '../util/request';

const HOST = "http://192.168.31.98:3001"
//用户登陆ok
export async function doLogin(params) {
  // console.log(params)
  return request({
    url: HOST+'/login',
    method: 'post',
    data : params
  });
}
//获取rsa公钥
export async function getPublicRsa(params) {
  return request({
    url: HOST+'/getpublicKey',
    method: 'post',
    data : params
  });
}
//检查登陆状态
export async function checkLogin(params) {
  // console.log(params)
  return request({
    url: HOST+'/checkLogin',
    method: 'post',
    data : params
  });
}
//获取评论列表
export async function getDynamicList(params) {
  // console.log(params)
  return request({
    url: HOST+'/getDynamicList',
    method: 'post',
    data : params
  });
}
//发布动态
export async function sendDynamic(params) {
  // console.log(params)
  return request({
    url: HOST+'/sendDynamic',
    method: 'post',
    data : params
  });
}
//点赞
export async function isLiked(params) {
  // console.log(params)
  return request({
    url: HOST+'/isLiked',
    method: 'post',
    data : params
  });
}
//评论
export async function sendReview(params) {
  // console.log(params)
  return request({
    url: HOST+'/sendReview',
    method: 'post',
    data : params
  });
}
//获取音乐
export async function getMusic(params) {
  console.log(params)
  return request({
    url: HOST+'/serchfile',
    method: 'get',
    data : params
  });
}
//登出
export async function logout(params) {
  // console.log(params)
  return request({
    url: HOST+'/logout',
    method: 'post',
    data : params
  });
}
//获取我的主页信息
export async function getMyHome(params) {
  console.log(params)
  return request({
    url: HOST+'/getMyHome',
    method: 'post',
    data : params
  });
}
//获取别人对我的评论
export async function getReviewToMe(params) {
  console.log(params)
  return request({
    url: HOST+'/getReviewToMe',
    method: 'post',
    data : params
  });
}