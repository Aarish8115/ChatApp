import React from "react";

const Chat = ({ children, sendby }) => {
  return (
    <div className={`flex items-center py-2 w-full ${sendby === "myself" ? "justify-end" : "justify-start"}`}>
      <div className="px-4 py-2 text-wrap  text-sm rounded-lg max-w-[45%] bg-white text-purple-950">
        {children}
      </div>
    </div>
  );
};

export default Chat;
