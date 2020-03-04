const Mock = require('mockjs')

module.exports = {
  requests: [
    {
      type: 'GET',
      url: '/user/userLogin',
      handle(req, res) {
        console.log(req.query, '==== GET /user/:id ====')
        console.log(req.path) // 若想要获取 地址中的 :id 参数，请自己手动解析
        const data = Mock.mock({
          code: 200,
          message: '获取用户信息成功',
          data: { id: '@ID()', name: '@CNAME()', email: '@EMAIL()' }
        })
        res.json(data)
      }
    }
  ],
  settings: { timeout: '10-100' }
}
