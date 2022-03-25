// ==UserScript==
// @name         Media GeCo
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.1
// @description  Media CE*OPERATORE/GIORNI
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/dashboard/rendiconto-mensile/*
// @icon         https://geco.impresalevratti.it/static/favicons/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.document.querySelector("#table-contratti > table > tbody").onclick = function() {
        setTimeout(function() {
            window.CalcMEDIA();
        }, 500);
    };

    window.CalcMEDIA = function() {
        var dispayCN = document.querySelector("#table-contratti > table > tbody > tr.selected:not(.totals) > td.field-totale.numeric");
        if (dispayCN !== null) {
            var Ncolonne = document.querySelector("#table-contratto-selezionato > div > table:nth-child(3) > thead > tr").childElementCount;
            var Nrighe = document.querySelector("#table-contratto-selezionato > div > table:nth-child(3) > tbody").childElementCount;
            var sommaMedie = 0;
            for (var j = 1; j <= Nrighe - 1; j++) {
                var gg = 0;
                for (var i = 2; i <= Ncolonne - 1; i++) {
                    var CE = document.querySelector("#table-contratto-selezionato > div > table:nth-child(3) > tbody > tr:nth-child(" + j +") > td:nth-child(" + i +")").innerText;
                    if (CE > 0) {
                        gg++
                    }
                }
                var mediaOp = document.querySelector("#table-contratto-selezionato > div > table:nth-child(3) > tbody > tr:nth-child(" + j +") > td:nth-child(" + Ncolonne +")").innerText / gg;
                sommaMedie += mediaOp;
                document.querySelector("#table-contratto-selezionato > div > table:nth-child(3) > tbody > tr:nth-child(" + j +") > td.field-operatore").innerHTML += "<span style='color: gray;'>Media: (<i style='color: red;'>" + mediaOp.toFixed(1) + "</i>)</span>"
            }
            var MEDIA = sommaMedie / (Nrighe - 1);
            console.log(MEDIA.toFixed(1));
            document.querySelector("#table-contratto-selezionato > div > h5:nth-child(2)").innerHTML += " (Media: <i style='color: red'>" + MEDIA.toFixed(1) + "</i>)";

            dispayCN.innerHTML = dispayCN.firstChild.textContent + "<span style='color: gray;'> (Media: <i style='color: red'>" + MEDIA.toFixed(1) + "</i>)</span>";
        }
    }
})();
