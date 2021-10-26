//src/utils/request文件中

import axios from 'axios'

let baseURL = ''

const service = axios.create({
    baseURL: baseURL,
    timeout: 0
})

service.interceptors.request.use(config => {
    let token = this.$ls.get("token")
    if (!token) {
        this.$router.push()
    } else {
        config.header["X-Access-Token"] = token
        return config
    }
}, err => {
    return Promise.reject(err)
})

service.interceptors.response.use(response => {
    return response.data
})
export {
    service as axios
}

//src/api/manager
import axios from './request'

export function getAction(url, parameter) {
    return axios({
        method: 'get',
        url,
        data: parameter
    })
}


export function downFile(url, parameter) {
    return axios({
        url: url,
        params: parameter,
        method: 'get',
        responseType: 'blob',
        timeout: 1000 * 60 * 2,
        headers: {
            'Content-Type': 'multipart/form-data',  // 文件上传
        },
    })
}

