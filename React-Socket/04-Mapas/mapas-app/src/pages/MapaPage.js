import React, { useContext, useEffect }  from 'react'
import { SocketContext } from '../context/SocketContext';
import { useMapbox } from '../hooks/useMapbox';

const puntoInicial = {
    lng: -58.4928,
    lat: -34.5781,
    zoom: 16.11
}

export const MapaPage = () => {

    const { 
            coords,
            setRef,
            nuevoMarcador$,
            movimientoMarcador$,
            agregarMarcador,
            actualizarPosicion 
        } = useMapbox( puntoInicial );

    const { socket } = useContext( SocketContext )

    // Escuchar los marcadores Activos
    useEffect(() => {
        socket.on('marcadores-activos', (marcadores) => {
            for (const key of Object.keys( marcadores ) ) {
                agregarMarcador( marcadores[key], key );
            }
        });
    }, [socket, agregarMarcador]);


    useEffect(() => {

        nuevoMarcador$.subscribe( marcador => {
            socket.emit('marcador-nuevo', marcador)
        })

    }, [nuevoMarcador$, socket]);
    

    useEffect(() => {

        movimientoMarcador$.subscribe( marcador => {
            socket.emit('marcador-actualizado', marcador);
        });

    }, [movimientoMarcador$, socket]);

    // Mover marcador mediante sockets
    useEffect(()=> {
        socket.on( 'marcador-actualizado' , (marcador) => {
            actualizarPosicion( marcador );
        })
    },[  socket, actualizarPosicion ]);

    // Escuchar nuevos Marcadores
    useEffect(() => {
        socket.on('marcador-nuevo', (marcador)=>{
            agregarMarcador( marcador, marcador.id );
        })
    }, [socket, agregarMarcador]);

    


    return (
        <>
            <div className="info">
                Lng: { coords.lng } | lat: { coords.lat } | zoom: { coords.zoom }
            </div>
            <div
                ref={ setRef }
                className="mapContainer"
            >
            </div>
        </>
    )
}
