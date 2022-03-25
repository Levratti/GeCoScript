// ==UserScript==
// @name         Sigilli GeCo
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.1
// @description  Scaricare la lista di sigilli M2
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/sigillo/*
// @icon         https://geco.impresalevratti.it/media/admin-interface/logo/gecko_icon.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.downloadSIG = function () {
        function download_csv(data, filename) {
            var csv = 'AZIONE;ENELTEL;SIGILLO;PINZA FITTIZIA;DATA_INSTALLAZIONE/RISCONTRO;MATRICOLA_RESPONSABILE;MATRICOLA_OPERATORE;NOTA;SIGILLO_RIMOSSO;CODICE CE1G RIMOSSO;MATRICOLA CE1G RIMOSSO\n';
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
            var checked = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.action-checkbox > input").checked;
            if (checked == true) {
                var sigillo = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > th > a").textContent;
                var eneltel = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-pratica_link > a").textContent;
                var ope = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-operatore.nowrap").textContent;

                var linkP = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-pratica_link > a").href;
                var htmlObject = document.createElement('html');
                htmlObject.innerHTML = httpGet(linkP);
                var mese = htmlObject.querySelector("#id_data_esecuzione_0").value;

                var linkO = "https://geco.impresalevratti.it/admin/users/user/?q=" + ope.replace(" ", "+");
                //console.log();
                htmlObject = document.createElement('html');
                htmlObject.innerHTML = httpGet(linkO);
                var operatore = htmlObject.querySelector("#result_list > tbody > tr > th > a").textContent;

                data += "INSTALLAZIONE;" + eneltel + ";" + sigillo + ";;" + mese + ";AE100492;" + operatore + ";;;\n";

                document.querySelector("#id_form-" + (i - 1) + "-caricato_enel").checked = true;
            }
        }

        setTimeout(function(){
            var date = "Sigilli";
            download_csv(data, date);
        }, 100);
    };
    var btnS = document.createElement("li");
    btnS.innerHTML = '<a href="javascript:downloadSIG();" class="historylink">DownloadSIGILLI</a>';

    var contBtnS = document.querySelector("#content-main > ul");
    contBtnS.insertBefore(btnS, contBtnS.childNodes[0]);
})();
