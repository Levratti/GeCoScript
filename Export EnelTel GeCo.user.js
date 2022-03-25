// ==UserScript==
// @name         Export EnelTel GeCo
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.2
// @description  Esporta i EnelTel selezionati
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/pratica/?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.EnelTel = function () {
        var eneltel = '';
        var operators = document.querySelector("#result_list > tbody").childElementCount;
        var i;
        for (i = 1; i <= operators; i++) {
            var checked = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.action-checkbox > input").checked;
            if (checked == true) {
                eneltel += document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > th > a").textContent + '\n';
            }
        }

        var a = window.open('','','width=400,height=450');
        a.document.open("text/html");
        a.document.write('<html><head><title>');
        a.document.write('EnelTel');
        a.document.write('</title>');
        a.document.write('</head><body">');
        a.document.write(eneltel);
        a.document.write("</body></html>");


        a.document.close(); // necessary for IE >= 10
        a.focus(); // necessary for IE >= 10*/
    }

    var btn = document.createElement("li");
    btn.innerHTML = '<a href="javascript:EnelTel();" class="historylink">Esporta</a>';

    var contBtn = document.querySelector("#content-main > ul");
    contBtn.insertBefore(btn, contBtn.childNodes[0]);
})();
