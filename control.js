//Joaquin Faundez et Adam Beliveau
//app5_s6gi fauj3006 bela1003

const Particle = require('particle-api-js');
const express = require('express');
const cors = require('cors');

const particle = new Particle();
const app = express();
app.use(cors());

const device = 'fauj3006_argon';
const token = "5e3ee6f205bc8d5e39905cea2350ef6574bd2212";
const port = 3001;

app.listen(port, () =>
  console.log(`App listening on port ${port}!`),
);

//lorsque get/led est appelé, ca fait juste appeler la fonction exposée par le argon dans le .ino
app.get("/led", (req, res) => {
  particle.callFunction({ deviceId: device, name: 'led', argument: "hi", auth: token });
  return res.sendStatus(200);
});