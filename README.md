# Udemy-React-Scoket io
 Todo lo aprendido en el curso de Fernando Herrera.



## Teoria

### ¿Que es WebSocket?
WebSocket es una tecnología que hace posible establecer una conexión continua full-duplex, entre el cliente y el servidor.

### Comunicacion tradicional mediante servicio Rest:
La diferencia es que deberias poner un setInterval constante pidiendo información constantemente lo que haria que el 99.9% este pidiendo información. Lo cual es poco eficiente y consume mucho data.

### Comunicacion WebSockets, Full-Duplex:
El servidor y cliente pueden estar hablando entre si. Es util cuando hay nueva información en el servidor.

### Socket.io vs WebSockets:
Socket io ofrece creacion automatica de Namespaces, salas o grupos, emitir a grupos o a individuos, nos ayuda con información de latencia. Es una manera facil de trabajar con WebSockets (https://developer.mozilla.org/es/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications). 


Glosario de términos:
- Servidor: backend.
- Socket: Identificador de la conexión de un cliente.
- Cliente: Dipositivo conectado al servidor full duplex.
- Emitir: cliente que emite un evento.
- Evento: accion que el cliente o el servidor disparan.
- Escuchar: recibir la inforamción del evento.