var rocky = require('rocky');

var GlobalInit = 1;

// my function to draw number based on imput parametr
function drawNumber(ctx, cx, cy, digit, colorNumber, colorBg) {
	
	//clear first
	ctx.fillStyle = colorBg;
	ctx.fillRect(cx, cy, 56, 56);
	
	// set didget color
	ctx.fillStyle = colorNumber;
	if (digit == 1) {
		ctx.fillRect(cx+7,cy,42,56);
	} else {
		ctx.fillRect(cx,cy,56,56);
	}
	
	// based on didget draw holes to initial sqaure in same colorBg
	ctx.fillStyle = colorBg;
	switch(digit) {
		case 0:
			ctx.fillRect(cx+14,cy+14,28,28);
        break;
		case 1:
			ctx.fillRect(cx+7,cy+14,14,28);
			ctx.fillRect(cx+35,cy,14,42);
        break;
		case 2:
			ctx.fillRect(cx,cy+14,42,7);
			ctx.fillRect(cx+14,cy+35,42,7);
        break;
		case 3:
			ctx.fillRect(cx,cy+14,42,7);
			ctx.fillRect(cx,cy+35,42,7);
		break;
		case 4:
			ctx.fillRect(cx+14,cy,28,21);
			ctx.fillRect(cx,cy+35,42,21);
        break;
		case 5:
			ctx.fillRect(cx,cy+35,42,7);
			ctx.fillRect(cx+14,cy+14,42,7);
        break;
		case 6:
			ctx.fillRect(cx+14,cy+14,42,7);
			ctx.fillRect(cx+14,cy+35,28,7);
        break;
		case 7:
			ctx.fillRect(cx,cy+14,42,42);
			//ctx.fillRect(cx,cy+35,42,7);
        break;
		case 8:
			ctx.fillRect(cx+14,cy+14,28,7);
			ctx.fillRect(cx+14,cy+35,28,7);
        break;
		case 9:
			ctx.fillRect(cx+14,cy+14,28,7);
			ctx.fillRect(cx,cy+35,42,7);
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
	// Set color
	var colorBg = "vividcerulean";
	var colorDigit = "black";
	
	
	// Determine the points of the display individual didgets
	var xLeft = 8;
	var xRight = 80;
	var yUp = 16;
	var yBottom = 96;
  
	// Split hours to individual didgets
	var hours = d.getHours();
	var hourLeft = Math.floor(hours/10);
	var hourRight = hours%10;
	var minutes = d.getMinutes();
	var minuteLeft = Math.floor(minutes/10);
	var minuteRight = minutes%10;

	// Clear the screen
	// in future clear just digit which needs redraw -> clear func
	

	if (GlobalInit == 1) {
		ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
		ctx.fillStyle = colorBg;
		ctx.fillRect(0, 8, ctx.canvas.clientWidth, ctx.canvas.clientHeight-16);
		drawNumber(ctx, xLeft, yBottom, minuteLeft, colorDigit, colorBg);
		drawNumber(ctx, xRight, yUp, hourRight, colorDigit, colorBg);
		drawNumber(ctx, xLeft, yUp, hourLeft, colorDigit, colorBg);
		GlobalInit = 0;
		
		//draw middle cross
		var w = ctx.canvas.unobstructedWidth;
		var h = ctx.canvas.unobstructedHeight;
		ctx.beginPath();

  		// Move to the center point, then draw the line
		ctx.moveTo(0, h/2);
  		ctx.lineTo(w, h/2);
		ctx.moveTo(w/2, 8);
  		ctx.lineTo(w/2, h-8);

  		// Stroke the line (output to display)
  		ctx.lineWidth = 1;
  		ctx.strokeStyle = colorDigit;
		ctx.stroke();
	}
	
	drawNumber(ctx, xRight, yBottom, minuteRight, colorDigit, colorBg);
	
	if (minuteRight === 0) {
		console.log(d + " Re-draw minuteLeft (" + minuteLeft + ")");
		drawNumber(ctx, xLeft, yBottom, minuteLeft, colorDigit, colorBg);
		if (minuteLeft === 0) {
			console.log(d + " Re-draw hourRight (" + hourRight + ")");
			drawNumber(ctx, xRight, yUp, hourRight, colorDigit, colorBg);
			if (hourRight === 0) {
				console.log(d + " Re-draw hourLeft (" + hourLeft + ")");
				drawNumber(ctx, xLeft, yUp, hourLeft, colorDigit, colorBg);
			}
		}
	}
	

/*	// time text on bottom
	// Determine the width and height of the display
	var w = ctx.canvas.unobstructedWidth;
	var h = ctx.canvas.unobstructedHeight;

	// Set the text color
	ctx.fillStyle = 'white';

	// Center align the text
	ctx.textAlign = 'center';

	// Display the time, on the bottom of the screen
	ctx.fillText(d.toLocaleTimeString(), w / 2, h-20, w);
*/

});

rocky.on('minutechange', function(event) {
	// Display a message in the system logs
	console.log("Another minute with your Pebble!");

	// Request the screen to be redrawn on next pass
	rocky.requestDraw();
});