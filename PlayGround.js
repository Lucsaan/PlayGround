const readline = require('readline');
const Player = require('./Player');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let PlayerType = {
    1: 'Mensch',
    2: 'Computer'
}

let players = [];

let playerToCreate = {};

let playerCount = 0;
let actualCount = 0;

function newPlayer() {
    console.log('Sie können durch eintippen des wortes "ende" jederzeit das programm beenden!');
    setPlayerCount();
}

function setPlayerCount() {
    rl.question('Geben Sie die Anzahl der Mitspieler an: ', (count) => {
        evaluateStop(count);
        playerCount = count;
        setNewPlayer();
    });
}

function setNewPlayer() {
    // Wird solange ausgeführt, bis sämtliche Mitspieler eingetragen wurden.
    if (actualCount < playerCount) {
        playerToCreate = {
            name: '',
            type: ''
        };
        
        setPlayerName();
        return;
    }
    
    // Wenn sämtliche Mitspieler eingetragen sind, machen wir eine kurze Liste der Mitspieler
    console.log("Wir haben folgende Mitspieler\n---------------------------------------------------");
    players.forEach(player => {
       console.log("Name: " + player.name + ' (Typ: ' + player.type + ")\n");
    });
    console.log('---------------------------------------------------');
}

function setPlayerName() {
    rl.question('Geben Sie den Namen des Mitspielers ein: ', (name) => {
        evaluateStop(name);
        playerToCreate.name = name;
        setPlayerType();
    });
}

function setPlayerType() {
    rl.question('Ist dieser Mitspieler ein Mensch oder ein Computer? (1 = Mensch; 2 = Computer ): ', (typeID) => {
        evaluateStop(typeID)
        if (typeID < 1 || typeID > 2) {
            console.log('Bitte richtige Nummer eintippen');
            setPlayerType();
            return;
        }

        playerToCreate.type = PlayerType[typeID];
        createNewPlayerInstance();
    });
}

function createNewPlayerInstance() {
    let newPlayer = new Player(playerToCreate.name, playerToCreate.type);
    newPlayer.greet();
    players.push(newPlayer);
    actualCount++;
    setNewPlayer();
}

function evaluateStop(entry) {
    if (entry.toLowerCase() === 'ende') {
        console.log('Programm beendet.');
        rl.close();
    }
}

setPlayerCount(); // Starten Sie die Abfrage
