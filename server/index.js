const express = require("express");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();
const plivo = require("plivo");
let client = new plivo.Client(process.env.AUTH_ID, process.env.AUTH_TOKEN);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

app.post("/api/messages", (req, res) => {
  res.header("Content-Type", "application/json");
  client.messages
    .create(process.env.PHONE_NUMBER, req.body.to, req.body.body)
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.get("/api/messages", (req, res) => {
  // historical log of messages sent or received
  client.messages
    .list({
      offset: 0,
    })
    .then((response) => {
      res.send(JSON.stringify({ response }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
