import React, { useEffect }  from 'react'
import { useMapbox } from '../hooks/useMapbox';

const puntoInicial = {
    lng: -58.4928,
    lat: -34.5781,
    zoom: 16.11
}

export const MapaPage = () => {

    const { coords, setRef, nuevoMarcador$, movimientoMarcador$ } = useMapbox( puntoInicial );

    // Nuevo Marcador
    useEffect(() => {

        nuevoMarcador$.subscribe( marcador => {
            console.log('MapaPAge')
            console.log(marcador);
        })

    }, [nuevoMarcador$]);
    
    // Nuevo Marcador
    useEffect(() => {

        movimientoMarcador$.subscribe( marcador => {
            console.log(marcador.id);
        });

    }, [movimientoMarcador$]);


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
