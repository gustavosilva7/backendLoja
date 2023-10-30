import { produtos, usuarios } from '@prisma/client';
import * as ProdutosServices from './services/ProdutosServices'
import * as UsuariosServices from './services/UsuariosServices'
const express = require('express');
const server = express();
const path = require('path')
const multer = require('multer')
const url = require('url')
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req: any, file:any, cb:any) =>{
        cb(null, './images');
        req.extensionimg = path.extname(file.originalname);
    },
    filename: (req: any, file: any, cb:any) =>{
        cb(null, req.customFileName + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage})

server.use(express.json());

server.set('views', './views')
server.set("view engine" , "ejs")

server.get('/', async (req: any, res: any) => {
    res.render('index')
})

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

const extractFileName = (req:any, res:any, next:any) => {
    console.log(req)
    req.customFileName = ""+Date.now();
    next();
}


server.post('/produtos', extractFileName, upload.single("image"), async (req: any, res: any) => {
    try {
        let produto: produtos = req.params;
        produto.nome = req.body.nome;
        produto.descricao = req.body.descricao;
        produto.quantidade = Number(req.body.quantidade);
        produto.image = req.customFileName + req.extensionimg;
        let produtoDb: produtos | null = await ProdutosServices.create(produto);
        
        res.json(produtoDb)
    }
     catch (error) {
        res.json({ message: error })
    }
})

server.get('/produtos/:id', async(req:any, res:any) =>{
    res.json(await ProdutosServices.findIndex(Number(req.params.id)))
    // res.json(req.params.id)
})

server.get('/produtos/:id/image', async (req: any, res:any) =>{
    let product = await ProdutosServices.findIndex(Number(req.params.id))
    let query: any = url.parse(req.url,true).query;
    let pic = query.image;

//read the image using fs and send the image content back in the response
fs.readFile('images/' + product?.image, function (err: any, content: any) {
    if (err) {
        res.writeHead(400, {'Content-type':'text/html'})
        console.log(err);
        res.end("No such image");   
    } else {
        //specify the content type in the response will be an image
        res.writeHead(200,{'Content-type':'image/jpg'});
        res.end(content);
    }
});
})

server.listen(1807);