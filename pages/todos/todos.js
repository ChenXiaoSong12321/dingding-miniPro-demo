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
    urgentLevel:"1",//0 1
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
    my.chooseImage({
      count: 9,
      success: (res) => {
        console.log(res,res.filePaths[0],'选择图片')
        my.uploadFile({
          url: '192.168.0.193:8083/dingtalk/v1/baseInfo/upload',
          fileType: 'image',
          fileName: 'file',
          filePath: res.filePaths[0],
          success: res => {
            my.alert({
              content: '上传成功'
            });
          },
          fail:res=>{
            console.log(res,'fail')
          }
        });
      },
    })
  },
  async submit(){
    let token = await app.getToken()
    if(!token)return
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
