const start = document.getElementsByClassName("start")[0];
const startBack = document.getElementsByClassName("startBack")[0];
const poll = document.getElementsByClassName("poll")[0];
const progress = document.getElementsByClassName("progress")[0];

var questionIndex = 0;
var answers = [];

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
	}
}

function back(){
	answers[questionIndex] = "";
	if (questionIndex != 0){
		var increase = (questionIndex) * 3.3;
		document.getElementById("progressBar").style.width = increase + "%";

		questionIndex--;
		seedStatement(questionIndex);
	}else if(questionIndex == 0){
		document.getElementById("progressBar").style.width = "0%";
		startBack.style.display = "block";
		poll.style.display = "none";
	}
}