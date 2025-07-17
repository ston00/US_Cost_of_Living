import Home from "./pages/Home";

import Header  from "./components/Header";

import './App.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer } from 'https://cdn.esm.sh/react-leaflet/MapContainer'
function App() {
  return <div>
    <Header />
    <Home />
    </div>
  ;
}

export default App;
