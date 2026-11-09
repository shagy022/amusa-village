'use strict';
// Detailed background art is fitted to the existing collision and interaction grid.
let bankRoomArt={};
const bankArtPreviousPrepare=prepareBankArt;
prepareBankArt=function(scene){bankArtPreviousPrepare(scene);for(const type of ['lobby','vault'])bankRoomArt[type]=scene.textures.get('bank-'+type+'-detailed').getSourceImage()};
function fitBankArtwork(source,xStops,yStops){const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;c.fillStyle='#192d25';c.fillRect(0,0,W,H);for(let y=1;y<yStops.length;y++)for(let x=1;x<xStops.length;x++){const [sx,dx]=xStops[x-1],[ex,rx]=xStops[x],[sy,dy]=yStops[y-1],[ey,ry]=yStops[y];c.drawImage(source,sx/1254*source.width,sy/1254*source.height,(ex-sx)/1254*source.width,(ey-sy)/1254*source.height,dx,dy,rx-dx,ry-dy)}return canvas}
const bankArtCache={};
function detailedBankBackground(vault){const key=vault?'vault':'lobby';if(bankArtCache[key])return bankArtCache[key];const source=bankRoomArt[key];if(!source)return null;return bankArtCache[key]=fitBankArtwork(source,vault?[[0,230],[145,272],[303,337],[352,361],[507,426],[552,450],[704,515],[753,539],[910,604],[954,628],[1110,693],[1254,730]]:[[0,230],[95,294],[530,434],[724,526],[1105,664],[1254,730]],vault?[[0,112],[410,234],[450,250],[580,301],[600,316],[723,367],[740,382],[866,433],[890,448],[1010,499],[1254,557]]:[[0,112],[400,245],[480,287],[656,331],[1120,537],[1254,557]])}
const bankArtPreviousPaint=drawBankInterior;
drawBankInterior=function(vault){const bg=detailedBankBackground(vault);if(!bg)return bankArtPreviousPaint(vault);ctx.save();ctx.imageSmoothingEnabled=false;ctx.drawImage(bg,0,0);if(!vault){
// Draw only the upper bodies, then restore the counter artwork in front of them.
for(const [id,x]of [['clara',360],['marigold',590]]){paintStaff(id,x,304,true);ctx.drawImage(bg,x-27,287,54,44,x-27,287,54,44);if(typeof bankStaffPresent==='function'?bankStaffPresent(id):!isResidentAtChurch(id)&&!residentAwayForVisit(id)){ctx.fillStyle='#253c31';ctx.fillRect(x-23,250,46,12);ctx.font='8px Georgia';ctx.fillStyle='#f2dfad';ctx.textAlign='center';ctx.fillText(economy.account(id).name,x,259);ctx.textAlign='start'}}
}else{for(const [i,id]of economy.state.vaultGuests.filter(id=>id!=='theo'&&(typeof residentRoom==='function'?residentRoom(id)==='vault'&&!residentControlled(id):!isResidentAtChurch(id))).slice(0,8).entries()){paintStaff(id==='shopkeeper'?'barnaby':staffArt[id]?id:'theo',277+i*55,541)}}ctx.restore()};
const bankArtPreviousSetupLockbox=setupLockboxClick;
setupLockboxClick=function(scene){bankArtPreviousSetupLockbox(scene);scene.personalBoxZone.setPosition(274,168).setSize(42,28);scene.personalBoxZone.input.hitArea.setSize(42,28)};
const bankArtPreviousWalkable=bankCanStand;
bankCanStand=function(scene,x,y){if(!bankArtPreviousWalkable(scene,x,y))return false;if(!scene.inVault&&(((x<292||x>674)&&y>340&&y<410)||((x<312||x>678)&&y>=410&&y<495)))return false;return true};
