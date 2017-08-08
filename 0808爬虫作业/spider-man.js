/**
 * Created by dllo on 17/8/8.
 */
var download = require('./01.dowenloadlmage')
var request = require('request')
var cheerio = require('cheerio')
var url = 'https://www.douban.com/'


var options = {
    url: 'https://www.douban.com/',
    headers: {
        'Host': 'www.douban.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36'
    }
}
request.get(options, function (error, response, body) {
    var $ = cheerio.load(body)
    //上方四张小图片
    var items = []
    $("#anony-sns .wrapper .main .mod .albums > ul > li .pic > a > img").each(function (index,element) {
        items.push($(element).attr('data-origin'))
    })
    items.forEach(function (item,index) {
        download(item,'images',index + '.jpg')
    })
    
    //title文字
    var titleArr = []
    $("#anony-sns .wrapper .main .mod .notes > ul > li > a").each(function (index,element) {
        titleArr.push($(element).text())
    })

    //豆瓣时间
    var arrtime = []
    $("#anony-time .wrapper .main .time-list > li > a > img").each(function (index,element) {
       var jsonTime = {
            src:$(element).attr('src'),
            title:index
        }
        arrtime.push(jsonTime)
    })

    $("#anony-time .wrapper .main .time-list > li .title").each(function (index,element) {

        arrtime[index].title = $(element).text()
    })

})

