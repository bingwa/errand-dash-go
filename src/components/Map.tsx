
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type Errander = {
  id: string;
  name: string;
  coords: [number, number];
  avatarUrl?: string;
};

interface MapProps {
  userCoords?: [number, number];
  erranders?: Errander[];
}

const Map: React.FC<MapProps> = ({ userCoords, erranders = [] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    const token = localStorage.getItem("mapbox_token");
    if (!token) return;

    mapboxgl.accessToken = token;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: userCoords || [36.8219, -1.2921],
      zoom: 13,
      pitch: 45,
      attributionControl: false,
    });

    // Controls
    map.current.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), 'top-right');
    map.current.scrollZoom.enable();

    // User marker
    if (userCoords) {
      new mapboxgl.Marker({ color: "#2274a5" }).setLngLat(userCoords).setPopup(new mapboxgl.Popup().setText("You are here")).addTo(map.current);
    }

    // Errander "drivers"
    erranders.forEach(e =>
      new mapboxgl.Marker({ color: "#00b341" })
        .setLngLat(e.coords)
        .setPopup(new mapboxgl.Popup().setText(e.name))
        .addTo(map.current)
    );

    return () => {
      map.current?.remove();
    };
  }, [userCoords, erranders]);

  return (
    <div className="relative w-full h-[440px] rounded-lg overflow-hidden shadow-md">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;
