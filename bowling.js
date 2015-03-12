/* Currently this only allows strikes to be counted. Addition of spares will need to be added. 
In addition the recording of 2 extra bowls in the event of a strike in the last frame needs to be stored .
Ideally this should be converted to objects.*/
function newPlayer(){
	var htmlstring = frames();
	$("#scoreboard").append(htmlstring);
}
function deletePlayer(elem){
	$(elem).parent().remove();
}
function frames(){
	var frame = "<span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty col-md-1 thumbnail\"></span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty col-md-1 thumbnail\"></span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty col-md-1 thumbnail\"></span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty col-md-1 thumbnail\"></span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty col-md-1 thumbnail\"></span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty col-md-1 thumbnail\"></span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty col-md-1 thumbnail\"></span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty col-md-1 thumbnail\"></span><span data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty col-md-1 thumbnail\"></span><span data-firstextra=\"10\" data-secondextra=\"1\" data-firstscore=\"\" data-secondscore=\"\" data-type=\"\" class=\"empty finish col-md-1 thumbnail\"></span><span class=\"score thumbnail\"></span>";
	var htmlstring = "<li class=\"list-group-item row\" data-name=\"" + $("#name").val() + "\">" + $("#name").val() + "<button class=\"delete btn btn-default col-md-1\" onclick=\"deletePlayer(this)\">Delete</button>" + frame + "</li>";
	return htmlstring;
}
function startGame(){
	$(".delete").remove();
	$("#details").remove();
	$("#addscore").show();
	$("#scoreboard").children().first().find("span").first().addClass("position");
}
function addScore(){
	//need to add firstextra and second extra for strike on last turn
	var firstscore = parseInt($("#firstscore").val(), 10);
	if(!firstscore){firstscore = 0}
	var secondscore = parseInt($("#secondscore").val(), 10);
	if(!secondscore){secondscore = 0}
	var type = "";
	if(firstscore == 10 && secondscore == 0){type = "strike";}
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
	if($(".position.finish.firstextra").data("firstextra")) {
		$(".position").addClass("secondextra");
		$(".position").addClass("filled");
		$(".position.finish").removeClass("empty firstextra");
	} else if($(".position.finish.empty").data("firstscore") == 10){
		$(".position").addClass("firstextra");
	} else {
		$(".position").addClass("filled");
		if($(".position.filled").parent().next().length == 0){
			$(".position.filled").parent().parent().children().first().find("span.empty").first().addClass("position");
		} else {
			$(".position.filled").parent().next().find("span.empty").first().addClass("position");
		}
		$(".position.filled").removeClass("position empty");
	}
}
function finishGame(){
	var firstscore = "";
	var secondscore = "";
	var type = "";
	var sum = 0;
	$(".score").css("background-color", "#000");
	//get all li of scoreboard
	//debug --- write function to parse data attributes and return 0 if NaN
	$("#scoreboard").children().each(function(index){
		//get all span of li
		$(this).find("span.filled").each(function(index){
			//if the first bowl was a strike move to the next frame
			if($(this).data("firstscore") == 10){
				//add the first point
				sum += parseInt($(this).data("firstscore"));
				//move to the next frame
				sum += parseInt($(this).next().data("firstscore"));
				//if the first bowl is again a strike move to the next frame
				if($(this).next().data("firstscore") == 10){
					sum += parseInt($(this).next().next().data("firstscore"));
				} else {
					sum += parseInt($(this).next().data("secondscore"));
				}
			//this works ok
			} else if ($(this).data("type") == "strike" && $(this).hasClass("finish")){
				sum += parseInt($(this).data("firstscore"));
				sum += parseInt($(this).data("firstextra"));
				sum += parseInt($(this).data("secondextra"));
			} else {
				//add the score as displayed
				sum += parseInt($(this).text());
			}
		});
		$(this).find("span.score").text(sum);
		sum = 0;
	});
}