/**
 * Created by dllo on 17/8/5.
 */
var express = require('express');
var router = express.Router();

router.post('/',function (req,res) {
    res.render('login')
})

module.exports = router;