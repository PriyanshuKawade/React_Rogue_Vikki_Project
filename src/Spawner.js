import Loot from "./Loot";
import Monster from "./Monster";
import Stairs from './Stairs'
const loottable=[
    {name:'Long Sword',color:'darkgrey',ascii:'/',offset:{x:6,y:3}},
    {name:'Health',color:'red',ascii:'!',offset:{x:6,y:3}},
    {name:'Gold',color:'orange',ascii:'$',offset:{x:3,y:3}},
    {name:'Light Armor',color:'lightgrey',ascii:'#',offset:{x:4,y:3}},

];
const monstertable=[{
    name:'Ogre',color:'lightgrey',ascii:'O',offset:{x:2,y:3},health:6},
    {
        name:'Kobold',color:'green',ascii:'k',offset:{x:4,y:3},health:3
    },{
        name:'Slime',color:'darkgreen',ascii:'S',offset:{x:3,y:2},health:2
    },{
        name:'Dragon',color:'red',ascii:'D',offset:{x:2,y:3},health:10
    }
];
class Spawner{
    constructor(world){
        this.world=world;
    }
    spawn(spawnCount,createEntity){
        for(let count=0;count<spawnCount;count++){
            let entity=createEntity();
            this.world.add(entity);
            this.world.moveToSpace(entity);
        }
    }
    spawnLoot(spawnCount){
        this.spawn(spawnCount,()=>{
            return new Loot(getRandomInt(this.world.width-1),getRandomInt(this.world.height-1),this.world.titlesize,loottable[getRandomInt(loottable.length)]);
        })
    }
    spawnMonster(spawnCount){
        this.spawn(spawnCount,()=>{
            return new Monster(getRandomInt(this.world.width-1),getRandomInt(this.world.height-1),this.world.titlesize,monstertable[getRandomInt(loottable.length)]);
        })
    }
    spawnStairs(){
        let stairs=new Stairs(this.world.width-10,this.world.height-10,this.world.titlesize);
        this.world.add(stairs);
        this.world.moveToSpace(stairs);

    }
}
function getRandomInt(max){
    return Math.floor(Math.random()*Math.floor(max));
}

export default Spawner;