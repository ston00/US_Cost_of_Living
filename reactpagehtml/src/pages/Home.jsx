import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import 'leaflet/dist/leaflet.css';
import L from "leaflet";
import statesData from  './us-states.js'

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";


const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// function loadMap({ center, zoom }) {
//   var map = L.map('map').setView([37.8, -96], 4);

//   var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//   }).addTo(map);

//   L.geoJson(statesData).addTo(map);
// }


//React App

// export default function AppLayout() {
//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-800 text-white p-4">
//         <h2 className="text-2xl font-bold mb-6">Menu</h2>
//         <nav className="space-y-2">
//           <a href="#dashboard" className="block p-2 rounded hover:bg-gray-700">Dashboard</a>
//           <a href="#map" className="block p-2 rounded hover:bg-gray-700">Map</a>
//           <a href="#chart" className="block p-2 rounded hover:bg-gray-700">Chart</a>
//           <a href="#settings" className="block p-2 rounded hover:bg-gray-700">Settings</a>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-gray-100">
//           {/* CostOfLiving here */}
//         <h1 className="text-3xl font-bold mb-4">Welcome to the App</h1>
//       </main>
//     </div>
//   );
// }

export default function CostOfLivingApp() {
  const [currentCity, setCurrentCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [data, setData] = useState([]);
  
  const cityCoordinates = {
    "San Francisco": [37.7749, -122.4194],
    "New York": [40.7128, -74.0060],
    "Los Angeles": [34.0522, -118.2437],
    "Chicago": [41.8781, -87.6298],
    "Houston": [29.7604, -95.3698],
  };

  const currentPos = cityCoordinates[currentCity] || [39.8283, -98.5795];
  const destPos = cityCoordinates[destinationCity] || [39.8283, -98.5795];

  // const data = [
  //   { category: "Housing", current: 1200, destination: 1400 },
  //   { category: "Groceries", current: 350, destination: 400 },
  //   { category: "Transportation", current: 150, destination: 200 },
  //   { category: "Utilities", current: 180, destination: 160 },
  //   { category: "Healthcare", current: 220, destination: 250 },
  // ];

    useEffect(() => {
    if (destinationCity) {
      // Change to State
      fetch(`/api/cost-of-living?state=${encodeURIComponent(destinationCity)}`)
        .then(res => res.json())
        .then(json => {
          if (!json.error) {
            setData([
              { category: "Cost of Living Index", current: 0, destination: parseFloat(json.cost_of_living_index) },
            ]);
          } else {
            setData([]);
          }
        })
        .catch(() => setData([]));
    }
  }, [destinationCity]);

  return (
    <div className="p-4 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center">Cost of Living Comparison</h1>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Search Engine/Filter*/}
        <input
          type="text"
          placeholder="Current City"
          className="p-2 border rounded"
          value={currentCity}
          onChange={(e) => setCurrentCity(e.target.value)}
          autoComplete="off"
        />
        <input
          type="text"
          placeholder="Destination City"
          className="p-2 border rounded"
          value={destinationCity}
          onChange={(e) => setDestinationCity(e.target.value)}
          autoComplete="off"
        />
      </div>
      
      <div className="h-96 w-full rounded overflow-hidden shadow">
        <MapContainer center={destPos} zoom={4} style={{ height: "400px", width: "100%" }}>
          <ChangeView center={destPos} zoom={4} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={currentPos}>
            <Popup>{currentCity || "Current City"}</Popup>
          </Marker>
          <Marker position={destPos}>
            <Popup>{destinationCity || "Destination City"}</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" fill="#8884d8" name={currentCity || "Current City"} />
            <Bar dataKey="destination" fill="#82ca9d" name={destinationCity || "Destination City"} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
