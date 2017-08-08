/**
 * Created by dllo on 17/8/7.
 */
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var handleError = require('../public/javascripts/handlerError');
var options = {
    host:'localhost',
    port:3306,
    user:'root',
    password:'huojinxin',
    database:'NedB'
}

//链接池
var pool = mysql.createPool(options)
pool.getConnection(function (error,connection) {
    router.post('/',function (req,res) {
        var select = "select * from user where username = " + "'" + req.body.username + "'" +
            "and password = " + "'" + req.body.password + "'"

        connection.query(select,function (error,results) {
            if (!handleError('查询',error)) return
            if (results.length !==0) {
                var user = results[0]
                if (user.password === req.body.password) {
                    res.send('登录成功');
                }else {
                    res.send('密码错误');
                }
            }else {
                res.send('登录失败')
            }

            connection.release()
        })
    })

})



module.exports = router;