// ==UserScript==
// @name         StopAlert GeCO
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.5
// @description  Evidenzia ultimo contatore inserito
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/dashboard/operatori/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function toSeconds(hm) {
        var a = hm.split(':'); // split it at the colons
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60;
        return seconds;
    }
    function start() {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes();
        var operators = document.querySelector("#table-operatori > table > tbody").childElementCount - 1;
        var i;
        //var nOp = operators;
        for (i = 1; i <= operators; i++) {

            /*if (document.querySelector("#table-operatori > table > tbody > tr:nth-child(" + i + ") > td.field-assegnate.numeric").textContent == 0) {
                document.querySelector("#table-operatori > table > tbody > tr:nth-child(" + i + ")").classList.add("debug-only");
                nOp--;
            }*/

            if (document.querySelector("#table-operatori > table > tbody > tr:nth-child(" + i + ") > td.field-max_time_oggi.numeric") !== null) {
                var lastTime = document.querySelector("#table-operatori > table > tbody > tr:nth-child(" + i + ") > td.field-max_time_oggi.numeric");
                var stopS = toSeconds(time) - toSeconds(lastTime.textContent);
                if (stopS >= 3600) {
                    lastTime.style.backgroundColor = "red";
                } else if (stopS >= 1800) {
                    lastTime.style.backgroundColor = "yellow";
                } else if (stopS >= 0) {
                    lastTime.style.backgroundColor = "green";
                }
            }
        }
        //document.querySelector("#table-operatori > h5").textContent = " (" + nOp + ")";
    }
    start();
})();
