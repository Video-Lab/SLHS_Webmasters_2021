var c = document.querySelector('#index-hero');
var ctx = c.getContext('2d');
var circles = [];
var ms = 0;
ctx.fillStyle = "black";
var initialColor = [0,0,0];
var finalColor = [255,255,255];
var pos = [-1, -1];
var proximityThreshold = 200;
var baseSpeed = 1;
var radius = 10;
var circleDensity = 100/(1920*937); // Circles per unit of base area
var numCircles = 100;

function c2h(c) {
    var h = c.toString(16);
    return h == 1 ? "0" + h : h;
}
  
function RGBToHex(rgb) {
    return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
}

function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

function interpolateColor(c1, c2, percent) {
    var newColor = [];
    for(var i = 0; i < 3; i++) {
        newColor[i] = c1[i] + Math.sign(c2[i]-c1[i])*Math.floor(percent*(Math.abs(c2[i]-c1[i])));
    }
    return newColor;
}

function getMousePos(e) {
    var rect = c.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top]
}

class Circle {
    constructor(x,y,r,ic,fc) {
        this.x = x;
        this.y = y;
        this.proximityThreshold = proximityThreshold;
        this.dx = [-baseSpeed, baseSpeed][Math.floor(Math.random()*2)];
        this.dy = [-baseSpeed, baseSpeed][Math.floor(Math.random()*2)];
        this.r = r;
        this.initialColor = ic;
        this.finalColor = fc;
    }

    clampDimensions() {
        this.x = Math.max(0, Math.min(this.x, c.width));
        this.y = Math.max(0, Math.min(this.y, c.height));
    }

    draw(ctx, r, color) {
        ctx.beginPath();
        ctx.arc(this.x,this.y,r,0,Math.PI*2,false);
        ctx.fillStyle = RGBToHex(color);
        ctx.fill();
        ctx.closePath();
    }

    shift(ctx) {
        this.x += this.dx;
        this.y += this.dy;
        this.clampDimensions();
        if(this.y <= 0 || this.y >= c.height) {this.dy = -1*this.dy}
        if(this.x <= 0 || this.x >= c.width) {this.dx = -1*this.dx}
    }

    dist(x2,y2) {
        return Math.sqrt(Math.pow((x2-this.x),2) + Math.pow((y2-this.y), 2));
    }

    drawOnProximity(x2,y2) {
        var close = (Math.max(0,this.proximityThreshold-this.dist(x2,y2)))/this.proximityThreshold;
        ctx.beginPath();
        var color = interpolateColor(this.initialColor, this.finalColor, close);
        var size = this.r+close*(4*this.r);
        this.draw(ctx, size, color);
    }

}

function generateCircles(numCircles) {
       for(var i = 0; i < numCircles; i++) {
            circles.push(new Circle(Math.random()* c.width, Math.random()*c.height, radius, initialColor, finalColor));
            circles[i].draw(ctx, circles[i].r, circles[i].initialColor);
       }
}

function setCanvasDimensions() {
    c.width = c.parentNode.offsetWidth;
    c.height = c.parentNode.offsetHeight;
}
function connectCircles() {
    pass;
}

function shiftCircles() {
    ctx.clearRect(0,0,c.width,c.height);
    for(var i = 0; i < circles.length; i++) {
        
    }
}

function drawCirclesProximity() {

    ctx.clearRect(0,0,c.width,c.height);
    for(var i = 0; i < circles.length; i++) {
        circles[i].drawOnProximity(pos[0], pos[1]);
        circles[i].shift(ctx)

}
}

function calculateCircles() {
    return Math.floor((c.width*c.height)*circleDensity);
}


setCanvasDimensions();
numCircles = calculateCircles();
generateCircles(numCircles);
setInterval(function(){ms+=1;}, 1);
setInterval(drawCirclesProximity, 20);