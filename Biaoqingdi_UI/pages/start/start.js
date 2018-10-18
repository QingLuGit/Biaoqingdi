// pages/start/start.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    emotions: ['开心', '生气', '害怕', '悲伤', '惊喜', '厌恶', '蔑视', '面无表情'],
    emotionIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  
  bindChange: function () {
    this.setData({
      emotionIndex: (this.data.emotionIndex + 1) % 8
    })
  },

  bindTakePhoto: function () {
    wx.navigateTo({
      url: '../camera/camera?emotion=' + this.data.emotions[this.data.emotionIndex]
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