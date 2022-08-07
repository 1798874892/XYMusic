// pages/home-music/index.js
import {  rankingStore, rankingMap  } from  '../../store/index'

import  { getBanners, getSongMenu  } from '../../service/api_music'
import  queryRect from  '../../utils/query-rect'
import  throttle from  '../../utils/throttle'

const throttleQueryRect = throttle(queryRect)

Page({

  /**
   * 页面的初始数据
   */
  data: {
      swiperHeight: 0,
      banners:  [],
      hotSongMenu:  [],
      recommendSongMenu:  [],
      recommendSongs: [],
      // key顺序不固定
      // rankings: [],
      // key顺序固定
      rankings: { 0:  {}, 2:  {}, 3:  {}}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 获取页面数据
      this.getPageData()
      // this.getRankingData()

      //  发起共享数据请求
      rankingStore.dispatch("getRankingDataAction")

      //  从Store获取共享数据
      rankingStore.onState("hotRanking",  res =>  {
          if  (!res.tracks) return
          const recommendSongs = res.tracks.slice(0,7)
          this.setData({  recommendSongs  })
      })
      rankingStore.onState("newRanking",  this.getRankingHandler(0))
      rankingStore.onState("originRanking",  this.getRankingHandler(2))
      rankingStore.onState("upRanking",  this.getRankingHandler(3))
  },

  // 网络请求
  getPageData:  function()  {
    getBanners().then(res =>{
      // setData是同步还是异步的
      // setData在设置data数据上是同步的
      // 通过最新的数据对wxml进行渲染，渲染的过程是异步
      this.setData({  banners:  res.banners})
      // console.log(this.data.banners);
      
      getSongMenu().then(res  =>  {
        this.setData({  hotSongMenu:  res.playlists})
      })

      getSongMenu("欧美").then(res  =>  {
        this.setData({  recommendSongMenu:  res.playlists})
      })
    })
  },

  // 事件处理
  handleSearchClick:  function()  {
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },

  handleSwiperImageLoaded:  function()  {
    //  获取图片的高度（如何获取一个组件的高度）
    throttleQueryRect(".swiper-image").then(res =>  {
      const  rect = res[0]
      this.setData({  swiperHeight: rect.height})
    })
  },

  handleMoreClick:  function()  {
    this.navigateToDetailSongsPage("hotRanking")
  },

  handleRankingItemClick: function(event)  {
    const idx = event.currentTarget.dataset.idx 
    const rankingName = rankingMap[idx]
    this.navigateToDetailSongsPage(rankingName)
  },

  navigateToDetailSongsPage: function(rankingName)  {
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranking=${rankingName}&type=rank`,
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  getRankingHandler: function(idx)  {
    return  (res) =>  {
        if(Object.keys(res).length  === 0)  return
        const name  = res.name
        const coverImgUrl = res.coverImgUrl
        const playCount = res.playCount
        const songList  = res.tracks.slice(0, 3)
        const rankingObj  = { name, coverImgUrl,  playCount,  songList  }
        // 每次编译渲染的是随机顺序
        // const orginRankings = [...this.data.rankings]
        // orginRankings.push(rankingObj)
        // this.setData({  rankings: orginRankings })

        // 按照既定顺序显示
        const newRankings = {...this.data.rankings, [idx]: rankingObj}
        this.setData({  rankings: newRankings })
      }
    }

  // getUpRankingHandler: function(res)  {
  //   if(Object.keys(res).length  === 0)  return
  //     const name  = res.name
  //     const coverImgUrl = res.coverImgUrl
  //     const songList  = res.tracks.slice(0, 3)
  //     const rankingObj  = { name, coverImgUrl,  songList  }
  //     const orginRankings = [...this.data.rankings]
  //     orginRankings.push(rankingObj)
  //     this.setData({  rankings: orginRankings })
  // }
})