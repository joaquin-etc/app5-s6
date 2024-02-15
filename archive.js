//Joaquin Faundez et Adam Beliveau
//app5_s6gi fauj3006 bela1003

const http = require('http');
const mqtt = require('mqtt');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

var app = express();
app.use(cors());

const client = mqtt.connect('mqtt://broker.mqttdashboard.com');

const port = 8080;
const topic = 'app5s6_fauj3006';
const file = './bd.txt';
var message = "";

app.listen(port, () => {
    console.log('Server started!')
})

app.get('/', (req, res) => {
    res.status(200).send({ activeDevices: message });

});

client.on('connect', () => {
    client.subscribe(topic);
});

//lorsqu'on recoit un message selon le topic, on prends la date-heure de la reception
//on ecrit cela + le data recu dans la "base de donnees" qui est le fichier txt
client.on('message', (topic, data) => {
    message = data.toString();
    const timestamp = Date.now();

    const dateObject = new Date(timestamp);
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const minutes = dateObject.getMinutes();
    const hours = dateObject.getHours();
    const seconds = dateObject.getSeconds();

    // prints date & time in YYYY-MM-DD format
    const dateTime = `${year}-${month}-${date}T${hours}:${minutes}:${seconds}`;
    fs.appendFile(file, `[${dateTime}]: ${message}\n`, function (err) {
        if (err) throw err;
        console.log('yeha!');
    });
});
