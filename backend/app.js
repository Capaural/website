const express = require('express');
var admin = require("firebase-admin");
var serviceAccount = require("./private/serviceAccountKey.json");
var Rank = require('./models/rank.model');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capaural-717e1.firebaseio.com"
});

var db = admin.database();


const app = express();

var classementDB = db.ref('classement/');

var classement;

function getDataFromServer(res) {
    classementDB.on('value', (snapshot) => {
        res.status(200).json({"users":snapshot.val()});
    });
}

function changeClassement() {
    const test = new Rank("victor",42);
    var usersRef = classementDB.child("1");
    usersRef.update(test);
      
}

function checkValidity(data) {
    return true;
}

app.use((req, res) => {
    if (!checkValidity("Les données recues")) {
        res.status(401).json({"result":"Invalid data..."});
    } else {
        changeClassement();
        getDataFromServer(res);
    }
});

module.exports = app;