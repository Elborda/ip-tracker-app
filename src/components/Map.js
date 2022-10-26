import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';

import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
const MapreRender = ({ location }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(
      { lat: location.latitude, lng: location.longitude },
      map.getZoom()
    );
  }, [location]);
  return;
};

const Map = ({ location }) => {
  return (
    <MapContainer
      center={{
        lng: location.longitude,
        lat: location.latitude,
      }}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: '90vh', width: '100wh' }}
    >
      <MapreRender location={location} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={{
          lng: location.longitude,
          lat: location.latitude,
        }}
      >
        <Popup>You are here!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
