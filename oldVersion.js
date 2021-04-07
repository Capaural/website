const express = require('express');
const cors = require('cors');
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
function getDataFromServer(res) {
    // classementDB.once('value', (snapshot) => {
    //     snapshot.val().forEach(rank => {
    //         classement.push({ "name": rank.name, "score": rank.score });
    //     });

    //     if (classement[0].name == null || classement[0].score) {
    //         res.status(401).json({ "result": "Invalid data..." });
    //     }

    //     let i = 0;
    //     while (i < 10 && !(classement[i].name === userRank.name && classement[i].score === userRank.score)) {
    //         i++;
    //     }

    //     if (i != 10) {
    //         res.status(401).json({ "result": "Invalid data..." });
    //     } else {
    //         updateRanking(res);
    //     }
    // });
    classementDB.once("value", function (data) {
        data.val().forEach(rank => {
            classement.push({ "name": rank.name, "score": rank.score });
        });
        if (classement.length != 10 || classement[0].name == null || classement[0].score == null) {
            res.status(401).json({ "result": "Invalid data..." });
        }

        let i = 0;
        while (i < 10 && !(classement[i].name === userRank.name && classement[i].score === userRank.score)) {
            i++;
        }

        if (i != 10) {
            res.status(401).json({ "result": "Invalid data..." });
        } else {
            updateRanking(res);
        }
    });
}

// Créer le nouveau classement
function updateRanking(res) {
    classement.push(userRank);
    classement = classement.sort((a, b) => b.score - a.score);
    classement.pop();
    changeClassement(res);
}

// Enregistrer le nouveau classement sur le serveur
function changeClassement(res) {
    for (let i = 0; i < 10; i++) {
        classementDB.child(i)
            .update(classement[i]);
    }
    res.status(200).json({ "users": userRank });
}

// Fonction de dechiffrement des données recues depuis le client pour verifier si elles sont legit
function checkValidity(data) {
    try {
        const decodedToken = jwt.verify(data, PRIVATE_KEY);
        userRank = { "name": decodedToken.name, "score": decodedToken.score };
        return true;
    } catch {
        return false;
    }
}

app.use(express.json());

app.use(cors({ credentials: true, origin: true }));

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

app.post("/", (req, res) => {
    if (req.body.data != null && !checkValidity(req.body.data)) {
        res.status(401).json({ "result": "Invalid data..." });
    } else {
        getDataFromServer(res);
    }
});



module.exports = app;