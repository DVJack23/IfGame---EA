// IMPORT: monsters
const prompt = require('prompt-sync')();

function finalFight(hero, mob, threshold) {
    console.log(`1. Začít souboj.`)
    let option = parseInt(prompt(`Zadej svou volbu (1): `));
    while (isNaN(option) || option !== 1) {
        option = parseInt(prompt(`Zadej svou volbu (1): `));
    }
    hero.inFight = true;
    let counter = 1;
    let fight = true;
    while(fight) {
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
        console.log("[1] Zaútočit zbraní   [2] Použít kouzlo   [3] Použít předmet");
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
            console.log("Zvolili jste možnost 3.")
        }

        if (mob.name === "Tenebris" || mob.name === "Kordak - Lovec stínů") {
            if (mob.hp <= (mob.maxHp * threshold)) {
                mob.castSpell(hero);
                fight = false;
            } else {
                if (mob.spell) {
                    mob.castSpell(hero);
                } else {
                    mob.attack(hero);
                }
                if (!hero.isAlive()) {
                    fight = false;
                } else {
                    console.log(`Konec kola č. ${counter}`);
                    counter++;
                    hero.cooldown++;
                    mob.cooldown++;
                }
            }

        }

        if (mob.name === "Tenebris - Pán Stínů" || mob.name === "Kordak - Pán vlkodlaků") {
            if (mob.spell) {
                mob.castSpell(hero);
            } else {
                mob.attack(hero)
            }
            if (hero.hp <= (hero.maxHp * threshold)) {
                fight = false;
            } else if (!mob.isAlive()) {
                fight = false;
            } else {
                console.log(`Konec kola č. ${counter}`);
                counter++;
                hero.cooldown++;
                mob.cooldown++;
            }
        }

        console.log(`1. Pokračovat.`)
        let option = parseInt(prompt(`Zadej svou volbu (1): `));
        while (isNaN(option) || option !== 1) {
            option = parseInt(prompt(`Zadej svou volbu (1): `));
        }
    }
    // END OF FIGHT
    hero.inFight = false;
}

module.exports = finalFight;