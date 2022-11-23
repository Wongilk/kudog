const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Contact } = require("../model/Contact");

router.post("", (req, res) => {
  const contact = new Contact(req.body);
  contact.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    else return res.status(200).json({ success: true });
  });
});

router.post("/getcontacts", (req, res) => {
  Contact.find((err, contactInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    else {
      return res.status(200).send({ success: true, contactInfo });
    }
  });
});

module.exports = router;
