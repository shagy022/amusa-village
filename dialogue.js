'use strict';
const dialogue={entries:[],
 say(name,text,duration=9000){const host=document.getElementById('speech');const card=document.createElement('article');card.className='speech-card';const who=document.createElement('strong'),line=document.createElement('p');who.textContent=name;line.textContent=text;card.append(who,line);host.append(card);host.hidden=false;const entry={card,timer:null};this.entries.push(entry);while(this.entries.length>3){const old=this.entries.shift();clearTimeout(old.timer);old.card.remove()}entry.timer=setTimeout(()=>{card.remove();this.entries=this.entries.filter(e=>e!==entry);host.hidden=!this.entries.length},Math.max(9000,duration));},
 clear(){for(const e of this.entries){clearTimeout(e.timer);e.card.remove()}this.entries=[];document.getElementById('speech').hidden=true;}
};
