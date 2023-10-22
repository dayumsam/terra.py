"use client"

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS;

export default function Mapbox() {
    const mapContainer = useRef(null);
    const map = useRef(null);

    // get lat long data
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(10);

    const coords = [[-70.9, 42.35], [-71.0, 42.35], [-70.8, 42.35]]

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.addControl(new mapboxgl.NavigationControl());

        coords.map((res) => new mapboxgl.Marker()
            .setLngLat(res)
            .addTo(map.current))
    });

    return (
        <div className='w-full h-full rounded-md overflow-hidden'>
            <div ref={mapContainer} className="map-container" />
        </div>
    )
}
