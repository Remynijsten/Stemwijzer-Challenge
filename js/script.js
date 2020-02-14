const start = document.getElementsByClassName("start")[0];
const startBack = document.getElementsByClassName("startBack")[0];
const poll = document.getElementsByClassName("poll")[0];
const progress = document.getElementsByClassName("progress")[0];

var questionIndex = 0;
var answers = [];
var important = [];

start.onclick = function(){
	startBack.style.display = "none";
	poll.style.display = "block";
	seedStatement(questionIndex);
}

console.log(subjects);


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

function choiceSelect(choice){
	if (questionIndex != 29){
		var increase = (questionIndex + 1) * 3.3;
		document.getElementById("progressBar").style.width = increase + "%";

		answers[questionIndex] = choice;
		questionIndex++;
		seedStatement(questionIndex);
	}else{
		document.getElementById("progressBar").style.width = "100%";
		questionIndex++;
		statement.innerHTML = "Zijn er onderwerpen die u extra belangrijk vindt?";
		comment.innerHTML = "Aangevinkte stellingen tellen extra mee bij het berekenen van het resulaat.";
		document.getElementsByClassName("statementControls")[0].style.display = "none";
		document.getElementsByClassName("opinion")[0].style.display = "none";
		document.getElementsByClassName("important")[0].style.display = "flex";
		document.getElementsByClassName("statementWrapper")[0].style.marginBottom = "0";
		document.getElementsByClassName("contentWrapper")[0].style.minHeight = "200px";

	}
}

function back(){
	answers[questionIndex] = "";

	switch(questionIndex) {
		case 0:
			document.getElementById("progressBar").style.width = "0%";
			startBack.style.display = "block";
			poll.style.display = "none";
			break;
		case 30:
			questionIndex--;
			seedStatement(questionIndex);
			document.getElementsByClassName("statementControls")[0].style.display = "block";
			document.getElementsByClassName("opinion")[0].style.display = "block";
			document.getElementsByClassName("important")[0].style.display = "none";
			document.getElementsByClassName("statementWrapper")[0].style.marginBottom = "7.5em";
			document.getElementsByClassName("contentWrapper")[0].style.minHeight = "850px";




			break;
		default:
			var increase = (questionIndex) * 3.3;
			document.getElementById("progressBar").style.width = increase + "%";

			questionIndex--;
			seedStatement(questionIndex);
			break;
	}
}

for(x=0;x<30;x++){
	var wrapper = document.createElement("div");
	wrapper.classList.add("w3-container", "importantStatement");
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
	tooltip.classList.add("tooltiptext");
	tooltip.innerHTML = subjects[x]["statement"];

	question.appendChild(tooltip);




	wrapper.appendChild(span);
	wrapper.appendChild(text);
	wrapper.appendChild(question);
	document.getElementsByClassName("important")[0].appendChild(wrapper);
}	
	var btn = document.createElement("button");
	btn.innerHTML = "GA VERDER";
	btn.classList.add("continue");
	btn.style.margin = "1em";
	btn.style.width = "300px;";
	btn.style.cursor = "pointer";
	document.getElementsByClassName("important")[0].appendChild(btn);


function showTooltip(index){
	setTimeout(function(){
		document.getElementsByClassName("tooltiptext")[index.getAttribute("data-value")].style.visibility = "visible";
	}, 500);
}
function hideTooltip(index){
	setTimeout(function(){
		document.getElementsByClassName("tooltiptext")[index.getAttribute("data-value")].style.visibility = "hidden";
	}, 500);
}

function saveImportant(statement){
	var elem = statement.firstChild.firstChild;
	statement.classList.toggle("selected");

	if(statement.classList.contains('selected') ){
		elem.classList.remove("far", "fa-square");
		elem.classList.add("far", "fa-check-square"); 
		statement.firstChild.nextSibling.style.color = "#04b4dc";
		
	}else{
		elem.classList.remove("far", "fa-check-square"); 
		elem.classList.add("far", "fa-square");
		statement.firstChild.nextSibling.style.color = "black";
	}
}