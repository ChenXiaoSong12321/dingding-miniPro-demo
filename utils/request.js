export default {
  request(opts){
    let requestUrl = `http://192.168.0.193:8083/dingtalk/v1/baseInfo/login`

    if(opts.query){
      requestUrl = requestUrl + '?'
      Object.keys(opts.query).forEach((item,index)=>{
        requestUrl = requestUrl + item+'='+opts.query[item]
        if(index!==opts.query.length-1){
          requestUrl = requestUrl+ '&'
        }
      })
    }

    return new Promise((resolve,reject)=>{
      my.httpRequest({
        url: requestUrl,
        method:opts.method||'GET',
        dataType:opts.dataType|| 'json',
        success: function(res) {
          resolve(res)
        },
        fail(res){
          my.alert({
            content: '系统繁忙，请稍后再试'
          })
          reject(res)
        }
      })
    })
  }
}