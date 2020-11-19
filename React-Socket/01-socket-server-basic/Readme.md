# Primer Proyecto

Basicamente cascaron de lo  que es socket.io

## Contiunuamos
Hicimos el server normal, de express, integramos lo que es socket.io, probamos con el html en la carpeta public. Creamos un formulario simple con Bootstrap 5, luego continuamos con lo que es en sí los sockets.

```
const io = require('socket.io')(server);

// Desplegar el directorio publico
app.use( express.static( __dirname + '/public') )


// client o socket
io.on('connection', ( socket ) => { 
    
    // emitir un mensaje del server al cliente
    socket.emit('mensaje-bienvenida', {
         msg: 'Bienvenido al server',
         fecha: new Date()
    });

    // recibir el mensaje del cliente

    socket.on('Respuesta', (data)=>{
         console.log(data);
     })

    // enviar varios mensajes
    socket.on('mensaje-to-server', (data)=>{
        // io muestra a todos los que está
        io.emit('mensaje-from-server', data);
    })
 });
```

Luego lo pasamos a clases para que sea más reutilizable y manejable.

Instalamos dotenv

