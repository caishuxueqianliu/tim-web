import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// create an axios instance
const service = axios.create({
 // baseURL: process.env.VUE_APP_BASE_API , // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 9000 // request timeout
})

// response interceptor
service.interceptors.response.use(
    async response => {
      return response.data.data
    },
    error => {
      return Promise.reject(error)
    }
)



export default service
