(function(root){'use strict';
const bankStaff=['clara','marigold','theo'],lunch={clara:[720,780],marigold:[780,840],theo:[840,900]};
function parts(now){const p=new Intl.DateTimeFormat('en-CA',{timeZone:'America/New_York',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'}).formatToParts(now),v=k=>Number(p.find(x=>x.type===k).value);return {minute:v('hour')*60+v('minute'),day:[v('year'),v('month'),v('day')].join('-')}}
function bankOpen(now){const m=parts(now).minute;return m>=540&&m<1080}
function shopPublic(now){const m=parts(now).minute;return m>=480&&m<1260}
function staffPhase(id,now){if(!bankStaff.includes(id))return 'free';const m=parts(now).minute,[start,end]=lunch[id];if(m>=530&&m<540)return 'commute';if(m<540||m>=1080)return 'home';if(m>=start&&m<end-10)return 'lunch';if(m>=end-10&&m<end-5)return 'return';return 'work'}
function dutyRequired(id,now){return ['work','commute','return'].includes(staffPhase(id,now))}
function time(m){return (Math.floor(m/60)%12||12)+':'+String(m%60).padStart(2,'0')+(m>=720?' PM':' AM')}
function workReply(id,now){const [start,end]=lunch[id],phase=staffPhase(id,now);if(phase==='lunch'||phase==='home'||phase==='free')return null;if(phase==='return')return 'I need to be back at my desk by '+time(end-5)+'. Let’s catch up after work.';return 'The bank is open 9 AM–6 PM. My lunch is '+time(start)+'–'+time(end)+', and I must be back by '+time(end-5)+'. I can join you during lunch or after 6 PM.'}
function behindCounter(a){return a.room==='store'&&a.x>315&&a.x<650&&a.y<280&&a.y>185}
root.AmusaDailyRules={parts,bankStaff,lunch,bankOpen,shopPublic,staffPhase,dutyRequired,workReply,time,behindCounter};if(typeof module!=='undefined')module.exports=root.AmusaDailyRules;
})(typeof window==='undefined'?globalThis:window);
