App({
  todos: [
    { text: 'Learning Javascript', completed: true },
    { text: 'Learning ES2016', completed: true },
    { text: 'Learning 支付宝小程序', completed: false },
  ],

  userInfo: null,

  getUserInfo() {
    return new Promise((resolve, reject) => {
      let token = my.getStorageSync({key:'token'})
      if (token) {
        resolve(token)
        return
      };
      my.getAuthCode({
        scopes: ['auth_user'],
        success: authcode => {
          my.httpRequest({
            url: `http://192.168.0.193:8083/dingtalk/v1/baseInfo/login?code=${authcode.authCode}`,
            method: 'GET',
            dataType: 'json',
            success: function(res) {
              console.log(res)
              my.setStorageSync({
                key: 'token',
                data: res.data.data.token
              })
            }
          });
        },
        fail: () => {
          reject({});
        },
      });
    });
  },
});
