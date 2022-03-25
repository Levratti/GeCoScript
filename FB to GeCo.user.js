// ==UserScript==
// @name         FB to GeCo
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.5
// @description  Da FB a GeCo in un click
// @author       Ruslan Dzyuba(Trorker)
// @match        https://it-forcebeatw.enelint.global/geocallfbi/w/Servlet?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var imp1 = '<a href="https://geco.impresalevratti.it/admin/backend/pratica/?q=';
    var img2 = '" target="_blank" ><img src="data:image/png;base64,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" class="icon" draggable="false"></a>';
    var lastCuont = 0;

    function addImg() {
        var count = document.querySelector("#mapViewOpenLayersPanelmapDiv > div > div.ol-overlaycontainer-stopevent > div.ol-overlay-container.ol-selectable > div > div.ol-popup-content > div").childElementCount;
        var i = 0;
        do {
            i++;
            try {
                var getEneltel = document.querySelector("#mapViewOpenLayersPanelmapDiv > div > div.ol-overlaycontainer-stopevent > div.ol-overlay-container.ol-selectable > div > div.ol-popup-content > div > div:nth-child(" + i + ") > div > div > table > tbody > tr:nth-child(3) > td > div > div");
                var gecoimg = imp1 + getEneltel.textContent.substring(0, 9) + img2;
                var img = document.querySelector("#mapViewOpenLayersPanelmapDiv > div > div.ol-overlaycontainer-stopevent > div.ol-overlay-container.ol-selectable > div > div.ol-popup-content > div > div:nth-child(" + i + ") > div > div > table > tbody > tr.toolMatrixRow.toolbar.toolbarTop > td:nth-child(2) > div")
                img.innerHTML = gecoimg;
            }
            catch(err) {}
            try {
                var getEneltelCarico = document.querySelector("#mapViewOpenLayersPanelmapDiv > div > div.ol-overlaycontainer-stopevent > div.ol-overlay-container.ol-selectable > div > div.ol-popup-content > div > div:nth-child(" + i + ") > div > div > div > div > table > tbody > tr:nth-child(3) > td > div > div");
                var gecoimgCarico = imp1 + getEneltelCarico.textContent.substring(0, 9) + img2;
                var imgCarico = document.querySelector("#mapViewOpenLayersPanelmapDiv > div > div.ol-overlaycontainer-stopevent > div.ol-overlay-container.ol-selectable > div > div.ol-popup-content > div > div:nth-child(" + i + ") > div > div > div > div > table > tbody > tr.toolMatrixRow.toolbar.toolbarTop > td:nth-child(2) > div");
                imgCarico.innerHTML = gecoimgCarico;
            }
            catch(err) {}
            try {
                var getEneltelEseguito = document.querySelector("#mapViewOpenLayersPanelmapDiv > div > div.ol-overlaycontainer-stopevent > div.ol-overlay-container.ol-selectable > div > div.ol-popup-content > div > div > div > div > table > tbody > tr:nth-child(3) > td > div > div")
                var gecoimgEseguito = imp1 + getEneltelEseguito.textContent.substring(0, 9) + img2;
                var imgEseguito = document.querySelector("#mapViewOpenLayersPanelmapDiv > div > div.ol-overlaycontainer-stopevent > div.ol-overlay-container.ol-selectable > div > div.ol-popup-content > div > div > div > div > table > tbody > tr.toolMatrixRow.toolbar.toolbarTop > td:nth-child(2) > div")
                imgEseguito.innerHTML = gecoimgEseguito;
            }
            catch(err) {}
        }
        while (i <= count);

        lastCuont = count;
    }

    setInterval(function(){
        var popup = document.querySelector("#mapViewOpenLayersPanelmapDiv > div > div.ol-overlaycontainer-stopevent > div.ol-overlay-container.ol-selectable")
        var count = document.querySelector("#mapViewOpenLayersPanelmapDiv > div > div.ol-overlaycontainer-stopevent > div.ol-overlay-container.ol-selectable > div > div.ol-popup-content > div");
        if (count !== null) {
            count = count.childElementCount;
            if (popup.style.display != "none" && count != lastCuont) {
                addImg();
            } else if (popup.style.display == "none") {
                lastCuont = 0;
            }
        }
    }, 100);
})();
