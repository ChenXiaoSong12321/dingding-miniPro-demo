import config from './config'

const request = async(opts, data) => {
  let requestUrl = config.url + config.urlPre
  if (opts.query) {
    requestUrl = requestUrl + '?'
    Object.keys(opts.query).forEach((item, index) => {
      requestUrl = requestUrl + item + '=' + opts.query[item]
      if (index !== opts.query.length - 1) {
        requestUrl = requestUrl + '&'
      }
    })
  }

  return new Promise((resolve, reject) => {
    my.httpRequest({
      url: requestUrl,
      method: opts.method || 'GET',
      dataType: opts.dataType || 'json',
      data,
      success: function(res) {
        if (res.code === 0) {
          resolve(res)
        } else {
          my.alert({
            content: JSON.stringify(res)
          })
        }
      },
      fail(res) {
        my.alert({
          content: '系统繁忙，请稍后再试'
        })
        reject(res)
      }
    })
  })
}

export {
  request
}
