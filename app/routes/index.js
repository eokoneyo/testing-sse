const { Router } = require('express');
const serverEvents = require('app/routes/server-events');

module.exports = () => {

   const router = new Router();

   router.use('/server-events', serverEvents());

   return router;
};