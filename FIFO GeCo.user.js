// ==UserScript==
// @name         FIFO GeCo
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.4
// @description  Link diretto per Admin
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/dashboard/fifo/*/
// @icon         https://geco.impresalevratti.it/media/admin-interface/logo/gecko_icon.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    // Your code here...
    const parma = "contratto__id__exact=5f4dfe12-d7aa-4032-8d20-efabbc1b5b45";
    const ferrara = "contratto__id__exact=688874f6-a5f9-46c2-97d7-40986783bbc1";
    const firenze = "contratto__id__exact=e6e4faff-a04e-4841-8515-ecffd37e6d41";
    const modena = "contratto__id__exact=774b2c4b-b230-4f81-b22f-2ac4c2dac48f";
    const rovigo = "contratto__id__exact=c373a33a-7dfb-4676-934b-07fff7dd6f4a";
    const vicenza = "contratto__id__exact=c39d3c04-c41a-4f36-944d-497babd92bdf";
    const mantova = "contratto__id__exact=f26bf7da-589f-414b-b5c1-baa39f4c3129";
    const padova = "contratto__id__exact=90725a08-750e-49f4-9827-973cc5fe7562";
    const reggio = "contratto__id__exact=948f6675-2421-4e7f-b969-3fae830bc9c0";

    const parmaPDI = "3D10000027-EE10000027";
    const ferraraPDI = "3C10000027-ED10000027";
    const firenzePDI = "3B10000027-XA10000027";
    const modenaPDI = "3A10000027-EC10000027";
    const rovigoPDI = "2D10000027-VA10000027";
    const vicenzaPDI = "2E10000027-VB10000027";
    const mantovaPDI = "2G10000027-UA10000027";
    const padovaPDI = "2F10000027-VC10000027";
    const reggioPDI = "3E10000027-EF10000027";

    const MF = "tipo_ce_nuovo__exact=0";
    const TF = "tipo_ce_nuovo__exact=1";

    const UNessuna = "urgenza__exact=0";
    const UBassa = "urgenza__exact=1";
    const UMedia = "urgenza__exact=2";
    const UAlta = "urgenza__exact=3";

    var lenghtRow = document.querySelector("#table-contratti > tbody").childElementCount;
    var i;
    for (i = 1; i <= lenghtRow; i++) {

        var tipoCE = document.querySelector("#table-contratti > tbody > tr:nth-child(" + i + ") > td.field-tipo_ce_value.bold").textContent;
        var nContratto = document.querySelector("#table-contratti > tbody > tr:nth-child(" + i + ") > td.field-codice.bold").textContent;

        let url = "https://geco.impresalevratti.it/admin/backend/contatore/?";
        var tURL;

        var PDI = "NaN";

        switch (nContratto) {
            case "8400149083":
                url += parma;
                PDI = parmaPDI;
                break;
            case "8400150707":
                url += ferrara;
                PDI = ferraraPDI;
                break;
            case "8400141787":
                url += firenze;
                PDI = firenzePDI;
                break;
            case "8400124337":
                url += modena;
                PDI = modenaPDI;
                break;
            case "8400118979":
                url += rovigo;
                PDI = rovigoPDI;
                break;
            case "8400141790":
                url += vicenza;
                PDI = vicenzaPDI;
                break;
            case "8400149736":
                url += mantova;
                PDI = mantovaPDI;
                break;
            case "8400149816":
                url += padova;
                PDI = padovaPDI;
                break;
            case "8400151041":
                url += reggio;
                PDI = reggioPDI;
                break;
            case "":
                break;
        }

        document.querySelector("#table-contratti > tbody > tr:nth-child(" + i + ") > td.field-codice.bold").setAttribute('title', PDI);

        if (tipoCE == "MF") {// le date ?data_consegna__day=17&data_consegna__month=3&data_consegna__year=2021
            url = url + "&" + MF;
        } else {
            url = url + "&" + TF;
        }

        //Stato Esecuzione
        if (location.pathname == "/dashboard/fifo/da_assegnare_o_in_carico/") {
            var cGiac = document.querySelector("#table-contratti > tbody > tr:nth-child(" + i + ") > td.field-totali.enhanced.bold.numeric");
            if (cGiac.textContent !== "0") {
                cGiac.innerHTML = '<a href="' + url + '" style="color: black;" target="_blank">' + cGiac.textContent + '</a>';
            }
        }

        if (location.pathname == "/dashboard/fifo/da_assegnare_o_in_carico/" || location.pathname == "/dashboard/fifo/da_assegnare/") {
            var cDaAss = document.querySelector("#table-contratti > tbody > tr:nth-child(" + i + ") > td.field-da_assegnare.bold.numeric");
            if (cDaAss.textContent !== "0") {
                tURL = url + "&stato_esecuzione__in=0";
                cDaAss.innerHTML = '<a href="' + tURL + '" style="color: black;" target="_blank">' + cDaAss.textContent + '</a>';
            }
        }

        if (location.pathname == "/dashboard/fifo/da_assegnare_o_in_carico/" || location.pathname == "/dashboard/fifo/in_carico/") {
            var cInCa = document.querySelector("#table-contratti > tbody > tr:nth-child(" + i + ") > td.field-in_carico.bold.numeric");
            if (cInCa.textContent !== "0") {
                tURL = url + "&stato_esecuzione__in=1";
                cInCa.innerHTML = '<a href="' + tURL + '" style="color: black;" target="_blank">' + cInCa.textContent + '</a>';
            }
        }

        if (location.pathname == "/dashboard/fifo/da_assegnare/") {
            url = url + "&stato_esecuzione__in=0";
        } else if (location.pathname == "/dashboard/fifo/in_carico/") {
            url = url + "&stato_esecuzione__in=1";
        }

        //Urgenza
        var cB = document.querySelector("#table-contratti > tbody > tr:nth-child(" + i + ") > td.field-bassa.green.bold.numeric");
        if (cB.textContent !== "0") {
            tURL = url + "&" + UBassa;
            cB.innerHTML = '<a href="' + tURL + '" style="color: green;" target="_blank">' + cB.textContent + '</a>';
        }

        var cM = document.querySelector("#table-contratti > tbody > tr:nth-child(" + i + ") > td.field-media.orange.bold.numeric");
        if (cM.textContent !== "0") {
            tURL = url + "&" + UMedia;
            cM.innerHTML = '<a href="' + tURL + '" style="color: orange;" target="_blank">' + cM.textContent + '</a>';
        }

        var cA = document.querySelector("#table-contratti > tbody > tr:nth-child(" + i + ") > td.field-alta.red.bold.numeric");
        if (cA.textContent !== "0") {
            tURL = url + "&" + UAlta;
            cA.innerHTML = '<a href="' + tURL + '" style="color: red;" target="_blank">' + cA.textContent + '</a>';
        }
    }
})();
