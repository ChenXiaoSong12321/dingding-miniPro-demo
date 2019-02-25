import {
  config,
  configUrl
} from './config'
const isGif = path => path.toUpperCase().indexOf('.GIF') > -1

export default {
  common:{
    apiView(data) {
      let parma = ''
      if (!isGif(data.path)) {
        parma = `?x-oss-process=image/format,jpg/quality,q_70/resize,w_${data.width || config.image.width || ''}`
      }
      return `${config.url.oss}/${data.path || ''}${parma}`
    },
    apiGetConfig: {
      url: '/v1/comm/acm/getConfig',
      method: 'POST',
      baseUrl: configUrl,
      isConfig: true,
      headers: {
        'content-type': 'application/json'
      }
    }
  }
}