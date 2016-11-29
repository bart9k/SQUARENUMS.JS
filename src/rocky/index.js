var rocky = require('rocky');

// my function to draw number based on imput parametr
function drawNumber(ctx, cx, cy, digit, colorNumber) {
	
	// set didget color
	ctx.fillStyle = colorNumber;
	if (digit == 1) {
		ctx.fillRect(cx+14,cy+7,42,56);
	} else {
		ctx.fillRect(cx+7,cy+7,56,56);
	}

	// based on didget draw holes to initial sqaure
	switch(digit) {
		case 0:
			ctx.clearRect(cx+21,cy+21,28,28);
        break;
		case 1:
			ctx.clearRect(cx+14,cy+21,14,28);
			ctx.clearRect(cx+42,cy+7,14,42);
        break;
		case 2:
			ctx.clearRect(cx+7,cy+21,42,7);
			ctx.clearRect(cx+21,cy+42,42,7);
        break;
		case 3:
			ctx.clearRect(cx+7,cy+21,42,7);
			ctx.clearRect(cx+7,cy+42,42,7);
		break;
		case 4:
			ctx.clearRect(cx+21,cy+7,28,21);
			ctx.clearRect(cx+7,cy+42,42,21);
        break;
		case 5:
			ctx.clearRect(cx+7,cy+42,42,7);
			ctx.clearRect(cx+21,cy+21,42,7);
        break;
		case 6:
			ctx.clearRect(cx+7,cy+21,42,7);
			ctx.clearRect(cx+7,cy+42,42,7);
        break;
		case 7:
			ctx.clearRect(cx+7,cy+21,42,7);
			ctx.clearRect(cx+7,cy+42,42,7);
        break;
		case 8:
			ctx.clearRect(cx+7,cy+21,42,7);
			ctx.clearRect(cx+7,cy+42,42,7);
        break;
		case 9:
			ctx.clearRect(cx+7,cy+21,42,7);
			ctx.clearRect(cx+7,cy+42,42,7);
        break;
    	default:
		  ctx.fillStyle = 'grey';
		  ctx.fillRect(cx+7,cy+7,42,42);
	}
}

rocky.on('draw', function(event) {
	// Get the CanvasRenderingContext2D object
	var ctx = event.context;

	// Current date/time
	var d = new Date();
	
	// Clear the screen
	ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

	// Determine the points of the display individual didgets
	var xLeft = 1;
	var xRight = 73;
	var yUp = 1;
	var yBottom = 73;
  
	// Split hours to individual didgets
	var hours = d.getHours();
	var hourLeft = Math.floor(hours/10);
	var hourRight = hours%10;
	var minutes = d.getMinutes();
	var minuteLeft = Math.floor(minutes/10);
	var minuteRight = minutes%10;

	//diget color
	var digitColor = "lightblue";
	
	//Draw hour didgets
	drawNumber(ctx, xLeft, yUp, hourLeft, digitColor);
	drawNumber(ctx, xRight, yUp, hourRight, digitColor);
	// Draw minute didgets
	drawNumber(ctx, xLeft, yBottom, minuteLeft, digitColor);
	drawNumber(ctx, xRight, yBottom, minuteRight, digitColor);
	
	//console.log("minutes: " + d.getMinutes()%10 + " hours: " + Math.floor(d.getMinutes()/10));
	console.log(d + " Broken: " + hourLeft + " " + hourRight + " " + minuteLeft + " " + minuteRight);

	// time text on bottom
	// Determine the width and height of the display
	var w = ctx.canvas.unobstructedWidth;
	var h = ctx.canvas.unobstructedHeight;

	// Set the text color
	ctx.fillStyle = 'white';

	// Center align the text
	ctx.textAlign = 'center';

	// Display the time, on the bottom of the screen
	ctx.fillText(d.toLocaleTimeString(), w / 2, h-20, w);

});

rocky.on('minutechange', function(event) {
	// Display a message in the system logs
	console.log("Another minute with your Pebble!");

	// Request the screen to be redrawn on next pass
	rocky.requestDraw();
});