import { Map } from "rot-js";
import Player from "./Player";
class World{
    constructor(width,height,titlesize){
        this.width=width;
        this.height=height;
        this.titlesize=titlesize;
        this.entities=[new Player(0,0,16)];
        this.history=['You enter Dungeon','---'];
        this.worldmap=new Array(this.width);
        for(let x=0;x<this.width;x++)
        {
            this.worldmap[x]=new Array(this.height);
        }
        // this.createCellularMap();
    }
    get player()
    {
        return this.entities[0];
    }

    add(entity){
        this.entities.push(entity);
    }
remove(entity){
this.entities=this.entities.filter(e=>e!==entity);

}
    moveToSpace(entity){
        for(let x=entity.x;x<this.width;x++)
        {
            for(let y=entity.y;y<this.height;y++)
            {
                if(this.worldmap[x][y]===0 && !this.getEntityAtLocation(x,y))
                {
                    entity.x=x;
                    entity.y=y;
                    return;
                }
            }
        }
    }

isWall(x,y){
    return(this.worldmap[x]===undefined || this.worldmap[y]===undefined || this.worldmap[x][y]===1);
}
getEntityAtLocation(x,y){
    return this.entities.find(entity=> entity.x===x && entity.y===y);
}

    movePlayer(dx,dy)
    {
        let temPlayer=this.player.copyPlayer();
        temPlayer.move(dx,dy);

        let entity = this.getEntityAtLocation(temPlayer.x,temPlayer.y);
        if(entity){
            console.log(entity);
            entity.action('bump',this);
            return;
        }

        if(this.isWall(temPlayer.x,temPlayer.y)){
            console.log(`Way blocked at ${temPlayer.x}:${temPlayer.y}!`);
        }else{
        this.player.move(dx,dy);
    }}
    createCellularMap()
    {
        var map=new Map.Cellular(this.width,this.height,{connected:true});
        map.randomize(0.5);
        var userCallback = (x,y,value)=>{
            if(x===0 || y===0 || x===this.width-1 || y===this.height-1){
                this.worldmap[x][y]=1;
                return;
            }
            this.worldmap[x][y]=(value===0)?1:0;
        };
        map.create(userCallback);
        map.connect(userCallback,1);
    }
    draw(context)
    {for(let x=0;x<this.width;x++)
        {
            for(let y=0;y<this.height;y++){
              if(this.worldmap[x][y] === 1) this.drawWall(context,x,y);
            }
        }
        this.entities.forEach(entity =>{
            entity.draw(context);
        })
    }
    drawWall(context,x,y)
    {
        context.fillStyle='#000';
        context.fillRect(x * this.titlesize,y*this.titlesize,this.titlesize,this.titlesize);
    }
    addToHistory(history){
this.history.push(history);
if(this.history.length>6) this.history.shift();
    }
}
export default World;