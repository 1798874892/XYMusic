export  default function (selector) {
    return new  Promise((resolve) =>  {
      const query = wx.createSelectorQuery()
      query.select(selector).boundingClientRect()
      // query.exec((res) =>  {
      //     const rect =  res[0]
      //     this.setData({  swiperHeight: rect.height })
      // })
      // query.exec(resolve)
      query.exec((res)  =>  {
        resolve(res)
      })
    })
}