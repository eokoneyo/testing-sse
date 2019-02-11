
const { v4 } =  require('uuid');

const severEventBaseHeaders = {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
};

const messageHelper = (res, optns) => {

    const defaultOptns = {
        id: v4(),
        data: '',
        eventType: '',
        retry: ''
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

module.exports = (router) => {

    router.get('', (req, res) => {
        const userId = req.query['user-id'];

        // add check for user id
        // This provides a basis for probably performing some authentication
        // or what not before sending a message back to the user
        if(userId) {
            setTimeout(() => messageHelper(res, {
                data: 'Hi',
                retry: null,
            }), 5000);
        }
    });

    return router;
};