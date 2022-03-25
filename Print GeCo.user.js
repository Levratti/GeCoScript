// ==UserScript==
// @name         Print GeCo
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.7
// @description  Stampare le liste
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/pratica/?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.Stampa = function () {
        function httpGet(theUrl)
        {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
            xmlHttp.send( null );
            return xmlHttp.responseText;
        }

        var htmlObject = document.createElement('html');
        htmlObject.innerHTML = httpGet( window.location.href + '&o=11');
        //console.log(htmlObject.innerHTML);

        var resultList = htmlObject.querySelector("#changelist-form > div.results").innerHTML;
        var nameOperators = document.querySelector("#changelist-filter > div:nth-child(4) > div > select").options[document.querySelector("#changelist-filter > div:nth-child(4) > div > select").selectedIndex].textContent;

        var a = window.open('','','width=733,height=454');
        a.document.open("text/html");
        a.document.write('<html><head><title>');
        a.document.write(nameOperators);
        a.document.write('</title>');
        a.document.write('<link rel="stylesheet" type="text/css" href="/static/admin/css/base.css">');
        a.document.write('<style>body{opacity: 0}@media print { body{opacity: 1}}</style>');
        a.document.write('</head><body style="overflow: hidden;">');
        a.document.write(resultList);
       a.document.write("<script>");
        a.document.write('document.querySelector("#result_list > thead > tr > th.action-checkbox-column").style.opacity = "0";');
        a.document.write('document.querySelector("#result_list > thead > tr > th.sortable.column-stato_esecuzione_display_html").style.display = "none";');
        a.document.write('document.querySelector("#result_list > thead > tr > th.sortable.column-collocazione_contatore").style.display = "none";');
        a.document.write('document.querySelector("#result_list > thead > tr > th.sortable.column-orario_assegnazione").style.display = "none";');
        a.document.write('document.querySelector("#result_list > thead > tr > th.sortable.column-lotto").style.display = "none";');
        a.document.write('document.querySelector("#result_list > thead > tr > th.sortable.column-contratto").style.display = "none";');
        a.document.write('document.querySelector("#result_list > thead > tr > th.sortable.column-data_esecuzione_display").style.display = "none";');
        a.document.write('document.querySelector("#result_list > thead > tr > th.sortable.column-data_sopralluogo_display").style.display = "none";');
        a.document.write('document.querySelector("#result_list > thead > tr > th.column-contatore_link").style.display = "none";');
        a.document.write('document.querySelector("#result_list > thead > tr > th.sortable.column-idrda").style.display = "none";');

        a.document.write('var operators = document.querySelector("#result_list > tbody").childElementCount;');
        a.document.write('var i;');
        a.document.write('for (i = 1; i <= operators; i++) {');
        a.document.write('document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-stato_esecuzione_display_html").style.display = "none";');
        a.document.write('document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-collocazione_contatore").style.display = "none";');
        a.document.write('document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-orario_assegnazione").style.display = "none";');
        a.document.write('document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-lotto.nowrap").style.display = "none";');
        a.document.write('document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-contratto.nowrap").style.display = "none";');
        a.document.write('document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-data_esecuzione_display").style.display = "none";');
        a.document.write('document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-data_sopralluogo_display").style.display = "none";');
        a.document.write('document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-contatore_link").style.display = "none";');
        a.document.write('document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-idrda").style.display = "none";');

        a.document.write('}');
        a.document.write("</script>");
        a.document.write("</body></html>");




        a.document.close(); // necessary for IE >= 10
        a.focus(); // necessary for IE >= 10*/

        //window.onload = function() { a.print(); a.close(); };
        setTimeout(function(){ a.print(); a.close(); }, 600);
    }

    var btn = document.createElement("li");
    btn.innerHTML = '<a href="javascript:Stampa();" class="historylink">Stampa</a>';

    var contBtn = document.querySelector("#content-main > ul");
    contBtn.insertBefore(btn, contBtn.childNodes[0]);
})();
