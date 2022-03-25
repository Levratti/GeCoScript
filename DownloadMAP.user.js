// ==UserScript==
// @name         DownloadMAP
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.5
// @description  Scarica il file per creare la mappa
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/pratica/?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.downloadMAP = function () {
        function download_csv(data, filename) {
            var csv = 'ENELTEL,TIPO,NOMINATIVO,TEL,COMUNE,INDIRIZZO,LONGITUDINE,LATITUDINE,GeCO\n';
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
        var operators = document.querySelector("#result_list > tbody").childElementCount;
        var i;
        for (i = 1; i <= operators; i++) {
            var idE = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.action-checkbox > input").value;
            var htmlObject = document.createElement('html');
            htmlObject.innerHTML = httpGet("https://geco.impresalevratti.it/admin/backend/pratica/" + idE + "/change/");
            var lat = htmlObject.querySelector("#fieldsets-container > fieldset:nth-child(6) > div.form-row.field-latitudine.field-longitudine > div.fieldBox.field-latitudine > div").textContent.replace(",", ".");
            var lng = htmlObject.querySelector("#fieldsets-container > fieldset:nth-child(6) > div.form-row.field-latitudine.field-longitudine > div.fieldBox.field-longitudine > div").textContent.replace(",", ".");

            var eneltel = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > th > a").textContent;
            var typeCE = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-tipo_ce_reso").textContent;
            var name = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-nominativo_cliente").textContent;
            var tel = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-telefono_cliente").textContent;
            var city = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-comune").textContent;
            var adress = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-indirizzo").textContent;

            var link = "https://geco.impresalevratti.it/admin/backend/pratica/?q=" + eneltel;
            data += eneltel + ',' + typeCE + ',' + name + ',' + tel + ',' + city + ',' + adress + ',' + lng + ',' + lat + ',' + link + "\n";
        }

        setTimeout(function(){
            var date = document.querySelector("#result_list > tbody > tr:nth-child(1) > td.field-data_assegnazione_display").textContent;
            download_csv(data, date);
        }, 100);
    };
    var btnS = document.createElement("li");
    btnS.innerHTML = '<a href="javascript:downloadMAP();" class="historylink">DownloadMAP</a>';

    var contBtnS = document.querySelector("#content-main > ul");
    contBtnS.insertBefore(btnS, contBtnS.childNodes[0]);
})();
