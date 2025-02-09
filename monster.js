// IMPORTS
const chalk = require('chalk');

// definování třídy - jedna příšera - Monster //
class Monster {
    constructor(name, hp, maxHp, strength, spell) {
        this.name = name;
        this.hp = hp;
        this.maxHp = maxHp;
        this.strength = strength;
        this.cooldown = 0;
        this.spell = spell;
    }

    // metoda na attack
    attack(Character) {
        if (this.hp > 0) {
            console.log(`⚔️ ${this.name} útočí!`)
            Character.takeDamage(this.strength);
        }
    }

    // metoda na přijetí damage
    takeDamage(damage) {
        if (this.hp > 0) {
            this.hp -= damage;
        }
        if (this.hp > 0) {
            console.log(`${this.name} obdržel ${damage} bodů poškození.`);
        } else if (this.hp <= 0) {
            console.log(`${this.name} obdržel ${damage} bodů poškození. ${this.name} BYL PORAŽEN.`);
        }
    }

    // metoda is Alive
    isAlive() {
        return this.hp > 0;
    }

    castSpell(target) {
        this.spell(target);
    }

    // show HP
    showHP() {
        let filledBlocks = this.hp;
        let emptyBlocks = this.maxHp - filledBlocks;
        let healthBar = chalk.bgRed(` `.repeat(filledBlocks)) + chalk.bgWhite(` `.repeat(emptyBlocks));
        console.log(`${this.name} – HP:   [${healthBar}] ${this.hp} / ${this.maxHp}`);
    }

    newMonster(monster) {
        this.name = monster.name;
        this.hp = monster.hp;
        this.maxHp = monster.maxHp;
        this.strength = monster.strength;
        this.spell = monster.spell;
        this.cooldown = monster.cooldown;
    }
}
// EXPORT
module.exports = Monster;