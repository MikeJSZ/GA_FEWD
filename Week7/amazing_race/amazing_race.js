var pos_A = 1;
var pos_B = 1;
var isGameFinished = false;

$(document).ready(function() {
	// Put your code in here!

	$("body").keyup(keyPressed);

});

function keyPressed(key) {
	if (!isGameFinished) {
		var keyCode = key.keyCode;
		if (keyCode === 97 || keyCode === 65) {
			advancePlayerA();
		}
		if (keyCode === 108 || keyCode === 76) {
			advancePlayerB();
		}
	}

}

function advancePlayerA () {
	var totalCellClassTag = ".player-1 td";
	var	activeCellClassTag = ".player-1 td.active";

	var totalCellCount = ($(totalCellClassTag)).length;

	if (pos_A === totalCellCount) {
		playerWin("Player1");
	} else {
		$(activeCellClassTag).removeClass();
		$(totalCellClassTag).eq(pos_A++).addClass("active");
	}
}

function advancePlayerB () {
	var totalCellClassTag = ".player-2 td";
	var	activeCellClassTag = ".player-2 td.active";

	var totalCellCount = ($(totalCellClassTag)).length;

	if (pos_B === totalCellCount) {
		playerWin("Player2");
	} else {
		$(activeCellClassTag).removeClass();
		$(totalCellClassTag).eq(pos_B++).addClass("active");
	}
}

function playerWin(name) {
	isGameFinished = true;
	$("<h1>"+name+", You are the winner!</h1>").insertBefore($("body"));
	$("h1").css("text-align", "center");
}