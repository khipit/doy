import React from 'react';

export function Hero() {
  return (
    <section className="relative min-h-[50vh] bg-gradient-to-br from-teal-400/5 to-purple-400/5 overflow-hidden">
      {/* Background Doodles - Cassette Tape and CD */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {/* Cassette Tape */}
        <div 
          className="absolute top-8 left-8 w-20 h-12 animate-bounce" 
          style={{ animationDuration: '4s' }}
        >
          <div className="w-full h-full bg-teal-400 rounded-lg relative">
            <div className="absolute top-2 left-3 w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute top-2 right-3 w-3 h-3 bg-white rounded-full"></div>
            <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/50 rounded"></div>
          </div>
        </div>
        
        {/* CD */}
        <div 
          className="absolute top-16 right-16 w-16 h-16 animate-pulse" 
          style={{ animationDuration: '3s' }}
        >
          <div className="w-full h-full bg-red-400 rounded-full relative">
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight font-terminal">
          Discover Your
          <span className="relative inline-block mx-3 text-teal-400">
            Music Universe
            <div className="absolute inset-0 border-2 border-dashed border-red-400 rounded-full opacity-70 transform rotate-[-2deg] scale-110"></div>
          </span>
        </h1>
        
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed font-body">
          Map connections between K-pop artists, producers, and songwriters with our 
          interactive network visualization tool. Uncover hidden collaborations in the music industry.
        </p>
      </div>
    </section>
  );
}