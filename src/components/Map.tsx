
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

const DEFAULT_MAPBOX_TOKEN = "pk.eyJ1IjoieWFvbW9vbiIsImEiOiJjbWJ5MjVleTIxa2t4Mmlwd2FxYXFtcWo3In0.Sj9Vwy2r-m3GkNdxpBNpqg";

const Map: React.FC<MapProps> = ({ userCoords, erranders = [] }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Get token from localStorage or use default
    let token = localStorage.getItem("mapbox_token");
    
    // If no token exists, try to use a default one (you should replace this with your actual token)
    if (!token) {
      // For now, we'll show a simple placeholder map message
      // In production, you should add your actual Mapbox public token here
      console.warn("No Mapbox token found. Map functionality will be limited.");
      setError("Map requires Mapbox token. Please contact administrator.");
      return;
    }

    try {
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

      map.current.on('load', () => {
        setIsMapReady(true);
        setError(null);
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setError('Failed to load map. Please check your connection.');
      });

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

    } catch (err) {
      console.error('Error initializing map:', err);
      setError('Failed to initialize map');
    }

    return () => {
      map.current?.remove();
    };
  }, [userCoords, erranders]);

  if (error) {
    return (
      <div className="relative w-full h-[440px] rounded-lg overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-gray-400 mb-2">🗺️</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Interactive map will be available once configured
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[440px] rounded-lg overflow-hidden shadow-md">
      <div ref={mapContainer} className="absolute inset-0" />
      {!isMapReady && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
