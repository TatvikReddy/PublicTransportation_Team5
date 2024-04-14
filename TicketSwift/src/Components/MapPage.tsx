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
import Autocomplete from "react-google-autocomplete";
const API_KEY = 'AIzaSyBg10NuAAJhZGNyd9xQBU-Oy50kqSw5Deo';

const App = () => (
  <APIProvider apiKey={API_KEY}>
    <Map
      defaultZoom={9}
      defaultCenter={{lat: 32.9857, lng: -96.7502}}
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
  const placesLibrary = useMapsLibrary('places');
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  var selected = routes[routeIndex];
  const leg = selected?.legs[0];
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  var origin = "800 W Campbell Rd, Richardson, TX 75080";
  var destination = "433 Coit Rd, Plano, TX 75075";

  //directionsRenderer?.setMap(null);

  function handleOriginPlace(place: string)
  {
    origin = place;
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true
      })
      .then(response => {
        directionsRenderer.setPanel(document.getElementById("sidepanel") as HTMLElement);
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
        console.log(response);
      });
  }
  function handleDestinationPlace(place: string)
  {
    destination = place;
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true
      })
      .then(response => {
        directionsRenderer.setPanel(document.getElementById("sidepanel") as HTMLElement);
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
        console.log(response);
      });

  }

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    const newDirectionsService = new routesLibrary.DirectionsService();
    const newDirectionsRenderer = new routesLibrary.DirectionsRenderer({ map });
    setDirectionsService(newDirectionsService);
    setDirectionsRenderer(newDirectionsRenderer);
  }, [routesLibrary, map]);
  
  // Initialize places autocomplete service
  useEffect(() => {
    if (!placesLibrary) return;
    const fromAutocomplete = new placesLibrary.Autocomplete(document.getElementById("start") as HTMLInputElement, {
      componentRestrictions: {'country': ['US']},
      fields: ['place_id', 'geometry', 'name']
    });

    //fromAutocomplete.addListener("place_changed", onPlaceChanged)

    const toAutocomplete = new placesLibrary.Autocomplete(document.getElementById("destination") as HTMLInputElement, {
      componentRestrictions: {'country': ['US']},
      fields: ['place_id', 'geometry', 'name']
    });
  }, [placesLibrary]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: origin,
        destination: destination,
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
            <div>Start Location: </div>
            <Autocomplete
              apiKey={API_KEY}
              onPlaceSelected={(place) => {
                console.log(place.formatted_address);
                handleOriginPlace(place.formatted_address as string);
              }}
              options={{
                types: ["address"],
                componentRestrictions: {country: 'US'},
              }
              }
            />
            <div>Destination: </div>
            <Autocomplete
              apiKey={API_KEY}
              onPlaceSelected={(place) => {
                console.log(place.formatted_address);
                handleDestinationPlace(place.formatted_address as string);
              }}
              options={{
                types: ["address"],
                componentRestrictions: {country: 'US'},
              }
              }
            />
            <button type="submit" style={{ padding: '10px 20px' }} onClick= {() => console.log(routes[(directionsRenderer?.getRouteIndex() as number)])}>Go</button>
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