'use strict';
function initHealthUI(){
 const hud=document.createElement('div');hud.id='healthHUD';hud.setAttribute('role','status');hud.setAttribute('aria-label','Excalibur health');document.body.append(hud);
 const rest=document.createElement('button');rest.id='fullRestNearby';rest.hidden=true;rest.textContent='Sleep 8 hours · $100 · Full HP';rest.title='Simulated rest. The village clock stays unchanged.';document.body.append(rest);
 rest.onclick=()=>{const s=shop.scene,o=s?.objectPose||nearbyHomeObject(s);if(gameMenuOpen()||o?.kind!=='bed')return;try{const result=economy.paidRest('excalibur','rest-'+crypto.randomUUID());if(!s.objectPose)sitAtObject(s,o);dialogue.say('Excalibur','Eight hours of rest, in an instant. Fully healed: '+result.hp+'/'+result.maxHp+' HP. The village clock has not changed.',6500)}catch(e){dialogue.say('Excalibur',e.message,5000)}};
}
const healthInit=initIslandEstate;initIslandEstate=function(s){healthInit(s);initHealthUI()};
const healthUpdate=updateIslandEstate;updateIslandEstate=function(s,t){healthUpdate(s,t);const p=economy.state.accounts.excalibur.people,hud=el('healthHUD'),text='HP '+p.hp+' / '+p.maxHp;if(hud.textContent!==text){hud.textContent=text;hud.style.setProperty('--health',100*p.hp/p.maxHp+'%');hud.classList.toggle('low',p.hp<=p.maxHp*.25)}const o=s.objectPose||nearbyHomeObject(s);el('fullRestNearby').hidden=gameMenuOpen()||o?.kind!=='bed'};
