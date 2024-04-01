class Entity{
    constructor(x,y,size,attribute)
    {
        this.x=x;
        this.y=y;
        this.size=size;
        this.attribute={...attribute};
    }

action(verb,world){
    console.log(`Verb: ${verb}`);
}

    draw(context)
    {
        context.fillStyle=this.attribute.color || 'white';
        context.textaseline='hanging';
context.font='16px Helvetica';
context.fillText(
    this.attribute.ascii,this.x*this.size+(this.attribute.offset ? this.attribute.offset.x : 0),this.y*this.size+(this.attribute.offset ? this.attribute.offset.y : 0)
);
    }
}
export default Entity;