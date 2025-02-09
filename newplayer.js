const Character = require("./character.js");
const Inventory = require('./inventory.js');
let playerInventory = new Inventory(10)

const newPlayer = new Character(
    `Jméno`,
    10,
    10,
    5,
    5,
    5,
    5,
    2,
    1.0,
    1,
    1,
    1,
    null,
    playerInventory,
    1,
    0,
    100,
    `beg01`,
    1
);

module.exports = newPlayer;