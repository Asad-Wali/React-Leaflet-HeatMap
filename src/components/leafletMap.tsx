import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RectangleList from "./maps";


const LeafletMap = () => {
    const center: [number, number] = [60.22352998843195, 24.96432372755647];

    return (
        // Leaflet Map
        <MapContainer className="h-screen" center={center} zoom={11} scrollWheelZoom={false}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Call Rectangle Component */}
            <RectangleList />
        </MapContainer>
    )
}

export default LeafletMap;