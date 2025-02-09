// Import
const Inventory = require('./inventory.js');
const fs = require('fs');
const chalk = require('chalk');
const prompt = require('prompt-sync')();

// Class
class Character {
    constructor(name, hp, maxHp, shield, maxShield, mana, maxMana, damage, spellDamage, strength, intelligence, stealth, spellBook, inventory, level, xp, xpForLvl, storyPart, position, inFight) {
        this.name = name;
        this.hp = hp;
        this.maxHp = maxHp;
        this.shield = shield;
        this.maxShield = maxShield;
        this.mana = mana;
        this.maxMana = maxMana;
        this.damage = damage;
        this.spellDamage = spellDamage;
        this.strength = strength;
        this.intelligence = intelligence;
        this.stealth = stealth;
        this.spellBook = spellBook || null; // TODO - napojit na SpellBook
        this.inventory = inventory || null;
        this.level = level;
        this.xp = xp;
        this.xpForLvl = xpForLvl;
        this.storyPart = storyPart;
        this.position = position || 1;
        this.inFight = inFight || false;
        this.maxPlayerLevel = 10;
    }

    saveToFile(filename = './save.json') {
        const data = {
            name : this.name,
            hp : this.hp,
            maxHp : this.maxHp,
            shield : this.shield,
            maxShield : this.maxShield,
            mana : this.mana,
            maxMana : this.maxMana,
            damage : this.damage,
            spellDamage : this.spellDamage,
            strength : this.strength,
            intelligence : this.intelligence,
            stealth : this.stealth,
            spellBook : this.spellBook,
            inventory : this.inventory,
            level : this.level,
            xp : this.xp,
            xpForLvl : this.xpForLvl,
            storyPart : this.storyPart,
            position : this.position,
            inFight : this.inFight,
            maxPlayerLevel : this.maxPlayerLevel
        };
        try {
            fs.writeFileSync(filename, JSON.stringify(data, null, 4), 'utf8');
        } catch (err) {
            console.log(`Chyba při ukládání dat:`, err);
        }
    }

    loadFromFile(filename = './save.json') {
        if (fs.existsSync(filename)) {
            try {
                const data = JSON.parse(fs.readFileSync(filename, 'utf8'));
                this.name = data.name;
                this.hp = data.hp;
                this.maxHp = data.maxHp;
                this.shield = data.shield;
                this.maxShield = data.maxShield;
                this.mana = data.mana;
                this.maxMana = data.maxMana;
                this.damage = data.damage;
                this.spellDamage = data.spellDamage;
                this.strength = data.strength;
                this.intelligence = data.intelligence;
                this.stealth = data.stealth;
                this.spellBook = data.spellBook;

                if (data.inventory) {
                    this.inventory = new Inventory(data.inventory.maxSpace);
                    this.inventory.items = data.inventory.items || [];
                    this.inventory.mainHand = data.inventory.mainHand || null;
                    this.inventory.offHand = data.inventory.offHand || null;
                    this.inventory.currentSpace = data.inventory.currentSpace || 0;
                } else {
                    this.inventory = new Inventory(10);
                }

                this.level = data.level;
                this.xp = data.xp;
                this.xpForLvl = data.xpForLvl;
                this.storyPart = data.storyPart;
                this.position = data.position;
                this.inFight = data.inFight;
                this.maxPlayerLevel = data.maxPlayerLevel;

            } catch (err) {
                console.log(`Problém při načítání hry:`, err);
            }
        }
    }


    takeDamage(damage) {
        if (this.hp > 0) {
            if (this.shield > 0) {
                if ((this.shield - damage) < 0) {
                    this.hp = this.hp - (damage - this.shield);
                    this.shield = 0;
                } else {
                    this.shield -= damage;
                }
            } else {
                this.hp -= damage;
                if (this.hp < 0) {
                    this.hp = 0;
                }
            }
        }
        console.log(`Bylo ti uděleno ${damage} poškození. Nyní máš ${this.hp} životů.`);
    }

    attack(monster) {
        if (this.hp > 0) {
            monster.hp -= this.damage;
        }
        console.log(`Nepřítel ${monster.name} utrpěl ${this.damage} poškození. Nyní má ${monster.hp} životů.`)
    }

    // castSpell() {
    //     // TODO - Napojit na Spells a SpellBook
    //     }

    __str__() {
        console.log(`VLASTNOSTI POSTAVY:`)
        console.log(`Jméno: ${this.name}`);
        this.showHP();
        this.showShield();
        this.showMana();
        this.showXP();
        console.log(`Level: ${this.level}`);
        console.log(`Síla: ${this.strength}`);
        console.log(`Inteligence: ${this.intelligence}`);
        console.log(`Nenápadnost: ${this.stealth}`);
        console.log(`Poškození: ${this.damage}`);
        console.log(`Poškození kouzly: ${this.spellDamage}`);
        if (this.spellBook != null) {
            console.log(`Kniha kouzel: `);
            for (let spell of this.spellBook) {
                console.log(`${spell.name} Popis: ${spell.description}`);
            }
        }

    }

    showHP() {
        let filledBlocks = this.hp;
        let emptyBlocks = this.maxHp - filledBlocks;
        let healthBar = chalk.bgRed(` `.repeat(filledBlocks)) + chalk.bgWhite(` `.repeat(emptyBlocks));
        console.log(`HP:       [${healthBar}] ${this.hp} / ${this.maxHp}`);
    }

    showShield() {
        let filledBlocks = this.shield;
        let emptyBlocks = this.maxShield - filledBlocks;
        let shieldBar = chalk.bgMagenta(` `.repeat(filledBlocks)) + chalk.bgWhite(` `.repeat(emptyBlocks));
        console.log(`Shield:   [${shieldBar}] ${this.shield} / ${this.maxShield}`);
    }

    showMana() {
        let filledBlocks = this.mana;
        let emptyBlocks = this.maxMana - filledBlocks;
        let manaBar = chalk.bgBlue(` `.repeat(filledBlocks)) + chalk.bgWhite(` `.repeat(emptyBlocks));
        console.log(`Mana:     [${manaBar}] ${this.mana} / ${this.maxMana}`);
    }

    showXP() {
        let filledBlocks = this.xp;
        let emptyBlocks = this.xpForLvl - filledBlocks;
        let xpBar = chalk.bgGreen(` `.repeat(filledBlocks)) + chalk.bgWhite(` `.repeat(emptyBlocks));
        console.log(`EXP:      [${xpBar}] ${this.xp} / ${this.xpForLvl}`);
    }

    isAlive() {
        return this.hp > 0;
    }

    isFighting() {
        return this.inFight;
    }

    gainXP(amount) {
        this.xp += amount;
        console.log(`Získal jsi ${amount} bodů zkušeností.`)
        if (this.xp >= this.xpForLvl) {
            this.xp -= this.xpForLvl;
            this.levelUp();
        }
    }

    gainStrength(amount) {
        this.strength += amount;
        console.log(`Síla se ti zvýšila o ${amount} na ${this.strength}`);
        if (this.strength === 4) {
            // TODO - přidat kouzlo Drtivý úder
            console.log(`Naučil jsi se kouzlo Drtivý úder!`);
        } else if (this.strength === 6) {
            // TODO - přidat kouzlo Zuřivost
            console.log(`Naučil jsi se kouzlo zuřivost!`);
        } else if (this.strength === 8) {
            // TODO - přidat kouzlo Rozcupovat
            console.log(`Naučil jsi se kouzlo Rozcupovat!`);
        }
    }

    gainIntelligence(amount) {
        this.intelligence += amount;
        console.log(`Inteligence se ti zvýšila o ${amount} na ${this.intelligence}`);
        if (this.intelligence === 4) {
            // TODO - přidat kouzlo Ledové kopí
            console.log(`Naučil jsi se kouzlo Ledové kopí!`);
        } else if (this.intelligence === 6) {
            // TODO - přidat kouzlo Posvátný záblesk
            console.log(`Naučil jsi se kouzlo Posvátný záblesk!`);

        } else if (this.intelligence === 8) {
            // TODO - přidat kouzlo Magické přetížení
            console.log(`Naučil jsi se kouzlo Magické přetížení!`);
        }
    }

    gainStealth(amount) {
        this.stealth += amount;
        console.log(`Nenápadnost se ti zvýšila o ${amount} na ${this.stealth}`);
        if (this.stealth === 4){
            // TODO - přidat kouzlo Úder pod pás
            console.log(`Naučil jsi se kouzlo Úder pod pás!`);
        } else if (this.stealth === 6) {
            // TODO - přidat kouzlo Exploze dýk
            console.log(`Naučil jsi se kouzlo Expoloze dýk!`);
        } else if (this.stealth === 8) {
            // TODO - přidat kouzlo Tichá smrt
            console.log(`Naučil jsi se kouzlo Tichá smrt!`);
        }
    }

    gainMaxHp(amount) {
        this.maxHp += amount;
        console.log(`Tvé maximální zdraví se zvýšilo o ${amount} na ${this.maxHp}`);
    }

    gainHp(amount) {
        if (this.hp + amount > this.maxHp) {
            this.hp = this.maxHp;
            console.log(`Tvé zdraví se zvýšilo na ${this.hp}`);
        } else {
            this.hp += amount;
            console.log(`Tvé zdraví se zvýšilo o ${amount} na ${this.hp}`);
        }
    }

    gainMaxShield(amount) {
        this.maxShield += amount;
        console.log(`Tvůj magický štít se zvýšil o ${amount} na ${this.maxShield}`);
    }

    gainShield(amount) {
        if (this.shield + amount > this.maxShield) {
            this.shield = this.maxShield;
            console.log(`Tvůj magický štít se obnovil na ${this.shield}`);
        } else {
            this.shield += amount;
            console.log(`Tvůj magický štít se zvýšil o ${amount} na ${this.shield}`)
        }
    }

    gainMaxMana(amount) {
        this.maxMana += amount;
        this.mana = this.maxMana;
        console.log(`Tvá maximální mana se zvýšila o ${amount} na ${this.maxMana}`);
    }

    gainMana(amount) {
        if (this.mana + amount > this.maxMana) {
            this.mana = this.maxMana;
            console.log(`Tvá mana se zvýšila na ${this.mana}`);
        } else {
            this.mana += amount;
            console.log(`Tvá mana se zvýšila o ${amount} na ${this.mana}`);
        }
    }

    gainDamage(amount) {
        this.damage += amount;
        console.log(`Tvé poškození se zvýšilo o ${amount} na ${this.damage}`);
    }

    gainSpellDamage(amount) {
        this.spellDamage += amount;
        console.log(`Tvé magické poškození se zvýšilo o ${amount} na ${this.spellDamage}`);
    }

    levelUp() {
        if (this.level <= this.maxPlayerLevel) {
            console.log(`LEVEL UP!!!`);
            this.gainMaxHp(5);
            this.gainMaxMana(5);
            this.gainDamage(1);
            this.gainSpellDamage(0.1);
            this.level += 1;
            console.log(`Extra vylepšení: `);
            console.log(`1. Síla`);
            console.log(`2. Inteligence`);
            console.log(`3. Nenápadnost`);
            let option = parseInt(prompt(`Vyber vlastnost k vylepšení: `));
            while (isNaN(option) || option < 1 || option > 3) {
                option = parseInt(prompt(`Vyber vlastnost k vylepšení (1 - 3): `));
            }
            if (option === 1) {
                this.gainStrength(1);
                this.gainDamage(1);
                this.gainMaxHp(5);
            } else if (option === 2) {
                this.gainIntelligence(1);
                this.gainSpellDamage(0.1);
                this.gainMaxShield(2);
                this.gainShield(this.maxShield);
                this.gainMaxHp(2);
                this.gainMaxMana(5);
            } else {
                this.gainStealth(1);
                this.gainMaxHp(2);
                this.gainMaxMana(2);
                this.gainDamage(0.5);
                this.gainSpellDamage(0.05);
                this.gainMaxShield(1);
                this.gainShield(this.maxShield);
            }
            this.gainHp(this.maxHp);
            this.gainMana(this.maxMana);
        } else {
            console.log(`Maximální úroveň již byla dosažena.`)
        }
    }
}

// Exports
module.exports = Character;
