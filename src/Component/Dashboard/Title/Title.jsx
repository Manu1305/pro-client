import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const IndiaMap = () => {
  return (
    <div className="india-map">
      <MapContainer
        center={[20.5937, 78.9629]} // Centered on India's coordinates
        zoom={5}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Example markers for cities */}
        <Marker position={[28.6139, 77.2090]}>
          <Popup>New Delhi</Popup>
        </Marker>
        <Marker position={[12.9716, 77.5946]}>
          <Popup>Bengaluru</Popup>
        </Marker>
        {/* Add more markers for other cities */}
      </MapContainer>
    </div>
  );
};

export default IndiaMap;
