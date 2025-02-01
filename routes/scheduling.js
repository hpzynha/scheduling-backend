const express = require("express");
const Scheduling = require("../models/Scheduling");
const router = express.Router();

// Cria o agendamento
router.post("/", async (req, res) => {
  const scheduling = new Scheduling(req.body);
  await scheduling.save();
  res.status(201).send(scheduling);
});

// Lista os agendamentos

router.get("/", async (req, res) => {
  const schedulings = await Scheduling.find();
  res.send(schedulings);
});

// Enviar a mensagem para o Whatsapp
router.post("/:id/send-whatsapp", async (req, res) => {
  const scheduling = await Scheduling.findById(req.params.id);
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: `Lembrete de agendamento: ${scheduling.title} - ${scheduling.description}`,
      from: "whatsapp:+14155238886", // esse é o numero do Twilio
      to: `whatsapp:${scheduling.contactNumber}`,
    })
    .then((message) => {
      res.send({ message: "Mensagem enviada com sucesso!" });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
});

module.exports = router;
