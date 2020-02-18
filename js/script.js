// Elementen cache
const start = document.getElementsByClassName("start")[0];
const startBack = document.getElementsByClassName("startBack")[0];
const poll = document.getElementsByClassName("poll")[0];
const progress = document.getElementsByClassName("progress")[0];

//Globale index voor het selecteren van data
var questionIndex = -1;

//answers object die per vraag het antwoord bijhoud
var answers = {};

//temp array die de aangeklikte 'belangrijke' statements opslaat welke vervolgens in die answers word opgeslagen als array
var important = [];

//temp array die de aangeklikte partijen opslaat welke vervolgens in die answers word opgeslagen als array
var selectParties = [];

//score object die bijhoud en count wanneer er een overeenkomt is tussen jouw antwoord en de positie van de partij
var score = {
	"PVV" : 0,
	"SP" : 0,
	"D66" : 0,
	"GroenLinks" : 0,
	"Partij voor de Dieren" : 0,
	"50Plus" : 0,
	"VNL" : 0,
	"Nieuwe Wegen" : 0,
	"Forum voor Democratie" : 0,
	"De Burger Beweging" : 0,
	"Vrijzinnige Partij" : 0,
	"Piratenpartij" : 0,
	"Libertarische Partij" : 0,
	"Lokaal in de Kamer" : 0,
	"Niet Stemmers" : 0,
	"VVD" : 0,
	"PvdA" : 0,
	"CDA" : 0,
	"ChristenUnie" : 0,
	"SGP" : 0,
	"OndernemersPartij" : 0,
	"DENK" : 0,
	"Artikel 1" : 0
};

//object wat de inhoud krijgt van het score object, maar dan gesorteerd van hoog naar laag
var sortedScore = {};

//initialiseren van het object answers voor de include functie (deze geeft anders terug dat deze index niet bestaat)
answers[30] = [];
answers[31] = [];

//opent of sluit de modal aan de hand van de parameter
function toggleModal(config){
	config == "open" ? opinionModal.style.display='block' : opinionModal.style.display='none' ;
}

//Seed de modal content div met de toelichtingen van de partijen per statement.
function seedOpinion(index){
	for(i=0;i<23;i++){
		//variabel die bepaald aan welke div append word aan de hand van pro, contra of none
		var appendParent;
		subjects[index]["parties"][i]["position"] == "pro" ? appendParent = 0 : "";
		subjects[index]["parties"][i]["position"] == "contra" ? appendParent = 2 : ""; 
		subjects[index]["parties"][i]["position"] == "none" ? appendParent = 1 : "";

		//dynamisch creeeren van de rijen
		var wrapper = document.createElement("div");
		wrapper.classList.add('w3-container', 'opinionRow');
		wrapper.id = "opinionRow";

		var btn = document.createElement("button");
		btn.setAttribute("onclick", "openAccordion(this.innerHTML)");
		btn.classList.add('w3-button', 'w3-block');
		btn.style.borderBottom = "1px solid black";
		btn.style.background = "none";
		btn.style.color = "black";
		btn.style.textAlign = "left";
		btn.innerHTML = subjects[index]["parties"][i]["name"];
		

		var opinion = document.createElement("div");
		opinion.setAttribute("id", subjects[index]["parties"][i]["name"]);
		opinion.innerHTML = subjects[index]["parties"][i]["opinion"];
		opinion.classList.add('w3-hide', 'w3-container', 'w3-animate-opacity');


		wrapper.appendChild(btn);
		wrapper.appendChild(opinion);
		document.getElementsByClassName("partyOpinion")[appendParent].appendChild(wrapper);
	}
}

//functie die bepaald wat er per statement voor tekst te zien is
function seedStatement(index){
	statement.innerHTML = questionIndex+1 + ". " + subjects[index]["title"];
	comment.innerHTML = subjects[index]["statement"];

	for(i=0;i<3;i++){
		var parent = document.getElementsByClassName("partyOpinion")[i];

		while (parent.childNodes.length > 2) {
		    parent.removeChild(parent.lastChild);
		}
	}
	//aanroepen van bovenstaande functie om de modal te vullen met toelichtingen
	seedOpinion(index);
}

//functie die de toelichten per partij opent als een 'accordion'
function openAccordion(party){
	var x = document.getElementById(party);

	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

//functie die bepaald wat er gebeurd wanneer je op terug klikt aan de hand van de vraag index
function back(){

	switch(questionIndex) {

		//Wanneer je bij vraag 1 bent, word het statement scherm verborgen en het start scherm getoond
		case 0:
			document.getElementById("progressBar").style.width = "0%";
			startBack.style.display = "block";
			poll.style.display = "none";
			questionIndex--;
		break;

		//Wanneer je bij de belangrijke stellingen bent, word het statement scherm verborgen en zal je naar vraag 30 gaan.
		case 30:
			questionIndex--;

			//Haalt 1 van de score af voor de vraag, zodat deze weer opgeteld kan worden aan de hand van je nieuwe keuze.
			for(let x=0;x<subjects[0]["parties"].length;x++){
				switch(subjects[questionIndex]["parties"][x]["position"]){
					case "pro":
						score[subjects[questionIndex]["parties"][x]["name"]] != 0  && answers[questionIndex] == "EENS" ?
						score[subjects[questionIndex]["parties"][x]["name"]]-- : "" ;
					break;

					case "contra":
						score[subjects[questionIndex]["parties"][x]["name"]] != 0  && answers[questionIndex] == "ONEENS" ?
						score[subjects[questionIndex]["parties"][x]["name"]]-- : "" ;
					break;

					case "none":
						score[subjects[questionIndex]["parties"][x]["name"]] != 0  && answers[questionIndex] == "GEEN" ?
						score[subjects[questionIndex]["parties"][x]["name"]]-- : "" ;
					break;

					default:
					break;
				}
			}

			//Styling voor het verbergen van de belangrijke stellingen en het tonen van de vraag
			seedStatement(questionIndex);
			document.getElementsByClassName("statementControls")[0].style.display = "block";
			document.getElementsByClassName("opinion")[0].style.display = "block";
			document.getElementsByClassName("selectBoxes")[0].style.display = "none";
			document.getElementsByClassName("statementWrapper")[0].style.marginBottom = "7.5em";
			document.getElementsByClassName("contentWrapper")[0].style.minHeight = "850px";

			//Styling voor het tonen van de vraagkeuze
			EENS.removeAttribute("style");
			GEEN.removeAttribute("style");
			ONEENS.removeAttribute("style");

			answers[questionIndex] != "SKIP" ?
			document.getElementById(answers[questionIndex]).style.background = "#04b4dc" : "" ;

			var node = document.getElementsByClassName("selectBoxes")[0];
			while (node.firstChild) {
				node.removeChild(node.firstChild);
			}
			
		break;

		//Wanneer je bij de partijen bent, word het statement scherm getoont
		case 31:
			statement.innerHTML = "Zijn er onderwerpen die u extra belangrijk vindt?";
			comment.innerHTML = "Aangevinkte stellingen tellen extra mee bij het berekenen van het resulaat.";
			document.getElementsByClassName("statementControls")[0].style.display = "none";
			document.getElementsByClassName("opinion")[0].style.display = "none";
			document.getElementsByClassName("selectBoxes")[0].style.display = "flex";
			document.getElementsByClassName("statementWrapper")[0].style.marginBottom = "0";
			document.getElementsByClassName("contentWrapper")[0].style.minHeight = "200px";

			var node = document.getElementsByClassName("selectBoxes")[0];
			while (node.firstChild) {
				node.removeChild(node.firstChild);
			}

			questionIndex--;
			seedImportant();
		break;

			case 32:
			//Opnieuw initialiseren van het sortedScore object, zodat deze opnieuw gesorteerd aangevuld kan worden, in plaats van dat de value alleen aangepast word.
			sortedScore = {};

			document.getElementsByClassName("selectBoxes")[0].style.display = "flex";
			document.getElementsByClassName("contentWrapper")[0].style.display = "block";
			document.getElementsByClassName("results")[0].style.display = "none";

			var node = document.getElementsByClassName("results")[0];
			while (node.firstChild) {
				node.removeChild(node.firstChild);
			}

			questionIndex--;
		break;

		default:
			//vullen van de progressBar bovenaan de vragen. dit gaat per vraag met 3.3 procent
			var increase = (questionIndex) * 3.3;
			document.getElementById("progressBar").style.width = increase + "%";

			questionIndex--;
			seedStatement(questionIndex);

			EENS.removeAttribute("style");
			GEEN.removeAttribute("style");
			ONEENS.removeAttribute("style");

			answers[questionIndex] != "SKIP" ?
			document.getElementById(answers[questionIndex]).style.background = "#04b4dc" : "" ;

			//Haalt 1 van de score af voor de vraag, zodat deze weer opgeteld kan worden aan de hand van je nieuwe keuze.
			for(let x=0;x<subjects[0]["parties"].length;x++){
				switch(subjects[questionIndex]["parties"][x]["position"]){
					case "pro":
						score[subjects[questionIndex]["parties"][x]["name"]] != 0  && answers[questionIndex] == "EENS" ?
						score[subjects[questionIndex]["parties"][x]["name"]]-- : "" ;
					break;

					case "contra":
						score[subjects[questionIndex]["parties"][x]["name"]] != 0  && answers[questionIndex] == "ONEENS" ?
						score[subjects[questionIndex]["parties"][x]["name"]]-- : "" ;
					break;

					case "none":
						score[subjects[questionIndex]["parties"][x]["name"]] != 0  && answers[questionIndex] == "GEEN" ?
						score[subjects[questionIndex]["parties"][x]["name"]]-- : "" ;
					break;

					default:
					break;
				}
			}
		break;
	}
}

//functie die bepaald wat er gebeurd als er op een button word geklikt om verder te gaan aan de hand van de vraagindex
function next(choice){

	switch(questionIndex){

		//Van het startscherm naar vraag 1
		case -1:
			startBack.style.display = "none";
			poll.style.display = "block";
			questionIndex++;
			seedStatement(questionIndex);
		break;

		case 29:
		//Wanneer je vraag 30 voorbij bent word de status bar breedte op 100% gezet, anders zou deze op "99,nog wat" staan
		document.getElementById("progressBar").style.width = "100%";
		answers[questionIndex] = choice;

		//Telt 1 op bij de score aan de hand van een overeenkomst in de positie van de partij en jouw keuze
		for(let x=0;x<subjects[0]["parties"].length;x++){
			switch(subjects[questionIndex]["parties"][x]["position"]){
				case "pro":
					answers[questionIndex] == "EENS" ?
					score[subjects[questionIndex]["parties"][x]["name"]]++ : "" ;
				break;

				case "contra":
					answers[questionIndex] == "ONEENS" ?
					score[subjects[questionIndex]["parties"][x]["name"]]++ : "" ;
				break;

				case "none":
					answers[questionIndex] == "GEEN" ?
					score[subjects[questionIndex]["parties"][x]["name"]]++ : "";
				break;

				default:
				break;
			}
		}

		questionIndex++;
		statement.innerHTML = "Zijn er onderwerpen die u extra belangrijk vindt?";
		comment.innerHTML = "Aangevinkte stellingen tellen extra mee bij het berekenen van het resulaat.";
		document.getElementsByClassName("statementControls")[0].style.display = "none";
		document.getElementsByClassName("opinion")[0].style.display = "none";
		document.getElementsByClassName("selectBoxes")[0].style.display = "flex";
		document.getElementsByClassName("statementWrapper")[0].style.marginBottom = "0";
		document.getElementsByClassName("contentWrapper")[0].style.minHeight = "200px";
		seedImportant();

		break;

		//van belangrijke stellingen naar partijen die je mee wilt nemen
		case 30:
		questionIndex++;

		statement.innerHTML = "Welke partijen wilt u meenemen in het resultaat?";
		comment.innerHTML = "U kunt kiezen voor zittende partijen, die nu in de Tweede Kamer vertegenwoordigd zijn. Daarbij nemen we ook de partijen mee die in de peilingen op minimaal één zetel staan. U kunt alle partijen meenemen en u kunt een eigen selectie maken van tenminste drie partijen.";

		const node = document.getElementsByClassName("selectBoxes")[0];
		while (node.firstChild) {
			node.removeChild(node.firstChild);
		}

		seedParties();
		break;

		//van partijen die u mee wilt nemen naar het resultaat.
		case 31:
			//wanneer je minder dan 3 partijen geselecteerd hebt, zal je niet verder gaan en komt er een melding in beeld
			if(selectParties.length < 3){
				error.style.display = "block";
				errorContent.innerHTML = "Selecteer op zijn minst 3 partijen!";

				setTimeout(function(){
					error.style.display = "none";
				}, 1500);
			}else{
				answers[questionIndex] = selectParties;
				document.getElementsByClassName("selectBoxes")[0].style.display = "none";
				document.getElementsByClassName("contentWrapper")[0].style.display = "none";
				document.getElementsByClassName("results")[0].style.display = "block";
				questionIndex++;
				sortProperties(score);
				seedResults();
			}
		break;

		default:
		var increase = (questionIndex + 1) * 3.3;
		document.getElementById("progressBar").style.width = increase + "%";
		

		answers[questionIndex] = choice;
		
		EENS.removeAttribute("style");
		GEEN.removeAttribute("style");
		ONEENS.removeAttribute("style");

		//Telt 1 op bij de score aan de hand van een overeenkomst in de positie van de partij en jouw keuze		
		for(let x=0;x<subjects[0]["parties"].length;x++){
			switch(subjects[questionIndex]["parties"][x]["position"]){
				case "pro":
					answers[questionIndex] == "EENS" ?
					score[subjects[questionIndex]["parties"][x]["name"]]++ : "" ;
				break;

				case "contra":
					answers[questionIndex] == "ONEENS" ?
					score[subjects[questionIndex]["parties"][x]["name"]]++ : "" ;
				break;

				case "none":
					answers[questionIndex] == "GEEN" ?
					score[subjects[questionIndex]["parties"][x]["name"]]++ : "";
				break;

				default:
				break;
			}
		}

		questionIndex++;
		seedStatement(questionIndex);

		break;
	}
}

//on mouse enter event voor het weergeven van de stelling informatie
function showTooltip(index){
		document.getElementsByClassName("tooltiptext")[index.getAttribute("data-value")].style.visibility = "visible";
}

//on mouse out event voor het weergeven van de stelling informatie
function hideTooltip(index){
		document.getElementsByClassName("tooltiptext")[index.getAttribute("data-value")].style.visibility = "hidden";
}

//functie voor het vullen van de interface van belangrijke stellingen
function seedImportant(){
	for(x=0;x<30;x++){
		var wrapper = document.createElement("div");
		wrapper.classList.add("w3-container", "selectRow", "w3-animate-opacity");
		wrapper.style.width = "300px";
		wrapper.style.lineHeight = "50px";
		wrapper.style.borderBottom = "1px solid black";
		wrapper.style.cursor = "pointer";
		wrapper.setAttribute("data-value", subjects[x]["title"]);
		wrapper.setAttribute("onclick", "saveImportant(this)");

		var span = document.createElement("span");
		span.innerHTML = "<i class='far fa-square'></i>";
		span.style.float = "left";
		span.style.marginRight = "1em";
		span.style.fontSize = "1em";

		var text = document.createElement("p");
		text.style.display = "inline-block";
		var node = document.createTextNode(subjects[x]["title"]);
		text.appendChild(node);

		var question = document.createElement("i");
		question.classList.add("tooltip", "fas", "fa-question-circle", "w3-animate-opacity");
		question.style.display = "inline-block";
		question.style.float = "right";
		question.style.paddingTop = "1.5em";

		question.setAttribute("data-value", x);
		question.setAttribute("onmouseenter", "showTooltip(this)");
		question.setAttribute("onmouseout", "hideTooltip(this)");

		var tooltip = document.createElement("p");
		tooltip.classList.add("tooltiptext", "w3-animate-opacity");
		tooltip.innerHTML = subjects[x]["statement"];

		if(answers[30].includes(subjects[x]["title"])){
			wrapper.classList.add('selected');
			text.style.color = "#04b4dc";
			span.innerHTML = "<i class='far fa-check-square'></i>";
		}

		question.appendChild(tooltip);

		wrapper.appendChild(span);
		wrapper.appendChild(text);
		wrapper.appendChild(question);
		document.getElementsByClassName("selectBoxes")[0].appendChild(wrapper);
	}
		var btn = document.createElement("button");
		btn.innerHTML = "GA VERDER";
		btn.classList.add("continue");
		btn.style.margin = "1em";
		btn.style.width = "300px;";
		btn.setAttribute("onclick", "next()");
		document.getElementsByClassName("selectBoxes")[0].appendChild(btn);
}

//functie die de aangeklikte stelling opslaat in important en de score opteld bij de partijen die het ook eens zijn
function saveImportant(statement){
	var elem = statement.firstChild.firstChild;
	statement.classList.toggle("selected");

	if(statement.classList.contains('selected') ){
		elem.classList.remove("far", "fa-square");
		elem.classList.add("far", "fa-check-square"); 
		statement.firstChild.nextSibling.style.color = "#04b4dc";
		important.push(statement.firstChild.nextSibling.innerHTML);

		for(var i = 0; i <= important.length ; i++){
			for(var x = 0; x < 30; x++){
				if(important[i] == subjects[x]['title']){
					for (var a = 0; a < 23; a++){
						if(subjects[x]['parties'][a]['position'] == "pro"){
							score[subjects[x]['parties'][a]['name']]++;
						}
					}
				}
			}
		}

	}else{
		elem.classList.remove("far", "fa-check-square"); 
		elem.classList.add("far", "fa-square");
		statement.firstChild.nextSibling.style.color = "black";

		var index = important.indexOf(statement.firstChild.nextSibling.innerHTML);
		if (index > -1) {
			var removed = important.splice(index, 1);
		}

		for(var i = 0; i <= removed.length ; i++){
			for(var x = 0; x < 30; x++){
				if(removed[i] == subjects[x]['title']){
					for (var a = 0; a < 23; a++){
						if(subjects[x]['parties'][a]['position'] == "pro"){
							score[subjects[x]['parties'][a]['name']]--;
						}
					}
				}
			}
		}
	}
	answers[questionIndex] = important;
}

//functie voor het vullen van de interface voor de partijen die u mee wilt nemen in de resultasten
function seedParties(){
	for ( var key in score ) {

		var wrapper = document.createElement("div");
		wrapper.classList.add("w3-container", "selectRow", "w3-animate-opacity");
		wrapper.style.width = "300px";
		wrapper.style.lineHeight = "50px";
		wrapper.style.borderBottom = "1px solid black";
		wrapper.style.cursor = "pointer";
		wrapper.setAttribute("data-value", key);
		wrapper.setAttribute("onclick", "saveParties(this)");

		var span = document.createElement("span");

		span.innerHTML = "<i class='far fa-square'></i>";
		span.style.float = "left";
		span.style.marginRight = "1em";
		span.style.fontSize = "1em";

		var text = document.createElement("p");
		text.style.display = "inline-block";
		var node = document.createTextNode(key);

		if(answers[31].includes(key)){
			wrapper.classList.add('selected');
			text.style.color = "#04b4dc";
			span.innerHTML = "<i class='far fa-check-square'></i>";
		}
		
		text.appendChild(node);
		wrapper.appendChild(span);
		wrapper.appendChild(text);
		document.getElementsByClassName("selectBoxes")[0].appendChild(wrapper);
	}
	var btn = document.createElement("button");
	btn.innerHTML = "GA VERDER";
	btn.classList.add("continue", "w3-animate-opacity");
	btn.style.margin = "1em";
	btn.style.width = "300px";
	btn.setAttribute("onclick", "next()");
	document.getElementsByClassName("selectBoxes")[0].appendChild(btn);

	for(var i = 0; i < 3 ; i++){
		var wrapper = document.createElement("div");
		wrapper.classList.add("w3-container", "selectRow", "w3-animate-opacity");
		wrapper.style.width = "300px";
		wrapper.style.lineHeight = "50px";
		wrapper.style.cursor = "pointer";

		

		var span = document.createElement("span");
		span.innerHTML = "<i class='far fa-square'></i>";
		span.style.float = "left";
		span.style.marginRight = "1em";
		span.style.fontSize = "1em";

		var text = document.createElement("p");
		text.style.display = "inline-block";
		
		//aanmaken van de knoppen om meerdere partijen te selecteren
		switch(i){
			case 0:
				wrapper.setAttribute("onclick", "selectMultiple('all')");
				var node = document.createTextNode("Selecteer alle partijen");
			break;

			case 1:
				wrapper.setAttribute("onclick", "selectMultiple('seats')");
				var node = document.createTextNode("Selecteer zittende partijen");
			break;

			case 2:
				wrapper.setAttribute("onclick", "selectMultiple('delete')");
				var node = document.createTextNode("Verwijder selectie");
			break;
		}

		text.appendChild(node);
		wrapper.appendChild(span);
		wrapper.appendChild(text);
		document.getElementsByClassName("selectBoxes")[0].appendChild(wrapper);
	}
}

// functie voor het opslaan van de partijen die u mee wilt nemen in de resultaten
function saveParties(selectParty){
	var elem = selectParty.firstChild.firstChild;
	selectParty.classList.toggle("selected");

	if(selectParty.classList.contains('selected') ){
		elem.classList.remove("far", "fa-square");
		elem.classList.add("far", "fa-check-square"); 
		selectParty.firstChild.nextSibling.style.color = "#04b4dc";
		selectParties.push(selectParty.firstChild.nextSibling.innerHTML);
	}else{
		elem.classList.remove("far", "fa-check-square"); 
		elem.classList.add("far", "fa-square");
		selectParty.firstChild.nextSibling.style.color = "black";

		var index = selectParties.indexOf(selectParty.firstChild.nextSibling.innerHTML);
		if (index > -1) {
		  selectParties.splice(index, 1);
		}
	}

	answers[questionIndex] = selectParties;
}

//functie voor het ophalen van de juiste backgrounds per partij naam
function getLogo(input){
	switch(input){
		case "PVV": 
			return "img/pvv.svg"; 
		break;

		case "SP":
			return "img/sp.svg";
		break;

		case "D66":
			return "img/d66.svg";
		break;

		case "GroenLinks":
			return "img/groenlinks.svg";
		break;

		case "Partij voor de Dieren":
			return "img/pvdd.svg";
		break;

		case "50Plus":
			return "img/50plus.svg";
		break;

		case "VNL":
			return "img/vnl.svg";
		break;

		case "Nieuwe Wegen":
			return "img/nieuwewegen.png";
		break;

		case "Forum voor Democratie":
			return "img/forumvoordemocratie.png";
		break;

		case "De Burger Beweging":
			return "img/burgerbeweging.png";
		break;

		case "Vrijzinnige Partij":
			return "img/vrijzinnigepartij.png";
		break;

		case "Piratenpartij":
			return "img/piratenpartij.svg";
		break;

		case "Libertarische Partij":
			return "img/libertarischepartij.svg";
		break;

		case "Lokaal in de Kamer":
			return "img/lokaalindekamer.svg	";
		break;

		case "Niet Stemmers":
			return "img/nietstemmers.svg";
		break;

		case "VVD":
			return "img/vvd.svg";
		break;

		case "PvdA":
			return "img/pvda.svg";
		break;

		case "CDA":
			return "img/cda.svg";
		break;

		case "ChristenUnie":
			return "img/christenunie.svg";
		break;

		case "SGP":
			return "img/sgp.svg";
		break;

		case "OndernemersPartij":
			return "img/ondernemerspartij.png";
		break;

		case "DENK":
			return "img/denk.svg";
		break;

		case "Artikel 1":
			return "img/artikel1.png";
		break;
	}
}

//functie voor het aanmaken & vullen van de resultaten interface
function seedResults(){
	for(let x=0;x<3;x++){
		var wrapper  = document.createElement('div');
		wrapper.classList.add('podium');
		wrapper.style.display = "inline-block";

		var cover = document.createElement('img');
		cover.classList.add('resultImg');
		cover.src = getLogo(Object.keys(sortedScore)[x]);
		cover.alt = "cover";

		var pedestal = document.createElement('img');
		pedestal.classList.add('pedestal');
		pedestal.src = "img/pedestal.svg";
		pedestal.alt = "pedestal";

		var bar = document.createElement('div');
		bar.style.display = "inline-block";
		bar.classList.add('w3-light-grey', 'barContainer');

		var score = document.createElement('div');
		score.classList.add('w3-container', 'w3-animate-opacity', 'scoreBar');

		var header = document.createElement('h4');
		header.classList.add('resultHeader');

		var percent = document.createElement('p');
		percent.classList.add('resultPercent');

		var comment = document.createElement('p');
		comment.classList.add('resultComment');

		wrapper.appendChild(cover);
		wrapper.appendChild(pedestal);
		bar.appendChild(score);
		wrapper.appendChild(bar);
		wrapper.appendChild(header);
		wrapper.appendChild(percent);
		wrapper.appendChild(comment);
		document.getElementsByClassName('results')[0].appendChild(wrapper);




		moveBar(x, true);
	}

	// Dynamisch creeren van alle gekozen partijen incl styling met een vertraging van 1 seconde.
	setTimeout(function(){
		for(var i = 0; i<answers[31].length; i++){
			var row = document.createElement("div");
			row.style.margin = "0 26.5em";
			row.style.maxWidth = "400px";

			var logo = document.createElement('img');
			logo.style.float = "left";
			logo.style.width = "50px";
			logo.style.height = "50px";
			logo.style.display = "inline-block";
			logo.classList.add('rowImg');

			var bar = document.createElement('div');
			bar.style.display = "inline-block";
			bar.style.margin = "1em 0";
			bar.classList.add('w3-light-grey', 'barContainer');

			var score = document.createElement('div');
			score.classList.add('w3-container', 'w3-animate-opacity', 'scoreBar');
			score.style.textAlign = "unset";

			var scoreText = document.createElement('p');
			scoreText.classList.add('scoreText');
			scoreText.style.color = "black";
			scoreText.style.margin = "0 auto";

			score.appendChild(scoreText);
			bar.appendChild(score);
			row.appendChild(logo);
			row.appendChild(bar);
			document.getElementsByClassName('results')[0].appendChild(row);
		}
	

		sortIndex = 0;
		for(var i in sortedScore){
			document.getElementsByClassName('rowImg')[sortIndex].src = getLogo(i);
			moveBar(sortIndex, false, i);
			sortIndex++;
		}
	}, 1000);
}

// //functie voor het berekenen van de score bar breedte. 
// De parameters die meegestuurd worden zijn de index die de nodelist van de scorebar afgaan, 
// de stage bepaald of het gaat om de bovenste 3 partijen gaat of alle partijen onderaan en party bevat de betreffende partij.
function moveBar(index, stage, party){
	if(stage == true){
		var elem = document.getElementsByClassName("scoreBar")[index];   
		var width = 0;
		var scoreWidth = sortedScore[Object.keys(sortedScore)[index]] * 2;
		if (scoreWidth != 0){
			var id = setInterval(function(){
				if (width >= scoreWidth || width >= 100) {
					clearInterval(id);
				} 
				else {
					width++; 
					elem.style.width = width + '%'; 
					document.getElementsByClassName("resultHeader")[index].innerHTML = Object.keys(sortedScore)[index];
					document.getElementsByClassName("resultPercent")[index].innerHTML = width + "%";
					document.getElementsByClassName("resultComment")[index].innerHTML = "Overeenkomst";
				}
			}, 50);		
		}else{
			elem.style.width = width + '%';
			document.getElementsByClassName("resultHeader")[index].innerHTML = Object.keys(sortedScore)[index];
			document.getElementsByClassName("resultPercent")[index].innerHTML = width + "%";
			document.getElementsByClassName("resultComment")[index].innerHTML = "Overeenkomst";
		}
	}else{
		var elem = document.getElementsByClassName("scoreBar")[index+3];   
		var width = 0;
		var scoreWidth = sortedScore[party] * 2;
		if (scoreWidth != 0){
			var id = setInterval(function(){
				if (width >= scoreWidth || width >= 100) {
					clearInterval(id);
				} 
				else {
					width++; 
					elem.style.width = width + '%'; 
					document.getElementsByClassName('scoreText')[index].innerHTML = width + '%';
				}
			}, 50);		
		}else{
			elem.style.width = width + '%';
			document.getElementsByClassName('scoreText')[index].innerHTML = width + '%';
		}
	}
}

//zet een object om in een sorteerbare array en returned deze.
function sortProperties(obj){
  // omzetten van het object in een sorteerbare array
	var sortable = [];
	for(var key in obj)
		if(obj.hasOwnProperty(key))
			sortable.push([key, obj[key]]);
	
	// sorteer items aan de hand van de value
	sortable.sort(function(b, a)
	{
	  return a[1]-b[1];
	});

	for(var x = 0; x < sortable.length; x++){

		if(answers[31].includes(sortable[x][0])){
			sortedScore[`${sortable[x][0]}`] = sortable[x][1];

		}
	}
	return sortable; // array in formaat [key1, value1], [key2, value2] enzovoort
}

//fucntie om meerdere partijen te selecteren aan de hand van het bevatten van de 'selected' class
function selectMultiple(config){
	switch(config){
		case "all":
			for(var i = 0; i < 23 ; i++){
				if(document.getElementsByClassName('selectRow')[i].classList.contains('selected') == false){
					saveParties(document.getElementsByClassName('selectRow')[i]);	
				}
			}
		break;

		case "seats":
			for(var i = 0; i < 23 ; i++){
				if(document.getElementsByClassName('selectRow')[i].classList.contains('selected') == true){
					saveParties(document.getElementsByClassName('selectRow')[i]);
				}
			}
			for(var i = 0; i < 23 ; i++){
				if(parties[i]['size'] >= 5 && document.getElementsByClassName('selectRow')[i].classList.contains('selected') == false){
					saveParties(document.getElementsByClassName('selectRow')[i]);

				}
			}
		break;

		case "delete":
			for(var i = 0; i < 23 ; i++){
				if(document.getElementsByClassName('selectRow')[i].classList.contains('selected') == true){
					saveParties(document.getElementsByClassName('selectRow')[i]);
				}
			}
		break;
	}
}








