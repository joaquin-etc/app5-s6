//Joaquin Faundez et Adam Beliveau
//app5_s6gi fauj3006 bela1003

const http = require('http');
const mqtt = require('mqtt');

var Particle = require('particle-api-js');
var particle = new Particle();

const TOKEN = "5e3ee6f205bc8d5e39905cea2350ef6574bd2212";
const topic = "app5s6_fauj3006_bela1003";

const client = mqtt.connect('mqtt://broker.mqttdashboard.com');

//lorsque le client se connecte au broker, il attend de recevoir un eventStream
//s'il recoit Entered ou Left, il publie l'event selon le topic défini plus haut
client.on('connect', () => {
    const publishData = (stream) => {
        stream.on('event', function (event) {
            const data = `${event.name}/${event.data}`;
            client.publish(topic, data);
        });
    }

    particle.getEventStream({ name: 'Entered', auth: TOKEN }).then(publishData);

    particle.getEventStream({ name: 'Left', auth: TOKEN }).then(publishData);
});

