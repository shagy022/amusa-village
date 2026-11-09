(function(root){'use strict';
const services={scare:{name:'Scare a resident',duration:24000,base:0},fish:{name:'Fish for me · one real hour',duration:3600000,base:90},dishes:{name:'Wash a house’s dishes',duration:36000,base:20},sweep:{name:'Sweep and polish a cottage',duration:45000,base:25},garden:{name:'Water a cottage garden',duration:50000,base:30}};
function interval(visible,rng=Math.random){return (visible?90+rng()*90:30+rng()*30)*1000}
function presence(state,now,night,held=false,rng=Math.random){let s={...state};if(s.job||held&&s.visible)return s;if(!night){s.visible=false;s.wasNight=false;s.quote=null;return s}if(!s.wasNight){s.wasNight=true;s.visible=rng()<.75;s.next=now+interval(s.visible,rng);s.quote=null}else if(now>=s.next){s.visible=!s.visible;s.next=now+interval(s.visible,rng);if(!s.visible)s.quote=null}return s}
function price(service,rng=Math.random){if(!services[service])throw Error('Choose a ghost service.');if(service==='scare')return 0;const tier=rng(),u=rng(),base=services[service].base,value=tier<.25?Math.max(1,Math.round(base*(.02+u*.18))):tier<.85?Math.round(base*(.6+u*1.2)):Math.round(base*(15+u*85));return value*100}
function due(job,now){return job?.service==='fish'?Math.max(0,Math.min(60,Math.floor((Math.min(now,job.ends)-job.started)/60000))):0}
root.AmusaSpiritRules={services,interval,presence,price,due};if(typeof module!=='undefined')module.exports=root.AmusaSpiritRules;
})(typeof window==='undefined'?globalThis:window);
