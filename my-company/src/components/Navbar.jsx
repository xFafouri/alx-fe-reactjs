import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#007bff",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        gap: "20px"
      }}
    >
      <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
      <Link to="/about" style={{ color: "#fff", textDecoration: "none" }}>About</Link>
      <Link to="/services" style={{ color: "#fff", textDecoration: "none" }}>Services</Link>
      <Link to="/contact" style={{ color: "#fff", textDecoration: "none" }}>Contact</Link>
    </nav>
  );
}

export default Navbar;
