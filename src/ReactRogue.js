import React, {useRef, useEffect,useState } from "react";
import InputManager from './InputManager.js';
import Player from "./Player.js";
import World from './World.js';
import Spawner from "./Spawner.js";
const ReactRogue = ({width,height,titlesize}) =>{
   const  canvasRef = useRef();
   // const [player,setPlayer] = useState(new Player(1,2,titlesize));
   const [world,setWorld]=useState(new World(width,height,titlesize));
   let inputManager = new InputManager();
   const handleInput=(action,data)=>{
    console.log(`handle input: ${action}:${JSON.stringify(data)}`);
    let newWorld=new World();
    Object.assign(newWorld,world);
    newWorld.movePlayer(data.x,data.y);
    setWorld(newWorld);
   }
   useEffect(()=>{
      console.log('Create Map');
      let newWorld=new World();
      Object.assign(newWorld,world);
      newWorld.createCellularMap();
      newWorld.moveToSpace(world.player);
      let spawner=new Spawner(newWorld);
      spawner.spawnLoot(10);
      spawner.spawnMonster(6);
      setWorld(newWorld);
   },[]);

useEffect(()=>{
console.log('Bind inputs');
inputManager.bindkeys();
inputManager.subscribe(handleInput);
return()=>{
    inputManager.unbindkeys();
    inputManager.unsubscribe(handleInput)
}
})
   useEffect(()=> {
console.log('Draw to Canvas');
const ctx=canvasRef.current.getContext('2d');
ctx.clearRect(0,0,width*titlesize,height*titlesize);
world.draw(ctx);

   }) 
 return   (<>  <canvas ref={canvasRef} width={width * titlesize} height={height * titlesize} style={{border: '1px solid black',background:'DimGray' }} ></canvas>
 <ul>
   {world.player.inventory.map((item,index)=>(<li key={index}>{item.attribute.name}</li>))}
 </ul>
 <ul>
   {world.history.map((item,index)=>(<li key={index}>{item}</li>))}
 </ul>
 </>
 )
}
export default ReactRogue;