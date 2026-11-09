(function(root){'use strict';
const KEY='amusa-economy-v1';
const catalog=[
 ['apple','Orchard apples',4,'food'],['bread','Warm hearth bread',6,'food'],['tea','Mountain tea',8,'food'],['honey','Wildflower honey',12,'food'],['cheese','Aged village cheese',10,'food'],['fish','Smoked coastal fish',14,'food'],
 ['potion','Crimson tonic',25,'potion'],['mana','Azure tonic',28,'potion'],['salve','Herbal salve',18,'potion'],['seeds','Garden seeds',9,'plant'],['sapling','Apple sapling',32,'plant'],['flowers','Wildflower bundle',7,'plant'],
 ['rope','Coiled rope',16,'gear'],['lantern','Brass lantern',45,'gear'],['pick','Iron pickaxe',70,'gear'],['compass','Mariner compass',85,'gear'],['map','Coastal chart',30,'book'],['journal','Leather journal',22,'book'],
 ['book','Book of local legends',38,'book'],['quill','Quill and ink',15,'book'],['cloak','Traveler cloak',60,'cloth'],['boots','Sturdy walking boots',52,'cloth'],['cloth','Woven linen',20,'cloth'],['crystal','Amber crystal',95,'gem']
].map(([id,name,price,kind])=>({id,name,price,kind}));
function hourKey(now=Date.now()){const d=new Date(now);d.setMinutes(0,0,0);return d.getTime()}
function inventory(now=Date.now()){const h=hourKey(now),cycle=Math.floor(h/3600000);return Array.from({length:8},(_,i)=>{const item=catalog[((cycle*5+i*7)%24+24)%24];return {...item,price:item.price+(cycle+catalog.indexOf(item))%5,quantity:3+(catalog.indexOf(item)%4)}})}
function create(storage,clock=Date.now){let state;let problem='';try{state=JSON.parse(storage.getItem(KEY))}catch(e){problem='Saved records could not be read. Export a backup after making changes.'}if(!state||state.version!==1)state={version:1,accounts:{excalibur:{id:'excalibur',name:'Excalibur',role:'Mayor',balance:0,items:{}},shopkeeper:{id:'shopkeeper',name:'Barnaby',role:'Shopkeeper',balance:0,items:{}}},transactions:[],stock:{hour:hourKey(clock()),sold:{}}};
 const persist=()=>{try{storage.setItem(KEY,JSON.stringify(state));problem=''}catch(e){problem='Saving is unavailable. Keep this page open and export your records.'}};
 const account=id=>{if(!state.accounts[id])throw Error('Resident not found.');return state.accounts[id]};
 const whole=(value,allowZero=false)=>{const n=Number(value);if(!Number.isSafeInteger(n)||n<(allowZero?0:1)||n>1000000)throw Error('Enter a whole amount between '+(allowZero?0:1)+' and 1,000,000.');return n};
 const record=(type,fields)=>{state.transactions.push({id:root.crypto?.randomUUID?.()||String(clock())+'-'+Math.random(),time:clock(),type,...fields})};
 const sync=()=>{const hour=hourKey(clock());if(state.stock.hour!==hour){state.stock={hour,sold:{}};persist()}return hour};
 return {get state(){return state},get warning(){return problem},account,
 stock(){sync();return inventory(clock()).map(i=>({...i,remaining:i.quantity-(state.stock.sold[i.id]||0)}))},
 hire(name,role,wage){name=String(name).trim();role=String(role).trim();if(!name||name.length>40||!role||role.length>60)throw Error('Enter a name (up to 40 letters) and a job (up to 60 letters).');if(Object.values(state.accounts).some(a=>a.name.toLowerCase()===name.toLowerCase()))throw Error('That resident already has a wallet.');wage=whole(wage,true);const id=root.crypto?.randomUUID?.()||'resident-'+clock()+'-'+Math.random();state.accounts[id]={id,name,role,balance:0,wage,lastPaidAt:clock(),items:{}};record('hired',{account:id,amount:0,wage});persist();return id},
 grant(id,amount){const a=account(id);amount=whole(amount);if(!Number.isSafeInteger(a.balance+amount))throw Error('Balance limit reached.');a.balance+=amount;record('town payment',{to:id,amount});persist()},
 payWages(id){const a=account(id);if(a.wage===undefined)throw Error('This wallet has no wage agreement.');const hours=Math.floor((clock()-a.lastPaidAt)/3600000);if(hours<1)throw Error('No complete real-world work hour is due yet.');const amount=hours*a.wage;if(!Number.isSafeInteger(amount)||!Number.isSafeInteger(a.balance+amount))throw Error('Payment exceeds the balance limit.');a.balance+=amount;a.lastPaidAt+=hours*3600000;record('wages',{to:id,amount,hours});persist();return amount},
 buy(id,itemId,displayedHour){sync();if(displayedHour!==state.stock.hour)throw Error('The hour changed. Please choose from the refreshed stock.');const buyer=account(id),item=this.stock().find(i=>i.id===itemId);if(!item||item.remaining<1)throw Error('That item is sold out.');const price=id==='excalibur'?0:item.price;if(buyer.balance<price)throw Error('Not enough Amusa coins.');buyer.balance-=price;state.accounts.shopkeeper.balance+=price;buyer.items[item.id]=(buyer.items[item.id]||0)+1;state.stock.sold[item.id]=(state.stock.sold[item.id]||0)+1;record('purchase',{from:id,to:'shopkeeper',amount:price,item:item.id,itemName:item.name,listedPrice:item.price,mayorPrivilege:id==='excalibur'});persist();return {...item,paid:price}},
 export(){return JSON.stringify(state,null,2)},nextHour(){const d=new Date(clock());d.setHours(d.getHours()+1,0,0,0);return d.getTime()}
 };
}
root.AmusaEconomy={create,catalog,hourKey,inventory};if(typeof module!=='undefined')module.exports=root.AmusaEconomy;
})(typeof window==='undefined'?globalThis:window);
