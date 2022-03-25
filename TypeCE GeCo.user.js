// ==UserScript==
// @name         TypeCE GeCo
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.2
// @description  Toglie delle collone per simplificare la stampa
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/pratica/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    //document.querySelector("#result_list > thead > tr > th.action-checkbox-column").style.opacity = "0";

    document.querySelector("#result_list > thead > tr > th.sortable.column-tipo_istallazione").style.display = "none";
    document.querySelector("#result_list > thead > tr > th.sortable.column-orario_assegnazione").style.display = "none";
    document.querySelector("#result_list > thead > tr > th.sortable.column-tipo_misuratore > div.text > a").textContent = "Tipo LCL"
    var operators = document.querySelector("#result_list > tbody").childElementCount;
    var i;
    for (i = 1; i <= operators; i++) {
        var colType = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-tipo_misuratore");
        var colM2 = document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-tipo_istallazione");
        if (colM2.textContent == "Fotovoltaico") {
            colType.textContent = "M2";
        }
        colM2.style.display = "none";

        document.querySelector("#result_list > tbody > tr:nth-child(" + i + ") > td.field-orario_assegnazione").style.display = "none";
    }

})();
