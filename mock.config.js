const Mock = require('mockjs')
const path = require('path')

module.exports = {
  requests: [
    {
      type: 'GET',
      url: '/login',
      handle(req, res) {
        console.log(req.query, '==== GET /login ====')
        let resData
        if (req.query.email === 'ccziwe@qq.com' && req.query.password === '123456') {
          resData = Mock.mock({
            status: 200,
            message: '登录成功',
            'data|3': { id: '@ID()', username: '@FIRST()', email: '@EMAIL()' }
          })
          console.log(1)
        } else {
          resData = Mock.mock({
            status: 300,
            message: '登录失败'
          })
          console.log(resData)
        }
        res.json(resData)
      }
    }
  ],
  seting: { timeout: '10-100' }
}
