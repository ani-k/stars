var canvasSmall = document.getElementById('canvas-small'),
    contextCanvasSmal = canvasSmall.getContext('2d'),
    canvasBig = document.getElementById('canvas-big'),
    contextCanvasBig = canvasBig.getContext('2d'),
    stars = [
        {
            color: 'red',
            position: [50,30]
        },
        {
            color: 'blue',
            position: [200,0]
        },
        {
            color: 'green',
            position: [-100,45]
        },
        {
            color: 'yellow',
            position: [-100,45]
        },
        {
            color: 'black',
            position: [200,0]
        }
    ];

canvasBig.addEventListener('click', onCanvasBigClick(e));

window.onload = function() {
    contextCanvasBig.save();
    for(var i = 0; i < stars.length; i++) {
        setStarProperties(stars[i].color, stars[i].position);
    }
};

function drawStar (context, r){
    context.save();
    context.beginPath();
    context.rotate(-Math.PI / 10);
    context.scale(r, r);
    context.moveTo(1, 0);
    for (var i = 0; i < 9; i++) {
        context.rotate(Math.PI / 5);
        if (i % 2 === 0) {
            context.lineTo(0.3819653016466596, 0);
        } else {
            context.lineTo(1, 0);
        }
    }


    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
}

function setStarProperties (color, position) {
    contextCanvasBig.translate(position[0],position[1]);
    contextCanvasBig.fillStyle = color;
    contextCanvasBig.strokeStyle = color;
    drawStar(contextCanvasBig, 10);
}

function onCanvasBigClick(event) {
    // contextCanvasBig.arc(event)
    var x = event.clientX,
        y = event.clientY;
    // for i
}
