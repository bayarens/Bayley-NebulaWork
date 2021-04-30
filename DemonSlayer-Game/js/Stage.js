class Stage {
    render = []
    draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i= 0; i < this.render.length; i++){
            this.render[i].draw();
        }
        setTimeout(() => this.draw(), 200)
    }
    removeFromRender(sprite){
        if (sprite) {
            this.render.splice(this.render.indexOf(sprite), 1)
        }
    }
}

class Snowflake {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * 100;
        this.height = Math.random() * 5 + 1;
        this.width = Math.random() *  5 + 1;
        this.dy = Math.random() * 5 + 1;
        this.dx = 0;
        this.color = "white" //RGB//
        winterForrest.render.push(this);
    }
    draw(){
        this.move()
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill()
        ctx.closePath();
    }
    move(){
        this.x += this.dx;
        this.y += this.dy;
        if(this.y > canvas.height){
            winterForrest.removeFromRender(this)
        }
    }
}

setInterval(()=> new Snowflake(), 800)


const winterForrest = new Stage() 

