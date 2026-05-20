import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket/socket";
import { updateDeliveryLocationApi } from "../../api/deliveryApi";

const ShareLocation = () => {
  const { trackingId, courierId } = useParams();

  const watchIdRef = useRef(null);

  const [sharing, setSharing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState("");

  const startSharing = () => {
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const lat = Number(position.coords.latitude);
        const lng = Number(position.coords.longitude);

        if (Number.isNaN(lat) || Number.isNaN(lng)) {
          return;
        }

        const locationData = {
          lat,
          lng,
          updatedAt: new Date(),
        };

        setCurrentLocation(locationData);

        socket.emit("deliveryLocationUpdate", {
          trackingId,
          lat,
          lng,
        });

        try {
          await updateDeliveryLocationApi(courierId, lat, lng);
        } catch (error) {
          console.log(error.response?.data?.message);
        }
      },
      (error) => {
        setError("Please allow location permission to share live location");
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );

    watchIdRef.current = watchId;
    setSharing(true);
  };

  const stopSharing = () => {
    if (watchIdRef.current) {
      navigator.geolocation.clearWatch(watchIdRef.current);
    }

    socket.emit("stopTracking", trackingId);
    setSharing(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Share Live Location</h1>

      <p className="text-gray-600 mb-6">Tracking ID: {trackingId}</p>

      <div className="bg-white rounded-2xl shadow-sm border p-6 max-w-xl">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-4">
            {error}
          </div>
        )}

        {!sharing ? (
          <button
            onClick={startSharing}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg"
          >
            Start Sharing Location
          </button>
        ) : (
          <button
            onClick={stopSharing}
            className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold text-lg"
          >
            Stop Sharing Location
          </button>
        )}

        <div className="mt-6 bg-gray-50 rounded-xl p-4">
          {currentLocation ? (
            <>
              <p>
                <b>Latitude:</b> {currentLocation.lat}
              </p>

              <p>
                <b>Longitude:</b> {currentLocation.lng}
              </p>

              <p>
                <b>Last Updated:</b>{" "}
                {new Date(currentLocation.updatedAt).toLocaleTimeString()}
              </p>
            </>
          ) : (
            <p className="text-gray-600">Location not started yet.</p>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-5">
          Keep this page open on mobile while delivering the parcel.
        </p>
      </div>
    </div>
  );
};

export default ShareLocation;
