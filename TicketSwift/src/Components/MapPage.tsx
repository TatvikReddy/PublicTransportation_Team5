import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import TicketSwiftLogo from "../TicketSwiftLogo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps";
import Autocomplete from "react-google-autocomplete";
import Payment from "./Payment";
import axios, { AxiosError } from "axios";
import createHash from "crypto";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const App = () => (
  <APIProvider apiKey={API_KEY}>
    <Map
      defaultZoom={15}
      defaultCenter={{ lat: 32.9857, lng: -96.7502 }}
      gestureHandling={"greedy"}
      fullscreenControl={false}
    >
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
  const routesLibrary = useMapsLibrary("routes");
  const placesLibrary = useMapsLibrary("places");
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  var selected = routes[routeIndex];
  const leg = selected?.legs[0];
  var origin = "800 W Campbell Rd, Richardson, TX 75080";
  var destination = "433 Coit Rd, Plano, TX 75075";
  const navigate = useNavigate();

  function handleOriginPlace(place: string) {
    origin = place;
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setPanel(
          document.getElementById("sidepanel") as HTMLElement
        );
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  }

  function handleDestinationPlace(place: string) {
    destination = place;
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setPanel(
          document.getElementById("sidepanel") as HTMLElement
        );
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch((error) => {
        console.error(error);
        alert(error);
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

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.TRANSIT,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setPanel(
          document.getElementById("sidepanel") as HTMLElement
        );
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch((error) => {
        console.error(error);
        alert(error);
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
      console.log(error);
    }
  };

  const handleProceedToPayment = () => {
    // $0.22 / mi 
    const rate = 0

    var tickets: any[] = []
    console.log(routes[directionsRenderer?.getRouteIndex() as number])
    for (let step in routes[directionsRenderer?.getRouteIndex() as number].legs[0].steps){
      if (routes[directionsRenderer?.getRouteIndex() as number].legs[0].steps[step].travel_mode === "TRANSIT"){
        let ticketid = crypto.randomUUID()
        let ticket = {
          name: routes[directionsRenderer?.getRouteIndex() as number].legs[0].steps[step].transit?.line.name,
          arrival_time: routes[directionsRenderer?.getRouteIndex() as number].legs[0].steps[step].transit?.arrival_time,
          departure_time: routes[directionsRenderer?.getRouteIndex() as number].legs[0].steps[step].transit?.departure_time,
          arrival_stop: routes[directionsRenderer?.getRouteIndex() as number].legs[0].steps[step].transit?.arrival_stop.name,
          departure_stop: routes[directionsRenderer?.getRouteIndex() as number].legs[0].steps[step].transit?.departure_stop.name,
          agency: routes[directionsRenderer?.getRouteIndex() as number].legs[0].steps[step].transit?.line.agencies,
          distance: routes[directionsRenderer?.getRouteIndex() as number].legs[0].steps[step].distance,
          price: Math.round(((routes[directionsRenderer?.getRouteIndex() as number].legs[0].steps[step].distance!.value) * 0.00062137) * 0.22) + 0.99,
          confirmed: false,
          uuid: ticketid}
          console.log(ticket)
        
        tickets.push(ticket);
      }
    }
    let uuid = crypto.randomUUID();

    let tripInfo = {
      depart : routes[directionsRenderer?.getRouteIndex() as number].legs[0].departure_time?.value, 
      arrival: routes[directionsRenderer?.getRouteIndex() as number].legs[0].arrival_time?.value, 
      start : routes[directionsRenderer?.getRouteIndex() as number].legs[0].start_address, 
      end : routes[directionsRenderer?.getRouteIndex() as number].legs[0].end_address,
      tickets: tickets,
      uuid: uuid}
      
    
    console.log(tripInfo)

    try {
      const response = axios.post("http://localhost:3001/api/payment", tripInfo);
      console.log(response);
      // Optionally, you can redirect the user to another page upon successful registration
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
    console.log(routes[directionsRenderer?.getRouteIndex() as number]);
    
    navigate(`/payment/${uuid}`);
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          padding: "10px",
          backgroundColor: "#fff",
        }}
      >
        <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <div>Start Location: </div>
            <Autocomplete
              defaultValue={origin}
              apiKey={API_KEY}
              onPlaceSelected={(place) => {
                //console.log(place.formatted_address);
                handleOriginPlace(place.formatted_address as string);
              }}
              options={{
                types: ["address"],
                componentRestrictions: { country: "US" },
              }}
            />
            <div>Destination: </div>
            <Autocomplete
              defaultValue={destination}
              apiKey={API_KEY}
              onPlaceSelected={(place) => {
                //console.log(place.formatted_address);
                handleDestinationPlace(place.formatted_address as string);
              }}
              options={{
                types: ["address"],
                componentRestrictions: { country: "US" },
              }}
            />
            <button
              type="submit"
              style={{ padding: "10px 20px" }}
              onClick={() => {
                handleProceedToPayment();
              }}
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>

      <div className="directions" style={{ marginTop: "60px" }}>
        <h2>{selected.summary}</h2>
        <p>
          {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
        </p>
        <p>Distance: {leg.distance?.text}</p>
        <p>Duration: {leg.duration?.text}</p>
        <p>Fare: {leg.departure_time?.text}</p>

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
