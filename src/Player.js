import Entity from "./Entity";
class Player extends Entity{
inventory =[];

    attribute={
        name:'Player',
        ascii:'@',
        health:10
    }
move(dx,dy)
{
    if(this.attribute.health<=0) return;
    this.x += dx;
    this.y += dy;
}
add(item){
    this.inventory.push(item);
}
copyPlayer(){
    let newPlayer=new Player();
    Object.assign(newPlayer,this);
    return newPlayer;
}
}
export default Player;