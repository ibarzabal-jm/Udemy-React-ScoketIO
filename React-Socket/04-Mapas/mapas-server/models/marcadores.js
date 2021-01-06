

class Marcadores {

    constructor() {
        this.activos = {};
    }

    agregarMarcador( marcador ) {
        this.activos[ marcador.id ] = marcador;
        return marcador;
    }

    removerMarcador( marcador ){
        delete this.activos[ id ];
    }

    actualizarMarcador( marcador ){
        this.activos[ marcador.id ] = marcador;
    }


}


module.exports = Marcadores;