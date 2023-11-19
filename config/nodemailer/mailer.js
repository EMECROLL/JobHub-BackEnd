const nodemailer = require('nodemailer');
const express = require('express');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "empleos.jobhub@gmail.com",
        pass:  "kkyy fyny yszq fpbj"}
});

transporter.verify().then( () => {
    console.log('Ready for send mails');
})

module.exports = { transporter };