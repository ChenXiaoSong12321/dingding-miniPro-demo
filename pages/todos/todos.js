const app = getApp();

Page({
  data: {
    // 工单名称
    title:'',
    // 工具编号
    orderNo:'',
    // 产品名称
    productName:'',
    // 紧急程度
    urgentLevel:0,//0 1
    // 紧急原因
    urgentMsg:'',
    // 问题描述
    content:'',
    // 问题描述
    contentImgs:['asfd','asdff'],
  },
  onLoad() {
    app.getToken()
  },
  uploadImage(){
    dd.chooseImage({
      count: 9,
      success: res => {
        const path = (res.filePaths && res.filePaths) || (res.apFilePaths && res.apFilePaths);
        let uploadPaths = []
        for(let i = 0,len=path.length;i<len;i++){
          dd.uploadFile({
            url: 'http://192.168.0.193:8083/dingtalk/v1/baseInfo/upload',
            fileType: 'image',
            fileName: 'file',
            filePath: path[i],
            success: res => {
              console.log(res)
              if(res.statusCode===200){
                let data = JSON.parse(res.data)
                uploadPaths.push(...data.data)
              }else{
                dd.alert({ title: `上传失败，请重新上传或联系管理员` })
              }
              if(i===len-1){
                console.log(uploadPaths)
              }
            },
            fail: res=> {
              dd.alert({ title: `上传失败：${JSON.stringify(res)}` });
            }
          })

        }
      }
    })
  },
  async submit(){
    let token = await app.getToken()
    if(!token)return
    if(this.data.title===''){
      dd.alert({ title: `工单名称必须要填` })
      return
    }
    if(this.data.content===''){
      dd.alert({ title: `问题描述必须要填` })
      return
    }
    my.httpRequest({
      url: `192.168.0.193:8083/dingtalk/v1/workOrder?token=${token.data}`,
      method: 'POST',
      data:{
        title:this.data.title,
        orderNo:this.data.orderNo,
        productName:this.data.productName,
        urgentLevel:this.data.urgentLevel,
        urgentMsg:this.data.urgentMsg,
        content:this.data.content,
        contentImgs:JSON.stringify(this.data.contentImgs),
      },
      dataType: 'json',
      success: res=> {
        my.alert({
          content: '提交成功'
        });
      }
    });
  },
  inputChanged(e){  
    this.setData({ [e.currentTarget.dataset.name]:e.detail.value});
  },
  radioChange(e) {
    this.setData({ urgentLevel:e.detail.value});
  }
});
