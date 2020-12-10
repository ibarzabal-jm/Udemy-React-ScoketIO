import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'

 
mapboxgl.accessToken = 'pk.eyJ1IjoianVhbm1haWJhciIsImEiOiJja2lpMzhyNWkwamJ5MnFwZWo2NjE3NWNiIn0.PiRK4Nx5CxDEBGhqqSemYQ';

const puntoInicial = {
    lng: -58.4928,
    lat: -34.5781,
    zoom: 17
}

export const MapaPage = () => {

    const mapaDiv = useRef();
    const [ mapa , setMapa] = useState();
    const [ coords, setCoords] = useState( puntoInicial )

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ puntoInicial.lng, puntoInicial.lat ],
            zoom: puntoInicial.zoom
        });

        setMapa( map )
    }, [])


    useEffect(() => {

        // pregunto si existe, tarda más que el useEffect de arriba.
        mapa?.on('move', ()=>{
            const {lng, lat } = mapa.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.getZoom().toFixed(2),
            })
        });

        return mapa?.off('move');

    }, [mapa])

    return (
        <>
            <div className="info">
                Lng: { coords.lng } | lat: { coords.lat } | zoom: { coords.zoom }
            </div>
            <div
                ref={ mapaDiv }
                className="mapContainer"
            >
            </div>
        </>
    )
}
