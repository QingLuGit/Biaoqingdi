// pages/camera/camera.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emotion: '',
    ctx: {},
    tempImagePath: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.emotion);
    this.setData({
      emotion: options.emotion,
      ctx: wx.createCameraContext()
    })
  },

  camera: function () {
    wx.navigateTo({
      url: '../result/result?data=10086'
    })
  },

  bindTakePhoto: function () {
    console.log("开始拍照");
    self = this;
    this.data.ctx.takePhoto({
      quality: "normal",
      success: (res) => {
        console.log("拍照成功");
        console.log(res);
        self.setData({
          tempImagePath: res.tempImagePath
        });
        wx.navigateTo({
          url: '../result/result?path=' + res.tempImagePath + '&emotion=' + self.data.emotion
        })
      },
      fail: (e) => {
        console.log(e);
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})