import React from 'react';

export function Footer() {
  const footerLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'API', href: '#' }
  ];

  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded flex items-center justify-center">
              <img 
                src="/digginonyou_watermark_150x150.png" 
                alt="DigginOnYou Logo" 
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <span className="text-sm text-gray-300 font-terminal">DigginOnYou</span>
          </div>
          
          <div className="flex gap-6 text-sm text-gray-400">
            {footerLinks.map(link => (
              <button
                key={link.label}
                className="hover:text-white transition-colors duration-300 font-body"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}