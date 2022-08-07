import  { HYEventStore  } from  'hy-event-store'

import  { getRankings } from '../service/api_music'

const rankingMap  = { 0:  "newRanking", 1:  "hotRanking", 2:  "originRanking",  3:  "upRanking"}

const rankingStore  = new HYEventStore({
    state:  {
      newRanking:  {},      //  0、新歌
      hotRanking:  {},       //  1、热歌
      originRanking:  {},   //  2、原创
      upRanking:  {}         //  3、飙升
    },
    actions:  {
      // ctx  ->context 上下文
      getRankingDataAction(ctx)  {
        // 0: 飙升榜  1：新歌榜 2：原创榜 3：热歌榜
        for(let i = 0;  i < 4;  i++)  {
          getRankings(i).then(res =>  {
            // console.log(res.list);
            const rankingName = rankingMap[i]
            ctx[rankingName]  = res.list
            // ctx[rankingName]  = res.list
            // switch(i) {
            //   case  0:
            //     ctx.newRanking  = res.list
            //     break;
            //   case  1:
            //     ctx.hotRanking  = res.list
            //     break;
            //   case  2:
            //     ctx.originRanking  = res.list
            //     break;
            //   case  3:
            //     ctx.upRanking  = res.list
            //     break;
            // }
          })
        }
          // getRankings(96).then(res =>  {
          //   ctx.hotRanking  = res
          // })
          // getRankings(1).then(res  =>  {
          //   console.log(res);
          //   // ctx.hotRanking  = res.tracks
          //   ctx.hotRanking  = res.list
          // })
      }
    }
})

export  {
  rankingStore,
  rankingMap
}