import React from "react";
import { Routes, Route } from "react-router-dom";
import Background from "./components/Background";
import PrivateRoute from "./components/PrivateRoute";
import {
  HomePage,
  LoginPage,
  SettingsPage,
  ProfilePage,
  ChatPage,
} from "./pages";
import { SocketProvider } from "./utils/SocketContext";
const App = () => {
  return (
    <div className="relative h-screen w-full select-none">
      <Background />

      <SocketProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/chat/:chatId" element={<ChatPage />} />
          </Route>
        </Routes>
      </SocketProvider>
    </div>
  );
};

export default App;
