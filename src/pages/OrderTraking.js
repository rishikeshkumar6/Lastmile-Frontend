import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import Icon from "./test.webp";
import maker from "./placeholder.png";
import "leaflet/dist/leaflet.css";
import "leaflet-rotatedmarker";

const OrderTrackingMap = () => {
  const source = [25.095316, 86.66494];
  const destination = [25.2121991, 86.4151267];
  const [vehiclePosition, setVehiclePosition] = useState([
    25.0282922, 86.6222717,
  ]); // Initial position
  const [rotationAngle, setRotationAngle] = useState(0); // Vehicle rotation angle
  const [speed, setSpeed] = useState(0); // Vehicle speed
  const [etd, setEtd] = useState(0); // Estimated time to destination in minutes

  const vehicleIcon = L.icon({
    iconUrl: Icon,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
  });

  const sourceIcon = L.icon({
    iconUrl: maker,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
  });

  const destinationIcon = L.icon({
    iconUrl: maker,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
  });

  // Haversine formula to calculate distance in meters between two coordinates
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Returns distance in meters
  };

  // Calculate speed in km/h
  const calculateSpeed = (prevPosition, newPosition, timeElapsed) => {
    const distance = haversineDistance(
      prevPosition[0],
      prevPosition[1],
      newPosition[0],
      newPosition[1]
    );
    const speedInKmh = distance / 1000 / (timeElapsed / 3600); // speed in km/h
    return speedInKmh;
  };

  // Calculate estimated time to destination in minutes
  const calculateETD = (vehiclePosition, speed) => {
    const distanceToDestination = haversineDistance(
      vehiclePosition[0],
      vehiclePosition[1],
      destination[0],
      destination[1]
    );
    const timeToDestination = distanceToDestination / ((speed * 1000) / 3600); // time in hours
    return timeToDestination * 60; // return in minutes
  };

  // Calculate rotation angle based on movement direction
  const calculateRotationAngle = ([lat1, lng1], [lat2, lng2]) => {
    const angle = Math.atan2(lat2 - lat1, lng2 - lng1) * (180 / Math.PI);
    return angle;
  };

  const MapBoundsUpdater = () => {
    const map = useMap(); // Use useMap inside the MapContainer
    useEffect(() => {
      const bounds = L.latLngBounds([source, destination, vehiclePosition]);
      map.fitBounds(bounds, { padding: [50, 50] }); // Adjust bounds based on the map instance
    }, [vehiclePosition, map]);

    return null;
  };

  useEffect(() => {
    let lastPosition = vehiclePosition;
    let lastTimestamp = Date.now();

    // Start watching the position
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        const newPosition = [latitude, longitude];
        const timestamp = Date.now();

        const timeElapsed = (timestamp - lastTimestamp) / 1000; // Time difference in seconds
        const currentSpeed = calculateSpeed(
          lastPosition,
          newPosition,
          timeElapsed
        );
        const estimatedTime = calculateETD(newPosition, currentSpeed);

        // Update the state with new vehicle position, speed, and ETD
        // setVehiclePosition(newPosition);
        setSpeed(currentSpeed);
        setEtd(estimatedTime);

        const angle = calculateRotationAngle(lastPosition, newPosition);
        setRotationAngle(angle);

        lastPosition = newPosition;
        lastTimestamp = timestamp;
      },
      (error) => console.error("Geolocation error:", error),
      { enableHighAccuracy: true }
    );

    // Cleanup the watcher when component unmounts
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <MapContainer zoom={15} className="h-[600px] w-100">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Source Marker */}
      <Marker position={source} icon={sourceIcon} />

      {/* Destination Marker */}
      <Marker position={destination} icon={destinationIcon} />

      {/* Vehicle Marker with Popup */}
      <Marker
        position={vehiclePosition}
        icon={vehicleIcon}
        rotationAngle={rotationAngle}
        rotationOrigin="center"
      >
        <Popup>
          <div>
            <h3>Vehicle Information</h3>
            <p>Speed: {speed.toFixed(2)} km/h</p>
            <p>Estimated Time to Destination: {etd.toFixed(0)} minutes</p>
            <p>
              Current Location: {vehiclePosition[0].toFixed(4)},{" "}
              {vehiclePosition[1].toFixed(4)}
            </p>
          </div>
        </Popup>
      </Marker>

      {/* Polyline */}
      <Polyline
        positions={[source, vehiclePosition, destination]}
        pathOptions={{
          weight: 6,
          color: "green",
          dashArray: "10,10",
        }}
      />

      {/* Map Bounds Updater */}
      <MapBoundsUpdater />
    </MapContainer>
  );
};

export default OrderTrackingMap;
