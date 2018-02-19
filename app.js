//import { DatasFortnite } from './public/js/fortnite_client/datas_fortnite.js';

var express = require('express');
var path = require('path');
var FortniteClient = require("./public/js/fortnite_client/fortnite_client.js").FortniteClient;
var DatasFortnite = require("./public/js/fortnite_client/datas_fortnite.js").DatasFortnite;
var bodyParser = require('body-parser');

var app = express();
var urlencodedparser = bodyParser.urlencoded({ extended: true });	
var fortniteClient = new FortniteClient();
var platform = "pc";
var name_players = [];
var infos_players = [];

app.engine('.ejs', require('ejs').__express)

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use("/public", express.static('public'));

app.use("/flot", express.static('flot'))

app.get('/', function(req, res) {
    res.render('index.ejs', {message:"Rentrez le nom d'un ou plusieurs joueurs"});
});

app.post('/', function(req, res){
    name_players = [];
    infos_players = [];
    fortniteClient.resetData();
    if (req.body.player_1 != "")
        name_players.push(req.body.player_1);
    if (req.body.player_2 != "")
        name_players.push(req.body.player_2);
    if (req.body.player_3 != "")
        name_players.push(req.body.player_3);
    if (req.body.player_4 != "")
        name_players.push(req.body.player_4);
    get_datas_from_api(res, "");
});

app.get('/kill', function(req, res) {
    if (infos_players.length > 0)
        res.render('comparison/comparison_kill.ejs', {infos_players:infos_players});
    else
        res.render('index.ejs', {message:"Il faut au moins rentrer le nom d'un joueur !"});
});

app.get('/top', function(req, res) {
    if (infos_players.length > 0)
        res.render('comparison/comparison_top.ejs', {infos_players:infos_players});
    else
        res.render('index.ejs', {message:"Il faut au moins rentrer le nom d'un joueur !"});
});

app.get('/time', function(req, res) {
    if (infos_players.length > 0)
        res.render('comparison/comparison_time.ejs', {infos_players:infos_players});
    else
        res.render('index.ejs', {message:"Il faut au moins rentrer le nom d'un joueur !"});
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.use(require('express').static('.'));

app.use('/public', express.static(path.join(__dirname + 'public')));

app.listen(8080);

async function get_datas_from_api(res, show) {
    for (var idx = 0; idx < name_players.length; idx++) {
      await sleep(2000);
      await fortniteClient.connect(platform, name_players[idx], idx, function(idx) {
        push_infos(fortniteClient.getDatas(idx), res, show);
      });
    }
}

function push_infos(result, res, show) {
    infos_players.push(result);
    if (infos_players.length == name_players.length) {
        for (var idx = infos_players.length; idx < 4 ; idx++)
            infos_players.push(new DatasFortnite());
        res.render('index.ejs', {message:"La recherche est un succès !"});
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}