// IMPORTS: class Monster
const Monster = require('./monster.js');


// MONSTERS LIBRARY
const monsters = {
    tenebrisOne: new Monster(
        "Tenebris",
        100,
        100,
        13,
        function(Character){
            if (this.hp <= (this.maxHp * 0.3)) {
                console.log(`${this.name} použil kouzlo Rozervání reality!💥🌌`);
            } else {
                if (this.cooldown === 1) {
                    console.log(`${this.name} použil kouzlo Dotek prázdnoty!🌑`);
                    console.log(`Tvůj štít byt zničen!💔`)
                    Character.shield = 0;
                } else if (this.cooldown % 2 === 0 && this.cooldown !== 0) {
                    console.log(`${this.name} použil kouzlo Tanec stínů!💃🕺`);
                    Character.takeDamage(this.strength * 1.2);
                } else if (this.cooldown === 5) {
                    console.log(`${this.name} použil kouzlo Šepot nicoty!🌀`);
                    Character.takeDamage(this.strength * 0.8);
                    Character.damage -= this.strength * 0.2;
                    console.log(`Tvé poškození bylo sníženo o ${this.strength * 0.2} na ${Character.damage}!`);
                } else {
                    this.attack(Character);
                }
            }
        }
    ),
  
    tenebrisTwo: new Monster(
        "Tenebris - Pán Stínů",
        150,
        150,
        18,
        function(Character){
            if (this.cooldown % 2 === 0 && this.cooldown !== 0) {
                console.log(`${this.name} použil kouzlo Stínová žízeň!🦇`);
                Character.takeDamage(this.strength * 0.5);
                this.hp += (this.strength * 0.5);
                console.log(`${this.name} si vyléčil ${(this.strength * 0.5)} zranění, nyní má ${this.hp} životů!❤️`);
            } else if (this.cooldown === 3) {
                console.log(`${this.name} použil kouzlo Zatemnění mysli!🧠⚫`);
                Character.spellDamage -= this.strength * 0.05;
                console.log(`Tvá síla kouzel byla snížena o ${this.strength * 0.05} na ${Character.spellDamage}!`);
            } else {
                this.attack(Character)
            }
        }
    ),
  
    hunterBoss: new Monster(
        "Kordak - Lovec stínů",
        100,
        100,
        11,
        function(Character){
            if (this.hp <= (this.maxHp * 0.3)) {
                console.log(`${this.name} použil kouzlo Vlčí přeměna!🐺`);
            } else {
                if (this.cooldown === 1) {
                    console.log(`${this.name} použil kouzlo Proražení obrany!🔨`);
                    console.log(`Tvůj štít byt zničen!💔`)
                    Character.shield = 0;
                } else if (this.cooldown % 2 === 0 && this.cooldown !== 0) {
                    console.log(`${this.name} použil kouzlo Rozpárání kořisti a způsobil ti krvácení!🩸`);
                    Character.takeDamage(this.strength * 0.5);
                } else if (this.cooldown % 5 === 0 && this.cooldown !== 0) {
                    console.log(`${this.name} použil kouzlo Sekera soumraku!🌅`);
                    Character.takeDamage(this.strength * 1.2);
                } else {
                    this.attack(Character);
                }
                if (this.cooldown > 2) {
                    console.log(`Krvácení ti způsobilo ${this.strength * 0.2} poškození!🩸`);
                    Character.takeDamage(this.strength * 0.2);
                }
            }

        }
    ),
  
    werewolfBoss: new Monster(
        "Kordak - Pán vlkodlaků",
        150,
        150,
        15,
        function(Character) {
            if (this.cooldown % 2 === 0 && this.cooldown !== 0) {
                console.log(`${this.name} použil kouzlo Čelisti bestie!🦇🦷`);
                Character.takeDamage(this.strength * 0.5);
                this.hp += (this.strength * 0.5);
                console.log(`${this.name} si vyléčil ${(this.strength * 0.5)} zranění, nyní má ${this.hp} životů!❤️`);
            } else if (this.cooldown === 3) {
                console.log(`${this.name} použil kouzlo Prokletý řev!🐺⚡`);
                Character.spellDamage -= this.strength * 0.05;
                console.log(`Tvá síla kouzel byla snížena o ${this.strength * 0.05} na ${Character.spellDamage}!`);
            } else {
                this.attack(Character)
            }
            console.log(`Krvácení ti způsobilo ${this.strength * 0.2} poškození!🩸`);
            Character.takeDamage(this.strength * 0.2);
        }
    ),
  
    marauder: new Monster(
        "Nájezdník",
        30,
        30,
        2,
        function(Character){
            // prvni spell - hodDykou
            if (this.cooldown % 3 === 0 && this.cooldown !== 0) {
                console.log(`${this.name} hodil nožem! 🔪`)
                Character.takeDamage(15);
            }
            // pokud jsou spells na CD, bude pouze basic attack
            else {
                this.attack(Character)
            }
        }
    ),

    bandit:new Monster(
        "Lapka",
        10,
        10,
        2,
        null,
    ),

    giantWolf:new Monster(
        "Vlk",
        13,
        13,
        2,
        function(Character){
            if (this.cooldown % 4 === 0 && this.cooldown !== 0) {
                console.log(`${this.name} tě kousnul!🐺🦷`)
                Character.takeDamage(5);
            }
            else {
                this.attack(Character)
            }
        }
    ),

    dunGuard:new Monster(
        "Strážný",
        15,
        15,
        2,
        function(Character){
            if (this.cooldown % 2 === 0 && this.cooldown !== 0) {
                console.log(`${this.name} ti vrazil pěstí do zubů!👊🦷`)
                Character.takeDamage(5);
            }
            else {
                this.attack(Character)
            }
        }
    ),

    giantRat:new Monster(
        "Obří krysa",
        13,
        13,
        2,
        function(Character){
            // první spell - poison bite
            if (this.cooldown === 0) {
                console.log(`${this.name} ti uštědřila jedovaté kousnutí! Byl jsi otráven!🐀☠️`)
                this.poisonActive = true;
            } else {
                if (this.poisonActive) {
                    console.log(`${this.name} Jedovaté kousnutí ti působí bolest!🐀🩸`);
                    Character.takeDamage(1);
                }
                this.attack(Character)
            }
        }
    ),

    dunStatue:new Monster(
        "Socha strážící schodiště",
        16,
        16,
        3,
        function(Character){
            if (this.cooldown % 4 === 0 && this.cooldown !== 0) {
                console.log(`${this.name} po tobě hodila kus schodiště!🏰💥`)
                Character.takeDamage(5);
            }
            else {
                this.attack(Character)
            }
        }
    ),

    dunTorturer:new Monster(
        "Mučitel",
        17,
        17,
        3,
        function(Character){
            if (this.cooldown % 3 === 0 && this.cooldown !== 0) {
                console.log(`${this.name} tě pořádně mučí!🔨🩸`)
                Character.takeDamage(5);
            }
            else {
                this.attack(Character)
            }
        }
    ),

    secGuard:new Monster(
        "Hlídač",
        16,
        16,
        3,
        function(Character){
            if (this.cooldown % 4 === 0 && this.cooldown !== 0) {
                console.log(`${this.name} tě sekl mečem ⚔️`)
                Character.takeDamage(6);
            }
            else {
                this.attack(Character)
            }
        }
    )
}

// EXPORT: monsters library
module.exports = monsters;