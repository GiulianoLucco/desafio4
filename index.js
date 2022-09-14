const express = require ('express')
const app = express();
const contenedor = require('./class/class')
const PORT = 8080
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const server = app.listen(PORT,()=>{
    console.log("Servidor Levantado");
});

app.use('/',express.static("public"))
const routerProductos = express.Router();



routerProductos.get('/',(req,res)=>{
    contenedor.getAll().then(product=>res.json(product))    
})

routerProductos.post('/', (req, res) => {
	console.log(req.body);
    contenedor.saveNew(req.body)   
	res.json({ mensaje: `Se agrego el producto ${JSON.stringify(req.body)}}` });
});

routerProductos.get('/:id',(req,res)=>{
    const id = Number(req.params.id) 
    contenedor.getById(id).then(productBuscado=>res.json(productBuscado)??{error:"producto no encontrado"})
    
    })

routerProductos.delete('/:id',(req,res)=>{
    const id = Number(req.params.id)
    contenedor.deleteById(id).then(productDelete=>res.json(productDelete)??{error:"el id no existe"})
   
})

routerProductos.put('/:id',(req,res)=>{
    const id = Number(req.params.id)
    contenedor.productoModificar(id,(req.body)).then(product=>res.json(product))
    

    
})


app.use('/api/productos',routerProductos);
