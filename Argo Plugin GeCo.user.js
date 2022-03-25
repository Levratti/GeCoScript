// ==UserScript==
// @name         Argo Plugin GeCo
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.1
// @description  Aiuta a scaricare i CASARS dal sito esterno
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/pallet/?q=*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    if (location.hash === "#download") {
        var id = document.querySelector("#result_list > tbody > tr > td.action-checkbox > input");
        if (id != undefined) {
            var url = "https://geco.impresalevratti.it/admin/backend/pallet/" + id.value + "/export-resi/";
            window.open(url);
        }
        window.close();
    }
})();
