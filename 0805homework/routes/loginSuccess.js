/**
 * Created by dllo on 17/8/5.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql');


router.post('/',function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    function handleError(message,error) {
        if (error) {
            console.log(message + '失败')
            console.log(error)
            return false
        }else {
            console.log(message + '成功')
            return true
        }
    }

    var options = {
        host:'localhost',
        port:3306,
        user:'root',
        password:''
    }

//创建连接
    var connect = mysql.createConnection(options)
//建立链接
    connect.connect(function (error) {
        handleError('链接',error)
    })

//使用数据库
    var useDBSQL = 'use PHP0404'
    connect.query(useDBSQL,function (error) {
        handleError('使用',error)
    })

//查询数据
    var selectSQL = 'select * from nameid'
    connect.query(selectSQL,function (error,results) {
        for (var i = 0;i<results.length;i++) {
            console.log(results[i]["username"])
            if (results[i]["username"] == username) {
                if (results[i]["password"] == password) {
                    res.render('loginSuccess',{title:'登录成功'})
                }else {
                    res.render('loginSuccess',{title:'密码错误'})
                }
            }else {
                res.render('loginSuccess',{title:'用户名不存在'})
            }
        }
    })

})

module.exports = router;