// src/MapPage.jsx
import React from 'react';
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';

function MapPage() {

  const position = {
    lat: 32.9857, // default latitude
    lng: -96.7502, // default longitude
  };

  return (
    <APIProvider apiKey={'AIzaSyBg10NuAAJhZGNyd9xQBU-Oy50kqSw5Deo'}>
      <Map defaultCenter={position} defaultZoom={15}>
        <Marker position={position} />
      </Map>
    </APIProvider>
  );
};

export default MapPage;