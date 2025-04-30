import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 p-4 shadow-lg border-b-2 border-cyberpunk">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold text-cyberpunk">Cyberpunk OCR</h1>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-neon hover:text-cyberpunk transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-neon hover:text-cyberpunk transition">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}