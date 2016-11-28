var rocky = require('rocky');

function fractionToRadian(fraction) {
  return fraction * 2 * Math.PI;
}

function drawHand(ctx, cx, cy, angle, length, color) {
  // Find the end points
  var x2 = cx + Math.sin(angle) * length;
  var y2 = cy - Math.cos(angle) * length;

  // Configure how we want to draw the hand
  ctx.lineWidth = 8;
  ctx.strokeStyle = color;

  // Begin drawing
  ctx.beginPath();

  // Move to the center point, then draw the line
  ctx.moveTo(cx, cy);
  ctx.lineTo(x2, y2);

  // Stroke the line (output to display)
  ctx.stroke();
}

// my function to draw number based on imput parametr
function drawNumber(ctx, cx, cy, number, colorNumber, colorBg) {
  // Find the end points
  
  // Configure how we want to draw the hand
  ctx.lineWidth = 5;
  ctx.strokeStyle = colorNumber;
  ctx.fillStyle = 'lightblue';


  // Begin drawing
  ctx.beginPath();

  // set back ground
  ctx.fillStyle = 'colorNumber';
  if (number == 1) {
	  ctx.fillRect(cx+14,cy+7,42,56);
  } else {
	  ctx.fillRect(cx+7,cy+7,56,56);
  }
	
  // based on number set draw line
  switch(number) {
    case 0:
    	  ctx.moveTo(cx, cy);
		  ctx.lineTo(cx+20, cy);
		  ctx.moveTo(cx+20, cy);
		  ctx.lineTo(cx+20, cy+20);
		  ctx.moveTo(cx+20, cy+20);
		  ctx.lineTo(cx, cy+20);
		  ctx.moveTo(cx, cy+20);
		  ctx.lineTo(cx, cy);
        break;
    case 1:
		  ctx.moveTo(cx+20, cy);
		  ctx.lineTo(cx+20, cy+20);
        break;
	case 2:
		  ctx.moveTo(cx, cy);
		  ctx.lineTo(cx+20, cy);
		  ctx.moveTo(cx+20, cy);
		  ctx.lineTo(cx+20, cy+10);
		  ctx.moveTo(cx+20, cy+10);
		  ctx.lineTo(cx, cy+10);
		  ctx.moveTo(cx, cy+10);
		  ctx.lineTo(cx, cy+20);
		  ctx.moveTo(cx, cy+20);
		  ctx.lineTo(cx+20, cy+20);
        break;
	case 3:
		  ctx.moveTo(cx, cy);
		  ctx.lineTo(cx+20, cy);
		  ctx.moveTo(cx+10, cy+10);
		  ctx.lineTo(cx+20, cy+10);
		  ctx.moveTo(cx, cy+30);
		  ctx.lineTo(cx+20, cy+30);
		  ctx.moveTo(cx+20, cy);
		  ctx.lineTo(cx+20, cy+20);
		break;
	case 4:
		  // graphics_fill_rect(ctx, GRect(21,7,28,21), 0, GCornerNone);
	      // graphics_fill_rect(ctx, GRect(7,42,42,21), 0, GCornerNone);
		  ctx.fillStyle = colorBg;
		  ctx.fillRect(cx+21,cy+7,28,21);
		  ctx.fillRect(cx+7,cy+42,42,21);
/*		  ctx.moveTo(cx, cy);
		  ctx.lineTo(cx+20, cy);
		  ctx.lineTo(cx+20, cy+10);
		  ctx.lineTo(cx, cy+10);
		  ctx.lineTo(cx, cy);
		  ctx.fill(); */
        break;
	case 5:
		  ctx.moveTo(cx, cy);
		  ctx.moveTo(cx+20, cy);
		  ctx.moveTo(cx+20, cy+5);
		  ctx.moveTo(cx, cy+5);
		  ctx.moveTo(cx, cy);
		  ctx.fill();
        break;
	case 6:
		  ctx.moveTo(cx, cy);
		  ctx.moveTo(cx+20, cy);
		  ctx.moveTo(cx+20, cy+5);
		  ctx.moveTo(cx, cy+5);
		  ctx.moveTo(cx, cy);
		  ctx.fill();
        break;
	case 7:
		  ctx.moveTo(cx, cy);
		  ctx.moveTo(cx+20, cy);
		  ctx.lineTo(cx+20, cy);
		  ctx.moveTo(cx+20, cy+5);
		  ctx.lineTo(cx+20, cy+5);
		  ctx.moveTo(cx, cy+5);
		  ctx.lineTo(cx, cy+5);
		  ctx.moveTo(cx, cy);
		  ctx.lineTo(cx, cy);
		  ctx.fill();
        break;
	case 8:
		  ctx.moveTo(cx, cy);
		  ctx.moveTo(cx+20, cy);
		  ctx.moveTo(cx+20, cy+5);
		  ctx.moveTo(cx, cy+5);
		  ctx.moveTo(cx, cy);
		  ctx.fill();
        break;
	case 9:
		  ctx.moveTo(cx, cy);
		  ctx.moveTo(cx+20, cy);
		  ctx.moveTo(cx+20, cy+5);
		  ctx.moveTo(cx, cy+5);
		  ctx.moveTo(cx, cy);
		  ctx.fill();
        break;
    default:
		  ctx.fillStyle = 'red';
		  ctx.fillRect(cx,cy,10,100);
 }

  // Stroke the line (output to display)
  //ctx.stroke();
 // ctx.fill();
}

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

  // Current date/time
  var d = new Date();

  // Set the text color
  ctx.fillStyle = 'white';

  // Center align the text
  ctx.textAlign = 'center';

  // Display the time, on the bottom of the screen
  ctx.fillText(d.toLocaleTimeString(), w / 2, h-20, w);
	
  // Determine the center point of the display
  // and the max size of watch hands
  var cx = w / 2;
  var cy = (h-20) / 2;

  // -20 so we're inset 10px on each side
  var maxLength = (Math.min(w, h) - 20) / 2;

  // Calculate the minute hand angle
  var minuteFraction = (d.getMinutes()) / 60;
  var minuteAngle = fractionToRadian(minuteFraction);

  // Draw the minute hand
  drawHand(ctx, cx, cy, minuteAngle, maxLength, "white");

  // Calculate the hour hand angle
  var hourFraction = (d.getHours() % 12 + minuteFraction) / 12;
  var hourAngle = fractionToRadian(hourFraction);

  // Draw the hour hand
  drawHand(ctx, cx, cy, hourAngle, maxLength * 0.6, "limegreen");
	
	
  // my draw function (draw hour number now
  drawNumber(ctx, 10, 10, 4, "lightblue", "darkgreen");
	
  console.log("minutes: " + d.getMinutes()%10 + " hours: " + Math.floor(d.getMinutes()/10));
  
});

rocky.on('minutechange', function(event) {
  // Display a message in the system logs
  console.log("Another minute with your Pebble!");

  // Request the screen to be redrawn on next pass
  rocky.requestDraw();
});