document.addEventListener('DOMContentLoaded', () => {

    // === BAZA DANYCH DLA REGIONÓW ===
const regionData = {

        // --- MONY KLANÓW (klan, daimyo i opis) ---
    'Pajak': { klan: 'Klan Pająka', daimyo: 'Daigotsu', inne: '' },
    'Skorpion': { klan: 'Klan Skorpiona', daimyo: '-', inne: '' },
    'Lew': { klan: 'Klan Lwa', daimyo: '', inne: '' },
    'LEW': { klan: 'Klan Lwa', daimyo: '', inne: '' },
    'Krab': { klan: 'Klan Kraba', daimyo: '', inne: ''},
    'Zuraw': { klan: 'Klan Żurawia', daimyo: '', inne: ''},
    'Feniks': { klan: 'Klan Feniksa', daimyo: '', inne: ''},
    'Feniks22': { klan: 'Klan Feniksa', daimyo: '', inne: ''},
    'Smok': { klan: 'Klan Smoka', daimyo: '', inne: ''},
    'Modliszka': { klan: 'Klan Modliszki', daimyo: '', inne: ''},
    'Jednorozec': { klan: 'Klan Jednorożca', daimyo: '', inne: ''},
    'Borsuk': { klan: 'Klan Borsuka', daimyo: '', inne: ''},
    'MonC2': { klan: 'Klan Cesarski', cesarz: 'Hantei XXXII', inne: ''},
    'MonC1': { klan: 'Klan Cesarski', szogun: 'Hantei Murasaki', inne: ''},


    // --- PROWINCJE (pełne dane - 70 prow) ---
    //jednorożce
    'path5': { prowincja: 'Kogane no Sato', klan: 'Jednorożca', rodzina: 'Shinjo (Aki)', status: 'Wielki Klan', surowce: '', wartość: '2', inne: 'Teren dawnych wojen między Smokami a Jednorożcami.' },
    'path6': { prowincja: 'Arashimoto', klan: 'Jednorożca', rodzina: 'Shinjo (Aki)', status: 'Wielki Klan', surowce: '', wartość: '2', inne: '' },
    'path7': { prowincja: 'Shiratama', klan: 'Jednorożca', rodzina: 'Moto', status: 'Wielki Klan', surowce: 'Drewno', wartość: '2', inne: '' },
    'path10': { prowincja: 'Takayami', klan: 'Jednorożca', rodzina: 'Shinjo (Karuma)', status: 'Wielki Klan', surowce: 'Złoto', wartość: '2', inne: 'Obecnie toczą się tu starcia </br>między siłami Shinjo Aki a Shinjo Karumy' },
    'path12': { prowincja: 'Seiryūzan', klan: 'Jednorożca', rodzina: 'Shinjo (Karuma)', status: 'Wielki Klan', surowce: '', wartość: '2', inne: 'Obecnie toczą się tu starcia </br>między siłami Shinjo Aki a Shinjo Karumy </br>Dawne ziemie Klanu Wołu' },

    //smoki
    'path53': { prowincja: 'Meiyo no Kuni', klan: 'Smoka', rodzina: 'Mirumoto', status: 'Wielki Klan', surowce: '', wartość: '1', inne: '' },
    'path59': { prowincja: 'Takayama no Shō', klan: 'Smoka', rodzina: 'Kitsuki', status: 'Wielki Klan', surowce: '', wartość: '2', inne: '' },
    'path60': { prowincja: 'Matsukaze no Shō', klan: 'Smoka', rodzina: 'Mirumoto', status: 'Wielki Klan', surowce: 'Roślinność', wartość: '2', inne: '' },
    'path61': { prowincja: 'Shinrai no Shō', klan: 'Smoka', rodzina: 'Mirumoto', status: 'Wielki Klan', surowce: '', wartość: '2', inne: '' },
    'path62': { prowincja: 'Makoto no Shō', klan: 'Smoka', rodzina: 'Mirumoto', status: 'Wielki Klan', surowce: '', wartość: '1', inne: '' },

    //feniksy
    'path9': { prowincja: 'Midorino', klan: 'Feniksa', rodzina: 'Isawa', status: 'Wielki Klan', surowce: '', wartość: '1', inne: '' },
    'path14': { prowincja: 'Prowincja Ostatniego Światła', klan: 'Feniksa', rodzina: 'Isawa', status: 'Wielki Klan', surowce: 'Drewno', wartość: '2', inne: 'Dawniej ziemie należące do Klanu Pająka.' },
    'path66': { prowincja: 'Kaen no Kuni', klan: 'Feniksa', rodzina: 'Isawa', status: 'Wielki Klan', surowce: '', wartość: '1', inne: '' },
    'path67': { prowincja: 'Dōketsu no Shō', klan: 'Feniksa', rodzina: 'Isawa', status: 'Wielki Klan', surowce: '', wartość: '1', inne: '' },
    'path68': { prowincja: 'Prowincja Wiatru', klan: 'Feniksa', rodzina: 'Isawa', status: 'Weilki Klan', surowce: 'Ryby', wartość: '2', inne: '' },
    'path69': { prowincja: 'Kraj Dzwonów Wiatru', klan: 'Feniksa', rodzina: 'Isawa', status: 'Wielki Klan', surowce: 'Skóry', wartość: '2', inne: '' },
    'path70': { prowincja: 'Hi no Shō', klan: 'Feniksa', rodzina: 'Isawa', status: 'Wielki Klan', surowce: '', wartość: '2', inne: '' },

    //Kraby
    'path22': { prowincja: 'Hiradoya', klan: 'Kraba', rodzina: 'Hida', status: 'Wielki Klan', surowce: '', wartość: '1', inne: '' },
    'path28': { prowincja: 'Wielka równina Kaiu', klan: 'Kraba', rodzina: 'Kaiu', status: 'Wielki Klan', surowce: '', wartość: '2', inne: 'Ostatni zamek przed Krainami Cienia.' },  
    'path29': { prowincja: 'Jadeitowe szczyty', klan: 'Kraba', rodzina: 'Hida', status: 'Wielki Klan', surowce: 'Jadeit (obecnie jedynie w formie skażonej)', wartość: '2', inne: 'Tu wydobywało się jadeit.' },
    'path30': { prowincja: 'Hagrata', klan: 'Kraba', rodzina: 'Hida', status: 'Wielki Klan', surowce: 'Kamień', wartość: '2', inne: 'Kopalnie kamienia' },

    //Lwy
    'path15': { prowincja: 'Jedwabny zmierzch', klan: 'Lwa', rodzina: 'Matsu', status: 'Wielki Klan', surowce: 'Drewno', wartość: '2', inne: 'Kiedyś to terytorium było stolicą Klanu Pająka.' },
    'path49': { prowincja: 'Chikuyama', klan: 'Lwa', rodzina: 'Akodo', status: 'Wielki Klan', surowce: '', wartość: '1', inne: '' },
    'path50': { prowincja: 'Nieskończony Horyzont', klan: 'Lwa', rodzina: 'Ikoma', status: 'Wielki Klan', surowce: 'Metal', wartość: '2', inne: '' },
    'path51': { prowincja: 'Kraina Żaru', klan: 'Lwa', rodzina: 'Akodo', status: 'Wielki Klan', surowce: 'Drewno', wartość: '2', inne: '' },
    'path55': { prowincja: 'Kazehaya', klan: 'Lwa', rodzina: 'Matsu', status: 'Wielki Klan', surowce: '', wartość: '2', inne: '' },

    //Pajaki
    'path17': { prowincja: 'Smutne pola', klan: 'Pająka', rodzina: 'Daigotsu', status: 'Wielki Klan', surowce: 'Zboże', wartość: '2', inne: 'Jedyna prowincja nadal pod kontrolą Klanu Pająka' },

    //Skorpiony
    'path35': { prowincja: 'Północne Rozlewiska', klan: 'Skorpiona', rodzina: 'Bayushi', status: '', surowce: '', wartość: '', inne: 'Trwają tam walki Żurawi i Skorpionów' },
    'path42': { prowincja: '', klan: 'Skorpiona', rodzina: 'Bayushi', status: 'Wielki Klan', surowce: 'Zboże, ryż', wartość: '2', inne: '' },
    'path43': { prowincja: '', klan: 'Skorpiona', rodzina: 'Bayushi', status: 'Wielki Klan', surowce: '', wartość: '2', inne: '' },
    'path44': { prowincja: 'Wzgórza Gorejącego Maku', klan: 'Skorpiona', rodzina: 'Shosuro', status: 'Wielki Klan', surowce: 'Kamień', wartość: '2', inne: '' },
    'path45': { prowincja: '', klan: 'Skorpiona', rodzina: 'Shosuro', status: 'Wielki Klan', surowce: '', wartość: '2', inne: '' },

    //Modliszki
    'path36': { prowincja: 'Południowe Rozlewiska', klan: 'Modliszki', rodzina: 'Yorimoto', status: 'Wielki Klan', surowce: '', wartość: '', inne: '' },
    'path37': { prowincja: 'Kraina Morskiego Wiatru', klan: 'Modliszki', rodzina: 'Yorimoto', status: 'Wielki Klan', surowce: '', wartość: '2', inne: '' },
    'path38': { prowincja: 'Hokkyoku no Nami', klan: 'Modliszki', rodzina: 'Yorimoto', status: 'Wielki Klan', surowce: '', wartość: '2', inne: '' },
    'path39': { prowincja: 'Arashi Misaki', klan: 'Modliszki', rodzina: 'Yorimoto', status: 'Wielki Klan', surowce: '', wartość: '2', inne: '' },
    'path48': { prowincja: 'Archipelag Środkowy', klan: 'Modliszki', rodzina: 'Yorimoto', status: 'Wielki Klan', surowce: '', wartość: '', inne: '' },

    //Żurawie
    'path40': { prowincja: '', klan: 'Żurawia', rodzina: 'Daidoji', status: 'Wielki Klan', surowce: 'Ryby', wartość: '', inne: '' },
    'path41': { prowincja: '', klan: 'Żurawia', rodzina: 'Daidoji', status: 'Wielki Klan', surowce: '', wartość: '', inne: '' },
    'path46': { prowincja: 'Kishou', klan: 'Żurawia', rodzina: 'Daidoji', status: 'Wielki Klan', surowce: '', wartość: '', inne: '' },
    'path47': { prowincja: '', klan: 'Żurawia', rodzina: 'Doji', status: 'Wielki Klan', surowce: 'Jedwab', wartość: '', inne: '' },
    'path52': { prowincja: 'Dolina Przysięgi', klan: 'Żurawia', rodzina: 'Doji', status: 'Wielki Klan', surowce: '', wartość: '', inne: 'Bunt małego klanu - Klan Lisa' },
    'path56': { prowincja: 'Lśniąca Dolina', klan: 'Żurawia', rodzina: 'Doji', status: 'Wielki Klan', surowce: '', wartość: '', inne: 'Bunt małego klanu - Klan Ważki' },

    //male klany
    'path3': { prowincja: 'Prowincja Mgieł', klan: 'Ćmy', rodzina: 'Kaikoga', status: 'Mały klan', surowce: '', wartość: '1', inne: 'Miejsce kultu Emma-O i Onnotangu.' },
    'path33': { prowincja: 'Ba-Gemerihonno', klan: 'Traszki', rodzina: '', status: 'Mały Klan', surowce: '', wartość: '?', inne: 'Dużo stoczni i portów.</br>trwają tu obecnie walki z Klanem Modliszki.' },
    'path24': { prowincja: 'Złote Leże', klan: 'Borsuka', rodzina: 'Ichiro', status: 'Mały Klan pod protektoratem Klanu Kraba', surowce: 'Zboże, warzywa, owoce', wartość: '3', inne: 'Najżyźniejszy region Rokuganu.' },

    'path57': { prowincja: 'Kūgetsu', klan: 'Zółwia', rodzina: '', status: 'Mały klan pod okupacją Klanu Lwa i Modliszki', surowce: '', wartość: '', inne: 'Bunt małego klanu' },
    'path58': { prowincja: 'Shinpū', klan: 'Skolopendry', rodzina: 'Mukade', status: '', surowce: '', wartość: '', inne: 'Bunt małego klanu' },
    'path65': { prowincja: 'Suigetsu', klan: 'Wróbla', rodzina: '', status: 'Mały klan pod okupacją Klanu Feniksa', surowce: '', wartość: '', inne: 'Bunt małego klanu' },

    //krainy cienia
    'path21': { prowincja: 'Rubież samotnego Kraba', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: 'Tu zaczynają się Krainy cienia.' },
    'path25': { prowincja: 'Przeklęte Wzgórza ', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: 'Tu najczęściej pojawiają się Istoty Cienia.' },
    'path26': { prowincja: 'Wrota Rozpaczy', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: 'Za tym terytorium zaczynają się prawdziwe Krainy Cienia.' },
    'path27': { prowincja: 'Wybrzeże Zdrajców', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: 'Jest tu kilka małych miast, ale żyją tu bardzo dziwni ludzie.' },

    //cesarz
    'path19': { prowincja: 'Bagna Powolnego Cierpienia', klan: 'Pod kontrolą Szoguna', rodzina: 'Hantei', status: 'Rodzina Cesarska', surowce: 'Drewno, magiczne mikstury, torf', wartość: '2', inne: 'Znajdowała się tu tajna twierdza Pająków - Szeptuny.' },
    'path54': { prowincja: 'Prowincja Szmaragdowa', klan: 'Cesarski', rodzina: 'Hantei', status: 'Stolica Cesarstwa', surowce: '', wartość: '3', inne: '' },

    //brak danych
    'path2': { prowincja: '', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: ''},
    'path4': { prowincja: '', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: '' },
    'path8': { prowincja: '', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: '' },
    'path11': { prowincja: '', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: '' },
    'path13': { prowincja: '', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: '' },
    'path18': { prowincja: '', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: '' },
    'path20': { prowincja: '', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: '' },
    'path23': { prowincja: '', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: '' },
    'path31': { prowincja: '', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: '' },
    'path32': { prowincja: 'Fuminshō', klan: 'Małpy', rodzina: '', status: '', surowce: '', wartość: '', inne: '' },
    'path34': { prowincja: 'Ekōrokēshon', klan: 'Nietoperza', rodzina: '', status: '', surowce: '', wartość: '', inne: '' },
    'path63': { prowincja: '', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: '' },
    'path64': { prowincja: '', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: '' },

    //inne
    'path16': { prowincja: 'Zachodnie pustkowia', klan: '', rodzina: '', status: '', surowce: '', wartość: '', inne: 'Dawno temu to s†ąd doszło do ataku sił Krain Cienia.' },
   
    
    // --- LASY (tylko nazwa i opis) ---
    'las1': { nazwa: '', inne: '' },
    'las2': { nazwa: '', inne: '' },
    'las3': { nazwa: '', inne: '' },
    'las4': { nazwa: '', inne: '' },
    'las5': { nazwa: '', inne: '' },
    'las6': { nazwa: '', inne: '' },
    'las7': { nazwa: '', inne: '' },
    'las8': { nazwa: '', inne: '' },
    'las9': { nazwa: '', inne: '' },
    'las10': { nazwa: 'Kumo no mori', inne: 'Puszcza Pająków' },

    // --- RZEKI I JEZIORA (tylko nazwa i opis) ---
    'rzeka1': { nazwa: 'Rzeka Bezkresnego Snu', inne: '' },
    'rzeka2': { nazwa: 'Rzeka Ostatniego Bastionu.', inne: 'Dawniej nosiła nazwę Seigo.' },
    'rzeka3': { nazwa: '', inne: '' },
    'rzeka4': { nazwa: 'Złota Rzeka', inne: '' },
    'rzeka5': { nazwa: '', inne: '' },
    'rzeka6': { nazwa: '', inne: '' },
    'rzeka7': { nazwa: '', inne: '' },
    'rzeka8': { nazwa: '', inne: '' },
    'rzeka9': { nazwa: '', inne: '' },
    'jezioro1': { nazwa: 'Jezioro Zapomnianych Łez', inne: 'Według legend, jego woda ma właściwości lecznicze.' },
    'jezioro2': { nazwa: 'Jezioro Odbitego Słońca', inne: '' },
    'jezioro3': { nazwa: '', inne: '' },
    'jezioro4': { nazwa: '', inne: '' },
    'jezioro5': { nazwa: '', inne: '' },

    // --- ZAMKI I TWIERDZE (tylko nazwa i opis) ---
//jednorozce
    'UN1z': { nazwa: 'Shiro Moto', inne: 'Siedziba rodu Moto' },
    'UN2z': { nazwa: 'Zamek Żelaznego Kopyta', inne: 'Siedziba rodziny Shinjo Aki' },
//inne
    'cesarz': { nazwa: 'Szmaragdowy Pałac', inne: 'Siedziba Cesarza' },
    'Szept1': { nazwa: 'Szeptuny', inne: 'Dawniej tajna twierdza Pająków i siedziba Daigotsu Kano.' },
    'UA3z3': { nazwa: 'Zamek Zagubionych Wędrowców', inne: 'Siedziba Klanu Ćmy' },
    'UA2z': { nazwa: 'Zamek Wschodzącego Świtu', inne: 'Siedziba Klanu Skolopendry' },

//kraby
    'CB3z': { nazwa: '', inne: '' },
    'CB1z': { nazwa: 'Kyuden Hida', inne: 'Siedziba rodu Hida' },
    'CB2z': { nazwa: 'Zamek Wiecznej Warty', inne: '' },
    'Mur': { nazwa: 'Mur', inne: 'Najlepszy, najwspanialszy' },

//feniksy
    'PX1z': { nazwa: 'Kyuden Isawa', inne: 'Siedziba rodu Isawa' },
    'SP3z': { nazwa: 'Zamek Zachodzącego Słońca', inne: 'Dawniej zamek Pająków.' },
    'PX2z': { nazwa: '', inne: '' },
    'PX3z': { nazwa: '', inne: '' },
 //smoki
    'GD1z': { nazwa: 'Zamek Ostatniego Spojrzenia', inne: 'Siedziba rodu Mirumoto.</br>Kilka miesięcy temu zniszczony w ataku Pająków.' },
    'GD2z': { nazwa: '', inne: '' },
    'GD3z': { nazwa: '', inne: '' },
 //lwy
    'LN1z': { nazwa: 'Kyuden Ikoma', inne: 'Siedziba rodu Ikoma' },
    'LN2z': { nazwa: 'Zamek Lojalności', inne: 'Siedziba rodu Akodo.</br>Kilka miesięcy temu zniszczony w ataku Pająków.' },
    'LN3z': { nazwa: '', inne: '' },
    'SP1z': { nazwa: 'Zamek Czarnego Lwa', inne: 'Dawniej stolica Pająków - Zamek Czarnego Jedwabiu' },

//pajaki
     'SP2z': { nazwa: 'Zamek Kościstych Dłoni', inne: 'Ostatni region pod kontrolą Klanu Pająka' },

//modliszki
    'MN1z': { nazwa: 'Kyuden Yoritomo', inne: 'Siedziba rodu Yoritomo' },
    'MN2z': { nazwa: '', inne: '' },
    'MN3z': { nazwa: '', inne: '' },

//żurawie
    'CR1z': { nazwa: 'Kyuden Doji', inne: 'Siedziba rodu Doji' },
    'CR2z': { nazwa: '', inne: '' },
    'CR3z': { nazwa: '', inne: '' },

//skorpiony
    'SC1z': { nazwa: 'Kyuden Bayushi', inne: 'Siedziba rodu Bayushi' },
    'SC2z': { nazwa: '', inne: 'Siedziba rodu Shosuro' },
    'SC3z': { nazwa: '', inne: '' }
};


    const allPaths = document.querySelectorAll('#interactive-map-svg path');
    const tooltip = document.getElementById('tooltip');

       // === FUNKCJA DO GENEROWANIA TREŚCI DYMKA ===
    function generateTooltipContent(data) {
        let content = '';

        const specialRoleKeys = ['daimyo', 'cesarz', 'szogun']; 
        
        const roleKey = specialRoleKeys.find(key => key in data);

        if (roleKey) {
            if (data.klan) content += `<strong>Klan:</strong> ${data.klan}<br>`;
            
            const label = roleKey.charAt(0).toUpperCase() + roleKey.slice(1);
            
            const value = data[roleKey];

            if (value) {
                content += `<strong>${label}:</strong> ${value}<br>`;
            }

            if (data.inne) content += `<strong>Inne:</strong> ${data.inne}`;
        }
        else if (data.prowincja) {
            content += `<strong>Prowincja:</strong> ${data.prowincja}<br>`;
            if (data.klan) content += `<strong>Klan:</strong> ${data.klan}<br>`;
            if (data.rodzina) content += `<strong>Rodzina:</strong> ${data.rodzina}<br>`;
            if (data.status) content += `<strong>Status:</strong> ${data.status}<br>`;
            if (data.surowce) content += `<strong>Surowce:</strong> ${data.surowce}<br>`;
            if (data.wartość) content += `<strong>Wartość:</strong> ${data.wartość}<br>`;
            if (data.inne) content += `<strong>Inne:</strong> ${data.inne}`;
        }
        else if (data.nazwa) {
            content += `<strong>Nazwa:</strong> ${data.nazwa}<br>`;
            if (data.inne) content += `<strong>Inne:</strong> ${data.inne}`;
        }
        // Domyślny fallback 
        else {
            return 'Brak danych dla tego regionu.';
        }

        return content;
    }

    allPaths.forEach(path => {
        const pathId = path.id;
        
        path.addEventListener('mouseover', () => {
            const data = regionData[pathId] || { nazwa: `Region (${pathId})`, inne: 'Brak szczegółowych danych.' };
            tooltip.innerHTML = generateTooltipContent(data);
            tooltip.style.display = 'block';
        });

        path.addEventListener('mouseout', () => {
            tooltip.style.display = 'none';
        });
        
        //RUCH DYMKÓW
        path.addEventListener('mousemove', (event) => {
            const offsetX = 20; // Odstęp od kursora w poziomie
            const offsetY = 25; // Odstęp od kursora w pionie

            const tooltipWidth = tooltip.offsetWidth;
            const tooltipHeight = tooltip.offsetHeight;

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            let leftPosition;

            if (event.clientX > windowWidth / 2) {
                leftPosition = event.pageX - tooltipWidth - offsetX;
            } else {
                leftPosition = event.pageX + offsetX;
            }

            let topPosition;

            if (event.clientY > windowHeight / 2) {
                topPosition = event.pageY - tooltipHeight - offsetY;
            } else {
                topPosition = event.pageY + offsetY;
            }

            tooltip.style.left = `${leftPosition}px`;
            tooltip.style.top = `${topPosition}px`;
        });
//end of RUCH DYMKÓW

        const highlightTargets = (targets, style, add = true) => {
            targets.forEach(id => {
                const element = document.getElementById(id);
                if (element) {
                    if (add) {
                        element.classList.add(style);
                    } else {
                        element.classList.remove(style);
                    }
                }
            });
        };

        if (pathId === 'MonC1' || pathId === 'MonC2') {
            const targetsToHighlight = ['MonC1', 'MonC2', 'path19', 'path54'];
            const styleToApply = 'highlight-light-green';

            path.addEventListener('mouseover', () => {
                highlightTargets(targetsToHighlight, styleToApply, true);
            });
            path.addEventListener('mouseout', () => {
                highlightTargets(targetsToHighlight, styleToApply, false);
            });
        }//podswietlanie

if (pathId === 'Lew' || pathId === 'LEW') { 
    const targetsToHighlight = ['Lew', 'LEW', 'path49', 'path50', 'path51', 'path55', 'path15', 'path57']; 
    const styleToApply = 'highlight-brown'; 

    path.addEventListener('mouseover', () => {
        highlightTargets(targetsToHighlight, styleToApply, true);
    });
    path.addEventListener('mouseout', () => {
        highlightTargets(targetsToHighlight, styleToApply, false);
    });
}

        // --- PRZYKŁAD DLA KLANU Jednorozca ---
if (pathId === 'Jednorozec') {
    const targetsToHighlight = ['Jednorozec', 'path5', 'path6', 'path7', 'path8', 'path10', 'path12']; 
    const styleToApply = 'highlight-purple'; 

    path.addEventListener('mouseover', () => {
        highlightTargets(targetsToHighlight, styleToApply, true);
    });
    path.addEventListener('mouseout', () => {
        highlightTargets(targetsToHighlight, styleToApply, false);
    });
}

        // --- PRZYKŁAD DLA KLANU Smoka ---
if (pathId === 'Smok') {
    const targetsToHighlight = ['Smok', 'path59', 'path60', 'path61', 'path62', 'path53']; 
    const styleToApply = 'highlight-green'; 

    path.addEventListener('mouseover', () => {
        highlightTargets(targetsToHighlight, styleToApply, true);
    });
    path.addEventListener('mouseout', () => {
        highlightTargets(targetsToHighlight, styleToApply, false);
    });
}

        // --- PRZYKŁAD DLA KLANU Feniksa ---
if (pathId === 'Feniks' || pathId === 'Feniks22') {
    const targetsToHighlight = ['Feniks', 'Feniks22', 'path69', 'path70', 'path66', 'path68', 'path65', 'path67', 'path14', 'path9']; 
    const styleToApply = 'highlight-orange'; 

    path.addEventListener('mouseover', () => {
        highlightTargets(targetsToHighlight, styleToApply, true);
    });
    path.addEventListener('mouseout', () => {
        highlightTargets(targetsToHighlight, styleToApply, false);
    });
}


        // --- PRZYKŁAD DLA KLANU Pajaka ---
if (pathId === 'Pajak') {
    const targetsToHighlight = ['Pajak', 'path17']; 
    const styleToApply = 'highlight-gray'; 

    path.addEventListener('mouseover', () => {
        highlightTargets(targetsToHighlight, styleToApply, true);
    });
    path.addEventListener('mouseout', () => {
        highlightTargets(targetsToHighlight, styleToApply, false);
    });
}

        // --- PRZYKŁAD DLA KLANU Kraba i Borsuka ---
if (pathId === 'Krab' || pathId === 'Borsuk') {
    const targetsToHighlight = ['Krab', 'Borsuk', 'path22', 'path28', 'path29', 'path30', 'path24']; 
    const styleToApply = 'highlight-navy'; 

    path.addEventListener('mouseover', () => {
        highlightTargets(targetsToHighlight, styleToApply, true);
    });
    path.addEventListener('mouseout', () => {
        highlightTargets(targetsToHighlight, styleToApply, false);
    });
}

        // --- PRZYKŁAD DLA KLANU Skorpiona ---
if (pathId === 'Skorpion') {
    const targetsToHighlight = ['path44', 'Skorpion', 'path45', 'path43', 'path42', 'path35']; 
    const styleToApply = 'highlight-red'; 

    path.addEventListener('mouseover', () => {
        highlightTargets(targetsToHighlight, styleToApply, true);
    });
    path.addEventListener('mouseout', () => {
        highlightTargets(targetsToHighlight, styleToApply, false);
    });
}

        // --- PRZYKŁAD DLA KLANU Zurawia ---
if (pathId === 'Zuraw') {
    const targetsToHighlight = ['Zuraw', 'path56', 'path52', 'path46', 'path47', 'path40', 'path41']; 
    const styleToApply = 'highlight-blue'; 

    path.addEventListener('mouseover', () => {
        highlightTargets(targetsToHighlight, styleToApply, true);
    });
    path.addEventListener('mouseout', () => {
        highlightTargets(targetsToHighlight, styleToApply, false);
    });
}

        // --- PRZYKŁAD DLA KLANU Modliszki ---
if (pathId === 'Modliszka') {
    const targetsToHighlight = ['Modliszka', 'path48', 'path39', 'path38', 'path37', 'path36', 'path57']; 
    const styleToApply = 'highlight-teal'; 

    path.addEventListener('mouseover', () => {
        highlightTargets(targetsToHighlight, styleToApply, true);
    });
    path.addEventListener('mouseout', () => {
        highlightTargets(targetsToHighlight, styleToApply, false);
    });
}
    });

});
