//Spells
class Spell {
    constructor(name, mana, cooldown, description, damage = 0, extraDamage = 0, debuff = 0, buff = 0, actions = []) {
        this.name = name;
        this.mana = mana;
        this.cooldown = cooldown;
        this.description = description;
        this.damage = damage;
        this.extraDamage = extraDamage;
        this.debuff = debuff;
        this.buff = buff;
        this.actions = actions;
    }

    execute(player, enemy) {
        this.actions.forEach(action => action(player, enemy));
    }
}

class SpellBook {
    constructor() {
        this.spells = [];
    }

    addSpell(spell) {
        this.spells.push(spell);
        console.log(`Added spell: ${spell.name}`);
    }

    listSpells() {
        this.spells.forEach(spell => {
            console.log(`Name: ${spell.name}, Mana: ${spell.mana}, Cooldown: ${spell.cooldown}`);
            console.log(`Description: ${spell.description}`);
        });
    }
}

//
const player = {
    addHealth: (amount) => console.log(`Player healed by ${amount} HP.`),
    takeDamage: (amount) => console.log(`Player takes ${amount} damage.`)
};

const enemy = {
    takeDamage: (amount) => console.log(`Enemy takes ${amount} damage.`),
    reduceStrength: (amount) => console.log(`Enemy strength reduced by ${amount}.`)
};

//
const spellBook = new SpellBook();

spellBook.addSpell(new Spell(
    "Spark",
    15,
    5,
    "Udělá nepříteli 10 poškození.",
    10,
    0,
    0,
    0,
    [(player, enemy) => enemy.takeDamage(10)]
));

spellBook.addSpell(new Spell(
    "Fireball",
    15,
    5,
    "Udělá nepříteli 8 poškození plus 2 poškození za kolo.",
    8,
    2,
    0,
    0,
    [(player, enemy) => enemy.takeDamage(8)]
));

spellBook.addSpell(new Spell(
    "Shield",
    20,
    5,
    "Snižuje nepřátelovu sílu o 3.",
    0,
    0,
    3,
    0,
    [(player, enemy) => enemy.reduceStrength(3)]
));

spellBook.addSpell(new Spell(
    "Heal",
    25,
    6,
    "Doplní 20 životů.",
    0,
    0,
    0,
    20,
    [(player, enemy) => player.addHealth(20)]
));

spellBook.listSpells();
