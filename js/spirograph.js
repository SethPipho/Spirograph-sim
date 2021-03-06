var canvas = document.getElementById( "canvas" )
var ctx = canvas.getContext( "2d" )
    /////
var drawingCanvas = document.createElement( "canvas" )
var drawingCtx = drawingCanvas.getContext( "2d" )
    ///////

if (window.innerHeight < window.innerWidth)
{
    canvasSize = ( window.innerHeight - 100 )
}
else
{
    canvasSize = ( window.innerWidth - 100 )
}



canvas.width = canvasSize
canvas.height = canvasSize
drawingCanvas.width = canvasSize
drawingCanvas.height = canvasSize
    //////
var OUTER_RADIUS = (canvasSize ) / 2 - 20
var INNER_RADIUS = 0;
var PEN_POSITION = 0;
var STEP_SIZE = .02
var STEPS_PER_FRAME = 10;
//////
var angle = 0;
var pen_x;
var pen_y;
var prev_pen_x;
var prev_pen_y;
///
var settings = {
    innerRatio: Math.random(),
    penPosition: Math.random(),
    stepPerFrame: 4,
    play: true,
		drawGuides:true,
    reset: function()
    {
        reset()
    },
    random: function()
    {
        this.innerRatio = Math.random()
        this.penPosition = Math.random()


		},
    New_Random: function()
    {
        this.random()
        reset()
    }
}

function reset()
{
    INNER_RADIUS = OUTER_RADIUS * settings.innerRatio
    PEN_POSITION = settings.penPosition
    pen_x = ( canvasSize / 2 ) + ( OUTER_RADIUS - ( INNER_RADIUS * ( 1 - PEN_POSITION ) ) )
    pen_y = ( canvasSize / 2 )
    prev_pen_x = pen_x
    prev_pen_y = pen_y
    angle = 0
    drawingCtx.clearRect( 0, 0, canvas.width, canvas.height )
}


function loop()
{
    INNER_RADIUS = settings.innerRatio * OUTER_RADIUS
    PEN_POSITION = settings.penPosition
    STEPS_PER_FRAME = settings.stepPerFrame
    ctx.clearRect( 0, 0, canvas.width, canvas.height )
        //
    for ( var i = 0; i < STEPS_PER_FRAME; i++ )
    {

        inner_x = Math.cos( angle ) * ( OUTER_RADIUS - INNER_RADIUS ) + canvasSize / 2
        inner_y = Math.sin( angle ) * ( OUTER_RADIUS - INNER_RADIUS ) + canvasSize / 2
        innerAngle = ( angle * OUTER_RADIUS ) / ( Math.PI * INNER_RADIUS * 2 ) * ( -2 * Math.PI )
        pen_x = inner_x + ( Math.cos( innerAngle ) * INNER_RADIUS * PEN_POSITION )
        pen_y = inner_y + ( Math.sin( innerAngle ) * INNER_RADIUS * PEN_POSITION )

				if ( settings.play )
				{

						drawingCtx.beginPath()
		        drawingCtx.moveTo( prev_pen_x, prev_pen_y )
		        drawingCtx.lineTo( pen_x, pen_y )

		        drawingCtx.lineWidth = 1;
				drawingCtx.lineCap = "round"
                drawingCtx.shadowBlur = 1.5
                drawingCtx.shadowColor = "rgb(0,0,0)"
		        drawingCtx.stroke()

		        drawingCtx.closePath()


						angle -= STEP_SIZE
				}

				prev_pen_x = pen_x
				prev_pen_y = pen_y

    }
    ctx.drawImage( drawingCanvas, 0, 0 )

		if (settings.drawGuides)
		{
			drawCircle( ctx, canvasSize / 2, canvasSize / 2, OUTER_RADIUS, 0, "rgba(0,0,0,.5", 2, false )
			drawCircle( ctx, inner_x, inner_y, INNER_RADIUS, innerAngle, "rgba(0,0,0,.5", 2, true )
			drawCircle( ctx, pen_x, pen_y, 5, 0, "rgba(0,0,0,.5", 2, false )
		}

    window.requestAnimationFrame( loop )
}

function drawCircle( ctx, x, y, r, angle, strokeStyle, strokeWidth, drawRadius )
{
    ctx.beginPath()
    ctx.arc( x, y, r, 0, 2 * Math.PI, false )
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeStyle
    ctx.stroke()
    ctx.closePath()
    if ( drawRadius )
    {
        ctx.beginPath()
        ctx.moveTo( x, y )
        ctx.lineTo( Math.cos( angle ) * r + x, Math.sin( angle ) * r + y )
        ctx.stroke()
        ctx.closePath()
    }
}


window.onload = function()
{
    var gui = new dat.GUI()
    gui.add( settings, "innerRatio", 0, 1, .01 ).listen()
    gui.add( settings, "penPosition", 0, 1, .01 ).listen()
    gui.add( settings, "stepPerFrame", 1, 100, 1 )
		gui.add(settings,"drawGuides")
    gui.add( settings, "random" )
    gui.add( settings, "play" )
    gui.add( settings, "reset" )
    gui.add( settings, "New_Random" )
    reset();
    window.requestAnimationFrame( loop )
}
