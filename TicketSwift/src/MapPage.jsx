// MapPage.js
import React, { useEffect } from 'react';

function MapPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&callback=initMap`;
    script.defer = true;
    script.async = true;

    window.initMap = () => {
      const uluru = { lat: -25.344, lng: 131.031 };
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru,
      });

      new google.maps.Marker({ position: uluru, map: map });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      window.initMap = undefined;
    };
  }, []);

  return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
}

export default MapPage;
