const readline = require('readline');
const Player = require('./Player');
const RockPaperScissors = require('./RockPaperScissors');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let PlayerType = {
    1: 'Mensch',
    2: 'Computer'
}

let players = [];
let move = "Hallo"
let playerToCreate = {};

// Kann später wieder weg
let player = {
    name: 'Hallo'
}

let playerCount = 0;
let actualCount = 0;

let PlayerMove = {
    1: 'Rock',
    2: 'Paper',
    3: 'Scissors'
}

newPlayer(); // Starten Sie die Abfrage

function newPlayer() {
    console.log('\n\nMit >"Ende"< programm beenden!');
    setPlayerCount();
}

function setPlayerCount() {
    rl.question('\nGeben Sie die >Anzahl< der Mitspieler an: ', (count) => {
        evaluateStop(count);
        let newcount = count.trim();
        if (newcount === ''){
                console.log('Sie müssen eine Zahl eingeben!');
                setPlayerCount();
                return;
        } else if (count >=1) {
                playerCount = count;
                if (count < 2) {
                    setNewComputer();
                } else {
                    setNewPlayer();
                }
        } else {
            console.log('Sie müssen eine Zahl eingeben!');
            setPlayerCount();
        }
    });
}

function setNewComputer() {
    if (playerCount <= 1) {
        playerToCreate = {
            name: 'Clyde',
            type: 'Computer'
        };

        console.log("Ein Computer wurde hinzugefügt...\n");
        createNewPlayerInstance();
        return
    }
}

function setNewPlayer() {
    // Wird solange ausgeführt, bis sämtliche Mitspieler eingetragen wurden.
    if (actualCount < playerCount) {
        playerToCreate = {
            name: '',
            type: ''
        };
        actualCount++;
        setPlayerName();
        return;
    }
    
    // Wenn sämtliche Mitspieler eingetragen sind, machen wir eine kurze Liste der Mitspieler
    console.log("Wir haben folgende Mitspieler\n---------------------------------------------------");
    players.forEach(player => {
       console.log("Name: " + player.name + ' (' + player.type + ")\n");
    });
    console.log('---------------------------------------------------');
}

function setPlayerName() {
    rl.question('\nGeben Sie den >Namen< des Mitspielers ein: ', (name) => {
        evaluateStop(name);
        playerToCreate.name = name;
        setPlayerType();
    });
}

function setPlayerType() {
    rl.question('\nIst dieser Mitspieler ein Mensch = (1) ,oder ein Computer = (2)?: ', (typeID) => {
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
    newPlayer.wins++;
    newPlayer.greet();
    players.push(newPlayer);
    setNewPlayer();
}

function evaluateStop(entry) {
    if (entry.toLowerCase() === 'ende') {
        console.log('>Programm beendet.<');
        rl.close();
    }
}
