import React from "react";
import Link from "next/link";
import { User } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-green-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">AI Plant Identifier</div>

        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-green-200">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-green-200">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-green-200">
            Contact
          </Link>
          <Link href="/login" className="text-white hover:text-green-200 mr-4">
            <User className="inline-block" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
