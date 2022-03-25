// ==UserScript==
// @name         Save Date GeCO
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      0.2
// @description  Salva la data dopo la assegnazione manuale
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/pratica/*/change/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const translateITmonth = (function(){
        let topDate = new Date(2000, 0, 1);
        const months_translate = [ ]
        for(let m=0;m<12;m++) {
            topDate.setMonth(m)
            months_translate[m] = { Italiano: new RegExp(topDate.toLocaleString('it-IT',{month:'long'}),'i'), English : topDate.toLocaleString('en-EN',{month:'long'}) }
        }
        function It_translate(dateIT) {
            for (let m of months_translate )
            { if ( m.Italiano.test(dateIT)) return dateIT.replace( m.Italiano, m.English ) }
            return dateIT
        }
        return It_translate
    })();

    function convertDate(inputFormat) {
        var d = new Date(inputFormat)
        return d.getTwoDigitDate() + "/" + d.getTwoDigitMonth() + "/" + d.getFullYear();
    }

    if (location.hash == "") {
        var dateLabel = document.querySelector("#pratica_form > div > fieldset:nth-child(2) > div.form-row.field-data_assegnazione.field-orario_assegnazione.field-note_assegnazione > div.fieldBox.field-data_assegnazione > div");
        var dateInput = document.querySelector("#id_data_assegnazione");

        var btn = document.querySelector("#content-main > ul > li:nth-child(2) > a");
        if (btn.textContent == "Assegnazione manuale") {
            btn.addEventListener('click', saveDate, false);
            function saveDate(evt) {
                let saveDate = new Date();
                if (dateInput != null) {
                    var dateParts = dateInput.value.split("/");
                    saveDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                } else if (dateLabel != null) {
                    saveDate = new Date(translateITmonth(dateLabel.textContent));
                }

                var link = document.querySelector("#content-main > ul > li:nth-child(2) > a");
                link.href += "#" + saveDate.getTime();

                btn.removeEventListener('click', saveDate);
            }
        }
    } else {
        var dateInsert = location.hash.substring(1);
        history.pushState("", document.title, window.location.pathname + window.location.search);
        document.body.setAttribute("style", "opacity: 0;");

        var d = new Date();
        var dateParts = (d.getTwoDigitDate() + "/" + d.getTwoDigitMonth() + "/" + d.getFullYear()).split("/");
        var nawDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

        if ((new Date(Number(dateInsert)) - nawDate) >= 0) {
            document.querySelector("#id_data_assegnazione").value = convertDate(Number(dateInsert));
            document.querySelector("#pratica_form > div > div.submit-row > input[type=submit]:nth-child(4)").click();
        }
    }
})();
