const canvasSmall = document.getElementById('canvas-small'),
    contextCanvasSmal = canvasSmall.getContext('2d'),
    canvasBig = document.getElementById('canvas-big'),
    contextCanvasBig = canvasBig.getContext('2d'),
    stars = [
        {
            color: 'red',
            position: [70, 70],
            points: []
        },
        {
            color: 'blue',
            position: [450, 0],
            points: []
        },
        {
            color: 'green',
            position: [-225, 230],
            points: []
        },
        {
            color: 'yellow',
            position: [-225, 230],
            points: []
        },
        {
            color: 'black',
            position: [450, 0],
            points: []
        }
    ];

let innerRadius = 25,
    spikes = 5,
    rot = Math.PI / 2 * 3,
    step = Math.PI / spikes,
    outerRadius = 50;

canvasBig.addEventListener('click', onCanvasBigClick);

window.onload = function () {
    canvasBig.width = 600;
    canvasBig.height = 600;
    canvasSmall.width = 600;
    canvasSmall.height = 50;
    contextCanvasBig.save();
    for (var i = 0; i < stars.length; i++) {
        setStarProperties(stars[i], i);
    }
};

function setStarProperties(star, index) {
    contextCanvasBig.translate(star.position[0], star.position[1]);
    contextCanvasBig.fillStyle = star.color;
    contextCanvasBig.strokeStyle = star.color;
    drawStar(index);
}

function drawStar(index) {
    contextCanvasBig.save();
    contextCanvasBig.beginPath();
    contextCanvasBig.moveTo(0, -outerRadius);
    for (i = 0; i < spikes; i++) {
        drawPoint(outerRadius, index);
        drawPoint(innerRadius, index);
    }
    contextCanvasBig.lineTo(0, -outerRadius);
    contextCanvasBig.closePath();
    contextCanvasBig.fill();
    contextCanvasBig.stroke();
    contextCanvasBig.restore();
}

function drawPoint(radius, index) {
    let x, y;
    x = Math.cos(rot) * radius;
    y = Math.sin(rot) * radius;
    contextCanvasBig.lineTo(x, y);
    rot += step;
    stars[index].points.push([x, y]);
}

function onCanvasBigClick(event) {
    const x = event.clientX,
        y = event.clientY;
    contextCanvasBig.beginPath();
    contextCanvasBig.arc(p[0], p[1], 5, 0, 2 * Math.PI, false);
    if (isPointInStar(x, y)) {
        contextCanvasBig.fillStyle = "pink"
    } else {
        contextCanvasBig.fillStyle = "brown"
    }
}

function isPointInStar(x, y) {
    let isInStar = false;
    stars.forEach(star => {
        for (let i = 0; i < spikes * 2; i++) {
            let edgeX1 = star.points[i][0],
                edgeY1 = star.points[i][1],
                edgeX2 = star.points[i !== 0 ? i - 1 : spikes * 2 - 1][0],
                edgeY2 = star.points[i !== 0 ? i - 1 : spikes * 2 - 1][1];
            if(((edgeY1 <= y && edgeY1 < edgeY2) || (edgeY2 <= y && y< yp)) && (x > (edgeX2 - edgeX1) * (y - edgeY1) / (edgeY2 - edgeY1) + edgeX1)) {
                   isInStar = !isInStar;
                   break;
            }
        }
        return isInStar;
    })
}
