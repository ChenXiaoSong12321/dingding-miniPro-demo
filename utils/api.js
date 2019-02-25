import config from './config'
const isGif = path => path.toUpperCase().indexOf('.GIF') > -1

export default {
  common: {
    apiView(data) {
      let parma = ''
      if (!isGif(data.path)) {
        parma = `?x-oss-process=image/format,jpg/quality,q_70/resize,w_${data.width || config.image.width || ''}`
      }
      return `${config.oss}/${data.path || ''}${parma}`
    },
    login: {
      url: 'baseInfo/login'
    },
    workOrder: {
      url: 'workOrder',
      method: 'POST'
    }
  }
}
