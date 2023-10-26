import { usuarios } from '@prisma/client';
import * as UsuariosServices from './services/UsuariosServices'
const express = require('express');
const server = express();
server.use(express.json());

server.get('/usuarios', async(req: any, res: any) => {
    res.json(await UsuariosServices.findAll());
})

server.post('/usuarios', async (req: any, res: any) => {
    try{
        let usuario:usuarios = req.body;
        res.json(await UsuariosServices.create(usuario));
    }
    catch(err) {
        res.send("erro");
    }
    
});

server.listen(1807);