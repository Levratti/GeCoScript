// ==UserScript==
// @name         Export CE
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.1
// @description  Scarica il file Excel
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/contatore/*
// @icon         https://geco.impresalevratti.it/media/admin-interface/logo/gecko_icon.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.downloadCE = function () {
        function download_csv(data, filename) {
            var csv = 'SERIALE,TIPO_CE_NUOVO,STATO_ESECUZIONE,URGENZA,PDI,CONTRATTO,DATA_CONSEGNA,DATA_USCITA,N_GG_GIACENZA,ODT\n';
            csv += data;
            var a = document.createElement("a");
            var url = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            a.href = url;
            a.download = filename + '.csv';
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }

        function httpGet(theUrl)
        {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
            xmlHttp.send( null );
            return xmlHttp.responseText;
        }

        var data = "";
        var row = document.querySelector("#result_list > tbody").childElementCount;
        var i;
        for (i = 1; i <= row; i++) {
            var SERIALE = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > th").textContent;
            var TIPO_CE_NUOVO = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-tipo_ce_nuovo").textContent;
            var STATO_ESECUZIONE = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-stato_esecuzione").textContent;
            var URGENZA = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-urgenza_display").textContent;
            var PDI = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-pdi").textContent;
            var CONTRATTO = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-contratto.nowrap").textContent;
            var DATA_CONSEGNA = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-data_consegna_display").textContent;
            var DATA_USCITA = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-data_uscita_display").textContent;
            var N_GG_GIACENZA = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-n_gg_giacenza").textContent;
            var ODT = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-odt").textContent;


            data += SERIALE + ',' + TIPO_CE_NUOVO + ',' + STATO_ESECUZIONE + ',' + URGENZA + ',' + PDI + ',' + CONTRATTO + ',' + DATA_CONSEGNA + ',' + DATA_USCITA + ',' + N_GG_GIACENZA + ',' + ODT + "\n";
        }

        setTimeout(function(){
            var pdi = document.querySelector("#result_list > tbody > tr:nth-child(1) > td.field-pdi").textContent;
            download_csv(data, pdi);
        }, 100);
    };
    var btnS = document.createElement("li");
    btnS.innerHTML = '<a href="javascript:downloadCE();" class="historylink">Export</a>';

    var contBtnS = document.querySelector("#content-main > ul");
    contBtnS.insertBefore(btnS, contBtnS.childNodes[0]);
})();
