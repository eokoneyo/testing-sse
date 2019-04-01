const { v4 } =  require('uuid');
const { Router } = require('express');

const severEventBaseHeaders = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
};

const DEFAULT_RETRY_CONFIG = 10000;

const messageHelper = (res, optns) => {

    const defaultOptns = {
        id: v4(),
        data: '',
        eventType: '',
        retry: DEFAULT_RETRY_CONFIG
    };

    if(!optns.data) throw new Error ('data must be provided!!');

    const message = { ...defaultOptns, ...optns};

    res.writeHead(200, {
        ...severEventBaseHeaders
    });

    const { id, data, eventType, retry } = message;


    if(id) res.write(`id: ${id}\n`);
    if(retry) res.write(`retry: ${retry}\n`);
    if(eventType) res.write(`event: ${eventType}\n`);
    res.write(`data: ${data} \n\n`);
};

module.exports = () => {

    const router = new Router();

    router.get('', (req, res) => {

        const userId = req.query['user-id'];
        const lastMessageId = req.get('Last-Event-ID');

        // add check for user id
        // This provides a basis for probably performing some authentication
        // or what not before sending a message back to the user
        if(userId) {

            if(lastMessageId) {
                //use last message id to do some look up for the next message to send if you may
                console.log('last event client received:: %s', lastMessageId);
            }

            setTimeout(() => messageHelper(res, {
                data: (new Date()).toLocaleTimeString(),
                retry: null,
            }), 10000);
        }
    });

    return router;
};