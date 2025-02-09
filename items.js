// IMPORTS
const Item = require('./item.js');
const player = require('./player.js');
const enemy = require('./enemy.js');

const items = {
//ACT 1
    dagger: new Item(
        // ACT 1
        'Dýka',
        1,
        "zbraň",
        [1],
        `Malá dýka přidávající +1 k poškození`,
        () => {
            player.damage += items.dagger.values[0];
            console.log(`Nasadil sis malou dýku, která ti přidává +${items.dagger.values[0]} k poškození`);
        },
        false,
        () => {
            player.damage -= items.dagger.values[0];
        },
        null
    ),
//ACT 1
    rustySword: new Item(
        'Rezavý meč',
        2,
        "zbraň",
        [2],
        "Velký a rezavý meč přidávající +2 k poškození",
        () => {
            player.damage += items.rustySword.values[0];
            console.log(`Nasadil sis rezavý meč, který ti přidává +${items.rustySword.values[0]} k poškození`);
        },
        false,
        () => {
            player.damage -= items.rustySword.values[0];
        },
        null
    ),
//ACT 2
    shortSword: new Item(
        'Krátký meč',
        2,
        "zbraň",
        [3],
        "Krátký meč přidávající +3 k poškození",
        () => {
            player.damage += items.shortSword.values[0];
            console.log(`Nasadil sis krátký meč, který ti přidává +${items.shortSword.values[0]} k poškození`);
        },
        false,
        () => {
            player.damage -= items.shortSword.values[0];
        },
        null
    ),
//ACT 2
    saber: new Item(
        'Mučitelova šavle',
        3,
        "zbraň",
        [3,1],
        "Mučitelova šavle přidávající +3 k poškození a +1 ke štítu.",
        () => {
            player.damage += items.saber.values[0];
            player.maxShield += items.saber.values[1];
            console.log(`Nasadil sis mučitelovu šavli, která ti přidává +${items.saber.values[0]} k poškození a + ${items.saber.values[1]} ke štítu.`);
        },
        false,
        () => {
            player.damage -= items.saber.values[0];
            player.maxShield -= items.saber.values[1];
        },
        null
    ),
//ACT 2
    staff: new Item(
        'Kamenná hůl',
        3,
        "zbraň",
        [3,5],
        "Kamenná hůl přidávající +3 k poškození a +5 k štítu",
        () => {
            player.damage += items.staff.values[0];
            player.maxShield += items.staff.values[1];
            console.log(`Nasadil sis kamennou hůl, která ti přidává +${items.staff.values[0]} k poškození a +${items.staff.values[1]} k štítu.`);
        },
        false,
        () => {
            player.damage -= items.staff.values[0];
            player.maxShield -= items.staff.values[1];
        },
        null
    ),
//ACT 3
    knife: new Item(
        'Vrhací nůž',
        1,
        "spotřební",
        [10],
        "Vrhací nůž, který způsobí +10 poškození nepříteli, pokud jsi v boji.",
        null,
        false,
        null,
        () => {
            if (player.isFighting()) {
                enemy.takeDamage(items.knife.values[0]);
                console.log(`Hodil jsi vrhací nůž, způsobil jsi +${items.knife.values[0]} poškození nepříteli.`);
                return true;
            } else {
                return false;
            }
        }
    ),
//ACT 3
    steelSword: new Item(
        'Ocelový meč',
        3,
        "zbraň",
        [7],
        "Ocelový meč přidávající +7 k poškození",
        () => {
            player.damage += items.steelSword.values[0];
            console.log(`Nasadil sis ocelový meč, který ti přidává +${items.steelSword.values[0]} k poškození`);
        },
        false,
        () => {
            player.damage -= items.steelSword.values[0];
        },
        null
    ),
//ACT 3
    butcherKnife: new Item(
        'Porcovací nůž',
        2,
        "zbraň",
        [4,5],
        "Ostrý porcovací nůž, který přidává +4 k poškození a +5 k životům.",
        () => {
            player.damage += items.butcherKnife.values[0];
            player.maxHp += items.butcherKnife.values[1];
            console.log(`Nasadil sis porcovací nůž, který ti přidává +${items.butcherKnife.values[0]} k poškození a +${items.butcherKnife.values[1]} k životům`);
        },
        false,
        () => {
            player.damage -= items.butcherKnife.values[0];
            player.maxHp -= items.butcherKnife.values[1];
        },
        null
    ),
//ACT 3
    wizardStaff: new Item(
        "Čarodějova hůl",
        3,
        "zbraň",
        [5, 0.3],
        "Magická hůl čaroděje, která ti přidává +5 poškození a +0.2 k poškození kouzel.",
        () => {
            player.damage += items.wizardStaff.values[0];
            player.spellDamage += items.wizardStaff.values[1];
            console.log(`Nasadil jsi Čarodějovu hůl, která ti přidává +${player.damage += items.wizardStaff.values[0]} k poškození a +${player.spellDamage += items.wizardStaff.values[1]} k poškození kouzel.`);
        },
        false,
        () => {
            player.damage -= items.wizardStaff.values[0];
            player.spellDamage -= items.wizardStaff.values[1];
        },
        null
    ),
//ACT 3
    potionOfStrength: new Item(
        "Lektvar síly",
        1,
        "spotřební",
        [2],
        "Lektvar, který ti zvýší poškození +2.",
        null,
        false,
        null,
        () => {
            player.gainDamage(items.potionOfStrength.values[0]);
            return true;
        }
    ),

//ACT 1
    chocolateBar: new Item(
        "Čokoládová tyčinka",
        1,
        "spotřební",
        [5],
        "Sladká a lahodná čokoládová tyčinka, která ti obnoví 5 zdraví",
        null,
        false,
        null,
        () => {
            player.gainHp(items.chocolateBar.values[0]);
            return true;
        }
    ),

//ACT 1
    heal1Potion: new Item(
        "Lektvar zdraví",
        1,
        "spotřební",
        [10],
        "Lektvar zdraví, který ti obnoví 10 zdraví",
        null,
        false,
        null,
        () => {
            player.gainHp(items.heal1Potion.values[0]);
            return true;
        }
    ),
//ACT 2
    heal2Potion: new Item(
        "Lektvar zdraví",
        1,
        "spotřební",
        [15],
        "Lektvar zdraví, který ti obnoví 15 zdraví",
        null,
        false,
        null,
        () => {
            player.gainHp(items.heal2Potion.values[0]);
            return true;
        }
    ),
//ACT 3,4
    heal3Potion: new Item(
        "Lektvar zdraví",
        1,
        "spotřební",
        [20],
        "Lektvar zdraví, který ti obnoví 20 zdraví",
        null,
        false,
        null,
        () => {
            player.gainHp(items.heal3Potion.values[0]);
            return true;
        }
    ),
//ACT 2
    water: new Item(
        "Voda",
        1,
        "spotřební",
        [10],
        "Voda, která ti obnoví 10 many",
        null,
        false,
        null,
        () => {
            player.gainMana(items.water.values[0]);
            return true;
        }
    ),
//ACT 2
    foodSupply: new Item(
        "Zásoba jídla",
        1,
        "spotřební",
        [10],
        "Zásoba jídla, která ti obnoví 10 zdraví",
        null,
        false,
        null,
        () => {
            player.gainHp(items.foodSupply.values[0]);
            return true;
        }
    ),
//ACT 3
    healingPotion: new Item(
        "Léčivý lektvar",
        1,
        "spotřební",
        [25],
        "Léčivý lektvar, který ti obnoví 25 zdraví",
        null,
        false,
        null,
        () => {
            player.gainHp(items.healingPotion.values[0]);
            return true;
        }
    ),
//ACT 3
    oldFood: new Item(
        "Staré jídlo",
        1,
        "spotřební",
        [10],
        "Staré jídlo, které ti obnoví 10 zdraví",
        null,
        false,
        null,
        () => {
            player.gainHp(items.oldFood.values[0]);
            return true;
        }
    ),
//ACT 3
    manaPotion: new Item(
        "Lektvar many",
        1,
        "spotřební",
        [20],
        "Lektvar many, který ti obnoví 20 many",
        null,
        false,
        null,
        () => {
            player.gainMana(items.manaPotion.values[0]);
            return true;
        }
    ),
//ACT 3
    nobleMeal: new Item(
        'Panské jídlo',
        1,
        "spotřební",
        [30],
        "Lahodné panské jídlo, které ti obnoví 30 zdraví.",
        null,
        false,
        null,
        () => {
            player.gainHp(items.nobleMeal.values[0]);
            return true;
        }
    ),
//ACT 3
    attackOrders: new Item(
        "Rozkazy k útoku",
        1,
        "quest",
        "Tajné rozkazy k útoku.",
        null,
        null,
        false,
        null
    ),
//ACT 3
    protectiveAmulet: new Item(
        'Ochranný amulet',
        1,
        "spotřební",
        [5],
        "Ochranný amulet, který ti přidá +5 k štítu.",
        null,
        false,
        null,
        () => {
            player.maxShield += items.protectiveAmulet.values[0];
            console.log(`Použil jsi Ochranný amulet, tvůj štít se zvýšil o ${items.protectiveAmulet.values[0]}.`);
            return true;
        }
    ),
//ACT 3
    snakeVenom: new Item(
        'Hadí jed',
        1,
        "spotřební",
        [2],
        "Hadí jed, který zvyšuje poškození aktuálně vybavené zbraně o +2.",
        null,
        false,
        null,
        () => {
            if (player.inventory.mainHand !== null) {
                player.inventory.mainHand.values[0] += items.snakeVenom.values[0];
                player.gainDamage(items.snakeVenom.values[0]);
                return true;
            } else {
                console.log(`Nemáš vybavenou žádnou zbraň, hadí jed nelze použít.`);
                return false;
            }
        }
    )
};


module.exports = items;
