// Class
class Item {
    constructor(name, size, type, values, description, onEquip, equipped, onUnEquip, action) {
        this.name = name;
        this.size = size;
        this.type = type;
        this.values = values;
        this.description = description;
        this.onEquip = onEquip || null;
        this.equipped = equipped;
        this.onUnEquip = onUnEquip || null;
        this.action = action || null;
    }

    useAction() {
        if (this.action !== null) {
            return this.action();
        }
    }
}

module.exports = Item;