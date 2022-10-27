import { Box, propNames, useComponentStyles__unstable } from '@chakra-ui/react';
import { map } from 'leaflet';

import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';

import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Circle,
  useMapEvent,
} from 'react-leaflet';

// Dragable marker

// end
const MapreRender = ({ location, test }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(
      { lat: location.latitude, lng: location.longitude },
      map.getZoom()
    );
  }, [location]);
  return;
};

const DraggableMarker = ({ location }) => {
  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState({
    lat: location.latitude,
    lng: location.longitude,
  });
  const map = useMap();

  useEffect(() => {
    map.setView({ lat: position.lat, lng: position.lng }, map.getZoom());
  }, [position]);

  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>You are here!</Popup>
    </Marker>
  );
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
      <DraggableMarker location={location} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
