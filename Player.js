class Player {
    name;
    type;
    wins = 0;
    losses = 0;

    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    greet() {
        console.log(`\nHallo, ${this.name}!\n`);
    }
}

module.exports = Player;
