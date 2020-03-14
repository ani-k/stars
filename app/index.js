const canvasSmall = document.getElementById('canvas-small'),
    contextCanvasSmall = canvasSmall.getContext('2d'),
    canvasBig = document.getElementById('canvas-big'),
    contextCanvasBig = canvasBig.getContext('2d'),
    stars = [
        {
            color: 'red',
            position: [70, 70],
            path: null
        },
        {
            color: 'blue',
            position: [530, 70],
            path: null
        },
        {
            color: 'green',
            position: [300, 300],
            path: null
        },
        {
            color: 'yellow',
            position: [70, 530],
            path: null
        },
        {
            color: 'black',
            position: [530, 530],
            path: null
        }
    ];

let innerRadius = 25,
    spikes = 5,
    rot = Math.PI / 2 * 3,
    step = Math.PI / spikes,
    outerRadius = 50;

canvasBig.addEventListener('click', onCanvasBigClick);

window.onload = function () {
    setCanvasSize(canvasBig, 600, 600);
    setCanvasSize(canvasSmall, 600, 50);
    for (let i = 0; i < stars.length; i++) {
        drawStar(stars[i]);
    }
};

function setCanvasSize(canvas, width, height) {
    canvas.width = width;
    canvas.height = height;
}

function drawStar(star) {
    const path = new Path2D();
    const x = star.position[0],
        y = star.position[1];

    path.moveTo(x, y - outerRadius);
    for (let i = 0; i < spikes; i++) {
        drawPoint(x, y, outerRadius, path);
        drawPoint(x, y, innerRadius, path);
    }
    path.lineTo(x, y - outerRadius);
    path.closePath();

    contextCanvasBig.strokeStyle = star.color;
    contextCanvasBig.fillStyle = star.color;
    contextCanvasBig.fill(path);
    star.path = path;
}

function drawPoint(x1, y1, radius, path) {
    let x, y;
    x = Math.cos(rot) * radius;
    y = Math.sin(rot) * radius;
    path.lineTo(x1 + x, y1 + y);
    rot += step;
}

function getMousePosition(evt) {
    let rect = canvasBig.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvasBig.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvasBig.height
    };
}

function onCanvasBigClick(event) {
    let position = getMousePosition(event);
    const star = findStarByCoordinates(position.x, position.y);
    drawAndFillCanvasSmall(star ? star.color : 'white');
}

function drawAndFillCanvasSmall(color) {
    contextCanvasSmall.fillStyle = color;
    contextCanvasSmall.rect(0, 0, 600, 50);
    contextCanvasSmall.fill();
}

function findStarByCoordinates(x, y) {
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        if (contextCanvasBig.isPointInPath(star.path, x, y)) {
            return star;
        }
    }
    return null;
}
