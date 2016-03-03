"use strict";

function initLocalClocks() {
	var date = new Date;
	var seconds = date.getSeconds();
	var minutes = date.getMinutes();
	var hours = date.getHours();

	var hands = [
		{
		hand: 'hours',
		angle: (hours * 30) + (minutes / 2)
		},
		{
		hand: 'minutes',
		angle: (minutes * 6)
		},
		{
		hand: 'seconds',
		angle: (seconds * 6)
		}
	];
	for (var j = 0; j < hands.length; j++) {
		var elements = document.querySelectorAll('.' + hands[j].hand);

		for (var k = 0; k < elements.length; k++) {
			elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
			elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
		}
	}
};
initLocalClocks();

function Clock() {
	var date = new Date();
	var formatter = new Intl.DateTimeFormat("ru", {

		hour: "numeric",
		minute: "numeric",
		second: "numeric"
	});

	formatter.format(date);
	document.querySelector(".clock1").innerHTML = formatter.format(date);
	setTimeout("Clock()", 1000);
}
Clock();