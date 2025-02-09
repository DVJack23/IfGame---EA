// IMPORT
const storyParts = require('./storyParts.js');
const player = require('./player.js');
const newPlayer = require('./newplayer.js');
const prompt = require('prompt-sync')();

// FUNCTIONS
function menu() {
    console.clear();
    console.log(`HLAVNÍ NABÍDKA`);
    if (player.storyPart === partOne) {
        console.log(`1. Nová Hra 🌟`);
        console.log(`2. Načíst Hru ♻️`);
        console.log(`3. Uložit Hru 💾`);
        console.log(`4. Odejít🏃‍♀️💨`);
        let option = parseInt(prompt(`Vyber možnost: `));
        while (isNaN(option) || option < 1 || option > 4) {
            option = parseInt(prompt(`Vyber možnost (1 - 4): `));
        }
        console.log();
        // 1. NEW GAME
        if (option === 1) {
            let game = true;
            Object.assign(player, newPlayer);
            while (game) {
                game = storyTelling();
                console.log();
            }
            return true;
            // 2. LOAD GAME
        } else if (option === 2) {
            player.loadFromFile('./save.json');
            return true;
            // 3. SAVE GAME
        } else if (option === 3) {
            player.saveToFile('./save.json');
            return true;
            // 4. EXIT
        } else {
            console.log(`Opravdu chete odejít?`)
            let option = prompt(`Potvrď ano/ne: `);
            while (option !== "ano" && option !== "ne") {
                option = prompt(`Potvrď ano/ne: `);
            }
            return option !== "ano";
        }
    } else {
        console.log(`1. Pokračovat`);
        console.log(`2. Nová Hra`);
        console.log(`3. Načíst Hru`);
        console.log(`4. Uložit Hru`);
        console.log(`5. Odejít`);
        let option = parseInt(prompt(`Vyber možnost: `));
        while (isNaN(option) || option < 1 || option > 5) {
            option = parseInt(prompt(`Vyber možnost (1 - 5): `));
        }
        console.log();
        // 1. CONTINUE
        if (option === 1) {
            let game = true;
            while (game) {
                game = storyTelling();
                console.log();
            }
            return true;
            // 2. LOAD GAME
        } else if (option === 2) {
            let game = true;
            Object.assign(player, newPlayer);
            while (game) {
                game = storyTelling();
                console.log();
            }
            return true;
        } else if (option === 3) {
            player.loadFromFile('./save.json');
            return true;
            // 3. SAVE GAME
        } else if (option === 4) {
            player.saveToFile('./save.json');
            return true;
        } else {
            console.log(`Opravdu chcete odejít?`)
            let option = prompt(`Potvrď ano/ne: `);
            while (option !== "ano" && option !== "ne") {
                option = prompt(`Potvrď ano/ne: `);
            }
            return option !== "ano";
        }
    }
}

function storyTelling() {
    // 1. TELL STORY
    storyParts[player.storyPart].tellStory();
    // 2. CHECK PLAYER POSITION IN STORY PART
    if (player.position === 1) {
        // 3. CHECK IF ACTION
        if (storyParts[player.storyPart].action !== null) {
            storyParts[player.storyPart].useAction();
        }
        player.position = 2;
    }
    // 4. CHECK IS PLAYER IS ALIVE
    if (!player.isAlive()) {
        console.log(`ZEMŘEL JSI - KONEC HRY`)
        console.log(`1. Návrat do menu`);
        let option = parseInt(prompt(`Zadej svou volbu (1): `));
        while (isNaN(option) || option !== 1) {
            option = parseInt(prompt(`Zadej svou volbu (1): `));
        }
        Object.assign(player, newPlayer);
        return false;

    } // 5. CHECK END OF GAME
    else if (storyParts[player.storyPart].nextParts === `konec`) {
        console.log(`KONEC HRY`);
        console.log(`1. Návrat do menu`);
        let option = parseInt(prompt(`Zadej svou volbu (1): `));
        while (isNaN(option) || option !== 1) {
            option = parseInt(prompt(`Zadej svou volbu (1): `));
        }
        Object.assign(player, newPlayer);
        return false;
    } // 6. CONTINUE STORY
    else {
        let counter = 1;
        console.log(`\nVYBER ROZHODNUTÍ:  `);
        for (let option of storyParts[player.storyPart].options) {
            console.log(`${counter}. ${option}`);
            counter++;
        }
        console.log(`NEBO ZADEJ: `)
        console.log(`M - Menu 📜`);
        console.log(`I - Inventář 🎒`);
        console.log(`P - Postava 🎭`);
        let option = prompt(`Zadej svou volbu: `)
        while (!(
            (!isNaN(option) && option >= 1 && option <= counter - 1) || // Číslo v povoleném rozsahu
            option === "M" ||
            option === "I" ||
            option === "P"
        )) {
            option = prompt(`Zadej svou volbu (1 - ${counter - 1}), \n nebo M(Menu), I(Inventář), P(Postava): `);
        }
        // 7. SHOW MENU, INVENTORY, CHARACTER
        if (option === "M") {
            console.clear();
            return false;
        } else if (option === "I") {
            player.inventory.showInventory();
            console.log();
            return true;
        } else if (option === "P") {
            console.clear();
            player.__str__();
            console.log(`\n1. Zpět`)
            let option = parseInt(prompt(`Zadej svou volbu (1): `));
            while (isNaN(option) || option !== 1) {
                option = parseInt(prompt(`Zadej svou volbu (1): `));
            }
            console.log();
            return true;
        }
        // 8. CONTINUE STORY
        if (option <= counter && option > 0) {
            player.storyPart = storyParts[player.storyPart].nextParts[option - 1];
            player.position = 1;
            return true;
        }
    }
}

// VARIABLES
let partOne = `beg01`;

// APPLICATION
let launch = true;
while (launch) {
    launch = menu();
}



