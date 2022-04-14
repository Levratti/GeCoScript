// ==UserScript==
// @name         Plugin Argo GeCo
// @namespace    https://github.com/Levratti/GeCoScript
// @version      0.1
// @description  Plugin per scaricare in automatico il file CP da GeCo
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/pallet/?q=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=impresalevratti.it
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
