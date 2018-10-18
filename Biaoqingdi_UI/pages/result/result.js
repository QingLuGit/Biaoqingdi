// pages/result/result.js

const urlstr = 'http://biaoqingdiapi20181016042119.azurewebsites.net/';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emotion: '',
    result: '',
    hasResult: false,
    tempImagePath: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */

  /*onLoad: function (options) {
    this.setData({
      emotion: '开心',
      result: 'test',
      hasResult: true,
      tempImagePath: options.path
    })
  },*/

  onLoad: function (options) {
    self = this;
    self.setData({
      emotion: options.emotion,
      result: 'Waiting...',
      tempImagePath: options.path
    })
    wx.uploadFile({
      url: urlstr + '/api/scoring',
      filePath: options.path,
      name: 'file',
      formData: {
        emotion: options.emotion
      },
      success: function (res) {
        self.setData({
          result: JSON.parse(res.data),
          hasResult: true
        })
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