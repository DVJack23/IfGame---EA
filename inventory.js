// IMPORT
const prompt = require('prompt-sync')();

class Inventory {
    constructor(maxSpace = 10) {
        this.items = [];
        this.mainHand = null;
        this.offHand = null;
        this.maxSpace = maxSpace;
        this.currentSpace = 0;
    }

    addItem(item) {
        if (this.currentSpace + item.size > this.maxSpace) {
            console.log("Nedostatek místa. Zde je váš inventář:");
            this.items.forEach((it, idx) => {
                console.log(`${idx + 1}: ${it.name} (Velikost: ${it.size}, Typ: ${it.type}) - ${it.description}`);
            });
            const replaceIndex = parseInt(prompt("Zadejte číslo předmětu, který chcete vyhodit, nebo 0 pro zrušení: "));
            if (replaceIndex > 0 && replaceIndex <= this.items.length) {
                this.removeItem(replaceIndex - 1);
            } else {
                console.log("Akce zrušena.");
                return;
            }
        }
        this.items.push(item);
        this.currentSpace += item.size;
        console.log(`Předmět ${item.name} byl přidán do inventáře.`);
    }

    removeItem(index) {
        const item = this.items[index];
        if (item.equipped === true) {
            item.onUnEquip();
        }
        this.items.splice(index, 1);
        this.currentSpace -= item.size;
        console.log(`Předmět ${item.name} byl odstraněn z inventáře.`);
    }

    useItem(index) {
        const item = this.items[index];
        if (item.action !== null) {
            let action = item.useAction();
            if (action === true) {
                this.removeItem(index);
            }
        } else {
            console.log(`${item.name} nelze použít.`);
        }
    }

    equip(index) {
        const item = this.items[index];
        if (item.equipped === false) {
            if (item.onEquip !== null) {
                const hand = parseInt(prompt("Na kterou ruku chcete vybavit? (1. hlavní/2. vedlejší): "));
                if (hand === 1) {
                    if (this.mainHand) {
                        this.mainHand.equipped = false;
                        this.mainHand.onUnEquip();
                    }
                    this.mainHand = item;
                    item.onEquip();
                    item.equipped = true;
                    console.log(`Předmět ${item.name} byl vybaven na hlavní ruku.`);
                } else if (hand === 2) {
                    if (this.offHand) {
                        this.offHand.equipped = false;
                        this.offHand.onUnEquip();
                    }
                    this.offHand = item;
                    item.onEquip();
                    item.equipped = true;
                    console.log(`Předmět ${item.name} byl vybaven na vedlejší ruku.`);
                } else {
                    console.log("Neplatná volba ruky.");
                }
            } else {
                console.log(`${item.name} nelze vybavit.`);
            }
        } else {
            console.log(`Předmět ${item.name} je již vybaven!`);
        }
    }

    showInventory() {
        if (this.items.length === 0) {
            console.log("Váš inventář je prázdný.");
        } else {
            console.log("Inventář:");
            this.items.forEach((item, index) => {
                console.log(`${index + 1}: ${item.name} (Velikost: ${item.size}, Typ: ${item.type}) - ${item.description}`);
            });
        }
        console.log(`Obsazeno: ${this.currentSpace}/${this.maxSpace}`);
        this.interactWithItem();
    }

    interactWithItem() {
        let selectedIndex;
        do {
            selectedIndex = parseInt(prompt(`Vyberte předmět pro interakci (1 - ${this.items.length}, nebo 0 pro návrat): `));
        } while (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex > this.items.length);

        if (selectedIndex === 0) {
            console.log("Návrat zpět.");
            return;
        }

        const item = this.items[selectedIndex - 1];
        console.log(`Vybráno: ${item.name}`);

        let action;
        do {
            console.log("Možnosti: 1 - Vybavit, 2 - Použít, 3 - Odstranit, 0 - Zpět");
            action = parseInt(prompt("Vyberte akci: "));
        } while (![0, 1, 2, 3].includes(action));

        switch (action) {
            case 1:
                this.equip(selectedIndex - 1);
                break;
            case 2:
                this.useItem(selectedIndex - 1);
                break;
            case 3:
                this.removeItem(selectedIndex - 1);
                break;
            case 0:
                console.log("Zpět do hlavní nabídky.");
                break;
        }
    }
}

module.exports = Inventory;

