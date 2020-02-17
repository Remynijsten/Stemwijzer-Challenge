const start = document.getElementsByClassName("start")[0];
const startBack = document.getElementsByClassName("startBack")[0];
const poll = document.getElementsByClassName("poll")[0];
const progress = document.getElementsByClassName("progress")[0];

var questionIndex = 0;
var answers = {};
var important = [];
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
var sortedScore = {};

var selectParties = [];
answers[30] = [] ;
answers[31] = [];

start.onclick = function(){
	startBack.style.display = "none";
	poll.style.display = "block";
	seedStatement(questionIndex);
}

function toggleModal(config){
	config == "open" ? opinionModal.style.display='block' : opinionModal.style.display='none' ;
}

function seedOpinion(index){
	for(i=0;i<23;i++){
		var appendParent;

		subjects[index]["parties"][i]["position"] == "pro" ? appendParent = 0 : "";
		subjects[index]["parties"][i]["position"] == "contra" ? appendParent = 2 : "";
		subjects[index]["parties"][i]["position"] == "none" ? appendParent = 1 : "";
		
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
		wrapper.appendChild(btn);

		var opinion = document.createElement("div");
		opinion.setAttribute("id", subjects[index]["parties"][i]["name"]);
		opinion.innerHTML = subjects[index]["parties"][i]["opinion"];
		opinion.classList.add('w3-hide', 'w3-container', 'w3-animate-opacity');
		wrapper.appendChild(opinion);
		document.getElementsByClassName("partyOpinion")[appendParent].appendChild(wrapper);
	}
}

function seedStatement(index){
	statement.innerHTML = questionIndex+1 + ". " + subjects[index]["title"];
	comment.innerHTML = subjects[index]["statement"];

	for(i=0;i<3;i++){
		var parent = document.getElementsByClassName("partyOpinion")[i];
		var childs = document.getElementsByClassName("opinionRow");
		for (x=0;x<childs.length;x++){
			childs[x].parentNode.removeChild(childs[x]);
		}
	}
	
	seedOpinion(index);
}

function openAccordion(party){
	var x = document.getElementById(party);

	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

function back(){
	// answers[questionIndex] = "";

	switch(questionIndex) {
		case 0:
			document.getElementById("progressBar").style.width = "0%";
			startBack.style.display = "block";
			poll.style.display = "none";
		break;

		case 30:
			questionIndex--;

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

			seedStatement(questionIndex);
			document.getElementsByClassName("statementControls")[0].style.display = "block";
			document.getElementsByClassName("opinion")[0].style.display = "block";
			document.getElementsByClassName("selectBoxes")[0].style.display = "none";
			document.getElementsByClassName("statementWrapper")[0].style.marginBottom = "7.5em";
			document.getElementsByClassName("contentWrapper")[0].style.minHeight = "850px";


			var node = document.getElementsByClassName("selectBoxes")[0];
			while (node.firstChild) {
				node.removeChild(node.firstChild);
			}
			
		break;

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
			var increase = (questionIndex) * 3.3;
			document.getElementById("progressBar").style.width = increase + "%";

			questionIndex--;
			seedStatement(questionIndex);

			EENS.removeAttribute("style");
			GEEN.removeAttribute("style");
			ONEENS.removeAttribute("style");

			answers[questionIndex] != "SKIP" ?
			document.getElementById(answers[questionIndex]).style.background = "#04b4dc" : "" ;

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

function next(choice){
	switch(questionIndex){
		case 29:
		document.getElementById("progressBar").style.width = "100%";
		answers[questionIndex] = choice;

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

		case 31:
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

function showTooltip(index){
		document.getElementsByClassName("tooltiptext")[index.getAttribute("data-value")].style.visibility = "visible";
}

function hideTooltip(index){
		document.getElementsByClassName("tooltiptext")[index.getAttribute("data-value")].style.visibility = "hidden";
}

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

}


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

function seedResults(){
	for(let x=0;x<3;x++){
		var wrapper  = document.createElement('div');
		wrapper.classList.add('podium');
		wrapper.style.display = "inline-block";

		var cover = document.createElement('img');
		cover.classList.add('resultImg');
		cover.src = getLogo(answers[31][x]);
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

	// Dynamisch creeren van alle gekozen partijen incl styling.
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
			scoreText.style.margin = "0 0 0 7.5em";

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


function moveBar(index, stage, party){
	if(stage == true){
		var elem = document.getElementsByClassName("scoreBar")[index];   
		var width = 0;
		var scoreWidth = score[answers[31][index]] * 2;
		if (scoreWidth != 0){
			var id = setInterval(function(){
				if (width >= 100) {
					clearInterval(id);
				} 
				else {
					width++; 
					elem.style.width = width + '%'; 
					document.getElementsByClassName("resultHeader")[index].innerHTML = answers[31][index];
					document.getElementsByClassName("resultPercent")[index].innerHTML = width + "%";
					document.getElementsByClassName("resultComment")[index].innerHTML = "Overeenkomst";

				}
			}, 50);		
		}else{
			elem.style.width = width + '%';
			document.getElementsByClassName("resultHeader")[index].innerHTML = answers[31][index];
			document.getElementsByClassName("resultPercent")[index].innerHTML = width + "%";
			document.getElementsByClassName("resultComment")[index].innerHTML = "Overeenkomst";
		}
	}else{
		var elem = document.getElementsByClassName("scoreBar")[index+3];   
		var width = 0;
		var scoreWidth = sortedScore[party] * 2;
		if (scoreWidth != 0){
			var id = setInterval(function(){
				if (width >= 100) {
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

function sortProperties(obj){
  // convert object into array
	var sortable = [];
	for(var key in obj)
		if(obj.hasOwnProperty(key))
			sortable.push([key, obj[key]]); // each item is an array in format [key, value]
	
	// sort items by value
	sortable.sort(function(b, a)
	{
	  return a[1]-b[1]; // compare numbers
	});
	console.log(sortable[0][0]);

	for(var x = 0; x < sortable.length; x++){

		if(answers[31].includes(sortable[x][0])){
			sortedScore[`${sortable[x][0]}`] = sortable[x][1];

		}
	}


	return sortable; // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}






