import { LatLng } from "leaflet";
import { FunctionComponent, useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

interface LocationMarkerProps {}

const LocationMarker: FunctionComponent<LocationMarkerProps> = () => {
  const map = useMapEvents({});
  map.flyTo([1, 2]);
  return (
    <>
      <Marker position={[1, 2]}>
        <Popup>You are here</Popup>
      </Marker>
      <button
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 100000,
          width: 100,
        }}
      >
        my loc
      </button>
    </>
  );
};

export default LocationMarker;
