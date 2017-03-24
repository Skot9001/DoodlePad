var canvas;
var context;
var drawShape = 'circle';
//Mouse Status
var mousedown = false;
//Default Line Color(Black)
var lineColor = '#000000';
//Prompt for line size(temporary)
var lineSize = 20;

function onload() {
    //Declaring canvas and setting size
    canvas = document.getElementById("myCanvas");
    context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * .9;

    //Testing for mousedown
    document.body.onmousedown = function () {
        mousedown = true;
    }
    document.body.onmouseup = function () {
        mousedown = false;
    }
}

//Set Line Color by button pressed
function setColor(color) {
    lineColor = color;
}

//Set Line Size by input slider bar value
function setSize(size) {
    lineSize = size;
    window.alert("Your new size is " + size);
}

//Draws a circle at mouse position everytime mouse is moved and mousedown is met
function makeLine(size) {
    if(drawShape==='Circle') {
        context.beginPath();
        context.arc(event.clientX, event.clientY, size, 0, 2 * Math.PI);
        context.strokeStyle = lineColor;
        context.fillStyle = lineColor;
        context.fill();
        context.stroke();
    }
    else if(drawShape==='Square') {
        context.beginPath();
        context.rect(event.clientX-size, event.clientY-size, size*2, size*2);
        context.strokeStyle = lineColor;
        context.fillStyle = lineColor;
        context.fill();
        context.stroke();
    }
    else if(drawShape==='Experiment') {

        context.beginPath();
        var gradient = context.createRadialGradient(event.clientX, event.clientY, size-(size/4), event.clientX, event.clientY, size);
        gradient.addColorStop(0, lineColor);
        gradient.addColorStop(1, '#FFFFFF');
        context.fillRect(event.clientX-size,event.clientY-size,size*2,size*2);
        context.fillStyle = gradient;
        context.fill;
        context.stroke; 
        
    }
}

//Checks if mousedown==true and calls makeLine onmousemove
function draw() {
    if (mousedown) {
        document.getElementById('myCanvas').innerHTML = makeLine(lineSize);
    }
}

//Scales canvas to match window when it's resized
function onResize() {
    var oldCanvas = canvas.toDataURL("image");
    var img = new Image();
    img.src = oldCanvas;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * .9;
    context.drawImage(img, 0, 0);
}

//Draws a white rectangle over the canvas to "clear" it
function clearCanvas() {
    var response = window.confirm("Do you really want to clear?");
    if(response==true) {
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = '#FFFFFF';
        context.fillStyle = '#FFFFFF';
        context.fill();
        context.stroke();
    } 
    else
        window.alert("Clear cancelled");   
}
function toggleShape(shape) {
    drawShape = shape;
}
function setEraser() {
    drawShape = 'Circle';
    lineColor = '#FFFFFF';
}