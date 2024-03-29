// src/MapPage.jsx

import React, { useEffect, useState } from 'react';

const MapPage = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    loadGoogleMapsAPI().then(() => {
      setMapLoaded(true);
    });
  }, []);

  const loadGoogleMapsAPI = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      script.async = true;
      window.initMap = () => resolve();
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    if (mapLoaded) {
      new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    }
  }, [mapLoaded]);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
};

export default MapPage;