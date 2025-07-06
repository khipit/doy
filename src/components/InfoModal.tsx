import React from 'react';
import { X, Calendar, TrendingUp, Music, Users, Award, ExternalLink, Disc } from 'lucide-react';
import { NetworkNode } from '../types/music';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: NetworkNode | null;
}

export function InfoModal({ isOpen, onClose, node }: InfoModalProps) {
  if (!isOpen || !node) return null;

  const formatNumber = (num: number) => {
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getGradientClass = () => {
    if (node.type === 'person') {
      if (node.role === 'producer') return 'from-green-500 to-green-600';
      if (node.role === 'songwriter') return 'from-yellow-400 to-yellow-500';
      return 'from-teal-500 to-teal-600';
    }
    return 'from-pink-500 to-pink-600';
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform rotate-1 hover:rotate-0 transition-transform duration-300">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getGradientClass()} text-white p-6 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl transform rotate-2">
              {getRoleIcon(node.role)}
            </div>
            <div className="flex-1">
              <div className="text-sm uppercase font-semibold opacity-80 mb-1 tracking-wider font-terminal">
                {node.type} {node.role && `(${node.role})`}
              </div>
              <h2 className="text-2xl font-bold mb-2 font-terminal">{node.name}</h2>
              {node.data && (
                <div className="text-sm opacity-90 font-body">
                  by {node.data.artist}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Song Details */}
          {node.data && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl text-center transform rotate-1">
                  <Disc className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <div className="text-sm text-gray-600 font-body">Album</div>
                  <div className="font-semibold font-terminal text-sm">{node.data.album}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl text-center transform rotate-[-1deg]">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm text-gray-600 font-body">Release Date</div>
                  <div className="font-semibold font-terminal text-sm">{node.data.releaseDate}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl text-center transform rotate-1">
                  <Music className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <div className="text-sm text-gray-600 font-body">Streams</div>
                  <div className="font-semibold font-terminal text-sm">{formatNumber(node.data.streamCount)}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl text-center transform rotate-[-1deg]">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <div className="text-sm text-gray-600 font-body">Chart Rank</div>
                  <div className="font-semibold font-terminal text-sm">#{node.data.chartRank}</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-xl text-center transform rotate-1">
                  <Award className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                  <div className="text-sm text-gray-600 font-body">Score</div>
                  <div className="font-semibold font-terminal text-sm">
                    {Math.round((node.data.streamCount / 1000000) + (100 - node.data.chartRank))}
                  </div>
                </div>
              </div>

              {/* Credits */}
              {node.credits && (
                <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 font-terminal flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-600" />
                    Credits & Collaborators
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {node.credits.map((credit, index) => (
                      <div
                        key={index}
                        className={`
                          p-3 rounded-lg flex items-center gap-3 transform hover:scale-105 transition-transform duration-200
                          ${credit.role === 'producer' ? 'bg-green-100 text-green-800' :
                            credit.role === 'songwriter' ? 'bg-yellow-100 text-yellow-800' :
                            credit.role === 'artist' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}
                        `}
                      >
                        <span className="text-lg">{getRoleIcon(credit.role)}</span>
                        <div>
                          <div className="font-semibold font-body">{credit.name}</div>
                          <div className="text-xs opacity-75 capitalize font-body">{credit.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Person Details */}
          {node.type === 'person' && node.songs && (
            <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-3 font-terminal flex items-center gap-2">
                <Music className="w-5 h-5 text-gray-600" />
                Discography ({node.songs.length} songs)
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {node.songs.map((song, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">🎵</span>
                      <div>
                        <div className="font-semibold font-body">{song.title}</div>
                        <div className="text-sm text-gray-600 font-body font-light">{song.artist}</div>
                        <div className="text-xs text-gray-500 font-body font-light">💿 {song.album}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold font-terminal">#{song.chartRank}</div>
                      <div className="text-xs text-gray-500 font-body">{formatNumber(song.streamCount)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Links */}
          <div className="flex gap-3 justify-center">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-400 text-black font-medium rounded-lg hover:scale-105 transition-transform duration-200 font-body">
              <ExternalLink className="w-4 h-4" />
              View on Spotify
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-400 text-white font-medium rounded-lg hover:scale-105 transition-transform duration-200 font-body">
              <ExternalLink className="w-4 h-4" />
              View on YouTube
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}