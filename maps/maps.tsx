// /* 
// Since the map was loaded on client side, 
// we need to make this component client rendered as well else error occurs
// */
'use client'

// //Map component Component from library
// import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";

// //Map's styling
// export const defaultMapContainerStyle = {
//     width: '100%',
//     height: '80vh',
//     borderRadius: '15px 0px 0px 15px',
// };

// const MapComponent = () => {
//     return (
//         <div className="w-full">
//             <GoogleMap mapContainerStyle={defaultMapContainerStyle}>
//             </GoogleMap>
//         </div>
//     )
// };

// export { MapComponent };

import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { useState, useEffect } from 'react';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const center = { lat: 37.7749, lng: -122.4194 }; // fallback to San Francisco

const libraries: ("places")[] = ['places'];

interface MarkerType {
    lat: number;
    lng: number;
    time: Date;
    info: string;
  }

export default function Map() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [markers, setMarkers] = useState<MarkerType[]>([]);
  const [selected, setSelected] = useState<MarkerType | null>(null);
  const [userLocation, setUserLocation] = useState(center);

  // Center on user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  const handleMapClick = () => {
    console.log("clicked")
//     const newMarker = {
//       lat: e.latLng.lat(),
//       lng: e.latLng.lng(),
//       time: new Date(),
//       info: 'Custom info here',
//     };

//     // Save to backend
//     fetch('/api/markers', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newMarker),
//     });

//     setMarkers((prev) => [...prev, newMarker]);
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={userLocation}
      onClick={handleMapClick}
    >
      {markers.map((marker, idx) => (
        <Marker
          key={idx}
          position={{ lat: marker.lat, lng: marker.lng }}
          onClick={() => setSelected(marker)}
        />
      ))}

      {selected && (
        <InfoWindow
          position={{ lat: selected.lat, lng: selected.lng }}
          onCloseClick={() => setSelected(null)}
        >
          <div>
            <h2>Info</h2>
            <p>{selected.info}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}
