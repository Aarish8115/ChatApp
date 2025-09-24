import React from "react";

import backgroundImage from "../assets/background2.jpg";
const Background = () => {
  return (
    <img
      src={backgroundImage}
      alt="Bakcground Image"
      className="bg-cover absolute -z-50 w-full h-screen select-none "
    />
  );
};

export default Background;
