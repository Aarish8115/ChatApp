import React from "react";

const Container = ({ children }) => {
  return (
    <div className="flex border-white/15 overflow-hidden backdrop-blur-md border-2  md:w-4/5 md:h-[90vh] rounded-xl absolute -translate-1/2 top-1/2 left-1/2">
      {children}
    </div>
  );
};

export default Container;
