// ==UserScript==
// @name         Link CASARS GeCo
// @namespace    https://github.com/Levratti/GeCoScript
// @version      0.3
// @description  Visualizza sè il CASARS è stato spedito
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/reso/*/change/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=impresalevratti.it
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.httpGet = function(theUrl)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    var IDCasars = document.querySelector("#id_pallet > option:nth-child(2)");
    if (IDCasars == null) {
        return
    }
    var url = "https://geco.impresalevratti.it/admin/backend/pallet/" + IDCasars.value + "/change/";
    var htmlObject = document.createElement('html');
    htmlObject.innerHTML = window.httpGet(url);
    var Send = htmlObject.querySelector("#id_data_spedizione").value != "";

    var elem = "";

    if (Send) {
        elem = '<a href="' + url + '" class="fa fa-truck" style="color: #DC3545;" _blank></a>';
    } else {
        elem = '<a href="' + url + '" class="fa fa-building" style="color: #28A745;" _blank></a>';
    }

    document.querySelector("#reso_form > div > fieldset.module.aligned.gestione_interna > div.form-row.field-pallet.field-data_consegna > div.fieldBox.field-pallet > label").innerHTML = elem + " Carton Pallet:";
})();
