import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import TicketSwiftLogo from '../TicketSwiftLogo.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap
} from '@vis.gl/react-google-maps';

const API_KEY = 'AIzaSyBg10NuAAJhZGNyd9xQBU-Oy50kqSw5Deo';

const App = () => (
  <APIProvider apiKey={API_KEY}>
    <Map
      defaultCenter={{lat: 32.9857, lng: -96.7502}}
      defaultZoom={9}
      gestureHandling={'greedy'}
      fullscreenControl={false}>
      <Directions />
    </Map>
    <div id="sidepanel"></div>
    <Link to="/">
          <div className="logo-circle">
          <img src={TicketSwiftLogo} alt="logo" />
          </div>
           </Link>
  </APIProvider>
);

function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    
    directionsService
      .route({
        origin: '800 W Campbell Rd, Richardson, TX 75080',
        destination: '433 Coit Rd, Plano, TX 75075',
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true
      })
      .then(response => {
        directionsRenderer.setPanel(document.getElementById("sidepanel") as HTMLElement);
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>

      
    </div>
  );
}

export default App;

export function renderToDom(container: HTMLElement) {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}