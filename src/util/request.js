//使用axios进行异步请求
import axios from 'axios'
import Qs from 'qs'

axios.defaults.withCredentials = true;//设置发送cookie，解决跨域session
export default function request (options) {
  options.method = options.method || 'get'
  switch (options.method) {
    case 'get':
      return axios(options.url,{
        params: options.data
      }).then((response) => {
        // console.log(response.data)
        return response.data
      }).catch( (err) =>{
        console.log(err)
      })
    case 'post':
      console.log(Qs.stringify(options.data))
      return axios.post(options.url,
        Qs.stringify(options.data),
        {headers:{'Content-Type':'application/x-www-form-urlencoded'}}
      ).then((response) => {
        console.log("axios请求结果："+JSON.stringify(response.data))
        return response.data
      }).catch((err) => {
        console.log(err)
      })
    default :
      break
  }
}
