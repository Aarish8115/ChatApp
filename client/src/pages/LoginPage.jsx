import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
const LoginPage = () => {
  const [login, setLogin] = useState(false);
  return (
    <div className="absolute -translate-1/2 top-1/2 left-1/2 select-none flex ">
      <div className="flex border-white/15 overflow-hidden backdrop-blur-md border-2   rounded-xl  py-12 items-center justify-center w-[40vw]">
        {login ? (
          <Login setLogin={setLogin} />
        ) : (
          <Register setLogin={setLogin} />
        )}
      </div>
    </div>
  );
};

export default LoginPage;
