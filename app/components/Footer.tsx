"use client";
import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const hoverStyle = "text-[#212529] opacity-80 hover:opacity-100 transition-opacity cursor-pointer";

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
  ];

  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#fafafb] text-[#212529] py-10 px-6 border-t border-[#e3e3e3]">
      <div className="mx-auto max-w-[950px] grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 text-center md:text-left">
        
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Universe of Books</h3>
          <p className="text-[#666] text-sm leading-relaxed">
            Find your next favorite book with our chatbot. Just describe your interests, and let us handle the recommendations.
          </p>
          <div className="flex flex-col items-center md:items-start gap-2 text-sm text-[#575757]">
            <span className="flex items-center gap-2 text-[#212529] opacity-80">
              <FaPhone className="text-xs" /> +1 (555) 555-5555
            </span>
            <a href="mailto:info@yourdomain.com" className={`flex items-center gap-2 ${hoverStyle}`}>
              <FaEnvelope className="text-xs" /> info@yourdomain.com
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Explore</h3>
          <ul className="space-y-2 text-sm">
            {navLinks.map((item) => (
              <li key={item.name}>
                <a href={item.href} className={hoverStyle}>
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-lg">Follow Us</h3>
          <div className="flex justify-center md:justify-start gap-5">
            <a href="#" className="text-xl opacity-80 hover:opacity-100 transition-opacity"><FaFacebookF /></a>
            <a href="#" className="text-xl opacity-80 hover:opacity-100 transition-opacity"><FaTwitter /></a>
            <a href="#" className="text-xl opacity-80 hover:opacity-100 transition-opacity"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="max-w-[950px] mx-auto border-t border-[#efefef] mt-10 pt-6 text-center text-xs text-[#a9a9a9] uppercase tracking-widest">
        &copy; {year ?? ''} Universe of Books. All rights reserved.
      </div>
    </footer>
  );
}