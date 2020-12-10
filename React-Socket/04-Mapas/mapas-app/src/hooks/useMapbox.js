import { useCallback, useRef, useState, useEffect } from "react";
import { v4 } from 'uuid'
import mapboxgl from 'mapbox-gl'
import { Subject } from "rxjs";

mapboxgl.accessToken = 'pk.eyJ1IjoianVhbm1haWJhciIsImEiOiJja2lpMzhyNWkwamJ5MnFwZWo2NjE3NWNiIn0.PiRK4Nx5CxDEBGhqqSemYQ';


export const useMapbox = ( puntoInicial ) => {

    // Referencia al Div del mapa
    const mapaDiv = useRef();
    const setRef = useCallback( (node)=> {
        mapaDiv.current = node;
    },[])

    // Referencia a los Marcadores
    const marcadores = useRef({});

    // Observables de Rxjs
    const movimientoMarcador = useRef( new Subject() );;
    const nuevoMarcador = useRef( new Subject() );


    // Mapa y Coords
    const mapa = useRef();
    const [ coords, setCoords] = useState( puntoInicial )


    // funcion para agregar marcadores
    const agregarMarcador = useCallback( (ev) => {
        const { lng, lat } = ev.lngLat;
        const marker = new mapboxgl.Marker();
        marker.id = v4(); 

        marker
            .setLngLat([ lng, lat ] )
            .addTo( mapa.current )
            .setDraggable( true );

        // Asignamos al objeto de marcadores
        marcadores.current[ marker.id ] = marker;

        nuevoMarcador.current.next( marker );

        // Escuchar movimientos del marcador
        marker.on('drag', ({ target }) => {
            const { id } = target;
            const { lng, lat } = target.getLngLat();

            movimientoMarcador.current.next({ id, lng, lat });
            
        })

    },[])

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapaDiv.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [ puntoInicial.lng, puntoInicial.lat ],
            zoom: puntoInicial.zoom
        });
        mapa.current = map;
    }, [ puntoInicial ]);


    // Cuando se mueve
    useEffect(() => {

        // pregunto si existe, tarda más que el useEffect de arriba.
        mapa.current?.on('move', ()=>{
            const {lng, lat } = mapa.current.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2),
            })
        });

    }, [])

    // Agregar Marcadores/Señalizadores cuando hago click
    useEffect(() => {

        // mapa.current?.on('click', ( ev )=> {
        //     agregarMarcador(ev);
        // })
        mapa.current?.on('click', agregarMarcador);
        
    }, [agregarMarcador]);

    return {
        agregarMarcador,
        coords,
        marcadores,
        nuevoMarcador$: nuevoMarcador.current,
        movimientoMarcador$: movimientoMarcador.current,
        setRef
    }
}
