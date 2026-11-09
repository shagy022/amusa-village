(function(root){'use strict';
const species=[
 {id:'bluegill',name:'Bluegill',chance:39,maxWeight:2,minWeight:.1,maxLength:16,pricePerLb:2,color:'#72a69c'},
 {id:'crappie',name:'Crappie',chance:30,maxWeight:5,minWeight:.2,maxLength:22,pricePerLb:3,color:'#b4c6b4'},
 {id:'catfish',name:'Catfish',chance:20,maxWeight:60,minWeight:1,maxLength:72,pricePerLb:3.5,color:'#7a9199'},
 {id:'bass',name:'Largemouth bass',chance:10,maxWeight:25,minWeight:.5,maxLength:40,pricePerLb:4,color:'#789a58'},
 {id:'golden-carp',name:'Golden carp',chance:1,maxWeight:50,minWeight:2,maxLength:60,pricePerLb:5,color:'#dfb34d'}
];
const treasures=[
 ['crypto-case','Briefcase full of crypto',1250,'currency','A recovered Amusa wallet credited directly to your cash.'],
 ['coin-pouch','Lost gold coin pouch',750,'currency','Spendable Amusa coins, credited when kept.'],
 ['antique-painting','Antique harbor painting',1800,'valuable','An original painting in an ornate gilt frame.'],
 ['pearl-necklace','Pearl necklace',950,'valuable','A strand of coastal pearls.'],
 ['sapphire-brooch','Sapphire brooch',1100,'valuable','Silver filigree and a blue sapphire.'],
 ['gold-watch','Golden pocket watch',650,'valuable','An engraved antique timepiece.'],
 ['spyglass','Captain’s brass spyglass',450,'valuable','A fine old mariner’s instrument.'],
 ['silver-goblet','Antique silver goblet',320,'valuable','A decorated silver cup.'],
 ['emerald-ring','Emerald ring',1400,'valuable','A gold ring with a brilliant green stone.'],
 ['ruby-pendant','Ruby pendant',1600,'valuable','A deep red ruby on a golden chain.'],
 ['rare-chart','Rare captain’s chart',800,'valuable','A collectible hand-drawn coastal chart.'],
 ['music-box','Antique music box',520,'valuable','An intricately carved musical keepsake.'],
 ['statuette','Ancient bronze statuette',1250,'valuable','A small weathered bronze sculpture.'],
 ['jeweled-compass','Jeweled compass',900,'valuable','A brass compass set with small gems.'],
 ['gold-bullion','Sealed gold bullion',3000,'valuable','A remarkably heavy gold bar.'],
 ['vintage-camera','Vintage folding camera',700,'valuable','A collector’s camera in a watertight case.'],
 ['ornate-key','Ornate silver key',200,'valuable','A valuable decorative antique key.'],
 ['fossil','Rare ammonite fossil',380,'valuable','A beautifully preserved spiral fossil.'],
 ['porcelain-vase','Royal porcelain vase',600,'valuable','A hand-painted porcelain vase.'],
 ['cottage-deed','Deed to a new cottage',150000,'deed','Keep it to receive a new cottage in the expansion meadow. Selling the deed sells that property too.']
].map(([id,name,dollars,type,description])=>({id,name,value:dollars*100,type,description}));
const houseLots=[{x:145,y:125},{x:300,y:140},{x:300,y:780},{x:490,y:790}];
function chooseSpecies(u){let total=0;for(const s of species){total+=s.chance/100;if(u<total)return s}return species.at(-1)}
function foodValue(id,weight){const s=species.find(s=>s.id===id);return s?Math.max(1,Math.round(Number(weight)*s.pricePerLb*100)):0}
function rollCatch(rng=Math.random){if(rng()<.01){const t=treasures[Math.min(19,Math.floor(rng()*20))];return {...t,kind:'treasure',fightWeight:12,weight:0,length:0}}const s=chooseSpecies(rng()),weight=Math.min(s.maxWeight,Math.max(s.minWeight,Math.round((s.minWeight+Math.pow(rng(),2.8)*(s.maxWeight-s.minWeight))*100)/100)),length=Math.round(s.maxLength*Math.cbrt(weight/s.maxWeight)*10)/10;return {kind:'fish',species:s.id,name:s.name,weight,length,value:foodValue(s.id,weight),fightWeight:weight}}
function createFight(catchData,seed=0){return {health:100,distance:100,tension:0,elapsed:0,weight:catchData.fightWeight||catchData.weight,seed,status:'fighting',jump:0}}
function stepFight(f,seconds,reeling){if(f.status!=='fighting')return f;const dt=Math.max(0,Math.min(.05,seconds)),small=f.weight<=2,power=Math.min(1,f.weight/20);f.elapsed+=dt;const surging=Math.sin(f.elapsed*1.65+f.seed)>.12,fatigue=.4+.6*f.health/100;f.tension=Math.max(0,Math.min(100,f.tension+(reeling?(small?7:(surging?26+power*30:7+power*8)*fatigue):-38)*dt));f.health=Math.max(0,f.health-(reeling?(small?36:5+12/(1+f.weight/8)):.7)*dt);if(reeling)f.distance=Math.max(small?0:f.health>17?10:0,f.distance-(small?38:(10+17*(1-f.health/100))/(1+f.weight/60))*dt);else if(surging)f.distance=Math.min(120,f.distance+2*dt);f.jump=Math.max(0,Math.sin((f.elapsed+f.seed)%7/1.2*Math.PI));if((f.elapsed+f.seed)%7>1.2)f.jump=0;if(f.tension>=100)f.status='broken';else if(f.distance<=.1&&(small||f.health<=17))f.status='landed';return f}
function boatWater(x,y,shore,width=1280,height=960){if(x<40||x>width-35||y<55||y>height-30)return false;for(const [dx,dy]of [[-25,0],[25,0],[0,-15],[0,15]])if(x+dx<shore(y+dy)+45)return false;return !(x<1084&&x>830&&y>700&&y<790)}
root.AmusaFishingRules={species,treasures,houseLots,foodValue,chooseSpecies,rollCatch,createFight,stepFight,boatWater};if(typeof module!=='undefined')module.exports=root.AmusaFishingRules;
})(typeof window==='undefined'?globalThis:window);
