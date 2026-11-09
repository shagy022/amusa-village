'use strict';
// Phaser also receives mouse events from the window. Only canvas-owned gestures
// may hit world objects; HTML controls must never activate the map behind them.
function installWorldUIShield(scene){const input=scene.input,canvas=scene.game.canvas,hitTest=input.hitTestPointer;input.hitTestPointer=function(pointer){const event=pointer.event;if(event?.target&&event.target!==canvas)return [];if(['mouseup','touchend','pointerup'].includes(event?.type)&&pointer.downElement!==canvas)return [];return hitTest.call(this,pointer)};input.on('pointerupoutside',()=>{scene.dragging=false;scene.dragged=false;scene.mark?.clear()})}
