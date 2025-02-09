// IMPORT: monster
const prompt = require('prompt-sync')();

function fight(hero, mob) {
    console.log(`1. Začít souboj.`)
    let option = parseInt(prompt(`Zadej svou volbu (1): `));
    while (isNaN(option) || option !== 1) {
        option = parseInt(prompt(`Zadej svou volbu (1): `));
    }
    hero.inFight = true;
    let counter = 1;
    while(hero.isAlive() && mob.isAlive()) {
        // round begins
        // HERO ATTACKS
        console.clear();
        console.log(`***************************** Kolo č. ${counter} ******************************`);
        console.log(`Aktuální stav bojujících:`);
        hero.showHP();
        hero.showShield();
        hero.showMana();
        mob.showHP();

        //action choices
        console.log("[1]🗡️Zaútočit zbraní   [2]✨  Použít kouzlo   [3]🎒 Použít předmet");
        // pick a choice
        let choice = parseInt(prompt("Napište odpovídající číslo pro zvolení akce: "));
        while (choice !== 1 && choice !== 2 && choice !== 3) {
            choice = parseInt(prompt("Zadali jste špatnou hodnotu. Zkuste to znovu: "));
        }
        if (choice===1) {
            console.log("Zvolili jste možnost 1.")
            hero.attack(mob);
        } else if (choice===2) {
            console.log("Zvolili jste možnost 2.")
            hero.castSpell(mob);
        } else if (choice===3) {
            hero.inventory.showInventory();
            console.log("Zvolili jste možnost 3.")
        }
        // MOB ATTACKS
        // console.log("~~~ TAH MONSTRA ~~~")
        if (mob.spell) {
            mob.castSpell(hero);
        } else {
            mob.attack(hero)
        }

        // END OF ROUND ACTIONS
        console.log(`Konec kola č. ${counter}`);
        // NEXT ROUND (if both alive)
        counter++;
        hero.cooldown++;
        mob.cooldown++;

        console.log(`1. Pokračovat.`)
        let option = parseInt(prompt(`Zadej svou volbu (1): `));
        while (isNaN(option) || option !== 1) {
            option = parseInt(prompt(`Zadej svou volbu (1): `));
        }
    }

    // END OF FIGHT (if one is not alive)
    if (hero.isAlive()) {
        console.log(`Porazili jste ${mob.name}!`);
        hero.gainShield(hero.maxShield);
        hero.inFight = false;
    } else {
        console.log(`${mob.name} Vás porazil!`);
    }
}

module.exports = fight;