import React from 'react';
import { Music, Users, Mic, PenTool, Database, Plus, RefreshCw, Edit } from 'lucide-react';

interface AdminPanelProps {
  isVisible: boolean;
  stats: {
    songs: number;
    artists: number;
    producers: number;
    songwriters: number;
  };
  onStartCrawling: () => void;
  onAddManualData: () => void;
  isCrawling: boolean;
}

export function AdminPanel({ isVisible, stats, onStartCrawling, onAddManualData, isCrawling }: AdminPanelProps) {
  if (!isVisible) return null;

  const statItems = [
    { icon: Music, label: 'Total Songs', value: stats.songs, color: 'text-purple-400' },
    { icon: Users, label: 'Artists', value: stats.artists, color: 'text-blue-400' },
    { icon: Mic, label: 'Producers', value: stats.producers, color: 'text-green-400' },
    { icon: PenTool, label: 'Songwriters', value: stats.songwriters, color: 'text-orange-400' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 mb-6">
      <div className="bg-gray-800 p-6 rounded-2xl border-2 border-dashed border-red-400 text-white">
        <h3 className="text-2xl font-bold mb-4 text-red-400 font-terminal">
          ⚙️ Database Management
        </h3>
        
        {/* Database Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {statItems.map((item, index) => (
            <div 
              key={item.label}
              className="bg-white/10 p-4 rounded-xl text-center hover:scale-105 transition-transform duration-300"
            >
              <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
              <div className="text-2xl font-bold font-terminal">{item.value}</div>
              <div className="text-sm opacity-80 font-body font-light">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Admin Controls */}
        <div className="border-t border-white/20 pt-4">
          <h4 className="text-lg font-bold mb-3 text-yellow-400 font-terminal">🛠️ Database Controls</h4>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={onStartCrawling}
              disabled={isCrawling}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 font-body
                ${isCrawling 
                  ? 'bg-blue-500/20 text-blue-300 border-2 border-blue-400 animate-pulse cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105 hover:rotate-1'
                }
              `}
            >
              {isCrawling ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Crawling Data...
                </>
              ) : (
                <>
                  <Database className="w-4 h-4" />
                  Auto Crawl Database
                </>
              )}
            </button>

            <button
              onClick={onAddManualData}
              className="flex items-center gap-2 px-4 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 hover:scale-105 hover:rotate-[-1deg] transition-all duration-300 font-body"
            >
              <Plus className="w-4 h-4" />
              Add Manual Data
            </button>

            <button
              className="flex items-center gap-2 px-4 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 hover:scale-105 hover:rotate-1 transition-all duration-300 font-body"
            >
              <Edit className="w-4 h-4" />
              Edit Database
            </button>
          </div>
        </div>

        {/* Crawling Status */}
        {isCrawling && (
          <div className="mt-4 p-3 bg-blue-500/20 border border-blue-400 rounded-xl">
            <div className="flex items-center gap-2 text-blue-300 font-body">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Discovering new music connections...</span>
            </div>
            <div className="mt-2 bg-blue-900/50 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}