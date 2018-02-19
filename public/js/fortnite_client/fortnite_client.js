var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

var DatasFortnite = require("./datas_fortnite.js").DatasFortnite;

class FortniteClient {

    constructor() {
        this._headerField = "TRN-Api-Key";
        this._apiKey = "b2a96b3f-c9a8-4e8e-9cf6-870053a01ed5";
        this._datas = [];
    }

    //connexion avec l'api de Fortnite, récuperation et parsing du JSON
    async connect(platform, username, idx, callback) {
        console.log("--> " + username + " platform " + platform);

        var this_tmp = this;
        var url_fortnite = "https://api.fortnitetracker.com/v1/profile/" + platform + "/" + username;
        
        await this.httpGetAsync(url_fortnite, function(status){
            var data = new DatasFortnite();
            data.parseDatas(status);
            this_tmp._datas.push(data);
            callback(idx);
        });

    }
    
    //fait la requète HTTP
    async httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);    
                
        }
        
        xmlHttp.open("GET", theUrl, true); // true for asynchronous 
        xmlHttp.setRequestHeader(this._headerField, this._apiKey);
        xmlHttp.send(null);
    }

    //retourne les stats du joueurs en version html
    getStatsGames() {
        return this._datas.getStatsGames();
    }

    getDatas(idx) {
        return this._datas[idx];
    }

    resetData() {
        this._datas = [];
    }

}

exports.FortniteClient = FortniteClient;