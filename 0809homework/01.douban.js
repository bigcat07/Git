/**
 * Created by dllo on 17/8/9.
 */
var webpage = require('webpage')
var page = webpage.create()
var fs = require('fs')
phantom.outputEncoding = 'utf-8'

page.onConsoleMessage = function (msg,linNum,sourceId) {
    console.log('CONSOLE: ' + msg);
};

page.open('https://www.douban.com/',function (status) {
    if (status === 'success') {
        console.log('加载成功')
        console.log(page.title)

        page.includeJs('https://code.jquery.com/jquery-3.2.1.min.js',
        function () {
            setTimeout(function () {

                var arrstring = page.evaluate(function () {
                    var arr = []
                    $('#anony-video .wrapper .main .video-list > li .video-cover > a').each(
                        function (index,element) {
                            var a = $(element).css('background-image').replace('url(','').replace(')','')
                            arr.push(a);
                        }
                    )
                    return arr;
                })
                //写入文件
                fs.write('./arr.json',arrstring,'w')
                phantom.exit(0)
            },10000)
        })
    }else {
        console.log('对不起,加载失败')
    }
})