import { useEffect, useRef } from 'react';
import mapboxgl, { Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from '@/contexts/ThemeContext';

interface MapProps {
  userCoords?: [number, number];
  erranders: { id: string; name: string; coords: [number, number]; avatarUrl: string }[];
  mapboxToken?: string; // Token is now a prop
}

const Map = ({ userCoords, erranders, mapboxToken }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const { theme } = useTheme();

  // If no token is provided, show an error message.
  // This is the message you were seeing in the screenshot.
  if (!mapboxToken) {
    return (
      <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-lg">
        <div className="text-center text-gray-500 dark:text-gray-400 p-4">
          <p className="font-semibold">Map requires Mapbox token. Please contact administrator.</p>
          <p className="text-sm mt-1">Interactive map will be available once configured.</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // Ensure the map only initializes once
    if (map.current || !mapContainer.current) return; 

    // Set the token for Mapbox GL JS
    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/streets-v12',
      center: [-1.286389, 36.817223], // Default to Nairobi
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Cleanup on unmount
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [theme, mapboxToken]); // Re-run effect if theme or token changes

  // Update map style when theme changes
  useEffect(() => {
    if (map.current) {
      map.current.setStyle(theme === 'dark' ? 'mapbox://styles/mapbox/dark-v11' : 'mapbox://styles/mapbox/streets-v12');
    }
  }, [theme]);

  // Update map center and markers when coordinates change
  useEffect(() => {
    if (map.current) {
        if (userCoords) {
            map.current.flyTo({ center: userCoords, zoom: 14 });
            new Marker({ color: '#3b82f6' })
                .setLngLat(userCoords)
                .setPopup(new mapboxgl.Popup().setText('Your Location'))
                .addTo(map.current);
        }

        // Add markers for errand runners
        erranders.forEach(errander => {
            new Marker()
                .setLngLat(errander.coords)
                .setPopup(new mapboxgl.Popup().setText(errander.name))
                .addTo(map.current!);
        });
    }
  }, [userCoords, erranders]);

  return <div ref={mapContainer} className="h-full w-full rounded-lg" />;
};

export default Map;
