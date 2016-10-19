
var canvasSize = (window.innerHeight - 100)





var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")


canvas.width = canvasSize
canvas.height = canvasSize


var OUTER_RADIUS = (window.innerHeight - 100)/2 - 20
var INNER_RADIUS = 150;
var PEN_POSITION = .5;

var angle = 0;

var pen_x = (canvasSize/2) + (OUTER_RADIUS - (INNER_RADIUS * (1 - PEN_POSITION)))
var pen_y = (canvasSize/2)

var prev_pen_x = pen_x
var prev_pen_y = pen_y



window.requestAnimationFrame(loop)

function loop()
{

	//ctx.clearRect(0,0,canvas.width, canvas.height)

	//drawCircle(ctx, canvasSize/2, canvasSize/2, OUTER_RADIUS,0, "rgba(0,0,0,.5", 2,false)

	angle -= .05

	var inner_x = Math.cos(angle) * (OUTER_RADIUS - INNER_RADIUS) + canvasSize/2
	var inner_y = Math.sin(angle) * (OUTER_RADIUS - INNER_RADIUS) + canvasSize/2

	var innerAngle = (angle * OUTER_RADIUS) / (Math.PI * INNER_RADIUS * 2) * (-2*Math.PI)


	pen_x = inner_x + (Math.cos(innerAngle) * INNER_RADIUS * PEN_POSITION)
	pen_y = inner_y + (Math.sin(innerAngle) * INNER_RADIUS * PEN_POSITION)

	//drawCircle(ctx, inner_x, inner_y, INNER_RADIUS,innerAngle,"rgba(0,0,0,.5", 2, true)
	//drawCircle(ctx, pen_x, pen_y, 5 , 0,"rgba(0,0,0,.5", 2, false)

	ctx.beginPath()
	ctx.moveTo(prev_pen_x, prev_pen_y)
	ctx.lineTo(pen_x, pen_y)
	ctx.stroke()
	ctx.closePath()


	prev_pen_x = pen_x
	prev_pen_y = pen_y

	

	window.requestAnimationFrame(loop)
}




function drawCircle(ctx,x,y,r, angle,  strokeStyle, strokeWidth, drawRadius)
{

	ctx.beginPath()
	ctx.arc(x,y,r,0, 2* Math.PI, false)

	ctx.lineWidth = strokeWidth;
	ctx.strokeStyle = strokeStyle
	ctx.stroke()

	ctx.closePath()

	if (drawRadius)
	{
		ctx.beginPath()
		ctx.moveTo(x,y)
		ctx.lineTo(Math.cos(angle) * r + x, Math.sin(angle) * r + y)
		ctx.stroke()
		ctx.closePath()
	}
}
