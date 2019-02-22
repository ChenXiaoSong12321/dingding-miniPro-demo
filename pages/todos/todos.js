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
    contentImgs:'',
  },

  onLoad() {
    app.getUserInfo().then(
      user => {
        console.log(user,'用户信息')
        this.setData({
          user,
        });
      },
      () => {
        // 获取用户信息失败
      }
    );
  },

  onShow() {
  },
  uploadImage(){
    dd.chooseImage({
      count: 2,
      success: (res) => {
        console.log(res,'选择图片')
         dd.uploadFile({
          url: '',
          fileType: 'image',
          fileName: 'file',
          filePath: '...',
          success: (res) => {
            console.log(res,'上传图片')
            dd.alert({
              content: '上传成功'
            });
          },
        });
      },
    })
  },
  submit(){
    console.log('af',this.data)
  },
  inputChanged(e){  
    this.setData({ [e.currentTarget.dataset.name]:e.detail.value});
  },
  radioChange(e) {
    this.setData({ urgentLevel:e.detail.value});
  }
});
