import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

// Fix for default marker icon issues with Webpack
// The original error was due to a typo here: _get IconUrl should be _getIconUrl
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Define types for better type checking
interface LatLngTuple {
    lat: number;
    lng: number;
}

interface FaultLine {
    id: string;
    name: string;
    coordinates: LatLngTuple[];
}

interface Geofence {
    id: string;
    name: string;
    coordinates: LatLngTuple[][]; // Polygon can have multiple rings
}

const FaultLineGeofencing: React.FC = () => {
    // Initial map center (example: around Davao City, Philippines)
    const initialCenter: LatLngTuple = { lat: 7.1907, lng: 125.4553 };
    const initialZoom = 10;

    // Simulated Fault Line Data (example coordinates)
    // These are illustrative and not actual precise fault line data.
    const faultLines: FaultLine[] = [
        {
            id: 'fault-1',
            name: 'Simulated Davao Fault Segment A',
            coordinates: [
                { lat: 7.25, lng: 125.40 },
                { lat: 7.20, lng: 125.45 },
                { lat: 7.15, lng: 125.50 },
                { lat: 7.10, lng: 125.55 },
            ],
        },
        {
            id: 'fault-2',
            name: 'Simulated Davao Fault Segment B',
            coordinates: [
                { lat: 7.30, lng: 125.42 },
                { lat: 7.22, lng: 125.48 },
                { lat: 7.18, lng: 125.53 },
            ],
        },
    ];

    // Simulated Geofence Area (example: a polygon around a specific region)
    // This is a simple rectangular geofence for demonstration.
    const geofence: Geofence = {
        id: 'geofence-1',
        name: 'Davao City Geofence Zone',
        coordinates: [
            [
                { lat: 7.28, lng: 125.35 },
                { lat: 7.28, lng: 125.60 },
                { lat: 7.05, lng: 125.60 },
                { lat: 7.05, lng: 125.35 },
                { lat: 7.28, lng: 125.35 }, // Close the polygon
            ],
        ],
    };

    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        // This effect ensures the map container is ready before rendering Leaflet components
        setMapLoaded(true);
    }, []);

    return (
        <div className="flex items-center justify-center m p-4 sm:p-6 lg:p-8 font-inter">
            <div className="w-full max-w-4xl bg-white overflow-hidden border border-gray-200">
                <div className="p-6  bg-green-700 text-white text-center rounded">
                    <h1 className="text-l font-extrabold mb-2 tracking-tight">
                        Fault Line Geofencing
                    </h1>
                    <p className="text sm:text-xl opacity-90">
                        Monitoring geological activity in designated zones
                    </p>
                </div>

                <div className="relative h-96 sm:h-[500px] w-full">
                    {mapLoaded ? (
                        <MapContainer
                            center={[initialCenter.lat, initialCenter.lng]}
                            zoom={initialZoom}
                            scrollWheelZoom={true}
                            className="h-full w-full rounded-b-xl"
                            // Ensure map container has rounded corners at the bottom
                            style={{ borderRadius: '0 0 0.75rem 0.75rem' }}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {/* Geofenced Area */}
                            <Polygon
                                positions={geofence.coordinates}
                                pathOptions={{ color: '#3b82f6', fillColor: '#93c5fd', fillOpacity: 0.3, weight: 3 }}
                            >
                                <Popup>
                                    <div className="font-semibold text-gray-800">
                                        {geofence.name}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        This is a geofenced area for monitoring.
                                    </div>
                                </Popup>
                            </Polygon>

                            {/* Fault Lines */}
                            {faultLines.map((fault) => (
                                <Polyline
                                    key={fault.id}
                                    positions={fault.coordinates}
                                    pathOptions={{ color: '#ef4444', weight: 4, opacity: 0.8, dashArray: '10, 10' }}
                                >
                                    <Popup>
                                        <div className="font-semibold text-gray-800">{fault.name}</div>
                                        <div className="text-sm text-gray-600">
                                            Coordinates: {fault.coordinates.map(c => `(${c.lat.toFixed(2)}, ${c.lng.toFixed(2)})`).join(', ')}
                                        </div>
                                    </Popup>
                                </Polyline>
                            ))}

                            {/* Optional: Add a marker for the initial center */}
                            <Marker position={[initialCenter.lat, initialCenter.lng]}>
                                <Popup>
                                    <div className="font-semibold text-gray-800">Davao City Center</div>
                                    <div className="text-sm text-gray-600">Initial map view.</div>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-600">
                            Loading map...
                        </div>
                    )}
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-200 text-center text-gray-700 text-sm rounded-b-xl">
                    <p>
                        This map displays a simulated geofenced area (blue) and fault lines (red dashed).
                        Click on features for more information.
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                        Note: Fault line data is for demonstration purposes only and not geologically accurate.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FaultLineGeofencing;
