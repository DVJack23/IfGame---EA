class StoryPart {
    constructor(text, action, enemy, options, nextParts) {
        this.text = text;
        this.action = action;
        this.enemy = enemy;
        this.options = options;
        this.nextParts = nextParts;
    }

    tellStory() {
        console.clear();
        console.log(`***************************** Příběh *****************************`)
        console.log(this.text);
        console.log(`***************************** Příběh *****************************`)

    }

    useAction() {
        if (this.action !== null) {
            this.action();
        }
    }
}

module.exports = StoryPart;