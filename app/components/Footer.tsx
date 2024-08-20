import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-green-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-400">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">FAQs</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/faq" className="hover:text-green-400">
                How it works
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-green-400">
                Supported plants
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-green-400">
                Accuracy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-2">Privacy</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="hover:text-green-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-green-400">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
