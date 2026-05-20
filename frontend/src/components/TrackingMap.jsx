import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const deliveryIcon = new L.DivIcon({
  className: "delivery-live-marker",
  html: `
    <div class="relative-marker">
      <div class="pulse-ring"></div>
      <div class="marker-card">
        <div class="marker-truck">🚚</div>
      </div>
      <div class="marker-pin"></div>
    </div>
  `,
  iconSize: [54, 64],
  iconAnchor: [27, 58],
  popupAnchor: [0, -55],
});

const defaultCenter = [28.6139, 77.209];

const MapUpdater = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, {
        animate: true,
        duration: 1.2,
      });
    }
  }, [position, map]);

  return null;
};

const TrackingMap = ({ location }) => {
  const [placeName, setPlaceName] = useState("Fetching current area...");
  const [loadingAddress, setLoadingAddress] = useState(false);

  const position = useMemo(() => {
    if (
      location &&
      location.lat !== null &&
      location.lng !== null &&
      location.lat !== undefined &&
      location.lng !== undefined
    ) {
      return [Number(location.lat), Number(location.lng)];
    }

    return defaultCenter;
  }, [location]);

  const hasLiveLocation =
    location &&
    location.lat !== null &&
    location.lng !== null &&
    location.lat !== undefined &&
    location.lng !== undefined;

  useEffect(() => {
    const getPlaceName = async () => {
      if (!hasLiveLocation) {
        setPlaceName("Waiting for delivery boy live location...");
        return;
      }

      try {
        setLoadingAddress(true);

        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lng}`
        );

        const data = await response.json();

        const address = data.address || {};

        const area =
          address.village ||
          address.town ||
          address.city ||
          address.suburb ||
          address.neighbourhood ||
          address.county ||
          "";

        const state = address.state || "";
        const postcode = address.postcode || "";

        const finalPlace =
          data.display_name ||
          [area, state, postcode].filter(Boolean).join(", ") ||
          "Location name not available";

        setPlaceName(finalPlace);
      } catch (error) {
        setPlaceName("Unable to fetch place name");
      } finally {
        setLoadingAddress(false);
      }
    };

    getPlaceName();
  }, [location?.lat, location?.lng, hasLiveLocation]);

  return (
    <div className="w-full">
      <style>
        {`
          .delivery-live-marker {
            background: transparent;
            border: none;
          }

          .relative-marker {
            position: relative;
            width: 54px;
            height: 64px;
          }

          .pulse-ring {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 54px;
            height: 54px;
            transform: translate(-50%, -50%);
            background: rgba(37, 99, 235, 0.25);
            border-radius: 999px;
            animation: pulseMapMarker 1.8s infinite;
          }

          .marker-card {
            position: absolute;
            left: 50%;
            top: 4px;
            transform: translateX(-50%);
            width: 42px;
            height: 42px;
            background: #1d4ed8;
            border: 4px solid #ffffff;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 12px 30px rgba(37, 99, 235, 0.35);
            z-index: 2;
          }

          .marker-truck {
            font-size: 20px;
          }

          .marker-pin {
            position: absolute;
            left: 50%;
            top: 42px;
            width: 16px;
            height: 16px;
            background: #1d4ed8;
            transform: translateX(-50%) rotate(45deg);
            border-right: 4px solid #ffffff;
            border-bottom: 4px solid #ffffff;
            z-index: 1;
          }

          @keyframes pulseMapMarker {
            0% {
              transform: translate(-50%, -50%) scale(0.6);
              opacity: 0.9;
            }
            70% {
              transform: translate(-50%, -50%) scale(1.35);
              opacity: 0;
            }
            100% {
              transform: translate(-50%, -50%) scale(0.6);
              opacity: 0;
            }
          }

          .leaflet-popup-content-wrapper {
            border-radius: 18px;
            box-shadow: 0 20px 40px rgba(15, 23, 42, 0.18);
          }

          .leaflet-popup-content {
            margin: 14px 16px;
          }
        `}
      </style>

      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-lg text-gray-900">
              Delivery Boy Live Location
            </h3>

            <p className="text-sm text-gray-500">
              {hasLiveLocation
                ? loadingAddress
                  ? "Finding current place..."
                  : placeName
                : "Waiting for location update..."}
            </p>
          </div>

          <div
            className={`px-4 py-2 rounded-full text-sm font-bold w-fit ${
              hasLiveLocation
                ? "bg-green-50 text-green-700"
                : "bg-orange-50 text-orange-700"
            }`}
          >
            {hasLiveLocation ? "Live Location Active" : "No Live Location"}
          </div>
        </div>

        <div className="h-[360px] md:h-[520px]">
          <MapContainer
            center={position}
            zoom={hasLiveLocation ? 15 : 5}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapUpdater position={hasLiveLocation ? position : null} />

            {hasLiveLocation && (
              <>
                <Circle
                  center={position}
                  radius={120}
                  pathOptions={{
                    color: "#2563eb",
                    fillColor: "#3b82f6",
                    fillOpacity: 0.15,
                  }}
                />

                <Marker position={position} icon={deliveryIcon}>
                  <Popup>
                    <div className="min-w-[230px]">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 bg-blue-700 text-white rounded-2xl flex items-center justify-center text-xl">
                          🚚
                        </div>

                        <div>
                          <h4 className="font-extrabold text-gray-900">
                            Current Location
                          </h4>
                          <p className="text-xs text-green-600 font-bold">
                            Live tracking active
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <p>
                          <b>Place:</b>{" "}
                          {loadingAddress ? "Fetching..." : placeName}
                        </p>

                        <p>
                          <b>Latitude:</b> {Number(location.lat).toFixed(6)}
                        </p>

                        <p>
                          <b>Longitude:</b> {Number(location.lng).toFixed(6)}
                        </p>

                        <p>
                          <b>Updated:</b>{" "}
                          {location.updatedAt
                            ? new Date(location.updatedAt).toLocaleString()
                            : "Just now"}
                        </p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </>
            )}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default TrackingMap;
