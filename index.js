const express = require('express');
const server = express();
server.use(express.json());
const geeks = [];

server.get('/geeks', (req, res) => {
    return res.json({geeks});
})
server.post('/geeks', (req, res) => {
    geeks.push(req.body);
    return res.json(req.body);
});

server.listen(1807);