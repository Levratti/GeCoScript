// ==UserScript==
// @name         PerCent
// @namespace    https://github.com/gestionece/scriptGeCo
// @version      1.0
// @description  La percentuale delle varie LCL
// @author       Ruslan Dzyuba(Trorker)
// @match        https://it-forcebeatw.enelint.global/geocallfbi/w/Servlet?*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    window.PerCent = function (doc) {
        var body = '<div id="tabPerCent" class="w3-white" style="position:absolute;width:100%;height:100%;opacity:1;z-index:100;"> <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"> <!--<script src="https://www.w3schools.com/lib/w3.js"></script>--> <div id="startPage" class="w3-container"> <div class="w3-row w3-margin-top w3-margin-bottom"> <div class="w3-col m3"> <p></p> </div> <div class="w3-col m6"> <h2 id="pharStartPage">Ehhi non ti dimentichi nulla</h2> <p id="txtStartPage"><i>Per far funzionare questo bellisimo e utile script devi aggiungere LCL che ti interessano. Per farlo devi andare in "Controllo attività" -> "Riapilogo attività" e fare la ricerca di ogni LCL interressata.</i></p> <div class="w3-bar"><button class="w3-button w3-dark-grey" onclick="document.querySelector(\'#tabPerCent\').remove();">&laquo; Close</button></div> </div> <div class="w3-col m3"> <p></p> </div> </div> </div> <div id="selectCN" class="w3-container" style="display: none;"> <div class="w3-row w3-margin-top w3-margin-bottom"> <div class="w3-col m3"> <p></p> </div> <div class="w3-col m6"> <h2>Contratto</h2> <p><i>Elimina il contratto, premendo su "x":</i></p> <div class="w3-col w3-center w3-margin-bottom"> <ul id="addListCN" class="w3-ul w3-card-4"> <!-- Injection JavaScript --> </ul> </div> <p id="txtRemoveList" class="w3-margin-top" style="display: none;"><i>Agiungi il contratto, premendosu "+":</i></p> <div class="w3-col w3-center w3-margin-bottom"> <ul id="removeListCN" class="w3-ul w3-card-4"> <!-- Injection JavaScript --> </ul> </div> <div class="w3-bar"> <button class="w3-button w3-left w3-dark-grey" onclick="document.querySelector(\'#tabPerCent\').remove();">&laquo; Close</button> <button class="w3-button w3-left w3-light-grey" onclick="options();">Options</button> <button class="w3-button w3-right w3-green" onclick="calcPerCent();">Next&raquo;</button> </div> </div> <div class="w3-col m3"> <p></p> </div> </div> </div> <div id="perCentTab" class="w3-container w3-padding-64" style="display: none;"> <div class="w3-row w3-margin-top"> <div class="w3-col l3 m1 w3-hide-small"> <p></p> </div> <div class="w3-col l6 m10 s12"> <div id="listCnLCL" class="w3-center"> <!-- Injection JavaScript --> </div> <style> @media print { .noStamp { opacity: 0; display: none; } } </style> <div class="w3-bar noStamp"><button class="w3-button w3-left w3-dark-grey" onclick="clearAll();">&laquo; Back</button><button class="w3-button w3-right w3-green" onclick="Print();">Print&raquo;</button></div> </div> <div class="w3-col l3 m1 w3-hide-small"> <p></p> </div> </div> </div> <div id="optionsTab" class="w3-container" style="display: none;"> <div class="w3-row w3-margin-top w3-margin-bottom"> <div class="w3-col m3"> <p></p> </div> <div class="w3-col m6"> <div id="optionsList" class="w3-col w3-margin-bottom"> <!-- Injection JavaScript --> </div> <div class="w3-bar noStamp"><button class="w3-button w3-left w3-dark-grey" onclick="clearAll();">&laquo; Back</button></div> <div class="w3-col m3"> <p></p> </div> </div> </div> <div id="modalEditLCL" class="w3-modal"> <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:600px"> <div class="w3-center"><br> <span onclick="closeModaLCL();" class="w3-button w3-xlarge w3-hover-red w3-display-topright" title="Close Modal">&times;</span> </div> <div class="w3-container"> <h2 id="TEXTlabelLCL"> <!-- Injection JavaScript --> </h2> <div class="w3-section"> <label><b>Label</b></label> <input id="labelLCL" class="w3-input w3-border w3-margin-bottom" type="text" value="Comune" required> </div> <div class="w3-section"> <label><b>Tipo LCL</b></label> <select id="typeLCL" class="w3-select w3-border" style="height: 40px;" name="option"> <!--<option value="" disabled selected>Choose your option</option>--> <option value="MF">MF-TF</option> <option value="TF">TF-15/30</option> <option value="M2">M2</option> <option value="MF-R">MF-TF Ripassi</option> <option value="TF-R">TF-15/30 Ripassi</option> <option value="M2-R">M2 Ripassi</option> </select> </div> <div class="w3-section"> <label><b>Data fine</b></label> <input id="dateLCL" class="w3-input w3-border w3-margin-bottom" type="date" value="1998-08-08" required> </div> </div> <div class="w3-container w3-border-top w3-padding-16 w3-light-grey"> <div class="w3-bar noStamp"><button class="w3-button w3-left w3-red" onclick="closeModaLCL();">Cancel</button><button class="w3-button w3-right w3-green" id="ModalButtonSaveLCL">Save</button> </div> </div> </div> </div> </div> </div>';
        document.body.innerHTML = body + document.body.innerHTML;

        load();
    }

    window.load = function () {
        if (localStorage.getItem("PerCent")) {
            var Cn = JSON.parse(localStorage.getItem("PerCent"));

            if (Cn.length > 0) {
                for (let i = 0; i < Cn.length; i++) {
                    var CNexist = false;
                    for (let j = 0; j < document.querySelector("#addListCN").childElementCount; j++) {
                        if (document.querySelector("#addListCN").children[j].id == Cn[i].CN) {
                            CNexist = true;
                        }
                    }

                    if (CNexist == false) {
                        var element = document.createElement("li");
                        element.classList.add("w3-display-container"); //<i class="w3-tiny"> (update 3 day ago)</i>
                        element.id = Cn[i].CN;
                        element.innerHTML = '<b>' + Cn[i].CN + '</b><span onclick="changeCN(this.parentElement)" class="w3-button w3-transparent w3-display-right">&times;</span>';
                        document.querySelector("#addListCN").appendChild(element);
                    }
                }

                document.querySelector("#startPage").style.display = "none";
                document.querySelector("#selectCN").style.display = "block";
            }
        }
    }

    window.clearAll = function () {
        document.querySelector("#listCnLCL").innerHTML = "";
        document.querySelector("#optionsList").innerHTML = "";
        document.querySelector("#selectCN").style.display = "block";
        document.querySelector("#perCentTab").style.display = "none";
        document.querySelector("#optionsTab").style.display = "none";
    }

    window.calcPerCent = function () {
        var CnList = document.querySelector("#addListCN").children;
        console.log(CnList);

        for (let i = 0; i < CnList.length; i++) {

            var divObject = document.createElement('div');
            divObject.classList.add("w3-containery");
            divObject.classList.add("w3-light-grey");
            divObject.classList.add("w3-card-4");
            divObject.innerHTML = '<h2>' + CnList[i].id + '</h2><table id="lclPerCent" style="font-size: inherit;" class="w3-table-all w3-hoverable w3-margin-bottom"><thead><tr class="w3-green"><th>Label</th><th>LCL</th><th>Data scadenza</th><th>CON</th><th>AVV</th><th>TOT</th><th>%</th><th>Fuori penale</th><th>Premio</th></tr></thead><!-- Injection JavaScript --></table>';

            var Cn = JSON.parse(localStorage.getItem("PerCent"));
            Cn.sort(function (a, b) {
                return a.LCL - b.LCL;
            });
            var count = Object.keys(Cn).length
            for (let j = 0; j < count; j++) {
                if (Cn[j].CN == CnList[i].id) {
                    var row = document.createElement("tr");

                    var typeLCL = "NaN";
                    var penalePer = 92;
                    var premioPer = 96;
                    switch (Cn[j].Type) {
                        case "M2":
                            typeLCL = "M2";
                            penalePer = 80;
                            premioPer = 91;
                            break;
                        case "M2-R":
                            typeLCL = "M2 Ripassi";
                            penalePer = 0;
                            premioPer = 100;
                            break;
                        case "MF-R":
                            typeLCL = "MF-TF Ripassi";
                            penalePer = 0;
                            premioPer = 100;
                            break;
                        case "TF-R":
                            typeLCL = "TF-15/30 Ripassi";
                            penalePer = 0;
                            premioPer = 100;
                            break;
                        case "MF":
                            typeLCL = "MF-TF";
                            penalePer = 92;
                            premioPer = 96;
                            break;
                        case "TF":
                            typeLCL = "TF-15/30";
                            penalePer = 86;
                            premioPer = 96;
                            break;
                        default:
                            break;
                    }

                    var perCent = ((Cn[j].CON * 100) / (Cn[j].TOT - Cn[j].AV)).toFixed(2);
                    var sti92 = (((penalePer * (Cn[j].TOT - Cn[j].AV) / 100) - Cn[j].CON) + 1).toFixed(0);
                    var sti96 = (((premioPer * (Cn[j].TOT - Cn[j].AV) / 100) - Cn[j].CON) + 1).toFixed(0);
                    if (sti92 <= 0) sti92 = "OK";
                    if (sti96 <= 0) sti96 = "OK";

                    var typeHtml = "";
                    if (typeLCL != "NaN") {
                        typeHtml = '<i class="w3-tiny"> (' + typeLCL + ')</i>';
                    }

                    function convertDate(inputFormat) {
                        function pad(s) { return (s < 10) ? '0' + s : s; }
                        var d = new Date(inputFormat)
                        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
                    }

                    const diffTime = new Date(Cn[j].DateF) - new Date();
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                    var dataHtml = "";
                    if (diffDays > 7) {
                        dataHtml = '<i class="w3-tiny">' + diffDays + 'gg</i>'; //noStamp
                    } else if (diffDays <= 7 && diffDays > 0) {
                        dataHtml = '<i class="w3-tiny w3-text-red">' + diffDays + 'gg</i>'; //noStamp
                    } else {
                        dataHtml = '<span class="w3-text-orange">⚠</span>'; //noStamp
                    }

                    row.innerHTML = "<td>" + Cn[j].Label + "</td>" + "<td><b>" + Cn[j].LCL + typeHtml + "</b></td>" + "<td><b>" + convertDate(Cn[j].DateF) + "</b>" + dataHtml + "</td>" + "<td>" + Cn[j].CON + "</td>" + "<td>" + Cn[j].AV + "</td>" + "<td>" + Cn[j].TOT + "</td>" + "<td>" + perCent + "%</td>" + "<td><b>" + sti92 + '</b><i class="w3-tiny">(' + penalePer + '%)</i>' + "</td>" + "<td><b>" + sti96 + '</b><i class="w3-tiny">(' + premioPer + '%)</i>' + "</td>";
                    divObject.querySelector("#lclPerCent").appendChild(row);
                }
            }
            document.querySelector("#listCnLCL").appendChild(divObject);
        }

        document.querySelector("#selectCN").style.display = "none";
        document.querySelector("#perCentTab").style.display = "block";
    }

    window.deleteLCL = function (element) {
        if (localStorage.getItem("PerCent")) {
            var Cn = JSON.parse(localStorage.getItem("PerCent"));
            for (let i = 0; i < Cn.length; i++) {
                if (Cn[i].LCL == element.firstChild.textContent) {
                    Cn.splice(i, 1);
                    if (element.parentNode.childElementCount <= 2) {
                        element.parentNode.remove();
                        document.querySelector("#addListCN").innerHTML = "";
                        document.querySelector("#removeListCN").innerHTML = "";

                        if (localStorage.getItem("PerCent")) {
                            var CnLoad = JSON.parse(localStorage.getItem("PerCent"));

                            if (Cn.length > 0) {
                                for (let i = 0; i < CnLoad.length; i++) {
                                    var CNexist = false;
                                    for (let j = 0; j < document.querySelector("#addListCN").childElementCount; j++) {
                                        if (document.querySelector("#addListCN").children[j].id == CnLoad[i].CN) {
                                            CNexist = true;
                                        }
                                    }

                                    if (CNexist == false) {
                                        var elementLoad = document.createElement("li");
                                        elementLoad.classList.add("w3-display-container"); //<i class="w3-tiny"> (update 3 day ago)</i>
                                        elementLoad.id = CnLoad[i].CN;
                                        elementLoad.innerHTML = '<b>' + CnLoad[i].CN + '</b><span onclick="changeCN(this.parentElement)" class="w3-button w3-transparent w3-display-right">&times;</span>';
                                        document.querySelector("#addListCN").appendChild(elementLoad);
                                    }
                                }
                            }
                        }
                    }
                    element.remove();

                    if (document.querySelector("#optionsList").childElementCount <= 0) {
                        document.querySelector("#listCnLCL").innerHTML = "";
                        document.querySelector("#optionsList").innerHTML = "";
                        document.querySelector("#addListCN").innerHTML = "";
                        document.querySelector("#removeListCN").innerHTML = "";
                        document.querySelector("#pharStartPage").textContent = "Ehii che fai";
                        document.querySelector("#txtStartPage").innerHTML = "<i>Perché elimini tutto? Non hai altro da fare</i>";
                        document.querySelector("#perCentTab").style.display = "none";
                        document.querySelector("#optionsTab").style.display = "none";
                        document.querySelector("#selectCN").style.display = "none";
                        document.querySelector("#startPage").style.display = "block";
                    }
                }
            }
            localStorage.setItem("PerCent", JSON.stringify(Cn));
        }
    }

    window.options = function () {
        if (localStorage.getItem("PerCent")) {
            var Cn = JSON.parse(localStorage.getItem("PerCent"));

            Cn.sort(function (a, b) {
                return a.LCL - b.LCL;
            });

            var dataHtml = "";
            var time = "";

            for (let i = 0; i < Cn.length; i++) {
                var CNexist = false;
                for (let j = 0; j < document.querySelector("#optionsList").childElementCount; j++) {
                    if (document.querySelector("#optionsList").children[j].id == (Cn[i].CN + "O")) {
                        CNexist = true;

                        var elementLI = document.createElement("li");
                        elementLI.classList.add("w3-display-container");
                        elementLI.id = Cn[i].LCL;
                        elementLI.setAttribute("onclick", 'if(event.target === this) { modalEditLCL(this); }');

                        const diffTime = Math.abs(new Date(Cn[i].Date) - new Date());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
                        dataHtml = '<i class="w3-tiny noStamp"> (update ' + diffDays + ' day ago)</i>';
                        if (diffDays <= 0) {
                            time = new Date(Cn[i].Date).toLocaleTimeString();
                            dataHtml = '<i class="w3-tiny noStamp"> (update ' + time + ')</i>';
                        }

                        elementLI.innerHTML = '<b>' + Cn[i].LCL + '</b>' + dataHtml + '<span onclick="deleteLCL(this.parentElement)"class="w3-button w3-transparent w3-display-right w3-hover-red">×</span>';

                        document.getElementById(Cn[i].CN + "O").appendChild(elementLI);
                    }
                }

                if (CNexist == false) {
                    var element = document.createElement("ul");
                    element.classList.add("w3-ul");
                    element.classList.add("w3-card-4");
                    element.classList.add("w3-margin-top");
                    element.classList.add("w3-margin-bottom");//    onclick="if(event.target === this) { modalEditLCL(this); }"
                    element.id = Cn[i].CN + "O";
                    const diffTime = Math.abs(new Date(Cn[i].Date) - new Date());
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
                    dataHtml = '<i class="w3-tiny noStamp"> (update ' + diffDays + ' day ago)</i>';
                    if (diffDays <= 0) {
                        time = new Date(Cn[i].Date).toLocaleTimeString();
                        dataHtml = '<i class="w3-tiny noStamp"> (update ' + time + ')</i>';
                    }
                    element.innerHTML = '<!-- Injection JavaScript --><li><h2>' + Cn[i].CN + '</h2></li><li class="w3-display-container" id="' + Cn[i].LCL + '" onclick="if(event.target === this) { modalEditLCL(this); }"><b>' + Cn[i].LCL + '</b>' + dataHtml + '<span onclick="deleteLCL(this.parentElement)"class="w3-button w3-transparent w3-display-right w3-hover-red">×</span></li>';
                    document.querySelector("#optionsList").appendChild(element);
                }
            }

            document.querySelector("#startPage").style.display = "none";
            document.querySelector("#selectCN").style.display = "block";
        }


        document.querySelector("#selectCN").style.display = "none";
        document.querySelector("#optionsTab").style.display = "block";
    }

    window.changeCN = function (element) {
        if (element.parentElement.id == "addListCN" && document.querySelector('#addListCN').children.length > 1) {
            element.lastChild.innerHTML = "&plus;";
            document.querySelector("#removeListCN").appendChild(element);
        } else if (element.parentElement.id == "removeListCN") {
            element.lastChild.innerHTML = "&times;";
            document.querySelector("#addListCN").appendChild(element);
        }

        if (document.querySelector('#removeListCN').children.length > 0) {
            document.querySelector("#txtRemoveList").style.display = "block";
        } else {
            document.querySelector("#txtRemoveList").style.display = "none";
        }
    }

    window.dateToYMD = function (date) {
        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();
        return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
    }

    window.varElementIDlcl;
    window.modalEditLCL = function (element) {
        var Cn = JSON.parse(localStorage.getItem("PerCent"));

        Cn.sort(function (a, b) {
            return a.LCL - b.LCL;
        });

        for (let i = 0; i < Cn.length; i++) {
            if (Cn[i].LCL == element.id) {
                document.querySelector("#TEXTlabelLCL").innerHTML = element.id;
                document.querySelector("#labelLCL").value = Cn[i].Label;
                document.querySelector("#typeLCL").value = Cn[i].Type;
                document.querySelector("#dateLCL").value = dateToYMD(new Date(Cn[i].DateF));

                var elementIDlcl = document.querySelector('#ModalButtonSaveLCL');
                elementIDlcl.addEventListener('click', saveCalcTableLCL, false);
                elementIDlcl.myParam = element;
                window.varElementIDlcl = elementIDlcl;
            }
        }

        document.querySelector("#modalEditLCL").style.display = "block";
    }


    window.saveCalcTableLCL = function (evt) {
        if (localStorage.getItem("PerCent") != null) {
            var Cn = JSON.parse(localStorage.getItem("PerCent"));
            for (let i = 0; i < Cn.length; i++) {
                if (Cn[i].LCL == evt.currentTarget.myParam.id) {
                    Cn[i].Label = document.querySelector("#labelLCL").value;
                    Cn[i].Type = document.querySelector("#typeLCL").value;
                    Cn[i].DateF = new Date(document.querySelector("#dateLCL").value);
                }
            }
        }

        localStorage.setItem("PerCent", JSON.stringify(Cn));

        document.querySelector("#modalEditLCL").style.display = "none";
        window.varElementIDlcl.removeEventListener('click', saveCalcTableLCL);
    }

    window.closeModaLCL = function () {
        document.querySelector("#modalEditLCL").style.display = "none";
    }

    window.Print = function () {
        var resultList = document.querySelector("#listCnLCL").innerHTML;

        var a = window.open('', '', 'width=733,height=454');
        a.document.open("text/html");
        a.document.write('<html><head><title>');
        a.document.write('PerCent');
        a.document.write('</title>');
        a.document.write('<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">');
        a.document.write('<style>body{opacity: 0}@media print { body{opacity: 1; width: 210mm}}</style>');
        a.document.write('</head><body style="overflow: hidden;">');
        a.document.write(resultList);
        a.document.write("</body></html>");

        a.document.close(); // necessary for IE >= 10
        a.focus(); // necessary for IE >= 10*/

        setTimeout(function () { a.print(); a.close(); }, 600);
    }

    var Result = false;
    var regexCont = /Contratto:\s\d{10}/gm;
    var regexLCL = /LCL:\s\d{10}/gm;
    setInterval(function(){
        var idLCL = document.querySelector("div[id^='AFRAME_']");
        if (idLCL != null) {



            if (document.querySelector("#btnPerCent") == null) {
                var btn = document.createElement("button");
                btn.setAttribute("type", "BUTTON");
                btn.setAttribute("onclick", 'javascript:PerCent(document); console.log(window)');
                btn.setAttribute("id", "btnPerCent");
                btn.setAttribute("class", "but "); /butRO <-- add class disable btn/
                btn.innerHTML = '<div>PerCent</div>';

                var contBtn = document.querySelectorAll("div[id^='AFRAME_'].taskBoxContainer")[1];
                contBtn.insertBefore(btn, contBtn.childNodes[0]);
            }


            var dataLCL = idLCL.querySelector("tr:nth-child(1) > td > div > div.left.summaryContainer.filledFieldsSummaryContainer > span");
            if(Result == false && dataLCL != null) {
                Result = true;
                dataLCL = dataLCL.textContent;

                if (regexCont.test(dataLCL) && regexLCL.test(dataLCL)) {

                    var contrattoName = /Contratto:\s\d{10}/gm.exec(dataLCL)[0];
                    var lclName = /LCL:\s\d{10}/gm.exec(dataLCL)[0];

                    var CONTRATTO = contrattoName.substr(contrattoName.length - 10);
                    var LCL = lclName.substr(lclName.length - 10);
                    var CON = idLCL.querySelector("div > div > div > table > tbody > tr.tvRow.tvRowOdd > td:nth-child(2)");
                    var AV = idLCL.querySelector("div > div > div > table > tbody > tr.tvRow.tvRowOdd > td:nth-child(3)");
                    var TOT = idLCL.querySelector("div > div > div > table > tbody > tr.tvRow.tvRowOdd > td.tvCell.tvCellGray");
                    if (CON != null && AV != null && TOT != null) {
                        CON = CON.textContent;
                        AV = AV.textContent;
                        TOT = TOT.textContent;

                        let lcl = [{
                            "CN": CONTRATTO,
                            "LCL": LCL,
                            "Date": new Date(),
                            "TOT": TOT,
                            "CON": CON,
                            "AV": AV,
                            "Label": "Comune",
                            "DateF": new Date(),
                            "Type": "MF",
                        }];


                        var perCent = ((CON * 100) / (TOT - AV)).toFixed(2);
                        var sti92 = (((92 * (TOT - AV) / 100) - CON) + 1 ).toFixed(0);
                        var sti96 = (((96 * (TOT - AV) / 100) - CON) + 1 ).toFixed(0);
                        if (sti92 <= 0) sti92 = "DIREI CHE SEI GIA A 92%"
                        if (sti96 <= 0) sti96 = "Siamo al PREMIO"
                        alert("CONTRATTO: " + CONTRATTO + "\nLCL: " + LCL + "\nPercentuale LCL: " + perCent +"%\nPer arrivare al 92% sevono: " + sti92 + "CE\nPer arrivare al 96% sevono: " + sti96 + "CE");

                        if (localStorage.getItem("PerCent") != null) {
                            var Cn = JSON.parse(localStorage.getItem("PerCent"));
                            var count = Object.keys(Cn).length
                            var LCLexist = false;
                            for (let i = 0; i < count; i++) {
                                if (Cn[i].LCL == LCL) {
                                    LCLexist = true;

                                    var sumT = Number(CON) + Number(AV);
                                    if(sumT != Number(TOT)) {
                                        Cn[i].TOT = TOT;
                                    }
                                    Cn[i].CON = CON;
                                    Cn[i].AV = AV;
                                    Cn[i].Date = new Date();

                                    localStorage.setItem("PerCent", JSON.stringify(Cn));
                                    //alert("update CONTRATTO: " + CONTRATTO + "\n" + "update LCL: " + LCL + "\n" + "Percentuale LCL: " + perCent +"%" + "\n" + "Per arrivare al 92% sevono: " + sti92 + "CE");
                                    console.log("[!] update LCL");

                                }
                            }
                            if (LCLexist == false) {
                                LCLexist = false;
                                let lclNew = {
                                    "CN": CONTRATTO,
                                    "LCL": LCL,
                                    "Date": new Date(),
                                    "TOT": TOT,
                                    "CON": CON,
                                    "AV": AV,
                                    "Label": new Date().toLocaleString('default', { month: 'long' }),
                                    "DateF": new Date(),
                                    "Type": "-",
                                };
                                Cn.push(lclNew)
                                localStorage.setItem("PerCent", JSON.stringify(Cn));
                                //alert("update CONTRATTO: " + CONTRATTO + "\n" + "add LCL: " + LCL + "\n" + "Percentuale LCL: " + perCent +"%" + "\n" + "Per arrivare al 92% sevono: " + sti92 + "CE");
                                console.log("[!] add LCL");
                            }
                        } else {
                            localStorage.setItem("PerCent", JSON.stringify(lcl));
                            //alert("add CONTRATTO: " + CONTRATTO + "\n" + "add LCL: " + LCL + "\n" + "Percentuale LCL: " + perCent +"%" + "\n" + "Per arrivare al 92% sevono: " + sti92 + "CE");
                            console.log("[!] add CONTRATTO");
                        }

                        //localStorage.setItem(CONTRATTO, JSON.stringify(lcl));

                        console.log(localStorage);
                        //console.log(JSON.parse(localStorage.getItem(CONTRATTO)));
                    }
                }
            }
        } else {
            //ResultExist = false;
        }
    }, 100);
})();
