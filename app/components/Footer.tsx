import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaRecycle, FaLeaf } from 'react-icons/fa';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaRecycle className="text-green-400 text-2xl" />
              <h3 className="text-xl font-bold">EcoGuide</h3>
            </div>
            <p className="text-gray-300 text-sm">
              Making e-waste management accessible and sustainable for everyone.
              Together we can make a difference in protecting our environment.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-green-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-green-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/locations" className="hover:text-green-400 transition-colors">
                  Recycling Locations
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-green-400 transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/guide" className="hover:text-green-400 transition-colors">
                  Recycling Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-green-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-green-400 transition-colors">
                  Environmental Impact
                </Link>
              </li>
              <li>
                <Link href="/partners" className="hover:text-green-400 transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-green-400 transition-colors">
                <FaGithub size={24} />
              </a>
              <a href="mailto:contact@ecoguide.com" className="text-gray-300 hover:text-green-400 transition-colors">
                <FaEnvelope size={24} />
              </a>
            </div>
            <div className="text-sm text-gray-300">
              <p>Contact us:</p>
              <p className="hover:text-green-400 transition-colors">
                contact@ecoguide.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} EcoGuide. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>

        {/* Environmental Impact Badge */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center space-x-2 bg-green-900/20 px-4 py-2 rounded-full">
            <FaLeaf className="text-green-400" />
            <span className="text-xs text-green-400">
              Committed to Environmental Sustainability
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 