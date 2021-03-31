const express = require('express');
var admin = require("firebase-admin");
var serviceAccount = require("./private/serviceAccountKey.json");
const PRIVATE_KEY = require('./private/key');
const jwt = require('jsonwebtoken');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://capaural-717e1.firebaseio.com"
});

var db = admin.database();

const app = express();

var classementDB = db.ref('classement/');

var classement = [];

var userRank;

// Récuperer le classement depuis le server
function getDataFromServer() {
    classementDB.on('value', (snapshot) => {
        snapshot.val().forEach(rank => {
            classement.push({ "name": rank.name, "score": rank.score });
        });
        updateRanking();
    });
}

// Créer le nouveau classement
function updateRanking() {
    classement.push(userRank);
    classement = classement.sort((a, b) => b.score - a.score);
    classement.pop();
    changeClassement();
}

// Enregistrer le nouveau classement sur le serveur
function changeClassement() {
    classementDB.set(classement);
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

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post("/", (req, res) => {
    if (req.body.data != null && !checkValidity(req.body.data)) {
        res.status(401).json({ "result": "Invalid data..." });
    } else {
        getDataFromServer();
        res.status(200).json({ "users": userRank });
    }
});

module.exports = app;