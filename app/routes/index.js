const express = require('express');
const router = express.Router();

module.exports = app => {

    const serverEvents = require('app/routes/server-events')(router);

    app.use('/server-events', serverEvents);

};