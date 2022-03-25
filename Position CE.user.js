// ==UserScript==
// @name         Position CE
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.5
// @description  Posizione del contatore
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/pratica/*/change/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var lat = document.querySelector("#fieldsets-container > fieldset:nth-child(6) > div.form-row.field-latitudine.field-longitudine > div.fieldBox.field-latitudine > div");
    var lng = document.querySelector("#fieldsets-container > fieldset:nth-child(6) > div.form-row.field-latitudine.field-longitudine > div.fieldBox.field-longitudine > div");

    var btn = document.createElement("li");
    btn.innerHTML = '<a href="http://www.google.com/maps/place/' + lat.textContent.replace(",", ".") + ',' + lng.textContent.replace(",", ".") + '" class="historylink" target="_blank">Posizione</a>';

    var contBtn = document.querySelector("#content-main > ul");
    contBtn.insertBefore(btn, contBtn.childNodes[0]);
})();
