import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/components/Home.jsx";
import Profile from "../src/components/profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
