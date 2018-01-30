/*     import trae from 'trae'
import clashapiFactory from 'clashapi/factory' 

const trae = require('trae')
const clashapiFactory = require('clashapi/factory')

const clashapi = clashapiFactory(trae)

clashapi.chests()
    .then((response) => {
        console.log(response);
    })

    */


/*

Route

HTTP Verb

Description


/api/arenas GET All Arenas information
/api/arenas/:id GET Single Arena information
/api/arenas/:idName GET Single Arena information
/api/cards GET All Cards information
/api/cards/:id GET Single Card information
/api/cards/:idName GET Single Card information
/api/chests GET All Chests information
/api/chests/:id GET Single Chest information
/api/chests/:idName GET Single Chest information
/api/leagues GET All Leagues information
/api/leagues/:id GET Single League information
/api/leagues/:idName GET Single League information
/api/players GET All Players levels information
/api/players/:id GET Player level information
/api/players/:idName GET Player level information
/api/random-deck GET Get a Random deck!


Route

Description


/images/arenas/${idName}.png Arenas images
/images/cards/${idName}.png Cards images
/images/chests/${idName}.png Chests images
/images/leagues/${idName}.png Leagues images


 */


const request = require('request')
const fs = require('fs')


var apiUrl = "http://www.clashapi.xyz/api/"

var param = "cards"

var proxyUrl = "http://proxy.intra.bt.com:8080"

var options = {
    url: apiUrl + param,
    proxy: proxyUrl, //'http://' + proxyList[getRandomInt(0,25)], //proxy,
    headers: {
        'User-Agent': "Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US) AppleWebKit/527  (KHTML, like Gecko, Safari/419.3) Arora/0.6 (Change: )"
    }
}

var file = fs.createWriteStream("./Data/cards.json")

request(options, function (err, resp, body) {
    console.log(body)

}) .pipe(file, function (file) {

    data = JSON.parse(file)
    console.log(data)
})