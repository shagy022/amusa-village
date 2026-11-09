(function(root){'use strict';
const stages={single:'Single',unrecorded:'Single',relationship:'Dating',dating:'Dating',engaged:'Engaged',married:'Married'};
const thresholds={ask:70,propose:90,marry:100},cooldown=30000,requestCooldown=300000;
function pairKey(a,b){return [a,b].sort().join('|')}
function canCourt(a,b){return (!a.partner||a.partner===b.id)&&(!b.partner||b.partner===a.id)}
function approval(score,happiness,action){return Math.max(.5,Math.min(.95,(action==='ask'?.65:.78)+(score-thresholds[action])*.004+(happiness-50)*.002))}
root.AmusaSocialRules={stages,thresholds,cooldown,requestCooldown,pairKey,canCourt,approval};if(typeof module!=='undefined')module.exports=root.AmusaSocialRules;
})(typeof window==='undefined'?globalThis:window);
