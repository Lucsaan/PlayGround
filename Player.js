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
        console.log(`Hallo, ${this.name}!\n`);
    }
}

module.exports = Player;
