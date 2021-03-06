const express = require('express');
const conectarDB = require('./config/db');
//importar cors
const cors = require('cors');
//crear server 

const app = express();
//Conectar bd
conectarDB();
app.use(cors());
//Habilitar express.json
app.use(express.json({extended:true}));
//Puerto de la app
const PORT = process.env.PORT || 4000;

//importar rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/categorias',require('./routes/categorias'));
app.use('/api/productos',require('./routes/productos'));
app.use('/api/restaurant',require('./routes/restaurant'));
app.use('/api/img_products',require('./routes/img_products'));


//Definir la principal
app.get('/',(req,res)=>{
    res.send('Hola mundo');
})
//arrancar el server
app.listen(PORT,()=>{
    console.log(`el servidor está funcionando en el puerto ${PORT}`)
})