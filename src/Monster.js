import Entity from "./Entity";

class Monster extends Entity{
    action(verb,world){
        if(verb==='bump')
        {
           world.addToHistory(`Player attacks ${this.attribute.name}!`);
           this.attribute.health=this.attribute.health-1;
           if(this.attribute.health<=0){
            world.addToHistory(`${this.attribute.name} dies!`);
            world.remove(this);
           }
           else{
            world.addToHistory(`${this.attribute.name}'s health=${this.attribute.health}`);
            world.player.attribute.health=world.player.attribute.health - 1;
            if(world.player.attribute.health<=0)
            {
                world.addToHistory(`You have died!`);
            }
            else{
                world.addToHistory(`You have ${world.player.attribute.health} health`)
            }
           }
        }
    }
}

export default Monster;