import React, { useState } from "react";

const GetCurrentLocation = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    address: "",
    pincode: "",
    error: "",
  });

  return location;
};

export default GetCurrentLocation;
