import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Profile from "../src/components/profile";
import Search from "../src/components/Search";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        {/* Always visible (header + search) */}
        <h1 style={{ textAlign: "center" }}>GitHub User Search</h1>
        <Search />

        {/* Change content based on route */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
