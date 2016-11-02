$(function() {
// 4 images
    var image0 = new Image();
    image0.src = "cat1.jpg";
    var image1 = new Image();
    image1.src = "cat2.jpg";
    var image2 = new Image();
    image2.src = "cat3.jpg";
    var image3 = new Image();
    image3.src = "cat4.jpg";
// array of 4 images
    var images = new Array(image0, image1, image2, image3);

// global counter and canvas
    var counter = 0, ctx, interval, calc = true;

    var canvas = document.getElementById('drawCanvas');
    ctx = canvas.getContext('2d');

    images[0].onload = function () {
        ctx.drawImage(images[0], 0, 0, canvas.width, canvas.height);
    };

// this is the main function

// this is the function called after each timeout to draw next image


    $('#nextSlide').click(function () {

        if (calc) {
            counter++;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(images[counter], 0, 0, canvas.width, canvas.height);

        calc = true;

        if (counter == images.length - 1) {

            counter = 0;
            calc = false;
        }

        //Usage example:
    });


    /* Draw on canvas */

    ctx.lineWidth = '3';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    var color = 'yellowgreen';

    canvas.addEventListener('mousedown', startDraw, false);
    canvas.addEventListener('mousemove', draw, false);
    canvas.addEventListener('mouseup', endDraw, false);


    function drawOnCanvas(color, plots) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(plots[0].x, plots[0].y);

        for (var i = 1; i < plots.length; i++) {
            ctx.lineTo(plots[i].x, plots[i].y);
        }
        ctx.stroke();
    }


    var isActive = false;
    var plots = [];

    function draw(e) {
        if (!isActive) return;

        var x = e.offsetX || e.layerX - canvas.offsetLeft;
        var y = e.offsetY || e.layerY - canvas.offsetTop;

        plots.push({x: x, y: y});
        drawOnCanvas(color, plots);
    }

    function startDraw(e) {
        isActive = true;
    }

    function endDraw(e) {
        isActive = false;
        plots = [];
    }
});
