import { request } from './request'
import api from './api'

export default {
  async getToken() {
    return new Promise((resolve, reject) => {
      const token = my.getStorageSync({ key: 'token' })
      if (token && token.data) {
        resolve(token.data)
        return
      }
      my.getAuthCode({
        scopes: ['auth_user'],
        success: async authcode => {
          const res = await request({ ...api.common.login, code: authcode.authCode })
          my.setStorageSync({
            key: 'token',
            data: res.data.data.token
          })
        },
        fail: () => {
          reject({})
        }
      })
    })
  }
}
