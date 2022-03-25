// ==UserScript==
// @name         rAlert GeCo
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.3
// @description  Link diretto per Admin
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/dashboard/storico-contratti/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const parma = "5f4dfe12-d7aa-4032-8d20-efabbc1b5b45";
    const ferrara = "688874f6-a5f9-46c2-97d7-40986783bbc1";
    const firenze = "e6e4faff-a04e-4841-8515-ecffd37e6d41";
    const modena = "774b2c4b-b230-4f81-b22f-2ac4c2dac48f";
    const rovigo = "c373a33a-7dfb-4676-934b-07fff7dd6f4a";
    const vicenza = "c39d3c04-c41a-4f36-944d-497babd92bdf";
    const mantova = "f26bf7da-589f-414b-b5c1-baa39f4c3129";
    const padova = "90725a08-750e-49f4-9827-973cc5fe7562";
    const reggio = "948f6675-2421-4e7f-b969-3fae830bc9c0";

    const url1 = 'https://geco.impresalevratti.it/admin/backend/reso/?data_consegna__isnull=True&o=-6.-8&pratica__contratto__id__exact=';
    const url2 = '&pratica__stato_esecuzione__exact=2';

    const url1c = 'https://geco.impresalevratti.it/admin/backend/contatore/?contratto__id__exact=';
    const url2c = '&stato_esecuzione__exact=0';

    var lenghtRow = document.querySelector("#table-contratti > tbody").childElementCount;
    var i;
    for (i = 1; i <= lenghtRow; i++) {
        var rAlert = document.querySelector("#table-contratti > tbody > tr:nth-child(" + i + ") > td.field-resi_in_alert.enhanced.bold.alert.numeric");
        var RConsegna = document.querySelector("#table-contratti > tbody > tr:nth-child(" + i + ") > td.field-resi_in_consegna.enhanced.bold.numeric")
        var cGiac = document.querySelector("#table-contratti > tbody > tr:nth-child(" + i + ") > td.field-contatori_in_giacenza.enhanced.bold.numeric");
        var nContratto = document.querySelector("#table-contratti > tbody > tr:nth-child(" + i + ") > td.field-codice.bold").textContent;
        var url;
        var urlc;
        switch (nContratto) {
            case "8400149083":
                url = url1 + parma + url2;
                urlc = url1c + parma + url2c;
                break;
            case "8400150707":
                url = url1 + ferrara + url2;
                urlc = url1c + ferrara + url2c;
                break;
            case "8400141787":
                url = url1 + firenze + url2;
                urlc = url1c + firenze + url2c;
                break;
            case "8400124337":
                url = url1 + modena + url2;
                urlc = url1c + modena + url2c;
                break;
            case "8400118979":
                url = url1 + rovigo + url2;
                urlc = url1c + rovigo + url2c;
                break;
            case "8400141790":
                url = url1 + vicenza + url2;
                urlc = url1c + vicenza + url2c;
                break;
            case "8400149736":
                url = url1 + mantova + url2;
                urlc = url1c + mantova + url2c;
                break;
            case "8400149816":
                url = url1 + padova + url2;
                urlc = url1c + padova + url2c;
                break;
            case "8400151041":
                url = url1 + reggio + url2;
                urlc = url1c + reggio + url2c;
                break;
            case "":
                url = 'https://geco.impresalevratti.it/admin/backend/reso/?data_consegna__isnull=True&o=-6.-8&pratica__stato_esecuzione__exact=2';
                urlc = 'https://geco.impresalevratti.it/admin/backend/contatore/?stato_esecuzione__exact=0';
                break;
        }

        if (rAlert.textContent !== "0") {
            rAlert.innerHTML = '<a href="' + url + '" style="color: red;" target="_blank">' + rAlert.textContent + '</a>';
        }
        if (RConsegna.textContent !== "0") {
            RConsegna.innerHTML = '<a href="' + url + '" style="color: black;" target="_blank">' + RConsegna.textContent + '</a>';
        }
        if (cGiac.textContent !== "0") {
            cGiac.innerHTML = '<a href="' + urlc + '" style="color: black;" target="_blank">' + cGiac.textContent + '</a>';
        }
    }
})();
