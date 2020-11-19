// Servidor de Express
const express = require('express');
const app = express();

// Servidor de sockets
const server = require('http').createServer(app);

//Configuración del socket server
const io = require('socket.io')(server);

// Desplegar el directorio publico
app.use( express.static( __dirname + '/public') )

// client o socket
io.on('connection', ( socket ) => { 
    
    // socket.emit('mensaje-bienvenida', {
    //     msg: 'Bienvenido al server',
    //     fecha: new Date()
    // });

    // socket.on('Respuesta', (data)=>{
    //     console.log(data);
    // })
    socket.on('mensaje-to-server', (data)=>{

        // socket.emit('mensaje-from-server', data);
        // io muestra a todos los que estan aqui
        io.emit('mensaje-from-server', data);
    })
 });

server.listen(8080, ()=> {
    console.log('Server corriendo en el puerto 3000')
});