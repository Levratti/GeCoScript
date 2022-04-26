// ==UserScript==
// @name         Send GdM to SENSI
// @namespace    https://github.com/Levratti/GeCoScript
// @version      0.1
// @description  Flaggare i contatori spediti alla SENSI
// @author       Ruslan Dzyuba(Trorker)
// @match        https://geco.impresalevratti.it/admin/backend/contatore/?contratto__id__exact=f26bf7da-589f-414b-b5c1-baa39f4c3129
// @icon         https://www.google.com/s2/favicons?domain=impresalevratti.it_DELETE
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

    window.importList = function () {

        let listCE = null;
        let senData = null;

        var saveList = prompt("Inserire la lista dei GdM consegnati:", "");
        if (saveList == null || saveList == "") {
            localStorage.removeItem("listCE");
            localStorage.removeItem("DataConsegna");
        } else {
            listCE = saveList.split("\r\n");
            localStorage.setItem("listCE", JSON.stringify(listCE));

            var options = {'day': '2-digit', 'month': '2-digit', 'year': 'numeric'};
            var date = new Date().toLocaleDateString('it-IT', options);

            var setData = prompt("Inserire la data di consegnati:\n(Se non verra inserito nulla, verra visualizzato " + date + ")", "");
            if (setData == null || setData == "") {
                localStorage.setItem("DataConsegna", date);
                senData = date;
            } else {
                localStorage.setItem("DataConsegna", senData);
                senData = senData;
            }

            document.querySelector("#btnImportList").textContent = "Send to Sensi (" + listCE.length + ")";
            window.setCE(listCE, senData);
        }
    }

    window.setCE = async function(list, data) {
        function getCookie(name) {
            var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) return match[2];
        }

        function sendData(servURL, params, method){
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", servURL);
                xhr.onload= (event) => resolve(event.target);

                var form = document.createElement("form");
                form.setAttribute("method", method);
                form.setAttribute("id", "myFormId");
                form.setAttribute("action", servURL);
                for(var key in params) {
                    var hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", key);
                    hiddenField.setAttribute("value", params[key]);
                    form.appendChild(hiddenField);
                }
                document.body.appendChild(form);


                var formData = new FormData(document.getElementById("myFormId"));
                xhr.send(formData);
            })
        }

        var options = {
            csrfmiddlewaretoken: "<Inject JavaScript>",
            operatore: "",
            latitudine_presa_in_carico: "",
            longitudine_presa_in_carico: "",
            guasto: "on",
            pallet: "4284d863-db7e-4721-a4f6-7e91f10ba560",
            data_resa_guasto_0: "26/04/2022",
            data_resa_guasto_1: "00:00:00",
            _save: "Salva",
            //_continue: "Salva e continua le modifiche"
        }

        options.csrfmiddlewaretoken = getCookie("csrftoken");
        options.data_resa_guasto_0 = data;

        list.forEach( async (CE, index) => {

            try {
                var link = "https://geco.impresalevratti.it/admin/backend/contatore/?q=" + CE;
                var htmlObject = document.createElement('html');
                htmlObject.innerHTML = window.httpGet(link);
                var idCE = htmlObject.querySelector("#result_list > tbody > tr > td.action-checkbox > input").value;

                var urlPost = "https://geco.impresalevratti.it/admin/backend/contatore/" + idCE + "/change/";
                var result = await sendData(urlPost, options,'post');


                if (result.status == 200) {
                    console.log("Il Contatore " + CE + " è stato modificato con successo.")
                    document.querySelector("#btnImportList").textContent = "Send to Sensi (" + (list.length - index - 1) + ")";
                }
            } catch (error) {
                console.log(error);
            }

            //document.querySelector("#btnImportList").textContent = "Send to Sensi"; //SALTA FUORI OGNI VOLTA CHE ARRIVA LA CONFERMA
            //alert("The End");
        });
    }


    var btnS = document.createElement("li");
    btnS.innerHTML = '<a href="javascript:importList();" id="btnImportList" class="historylink">Send to Sensi</a>';

    var contBtnS = document.querySelector("#content-main > ul");
    contBtnS.insertBefore(btnS, contBtnS.childNodes[0]);
})();
