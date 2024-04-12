import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import TicketSwiftLogo from '../TicketSwiftLogo.png';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../App.css';


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
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    const newDirectionsService = new routesLibrary.DirectionsService();
    const newDirectionsRenderer = new routesLibrary.DirectionsRenderer({ map });
    setDirectionsService(newDirectionsService);
    setDirectionsRenderer(newDirectionsRenderer);
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

  //Function to handle submit information
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <div style={{ position: 'absolute', top: 0, width: '100%', padding: '10px', backgroundColor: '#fff' }}>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <input
              type="text"
              name="from"
              placeholder="Enter start location"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
              style={{ padding: '10px', width: '40%' }}
            />
            <input
              type="text"
              name="to"
              placeholder="Enter end location"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              style={{ padding: '10px', width: '40%' }}
            />
            <button type="submit" style={{ padding: '10px 20px' }}>Go</button>
          </div>
        </form>
      </div>
  
      <div className="directions" style={{ marginTop: '60px' }}>
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
