// Imports
const monsters = require('./monsters.js');
const StoryPart = require('./storyPart.js');
const player = require('./player.js');
const enemy = require('./enemy.js');
const prompt = require('prompt-sync')();
const fight = require('./fight.js');
const finalFight = require('./finalFight.js');
const items = require("./items");

// Const & Variables
let illusionRoom;
const baseExp = 35;
const baseAttribute = 1;
const storyParts = {
    // ACT 1 - BEGINNING
    beg01 : new StoryPart(
        `Probudíš se s jemným paprskem slunce dopadajícím na tvář. 
Ležíš ve své posteli na statku, místnost je skromná, ale útulná. 
Dřevěné trámy voní po čerstvém dřevu a v dálce slyšíš tlumené bučení krav z chléva.
Protáhneš se a vstaneš. Bosými chodidly se dotkneš dřevěné podlahy.
Oblékneš se a zamíříš k malé misce s vodou vedle zrcadla na stěně.
Namočíš si ruce do studené vody a opláchneš si obličej, což tě dokonale probudí.
Když vzhlédneš, uvidíš svůj odraz.`,
        () => {
            let name = prompt(`Jak se jmenuješ: `);
            while (name.length < 1) {
                name = prompt(`Zadej své jméno: `);
            }
            player.name = name;
            illusionRoom = 0;
        },
        null,
        [`Pokračovat`],
        [`beg02`]
    ),
    beg02: new StoryPart(
        `Na chvíli se zadíváš na svou tvář v zrcadle, jako bys zkoumal něco hlubšího. 
Něco je jinak – zvláštní pocit, který tě dnes ráno pronásleduje. 
Nemůžeš si ho vysvětlit, ale ve vzduchu je něco zvláštního.
Něco, co naruší tvůj běžný život, i když to zatím nevíš.
Po chvilce se vytrhneš ze zamyšlení a přemýšlíš co udělat dál.`,
        null,
        null,
        [`Jdeš si před snídaní zacvičit.`, `Jdeš si před snídaní počíst báseň.`, `Jdeš si před snídaní zkusit ukrást nějakou dobrotu navíc.`],
        [`beg03`, `beg04`, `beg05`]
    ),
    beg03 : new StoryPart(
        `Rozhodneš se, že si před snídaní trochu zacvičíš, jak máš ve zvyku. 
Přejdeš přes dvůr na malé travnaté prostranství vedle stodoly, kde máš dostatek prostoru.
Začneš jednoduchým protažením. 
Následně začneš nacvičovat základní výpady a obrany, které tě naučil starý voják, jenž jednou navštívil vesnici.
Jak cvičíš, přepadne tě znovu ten zvláštní pocit z rána. Jako by tě někdo sledoval.
Zastavíš se a rozhlédneš se po okolí.
Dvůr je prázdný, kromě obvyklých zvuků statku nic neobvyklého.
Přesto cítíš, že něco není v pořádku a raději se vrátíš dovnitř na snídani.`,
        () => {
            player.gainStrength(baseAttribute);
            player.gainXP(baseExp);
        },
        null,
        [`Pokračovat`],
        [`beg06`]
    ),
    beg04: new StoryPart(
        `Rozhodneš se na chvíli usednout s knihou, jak to občas děláváš, když je ráno klidné.
Tvůj pohled spočine na staré knize básní, kterou ti kdysi daroval kočovný bard.
Otevřeš knihu na jedné ze svých oblíbených stránek a začneš číst:
       "V srdci temnoty, kde světlo dlí,
       odvaha procitá, kde strach již spí.
       Kdo v sobě sílu objeví,
       ten cestu z noci naleví."
Slova ti zní v hlavě zvláštním způsobem. 
Po chvíli zavřeš knihu a necháváš myšlenky chvíli doznívat.
Najednou se ti vrátí ten zvláštní pocit, který jsi měl hned po probuzení.
Nyní je však silnější a máš pocit jako by tě někdo sledoval. 
S trhnutím se podíváš ven z okna, za kterým však jen bučí krávy.
Chvíli je pozoruješ, než se zvedneš od stolu a zamíříš do kuchyně na snídani.`,
        () => {
            player.gainIntelligence(baseAttribute);
            player.gainXP(baseExp);
        },
        null,
        [`Pokračovat`],
        [`beg06`]
    ),
    beg05: new StoryPart(
        `Rozhodneš se, že ještě před snídaní půjdeš ukořistit něco sladkého ze spíže.
Tiše se vykradeš ze své ložnice a opatrně našlapuješ po podlaze, aby tě nikdo neslyšel.
Když dorazíš ke dveřím spíže, na chvíli se zastavíš a posloucháš.
Z kuchyně nedaleko slyšíš matčino pohvizdování.
Otevřeš dveře spíže, přičemž si dáváš pozor, aby nezavrzaly. Místnost je plná polic s různými zásobami.
Na horní polici uvidíš svou oblíbenou pochotku.
Pomalu se k ním začneš natahovat, když v tom tě přepadne ten zvláštní pocit, který jsi měl již ráno.
Přijde ti, jako by tě někdo pozoroval. 
Okamžitě ruku stáhneš zpátky, rozhlédneš se kolem a zkontroluješ situaci.
Jsi však stále sám a matka si stále pohvizduje v kuchyni.
Rychle si vezmeš pochoutku, schováš si ji do kapsy a jdeš za matkou na snídani.`,
        () => {
          player.gainStealth(baseAttribute);
          player.gainXP(baseExp);
          player.inventory.addItem(items.chocolateBar);
          console.log(`Do inventáře byl přidán předmět Čokoládová tyčinka.`);
        },
        null,
        [`Pokračovat`],
        [`beg06`]
    ),
    beg06: new StoryPart(
        `Vstoupíš do kuchyně a okamžitě tě přivítá příjemná vůně čerstvě upečeného chleba.
Matka, oblečená v zástěře, stojí u pece a něco míchá ve velkém hrnci.
„Už jsi vzhůru, ospalče?“ zavtipkuje a přelije polévku do mísy.
Posadíš se ke stolu, matka ti přistrčí mísu a nalije čaj do hrníčku.
„Dneska tě čeká dlouhý den, tak jez, ať máš dost síly."
Zatímco jíš, všimneš si, že matka vypadá ustaraně.
„Děje se něco?“ zeptáš se mezi sousty.
Matka tě chvíli pozoruje, pak si povzdechne.
"Poslední dobou se mi zdá, že v lese kolem statku je něco zvláštního.
 Něco, co tam dřív nebylo. Dávej nasebe pozor ,až půjdeš ven.“
`,
        null,
        null,
        [`Uklidnit matku a zeptat se, co je potřeba udělat.`],
        [`beg07`]
    ),
    beg07: new StoryPart(
        `Podíváš se na matku a usměješ se, snažíce se zmírnit její obavy.
Matka si tě chvíli měří, pak přikývne a její výraz se trochu uvolní.
"Asi máš nejspíš pravdu, zbytečně si dělám starosti."
Po chvíli dodá: "Zašel bys dneska ke kováři pro hřebíky, ať můžeme opravit ten děravý plot u kravína?
Přikývneš. „Dobře, hned po snídani vyrazím do vesnice.
Po chvíli dojíš snídani, vezmeš si plátěnou tašku a připravíš se vyrazit.`,
        null,
        null,
        [`Vydáš se hlavní cestou.`, `Vydáš se zkratkou kolem potoka.`],
        [`beg08`, `beg09`]
    ),
    beg08: new StoryPart(
        `Vyrazíš po hlavní cestě směrem k vesnici.
Ptáci zpívají v korunách stromů podél cesty a na loukách vidíš pasoucí se srnky.
Chůze je klidná a cesta ti ubíhá rychle.
Po chvíli zaslechneš v dálce vrzání kol a dusot koňských kopyt.
Zpoza mírného kopce se objeví povoz tažený dvěma statnými koňmi.
Na kozlíku sedí muž v ošuntělém kabátě a se širokým kloboukem na hlavě.`,
        null,
        null,
        [`Půjdeš dál pěšky.`, `Domluvíš si odvoz.`,`Vplížíš se na vůz.`],
        [`beg10`, `beg11`, `beg12`]

    ),
    beg09: new StoryPart(
        `Rozhodneš se nejít po hlavní cestě, ale vzít to zkratkou kolem potoka.
Cesta je klikatá a užívaná jen zřídka – pod nohama ti praská suché listí a větve.
Potok vedle tebe tiše zurčí a jeho čistá voda se třpytí v ranním slunci.
Chvíli je ticho, pak zaslechneš jemné zašustění v křoví poblíž cesty.
Než stihneš cokoli udělat, zpoza stromu před tebou vyjde muž.
Má zarostlou tvář a v ruce drží krátký meč.
„Tak co tu máme?“ zavrčí posměšně. 
„Další hlupák, co si myslí, že zkratky jsou bezpečné.“
Lapka se k tobě pomalu přibližuje, jeho zbraň se nebezpečně leskne v ranním světle.`,
        null,
        null,
        [`Připravíš se k boji.`, `Zkusíš lapku přemluvit.`, `Odvedeš lakovu pozornost a schováš se.`],
        [`beg19`, `beg20`, `beg21`]
    ),
    beg10: new StoryPart(
        `Když tě muž zahlédne, zpomalí a zastaví koně.
„Zdravím, mládenče,“ zavolá na tebe a přátelsky se usměje."
Chvíli spolu hovoříte o cestách a o tom jak jde obchod.
Nakonec se kupec znovu rozjede a ty se vydáš dále po svých.
Přeci jen je dobré posilovat kondičku řekneš si a zrychlíš tempo.`,
        () => {
            player.gainStrength(baseAttribute);
            player.gainXP(baseExp);
        },
        null,
        [`Pokračovat`],
        [`beg13`]
    ),
    beg11: new StoryPart(
        `Rozhodneš se využít příležitost a po krátkém uvítání, požádáš kupce, zda by tě vzal na vůz.
Kupcův úsměv se roztáhne a zpod klobouku si tě zamyšleně prohlédne.
„Hm, mládenče, proč ne?“ řekne nakonec.
S úsměvem přikývneě, rychle přistoupíš k vozu a posadíš se vedle kupce.
Kupcovy koně se dají do pohybu a cesta pokračuje.
„Jak se jmenuješ, chlapče?“ zeptá se tě kupec, zatímco upravuje opratě.
„Říkají mi ${player.name},“ odpovíš. „A vás? Kam máte namířeno?“
„Říkají mi Tomis,“ odpoví s mírným úsměvem. „Rozvážím zboží po okolních vesnicích."
Dál si povídáte o obchodu a lidech z okolních vesnic a cesta vám krásě ubýha.`,
        () => {
            player.gainIntelligence(baseAttribute);
            player.gainXP(baseExp);
        },
        null,
        [`Pokračovat`],
        [`beg14`]
    ),
    beg12: new StoryPart(
        `Než si tě muž stačí všimnout, rychle se schováš za kmen silného stromu.
Ke tvému překvapení, se vůz kousek od místa, kde se schováváš zastaví a muž se ohne pro láhev s vodou,aby se napil.
Využiješ, jeho chvilkové nepozornosti a jako myš se zezadu přiblížíš k votu a vyskočís na korbu.
Za chvíli se dá vůz zase do pohybu a muž si začne pobrukovat nějakou falešnou melodii.
Během cesty však najednou ucitíš prutkou bolest na levé ruce.
Rychle se podíváš co se stalo a uvidíš dýku, která sebou hází jak vůz drkotá po cestě.
Rána naštěstí není nijak hluboká a tak ji necháš být a dýku si schováš do kapes.
"Ta se může hodit." zašeptáš tiše.`,
        () => {
          player.gainStealth(baseAttribute);
          player.gainXP(baseExp);
          player.inventory.addItem(items.dagger);
          console.log(`Získal jsi předmět Dýka.`)
        },
        null,
        [`Pokračovat`],
        [`beg15`]
    ),
    beg13: new StoryPart(
        `Jak kráčíš po cestě směrem k vesnici, slunce začíná stoupat výš a příjemně  zahřívá tvá záda.
Všechno působí poklidně, jen šumění listů ve větvích a občasné cvrlikání ptáků přerušují ticho.
Ale s každým krokem tě stále více přepadá ten zvláštní pocit, který tě už ráno neopustil.
Cítíš to. Jako by tě někdo sledoval, nebo snad volal.
Srdce ti začne bít rychleji a tělem ti projede lehké zamrazení.
Pak si všimneš něčeho mezi stromy.
Chatrč, napůl zarostlá mechem a napůl rozpadlá.
Kouř z komína nevychází a celé místo působí nepřirozeně – až zlověstně.
Chatrč stojí v tichu, téměř jako by čekala. 
Zhluboka se nadechneš a obrátíš se k lesu.`,
        null,
        null,
        [`Zamíříš směrem k chatrči.`],
        [`beg16`]
    ),
    beg14: new StoryPart(
        `POkračuješ v cestě na voze vedle kupce a sleduješ cestu před vámi, občas prohodíte pár slov.
Koňská kopyta pravidelně klapou o prašnou cestu a kola vozu občas zavrzají.
„Je to krásný den na cestách, co říkáš?“ prohodí kupec s úsměvem, aniž by přerušil pohled upřený na cestu.
„To ano,“ odpovíš, ale myšlenkami jsi trochu jinde.
Zvláštní pocit, který tě provázel od rána, se opět ozývá.
Cítíš to. Jako by tě někdo sledoval, nebo snad volal.
Pak si všimneš něčeho mezi stromy.
Chatrč, napůl zarostlá mechem a napůl rozpadlá.
Kouř z komína nevychází a celé místo působí nepřirozeně – až zlověstně.
Chatrč stojí v tichu, téměř jako by čekala.
„Znáte tu chatrč?“ zeptáš se kupce a ukážeš směrem k ní.
Kupec se podívá tam, kam ukazuješ, a jeho úsměv trochu pohasne.
"Zvláštní." zamručí po chvíli. "Jezdím tudy roky, ale že by tu stála si nepamatuji."
Srdce ti začne bít rychleji a tělem ti projede lehké zamrazení.
Spěšně kupci poděkuješ za svezení,seskočíš s vozu dolů a obrátíš se k lesu.
`,
        null,
        null,
        [`Zamíříš směrem k chatrči.`],
        [`beg16`]
    ),
    beg15: new StoryPart(
        `Jak se vůz houpavě pohybuje po cestě, začne tě znovu přepadat ten zvláštní pocit.
Něco tě sleduje, nebo snad volá.
Srdce ti začne bít rychleji a zvedneš hlavu, abys opatrně vykoukl zpoza beden.
Tvůj pohled padne na něco neobvyklého, kousek stranou od cesty mezi stromy.
Chatrč, napůl zarostlá mechem a napůl rozpadlá.
Kouř z komína nevychází a celé místo působí nepřirozeně – až zlověstně.
Něco na té chatrči tě přitahuje, přestože ti zároveň mrazí v zádech.
Pomalu a opatrně slezeš z vozu na prašnou cestu tak aby tě muž na voze nezahlédl.
Kupec i jeho povoz pokračují dál, zatímco ty se obrátíš k lesu.`,
        null,
        null,
        [`Zamíříš směrem k chatrči.`],
        [`beg16`]
    ),
    beg16: new StoryPart(
        `Dorazíš k chatrči a na okamžik se zastavíš.
Dřevěná stavba je stará a zchátralá, stěny má porostlé mechem a dřevo popraskané.
Okna malá, zakrytá špinavými látkami, které sotva propouštějí světlo.
Do střechy se zarývají větve stromů. 
Na zemi si všimneš otisků bot v měkké hlíně – nejsou příliš staré.
Cítíš, jak tě polévá podivná směsice zvědavosti a neklidu.
Natáhneš ruku a položíš ji na kliku.
Ticho kolem tě obklopuje, jako by celý les zadržel dech.
Něco uvnitř tě táhne, ale zároveň ti v hlavě bliká varovné světlo.
Co tě za těmi dveřmi čeká?`,
        null,
        null,
        [`Otevřít dveře a vstoupit.`, `Otočit se a odejít.`],
        [`beg17`, `beg18`]
    ),
    beg17: new StoryPart(
        ` S lehkým zavrzáním dveře pomalu otevřeš a vstoupíš dovnitř.
Místnost je malá a téměř prázdná, vzduch je zatuchlý a vlhký, stěny pokryté tenkou vrstvou plísně.
Po podlaze jsou rozházené zbytky dřevěných prken a starého nábytku, který dávno ztratil svůj účel.
Tvé oči však okamžitě přitáhne něco uprostřed místnosti.
Malá soška ani né 3 palce vysoká, vyřezaná z tmavého kamene, stojící uprostřed místnosti.
Je to soška muže, držícího dlouhou hůl, jejíž konec je ozdoben drobnými rytinami.
Soška vypadá téměř živě, jako by sledovala každý tvůj pohyb.
Pomalu se k sošce přiblížíš a natáhneš k ní ruku.
Srdce se ti divoce rozbuší a to zádech ti přejede mráz.`,
        null,
        null,
        [`Vzít sošku.`],
        [`beg25`]
    ),
    beg18: new StoryPart(
        `Stojíš před dveřmi chatrče s rukou na klice.
Ticho lesa tě obklopuje, ale něco v něm působí, jako by tě varovalo.
Na okamžik zavřeš oči, pak stáhneš ruku.
Otočíš se a uděláš první krok zpět na cestu.
Jakmile se vzdálíš od chatrče, zvláštní pocit, který tě celý den pronásledoval, náhle zmizí.
Jako by tě někdo pustil ze svého sevření.
Uvolnění tě přiměje zrychlit krok – vesnice je blízko, a práce čeká.
Když dorazíš do vesnice, vše působí jako obvykle.
Lidé se pohybují po tržišti, hlasy zní v příjemném ruchu a děti si hrají na návsi.
Ale pak to přijde.
Zvuk dusotu kopyt a válečných pokřiků přeruší poklidnou atmosféru.
Vesnici přepadnou nájezdníci, ozbrojení muži na koních s ohnivými pochodněmi a ostrými čepelemi.
Bez váhání se chopíš jednoho ze zemědělských nástrojů, který najdeš poblíž, a postavíš se na obranu.
Tvůj domácí výcvik s dřevěným mečem ti dodává odvahu, ale proti zkušeným bojovníkům jsi jen další překážka.
Přesto bojuješ ze všech sil – bráníš staršího muže, který se snaží chránit svou rodinu před nájezdníkem.`,
        () => {
            console.log(`Boj s nájezdníkem.`)
            enemy.newMonster(monsters.marauder);
            fight(player, enemy);
            player.hp += 5;
        },
        `marauder`,
        [`Pokračovat`],
        [`epilog1`]
    ),
    beg19: new StoryPart(
        `Rozhodneš se, že neustoupíš.
Skloníš pohled na zem a spatříš poblíž silnou větev.
Je dostatečně dlouhá a pevná, aby posloužila jako improvizovaná zbraň.
S rychlým pohybem ji popadneš a postavíš se do bojového postoje.
Lapka se zastaví a zasměje se.
„Tak ty chceš bojovat?“ zavrčí posměšně.
„To se mi líbí!“`,
        () => {
            console.log(`BOJ S LAPKOU`);
            enemy.newMonster(monsters.bandit);
            fight(player,enemy);
            if (player.isAlive()) {
                player.inventory.addItem(items.rustySword);
                console.log(`Do inventáře byl přidán Rezavý meč.`);
                player.gainStrength(baseAttribute);
                player.gainXP(baseExp);
            }
        },
        `bandit`,
        [`Pokračovat`],
        [`beg22`]
    ),
    beg20: new StoryPart(
        `Zhluboka se nadechneš a rozhodneš se zkusit lapku přelstít.
„Podívej,“ začneš pomalu, klidným hlasem, „nejsem žádný boháč, ale jen obyčejný sedlák.
Lapka se zastaví, zúží oči a nasadí posměšný úšklebek. "Něco u sebe mít musíš, jdeš přece do vesnice!"
„Jdu za děvčetem,“ odpovíš a pokusíš se vykouzlit nervózní, téměř provinilý úsměv.
„Slíbila mi, že se se mnou sejde u potoka,nechce aby nás spolu viděl její pantáta otec. Je to strašný hruboun.“
Lapka si tě chvíli měří, jeho výraz se mění ze zlostného na pobavený.
„Tak ty ses rozhodl riskovat krk kvůli holce?“ zasměje se a zavrtí hlavou.
„Musí bejt sakra pěkná, když tě sem přitáhla.“
„Je to tak,“ přikývneš a pokrčíš rameny.
„A když mě tu zdržíš, přijdu pozdě. A bude si myslet, že jsem se na ní vykašlal."
Lapka se uchechtne a skloní svůj meč.
„Utíkej za ní, romeo."`,
        () => {
            player.gainIntelligence(baseAttribute);
            player.gainXP(baseExp);
        },
        null,
        [`Pokračovat`],
        [`beg23`]
    ),
    beg21: new StoryPart(
        `Začneš přemýšlet, jak bys mohl lapku rozptýlit, když v tom tě to napadne.
    Upřeně se zahledíš lapkovi za záda a zvedneš ruku aby jsi tím směrem ukázal.
    Tím nejvíc vyděšeným tonem, jaký dokážeš uhrát ze sebe vykoktáš: "To, to, to, to je me-me-medvěd!".
    Vyšlo to, lapka se polekaně otočí a zírá do prázdna.
    Ty na nic nečekáš a rychle pelášíš do lesa, kde se ukryješ do houští.`,
        () => {
            player.gainStealth(baseAttribute);
            player.gainXP(baseExp);
        },
        null,
        [`Pokračovat`],
        [`beg24`]
    ),
    beg22: new StoryPart(
        `S lapkou poraženým na zemi a jeho mečem v ruce pokračuješ cestou podél potoka.
Cesta je tichá, potok tiše zurčí vedle tebe a ptáci, kteří předtím ztichli, pomalu obnovují svůj zpěv.
Ale ten zvláštní pocit, který tě provázel již ráno se vrátil.
Jako by něco ve vzduchu nebylo v pořádku.
Cítíš to. Jako by tě někdo sledoval, nebo snad volal.
Pak si všimneš něčeho mezi stromy.
Chatrč, napůl zarostlá mechem a napůl rozpadlá.
Kouř z komína nevychází a celé místo působí nepřirozeně – až zlověstně.
Chatrč stojí v tichu, téměř jako by čekala.
Chvíli nad tím přemýšlíš, ale nakonec vyrazíš směrem k ní.`,
        null,
        null,
        [`Vydat se k chatrči.`],
        [`beg16`]
    ),
    beg23: new StoryPart(
        `Poté, co se ti podaří přemluvit lapku, aby tě nechal jít, pokračuješ po cestě podél potoka.
Cesta je tichá, potok tiše zurčí vedle tebe a ptáci, kteří předtím ztichli, pomalu obnovují svůj zpěv.
Ale ten zvláštní pocit, který tě provázel již ráno se vrátil.
Jako by něco ve vzduchu nebylo v pořádku.
Cítíš to. Jako by tě někdo sledoval, nebo snad volal.
Pak si všimneš něčeho mezi stromy.
Chatrč, napůl zarostlá mechem a napůl rozpadlá.
Kouř z komína nevychází a celé místo působí nepřirozeně – až zlověstně.
Chatrč stojí v tichu, téměř jako by čekala.
Chvíli nad tím přemýšlíš, ale nakonec vyrazíš směrem k ní.`,
        null,
        null,
        [`Vydat se k chatrči.`],
        [`beg16`]
    ),
    beg24: new StoryPart(
        `Schováváš se v houští, dýcháš zhluboka a snažíš se zůstat co nejvíce nehybný.
Lapka stále bloudí poblíž, slyšíš jeho kroky na prašné cestě a občasné zaklení.
Zůstáváš schovaný, téměř zadržuješ dech, zatímco se kroky pomalu vzdalují.
Po chvíli zaslechneš, jak jeho hlas mizí v dálce, a vše utichne.
Čekáš ještě pár minu a pak se pomalu zvedneš z houští.
Otřeš si prach z oblečení, pohledem zkontroluješ okolí a znovu se vydáš na cestu.
Cesta je tichá, potok tiše zurčí vedle tebe a ptáci, kteří předtím ztichli, pomalu obnovují svůj zpěv.
Ale ten zvláštní pocit, který tě provázel již ráno se vrátil.
Jako by něco ve vzduchu nebylo v pořádku.
Cítíš to. Jako by tě někdo sledoval, nebo snad volal.
Pak si všimneš něčeho mezi stromy.
Chatrč, napůl zarostlá mechem a napůl rozpadlá.
Kouř z komína nevychází a celé místo působí nepřirozeně – až zlověstně.
Chatrč stojí v tichu, téměř jako by čekala.
Chvíli nad tím přemýšlíš, ale nakonec vyrazíš směrem k ní.`,
        null,
        null,
        [`Vydat se k chatrči.`],
        [`beg16`]
    ),
    beg25: new StoryPart(
        `Když ji uchopíš, její povrch je chladný, téměř ledový.
Tělem ti projede šílená bolest – jako by tisíce jehel pronikaly každým svalem, každým nervem.
Skácíš se na podlahu, tvé tělo se chvěje, a svět kolem tebe se začíná rozmazávat.
Ležíš na podlaze, neschopen pohybu, dýchání je namáhavé a tvůj zrak se postupně ztrácí.
Nad tebou se objeví postava – vysoká, zahalená v temném plášti.
Její přítomnost je znepokojivá, ale zároveň v sobě nese jakýsi zvláštní klid.
„Stezka…“ zazní hluboký, ozvěnou nesený hlas. „Tvá síla… před tebou… zkouška.“
Její slova ti rezonují v hlavě, ale než je stihneš plně pochopit, temnota tě pohltí.`,
        () => {
            player.gainXP(100); // LEVEL UP
            player.hp = player.maxHp;
        },
        null,
        [`Probudit se.`],
        [`beg26`]
    ),
    beg26: new StoryPart(
        `Pomalu otevíráš oči, světlo z okna tě na okamžik oslepí.
Cítíš, že jsi zpět ve své posteli na statku.
Vedle postele sedí tvá matka na staré dřevěné stoličce.
Její tvář je plná starostí, ale jakmile vidí, že jsi vzhůru, v očích se jí objeví úleva.
„Co… co se stalo?“ dostaneš ze sebe.
Matka si povzdechne: "Našla jsem tě včera večer ležet před statkem, celý jsi hořel a mumlal něco nesrozumitelného."
Zamrkáš, snažíš se vybavit si, co se stalo, když v tom v kapse nahmatáš sošku.
Vrátí se ti záblesky vzpomínek, cesta, chatrč, soška - a ten muž zahalený v plášti.
Podíváš se na matku a aby jsi ji uklidnil řekneš: "Nejspíš jsem dostal úpal z toho horka. Už je mi ale mnohem lépe.
Matka tě chvíli pozoruje, pak přikývne. "Zůstaň v posteli, donesu ti vývar a trochu čaje.
Jakmile zůstaneš sám, snažíš se seskládat útržky vzpomínek dohromady.
Nic z toho ti ale nedává smysl, teď se však citíš lépe než kdy předtím.
Silnější, než kdy předtím.`,
        null,
        null,
        [`Zůstat ležet.`, `Jít za matkou do kuchyně.`],
        [`beg27`, `beg28`]
    ),
    beg27: new StoryPart(
        `Zůstaneš ležet v posteli, v ruce držíš sošku a přemýšlíš o tom o se stalo.
Náhle tě z přemýšlení vytrhne matčino vyjeknutí, následované řinkotem rozbitého nádobí.
V mžiku jsi na nohou a utíkáš za matkou do kuchyně.
„Mami! Co se děje?“ zavoláš a vrazíš do dveří.
Matka stojí u stolu, tvář bledou strachy, a třesoucí se rukou ukazuje směrem k oknu.
Otočíš se k oknu a nahlédneš ven.
Na dvoře, jen pár kroků od kravína, vidíš mohutného vlka.
Oči mu září téměř nepřirozeným leskem a tlamou trhá jednu z vašich krav.
„To není obyčejný vlk,“ zašeptá matka,„Něco s ním není v pořádku.“
Pohled na vlka tě zneklidní. Je na něm něco divného.`,
        null,
        null,
        [`Počkat než vlk odejde.`,`Jít vlka zabít.`],
        [`beg29`, `beg30`]
    ),
    beg28: new StoryPart(
        `Vyskočíš z postele a vydáš se za matkou do kuchyně.
Přes otevřené dveře na chodbě však zahlédneš pohyb venku.
Zastavíš se, tvé tělo se napne, a zaměříš pohled na dvůr.
Na dvoře, jen pár kroků od kravína, vidíš mohutného vlka.
Oči mu září téměř nepřirozeným leskem a tlamou trhá jednu z vašich krav.
„To není obyčejný vlk,“ zašeptáš,„Něco s ním není v pořádku.“
Pohled na vlka tě zneklidní.
Vlk se zatím dál soustředí na svou kořist a jeho čelisti trhají maso na kousky.
Musíš jednat rychle.`,
        null,
        null,
        [`Pokusit se zabarikádovat dveře.`, `Jít vlka zabít.`],
        [`beg32`, `beg30`]
    ),
    beg29: new StoryPart(
        `Chvíli vlka s matkou pozorujete a čekáte co se bude dít dál.
Vlk si vás ale za chvíli všimne.
Pomalu k tobě otočí zakrvácený čenich a na chvilku ti příjde jako by se na tebe usmál.
Pak se s hlubokým zavitím rozběhne za vámi k chalupě, rozhodnutý vás roztrhat na kusy.
Rychle se rozběhneš ke vstupním dveřím, ale je už pozdě.
Vlk stojí ve dveřích a s vrčením na tebe cení zuby.
Upřeně si zíráte do očí, než vlk vyrazí směrem k tobě.`,
        () => {
            console.log(`Zápasíš s vlkem`);
            enemy.newMonster(monsters.giantWolf);
            fight(player, enemy);
            if (player.isAlive()) {
                player.gainXP(baseExp);
            }
        },
        `giantWolf`,
        [`Pokračovat`],
        [`beg31`]
    ),
    beg30: new StoryPart(
        `Pohled na rozdrásanou krávu v tobě probudí hněv.
Neváháš ani vteřinu a rychle vyběhneš za vlkem, připravený se s ním utkat na život a na smrt.
Vlk si tě všimne hned jak výjdeš ze dveří.
Pomalu k tobě otočí zakrvácený čenich a na chvilku ti příjde jako by se na tebe usmál.
Upřeně si zíráte do očí, než se s křikem vydáš směrem k němu.`,
        () => {
            console.log(`Zápasíš s vlkem`);
            enemy.newMonster(monsters.giantWolf);
            fight(player, enemy);
            if (player.isAlive()) {
                player.gainXP(baseExp);
            }
        },
        `giantWolf`,
        [`Pokračovat`],
        [`beg31`]
    ),
    beg31: new StoryPart(
        `Cítíš vlčí tlapy na hrudi, dech mu páchne krví.
Zápasíš s jeho silou, ale zdá se, že je příliš mocný a jeho tesáky se ti pomalu přibližují ke krku.
Náhle, v zoufalství, se tvé ruce samy od sebe napnou a z dlaní ti vytryskne jasný záblesk.
Zvíře zavyje bolestí, jeho tělo se zachvěje a svalí se vedle tebe na zem, mrtvé.
Ležíš na zemi, dýcháš ztěžka a hledíš na své dlaně, ze kterých se stále slabě kouří.
Tvé tělo je slabé, celý od krve a otřesený se snažíš postavit na nohy.
Než se však stihneš postavit, uslyšíš kroky. Těžké a tvrdé.
Zpoza rohu chalupy se objeví mohutný muž v těžké zbroji.
„To byl můj vlk,“ zasyčí, hlas plný zloby. „A ty jsi mi ho zabil.“
Než se stihneš pohnout, muž rychle přistoupí a prudce tě udeří palicí do hlavy.
Bolest ti projede lebkou, svět se ti zamotá a ty padneš na kolena.
V dálce slyšíš matčin zoufalý křik. „Nechte ho být! Prosím, nechte mého syna!“
Její hlas se stává vzdálenějším, až tě pohltí temnota.`,
        null,
        null,
        [`Probudit se.`],
        [`dun01`]
    ),
    beg32: new StoryPart(
        `Rychle chytíš lavici, která je uprostřed chodby a táhneš ji směrem ke dveřím.
Vlk si tě ale za chvíli všimne.
Pomalu k tobě otočí zakrvácený čenich a na chvilku ti příjde jako by se na tebe usmál.
Pak se s hlubokým zavitím rozběhne za tebou k chalupě, rozhodnutý tě roztrhat na kusy.
Než stihneš lavici dotáhnou ke dveřím, je už pozdě.
Vlk tam byl první.
Upřeně si zíráte do očí, než vlk vyrazí směrem k tobě.`,
        () => {
            console.log(`Zápasíš s vlkem`);
            enemy.newMonster(monsters.giantWolf);
            fight(player, enemy);
            if (player.isAlive()) {
                player.gainXP(baseExp);
            }
        },
        `giantWolf`,
        [`Pokračovat`],
        [`beg31`]

    ),
    // ACT 2 - DUNGEONS
    dun01: new StoryPart(
        `Probouzíš se v naprosté temnotě a celé tvé tělo se třese zimou.
Jediné, co slyšíš, je tlumené škrábání a tiché dunění.
Pokusíš se pohnout, ale zjišťuješ, že máš nohy pevně připoutané ke zdi.
Provazy se zařezávají do kůže, každý pohyb ti způsobuje bolest.
Vzduch je zatuchlý, vlhký, a cítíš v něm pach rozkladu a plísně.
Škrábání se zdá být stále blíž, hlasitější a znepokojivější.
Pokud se chceš dostat ven, musíš se nejdříve nějak osvobodit.`,
        null,
        null,
        [`Pokusit se pouta přetrhnout.`, `Pokusit se pouta odemknout.`,`Počkat na příležitost k útěku.`],
        [`dun02`,`dun03`,`dun04`]
    ),
    dun02: new StoryPart(
        `Zkoušíš napnout všechny své síly a pouta přetrhnout.`,
        () => {
            let checkPlayerStrength = 3;
            if (player.strength >= checkPlayerStrength) {
                storyParts.dun02.nextParts = [`dun05`];
            } else {
                storyParts.dun02.nextParts = [`dun06`];
            }
        },
        null,
        [`Pokračovat`],
        []
    ),
    dun03: new StoryPart(
        `Zhluboka se nadechneš a snažíš se uklidnit svůj splašený dech.
Panika ti teď nepomůže – musíš přemýšlet.
Rozhlédneš se a všimneš si ostrého kamene na podlaze poblíž.
Posadíš se a pomalu se snažíš přisunout k místu, kde leží kámen.
Prsty obemkneš kámen a opatrně ho přitiskneš k provazu na zápěstích.`,
        () => {
            let checkPlayerIntelligence = 3;
            if (player.intelligence >= checkPlayerIntelligence) {
                storyParts.dun03.nextParts = [`dun08`];
            } else {
                storyParts.dun03.nextParts = [`dun09`];
            }
        },
        null,
        [`Pokračovat`],
        []
    ),
    dun04: new StoryPart(
        `Zůstaneš nehybně ležet, pouta ti bolestivě zařezávají do kůže.
Rozhodneš se ale vyčkat a sledovat, co se bude dít.
Kapání vody a vzdálené škrábání jsou přerušeny novým zvukem – hlasy.
Tlumené, hrubé, ale jasně lidské.
Dva muži se objevují na chodbě, jejich kroky doprovází tiché cinkání kovu.
Jsou vyzáblí, špinaví, a jejich otrhané oblečení je plné skvrn od krve a špíny.
Jeden z mužů se zastaví před celou naproti tobě a přiloží klíč k masivnímu zámku.
S hlasitým cvaknutím otevře dveře a z nitra cely vytáhne mladé děvče.
„Pojď, holčičko,“ zavrčí muž s úšklebkem, zatímco ji táhne temnou chodbou pryč.
Druhý muž dojde ke tvé cele, pomalu ji s hlasitým lomozem otevře.
Přistoupí k tobě, uvolní ti provaz, který tě držel připoutaného ke zdi a táhne tě ven.`,
        null,
        null,
        [`Pokusit se strážného omráčit.`, `Bojovat tváří v tvář.`],
        [`dun10`, `dun11`]

    ),
    dun05: new StoryPart(
        `Zatneš zuby a veškerou svou sílu soustředíš na jedno jediné – přetrhnout pouta.
Napneš svaly, až ti kůže klouže po drsném materiálu, a ucítíš, jak se pouta začínají povolovat.
Nakonec s ohlušujícím prásknutím, provazy povolí a ty cítíš svobodu.`,
        () => {
            player.gainXP(baseExp);
        },
        null,
        [`Pokračovat`],
        [`dun07`]
    ),
    dun06: new StoryPart(
        `Zatneš zuby a veškerou svou sílu soustředíš na jedno jediné – přetrhnout pouta.
Pouta jsou však silnější, než jsi očekával a provazy se ti bolestivě zařezávají do rukou.
Začíná se tě zmocňovat zoufalství jak se bolest v rukou stupňuje, až ti teče z dlaní krev.
Napneš svaly k poslednímu pokusu, až ti kůže klouže po drsném materiálu, a ucítíš, jak se pouta začínají povolovat.
Nakonec s ohlušujícím prásknutím, provazy povolí a ty cítíš svobodu.`,
        () => {
            let bleed = 5;
            console.log(`Ruce ti krvácí, ztrácíš ${bleed} životů.`);
            player.hp -= bleed;
            player.gainXP(baseExp);
        },
        null,
        [`Pokračovat`],
        [`dun07`]
    ),
    dun07: new StoryPart(
        `Ruce a nohy máš volné, teď už se jen nějak dostat ven z cely.
Snažíš se prozkoumat svou cellu, ale krom starých kostí a rozbitého nádobí nic užitečného nenajdeš.
Kapání vody a vzdálené škrábání najednou přeruší nové zvuky – hlasy.
Tlumené, hrubé, ale jasně lidské.
Dva muži se objevují na chodbě, jejich kroky doprovází tiché cinkání kovu.
Jsou vyzáblí, špinaví, a jejich otrhané oblečení je plné skvrn od krve a špíny.
Jeden z mužů se zastaví před celou naproti tobě a přiloží klíč k masivnímu zámku.
S hlasitým cvaknutím otevře dveře a z nitra cely vytáhne mladé děvče.
„Pojď, holčičko,“ zavrčí muž s úšklebkem, zatímco ji táhne temnou chodbou pryč.
Druhý muž dojde ke tvé cele, pomalu ji s hlasitým lomozem otevře, nevěda, že máš ruce a nohy volné.
To je příležitost na kterou jsi čekal.
Jakmile strážný dveře otevře dokořán, vrhneš se na něj.`,
        () => {
            console.log(`Bojuješ se strážným!`);
            enemy.newMonster(monsters.dunGuard);
            fight(player, enemy);
        },
        `dunGuard`,
        [`Pokračovat`],
        [`dun12`]
    ),
    dun08: new StoryPart(
        `Prsty obemkneš kámen a opatrně ho přitiskneš k provazu na kotnících.
Začneš s ním systematicky pohybovat tam a zpět, drhneš provaz o hrubý povrch.
Jde to pomalu, ale citíš, že provaz postupně povoluje.
Vzduchem se ozývá napětí vlákna, dokud se provaz s tichým prasknutím nepřetrhne.`,
        () => {
            player.gainXP(baseExp);
        },
        null,
        [`Pokračovat`],
        [`dun07`]
    ),
    dun09: new StoryPart(
        `Zběsile jezdíš kamenem po provaze omotaném kolem kotníků.
Začíná tě ovládat panika a začneš kamenem třást ještě zběsileji.
Pomohlo to, vlákna na provaze začínají povolovat.
Plný naděje ještě znásobíš své úsilí.
Jsi však neopatrný a kámen ti sjede po noze a pořeže ti kotník u nohy.
Zasípeš bolestí a pohled na vlastní krev tě donutí tempo zpomalit.
de to pomalu, ale citíš, že provaz postupně povoluje.
Vzduchem se ozývá napětí vlákna, dokud se provaz s tichým prasknutím nepřetrhne.`,
        () => {
            let bleed = 5;
            console.log(`Kotník ti krvácí, ztrácíš ${bleed} životů.`);
            player.hp -= bleed;
            player.gainXP(baseExp);
        },
        null,
        [`Pokračovat`],
        [`dun07`]
    ),
    dun10: new StoryPart(
        `Strážný tě táhne z cely ven, přesvědčený o tom, že jsi v bezvědomí.
Najednou si všimneš kamene na podlaze, a je ti jasné, že další takovou příležitost mít nebudeš.
Opatrně kámen zvedneš ze země a napřáhneš se k úderu.`,
        () => {
            let checkPlayerStealth = 3;
            if (player.stealth >= checkPlayerStealth) {
                storyParts.dun10.nextParts = [`dun12`];
            } else {
                storyParts.dun10.nextParts = [`dun11`];
            }
        },
        null,
        [`Pokračovat`],
        []
    ),
    dun11: new StoryPart(
        `Strážný zastihl tvůj pohyb, rychle tě odhodil stranou a vytáhl rezavou dýku připraven k boji.`,
        () => {
            console.log(`Bojuješ se strážným`);
            enemy.newMonster(monsters.dunGuard);
            fight(player, enemy);
        },
        `dunGuard`,
        [`Pokračovat`],
        [`dun12`]
    ),
    dun12: new StoryPart(
        `Strážný leží nehybně na zemi.
Nejsi si jistý zda je mrtvý nebo jen omráčený.
Rychle se zohneš a začneš prohledávat jeho potrhaný kabát.
Po chvíli nahmatáš něco těžkého a kovového – svazek klíčů!
V hlavě ti svitne plamínek naděje – jsi volný!`,
        () => {
            player.gainXP(baseExp);
        },
        null,
        [`Jít chodbou pryč`, `Prozkoumat ostatní cely`],
        [`dun13`, `dun14`]
    ),
    dun13: new StoryPart(
        `Rozběhneš se směrem k témné chodbě vedoucí pryč.
Stěny chodby osvětluje jen bledé světlo pochodně za tebou.
Z vlhkých stěn kolem tebe kape voda a tvé kroky duní po podlaze.
Vzduch je stále těžší a těžší, zápach zatuchliny se mísí s něčím ostřejším, kovovým – možná krví.
Cítíš, že se něco blíží a v dálce se mihne stín.
Postava, která se blíží, je ti známá.
Je to jeden ze strážných, ten, kterého jsi viděl odvádět dívku z protější cely.
Strážný si tě zatím nevšiml a tiše si si něco pro sebe mumlá.`,
        null,
        null,
        [`Připravit se k boji.`, `Pokusit se schovat`],
        [`dun19`, `dun20`]
    ),
    dun14: new StoryPart(
        `Pevně sevřeš svazek klíčů ukořistěný strážnému a jdeš prozkoumat ostatní kobky.
Kroky ti znějí hlasitě na kamenné podlaze, zatímco se pohybuješ temnou chodbou.
Podivné škrábavé zvuky, které jsi slyšel z vlastní cely jsou hlasitější a hlasitější.
Většina cel je buď prázdných nebo plná kostí a rezavých pout.
Pomalu přistoupíš ke dveřím poslední cely a opatrně nakoukneš dovnitř.
Na první pohled nevidíš nic neobvyklého, jen hromadu špíny a úlomků kamení na zemi.
Ale v zadní části cely, v nejtemnějším koutě, se něco pohne.
V koutě cely sedí postava.
Její kůže je napjatá a vyschlá, téměř průsvitná, kostnaté ruce a nohy vypadají, že se každou chvíli rozpadnou.
„Přišel jsi...“ zašeptá postava tichým, roztřeseným hlasem.
„Vysvoboď ... prosím...“
Zabíj....zabíj mě.`,
        null,
        null,
        [`Nechat ho tam a jít dál.`, `Vyslyšet prosbu a zabít ho.`],
        [`dun15`, `dun16`]
    ),
    dun15: new StoryPart(
        `Rozhodneš se nevyslyšet čarodějovy prosby a necháš ho tam, uvězněného v jeho utrpení.
Pokračuješ temnou chodbou kobek.
Hlasitý zvuk tvých kroků narušuje utichající nářek čaroděje zatebou a čím dál hlasitější škrábání před tebou.
Nakonec dojdeš na konec chodby, kde objevíš těžké dřevěné dveře na jejichž povrchu jsou vyryty škrábance.`,
        null,
        null,
        [`Pokračovat dál.`, `Otevřít dveře a vstoupit.`],
        [`dun19`, `dun20`]
    ),
    dun16: new StoryPart(
        `Rozhodneš se čaroděje vyslyšet. Jeho zoufalý pohled, zlomený hlas a zjevné utrpení tě přesvědčí.
Jeho utrpení musí skončit.
Přistoupíš blíž, a pomalu vytahuješ rezavou dýku, kterou jsi sebral strážnému.
Každý tvůj krok zní na kamenné podlaze hlasitě a těžce.
Čaroděj slabě pozvedne hlavu a pohledem se vpije do tvých očí. „Děkuji,“ zašeptá téměř neslyšně.
Když mu tvá dýka probodne srdce, uchopí tě pevně za ruku a tělem ti projede silný nával energie.
Pak čaroděj naposledy vydechne a ty ho uložíš k odpočinku.`,
        () => {
            player.gainMaxMana(10);
        },
        null,
        [`Odejít`],
        [`dun17`]
    ),
    dun17: new StoryPart(
        `S pocitem těžkosti na srdci opustíš celu, kde jsi právě ukončil trápení starého čaroděje a pokračuješ v průzkumu.
Jak postupuješ dál, vzduch je stále hustší a těžší a škrábavý zvuk zesiluje.
Nakonec dojdeš na konec chodby, kde objevíš těžké dřevěné dveře na jejichž povrchu jsou vyryty škrábance.`,
        null,
        null,
        [`Pokračovat dál.`, `Otevřít dveře a vstoupit.`],
        [`dun13`, `dun18`]
    ),
    dun18: new StoryPart(
        `S hlubokým nádechem a pocitem napětí uchopíš kliku těžkých dřevěných dveří a pomalu je otevřeš.
Hned jak vznikne mezera, dostane se k tobě ostrý zápach – směs krve, rozkladu a zatuchliny.
Místnost za dveřmi připomíná starou strážnici
Stěny jsou obložené zrezivělými háky, na kterých kdysi visely zbraně a zbroje.
Na zdi vedle jednoho z háků visí stará lucerna.
Tvůj pohled ale okamžitě upoutá něco jiného.
Uprostřed místnosti, na hromadě trosek a kostí, se nachází obrovská krysa – mnohem větší, než by měla být.
Její srst je potrhaná a pokrytá jizvami, oči jí rudě září a z tlamy odkapává směsice slin a krve.
Krysa na tebe zasyčí, její tělo se napne a svaly na nohách se připraví ke skoku.`,
        () => {
            console.log(`Bojuješ s krysou!`);
            enemy.newMonster(monsters.giantRat);
            fight(player, enemy);
        },
        [`giantRat`],
        [`Pokračovat`],
        [`dun33`]
    ),
    dun19: new StoryPart(
        `Úkryt nebyl možný a strážný si tě všimnul a zastaví se, překvapený tvou přítomností.
„No ne, co to tady máme?“ řekne posměšně a sevře rezavou dýku pevněji.
„Další hrdina, co si myslí, že může uniknout?“`,
        () => {
            console.log(`Bojujete se strážným.`)
            enemy.newMonster(monsters.dunGuard);
            fight(player, enemy);
        },
        [`dunGuard`],
        [`Pokračovat.`],
        [`dun21`]
    ),
    dun20: new StoryPart(
        `Rozhodneš se schovat a napadnout strážného ze zadu.
Rozhlédneš se kolem sebe a rychle hledáš místo kde se schovat.`,
        () => {
            let checkPlayerStealth = 3;
            if (player.stealth >= checkPlayerStealth) {
                storyParts.dun20.nextParts = [`dun22`];
            } else {
                storyParts.dun20.nextParts = [`dun19`];
            }
        },
        null,
        [`Pokračovat.`],
        []
    ),
    dun21: new StoryPart(
        `Boj to nebyl vůbec lehký, i když se strážný na první pohled zdál jako lehký oponent.
Naštěstí se po tvém poslední úderu zřítil k zemi a už se nezvedl.`,
        () => {
            player.gainXP(baseExp);
        },
        null,
        [`Pokračovat.`],
        [`dun23`],
    ),
    dun22: new StoryPart(
        `Přesuneš do temného koutu chodby, kde se stěny stávají nepravidelnými a vrhají hluboké stíny.
Přitiskneš se ke zdi, dýcháš mělce a snažíš se zůstat nehybný.
Strážný se přiblíží na dosah.
Jakmile projde kolem tebe, pomalu se narovnáš a připravíš k akci.
Uděláš rychlý, tichý krok vpřed, ruce pevně sevřeš kolem dýky a náhle zaútočíš.
Tvůj úder je rychlý a přesný, strážný tiše zasténá a padne k zemi.`,
        () => {
            player.gainXP(baseExp);
        },
        null,
        [`Pokračovat.`],
        [`dun23`]
    ),
    dun23: new StoryPart(
        `Zůstaneš chvíli stát, dech ti ztěžka vychází, a pohledem zkoumáš bezvládně ležícího strážného.
Sehneš se a rychle prohledáš jeho tělo.
V jedné z kapes najdeš stejný svazek klíčů, jako měl předchozí strážný.
Ve druhé však nalezneš malý rudý lektvar, který si po chvilce přemýšlení vložíš do kapes.
S lahvičkou v kapse se vydáváš dál na cestu.`,
        () => {
            player.inventory.addItem(items.heal2Potion);
            console.log(`Získal si předmět Lektver zdraví.`);
        },
        null,
        [`Pokračovat.`],
        [`dun24`]
    ),
    dun24: new StoryPart(
        `Chodba je stále temnější a tísnivější.
Zvuky tvých kroků se mísí s kapáním vody ze stropu.
Občas se ozve vzdálený šramot, jako by něco malého prolétlo nebo přeběhlo po zemi.
Nakonec dojdeš na rozcestí, levá chodba se zdá být tichá.
Z pravé chodby se však vzdáleně ozívá nářek a vřískot.`,
        null,
        null,
        [`Vydat se levou chodboou.`, `Vydat se pravou chodbou.`],
        [`dun25`, `dun26`]

    ),
    dun25: new StoryPart(
        `Pokračuješ levou chodbou a po chvíli uvidíš na konci chodby otevřený prostor.
Jak se přibližuješ, světlo pochodně odhaluje točité kamenné schodiště, které stoupá vzhůru.
Jeho stupně jsou opotřebované, na některých místech popraskané.
Ale tvůj pohled okamžitě přitáhne něco jiného – socha stojící těsně vedle schodiště.
Je vysoká, téměř ti dosahuje k ramenům, a zobrazuje postavu v dlouhém plášti s kápí, která zakrývá většinu obličeje.
Její oči, ač vytesané z kamene, se zdají téměř živé, jako by tě sledovaly.
Celá socha vyzařuje zvláštní, hrozivou přítomnost.`,
        null,
        null,
        [`Jít na schodiště`, `Prozkoumat sochu`],
        [`dun28`, `dun29`]
    ),
    dun26: new StoryPart(
        `Vydáš se chodbou napravo a opatrně postupuješ vpřed.
Napjatě posloucháš, aby jsi zjistil co se  před tebou děje.
Slyšíš vřískot a nějaké hlasy, ale nejsi scopný rozeznat o čem se baví.
Na konci chodby narazíš na těžké dřevěné dveře a tak se zastavíš aby ses zaposlouchal.
Po chvíli rozeznáš dva hlasy.
Jeden hlas se tiše směje, jeho smích je však dutý a znepokojivý.
Druhý hlas se třese a je plný strachu a zoufalství.`,
        null,
        null,
        [`Otočit se a raději jít levou chodbou.`, `Pokusit se vplížit dovnitř.`],
        [`dun25`, `dun27`]
    ),
    dun27: new StoryPart(
        `Pomalu přiložíš dveře a lehce zatlačíš, aby jsi mohl prokouknout skulinou dovnitř.
J to mučírna - na stěnách visí různé nástroje bolesti, některé stále odkapávají krví.
Tvůj pohled padne na dva strážné.
První stojí hned kousíček vedle dveří a upřeně sleduje dění v místnosti.
Druhý strážný, mohutnější a děsivější, stojí nad skřetem připoutaným k železnému rámu.
„Řekni mi, kde je to zlato! Zlodšěji prašivá!“ křikne strážný a začne skřeta pálit rozžhaveným železem.
Mítností se ozve ohlušující skřetí vřískot: „Já... já nic nevím!“
Je ti jasné, že pokud chceš jednat, musíš to udělat rychle, teď je tvá šance.`,
        null,
        null,
        [`Vtrhnout do místnosti.`,`Tiše zneškodnit strážného.`],
        [`dun34`, `dun35`]
    ),
    dun28: new StoryPart(
        `Jakmile položíš nohu na první schod, zdá se, že celá místnost na okamžik ztichne.
Je to jen zlomek vteřiny, ale než stačíš udělat další krok, uslyšíš náhlé zařinčení kamene.
Otočíš se právě včas, abys viděl, jak se socha rozpohybuje.
Rýhy na jejím povrchu se rozsvítí temným, narudlým světlem, a zpod kápi se ozve hluboké, nelidské vrčení.
Bez varování socha udeří holí přímo na tebe.
Rychle uskočíš, její úder dopadne na kámen schodiště, který se rozpraská silou nárazu.`,
        () => {
            console.log(`Bojuješ se sochou strážící schodiště.`);
            enemy.newMonster(monsters.dunStatue);
            fight(player, enemy);
        },
        [`dunStatue`],
        [`Pokračovat.`],
        [`dun30`]
    ),
    dun29: new StoryPart(
        `Pomalu obcházíš sochu, světlo pochodně vrhá mihotavé světlo na její kamenné detaily.
Prohlížíš si její tvář, skrytou v kápi, a dlouhou hůl, kterou drží zkříženou přes hrudník.
Kamenný povrch je hladký, ale zdá se ti, že místy má zvláštní rytiny, které na první pohled nejsou viditelné.
Přiblížíš se, abys je lépe prozkoumal.`,
        () => {
            let checkPlayerIntelligence = 3;
            if (player.intelligence >= checkPlayerIntelligence) {
                storyParts.dun29.nextParts = [`dun32`];
            } else {
                storyParts.dun29.nextParts = [`dun31`];
            }
        },
        null,
        [`Pokračovat.`],
        []
    ),
    dun30: new StoryPart(
        `S hlasitým zaduněním se socha zhroutí na zem.
Její tělo se rozpadne na hromadu nehybných, chladných úlomků kamene.
Místnost se opět ponoří do ticha, pouze tvůj zrychlený dech připomíná právě skončený boj.
Obrátíš svou pozornost zpět k točitému schodišti.
Chvíli váháš, než položíš nohu na první schod.
Pomalu stoupáš nahoru, schod za schodem.
Vzduch se zdá být čerstvější, méně těžký, jak se vzdaluješ od temných kobek.
Každý krok tě přibližuje ke svobodě a nebo k ještě větším nebezpečím, která na tebe čekají nahoře.`,
        () => {
            player.gainXP(baseExp);
        },
        null,
        [`Pokračovat.`],
        [`mid1`]
    ),
    dun31: new StoryPart(
        `Nápisy nebo symboly jsou velmi staré a nedokážeš rozluštit jejich význam.
Přesto, že tě socha znepokojuje, nemáš jinou možnost než pokračovat na schodiště.
Jakmile položíš nohu na první schod, zdá se, že celá místnost na okamžik ztichne.
Je to jen zlomek vteřiny, ale než stačíš udělat další krok, uslyšíš náhlé zařinčení kamene.
Otočíš se právě včas, abys viděl, jak se socha rozpohybuje.
Rýhy na jejím povrchu se rozsvítí temným, narudlým světlem, a zpod kápi se ozve hluboké, nelidské vrčení.
Bez varování socha udeří holí přímo na tebe.
Rychle uskočíš, její úder dopadne na kámen schodiště, který se rozpraská silou nárazu.`,
        () => {
            console.log(`Bojuješ se sochou strážící schodiště.`);
            enemy.newMonster(monsters.dunStatue);
            fight(player, enemy);
        },
        [`dunStatue`],
        [`Pokračovat.`],
        [`dun30`]
    ),
    dun32: new StoryPart(
        `Všimneš si, že některé s rytin jsou propojené čarami.
Některé z čar vedou ke kamenné holi, kterou socha drží.
Zdá se, že symboly a hůl jsou propojeny a tvoří nejaký mechanismus.
Při bližším zkoumání zjistíš, že jeden ze symbolů na podstavci je mírně opotřebený.
Položíš na něj ruku a cítíš, že je volnější než zbytek kamene.
Opatrně do něj zatlačíš a kámen se s tichým zaskřípěním pohne dovnitř.
Jakmile se kámen zasune, z celé sochy vyzařuje jemné, slabé světlo, které po chvíli zhasne.
Hůl, kterou drží, sklouzne z jejích rukou na zem.
Oči sochy se zavřou a hrozivá přítomnost, kterou vyzařovala je najednou pryč.
Pomalu zvedneš hůl ležící na zemi a při dotyku cítíš, že v sobě stále nese slabou magickou energii.
S holí v ruce se vidáš nahoru po točitém schodišti.`,
        () => {
            player.gainXP(baseExp);
            player.inventory.addItem(items.staff);
            console.log(`Získal jsi předmět Kamenná hůl.`);
        },
        null,
        [`Pokračovat.`],
        [`mid1`]
    ),
    dun33: new StoryPart(
        `Krysa sebou ještě chvíli škube, než padne mrtvá k zemi.
Zhluboka si oddechneš a ohlédneš se po místnosti, zda ti nehrozí další nebezpečí, místnost je však prázdná.
Rozhodneš se strážnici prohledat a v jedné poloprázdných beden najdeš malou červenou lahvičku-
Staré symboli na lahvičce ti prozradí, že se jedná o lektvar zdraví.
Pokračuješ v průzkumu a na zemi poblíž zbytků staré zbroje najdeš krátký meč. Je těžký, ale stále v použitelném stavu.
Meč si vezmeš, ještě jednou ukosem pohlédneš na mrtvou krysu a výjdeš ze dveří zpátky na chodbu.`,
        () => {
            player.gainXP(baseExp);
            player.inventory.addItem(items.shortSword);
            player.inventory.addItem(items.heal2Potion);
            console.log(`Získát předmět - Lektvar zdraví`);
            console.log(`Získán předmět - Krátký meč`);
        },
        null,
        [`Pokračovat.`],
        [`dun13`]
    ),
    dun34: new StoryPart(
        `Prudce rozrazíš dveře, vtrhneš do místnosti a řítíš se na strážného u dveří.
Ten si tě stačí jen tak tak všimnou a tasí meč, zatím co druhý strážný stále upřeně pozoruje ječícího skřeta.`,
        () => {
            console.log(`Bojuješ se strážným.`);
            enemy.newMonster(monsters.dunGuard);
            fight(player, enemy);
            if (player.hp > 0) {
                player.gainXP(baseExp);
            }
        },
        [`dunGuard`],
        [`Pokračovat.`],
        [`dun36`]
    ),
    dun35: new StoryPart(
        `Tiše vytáhneš dýku a otevřeš dveře jen tak, aby jsi se mohl tiše vkrást do místnosti.
Tlumenou chůzí se začneš pomaličku plížit směrem ke strážnému stojícímu u dveří.
Tvé kroky doprovází skřeky a nářek skřeta mučeného uprostřed místnosti.
Když jsi těsně za ním, zastavíš se na okamžik, aby ses ujistil, že druhý strážný nic nezaregistroval.
Ten je však plně zaměstnán skřetem a vůbec své okolí nevnímá.
Jedním plynulým pohybem chytneš strážného zezadu, zakryješ mu ústa dlaní a napřáhneš se ke smrtícímu úderu.`,
        () => {
            let checkPlayerStealth = 4;
            if (player.stealth >= checkPlayerStealth) {
                storyParts.dun35.nextParts = [`dun36`];
                player.gainXP(baseExp);
            } else {
                storyParts.dun35.nextParts = [`dun40`];
            }
        },
        null,
        [`Pokračovat.`],
        []
    ),
    dun36: new StoryPart(
        `První strážný padá se zaduněním na zem.
„Co to sakra–!“ vykřikne druhý strážný, který okamžitě zpozorní a otočí se od skřeta, jehož mučení právě přerušil.
Chvíli stojí a hledí šokovaným pohledem na bezvládné tělo u tvých nohou.
"Tak to ne chlapečku!", zařve nakonec a hodí po tobě rožhaveným železem, které dosud drel v ruce.`,
        () => {
            console.log(`Bojuješ s mučitelem.`);
            enemy.newMonster(monsters.dunTorturer);
            fight(player, enemy);
            if (player.hp > 0) {
                player.gainXP(baseExp);
                player.inventory.addItem(items.saber);
                console.log(`Získal jsi předmět Mučitelova šavle.`)
            }
        },
        [`dunTorturer`],
        [`Pokračovat.`],
        [`dun37`]
    ),
    dun37: new StoryPart(
        `I druhý strážný padá k zemi a místnost se ponoří do ticha.
Pomalým krokem přistoupíš ke skřetovi.
Když se k němu přiblížíš, jeho oči se rozšíří směsicí strachu a naděje.
Prohlédneš si jeho pouta a okamžitě si všimneš, že něco není v pořádku.
Místo obyčejných lan má ruce omotané modře zářícím kovem.
Cítíš z něj zvláštní energii – něco, co ti připomíná magii.
„Co je to za pouta?“ zeptáš se, stále ve střehu.
Skřet tě obdaří slabým pohledem, plným znechucení.
"To je Nihilit, prokletý kov - brání mi v používání magie.", pobzdechne si.
"Prosím, zlom to… nebo… nebo tu zůstanu navždy.“`,
        null,
        null,
        [`Nechat ho svázaného.`, `Pustit skřeta na svobodu.`],
        [`dun38`,`dun39`]
    ),
    dun38: new StoryPart(
        `Rozhodneš se, že skřeta necháš svázaného, jeho pouta a energie, kterou vyzařují, v tobě vzbuzují nedůvěru.
Skřet začne zběsile vřískat a nadávat.  „Jsi stejný jako oni! Zbabělec, zbabělec!"
Ignoruješ jeho nadávky a začneš prohledávat místnost.
Na stole u zdi si všimneš hrubě opracovaných talířů a misek s jídlem.
Je tam kus chleba, sýr, několik jablek a džbán s vodou.
Vezmeš vše co můžeš unést a za doprovodu hlasitých nadávek se vydáš zpátky chodbou, kterou jsi přišel.`,
        () => {
            player.inventory.addItem(items.water);
            player.inventory.addItem(items.foodSupply);
            console.log(`Získal jsi předmět Zásoba jídla.`);
            console.log(`Získal jsi předmět Voda.`);
        },
        null,
        [`Pokračovat.`],
        [`dun25`]
    ),
    dun39: new StoryPart(
        `Pouta jsou složitě vyřezávaná, ale všimneš si malého zámku na každém z nich.
Použiješ svazek klíčů, který jsi vzal strážným, a po chvíli najdeš ten správný.
Zámek s cvaknutím povolí a pouta spadnou na zem a modré světlo okamžitě vyhasne.
Skřet si promne zápěstí, jeho tvář se zkřiví do výrazu úlevy, „Měl jsem pocit, že mě ty proklaté okovy sežerou zaživa.“
Pohlédne na tebe s výrazem, který je nečekaně vděčný.
„Pomohl jsi mi, a já pomůžu tobě. Naučím tě kouzlo, které mi už párkrát zachránilo krk.
Skřet pozvedne ruce a začne tiše odříkávat zaklínadlo.
Energie v místnosti se změní, pocítíš jemné brnění a tvé ruce zalije příjemné teplo.
„Rychlé ruce,“ pronese skřet zřetelně. „Pohneš rukama rychleji, než si kdo stačí všimnout.
„Použij to dobře,“ dodá. „A teď mě omluv, musím zmizet, než se sem vrátí další.“
Dřív, než stihneš cokoli říct, skřet se rozběhne ke dveřím. Rychlostí, která tě překvapí, zmizí ve stínech chodby.
Zhluboka se nadechneš a prohledáš místnost. 
Na stole u zdi najdeš kus chleba, kousek sýra a džbán s vodou.
Rychle pobereš co můžeš a vydáš se chodbou zpátky.`,
        () => {
            player.inventory.addItem(items.water);
            player.inventory.addItem(items.foodSupply);
            console.log(`Získal jsi předmět Zásoba jídla.`);
            console.log(`Získal jsi předmět Voda.`);
        },
        null,
        [`Pokračovat.`],
        [`dun25`]
    ),
    dun40: new StoryPart(
        `Strážný je však rychlejší než si čekal, prudce se ti vytrhne a dvá dýka udeří naprázdno.
„No do prdele—!“ vykřikne,instinktivně sáhne po svém meči a prudce ho tasí.`,
        () => {
            console.log(`Bojuješ se strážným.`);
            enemy.newMonster(monsters.dunGuard);
            fight(player, enemy);
            if (player.hp > 0) {
                player.gainXP(baseExp);
            }
        },
        [`dunGuard`],
        [`Pokračovat.`],
        [`dun36`]
    ),
    mid1: new StoryPart(
        `TOTO JE KONEC EARLY ACCESSU. DĚKUJEME, ŽE JSTE SI HRU ZAHRÁLI!
IN PROGRESS:
KOUZLA
DESIGN
ACT 3 & 4`,
        null,
        null,
        null,
        `konec`
    ),
    epilog1: new StoryPart(
        `Nájezdníkova čepel projde tvým bokem a způsobí ti smrtelnou ránu.
Padneš na zem, dýcháš ztěžka, zatímco chaos kolem tebe pokračuje.
Svět kolem tebe pomalu utichá.
Vesnice přežije a tvoje statečnst nebude zapomenuta.
Vesničané si budou vyprávět příběh o mladém hrdinovi, který bojoval až do posledního dechu.`,
        null,
        null,
        null,
        `konec`
    )
}


module.exports = storyParts;