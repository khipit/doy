import React from 'react';
import { Search, Network, Users, Info, User, LogOut } from 'lucide-react';

interface HeaderProps {
  onNavClick: (section: string) => void;
  user?: { username: string } | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onProfileClick: () => void;
}

export function Header({ onNavClick, user, onLoginClick, onLogout, onProfileClick }: HeaderProps) {
  const handleLogoClick = () => {
    onNavClick('home');
  };

  return (
    <header className="bg-teal-400 border-b-2 border-dashed border-teal-600 relative z-50">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
      
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={handleLogoClick}>
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center transform rotate-1 hover:rotate-[-2deg] hover:scale-110 transition-transform duration-300 p-2">
            <img 
              src="/digginonyou_watermark_150x150.png" 
              alt="DigginOnYou Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-white transform rotate-[-1deg] font-terminal tracking-wider">
            DigginOnYou
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="flex gap-1">
            {[
              { label: 'Explore', icon: Search },
              { label: 'Network', icon: Network },
              { label: 'Artists', icon: Users },
              { label: 'About', icon: Info }
            ].map((item, index) => (
              <button
                key={item.label}
                onClick={() => onNavClick(item.label.toLowerCase())}
                className={`
                  px-3 py-2 font-medium text-white/80 hover:text-white 
                  rounded-lg transition-all duration-300 hover:scale-105 font-body
                  hover:bg-white/10
                  ${index % 2 === 0 ? 'transform rotate-1' : 'transform rotate-[-1deg]'}
                  hover:rotate-0
                `}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* User Menu */}
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onProfileClick}
                className="flex items-center gap-2 px-3 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all duration-300 hover:scale-105 transform rotate-1 hover:rotate-0 font-body"
              >
                <img 
                  src="/ChatGPT Image 2025년 4월 13일 오전 01_07_36.png" 
                  alt="Profile" 
                  className="w-5 h-5 rounded-full object-cover"
                />
                {user.username}
              </button>
              <button
                onClick={onLogout}
                className="p-2 text-white/80 hover:text-red-300 rounded-lg transition-colors duration-300"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="px-4 py-2 bg-white text-teal-600 font-medium rounded-lg hover:scale-105 hover:rotate-1 transition-all duration-300 transform rotate-[-1deg] hover:rotate-0 font-body"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}