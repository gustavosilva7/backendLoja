import { produtos, usuarios } from '@prisma/client';
import * as ProdutosServices from './services/ProdutosServices'
import * as UsuariosServices from './services/UsuariosServices'
const express = require('express');
const server = express();
const path = require('path')
const multer = require('multer')



const storage = multer.diskStorage({
    destination: (req: any, file:any, cb:any) =>{
        cb(null, './images')
    },
    filename: (req: any, file: any, cb:any) =>{
        console.log(file)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

server.use(express.json());


server.set("view engine" , "ejs")
// Usuarios
server.get('/usuarios', async (req: any, res: any) => {
    let { pageSize = 10, pageNumber = 1 } = req.query;
    res.json(await UsuariosServices.findAllPaginated(
        Number(pageSize), Number(pageNumber)
    ));
})

server.post('/usuarios', async (req: any, res: any) => {
    try {
        let usuario: usuarios = req.body;
        res.json(await UsuariosServices.create(usuario));
    }
    catch (err) {
        res.send("erro");
    }
});


//Produtos
server.get('/produtos', async (req: any, res: any) => {
    res.json(await ProdutosServices.findAll())
})

server.post('/produtos', upload.single("image"), async (req: any, res: any) => {
    try {
        let produto: produtos = req.body;
        res.json(await ProdutosServices.create(produto))
    }
     catch (error) {
        res.json({ message: error })
    }
})

server.listen(1807);