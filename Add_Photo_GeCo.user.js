// ==UserScript==
// @name         Add Photo GeCo
// @namespace    https://github.com/Levratti/GeCoScript
// @version      0.4
// @description  Link per caricare imagini
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/pratica*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=impresalevratti.it
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    window.AddPhoto = function () {
        var a = window.open('https://geco.impresalevratti.it/admin/backend/praticapicture/add/#' + IDp,'','width=500,height=300');

        a.document.close(); // necessary for IE >= 10
        a.focus(); // necessary for IE >= 10*/

        //window.onload = function() { a.print(); a.close(); };
        //setTimeout(function(){ a.close(); }, 600);
    }

    var iframe = '<iframe src="https://geco.impresalevratti.it/admin/backend/praticapicture/add/#e8306639-5cf6-47ce-9792-815d93341297" title="" scrolling="no" style="width: 100%;height: 200px;border: none;"></iframe>'

    const regexPratica = /\/admin\/backend\/pratica\/\S{8}-\S{4}-\S{4}-\S{4}-\S{12}\/change\//g;
    const regexPhoto = /\/admin\/backend\/praticapicture\/add\//g;
    const regexGlobal =/\/admin\/backend\/praticapicture\//g

    if (regexPratica.test(location.pathname)) {
        var IDp = document.querySelector("#id_pictures-__prefix__-pratica").value;

        document.querySelector("#pictures-group > div > fieldset > table > tbody > tr.add-row > td > a:nth-child(1)").hidden = true;

        var btn = document.createElement("a");
        btn.textContent = "Aggiungi un altra Immagine.";
        //btn.setAttribute('target', '_blank');
        btn.href = "javascript:AddPhoto();" //"https://geco.impresalevratti.it/admin/backend/praticapicture/add/#" + IDp;
        var contBtn = document.querySelector("#pictures-group > div > fieldset > table > tbody > tr.add-row > td");
        contBtn.insertBefore(btn, contBtn.childNodes[0]);

        /*var elem_iframe = document.createElement("iframe");
        elem_iframe.src = "https://geco.impresalevratti.it/admin/backend/praticapicture/add/#" + IDp;
        elem_iframe.scrolling = "no";
        elem_iframe.style.width = "100%";
        elem_iframe.style.height = "2500px";
        elem_iframe.style.border = "none"
        contBtn.insertBefore(elem_iframe, contBtn.childNodes[0]);*/

    } else if (regexPhoto.test(location.pathname) && location.hash != "") {
        document.querySelector("#praticapicture_form > div > fieldset:nth-child(3)").hidden = true;
        document.querySelector("#praticapicture_form > div > fieldset:nth-child(1)").hidden = true;

        document.querySelector("#praticapicture_form > div > div > input[type=submit]:nth-child(2)").hidden = true;
        document.querySelector("#praticapicture_form > div > div > input[type=submit]:nth-child(3)").hidden = true;

        document.querySelector("#praticapicture_form > div > fieldset:nth-child(2) > div.form-row.field-created_display").style.display = "none";
        document.querySelector("#praticapicture_form > div > fieldset:nth-child(2) > div.form-row.field-thumbnail").style.display = "none";
        document.querySelector("#praticapicture_form > div > fieldset:nth-child(2) > div.form-row.field-lat").style.display = "none";
        document.querySelector("#praticapicture_form > div > fieldset:nth-child(2) > div.form-row.field-lon").style.display = "none";
        document.querySelector("#praticapicture_form > div > fieldset:nth-child(2) > div.form-row.field-pratica").style.display = "none";

        document.querySelector("#header").style.display = "none";
        document.querySelector("#dialog_generic").style.display = "none";
        document.querySelector("#container > div.breadcrumbs").style.display = "none";

        /*document.querySelector("#footer").style.display = "none";
        document.querySelector("#content > h1").style.display = "none";*/

        document.querySelector("#id_pratica").value = location.hash.substring(1);
    } else if (regexGlobal.test(location.pathname) && location.hash != "") {
        //window.location.replace("https://geco.impresalevratti.it/admin/backend/praticapicture/add/#" + IDp); //IDp non è difinito nella nuova pagina che si apre
        window.close();
    }

})();
