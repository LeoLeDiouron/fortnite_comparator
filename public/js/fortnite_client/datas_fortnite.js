class DatasFortnite {

    //initialisation de toutes les datas
    constructor() {
        this._datas_str = null;
        this._name = ""
        this._account_id = "";

        this._top1_solo = "";
        this._top1_duo = "";
        this._top1_section = "";

        this._top10_solo = "";
        this._top5_duo = "";
        this._top12_section = "";

        this._top1_solo = "";
        this._top3_duo = "";
        this._top6_section = "";
        
        this._kill = "";
        this._match_played = "";
        this._ratio_kd = "";
        this._kill_min = "";
        
        this._time_played = "";
        this._time_avg = "";
        
    }

    //récupère le JSON en String, et le transforme en objet
    parseDatas(datas) {
        //console.log(datas + "\n");
        this._datas_str = JSON.parse(datas);
        if ("accountId" in this._datas_str) {
            this.parseInfosPlayer();
            this.parseStatsTop();
            this.parseStatsKD();
            this.parseStatsTime();
        }
    }

    //parse les datas générales sur le joueur
    parseInfosPlayer() {
        this._account_id = this._datas_str["accountId"];
        this._name = this._datas_str["epicUserHandle"];
    }

    //parse toutes les datas en lien avec les stats TOP1 du joueur
    parseStatsTop() {
        if ("p2" in this._datas_str["stats"]) {
            this._top1_solo = this._datas_str["stats"]["p2"]["top1"]["value"];
            this._top10_solo = this._datas_str["stats"]["p2"]["top10"]["value"];
            this._top25_solo = this._datas_str["stats"]["p2"]["top25"]["value"];            
        }
        if ("p10" in this._datas_str["stats"]) {
            this._top1_duo = this._datas_str["stats"]["p10"]["top1"]["value"];
            this._top5_duo = this._datas_str["stats"]["p10"]["top5"]["value"];
            this._top12_duo = this._datas_str["stats"]["p10"]["top12"]["value"];            
        }
        if ("p9" in this._datas_str["stats"]) {
            this._top1_section = this._datas_str["stats"]["p9"]["top1"]["value"];
            this._top3_section = this._datas_str["stats"]["p9"]["top3"]["value"];
            this._top6_section = this._datas_str["stats"]["p9"]["top6"]["value"];            
        }
    }

    //parse toutes les datas en lien avec les stats Kill and death du joueur
    parseStatsKD() {
        this._kill = this._datas_str["lifeTimeStats"][10]["value"];
        this._match_played = this._datas_str["lifeTimeStats"][7]["value"];
        this._ratio_kd = this._datas_str["lifeTimeStats"][11]["value"];
        this._kill_min = this._datas_str["lifeTimeStats"][12]["value"];
    }

    //parse toutes les datas en lien avec les stats TOP1 du joueur
    parseStatsTime() {
        this._time_played = this.convertTime(this._datas_str["lifeTimeStats"][13]["value"]);
        this._time_avg = this.convertTime(this._datas_str["lifeTimeStats"][14]["value"]);  
    }

    //convertie d/h/m/s en secondes
    convertTime(time) {
        var second = 0;
        var time_split = time.split(" ")

        for (var idx = 0 ; idx < time_split.length; idx++) {
            var type_time = time_split[idx].slice(-1);
            var number_time = parseInt(time_split[idx])
            if (type_time == "d")
                second += 24 * 60 * 60 * number_time;
            else if (type_time == "h")
                second += 60 * 60 * number_time;
            else if (type_time == "m")
                second += 60 * number_time;
            else if (type_time == "s")
                second += number_time;
        }
        return second.toString();
    }
}

exports.DatasFortnite = DatasFortnite;