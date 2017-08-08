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

var pool = mysql.createPool(options)
pool.getConnection(function (error,connection) {
    router.post('/',function (req,res) {
        var select = "select * from user where username = " + "'" + req.body.username + "'"
        connection.query(select,function (error,results) {
            if (!handleError('查询',error)) return;
            if (results.length !==0) {
                console.log(req.body.oldpassword,results[0].password)
                if (req.body.oldpassword === results[0].password) {
                    console.log('aaa');
                    var update = "update user set password = " + "'" + req.body.newpassword + "'" +
                            " where username = " + "'" + req.body.username + "'"
                    console.log(update)
                    connection.query(update,function (error,results) {
                        res.send('修改成功!')
                    })
                }else {
                    res.send('当前密码不对!')
                }
            }else {
                res.send('此用户不存在')
            }
        })
        console.log(select)
    })

})
module.exports = router;
