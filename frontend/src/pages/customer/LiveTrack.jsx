import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../../socket/socket";
import TrackingMap from "../../components/TrackingMap";
import { trackCourierApi } from "../../api/courierApi";
import StatusBadge from "../../components/StatusBadge";

const isValidLocation = (location) => {
  return (
    location &&
    location.lat !== null &&
    location.lng !== null &&
    location.lat !== undefined &&
    location.lng !== undefined &&
    !Number.isNaN(Number(location.lat)) &&
    !Number.isNaN(Number(location.lng))
  );
};

const LiveTrack = () => {
  const { trackingId } = useParams();

  const [location, setLocation] = useState(null);
  const [courier, setCourier] = useState(null);

  const loadCourier = async () => {
    try {
      const data = await trackCourierApi(trackingId);
      setCourier(data.courier);

      const savedLocation = localStorage.getItem(`lastLocation_${trackingId}`);

      if (isValidLocation(data.courier.currentLocation)) {
        const currentLocation = {
          lat: Number(data.courier.currentLocation.lat),
          lng: Number(data.courier.currentLocation.lng),
          updatedAt: data.courier.currentLocation.updatedAt,
        };

        setLocation(currentLocation);

        localStorage.setItem(
          `lastLocation_${trackingId}`,
          JSON.stringify(currentLocation)
        );
      } else if (savedLocation) {
        setLocation(JSON.parse(savedLocation));
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    loadCourier();

    socket.emit("joinTrackingRoom", trackingId);

    const handleLocationUpdate = (data) => {
      if (!isValidLocation(data)) return;

      const newLocation = {
        lat: Number(data.lat),
        lng: Number(data.lng),
        updatedAt: data.updatedAt || new Date(),
      };

      setLocation(newLocation);

      localStorage.setItem(
        `lastLocation_${trackingId}`,
        JSON.stringify(newLocation)
      );
    };

    socket.on("receiveDeliveryLocation", handleLocationUpdate);

    return () => {
      socket.off("receiveDeliveryLocation", handleLocationUpdate);
      socket.emit("stopTracking", trackingId);
    };
  }, [trackingId]);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        Live Courier Tracking
      </h1>

      <p className="text-gray-600 mb-5">Tracking ID: {trackingId}</p>

      {courier && (
        <div className="bg-white border rounded-2xl p-5 mb-5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h2 className="font-bold text-lg">
                {courier.pickupAddress} → {courier.deliveryAddress}
              </h2>

              <p className="text-gray-600">
                Delivery Boy:{" "}
                {courier.assignedTo
                  ? `${courier.assignedTo.name} | ${courier.assignedTo.phone}`
                  : "Not assigned"}
              </p>
            </div>

            <StatusBadge status={courier.status} />
          </div>
        </div>
      )}

      <TrackingMap location={location} />

      <div className="bg-white rounded-2xl border shadow-sm p-5 mt-5">
        {location ? (
          <>
            <p>
              <b>Latitude:</b> {location.lat}
            </p>

            <p>
              <b>Longitude:</b> {location.lng}
            </p>

            <p>
              <b>Last Updated:</b>{" "}
              {location.updatedAt
                ? new Date(location.updatedAt).toLocaleString()
                : "Live"}
            </p>
          </>
        ) : (
          <p className="text-gray-600">
            Waiting for delivery boy live location...
          </p>
        )}
      </div>
    </div>
  );
};

export default LiveTrack;
