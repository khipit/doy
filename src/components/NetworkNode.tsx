import React from 'react';
import { ChevronRight, ChevronDown, Info } from 'lucide-react';
import { NetworkNode as NetworkNodeType } from '../types/music';

interface NetworkNodeProps {
  node: NetworkNodeType;
  onExpandPerson: (nodeId: string) => void;
  onExpandSong: (song: any, parentId: string) => void;
  onExpandCollaborator: (collaborator: any, parentId: string) => void;
  onShowInfo: (node: NetworkNodeType) => void;
}

export function NetworkNode({ 
  node, 
  onExpandPerson, 
  onExpandSong, 
  onExpandCollaborator,
  onShowInfo
}: NetworkNodeProps) {
  const getNodeClasses = () => {
    let baseClasses = "relative rounded-2xl text-white cursor-pointer shadow-lg transition-all duration-300 hover:scale-105 hover:rotate-1 overflow-hidden";
    
    if (node.type === 'person') {
      if (node.role === 'producer') {
        baseClasses += " bg-gradient-to-br from-green-500 to-green-600";
      } else if (node.role === 'songwriter') {
        baseClasses += " bg-gradient-to-br from-yellow-400 to-yellow-500 text-black";
      } else {
        baseClasses += " bg-gradient-to-br from-teal-500 to-teal-600";
      }
      baseClasses += " p-6 min-h-[120px]";
    } else {
      baseClasses += " bg-gradient-to-br from-pink-500 to-pink-600 p-5 min-h-[100px]";
    }
    
    return baseClasses;
  };

  const getRoleIcon = (role?: string) => {
    switch (role) {
      case 'artist': return '👤';
      case 'producer': return '🎛️';
      case 'songwriter': return '✏️';
      default: return '🎵';
    }
  };

  return (
    <div className="relative">
      {/* Connection Line to Parent - starts from parent node edge */}
      {node.parentId && (
        <div className="absolute -left-12 top-1/2 w-12 h-0.5 z-0">
          <svg className="w-full h-full" viewBox="0 0 48 2">
            <line
              x1="0"
              y1="1"
              x2="48"
              y2="1"
              stroke="#14b8a6"
              strokeWidth="2"
              strokeDasharray="4,4"
              className="animate-dotted-line opacity-60"
            />
          </svg>
        </div>
      )}

      <div 
        className={getNodeClasses()}
        onClick={() => {
          if (node.type === 'person') {
            onExpandPerson(node.id);
          }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 pointer-events-none"></div>
        
        {/* Info Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShowInfo(node);
          }}
          className="absolute top-2 right-2 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <Info className="w-3 h-3" />
        </button>
        
        <div className="relative z-10">
          <div className="text-xs uppercase font-semibold opacity-80 mb-2 tracking-wider font-terminal">
            {node.type} {node.role && `(${node.role})`}
          </div>
          
          <div className="text-lg font-bold mb-2 leading-tight font-terminal">
            {node.name}
          </div>
          
          {node.data && (
            <div className="text-sm opacity-90 space-y-1 font-body">
              <div>💿 {node.data.album}</div>
              <div>📅 {node.data.releaseDate}</div>
              <div>🎵 {Math.round(node.data.streamCount / 1000000)}M streams</div>
              <div>📈 Chart #{node.data.chartRank}</div>
            </div>
          )}
          
          {node.songs && (
            <div className="text-sm opacity-80 mt-3 flex items-center gap-2 font-body">
              {node.expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              {node.songs.length} songs
            </div>
          )}
        </div>
      </div>
      
      {node.expanded && (
        <div className="ml-8 mt-4 space-y-3 relative">
          {/* Vertical Connection Line */}
          <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-400 to-transparent opacity-30"></div>
          
          {node.type === 'person' && node.songs?.map((song, index) => (
            <div key={index} className="relative">
              {/* Horizontal Connection Line from vertical line to child */}
              <div className="absolute -left-8 top-1/2 w-8 h-0.5">
                <svg className="w-full h-full" viewBox="0 0 32 2">
                  <line
                    x1="0"
                    y1="1"
                    x2="32"
                    y2="1"
                    stroke="#14b8a6"
                    strokeWidth="2"
                    strokeDasharray="2,2"
                    className="animate-connection-pulse"
                  />
                </svg>
              </div>
              
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onExpandSong(song, node.id);
                }}
                className="bg-gradient-to-r from-pink-500/90 to-pink-600/90 text-white p-3 rounded-xl cursor-pointer hover:translate-x-2 transition-transform duration-200 text-sm font-semibold font-body"
              >
                🎵 {song.title}
              </div>
            </div>
          ))}
          
          {node.type === 'song' && node.credits?.map((credit, index) => (
            <div key={index} className="relative">
              {/* Horizontal Connection Line from vertical line to child */}
              <div className="absolute -left-8 top-1/2 w-8 h-0.5">
                <svg className="w-full h-full" viewBox="0 0 32 2">
                  <line
                    x1="0"
                    y1="1"
                    x2="32"
                    y2="1"
                    stroke="#14b8a6"
                    strokeWidth="2"
                    strokeDasharray="2,2"
                    className="animate-connection-pulse"
                  />
                </svg>
              </div>
              
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onExpandCollaborator(credit, node.id);
                }}
                className={`
                  p-3 rounded-xl cursor-pointer hover:translate-x-2 transition-transform duration-200 text-sm font-semibold font-body
                  ${credit.role === 'producer' ? 'bg-gradient-to-r from-green-500/90 to-green-600/90 text-white' :
                    credit.role === 'songwriter' ? 'bg-gradient-to-r from-yellow-400/90 to-yellow-500/90 text-black' :
                    'bg-gradient-to-r from-teal-500/90 to-teal-600/90 text-white'}
                `}
              >
                {getRoleIcon(credit.role)} {credit.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}