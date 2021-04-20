let ctx = document.getElementById('canvas').getContext('2d');
let offset = 0;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Blue and red square
    ctx.fillStyle = 'rgb(200, 0, 0)';
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    ctx.fillRect(30, 30, 50, 50);

    //square on the right 
    ctx.setLineDash([])
    ctx.strokeRect(300, 50, 100, 100);

    //Triangle
    ctx.setLineDash([4, 2]);
    ctx.lineDashOffset = -offset;

    ctx.beginPath();
    ctx.moveTo(125, 150);
    ctx.lineTo(250, 150);
    ctx.lineTo(250, 100);
    ctx.closePath();
    ctx.stroke();
   
}
    function march() {
        offset++;
        if (offset > 16) {
            offset = 0;
        }
        console.log("why aren't you spinning")
        draw();
        setTimeout(march, 20);
    }

march()






