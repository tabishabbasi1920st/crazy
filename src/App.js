import "./App.css";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Escape from "./components/Escape";
import { Route, Routes } from "react-router-dom";
import ChatContextProvider from "./components/Context/ChatContext";

function App() {
  return (
    <ChatContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/escape" element={<Escape />} />
      </Routes>
    </ChatContextProvider>
  );
}

export default App;
