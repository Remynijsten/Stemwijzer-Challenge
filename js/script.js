const start = document.getElementsByClassName("start")[0];
const startBack = document.getElementsByClassName("startBack")[0];
const poll = document.getElementsByClassName("poll")[0];
const progress = document.getElementsByClassName("progress")[0];

start.onclick = function(){
	startBack.style.display = "none";
	poll.style.display = "block";
	statement.innerHTML = "1. " + subjects[0]["title"];
	comment.innerHTML = subjects[0]["statement"];
}

console.log(subjects);


function toggleModal(config){
	config == "open" ? opinionModal.style.display='block' : opinionModal.style.display='none' ;
}
