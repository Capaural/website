const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
var admin = require("firebase-admin");
var serviceAccount = require("./private/serviceAccountKey.json");
const PRIVATE_KEY = require('./private/key');
const jwt = require('jsonwebtoken');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://capaural-717e1.firebaseio.com"
});

var db = admin.database();

const app = express()
  .use(cors())
  .use(bodyParser.json());

var classementDB = db.ref('classement/');

var classement = [];

const sizeDB = 10;

var userRank;

// Récuperer le classement depuis le server
function getDataFromServer() {
    classementDB.once('value', (snapshot) => {
        console.log("firebase stop it now!!");
        snapshot.val().forEach(rank => {
            classement.push({ "name": rank.name, "score": rank.score });
        });

        if (checkRankValidity()) {
            updateRanking();
        }
        classement = [];
    });
}

function checkRankValidity() {
    let i = 0;
    while (i < sizeDB && !(classement[i].name == userRank.name && classement[i].score > userRank.score)) {
        i++;
    }
    return i == sizeDB;
}

// Créer le nouveau classement
function updateRanking() {
    let i = 0;
    while (i < sizeDB && classement[i].name != userRank.name) {
        i++;
    }

    if (i == sizeDB) {
        classement.push(userRank);
    } else {
        classement[i].score = userRank.score;
    }

    classement = classement.sort((a, b) => b.score - a.score);
    
    if (i == sizeDB) {
        classement.pop();
    }
    console.log(classement);
    changeClassement();
}

// Enregistrer le nouveau classement sur le serveur
function changeClassement() {
    for (let i = 0; i < sizeDB; i++) {
        classementDB.child(i).update(classement[i]);
    }
    classement = [];
}

// Fonction de dechiffrement des données recues depuis le client pour verifier si elles sont legit
function checkValidity(data) {
    try {
        const decodedToken = jwt.verify(data, PRIVATE_KEY);
        userRank = {"name": decodedToken.name,"score": decodedToken.score};
        return true;
    } catch {
        return false;
    }
}

function resetDB() {
    const alpha = "abcdefghijklmnopqrstuvwxyz";

    for (let i = 0; i < sizeDB; i++) {
        classementDB.child(i).update({
            "name": alpha.charAt(i),
            "score": i
        });
    }
}

app.use(express.json());

app.post("/", (req, res) => {
    if (req.body.data != null && !checkValidity(req.body.data)) {
        res.status(401).json({ "result": "Invalid data..." });
    } else {
        getDataFromServer();
        // resetDB();
        res.status(200).json({ "users": userRank });
    }
});

module.exports = app;