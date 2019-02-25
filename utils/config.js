const qa = false

const mock = false

const debug = false

const configUrls = {
  prod: 'https://server-service.hupovip.cn/hpserver',
  dev: 'https://hp-server.hupovip.cn/hpserver'
  // dev: 'http://hp-server.hupovip.cn/hpserver' //todo
  // dev: '192.168.0.166:8085/hpserver'
}

const configUrl = debug ? configUrls.dev : configUrls.prod

const options = {
  base: {
    qa: {
      group: 'DEFAULT_GROUP',
      dataId: 'cn.hupovip.mall.m:mini-program:url-qa.json',
      tenant: '652e4167-67b2-4d57-ae69-63732ca25f21'
    },
    dev: {
      group: 'DEFAULT_GROUP',
      dataId: 'cn.hupovip.mall.m:mini-program:url.json',
      tenant: '652e4167-67b2-4d57-ae69-63732ca25f21'
    },
    prod: {
      group: 'DEFAULT_GROUP',
      dataId: 'cn.hupovip.mall.m:mini-program:url.json',
      tenant: '55fec97e-c48b-4330-9915-c40d83bdc4f5'
      // tenant: '652e4167-67b2-4d57-ae69-63732ca25f21' // todo 预发布修改为测试版的
    }
  }
}

const option = debug ? qa ? options.base.qa : options.base.dev : options.base.prod

export {
  debug,
  configUrl,
  option
}