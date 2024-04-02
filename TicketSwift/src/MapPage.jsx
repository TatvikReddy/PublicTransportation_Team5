// src/MapPage.jsx
import React, { useEffect, useState, useRef } from 'react';

const center = { lat: 48.8584, lng: 2.2945 };

const MapPage = () => {
  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const originRef = useRef(null);
  const destinationRef = useRef(null);

  useEffect(() => {
    loadGoogleMapsAPI().then(() => {
      const loadedMap = new window.google.maps.Map(document.getElementById('map'), {
        center,
        zoom: 15,
      });
      setMap(loadedMap);
    });
  }, []);

  const loadGoogleMapsAPI = () => {
    return new Promise((resolve) => {
      if (window.google) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
      script.async = true;
      window.initMap = () => resolve();
      document.head.appendChild(script);
    });
  };

  async function calculateRoute() {
    if (originRef.current.value === '' || destinationRef.current.value === '') {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <input type="text" placeholder="Origin" ref={originRef} />
      <input type="text" placeholder="Destination" ref={destinationRef} />
      <button onClick={calculateRoute}>Calculate Route</button>
      <button onClick={clearRoute}>Clear</button>
      <p>Distance: {distance}</p>
      <p>Duration: {duration}</p>
      <div id="map" style={{ width: '100%', height: '100%' }} />
      {directionsResponse && (
        new window.google.maps.DirectionsRenderer({
          map,
          directions: directionsResponse,
        })
      )}
    </div>
  );
};

export default MapPage;
