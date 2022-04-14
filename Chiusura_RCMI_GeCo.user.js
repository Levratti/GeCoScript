// ==UserScript==
// @name         Chiusura RCMI GeCo
// @namespace    https://github.com/Levratti/GeCoScript
// @version      0.2
// @description  Crea il template per la chiusura della pratica in BO
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/pratica/*/change/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=impresalevratti.it
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.ChiusuraRCMI = function () {

        function httpGet(theUrl)
        {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
            xmlHttp.send( null );
            return xmlHttp.responseText;
        }

        try {
            var checkClouse = document.querySelector("#fieldsets-container > fieldset:nth-child(2) > div.form-row.field-stato_esecuzione_display_html > div > div").textContent;
            if (checkClouse != "Eseguita") {
                alert("Errore\nLa praticha risulta aperta,\nper creare la chiusra in BO bisogna che la pratica risultasse eseguita.");
                return
            }

            var eneltel = document.querySelector("#fieldsets-container > fieldset:nth-child(1) > div.form-row.field-eneltel.field-tipo_istallazione_display > div.fieldBox.field-eneltel > div.readonly").textContent;
            var contratto = document.querySelector("#fieldsets-container > fieldset:nth-child(1) > div.form-row.field-contratto > div > div").textContent;
            var DataIntervento = document.querySelector("#id_data_esecuzione_0").value;
            var Operatore = document.querySelector("#fieldsets-container > fieldset:nth-child(2) > div.form-row.field-operatore > div > div.readonly").textContent;
            var CE1G = document.querySelector("#fieldsets-container > fieldset:nth-child(1) > div.form-row.field-reso_link > div > div > a").textContent;
            var CE2G = document.querySelector("#fieldsets-container > fieldset:nth-child(3) > div.form-row.field-contatore_link > div > div.readonly > a").textContent;

            var linkO = "https://geco.impresalevratti.it/admin/users/user/?q=" + Operatore.replace(" ", "+");
            //console.log();
            var htmlObject = document.createElement('html');
            htmlObject.innerHTML = httpGet(linkO);
            var MatOperatore = htmlObject.querySelector("#result_list > tbody > tr > th > a").textContent;


            var a = window.open('','','width=400,height=250');
            a.document.open("text/html");
            a.document.write('<html><head><title>');
            a.document.write('Chiusura RCMI GeCo');
            a.document.write('</title>');
            a.document.write('</head><body style="font-size: 0.95em;">');
            a.document.write("------------------------------------------------------------------<br>");
            a.document.write('<b>Richiesta chiusura RCMI ENELTEL ' + eneltel + '</b><br>');
            a.document.write('<b>Contratto: </b>' + contratto + '<br>');
            a.document.write('<b>Data intervento: </b>' + DataIntervento + '<br>');
            a.document.write('<b>Matricola operatore: </b>' + MatOperatore + '<br>');
            a.document.write('<b>CEID da rimuovere/rimosso: </b>' + CE1G + '<br>');
            a.document.write('<b>CEID installato: </b>' + CE2G + '<br>');
            a.document.write('<b>Letture di rimozione:</b><br>');
            a.document.write('<b>&nbsp;&nbsp;&nbsp;&nbsp;A1: </b><br>');
            a.document.write('<b>&nbsp;&nbsp;&nbsp;&nbsp;A2: </b><br>');
            a.document.write('<b>&nbsp;&nbsp;&nbsp;&nbsp;A3: </b><br>');
            a.document.write("</body></html>");


            a.document.close(); // necessary for IE >= 10
            a.focus(); // necessary for IE >= 10*/

        } catch {
            alert("Errore");
        }
    }

    var btn = document.createElement("li");
    btn.innerHTML = '<a href="javascript:ChiusuraRCMI();" class="historylink">Chiusura RCMI</a>';

    var contBtn = document.querySelector("#content-main > ul");
    contBtn.insertBefore(btn, contBtn.childNodes[0]);
})();
