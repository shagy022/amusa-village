'use strict';
// Hosted release: Bob is a normal scripted resident. There is no remote AI service.
bobUI.online=true;bobUI.state={tasks:[],notifications:[],paused:true};
bobRefresh=async function(){bobUI.online=true;return bobUI.state};
bobPollGame=async function(){};
bobRequest=async function(action,body){if(action==='set_actor'&&body?.actor)bobGame.actor={...body.actor};if(['state','snapshot','seen','pause','set_actor','companion_pause'].includes(action))return bobUI.state;throw Error('Bob is a regular resident in this version. Chat with him or use his invitations.')};
openBobTasks=function(){if(!gameMenuOpen())openPersonInteraction('bob')};
const onlinePersonTask=personTask;personTask=function(a){return a.id==='bob'?'Around the village':onlinePersonTask(a)};
const onlineNotices=openBobNotifications;openBobNotifications=async function(){await onlineNotices();if(!el('bobNotificationsPanel').hidden)el('bobNotificationMessage').textContent='Village messages · Newest first'};
const onlineInit=initIslandEstate;initIslandEstate=function(s){onlineInit(s);el('bobTodoButton').hidden=true;el('bobTodoButton').setAttribute('aria-hidden','true');s.bob.removeAllListeners('pointerup');s.bob.on('pointerup',()=>{if(!gameMenuOpen())openPersonInteraction('bob')});el('bobNotificationsButton').onclick=openBobNotifications;installMobileControls(s)};
function installMobileControls(s){
 const box=document.createElement('section');box.id='mobileControls';box.setAttribute('aria-label','Touch game controls');box.innerHTML='<div class="mobileDpad"><button data-key="ArrowUp" aria-label="Move north">▲</button><button data-key="ArrowLeft" aria-label="Move west">◀</button><button data-key="ArrowDown" aria-label="Move south">▼</button><button data-key="ArrowRight" aria-label="Move east">▶</button></div><button class="mobileRun" data-key="ShiftLeft" aria-label="Hold to run">Run</button><div class="mobileActions"><button data-key="KeyE">Interact</button><button data-key="KeyF">Fish</button><button data-key="Escape">Back</button></div>';document.body.append(box);
 const keys={ArrowUp:[38,'ArrowUp'],ArrowDown:[40,'ArrowDown'],ArrowLeft:[37,'ArrowLeft'],ArrowRight:[39,'ArrowRight'],ShiftLeft:[16,'Shift'],KeyE:[69,'e'],KeyF:[70,'f'],Escape:[27,'Escape']},held=new Set();
 function send(code,down){const [n,key]=keys[code];document.dispatchEvent(new KeyboardEvent(down?'keydown':'keyup',{code,key,keyCode:n,which:n,bubbles:true,cancelable:true}))}
 function release(){for(const code of held)send(code,false);held.clear();box.querySelectorAll('button').forEach(b=>b.classList.remove('held'))}
 for(const button of box.querySelectorAll('[data-key]')){button.onpointerdown=e=>{e.preventDefault();e.stopPropagation();button.setPointerCapture(e.pointerId);const code=button.dataset.key;if(!held.has(code)){held.add(code);send(code,true)}button.classList.add('held')};const up=e=>{e.preventDefault();const code=button.dataset.key;if(held.delete(code))send(code,false);button.classList.remove('held')};button.onpointerup=up;button.onpointercancel=up;button.onlostpointercapture=up;button.oncontextmenu=e=>e.preventDefault()}
 window.addEventListener('blur',release);document.addEventListener('visibilitychange',()=>{if(document.hidden)release()});
 setInterval(()=>{const hidden=gameMenuOpen()||document.hidden;box.classList.toggle('menuOpen',hidden);document.body.classList.toggle('onlineMenuOpen',hidden);if(hidden&&held.size)release()},100);
 // Text entry must never inherit a held movement key from a touch gesture.
 document.addEventListener('focusin',e=>{if(e.target.matches('input,textarea,select,[contenteditable]'))release()});
 const note=document.createElement('div');note.id='mobileLandscapeHint';note.textContent='Turn your phone sideways for more room.';document.body.append(note);
}
