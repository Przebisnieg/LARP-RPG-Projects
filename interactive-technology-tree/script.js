'use strict';
// Dane odtworzone z „Technologie.pdf”. Nieokreślone bonusy pozostają nieokreślone.
const categories=[
{id:'eco',name:'Ekonomia',icon:'◈',branches:[
['Produkcja żywności','♧',['Farmy planetarne I','Farmy planetarne II','Farmy planetarne III'],['20 jednostek','40 jednostek','80 jednostek']],
['Surowce budowlane','⛏',['Kopalnie planetarne I','Kopalnie planetarne II','Kopalnie planetarne III'],['20 jednostek','40 jednostek','80 jednostek']],
['Zaawansowane stopy','⬡',['Huty planetarne I','Huty planetarne II','Huty planetarne III'],['1 → 0,5','1 → 1','1 → 2']],
['Produkcja energii','ϟ',['Elektrownie planetarne I','Elektrownie planetarne II','Elektrownie planetarne III'],['20 jednostek','40 jednostek','80 jednostek']],
['Infrastruktura mieszkalna','⌂',['Osiedla planetarne I','Osiedla planetarne II','Osiedla planetarne III'],['1 → 5','1 → 7','1 → 10']],
['Stocznie','⚙',['Stocznie I','Stocznie II','Stocznie III'],[null,null,null]]]},
{id:'mil',name:'Militaria',icon:'⚔',branches:[
['Flota · Lasery','✦',['Podstawowe lasery','Ulepszone lasery','Nowoczesne lasery'],[null,null,null]],
['Flota · Rakiety','➤',['Podstawowe rakiety','Ulepszone rakiety','Nowoczesne rakiety'],[null,null,null]],
['Flota · Tarcze','◇',['Podstawowe tarcze','Zaawansowane tarcze','Nowoczesne tarcze'],[null,null,null]],
['Flota · Poszycie','⬡',['Podstawowe wzmocnienie poszycia','Zaawansowane wzmocnienie poszycia','Nowoczesne wzmocnienie poszycia'],[null,null,null]],
['Flota · Napęd','⇢',['Podstawowe napędy','Ulepszone napędy','Nowoczesne napędy'],[null,null,null]],
['Flota · Koszty produkcji','⚙',['Podstawowa optymalizacja','Ulepszona optymalizacja','Nowoczesna optymalizacja'],[null,null,null]],
['Flota · Stocznie','⌘',['Stocznie poziom I','Stocznie poziom II','Stocznie poziom III'],[null,null,null]],
['Piechota · Pancerze','⬟',['Podstawowe pancerze wspomagane','Zaawansowane pancerze wspomagane','Nowoczesne pancerze wspomagane'],[null,null,null]],
['Piechota · Koszary','⚑',['Koszary poziom I','Koszary poziom II','Koszary poziom III'],[null,null,null]],
['Piechota · Machiny wojskowe','⚔',['Machiny wojskowe I','Machiny wojskowe II','Machiny wojskowe III'],[null,null,null]],
['Fortyfikacje planetarne / orbitalne','▣',['Fortyfikacje I','Fortyfikacje II','Fortyfikacje III'],[null,null,null]]]},
{id:'sci',name:'Nauka',icon:'✧',branches:[
['Technologie orbitalne','◎',['Technologie orbitalne I','Technologie orbitalne II','Technologie orbitalne III'],['Budynki orbitalne poziomu 1','Budynki orbitalne poziomu 2','Budynki orbitalne poziomu 3']],
['Sztuczna inteligencja','⌘',['AI I','AI II','AI III'],['Zwiększenie wydajności produkcji — wartość % do ustalenia',null,null]],
['Infrastruktura badawcza','⌬',['Infrastruktura badawcza I','Infrastruktura badawcza II','Infrastruktura badawcza III'],[null,null,null]],
['Medycyna i biotechnologia','✚',['Biotechnologia I','Biotechnologia II','Biotechnologia III'],[null,null,null]],
['Eksploracja i astronomia','✦',['Astronomia I','Astronomia II','Astronomia III'],[null,null,null]]]},
{id:'soc',name:'Społeczeństwo',icon:'⚖',branches:[
['Kolektywna świadomość','◉',['Kolektywna świadomość I','Kolektywna świadomość II','Kolektywna świadomość III'],[null,null,null]],
['Powszechna służba wojskowa','⚑',['Służba wojskowa I','Służba wojskowa II','Służba wojskowa III'],[null,null,null]],
['Prawo rzymskie','⚖',['Prawo rzymskie I','Prawo rzymskie II','Prawo rzymskie III'],[null,null,null]],
['Administracja','▤',['Administracja I','Administracja II','Administracja III'],[null,null,null]],
['Edukacja i kultura','✎',['Edukacja i kultura I','Edukacja i kultura II','Edukacja i kultura III'],[null,null,null]],
['Religia i ideologia','☼',['Religia i ideologia I','Religia i ideologia II','Religia i ideologia III'],[null,null,null]]]},
{id:'exp',name:'Eksploracja',icon:'✦',branches:[
['Czas podróży','⌛',['Skrócenie badań sektora','Bramy nadprzestrzenne I','Bramy nadprzestrzenne II'],['Badanie nowego sektora trwa o 1 turę krócej, ale nie mniej niż 1 turę','Połączenie dwóch dowolnych układów w sąsiadujących sektorach','Połączenie dwóch dowolnych układów']],
['Terraformacja','◌',['Terraformacja I','Terraformacja II','Terraformacja III'],[null,null,null]]]}];
const stateKey='titanum_technology_demo_v1';
let researched={};try{researched=JSON.parse(localStorage.getItem(stateKey)||'{}')||{}}catch{}
// Przykładowy stan startowy; nie jest danymi kanonicznymi z PDF.
if(!localStorage.getItem(stateKey)){researched={'eco:0:0':true,'eco:1:0':true,'mil:0:0':true,'sci:0:0':true,'exp:0:0':true};}
let active='eco';const $=s=>document.querySelector(s);const tabs=$('#tabs'),tree=$('#tree'),viewport=$('#viewport'),overlay=$('#overlay');
const key=(c,b,l)=>`${c}:${b}:${l}`;
const status=(c,b,l)=>researched[key(c,b,l)]?'done':(l===0||researched[key(c,b,l-1)])?'ready':'hidden';
const escapeHtml=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const desc=(cat,branch,level)=>{let value=branch[3][level];if(value==null)return 'Efekt do ustalenia — dokument nie podaje wartości.';if(cat.id==='eco')return `${branch[2][level]}: ${value}.`;if(cat.id==='sci'&&branch[0]==='Technologie orbitalne')return `Odblokowuje budowę obiektów orbitalnych poziomu ${level+1}: farm, kopalń, elektrowni i mieszkań.`;return value;};
function renderTabs(){tabs.innerHTML=categories.map(c=>`<button class="tab ${c.id===active?'active':''}" data-tab="${c.id}" aria-pressed="${c.id===active}">${c.icon} &nbsp;${c.name}</button>`).join('');tabs.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.tab;renderTabs();renderTree();viewport.scrollLeft=0;viewport.scrollTop=0;}));}
function renderTree(){const cat=categories.find(c=>c.id===active);tree.innerHTML=`<div class="tree-head"><span>Gałąź rozwoju</span><span>Poziom I</span><span>Poziom II</span><span>Poziom III</span></div>`+cat.branches.map((b,i)=>`<div class="tree-row"><div class="branch"><span class="branch-icon">${b[1]}</span><strong>${escapeHtml(b[0])}</strong><small>Ścieżka technologiczna</small></div>${b[2].map((name,l)=>{let st=status(cat.id,i,l);return `${l>0?`<div class="link ${st==='done'?'lit':st==='ready'?'ready-link':''} ${l===2?'second':''}"></div>`:''}<button class="node ${st}" data-b="${i}" data-l="${l}" aria-label="${escapeHtml(st==='hidden'?'Nieodkryta technologia':name)}"><span class="node-icon">${st==='hidden'?'◇':b[1]}</span><span class="node-content"><span class="node-level">POZIOM ${['I','II','III'][l]}</span><span class="node-name">${st==='hidden'?'??? · Nieodkryte':escapeHtml(name)}</span></span><span class="node-status">${st==='done'?'✓':st==='ready'?'✦':'⌁'}</span></button>`;}).join('')}</div>`).join('');tree.querySelectorAll('.node').forEach(btn=>{const b=+btn.dataset.b,l=+btn.dataset.l;btn.addEventListener('click',()=>openDetail(cat,b,l));btn.addEventListener('mouseenter',e=>showTip(e,cat,b,l));btn.addEventListener('mousemove',moveTip);btn.addEventListener('mouseleave',hideTip);});}
function openDetail(cat,b,l){hideTip();const branch=cat.branches[b],st=status(cat.id,b,l),visible=st!=='hidden';$('#detail').innerHTML=`<div class="detail-eyebrow">${escapeHtml(cat.name.toUpperCase())} / ${escapeHtml(branch[0].toUpperCase())}</div><div class="detail-icon">${visible?branch[1]:'◇'}</div><h2 id="detail-title">${visible?escapeHtml(branch[2][l]):'Nieodkryta technologia'}</h2><span class="status">${st==='done'?'✓ Zbadana':st==='ready'?'✦ Dostępna do zbadania':'⌁ Zablokowana · dane utajnione'}</span><div class="detail-grid"><div class="detail-box"><h3>EFEKT TECHNOLOGII</h3><p>${visible?escapeHtml(desc(cat,branch,l)):'Efekt nieznany. Zbadaj poprzedni poziom, aby ujawnić tę technologię.'}</p></div><div class="detail-box"><h3>WYMAGANIA</h3><p>${l===0?'Brak wcześniejszych poziomów w tej gałęzi.':escapeHtml(branch[2][l-1])+' — '+(researched[key(cat.id,b,l-1)]?'spełnione':'niezbadane')}</p></div></div>${st==='ready'?'<button id="research" class="research">Odblokuj technologię (demo)</button>':st==='done'?'<button class="research" disabled>Technologia już zbadana</button>':'<button class="research" disabled>Najpierw odblokuj poprzedni poziom</button>'}`;overlay.hidden=false;document.body.style.overflow='hidden';const r=$('#research');if(r)r.addEventListener('click',()=>{researched[key(cat.id,b,l)]=true;localStorage.setItem(stateKey,JSON.stringify(researched));renderTree();openDetail(cat,b,l);});$('#close').focus();}
function closeDetail(){overlay.hidden=true;document.body.style.overflow='';}$('#close').addEventListener('click',closeDetail);overlay.addEventListener('click',e=>{if(e.target===overlay)closeDetail()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDetail()});$('#reset').addEventListener('click',()=>{if(confirm('Zresetować demonstracyjny postęp technologiczny?')){researched={};localStorage.setItem(stateKey,'{}');renderTree();}});
const tip=document.createElement('div');tip.className='tooltip';tip.hidden=true;document.body.appendChild(tip);function showTip(e,c,b,l){const st=status(c.id,b,l),br=c.branches[b];tip.innerHTML=`<strong>${escapeHtml(st==='hidden'?'Nieodkryta technologia':br[2][l])}</strong><p>${escapeHtml(st==='hidden'?'Wymaga wcześniejszego poziomu. Bonus ukryty.':st==='done'?'Zbadana · '+desc(c,br,l):'Dostępna · '+desc(c,br,l))}</p>`;tip.hidden=false;moveTip(e);}function moveTip(e){let x=e.clientX+18,y=e.clientY+16;if(x+290>innerWidth)x=e.clientX-300;if(y+115>innerHeight)y=e.clientY-125;tip.style.left=Math.max(8,x)+'px';tip.style.top=Math.max(8,y)+'px';}function hideTip(){tip.hidden=true;}
// Przesuwanie planszy przez przeciąganie, bez przechwytywania kliknięć na technologiach.
let drag=null;viewport.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;drag={x:e.clientX,y:e.clientY,left:viewport.scrollLeft,top:viewport.scrollTop};viewport.classList.add('dragging');viewport.setPointerCapture(e.pointerId);});viewport.addEventListener('pointermove',e=>{if(!drag)return;viewport.scrollLeft=drag.left-(e.clientX-drag.x);viewport.scrollTop=drag.top-(e.clientY-drag.y);});function stopDrag(){drag=null;viewport.classList.remove('dragging')}viewport.addEventListener('pointerup',stopDrag);viewport.addEventListener('pointercancel',stopDrag);
renderTabs();renderTree();
