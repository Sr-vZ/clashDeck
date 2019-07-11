const request = require('request')
const fs = require('fs')
const cheerio = require('cheerio')
const cheerioTableparser = require('cheerio-tableparser')


var apiUrl = "http://statsroyale.com/cards"

var param = ""

var proxyUrl = "http://proxy.intra.bt.com:8080"
var cardUrls = [] //array for storing the urls of the cards


var options = {
    url: apiUrl + param,
    proxy: proxyUrl, //'http://' + proxyList[getRandomInt(0,25)], //proxy,
    headers: {
        'User-Agent': "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/527  (KHTML, like Gecko, Safari/419.3) Arora/0.6 (Change: )"
    }
}

var file = fs.createWriteStream("./Data/test.json")

request(options, function (err, resp, body) {
    //console.log(body)
    getCardlinks(body)
    allCards()
}).pipe(file, function (file) {
    
    data = JSON.parse(file)
    //console.log(data)
    
})

function getCardlinks(data) {
    //data = JSON.parse(file)
    $ = cheerio.load(data)

    $('a').each(function () {
        var text = $(this).text()
        var link = $(this).attr('href')

         if (link && link.match(/card/)) {
            //console.log(text + ' --> ' + link)
            cardUrls.push(link)
        }
        
        //console.log(text + ' --> ' + link)
    })
    console.log(cardUrls)
}

function getCardStat(url) {

    var options = {
        url: url,
        proxy: proxyUrl, //'http://' + proxyList[getRandomInt(0,25)], //proxy,
        headers: {
            'User-Agent': "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/527  (KHTML, like Gecko, Safari/419.3) Arora/0.6 (Change: )"
        }
    }
    var file = fs.createWriteStream("./Data/" + url.replace('http://statsroyale.com/card/','') +".json")
    filePath = "./Data/" + url.replace('http://statsroyale.com/card/', '') + ".json"
    
    request(options,function (err,resp,body) {
        $ = cheerio.load(body, {    
            normalizeWhitespace: true
        })
        tbl = $('table[class="card__desktopTable card__table"]')
        cheerioTableparser($);

        data = $('table[class="card__desktopTable card__table"]').parsetable(false,false,true); 
        console.log(data)
        fs.writeFileSync(filePath , data, function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        }); 
        /* file.on('open',function (data) {
            file.write(JSON.parse(data))
        }) */
    })//.pipe(file)
}

function allCards() {
    for (i = 0; i < cardUrls.length-2; i++) {
        console.log("fetching card from:" + cardUrls[i])
        getCardStat(cardUrls[i])
    }
}
