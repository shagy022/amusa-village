/* Art direction: STYLE-GUIDE.txt. Reusable generated artwork is in assets; paths, water and effects use the native renderer. */
const W=1280,H=1728;
let seed=821;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296}
const buildings=[
 {id:'bank',name:'Amusa Community Bank',x:830,y:215,w:145,h:110,roof:'#426b56',type:'bank'},
 {id:'hall',name:'Town hall',x:510,y:185,w:156,h:116,roof:'#a8553d',type:'hall'},
 {id:'church',name:'Church',x:240,y:300,w:98,h:112,roof:'#626b78',type:'church'},
 {id:'store',name:'General store',x:735,y:420,w:120,h:90,roof:'#588078',type:'store'},
 {id:'house1',name:'West cottage',x:380,y:470,w:94,h:80,roof:'#ad6343',type:'house'},
 {id:'house2',name:'East cottage',x:680,y:120,w:94,h:80,roof:'#9e7044',type:'house'},
 {id:'house3',name:'Garden cottage',x:155,y:650,w:94,h:80,roof:'#647957',type:'house'},
 {id:'house4',name:'Orchard cottage',x:548,y:660,w:94,h:80,roof:'#ab674b',type:'house'}
];
let worldTrees=[];
let surface,ctx;const rect=(x,y,w,h,c)=>{ctx.fillStyle=c;ctx.fillRect(Math.floor(x),Math.floor(y),Math.ceil(w),Math.ceil(h))};
function line(points,c){ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(...points[0]);for(const p of points.slice(1))ctx.lineTo(...p);ctx.closePath();ctx.fill()}
function shadow(x,y,w,h){rect(x+6,y+8,w,h,'#34513a55')}
function stone(x,y,w,h){rect(x,y,w,h,'#776a51');rect(x,y,w-2,h-2,'#c6b58c');rect(x+1,y+1,w-4,1,'#e3d2a5')}
function path(x,y,w,h){rect(x,y,w,h,'#9b9256');rect(x+2,y+2,w-4,h-4,'#c3ad72');for(let i=0;i<w*h/110;i++){let a=x+3+rand()*(w-6),b=y+3+rand()*(h-6);rect(a,b,2+rand()*4,1,rand()>.5?'#dfc58a':'#b49a64')}}
function bush(x,y,s=1){if(environmentArt.botany){drawDetailedShrub(x,y,s);return}shadow(x,y,14*s,10*s);rect(x,y+3*s,16*s,8*s,'#314e36');rect(x+2*s,y,12*s,10*s,'#4b7042');rect(x+3*s,y,7*s,4*s,'#809251');rect(x+5*s,y+2*s,3*s,2*s,'#9ba65e')}
function tree(x,y,s=1){if(environmentArt.oak&&environmentArt.botany){drawDetailedTree(x,y,s);return}shadow(x-9*s,y+5*s,30*s,15*s);rect(x-3*s,y,7*s,21*s,'#473a2c');rect(x-2*s,y,2*s,20*s,'#9a7447');const leaf=(a,b,w,h,c)=>rect(x+a*s,y+b*s,w*s,h*s,c);leaf(-18,-27,35,25,'#2e4932');leaf(-23,-23,45,16,'#2e4932');leaf(-19,-35,34,24,'#45633a');leaf(-14,-43,25,30,'#4e7140');leaf(-18,-30,31,19,'#557a43');leaf(-13,-36,19,13,'#77914d');leaf(-8,-41,13,9,'#8f9e56');leaf(-17,-26,9,7,'#78914d');leaf(5,-18,12,9,'#3a5935');leaf(-12,-8,22,3,'#263e2c')}
function flowers(x,y,w=30){if(environmentArt.botany){drawDetailedFlowers(x,y,w);return}rect(x,y,w,13,'#615037');rect(x+1,y+1,w-2,10,'#394b2e');for(let i=4;i<w-2;i+=6){rect(x+i,y+5,1,5,'#7a9850');rect(x+i-1,y+3,3,3,i%12?'#edb75f':'#d78879');rect(x+i,y+3,1,1,'#ffe1a0')}}
function windowAt(x,y){rect(x,y,13,17,'#4b3b2c');rect(x+2,y+2,9,12,'#709c9d');rect(x+2,y+2,4,6,'#b9d1b3');rect(x+6,y+2,1,13,'#544635');rect(x+1,y+8,11,1,'#544635');rect(x-2,y+16,17,3,'#98744a')}
function building(b){if(b.type==='house'&&environmentArt.cottages){drawCottageExterior(b);return}if(['church','hall'].includes(b.type)&&civicArt[b.type]){drawCivicExterior(b);return}if(b.type==='store'&&storeExteriorArt){drawDistinctStore(b);return}if(b.type==='bank'&&bankExteriorArt){drawElegantBank(b);return}let {x,y,w,h,roof,type}=b;shadow(x,y,w+6,h+5);const wallY=y+39;rect(x+5,wallY,w-10,h-39,'#443b2d');rect(x+7,wallY,w-14,h-42,'#dfc793');rect(x+w-26,wallY,19,h-42,'#b8a16f');for(let i=wallY+8;i<y+h-4;i+=12){rect(x+8,i,w-36,1,'#cab080');rect(x+8,i,5,2,'#a68a5c')}
 rect(x+12,wallY,4,h-39,'#7e5b38');rect(x+w-18,wallY,4,h-39,'#775235');
 line([[x-5,wallY+3],[x+12,y+6],[x+w-15,y+6],[x+w+5,wallY+3]],'#42382e');line([[x-2,wallY-1],[x+14,y+8],[x+w-17,y+8],[x+w+1,wallY-1]],roof);rect(x+13,y+7,w-29,3,'#e0a376');
 for(let row=0;row<5;row++){let yy=y+12+row*5,left=x+12-row*2;rect(left,yy,w-27+row*4,1,'#563e3755');for(let xx=left+((row%2)*7);xx<x+w-14+row*2;xx+=14)rect(xx,yy,1,5,'#493c3544')}
 rect(x-4,wallY,w+8,4,'#594130');rect(x-2,wallY,w+3,1,'#d9a36c');let dx=x+w/2-9;rect(dx-2,y+h-30,22,30,'#6c5034');rect(dx,y+h-28,18,27,'#805a38');rect(dx+2,y+h-26,5,24,'#a17b48');rect(dx+13,y+h-15,2,2,'#e0bc63');stone(dx-5,y+h,28,7);stone(dx-8,y+h+6,34,5);windowAt(x+23,wallY+12);if(w>105)windowAt(x+w-40,wallY+12);
 if(type==='bank'){for(let xx=x+17;xx<x+w-12;xx+=31){rect(xx,wallY+4,7,h-47,'#e9d8ac');rect(xx-2,wallY+3,11,4,'#eee1bf')}rect(x+42,y+13,61,14,'#cfb77f');rect(x+67,y+14,9,12,'#8d784e')}
 if(type==='hall'){rect(x+w/2-21,y+3,42,34,'#544333');rect(x+w/2-18,y+5,36,29,'#ddc695');line([[x+w/2-25,y+7],[x+w/2,y-13],[x+w/2+25,y+7]],'#503b30');line([[x+w/2-20,y+4],[x+w/2,y-9],[x+w/2+20,y+4]],roof);rect(x+w/2-5,y+13,10,11,'#6f8a85');rect(x+15,wallY+5,6,h-47,'#f0dab0');rect(x+w-22,wallY+5,6,h-47,'#d2bb87')}
 if(type==='church'){rect(x+12,y-20,27,64,'#4c4439');rect(x+14,y-18,23,60,'#cfbe94');rect(x+20,y-8,11,19,'#4a5757');line([[x+6,y-19],[x+25,y-48],[x+44,y-19]],'#3c4245');line([[x+10,y-21],[x+25,y-43],[x+39,y-21]],'#747e83');rect(x+24,y-56,3,15,'#674d32');rect(x+20,y-52,11,3,'#674d32')}
 if(type==='store'){rect(x+10,wallY+13,w-20,18,'#4e5542');for(let k=0;k<w-20;k+=10){rect(x+10+k,wallY+13,10,16,k%20?'#dbb964':'#5e8374');rect(x+10+k,wallY+29,10,3,k%20?'#b99550':'#43695d')}rect(x+8,y+h-10,15,10,'#a47b45');rect(x+w-25,y+h-12,16,12,'#785537')}
 else{rect(x+w-29,y+11,10,19,'#6c4e37');rect(x+w-30,y+9,12,4,'#9b7952')}
 flowers(x+13,y+h+5,22);flowers(x+w-37,y+h+5,22)}
function bench(x,y,vertical=false){shadow(x,y,vertical?9:30,vertical?30:10);rect(x+2,y+5,3,10,'#493d2d');rect(x+24,y+5,3,10,'#493d2d');rect(x,y,30,4,'#c09355');rect(x,y+5,30,4,'#a67642');rect(x,y,30,1,'#e1bb79')}
function fence(x,y,w){for(let xx=x;xx<x+w;xx+=13){rect(xx,y-3,3,16,'#745637');rect(xx,y-3,2,3,'#ddbd7b')}rect(x,y,w,3,'#b38e58');rect(x,y+7,w,3,'#a07d4c')}
function fountain(x,y){shadow(x-32,y-15,70,47);stone(x-34,y-10,68,34);rect(x-29,y-8,58,24,'#435e59');rect(x-26,y-7,52,22,'#619b91');rect(x-22,y-6,44,15,'#8bb6a7');stone(x-9,y-29,18,35);stone(x-19,y-32,38,10);rect(x-16,y-31,31,4,'#8db5ab');stone(x-5,y-43,10,12);rect(x-3,y-48,6,7,'#d6cba7')}
const coast=[[1100,0],[1080,160],[1110,280],[1050,390],[970,480],[1010,570],[950,650],[870,740],[900,810],[850,880],[890,960]];
function shoreX(y){for(let i=1;i<coast.length;i++)if(y<=coast[i][1]){let [a,b]=coast[i-1],[c,d]=coast[i];return a+(c-a)*(y-b)/(d-b)}return 890}
function lane(points,width=24,material='dirt'){texturedLane(points,width,material)}
function dock(){shadow(856,735,192,29);rect(851,732,196,27,'#594635');for(let x=854;x<1046;x+=8){rect(x,733,7,23,'#a97f4e');rect(x,733,2,23,'#cfaa70');rect(x+3,736,1,17,'#93683e')}for(let x=854;x<1045;x+=42){rect(x,728,6,35,'#604832');rect(x,727,6,4,'#d1b27c')}rect(1036,710,28,70,'#554132');for(let y=712;y<779;y+=7){rect(1038,y,24,6,'#b58d58');rect(1038,y,24,1,'#dbb77c')}
 drawEnhancedDockDetails();}
function makeWorld(){seed=821;surface=document.createElement('canvas');surface.width=W;surface.height=H;ctx=surface.getContext('2d');ctx.imageSmoothingEnabled=false;rect(0,0,W,H,'#788b51');for(let i=0;i<27000;i++){let x=rand()*W,y=rand()*H;rect(x,y,rand()>.8?3:1,1,['#859759','#70864b','#939f60','#687f47'][i%4])}
 // A continuous coast exits the map on three sides, rather than enclosing a pond.
 const edge=coast.map(([x,y])=>[x,y]);line([...edge,[W,H],[W,0]],'#b8ac7b');line([...edge.map(([x,y])=>[x+19,y]),[W,H],[W,0]],'#d6c492');line([...edge.map(([x,y])=>[x+39,y]),[W,H],[W,0]],'#77aaa0');line([...edge.map(([x,y])=>[x+62,y]),[W,H],[W,0]],'#568f8c');
 for(let i=0;i<900;i++){let y=rand()*H,x=shoreX(y)+48+rand()*270;if(x<W)rect(x,y,4+rand()*13,1,i%4?'#88b7a344':'#bcdbbc77')}
 for(let y=20;y<H;y+=18){let x=shoreX(y);rect(x+25,y,10,2,'#eee0ac');if(y%3)rect(x+32,y+4,8,1,'#c5d6b0');if(y%4===0){stone(x-9,y+2,11,7);stone(x-15,y+7,7,5)}}
 drawShoreDetails();drawLakeWorld();drawSouthernForest();
 // Meandering lanes follow the settlement; staggered buildings avoid paired rows.
 lane([[588,310],[588,354],[615,393],[615,447],[633,505],[610,559],[595,610],[595,749],[635,794],[769,794],[815,747],[865,746]],28);
 lane([[290,421],[290,448],[348,448],[348,520],[427,520],[490,551],[610,559]],23);
 lane([[795,511],[795,539],[719,558],[633,505]],25);
 lane([[903,331],[903,356],[835,375],[750,367],[687,312],[588,354]],25,'brick');
 lane([[727,211],[727,270],[687,312],[588,354]],22);
 lane([[201,741],[201,767],[270,767],[335,727],[426,727],[497,750],[595,749]],22);
 lane([[588,354],[504,354],[455,386],[380,432],[290,432],[290,421]],21,'stone');lane([[588,310],[588,354]],28,'stone');
 // The northern and southwestern meadows intentionally have no buildings or fences.
 lane([[348,520],[286,545],[215,545],[165,517]],17);
 drawFishingHomePaths();drawTownSquare();drawCemetery();bench(819,701);
 fence(363,575,87);fence(148,757,33);fence(256,699,27);fence(660,236,31);
 for(let yy=0;yy<4;yy++)for(let xx=0;xx<6;xx++){rect(277+xx*9,654+yy*9,7,6,'#69573b');rect(279+xx*9,655+yy*9,3,3,'#9aab5d')}
 // Trees cluster at natural edges, leaving several substantial clearings for growth.
 const trees=[...southernTrees];for(let x=22;x<1050;x+=30+rand()*24)trees.push([x,44+rand()*42,1+rand()*.3]);for(let y=130;y<930;y+=40+rand()*25)trees.push([23+rand()*40,y,1.1+rand()*.2]);
 [[119,299],[136,287],[196,275],[360,333],[334,368],[471,192],[795,162],[838,199],[877,397],[914,456],[477,646],[431,620],[123,625],[114,674],[322,822],[372,870],[453,903],[104,901],[752,685],[786,649],[700,870],[750,903],[797,855],[618,92]].forEach(p=>trees.push([...p,1+rand()*.2]));
 for(let i=0;i<70;i++){let x=80+rand()*900,y=100+rand()*800;if(x>shoreX(y)-28&&x<shoreX(y)-12)bush(x,y,.7)}
 worldTrees=trees.filter(([x,y])=>!(typeof riverCenter==='function'&&Math.abs(y-riverCenter(x))<65)&&!economy.state.fishing.homes.some(b=>x>b.x-24&&x<b.x+b.w+24&&y>b.y-25&&y<b.y+b.h+45));for(const b of buildings){building(b);if(b.type==='house'){drawHomeGarden(b);drawHouseMailbox(b);}}worldTrees.sort((a,b)=>a[1]-b[1]).forEach(t=>tree(...t));dock();
 // All path lamps, including the five original posts, now share the live lighting system.
 return surface}
function interior(b){surface=document.createElement('canvas');surface.width=W;surface.height=H;ctx=surface.getContext('2d');rect(0,0,W,H,'#192d25');let x=230,y=160,w=500,h=390;shadow(x,y,w,h);rect(x-9,y-49,w+18,h+60,'#3e352d');rect(x,y,w,h,'#a57b4e');for(let yy=y;yy<y+h;yy+=12)for(let xx=x;xx<x+w;xx+=40){rect(xx,yy,Math.min(39,x+w-xx),11,(xx+yy)%80?'#ac8454':'#b38b5a');rect(xx+1,yy,Math.min(37,x+w-xx-1),1,'#c59b63');rect(xx+5,yy+7,Math.max(0,Math.min(7,x+w-xx-5)),1,'#8d663e')}
 rect(x,y-40,w,65,'#b49a73');rect(x,y-40,w,3,'#e6cea0');rect(x,y+22,w,7,'#65513b');for(let xx=x+14;xx<x+w;xx+=40)rect(xx,y-35,2,55,'#a28761');windowAt(x+57,y-22);windowAt(x+w-72,y-22);rect(x+12,y-4,91,45,'#e4cd8a22');
 const table=(a,c,ww,hh)=>{shadow(a,c,ww,hh+5);rect(a+3,c+hh,5,8,'#4c3828');rect(a+ww-8,c+hh,5,8,'#4c3828');rect(a,c,ww,hh,'#58412f');rect(a+2,c+2,ww-4,hh-5,'#ae8049');rect(a+3,c+2,ww-6,2,'#d1aa68')};const chair=(a,c)=>{rect(a,c,19,23,'#483a2b');rect(a+2,c+2,15,6,'#b0824e');rect(a+2,c+12,15,8,'#9b7042')};
 if(b.type==='hall'){drawTownHall(false)} else if(b.type==='bank'||b.type==='vault'){drawBankInterior(b.type==='vault',table)}
 else if(b.type==='church'){drawChurchInterior()} else if(b.type==='store'){drawDetailedStore()}else if(b.type==='house'){drawCottageInterior(b)}
 else{rect(282,220,96,128,'#594836');rect(286,224,88,113,'#d3c397');rect(290,227,80,27,'#eee0b5');rect(286,265,88,72,'#7c9173');rect(286,267,88,3,'#b2bf90');table(536,264,105,55);chair(576,331);rect(545,273,24,16,'#e2d5ac');rect(425,383,130,98,'#805748');rect(429,387,122,90,'#b38e62');rect(433,391,114,82,'#c4a271');table(631,423,54,30)}
 if(!['store','hall','church','house','bank','vault'].includes(b.type)){bush(260,187,1.2);bush(686,187,1.2);rect(249,198,17,17,'#956744');rect(685,198,17,17,'#956744');rect(462,539,36,12,'#23362b');stone(457,551,46,8);}return surface}
class Village extends Phaser.Scene{
 preload(){this.load.image('shore-details','assets/shore-detail-atlas.png');this.load.image('island-atlas','assets/island-estate-atlas-transparent.png');this.load.image('bob-source','assets/bob-sheet.png');this.load.image('bob-phone-source','assets/bob-phone-sheet.png');for(const type of ['lobby','vault'])this.load.image('bank-'+type+'-detailed','assets/bank-'+type+'-detailed-v2.png');for(const id of ['fish-species-detailed','water-habitats','shop-interior-detailed'])this.load.image(id,'assets/'+id+'.png');this.load.image('cottage-interiors-detailed','assets/cottage-interiors-spacious.png');this.load.image('sailboat-directions','assets/sailboat-directions.png');for(const id of ['cottage-colorways','village-oak','village-botany'])this.load.image(id,'assets/'+id+'.png');for(const id of ['church-exterior','townhall-exterior','jesus-statue'])this.load.image(id,'assets/'+id+'.png');this.load.image('town-fountain','assets/town-fountain.png');this.load.image('store-distinct','assets/store-exterior.png');this.load.spritesheet('polly-source','assets/polly-sheet.png',{frameWidth:362,frameHeight:362});this.load.spritesheet('excalibur-source','assets/excalibur-sheet.png',{frameWidth:362,frameHeight:362});for(const id of ['theo','clara','marigold','barnaby'])this.load.image('staff-'+id,'assets/'+id+'-sheet'+(id==='theo'?'-v2':'')+'.png');this.load.image('bank-elegant','assets/bank-gold-dome.png');this.load.svg('bank-symbol','assets/bank-currency-overlay.svg',{width:36,height:40})}
 makeHero(){
  this.game.canvas.setAttribute('tabindex','0');this.game.canvas.style.outline='none';
  this.game.canvas.addEventListener('pointerdown',()=>this.game.canvas.focus({preventScroll:true}));
  // Equal cells are sampled with nearest-neighbor filtering into game-sized frames.
  const source=this.textures.get('excalibur-source').getSourceImage();
  const sheet=document.createElement('canvas');sheet.width=144;sheet.height=192;
  const c=sheet.getContext('2d');c.imageSmoothingEnabled=false;
  for(let r=0;r<4;r++)for(let col=0;col<3;col++)c.drawImage(source,col*362,r*362,362,362,col*48,r*48,48,48);
  this.textures.addSpriteSheet('excalibur',sheet,{frameWidth:48,frameHeight:48});
  ['down','left','right','up'].forEach((dir,row)=>this.anims.create({key:'walk-'+dir,frames:[row*3,row*3+1,row*3+2,row*3+1].map(frame=>({key:'excalibur',frame})),frameRate:9,repeat:-1}));
  this.hero=this.add.sprite(625,548,'excalibur',1).setOrigin(.5,.94).setScale(.8).setDepth(20);
  this.heroShadow=this.add.ellipse(625,548,17,6,0x253629,.3).setDepth(19);
  this.nameTag=this.add.text(625,506,'Excalibur',{fontFamily:'Georgia',fontSize:'10px',color:'#fff2cd',backgroundColor:'#25382de6',padding:{x:5,y:3},stroke:'#25382d',strokeThickness:1}).setOrigin(.5,1).setDepth(21);
  this.face='down';this.follow=true;this.cam.setZoom(Math.max(this.fitZoom,1.8));this.cam.centerOn(this.hero.x,this.hero.y);this.updateTag();
 }
 updateTag(){this.heroShadow.setPosition(this.hero.x,this.hero.y-1);this.nameTag.setPosition(this.hero.x,this.hero.y-39)}
 canStand(x,y){
  if(this.rooms&&this.currentBuilding.type==='house')return cottageWalkable(x,y);
  if(this.rooms&&this.currentBuilding.type==='church')return AmusaCivicRules.churchWalkable(x,y);
  if(this.rooms&&this.currentBuilding.type==='hall')return AmusaCivicRules.hallWalkable(!!this.inBoardroom,x,y);
  if(this.rooms&&this.currentBuilding.type==='store')return AmusaLifeRules.storeWalkable(x,y);
  if(this.rooms&&this.currentBuilding.type==='bank')return bankCanStand(this,x,y);
  if(this.rooms){if(x<248||x>712||y<200||y>548)return false;const b=this.currentBuilding;if(b.type==='store'&&((x>291&&x<668&&y>270&&y<330)||(x>259&&x<701&&y<246)||(y>404&&y<457&&[280,360,440,520,600].some(a=>x>a-7&&x<a+52))))return false;return !(b.type==='hall'&&x>404&&x<556&&y>283&&y<448)}
  if(!lakeStumpWalkable(x,y))return false;
  if(x<75||x>W-20||y<96||y>H-25)return false;
  const onDock=x>=845&&x<=1059&&y>=737&&y<=761;
  if(x>shoreX(y)+12&&!onDock)return false;
  if(buildings.some(b=>x>b.x-5&&x<b.x+b.w+5&&y>b.y+4&&y<b.y+b.h+7))return false;
  if(!townSquareWalkable(x,y)||!cemeteryWalkable(x,y))return false;
  if(worldTrees.some(([a,b])=>Math.abs(x-a)<7&&Math.abs(y-(b+12))<9))return false;
  return true;
 }
 moveHero(t,delta){if(moveHouseholdActor(this,t))return;
  if(this.sailing){moveSailboat(this,t,delta);return;}
  if(updatePlayerSeating(this))return;
  if(!document.querySelector('#instructions').hidden||gameMenuOpen()){this.hero.stop();return;}
  let k=this.keys,dx=Number(k.D.isDown||k.RIGHT.isDown)-Number(k.A.isDown||k.LEFT.isDown),dy=Number(k.S.isDown||k.DOWN.isDown)-Number(k.W.isDown||k.UP.isDown);
  if(dx||dy){this.follow=true;const speed=(k.SHIFT.isDown?135:83)*(companionUpgrade.ride?2:1)*Math.min(delta,40)/1000,n=Math.hypot(dx,dy);let x=this.hero.x+dx/n*speed,y=this.hero.y+dy/n*speed;
   if(this.canStand(x,this.hero.y))this.hero.x=x;if(this.canStand(this.hero.x,y))this.hero.y=y;
   this.face=Math.abs(dx)>Math.abs(dy)?(dx<0?'left':'right'):(dy<0?'up':'down');this.hero.play('walk-'+this.face,true);this.hero.anims.timeScale=k.SHIFT.isDown?1.5:1;
  }else{this.hero.stop();this.hero.setFrame({down:1,left:4,right:7,up:10}[this.face])}
  bankMovement(this,dy,t);this.updateTag();if(this.follow&&!this.rooms)this.cam.centerOn(this.hero.x,this.hero.y-15);
  if(!this.rooms&&dy<0&&t>(this.doorCooldown||0)){const b=buildings.find(b=>Math.abs(this.hero.x-(b.x+b.w/2))<15&&this.hero.y>b.y+b.h&&this.hero.y<b.y+b.h+18);if(b)this.enter(b)}
  if(this.rooms&&this.currentBuilding.type!=='hall'&&dy>0&&this.hero.y>537&&Math.abs(this.hero.x-480)<25)this.leave();
 }

 create(){prepareLivingWorld();prepareBankArt(this);prepareCivicArt(this);prepareTownSquare(this);prepareEnvironmentArt(this);prepareWaterfrontArt(this);prepareLakeArt(this);prepareShoreDetails(this);storeExteriorArt=this.textures.get('store-distinct').getSourceImage();this.textures.addCanvas('world',makeWorld());this.land=this.add.image(0,0,'world').setOrigin(0);this.cam=this.cameras.main;this.cam.setBackgroundColor('#263d2d');this.cam.setBounds(0,0,W,H);this.cam.centerOn(610,455);this.fitZoom=Math.min(this.scale.width/W,this.scale.height/960);this.cam.setZoom(this.fitZoom*.97);this.cam.centerOn(W/2,480);this.keys=this.input.keyboard.addKeys('W,A,S,D,UP,DOWN,LEFT,RIGHT,ESC,PLUS,MINUS,SHIFT');this.rooms=false;this.dragged=false;installWorldUIShield(this);
 this.hotspots=[];this.mark=this.add.graphics();this.water=this.add.graphics();this.makeHero();setupLockboxClick(this);this.createShopkeeper();this.keeper.setTexture('npc-barnaby',1).setDisplaySize(40,40);shop.scene=this;initVillageLife(this);initBob(this);initCivic(this);initTownSquare(this);initEnvironment(this);initPeople(this);initWaterfront(this);initLakeLife(this);initHouseholds(this);initWeather(this);initBarnabyLife(this);initNightLights(this);initGraveGhost(this);initVillageMenus(this);initResidentInteractions(this);initPersonalConversations();initIslandEstate(this);
 this.input.on('pointerdown',p=>{this.dragging=true;this.dragged=false;this.start={x:p.x,y:p.y};this.prior={x:p.x,y:p.y}});this.input.on('pointermove',p=>{if(this.dragging&&!this.rooms&&!gameMenuOpen()){if(Math.hypot(p.x-this.start.x,p.y-this.start.y)>5)this.dragged=true;if(this.dragged){this.follow=false;this.cam.scrollX-=(p.x-this.prior.x)/this.cam.zoom;this.cam.scrollY-=(p.y-this.prior.y)/this.cam.zoom;this.mark.clear()}this.prior={x:p.x,y:p.y}}});this.input.on('pointerup',()=>{this.dragging=false});this.input.on('wheel',(p,o,dx,dy)=>{if(!this.rooms&&!gameMenuOpen())this.cam.setZoom(Phaser.Math.Clamp(this.cam.zoom-dy*.001,this.fitZoom,3.5))});
 document.querySelector('#home').onclick=()=>{if(this.inBoardroom)leaveBoardroom(this);if(this.inVault)bankExitVault(this);if(this.rooms)this.leave();this.cam.setZoom(Math.max(this.fitZoom,1.35));this.follow=true;this.cam.centerOn(this.hero.x,this.hero.y)};document.querySelector('#overview').onclick=()=>{if(this.inBoardroom)leaveBoardroom(this);if(this.rooms)this.leave();this.follow=false;this.cam.setZoom(this.fitZoom*.97);this.cam.centerOn(W/2,480)};document.querySelector('#back').onclick=()=>this.leave();this.input.keyboard.on('keydown-ESC',()=>{if(gameMenuOpen())return;if(this.rooms)this.leave();document.querySelector('#instructions').hidden=true});this.scale.on('resize',()=>{this.fitZoom=Math.min(this.scale.width/W,this.scale.height/960);if(this.rooms)this.roomFit()});
 }
 createShopkeeper(){
  const canvas=document.createElement('canvas');canvas.width=32;canvas.height=45;const c=canvas.getContext('2d');const r=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(x,y,w,h)};
  // A code-native sprite using the village palette: grey hair, spectacles, apron.
  r(6,6,21,17,'#493d32');r(7,3,18,10,'#b9b2a0');r(9,2,12,5,'#ddd5b9');r(8,10,16,14,'#c69c71');r(10,8,13,5,'#e2b98b');r(6,12,3,8,'#c1bba6');r(23,12,3,8,'#c1bba6');
  r(8,14,7,6,'#463c32');r(18,14,7,6,'#463c32');r(10,15,4,3,'#9cb4ad');r(19,15,4,3,'#9cb4ad');r(15,15,3,1,'#463c32');r(16,18,3,4,'#b1845e');
  r(9,23,16,6,'#bcb6a3');r(12,27,10,6,'#d8d0b5');r(15,31,5,3,'#c3bba4');r(11,22,4,3,'#e0d7ba');r(20,22,4,3,'#e0d7ba');
  r(5,26,6,14,'#6e7c61');r(24,26,5,14,'#52644c');r(10,32,14,10,'#8c6945');r(12,34,10,8,'#ba9867');r(7,38,5,5,'#d0a97c');r(23,38,5,5,'#b98e63');
  this.textures.addCanvas('barnaby',canvas);this.keeper=this.add.sprite(480,250,'barnaby').setOrigin(.5,1).setVisible(false).setDepth(5);
  this.keeperTag=this.add.text(480,236,'Barnaby',{fontFamily:'Georgia',fontSize:'9px',color:'#f5dfaa',backgroundColor:'#263a2b',padding:{x:4,y:2}}).setOrigin(.5,1).setVisible(false).setDepth(6);
  this.goods=this.add.graphics().setVisible(false).setDepth(4);this.shelfHour=null;
 }
 refreshShelves(){if(!this.rooms||this.currentBuilding.type!=='store')return;this.shelfHour=AmusaEconomy.hourKey();const items=economy.stock();const g=this.goods;g.clear();
  const draw=(i,x,y)=>{g.fillStyle(0x493d2f).fillRect(x-7,y-13,15,14);const colors={food:0xdab467,potion:0xbd6258,plant:0x8fa35e,gear:0xabb6ab,book:0x886e51,cloth:0x929caa,gem:0xe3bd65};g.fillStyle(i.remaining?colors[i.kind]:0x65533c);if(i.kind==='potion'){g.fillRect(x-4,y-10,9,10);g.fillRect(x-2,y-14,5,5);g.fillStyle(0xe8cb8a).fillRect(x-2,y-15,5,2)}else if(i.kind==='plant'){g.fillRect(x-5,y-12,11,7);g.fillStyle(0xb58b54).fillRect(x-4,y-5,9,6)}else{g.fillRect(x-5,y-11,11,11);g.fillStyle(0xe2c999,.7).fillRect(x-4,y-10,3,3)}};
  items.forEach((item,i)=>{draw(item,284+i*53,216);if(i<5)draw(item,302+i*80,410)});
  // Barnaby's decorative boomstick is safely stowed under the counter.
  g.fillStyle(0x4d3828).fillRect(502,311,14,5);g.fillStyle(0x75807a).fillRect(515,309,31,3);g.fillStyle(0xa8b0a0).fillRect(515,309,31,1);
 }
 outline(b){this.mark.clear().lineStyle(1,0xf7dfa4,.85).strokeRoundedRect(b.x-6,b.y-25,b.w+12,b.h+40,2)}
 enter(b){if(this.sailing)return;standHomeActor(this);this.homeWalk=null;standFromLounge(this);dialogue.clear();this.saved={x:this.cam.midPoint.x,y:this.cam.midPoint.y,z:this.cam.zoom};this.outside={x:this.hero.x,y:this.hero.y};this.currentBuilding=b;this.rooms=true;this.hero.setPosition(480,b.type==='store'?475:b.type==='hall'?566:518);this.updateTag();this.mark.clear();this.water.clear();if(this.textures.exists('room'))this.textures.remove('room');this.textures.addCanvas('room',interior(b));this.land.setTexture('room');this.hotspots.forEach(z=>z.disableInteractive());this.roomFit();this.keeper.setVisible(b.type==='store');this.keeperTag.setVisible(b.type==='store');this.goods.setVisible(b.type==='store');if(b.type==='store'){this.refreshShelves();shop.enter(this)}bankOnEnter(this,b);enterVillageLife(this,b);enterCivic(this,b);document.querySelector('#place').textContent=b.name+(b.owner?' · '+(economy.state.accounts[b.owner]?.name||'Market')+'’s property':'');document.querySelector('#back').hidden=false;document.querySelector('#hint').textContent='WASD / arrows to walk - Shift to run - Esc to leave';}
 roomFit(){if(this.currentBuilding?.type==='house'){this.cam.setZoom(Math.min(this.scale.width/500,this.scale.height/460));this.cam.centerOn(480,333);return}if(this.currentBuilding?.type==='hall'&&!this.inBoardroom){this.cam.setZoom(Math.min(this.scale.width/700,this.scale.height/545));this.cam.centerOn(480,365);return}if(this.currentBuilding?.type==='hall'&&this.inBoardroom){this.cam.setZoom(Math.min(this.scale.width/540,this.scale.height/460));this.cam.centerOn(480,335);return}if(this.currentBuilding?.type==='store'){this.cam.setZoom(Math.min(this.scale.width/440,this.scale.height/410));this.cam.centerOn(480,315);return}this.cam.setZoom(Math.min(this.scale.width/590,this.scale.height/500));this.cam.centerOn(480,340)}
 leave(){if(!this.rooms)return;standHomeActor(this);this.homeWalk=null;standFromLounge(this);if(this.inBoardroom){leaveBoardroom(this);return}leaveCivic(this);if(this.inVault){bankExitVault(this);return}leaveVillageLife(this);bankOnLeave(this);shop.leave();pauseGameKeys(gameMenuOpen());this.keeper.setVisible(false);this.keeperTag.setVisible(false);this.goods.setVisible(false);this.rooms=false;this.hero.setPosition(this.currentBuilding.x+this.currentBuilding.w/2,this.currentBuilding.y+this.currentBuilding.h+23);this.doorCooldown=this.time.now+700;this.updateTag();this.land.setTexture('world');this.hotspots.forEach(z=>z.setInteractive({useHandCursor:true}));this.cam.setZoom(this.saved.z);this.cam.centerOn(this.saved.x,this.saved.y);document.querySelector('#place').textContent='Excalibur explores the village.';document.querySelector('#back').hidden=true;document.querySelector('#hint').textContent='WASD / arrows to walk - Shift to run - Walk into a doorway to enter';}
 update(t,delta){restoreSpiritJumps(this);this.moveHero(t,delta);updateVillageLife(this,t,delta);updateCivic(this,t,delta);updateTownSquare(this,t,delta);updateEnvironment(this);updatePeopleVisits(this,t);updateWaterfront(this,t);updateLakeLife(this,t);updateHouseholds(this,t);updateBarnabyLife(this,t);updateGraveGhost(this,t);updateWeather(this,t);updateNightLights(this,t);updateVillageMenus(this,t);updateBob(this,t,delta);updateResidentInteractions(this,t,delta);updateIslandEstate(this,t);if(this.rooms)return;let k=this.keys;if(k.PLUS.isDown)this.cam.zoom=Math.min(3.5,this.cam.zoom+.01);if(k.MINUS.isDown)this.cam.zoom=Math.max(this.fitZoom,this.cam.zoom-.01);this.water.clear().lineStyle(1,0xd0e3c2,.65);this.water.fillStyle(0xb3cfc0,.45);for(let i=0;i<35;i++){let y=90+i*24,x=shoreX(y)+65+Math.sin(t/1400+i)*7;this.water.fillRect(x,y,12,1);this.water.fillRect(x+85,y+8,7,1)}}
}
installEstateVillage(Village);
installSpaVillage(Village);
installMansionInteractions(Village);
installWaterSafety(Village);
installBigfoot(Village);
installBigfootResidents(Village);
installSouthernForest(Village);
installCommerceHours(Village);
installCompanionUpgrade(Village);
installResidentRepair(Village);
installNewVillagers(Village);
installEncounterRenderer(Village);
installResidentHomes(Village);
installEtna(Village);
installMine(Village);
installGauntlet(Village);
installBattleMagic(Village);
installGoblinKing(Village);
installVillagePerformance(Village);
const game=new Phaser.Game({type:Phaser.CANVAS,parent:'game',pixelArt:true,roundPixels:true,backgroundColor:'#263d2d',scale:{mode:Phaser.Scale.RESIZE,width:innerWidth,height:innerHeight},scene:Village,input:{activePointers:2},render:{antialias:false}});
document.querySelector('#help').onclick=()=>document.querySelector('#instructions').hidden=!document.querySelector('#instructions').hidden;document.querySelector('#closeHelp').onclick=()=>document.querySelector('#instructions').hidden=true;






