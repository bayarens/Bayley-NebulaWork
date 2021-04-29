class Stage {
    render = []
    draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let i= 0; i < this.render.length; i++){
            this.render[i].draw();
        }
        setTimeout(() => this.draw(), 200)
    }
}

const winterForrest = new Stage() 

