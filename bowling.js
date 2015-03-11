function newPlayer(){
	var htmlstring = frames();
	$("#scoreboard").append(htmlstring);
}
function deletePlayer(elem){
	$(elem).parent().remove();
}
function frames(){
	var frame = "<span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty\">here</span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty\">here</span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty\">here</span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty\">here</span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty\">here</span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty\">here</span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty\">here</span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty\">here</span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty finish\">here</span><span class=\"score\"></span>";
	var htmlstring = "<li data-name=\"" + $("#name").val() + "\">" + $("#name").val() + frame + "<button class=\"delete\" onclick=\"deletePlayer(this)\">Delete Player</button></li>";
	return htmlstring;
}
function startGame(){
	$(".delete").remove();
	$("#details").remove();
	$("#addscore").show();
	$("#scoreboard").children().first().find("span").first().addClass("position");
}
function addScore(){
	var firstscore = parseInt($("#firstscore").val(), 10);
	if(!firstscore){firstscore = 0}
	var secondscore = parseInt($("#secondscore").val(), 10);
	if(!secondscore){secondscore = 0}
	var type = "";
	if(firstscore == 10 && secondscore == 0 || firstscore == 0 && secondscore == 10){type = "strike";}
	var score = firstscore + secondscore;
	if (isNaN(score) || score > 10 && score > -1){
		alert("Please use numbers in the range of 0 to 10, with 10 as the highest possible score.");
	} else {
		$(".position").text(score);
		$(".position").attr("data-firstscore", firstscore);
		$(".position").attr("data-secondscore", secondscore);
		$(".position").attr("data-type", type);
	}
	$("#firstscore").val('');
	$("#secondscore").val('');
}
function nextTurn(){
	var position;
	$(".position").addClass("filled");
	if($(".position.filled").parent().next().length == 0){
		$(".position.filled").parent().parent().children().first().find("span.empty").first().addClass("position");
	} else {
		$(".position.filled").parent().next().find("span.empty").first().addClass("position");
	}
	$(".position.filled").removeClass("position empty");
}
function finishGame(){
	$(".finish").parent();
}