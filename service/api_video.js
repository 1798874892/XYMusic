import xyRequest from "./index";

export function getTopMV(offset,  limit = 20)  {
  return xyRequest.get("/top/mv", {
    offset,
    limit
  })
}

/**
 * 请求MV的播放地址
 * @param {number} id MV的id
 */
export  function  getMVURL(id) {
    return  xyRequest.get("/mv/url",  {
      id
    })
}

/**
 * 请求MV的详情
 * @param {number} mvid MV的id
 */
export  function  getMVDetail(mvid) {
    return  xyRequest.get("/mv/detail",  {
      mvid
    })
}

/**
 * 请求MV的相关视频
 * @param {number} mvid MV的id
 */
export  function  getRelatedVideo(id) {
  return  xyRequest.get("/related/allvideo",  {
    id
  })
}