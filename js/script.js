const start = document.getElementsByClassName("start")[0];
const startBack = document.getElementsByClassName("startBack")[0];
const poll = document.getElementsByClassName("poll")[0];
const progress = document.getElementsByClassName("progress")[0];

start.onclick = function(){
	startBack.style.display = "none";
	poll.style.display = "block";
	statement.innerHTML = "1. " + subjects[0]["title"];
	comment.innerHTML = subjects[0]["statement"];
	seedOpinion(0);
}

console.log(subjects);


function toggleModal(config){
	config == "open" ? opinionModal.style.display='block' : opinionModal.style.display='none' ;
}

function seedOpinion(index){

	// partijen die het eens zijn
	for(i=0;i<14;i++){
		var wrapper = document.createElement("div");
		wrapper.classList.add('w3-container', 'opinionRow');

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
		document.getElementsByClassName("partyOpinion")[0].appendChild(wrapper);
	}
	
	// Niet stemmers
	var wrapper = document.createElement("div");
	wrapper.classList.add('w3-container', 'opinionRow');

	var btn = document.createElement("button");
	btn.setAttribute("onclick", "openAccordion(this.innerHTML)");
	btn.classList.add('w3-button', 'w3-block');
	btn.style.borderBottom = "1px solid black";
	btn.style.background = "none";
	btn.style.color = "black";
	btn.style.textAlign = "left";
	btn.innerHTML = subjects[index]["parties"][14]["name"];
	wrapper.appendChild(btn);

	var opinion = document.createElement("div");
	opinion.setAttribute("id", subjects[index]["parties"][14]["name"]);
	opinion.innerHTML = subjects[index]["parties"][14]["opinion"];
	opinion.classList.add('w3-hide', 'w3-container', 'w3-animate-opacity');
	wrapper.appendChild(opinion);
	document.getElementsByClassName("partyOpinion")[1].appendChild(wrapper);

	// Partijen die het oneens zijn
	for(i=15;i<23;i++){
		var wrapper = document.createElement("div");
		wrapper.classList.add('w3-container', 'opinionRow');

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
		document.getElementsByClassName("partyOpinion")[2].appendChild(wrapper);
	}
}








function openAccordion(party){
	var x = document.getElementById(party);

	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}


