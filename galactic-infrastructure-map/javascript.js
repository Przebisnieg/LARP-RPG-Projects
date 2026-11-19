document.addEventListener('DOMContentLoaded', () => {
 const container=document.getElementById('map-container');
 const content=document.getElementById('map-content');
 const svg=content.querySelector('svg');
 const tooltip=document.getElementById('tooltip');
  const tooltipBody=document.getElementById('tooltip-body');
  const mobile=()=>window.matchMedia('(pointer: coarse)').matches;
  let selected=null;
  let nmPinned=false;
  const infrastructureNames=new Set(['Nowy Maraton','Stella Vespertina','Venetrix','Cezaria','Sekhet Prime','Nowa Aleksandria']);
  const hasInfrastructure=g=>infrastructureNames.has(g?.dataset?.name);
  let currentInfrastructureName='Nowy Maraton';
  const imageNames={'Nowy Maraton':'nowy-maraton.png','Cezaria':'cezaria.png','Venetrix':'venetrix.png'};
  function prepareInfrastructure(){
    const name=currentInfrastructureName;
    document.getElementById('nm-title').innerHTML=name.toUpperCase()+' <span>— INFRASTRUKTURA</span>';
    const original=document.getElementById('nm-info-original');
    const placeholder=document.getElementById('nm-info-placeholder');
    original.hidden=name!=='Nowy Maraton';
    placeholder.hidden=name==='Nowy Maraton';
    const img=document.getElementById('nm-system-image');
    const empty=document.getElementById('nm-image-placeholder');
    img.hidden=true;empty.hidden=false;
    empty.textContent='MIEJSCE NA ILUSTRACJĘ UKŁADU';
    if(imageNames[name]){
      img.onload=()=>{img.hidden=false;empty.hidden=true;};
      img.onerror=()=>{img.hidden=true;empty.hidden=false;};
      img.src='obrazy/'+imageNames[name];img.alt='Ilustracja: '+name;
    } else {img.removeAttribute('src');}
  }
  const imagePan=document.getElementById('nm-system-image');
  let imageX=50,imageY=50,panStart=null;
  const applyImagePan=()=>{imagePan.style.objectPosition=`${imageX}% ${imageY}%`;};
  imagePan.addEventListener('pointerdown',e=>{if(e.button!==0)return;panStart={x:e.clientX,y:e.clientY,ix:imageX,iy:imageY};imagePan.setPointerCapture(e.pointerId);e.preventDefault();});
  imagePan.addEventListener('pointermove',e=>{if(!panStart)return;const r=imagePan.getBoundingClientRect();imageX=Math.max(0,Math.min(100,panStart.ix-(e.clientX-panStart.x)/r.width*100));imageY=Math.max(0,Math.min(100,panStart.iy-(e.clientY-panStart.y)/r.height*100));applyImagePan();});
  imagePan.addEventListener('pointerup',()=>panStart=null);
  imagePan.addEventListener('pointercancel',()=>panStart=null);
  imagePan.addEventListener('dragstart',e=>e.preventDefault());
  const nmButton='<button type="button" class="nm-open">Infrastruktura →</button>';
  tooltip.addEventListener('click',e=>{if(e.target.closest('.nm-open')){e.stopPropagation();prepareInfrastructure();imageX=50;imageY=50;applyImagePan();document.getElementById('nm-backdrop').classList.remove('nm-hidden');}});
  document.getElementById('nm-close').addEventListener('click',()=>document.getElementById('nm-backdrop').classList.add('nm-hidden'));
  document.getElementById('nm-backdrop').addEventListener('click',e=>{if(e.target.id==='nm-backdrop')e.currentTarget.classList.add('nm-hidden');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')document.getElementById('nm-backdrop').classList.add('nm-hidden');});
  document.getElementById('tooltip-close').addEventListener('click',e=>{e.stopPropagation(); selected?.classList.remove('hover-highlight');selected=null;nmPinned=false;hide();});
 const baseWidth=Number(svg.getAttribute('width')),baseHeight=Number(svg.getAttribute('height'));
 let scale=1,panning=false,startX=0,startY=0,scrollX=0,scrollY=0;
 const groups=[...svg.querySelectorAll('g.system-group')];
 const states={hegemonia:'Hegemonia Titanum',egipt:'Autokracja Sabiańska',avalon:'Tereny należące do Króla Artura VII Groźnego','piec-slonc':'Konfederacja Pięciu Słońc',tianming:'Cesarstwo Tianming','szahanszahat':"Wielki Szahanszahat",'kalifat':"Kalifat Oświecenia",'talasokracja':"Talasokracja Wielkiego Oceanu",'frakcja1':'Frakcja1','frakcja2':'Frakcja2','frakcja3':'Frakcja3','merowia':'Korona Merowii','frakcja4':'Frakcja4','frakcja5':'Frakcja5','liga-solarna':'Liga Solarna'};
 const descriptions={
 hegemonia:'Centralne państwo skupiające cztery ważne układy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae sapien vel arcu facilisis convallis.',
 egipt:'Sojusznicze państwo obejmujące dwa układy. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum nisl vel justo pharetra, id posuere ante lacinia.',
 avalon:'Tereny należące do Króla Artura VII Groźnego, obejmujące sześć układów, w tym Nową Brytanikę i Victorię.',
 'piec-slonc':'Federacja światów wywodzących się z kultur Mezoameryki i Andów, zorganizowana wokół niezależnych miast-państw, dynastii i wspólnot planetarnych. Znana z zaawansowanej astronomii, inżynierii środowiskowej i umiejętności przekształcania nieprzyjaznych planet w żyzne kolonie. Poszczególne światy rywalizują bardzo często i krwawo, ale w obliczu zagrożenia zewnętrznego tworzą wspólny front.'};
 const fiveSunsData=[{'name': 'Tenochtitlan', 'house': 'Pierwsze Słońce – Dom Jaguara', 'description': 'Największy ośrodek polityczny Konfederacji, miejsce obrad Rady Pięciu Słońc. Potężna metropolia z rozbudowaną infrastrukturą orbitalną.'}, {'name': 'Texcoco', 'house': 'Pierwsze Słońce – Dom Jaguara', 'description': 'Centrum nauki, astronomii i edukacji elit. Znane z akademii i obserwatoriów.'}, {'name': 'Tlacopan', 'house': 'Pierwsze Słońce – Dom Jaguara', 'description': 'Bogaty układ handlowy, kontrolujący ważne połączenia transportowe.'}, {'name': 'Coatepec', 'house': 'Pierwsze Słońce – Dom Jaguara', 'description': 'Ośrodek wojskowy i ceremonialny, w którym szkoli się elitarne oddziały wojowników Jaguara.'}, {'name': 'Qosqo', 'house': 'Drugie Słońce – Dom Kondora', 'description': 'Stolica andyjskiej części Konfederacji, centrum administracji i wielkich projektów infrastrukturalnych.'}, {'name': 'Inti', 'house': 'Drugie Słońce – Dom Kondora', 'description': 'Układ energetyczny z ogromnymi instalacjami orbitalnymi pozyskującymi energię gwiazdy.'}, {'name': 'Collasuyu', 'house': 'Drugie Słońce – Dom Kondora', 'description': 'Region górniczy, bogaty w miedź, srebro i metale wykorzystywane w przemyśle kosmicznym.'}, {'name': 'Antisuyu', 'house': 'Drugie Słońce – Dom Kondora', 'description': 'Układ o rozległych lasach i złożonych ekosystemach, będący centrum badań biologicznych.'}, {'name': 'Chichén Itzá', 'house': 'Trzecie Słońce – Dom Kukulkana', 'description': 'Centrum astronomiczne, w którym opracowuje się mapy gwiezdne i bada odległe układy.'}, {'name': 'Palenque', 'house': 'Trzecie Słońce – Dom Kukulkana', 'description': 'Ośrodek naukowy specjalizujący się w matematyce, systemach obliczeniowych i analizie danych.'}, {'name': 'Tikal', 'house': 'Trzecie Słońce – Dom Kukulkana', 'description': 'Gęsto zaludniony układ rolniczy, eksportujący żywność i produkty biologiczne.'}, {'name': 'Calakmul', 'house': 'Trzecie Słońce – Dom Kukulkana', 'description': 'Układ graniczny, znany z potężnych fortyfikacji i rywalizacji miejscowych dynastii.'}, {'name': 'Teotihuacan', 'house': 'Czwarte Słońce – Dom Obsydianu', 'description': 'Jeden z największych ośrodków przemysłowych, produkujący uzbrojenie, maszyny i statki.'}, {'name': 'Itzli', 'house': 'Czwarte Słońce – Dom Obsydianu', 'description': 'Układ wydobywczy, bogaty w minerały krzemianowe i materiały stosowane w elektronice.'}, {'name': 'Xolotl', 'house': 'Czwarte Słońce – Dom Obsydianu', 'description': 'Centrum badań medycznych, inżynierii genetycznej i technologii regeneracyjnych.'}, {'name': 'Tollan', 'house': 'Czwarte Słońce – Dom Obsydianu', 'description': 'Ośrodek rzemiosła, sztuki i produkcji luksusowych wyrobów eksportowych.'}, {'name': 'Mayapan', 'house': 'Piąte Słońce – Dom Zielonego Kamienia', 'description': 'Centrum dyplomatyczne i handlowe, utrzymujące kontakty z pozostałymi mocarstwami.'}, {'name': 'Uxmal', 'house': 'Piąte Słońce – Dom Zielonego Kamienia', 'description': 'Układ rolniczy i terraformacyjny, w którym testuje się technologie przekształcania atmosfer i gleb.'}, {'name': 'Copán', 'house': 'Piąte Słońce – Dom Zielonego Kamienia', 'description': 'Centrum archiwistyki, historii i badań nad dawnymi cywilizacjami.'}, {'name': 'Balam', 'house': 'Piąte Słońce – Dom Zielonego Kamienia', 'description': 'Bogaty układ pograniczny, którego władcy prowadzą coraz bardziej niezależną politykę.'}];
 const tianmingData={"Tianjing": "Stolica cesarstwa, siedziba cesarza, dworu i najwyższych ministerstw. Główny ośrodek polityczny.", "Zhongdu": "Drugie centrum administracyjne, skupiające instytucje nadzorujące prowincje i gospodarkę.", "Chang’an": "Stary ośrodek kultury i nauki, słynący z uniwersytetów, akademii i archiwów.", "Luoyang": "Centrum produkcji przemysłowej, w którym powstają maszyny, pojazdy i wyposażenie kolonialne.", "Jiangnan": "Jeden z najbogatszych układów rolniczych, wykorzystujący zaawansowane systemy hydroponiczne.", "Longmen": "Główny kompleks stoczni cesarskich, produkujący największe okręty floty.", "Beiyang": "Północny bastion wojskowy, kontrolujący ważne szlaki prowadzące ku granicom Szahanszahatu.", "Nanhai": "Układ oceaniczny, wyspecjalizowany w akwakulturze, biotechnologii i pozyskiwaniu zasobów wodnych.", "Xuanwu": "Centrum wojsk lądowych, akademii oficerskich i badań nad systemami obronnymi.", "Qinglong": "Układ przemysłowy produkujący systemy napędowe, reaktory i uzbrojenie okrętowe.", "Baihu": "Silnie zmilitaryzowany układ pograniczny, znany z licznych fortyfikacji orbitalnych.", "Zhuque": "Ośrodek energetyczny z rozbudowaną siecią elektrowni orbitalnych i instalacji zbierających energię gwiazdy.", "Yumen": "Brama handlowa cesarstwa, przez którą przechodzi znaczna część wymiany z innymi państwami.", "Dunhuang": "Centrum kartografii, badań astronomicznych i eksploracji odległych regionów kosmosu.", "Shenzhou": "Jeden z najgęściej zaludnionych układów, z ogromnymi miastami i kompleksami mieszkalnymi.", "Taiyuan": "Region wydobywczy, dostarczający żelazo, nikiel i inne metale przemysłowe.", "Kunlun": "Górniczy układ o trudnych warunkach naturalnych, eksploatujący cenne minerały i kryształy przemysłowe.", "Penglai": "Bogaty układ wypoczynkowy i medyczny, zamieszkany przez część cesarskiej arystokracji.", "Hanzhong": "Centrum logistyki i transportu, łączące wewnętrzne prowincje z pograniczem.", "Jinyang": "Układ finansowy i handlowy, w którym działają największe przedsiębiorstwa cesarstwa.", "Tianshan": "Pograniczny układ kolonialny, ważny ze względu na położenie i nowe zasoby naturalne.", "Haidong": "Rozwijający się układ kolonialny, w którym powstają nowe miasta, porty i zakłady przemysłowe."};
 const starDescription='';
 function highlight(faction){svg.querySelectorAll('.faction-active').forEach(e=>e.classList.remove('faction-active'));}
 function positionTooltip(g){
  if(!g)return;
  const r=g.getBoundingClientRect();
  const w=tooltip.offsetWidth,h=tooltip.offsetHeight;
  // Tooltip stoi tuż obok układu, a nie w stałym punkcie ekranu.
  const left=r.right+18+w<=innerWidth-12?r.right+18:Math.max(10,r.left-w-18);
  const top=Math.max(10,Math.min(innerHeight-h-10,r.top-12));
  tooltip.style.left=left+'px';tooltip.style.top=top+'px';
}
function show(html,nm=false,g=null){tooltip.dataset.systemName=nm?currentInfrastructureName:'';tooltipBody.innerHTML=html+(nm?nmButton:'');tooltip.classList.toggle('nm-actionable',nm);tooltip.classList.remove('hidden');tooltip.dataset.systemAnchor=g?'yes':'no';if(g)positionTooltip(g);}
 function hide(){if(nmPinned)return;tooltip.classList.add('hidden');tooltip.classList.remove('nm-actionable');highlight(null);}
 groups.forEach(g=>{
  const name=g.dataset.name,code=g.dataset.code,faction=g.dataset.faction;
  g.addEventListener('mouseenter',()=>{if(mobile()||nmPinned)return;currentInfrastructureName=name;highlight(null);g.classList.add('hover-highlight');show(`<h3>${faction?name:'Układ '+code}</h3>${faction?'':`<p><b>Kod:</b> ${code || "-"}</p>`}${faction?`<p><b>Państwo:</b> ${states[faction]}</p>`:''}<p>${faction==='piec-slonc'?`<b>${fiveSunsData.find(s=>s.name===name)?.house||''}</b><br>${fiveSunsData.find(s=>s.name===name)?.description||''}`:faction==='tianming'?tianmingData[name]:(g.dataset.description||starDescription)}</p>`,hasInfrastructure(g),g);});
  g.addEventListener('mouseleave',()=>{if(mobile())return;g.classList.remove('hover-highlight');if(!nmPinned && !hasInfrastructure(g))hide();});
   g.addEventListener('click',e=>{if(!mobile()&&!hasInfrastructure(g))return;e.stopPropagation();currentInfrastructureName=name;nmPinned=hasInfrastructure(g);selected?.classList.remove('hover-highlight');selected=g;if(!nmPinned)g.classList.add('hover-highlight');const description=faction==='piec-slonc'?`${fiveSunsData.find(s=>s.name===name)?.house||''} — ${fiveSunsData.find(s=>s.name===name)?.description||''}`:faction==='tianming'?tianmingData[name]:(g.dataset.description||starDescription);show(`<h3>${name}</h3>${faction?'':`<p><b>Kod:</b> ${code || "-"}</p>`}${faction?`<p><b>Państwo:</b> ${states[faction]}</p>`:''}${description ? `<p>${description}</p>` : ``}`,hasInfrastructure(g),g);});
 });
 svg.querySelectorAll('.faction-border').forEach(e=>{
  const faction=e.dataset.faction;
  e.addEventListener('mouseenter',()=>{highlight(faction);show(`<h3>${states[faction]}</h3><p>${descriptions[faction]}</p>`);});
  e.addEventListener('mouseleave',hide);
 });
 document.addEventListener('click',e=>{if(!e.target.closest('#tooltip, .system-group, #nm-modal')){nmPinned=false;hide();}});
 document.addEventListener('mousemove',e=>{if(mobile()||tooltip.classList.contains('hidden')||tooltip.classList.contains('nm-actionable')||tooltip.dataset.systemAnchor==='yes')return;tooltip.style.left=`${Math.max(0,Math.min(e.clientX+20,innerWidth-tooltip.offsetWidth-10))}px`;tooltip.style.top=`${Math.max(0,Math.min(e.clientY+20,innerHeight-tooltip.offsetHeight-10))}px`;});
   const pointers=new Map();let pinchDistance=0,dragged=false;
  function zoomAt(next,x,y){const old=scale;scale=Math.max(.22,Math.min(4,next));content.style.width=`${baseWidth*scale}px`;content.style.height=`${baseHeight*scale}px`;svg.style.width='100%';svg.style.height='100%';container.scrollLeft=(container.scrollLeft+x)*scale/old-x;container.scrollTop=(container.scrollTop+y)*scale/old-y;}
  container.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===1){panning=true;dragged=false;startX=e.clientX;startY=e.clientY;scrollX=container.scrollLeft;scrollY=container.scrollTop;}if(pointers.size===2){panning=false;const [a,b]=[...pointers.values()];pinchDistance=Math.hypot(a.x-b.x,a.y-b.y);}container.setPointerCapture(e.pointerId);});
  container.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId))return;pointers.set(e.pointerId,{x:e.clientX,y:e.clientY});if(pointers.size===2){const [a,b]=[...pointers.values()];const dist=Math.hypot(a.x-b.x,a.y-b.y);if(pinchDistance){const rect=container.getBoundingClientRect();zoomAt(scale*dist/pinchDistance,(a.x+b.x)/2-rect.left,(a.y+b.y)/2-rect.top);}pinchDistance=dist;dragged=true;return;}if(panning){if(Math.hypot(e.clientX-startX,e.clientY-startY)>8)dragged=true;container.scrollLeft=scrollX-(e.clientX-startX);container.scrollTop=scrollY-(e.clientY-startY);}});
  function endPointer(e){pointers.delete(e.pointerId);panning=false;pinchDistance=0;if(pointers.size===1){const a=[...pointers.values()][0];startX=a.x;startY=a.y;scrollX=container.scrollLeft;scrollY=container.scrollTop;panning=true;}}
  container.addEventListener('pointerup',endPointer);container.addEventListener('pointercancel',endPointer);
  container.addEventListener('click',e=>{if(!mobile())return;if(dragged){e.stopPropagation();e.preventDefault();dragged=false;return;}if(!e.target.closest('.system-group')){selected?.classList.remove('hover-highlight');selected=null;nmPinned=false;hide();}} ,true);
container.addEventListener('wheel',e=>{if(!e.ctrlKey)return;e.preventDefault();const rect=container.getBoundingClientRect();zoomAt(scale*(e.deltaY<0?1.1:0.9),e.clientX-rect.left,e.clientY-rect.top);},{passive:false});
 container.scrollLeft=Math.max(0,(baseWidth-container.clientWidth)/2);container.scrollTop=Math.max(0,(baseHeight-container.clientHeight)/2);
});
// Siatka sektorów — niezależny przełącznik, działa na desktopie i mobilnie.
document.addEventListener('DOMContentLoaded', () => {
 const toggle=document.getElementById('grid-toggle');
 const grid=document.getElementById('galactic-coordinate-grid');
 if(!toggle||!grid)return;
 const sync=()=>{grid.style.display=toggle.checked?'':'none';};
 toggle.addEventListener('change',sync);sync();
});

// Przełączanie widoczności obszarów frakcji (tylko 3C i 3D)
document.addEventListener('DOMContentLoaded',()=>{
 const toggle=document.getElementById('territory-toggle');
 const menu=document.getElementById('territory-menu');
 const checks=[...document.querySelectorAll('.territory-check')];
 const all=document.getElementById('territory-all');
 toggle.addEventListener('click',()=>{menu.classList.toggle('hidden');toggle.setAttribute('aria-expanded',String(!menu.classList.contains('hidden')));});
 function update(){checks.forEach(c=>document.querySelectorAll('#faction-territories [data-territory="'+c.dataset.target+'"]').forEach(p=>p.classList.toggle('visible',c.checked)));all.checked=checks.every(c=>c.checked);all.indeterminate=checks.some(c=>c.checked)&&!all.checked;}
 checks.forEach(c=>c.addEventListener('change',update));
 all.addEventListener('change',()=>{checks.forEach(c=>c.checked=all.checked);update();});
 update();
});
