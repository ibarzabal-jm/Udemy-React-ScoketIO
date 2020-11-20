const BandList = require("./band-list");

class Sockets {

    constructor( io ) {

        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado');
            // Emitir al cliente conectado, todas las bandas actuales
            socket.emit('bands-list', this.bandList.getBands() );

            // votar por la banda
            socket.on( 'votar-banda', (id) => {
                this.bandList.increaseVotes(id);

                // para actualizar los datos y que sean a todos no usar socket, si no io
                this.io.emit('bands-list', this.bandList.getBands() );

            })
            // borrar banda
            socket.on( 'borrar-banda', (id) => {
                this.bandList.removeBand(id);
                this.io.emit('bands-list', this.bandList.getBands() );
            })

            //Cambiar el nombre de la banda
            socket.on( 'cambiarnombre-banda', ({id, nombre}) => {
                this.bandList.changeName(id, nombre);
                this.io.emit('bands-list', this.bandList.getBands() );
            })
            
            //Crear una nueva banda
            socket.on( 'crear-banda', ({ nombre }) => {
                this.bandList.addBand( nombre );
                this.io.emit('bands-list', this.bandList.getBands() );
            })
            
        });
    }


}


module.exports = Sockets;