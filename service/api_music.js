import  xyRequest from './index'

// 获取轮播图
export  function  getBanners() {
  return  xyRequest.get("/banner",  {
    type: 2
  })
}

//  获取所有榜单
export  function  getRankings() {
  // return  xyRequest.get("/toplist")
  return  xyRequest.get("/toplist/detail",  {
    
  })
}

/**
 * 获取榜单 0 飙升 1 热门 2 新歌 3 原创
 * @param {} id 
 */
export  function  getRankingsDetail(id) {
    return  xyRequest.get("/playlist/detail",  {
      id
    })
}

//  cat =>  category  类别
export  function  getSongMenu(cat = "全部", limit = 6,  offset  = 0) {
  return  xyRequest.get("/top/playlist",  {
    cat,
    limit,
    offset
  })
}

export  function  getSongMenuDetail(id) {
  return  xyRequest.get("/playlist/detail/dynamic", {
    id
  })
}