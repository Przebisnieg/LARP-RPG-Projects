document.addEventListener('DOMContentLoaded', () => {

    // --- BAZA DANYCH SYSTEMÓW ---
    const systemData = { 
        'kyroson': { name: 'Kyroson', description: '' }, 
        'gildia': { name: 'Siedziba Gildii', description: 'Siedziba Gildii Nawigatorów' }, 
        'cezaria': { name: 'Cezaria', description: '' }, 
        'nowy maraton': { name: 'Nowy Maraton', description: '' }, 
        'venetrix': { name: 'Venetrix', description: '' }, 
        'cygnium': { name: 'Cygnium', description: 'Układ Separatystów' }, 
        'zyraae': { name: 'Zyraae', description: 'Zbadano - układ nieżuyteczny' },
        'thalea': { name: 'Thalea', description: 'Zbadano - układ nieżuyteczny' },
        'kryonor': { name: 'Kryonor', description: 'Zbadano - układ nieżuyteczny' }, 
        'hydraium': { name: 'Hydraium', description: 'Zbadano - układ nieżuyteczny' },    
        'cygnus': { name: 'Cygnus', description: 'Zbadano - układ nieżuyteczny' },   
        'vegaium': { name: 'Vegaium', description: 'Zbadano - układ nieżuyteczny' },   
        'boreasel': { name: 'Boreasel', description: 'Zbadano - pozyskano 300 KE i 300 Minerałów' },   
        'thalear': { name: 'Thalear', description: 'Zbadano - układ nieżuyteczny' } ,  
        'phiraa': { name: 'Phiraa', description: 'Zbadano - układ nieżuyteczny' } ,  
        'orbiseus': { name: 'Orbiseus', description: 'Zbadano - układ nieżuyteczny' } ,

        'miraar': { name: 'Miraar', description: 'Zbadano - pozyskano 100 KE' },
        'miraos': { name: 'Miraos', description: 'Zbadano - pozyskano 100 KE' },
        'merosion': { name: 'Merosion', description: '"Viktoria Prima" - Zbadano - Świat zaklasyfikowano jako potencjlanie zdatny do kolonizacji w przyszłości. Wymagać będzie jednak zaawansowanych technologii i wiele pracy. Do ponownego zbadania w przyszłości.' },
        'erythar': { name: 'Erythar', description: 'Statek nie powrócił z misji - brak danych' },

        'lynoris': { name: 'Lynoris', description: 'Zbadano - Planeta włączona w struktury Hegemonii i gotowa do zagospodarowania' },
        'korvus': { name: 'Korvus', description: 'Zbadano - W wyniku operacji zabezpieczającej odzyskano zasoby wycenione na 300 KE. Dalsza eksploatacja niewskazana.' },
        'vireae': { name: 'Vireae', description: 'Zbadano - System nieprzydatny dla działań Hegemonii.' },
        'orbisara': { name: 'Orbisara', description: 'Zbadano - System całkowicie nieprzydatny dla kolonizacji i eksploatacji.' },
        
        'wulfheim': { name: 'Wulfheim', description: 'Protektorat Pogranicza - stolica' },
        'grausthal': { name: 'Grausthal', description: 'Protektorat Pogranicza' },
        'helgrim': { name: 'Helgrim', description: 'Protektorat Pogranicza' },

        'lynoron': { name: 'Lynoron', description: 'Baza Chanatu - baza aktywna. Systemy składają się z umocnień stałych i małej floty. Zlokalizowana na powierzchni małego, niezdatnego do zamieszkania i pozbawionego atmosfery księżyca.' },
        'boreasis': { name: 'Boreasis', description: 'Baza Chanatu - zniszczona' },
        'drastus': { name: 'Drastus', description: 'Baza Chanatu - zniszczona' },
        'korvara': { name: 'Korvara', description: 'Baza Chanatu - zniszczona' },
        'solonion': { name: 'Solonion', description: 'Główna Baza Chanatu' },
        'virea': { name: 'Virea', description: 'Baza Chanatu - niedawno założona baza, zapasowe centrum dowodzenia' },
        'vegaos': { name: 'Vegaos', description: 'Baza Chanatu - niedawno założona baza z fortami orbitalnymi' },

        'korva': { name: 'Korva', description: 'Zbadano - Zabezpieczono 600 jednostek minerałów. Pleneta niezdatna do dalszej eksploatacji.' },
        'tyrror': { name: 'Tyrror', description: 'Zbadano - System nieprzydatny dla działań Hegemonii.' },
        'doranae': { name: 'Doranae', description: 'Zbadano - System nieprzydatny dla działań Hegemonii.' },
        'orbisel': { name: 'Orbisel', description: 'Zbadano - System całkowicie nieprzydatny dla kolonizacji i eksploatacji.' }
    };

    // --- GŁÓWNE ELEMENTY DOM ---
    const mapContainer = document.getElementById('map-container');
    const mapContent = document.getElementById('map-content');
    const controls = document.getElementById('controls');
    const controlsHeader = document.getElementById('controls-header');
    const svg = document.querySelector('#map-content svg');
    const tooltip = document.getElementById('tooltip');
    const hideButton = document.getElementById('toggle-controls');
    const showButton = document.getElementById('show-controls-button');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const drawingLayer = document.getElementById('drawing-layer');
    const toolBtns = document.querySelectorAll('.tool-btn');
    const colorPicker = document.getElementById('color-picker');
    const strokeWidthSlider = document.getElementById('stroke-width');
    const strokeWidthLabel = document.getElementById('stroke-width-label');
    const clearDrawingBtn = document.getElementById('clear-drawing-btn');
    const saveMapBtn = document.getElementById('save-map-btn');
    const filterCheckboxes = document.querySelectorAll('.filter-check');
    const checkAll = document.getElementById('check-all');
    const selectionOverlay = document.getElementById('selection-overlay');
    const selectionBox = document.getElementById('selection-box');


    if (!svg) { console.error("Nie znaleziono elementu SVG na stronie."); return; }
    if (!drawingLayer) { console.error("Nie znaleziono elementu <g id='drawing-layer'> wewnątrz SVG."); document.getElementById('drawing-tools').style.display = 'none'; return; }

    // --- ZMIENNE STANU APLIKACJI ---
    let currentTool = 'select';
    let currentColor = '#FFD700';
    let strokeWidth = 5;
    let isDrawing = false;
    let currentElement = null;
    let startPoint = { x: 0, y: 0 };
    let isPanning = false;
    let panStart = { x: 0, y: 0 };
    let scrollStart = { left: 0, top: 0 };
    let currentScale = 1.0;
    let initialPinchDistance = 0;
    let lastScale = 1.0;
    let isSelecting = false;
    let selectionStart = { x: 0, y: 0 };
    let selectionRect = { x: 0, y: 0, width: 0, height: 0 };
    
    let isDraggingShape = false;
    let selectedElement = null;
    let dragStartPoint = { x: 0, y: 0 };
    let elementStartTransform = { x: 0, y: 0 };
    
    let currentRotation = 0;


    // --- FUNKCJE PANELU STEROWANIA ---
    const hideControls = () => { controls.classList.add('hidden'); showButton.style.display = 'block'; };
    const showControls = () => { controls.classList.remove('hidden'); showButton.style.display = 'none'; };

    // --- FUNKCJA WYSZUKIWANIA ---
    function findAndCenterSystem() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;
        const highlighted = svg.querySelector('.search-highlight');
        if (highlighted) highlighted.classList.remove('search-highlight');
        const foundSystem = Array.from(svg.querySelectorAll('.system-group')).find(sys => sys.id.toLowerCase().includes(query));
        if (foundSystem) {
            foundSystem.style.display = '';
            foundSystem.classList.add('search-highlight');
            setTimeout(() => { foundSystem.classList.remove('search-highlight'); }, 5000);
            const circle = foundSystem.querySelector('circle');
            if (circle) {
                const cx = parseFloat(circle.getAttribute('cx')) * currentScale;
                const cy = parseFloat(circle.getAttribute('cy')) * currentScale;
                mapContainer.scrollTo({ left: cx - mapContainer.clientWidth / 2, top: cy - mapContainer.clientHeight / 2, behavior: 'smooth' });
            }
            searchInput.style.borderColor = '#87c7ff';
        } else {
            searchInput.style.borderColor = '#e53935';
            setTimeout(() => searchInput.style.borderColor = '', 2000);
        }
    }

    // --- FUNKCJA FILTROWANIA ---
    function applyFilters() {
        const checkedFilters = document.querySelectorAll('.filter-check:checked');
        const systemGroups = svg.querySelectorAll('.system-group');
        if (checkedFilters.length === 0) { systemGroups.forEach(group => group.style.display = 'none'); return; }
        const activeFilters = { faction: new Set(), status: new Set(), starType: new Set() };
        checkedFilters.forEach(cb => {
            const filterValue = cb.dataset.filter;
            if (['hegemonia', 'gildia', 'separatysci', 'neutralny', 'chanat', 'protektorat'].includes(filterValue)) activeFilters.faction.add(filterValue);
            else if (['znany', 'nieznany'].includes(filterValue)) activeFilters.status.add(filterValue);
            else if (['czerwony', 'zolty', 'inny'].includes(filterValue)) activeFilters.starType.add(filterValue);
        });
        systemGroups.forEach(group => {
            const factionMatch = activeFilters.faction.size === 0 || activeFilters.faction.has(group.dataset.faction);
            const statusMatch = activeFilters.status.size === 0 || activeFilters.status.has(group.dataset.status);
            const starTypeMatch = activeFilters.starType.size === 0 || activeFilters.starType.has(group.dataset.starType);
            group.style.display = (factionMatch && statusMatch && starTypeMatch) ? '' : 'none';
        });
    }

    // --- FUNKCJE POMOCNICZE ---
    function getSVGPoint(event) { const pt = svg.createSVGPoint(); const clientX = event.touches ? event.touches[0].clientX : event.clientX; const clientY = event.touches ? event.touches[0].clientY : event.clientY; pt.x = clientX; pt.y = clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); }
    function updateArrowhead(p1, p2) { const arrowhead = currentElement.querySelector('polygon'); if (!arrowhead) return; const angle = Math.atan2(p2.y - p1.y, p2.x - p1.x); const size = strokeWidth * 2.5; const p3 = { x: p2.x - size * Math.cos(angle - Math.PI / 6), y: p2.y - size * Math.sin(angle - Math.PI / 6) }; const p4 = { x: p2.x - size * Math.cos(angle + Math.PI / 6), y: p2.y - size * Math.sin(angle + Math.PI / 6) }; arrowhead.setAttribute('points', `${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`); arrowhead.setAttribute('fill', currentColor); }
    function getPinchDistance(touches) { const dx = touches[0].clientX - touches[1].clientX; const dy = touches[0].clientY - touches[1].clientY; return Math.sqrt(dx * dx + dy * dy); }
    function getPinchCenter(touches) { return { x: (touches[0].clientX + touches[1].clientX) / 2, y: (touches[0].clientY + touches[1].clientY) / 2 }; }
    function applyZoom(newScale, centerX, centerY) {
        newScale = Math.max(0.1, Math.min(newScale, 8)); 
        if (newScale === currentScale) return;
        const rect = mapContainer.getBoundingClientRect();
        const mouseX = centerX - rect.left;
        const mouseY = centerY - rect.top;
        const newScrollLeft = (mapContainer.scrollLeft + mouseX) * (newScale / currentScale) - mouseX;
        const newScrollTop = (mapContainer.scrollTop + mouseY) * (newScale / currentScale) - mouseY;
        currentScale = newScale;
        mapContent.style.transform = `scale(${currentScale})`;
        mapContainer.scrollLeft = newScrollLeft;
        mapContainer.scrollTop = newScrollTop;
        const uiScale = Math.min(1.0, Math.max(0.75, currentScale));
        document.documentElement.style.setProperty('--ui-scale', uiScale);
    }
    function prepareSVGForFiltering(svgElement) {
        const knownFactions = { 
            'gildia': { faction: 'gildia', status: 'znany' }, 
            'cezaria': { faction: 'hegemonia', status: 'znany' }, 
            'nowy maraton': { faction: 'hegemonia', status: 'znany' }, 
            'venetrix': { faction: 'hegemonia', status: 'znany' }, 
            'cygnium': { faction: 'separatysci', status: 'znany' },
            'zyraae': { faction: 'neutralny', status: 'znany' },
            'vegaium': { faction:  'neutralny', status: 'znany' },
            'cygnus': { faction: 'neutralny', status: 'znany' },
            'hydraium': { faction: 'neutralny', status: 'znany' },
            'kryonor': { faction: 'neutralny', status: 'znany' },
            'thalea': { faction: 'neutralny', status: 'znany' },
            'boreasel': { faction: 'neutralny', status: 'znany' },
            'thalear': { faction: 'neutralny', status: 'znany' },
            'phiraa': { faction: 'neutralny', status: 'znany' },
            'orbiseus': { faction: 'neutralny', status: 'znany' },

            'wulfheim': { faction: 'protektorat', status: 'znany' },
            'grausthal': { faction: 'protektorat', status: 'znany' },
            'helgrim': { faction: 'protektorat', status: 'znany' },

            'lynoron': { faction: 'chanat', status: 'znany' },
            'boreasis': { faction: 'chanat', status: 'znany' },
            'drastus': { faction: 'chanat', status: 'znany' },
            'korvara': { faction: 'chanat', status: 'znany' },
            'vegaos': { faction: 'chanat', status: 'znany' },
            'virea': { faction: 'chanat', status: 'znany' },
            'solonion': { faction: 'chanat', status: 'znany' },

            'lynoris': { faction: 'hegemonia', status: 'znany' },
            'korvus': { faction: 'neutralny', status: 'znany' },
            'vireae': { faction: 'neutralny', status: 'znany' },
            'orbisara': { faction: 'neutralny', status: 'znany' },
            'miraar': { faction: 'neutralny', status: 'znany' },
            'miraos': { faction: 'neutralny', status: 'znany' },
            'merosion': { faction: 'neutralny', status: 'znany' },
            'erythar': { faction: 'neutralny', status: 'znany' },

            'korva': { faction: 'neutralny', status: 'znany' },
            'tyrror': { faction: 'neutralny', status: 'znany' },
            'doranae': { faction: 'neutralny', status: 'znany' },
            'orbisel': { faction: 'neutralny', status: 'znany' }

        };


        svgElement.querySelectorAll('g').forEach(group => {
            if (group.id === 'drawing-layer' || group.classList.contains('system-group')) return;
            group.classList.add('system-group');
            const id = group.id ? group.id.toLowerCase().replace(/_/g, ' ') : '';
            if (knownFactions[id]) { Object.assign(group.dataset, knownFactions[id]); } 
            else { Object.assign(group.dataset, { faction: 'neutralny', status: 'nieznany' }); }
            const starCircle = group.querySelector('circle[stroke="white"]');
            if (starCircle) {
                const fillColor = starCircle.getAttribute('fill');
                if (fillColor === '#ff4444') group.dataset.starType = 'czerwony';
                else if (fillColor === '#ffe066' || fillColor === '#ffbb55') group.dataset.starType = 'zolty';
                else group.dataset.starType = 'inny';
            } else if (id === "gildia") { group.dataset.starType = 'zolty'; } 
            else { group.dataset.starType = 'inny'; }
        });
    }
    prepareSVGForFiltering(svg);

    // --- OBSŁUGA TOOLTIPÓW I PODŚWIETLEŃ ---
    svg.querySelectorAll('.system-group').forEach(group => {
        group.addEventListener('mouseover', () => {
            if (isSelecting || isDraggingShape) return; 
            group.classList.add('hover-highlight');
            const systemId = group.id.toLowerCase().replace(/_/g, ' ');
            const data = systemData[systemId] || { name: group.id, description: '' };
            const descriptionHtml = data.description ? `<p class="tooltip-desc">${data.description}</p>` : '';
            const faction = group.dataset.faction || 'nieznany';
            const status = group.dataset.status || 'nieznany';
            const factionDisplay = faction.charAt(0).toUpperCase() + faction.slice(1);
            const statusDisplay = status.charAt(0).toUpperCase() + status.slice(1);
            tooltip.innerHTML = `<h3>${data.name}</h3>${descriptionHtml}<p>Frakcja: <span class="faction-${faction}">${factionDisplay}</span></p><p>Status: ${statusDisplay}</p>`;
            tooltip.classList.remove('hidden');
        });
        group.addEventListener('mouseout', () => { group.classList.remove('hover-highlight'); tooltip.classList.add('hidden'); });
    });
    document.addEventListener('mousemove', (e) => {
        if (!tooltip.classList.contains('hidden')) {
            let x = e.clientX + 20, y = e.clientY + 20;
            if (x + tooltip.offsetWidth > window.innerWidth) x = e.clientX - tooltip.offsetWidth - 20;
            if (y + tooltip.offsetHeight > window.innerHeight) y = e.clientY - tooltip.offsetHeight - 20;
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
        }
    });

    // --- LOGIKA NARZĘDZI GRAFICZNYCH ---
    toolBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toolBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTool = btn.dataset.tool;
            mapContainer.classList.toggle('drawing-mode', currentTool !== 'select');
            mapContainer.classList.toggle('select-mode', currentTool === 'select');
            if (currentTool === 'select' || currentTool === 'eraser') {
                drawingLayer.style.pointerEvents = 'auto';
            } else {
                drawingLayer.style.pointerEvents = 'none';
            }
            if (selectedElement) {
                selectedElement.classList.remove('selected-shape');
                selectedElement = null;
            }
        });
    });
    document.querySelector('.tool-btn[data-tool="select"]').classList.add('active');
    mapContainer.classList.add('select-mode');
    drawingLayer.style.pointerEvents = 'auto';

    colorPicker.addEventListener('input', (e) => { currentColor = e.target.value; });
    strokeWidthSlider.addEventListener('input', (e) => { strokeWidth = e.target.value; strokeWidthLabel.textContent = `${strokeWidth}px`; });
    clearDrawingBtn.addEventListener('click', () => { drawingLayer.innerHTML = ''; });

    
    // --- ZAPIS MAPY ---
    function captureSelection() {
        selectionOverlay.classList.add('hidden');
        if (selectionRect.width < 10 || selectionRect.height < 10) { console.log("Zaznaczenie jest zbyt małe, anulowano zapis."); return; }
        const options = { allowTaint: true, useCORS: true, backgroundColor: '#0f0f18', logging: false, x: selectionRect.x, y: selectionRect.y, width: selectionRect.width, height: selectionRect.height };
        setTimeout(() => {
            html2canvas(document.getElementById('map-container'), options).then(canvas => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/jpeg', 0.9);
                link.download = 'mapa_sektora_wycinek.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }).catch(err => {
                console.error('Błąd podczas generowania obrazu:', err);
                alert('Wystąpił błąd podczas próby zapisania mapy.');
            });
        }, 50);
    }
    saveMapBtn.addEventListener('click', () => { selectionOverlay.classList.remove('hidden'); tooltip.classList.add('hidden'); });
    selectionOverlay.addEventListener('mousedown', (e) => { e.preventDefault(); isSelecting = true; const rect = mapContainer.getBoundingClientRect(); selectionStart.x = e.clientX - rect.left; selectionStart.y = e.clientY - rect.top; selectionBox.style.left = selectionStart.x + 'px'; selectionBox.style.top = selectionStart.y + 'px'; selectionBox.style.width = '0px'; selectionBox.style.height = '0px'; });
    selectionOverlay.addEventListener('mousemove', (e) => { if (!isSelecting) return; const rect = mapContainer.getBoundingClientRect(); const currentX = e.clientX - rect.left; const currentY = e.clientY - rect.top; const x = Math.min(selectionStart.x, currentX); const y = Math.min(selectionStart.y, currentY); const width = Math.abs(selectionStart.x - currentX); const height = Math.abs(selectionStart.y - currentY); selectionBox.style.left = x + 'px'; selectionBox.style.top = y + 'px'; selectionBox.style.width = width + 'px'; selectionBox.style.height = height + 'px'; selectionRect = { x, y, width, height }; });
    selectionOverlay.addEventListener('mouseup', () => { if (!isSelecting) return; isSelecting = false; captureSelection(); });
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !selectionOverlay.classList.contains('hidden')) { selectionOverlay.classList.add('hidden'); isSelecting = false; } });


    // --- GŁÓWNA LOGIKA INTERAKCJI Z MAPĄ ---
    const startDrawing = (e) => {
        if ((e.type === 'mousedown' && e.button !== 0) || (e.target.closest && e.target.closest('.system-group'))) return;
        isDrawing = true;
        startPoint = getSVGPoint(e);
        currentRotation = 0; 

        if (currentTool === 'text') {
            const textContent = prompt("Wpisz tekst:", "");
            if (textContent) {
                currentElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                currentElement.setAttribute('x', startPoint.x); currentElement.setAttribute('y', startPoint.y); currentElement.setAttribute('fill', currentColor); currentElement.setAttribute('font-size', strokeWidth * 3); currentElement.setAttribute('font-family', 'sans-serif'); currentElement.style.textAnchor = 'middle'; currentElement.style.paintOrder = 'stroke fill'; currentElement.style.stroke = 'black'; currentElement.style.strokeWidth = '0.5px'; currentElement.textContent = textContent; drawingLayer.appendChild(currentElement);
                currentElement.classList.add('draggable-shape');
            }
            isDrawing = false; currentElement = null; return;
        }
        if (currentTool === 'eraser') return;
        
        const svgNS = 'http://www.w3.org/2000/svg';
        switch (currentTool) {
            case 'pencil': currentElement = document.createElementNS(svgNS, 'path'); currentElement.setAttribute('d', `M ${startPoint.x} ${startPoint.y}`); break;
            case 'line': currentElement = document.createElementNS(svgNS, 'line'); currentElement.setAttribute('x1', startPoint.x); currentElement.setAttribute('y1', startPoint.y); currentElement.setAttribute('x2', startPoint.x); currentElement.setAttribute('y2', startPoint.y); break;
            case 'arrow': currentElement = document.createElementNS(svgNS, 'g'); const line = document.createElementNS(svgNS, 'line'); const arrowhead = document.createElementNS(svgNS, 'polygon'); currentElement.appendChild(line); currentElement.appendChild(arrowhead); line.setAttribute('x1', startPoint.x); line.setAttribute('y1', startPoint.y); line.setAttribute('x2', startPoint.x); line.setAttribute('y2', startPoint.y); break;
            case 'rect': currentElement = document.createElementNS(svgNS, 'rect'); currentElement.setAttribute('x', startPoint.x); currentElement.setAttribute('y', startPoint.y); break;
            
            case 'ellipse': 
                currentElement = document.createElementNS(svgNS, 'ellipse'); 
                currentElement.setAttribute('cx', startPoint.x); 
                currentElement.setAttribute('cy', startPoint.y);
                currentElement.setAttribute('rx', 0);
                currentElement.setAttribute('ry', 0);
                break;
        }
        if (currentElement) { 
            currentElement.setAttribute('stroke', currentColor); 
            currentElement.setAttribute('stroke-width', strokeWidth); 
            currentElement.setAttribute('fill', 'none'); 
            if (currentTool === 'rect' || currentTool === 'ellipse') currentElement.setAttribute('fill', 'transparent'); 
            currentElement.setAttribute('stroke-linecap', 'round'); 
            currentElement.setAttribute('stroke-linejoin', 'round'); 
            drawingLayer.appendChild(currentElement); 
        }
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const currentPoint = getSVGPoint(e);
        if (currentTool === 'eraser') { if (e.target && drawingLayer.contains(e.target) && e.target !== drawingLayer) { e.target.remove(); } return; }
        if (!currentElement) return;

        switch (currentTool) {
            case 'pencil': 
                currentElement.setAttribute('d', currentElement.getAttribute('d') + ` L ${currentPoint.x} ${currentPoint.y}`); 
                break;
            case 'line': 
                currentElement.setAttribute('x2', currentPoint.x); 
                currentElement.setAttribute('y2', currentPoint.y); 
                break;
            case 'arrow': 
                const line = currentElement.querySelector('line'); 
                line.setAttribute('x2', currentPoint.x); 
                line.setAttribute('y2', currentPoint.y); 
                line.setAttribute('stroke', currentColor); 
                line.setAttribute('stroke-width', strokeWidth); 
                updateArrowhead(startPoint, currentPoint); 
                break;
            case 'rect': 
                const x = Math.min(startPoint.x, currentPoint.x);
                const y = Math.min(startPoint.y, currentPoint.y);
                const width = Math.abs(startPoint.x - currentPoint.x);
                const height = Math.abs(startPoint.y - currentPoint.y);
                currentElement.setAttribute('x', x);
                currentElement.setAttribute('y', y);
                currentElement.setAttribute('width', width);
                currentElement.setAttribute('height', height);

                const centerX = x + width / 2;
                const centerY = y + height / 2;

                if (e.altKey) { 
                    const angle = Math.atan2(currentPoint.y - centerY, currentPoint.x - centerX) * 180 / Math.PI;
                    currentRotation = angle;
                }
                currentElement.setAttribute('transform', `rotate(${currentRotation}, ${centerX}, ${centerY})`);
                break;
            case 'ellipse': 
                const rx = Math.abs(currentPoint.x - startPoint.x);
                const ry = Math.abs(currentPoint.y - startPoint.y);
                currentElement.setAttribute('rx', rx);
                currentElement.setAttribute('ry', ry);
                
                if (e.altKey) {
                    const angle = Math.atan2(currentPoint.y - startPoint.y, currentPoint.x - startPoint.x) * 180 / Math.PI;
                    currentRotation = angle;
                }
                currentElement.setAttribute('transform', `rotate(${currentRotation}, ${startPoint.x}, ${startPoint.y})`);
                break;
        }
    };
    
    const stopDrawing = () => {
        if (isDrawing && currentElement) {
            currentElement.classList.add('draggable-shape');
        }
        isDrawing = false;
        currentElement = null;
    };

    // --- PODPIĘCIE WSZYSTKICH EVENTÓW ---
    
    mapContainer.addEventListener('mousedown', (e) => {
        if (e.target.closest('#selection-overlay') || e.button !== 0) return;

        if (currentTool === 'select') {
            const targetShape = e.target.closest('.draggable-shape');
            
            if (targetShape && drawingLayer.contains(targetShape)) {
                isDraggingShape = true;
                selectedElement = targetShape;
                dragStartPoint = getSVGPoint(e);
                
                const currentTransform = selectedElement.getAttribute('transform') || '';
                const translateMatch = currentTransform.match(/translate\(([^)]+)\)/);
                if (translateMatch) {
                    const [tx, ty] = translateMatch[1].split(/[ ,]+/).map(parseFloat);
                    elementStartTransform.x = tx || 0;
                    elementStartTransform.y = ty || 0;
                } else {
                    elementStartTransform.x = 0;
                    elementStartTransform.y = 0;
                }
                
                document.querySelectorAll('.selected-shape').forEach(el => el.classList.remove('selected-shape'));
                selectedElement.classList.add('selected-shape');
                e.stopPropagation();
            } else {
                isPanning = true;
                panStart = { x: e.clientX, y: e.clientY };
                scrollStart = { left: mapContainer.scrollLeft, top: mapContainer.scrollTop };
                
                if (selectedElement) {
                    selectedElement.classList.remove('selected-shape');
                    selectedElement = null;
                }
            }
        } else {
            startDrawing(e);
        }
    });

    mapContainer.addEventListener('mousemove', (e) => {
        if (isPanning) {
            const dx = e.clientX - panStart.x;
            const dy = e.clientY - panStart.y;
            mapContainer.scrollLeft = scrollStart.left - dx;
            mapContainer.scrollTop = scrollStart.top - dy;
        } else if (isDrawing) {
            draw(e);
        } else if (isDraggingShape && selectedElement) { 
            const currentPoint = getSVGPoint(e);
            const dx = currentPoint.x - dragStartPoint.x;
            const dy = currentPoint.y - dragStartPoint.y;
            const newX = elementStartTransform.x + dx;
            const newY = elementStartTransform.y + dy;

            const currentTransform = selectedElement.getAttribute('transform') || '';
            const otherTransforms = currentTransform.replace(/translate\([^)]+\)/, '').trim();
            selectedElement.setAttribute('transform', `translate(${newX}, ${newY}) ${otherTransforms}`);
        }
    });

    window.addEventListener('mouseup', () => { 
        if (isDrawing) stopDrawing(); 
        if (isPanning) isPanning = false;
        if (isDraggingShape) isDraggingShape = false; 
    });
    
    mapContainer.addEventListener('touchstart', (e) => {
        if (e.target.closest('#controls') || e.target.closest('#selection-overlay')) return;
        
        if (e.touches.length === 1) {
            if (currentTool === 'select') {
                const targetShape = e.target.closest('.draggable-shape');
                if (targetShape && drawingLayer.contains(targetShape)) {
                    isDraggingShape = true;
                    selectedElement = targetShape;
                    dragStartPoint = getSVGPoint(e);
                    
                    const currentTransform = selectedElement.getAttribute('transform') || '';
                    const translateMatch = currentTransform.match(/translate\(([^)]+)\)/);
                    if (translateMatch) {
                        const [tx, ty] = translateMatch[1].split(/[ ,]+/).map(parseFloat);
                        elementStartTransform.x = tx || 0;
                        elementStartTransform.y = ty || 0;
                    } else {
                        elementStartTransform.x = 0;
                        elementStartTransform.y = 0;
                    }
                    
                    document.querySelectorAll('.selected-shape').forEach(el => el.classList.remove('selected-shape'));
                    selectedElement.classList.add('selected-shape');
                    e.stopPropagation();
                } else {
                    isPanning = true;
                    panStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                    scrollStart = { left: mapContainer.scrollLeft, top: mapContainer.scrollTop };
                    if (selectedElement) {
                        selectedElement.classList.remove('selected-shape');
                        selectedElement = null;
                    }
                }
            } else {
                startDrawing(e);
            }
        } else if (e.touches.length === 2) {
            e.preventDefault();
            isDrawing = false; 
            isPanning = false;
            isDraggingShape = false;
            initialPinchDistance = getPinchDistance(e.touches);
            lastScale = currentScale;
        }
    }, { passive: false });

    mapContainer.addEventListener('touchmove', (e) => {
        if (e.target.closest('#controls') || e.target.closest('#selection-overlay')) return;
        
        if (e.touches.length === 1) { 
            if (isPanning) {
                e.preventDefault();
                const dx = e.touches[0].clientX - panStart.x;
                const dy = e.touches[0].clientY - panStart.y;
                mapContainer.scrollLeft = scrollStart.left - dx;
                mapContainer.scrollTop = scrollStart.top - dy;
            } else if (isDrawing) {
                e.preventDefault();
                draw(e); 
            } else if (isDraggingShape && selectedElement) { 
                e.preventDefault();
                const currentPoint = getSVGPoint(e);
                const dx = currentPoint.x - dragStartPoint.x;
                const dy = currentPoint.y - dragStartPoint.y;
                const newX = elementStartTransform.x + dx;
                const newY = elementStartTransform.y + dy;
                
                const currentTransform = selectedElement.getAttribute('transform') || '';
                const otherTransforms = currentTransform.replace(/translate\([^)]+\)/, '').trim();
                selectedElement.setAttribute('transform', `translate(${newX}, ${newY}) ${otherTransforms}`);
            }
        } else if (e.touches.length === 2 && initialPinchDistance > 0) {
            e.preventDefault();
            const currentPinchDistance = getPinchDistance(e.touches);
            const zoomFactor = currentPinchDistance / initialPinchDistance;
            const newScale = lastScale * zoomFactor;
            const pinchCenter = getPinchCenter(e.touches);
            applyZoom(newScale, pinchCenter.x, pinchCenter.y);
        }
    }, { passive: false });

    window.addEventListener('touchend', (e) => {
        if (isDrawing) stopDrawing();
        if (isPanning) isPanning = false;
        if (isDraggingShape) isDraggingShape = false; 
        
        if (e.touches.length < 2) {
             initialPinchDistance = 0;
        }
    });

    mapContainer.addEventListener('wheel', (e) => {
        if (!e.ctrlKey) return; 
        e.preventDefault();
        const scaleAmount = e.deltaY < 0 ? 1.1 : 1 / 1.1;
        const newScale = currentScale * scaleAmount;
        applyZoom(newScale, e.clientX, e.clientY);
    }, { passive: false });
    
    // --- Pozostałe Listenery ---
    filterCheckboxes.forEach(cb => cb.addEventListener('change', () => { checkAll.checked = document.querySelectorAll('.filter-check:checked').length === filterCheckboxes.length; applyFilters(); }));
    checkAll.addEventListener('change', () => { filterCheckboxes.forEach(cb => cb.checked = checkAll.checked); applyFilters(); });
    searchButton.addEventListener('click', findAndCenterSystem);
    searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') findAndCenterSystem(); });
    hideButton.addEventListener('click', hideControls);
    showButton.addEventListener('click', showControls);
    
    let isDraggingPanel = false, dragStart = { x: 0, y: 0 }, panelStart = { x: 0, y: 0 };
    controlsHeader.addEventListener('mousedown', (e) => { isDraggingPanel = true; dragStart = { x: e.clientX, y: e.clientY }; const rect = controls.getBoundingClientRect(); panelStart = { x: rect.left, y: rect.top }; e.preventDefault(); });
    window.addEventListener('mousemove', (e) => { if (isDraggingPanel) { const dx = e.clientX - dragStart.x; const dy = e.clientY - dragStart.y; controls.style.left = `${panelStart.x + dx}px`; controls.style.top = `${panelStart.y + dy}px`; } });
    window.addEventListener('mouseup', () => { isDraggingPanel = false; }); 
    
    applyFilters();
});