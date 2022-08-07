import  { xyLoginRequest  }  from './index'
export  function  getLoginCode()  {
    return  new Promise((resolve, reject) =>  {
      wx.login({
        timeout:  1000,
        success:  res =>  {
            // code
            const code  = res.code
            resolve(code)
        },
        fail: err => {
            // console.log(err);
            reject(err)
        }
      })
    })
}

export  function  codeToToken(code)  {
  return  xyLoginRequest.post("/login",  { code  })
}

export  function  checkToken()  {
  return  xyLoginRequest.post("/auth",  {}, true)
}

export  function  checkSession()  {
  return  new Promise(resolve =>  {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: ()  =>  {
        resolve(false)
      }
    })
  })
}

export  function  getUserInfo() {
  return  new Promise((resolve,reject) =>  {
    wx.getUserProfile({
      desc: 'Hello  World',
      success:  res =>  {
        resolve(res)
      },
      fail: err =>  {
        reject(err)
      }
    })
  })
}