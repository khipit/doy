import React, { useState } from 'react';
import { User, Edit3, Star, Music, Heart, Trophy, Users, Play, Eye, ThumbsUp, Settings, Palette, Badge, Clock } from 'lucide-react';
import { UserProfile, StyleMatch } from '../types/user';

interface ProfileDashboardProps {
  profile: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
  styleMatches: StyleMatch[];
}

export function ProfileDashboard({ profile, onUpdateProfile, styleMatches }: ProfileDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock visitor data
  const recentVisitors = [
    { id: '1', username: 'MusicLover22', avatar: '/ChatGPT Image 2025년 4월 13일 오전 01_07_36.png', visitTime: '2 hours ago', isOnline: true },
    { id: '2', username: 'KpopFan99', avatar: '/ChatGPT Image 2025년 4월 13일 오전 01_07_36.png', visitTime: '5 hours ago', isOnline: false },
    { id: '3', username: 'ProducerLife', avatar: '/ChatGPT Image 2025년 4월 13일 오전 01_07_36.png', visitTime: '1 day ago', isOnline: true },
    { id: '4', username: 'SongwriterX', avatar: '/ChatGPT Image 2025년 4월 13일 오전 01_07_36.png', visitTime: '2 days ago', isOnline: false },
    { id: '5', username: 'BeatMaker', avatar: '/ChatGPT Image 2025년 4월 13일 오전 01_07_36.png', visitTime: '3 days ago', isOnline: true },
  ];

  const tabs = [
    { id: 'overview', label: 'My Space', icon: User },
    { id: 'music', label: 'Music Profile', icon: Music },
    { id: 'activities', label: 'Activities', icon: Star },
    { id: 'clips', label: 'My Clips', icon: Play },
    { id: 'matches', label: 'Style Matches', icon: Users },
    { id: 'customize', label: 'Customize', icon: Palette }
  ];

  const getFandomTierColor = (tier: string) => {
    switch (tier) {
      case 'Casual': return 'text-gray-500 bg-gray-100';
      case 'Fan': return 'text-blue-500 bg-blue-100';
      case 'Stan': return 'text-purple-500 bg-purple-100';
      case 'Ultimate Stan': return 'text-pink-500 bg-pink-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const renderOverview = () => (
    <div className="space-y-4">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-green-400/10 to-purple-400/10 p-4 rounded-2xl border-2 border-dashed border-gray-200 transform rotate-1">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden transform rotate-2">
            <img 
              src="/ChatGPT Image 2025년 4월 13일 오전 01_07_36.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-xl font-bold text-gray-800 font-terminal">{profile.displayName}</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Edit3 className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mb-2 font-body font-light text-sm">{profile.bio}</p>
            <div className="flex items-center gap-3 text-xs">
              <span className={`px-2 py-1 rounded-full font-medium font-body ${getFandomTierColor(profile.fandomTier)}`}>
                {profile.fandomTier}
              </span>
              <span className="text-gray-500 font-body">Score: {profile.fandomScore}/100</span>
              <span className="text-gray-500 font-body">{profile.badges.length} badges</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visitor List */}
      <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200 transform rotate-[-1deg]">
        <h3 className="text-lg font-bold text-gray-800 mb-3 font-terminal flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          Recent Visitors ({recentVisitors.length})
        </h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {recentVisitors.map((visitor, index) => (
            <div key={visitor.id} className={`flex items-center gap-3 p-2 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 transform ${index % 2 === 0 ? 'rotate-1' : 'rotate-[-1deg]'} hover:rotate-0`}>
              <div className="relative">
                <img 
                  src={visitor.avatar} 
                  alt={visitor.username}
                  className="w-8 h-8 rounded-xl object-cover"
                />
                {visitor.isOnline && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800 font-body text-sm">{visitor.username}</div>
                <div className="text-xs text-gray-500 font-body font-light">{visitor.visitTime}</div>
              </div>
              <button className="px-2 py-1 bg-green-400 text-black text-xs font-medium rounded-lg hover:scale-105 transition-transform duration-200 font-body">
                Visit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Board Posts', value: profile.boardActivities.filter(a => a.type === 'post').length, icon: '📝', color: 'bg-blue-100' },
          { label: 'My Clips', value: profile.myClips.length, icon: '🎬', color: 'bg-purple-100' },
          { label: 'Genres', value: profile.genreCollection.length, icon: '🎵', color: 'bg-green-100' },
          { label: 'Style Matches', value: styleMatches.length, icon: '🤝', color: 'bg-pink-100' }
        ].map((stat, index) => (
          <div key={stat.label} className={`${stat.color} p-3 rounded-xl text-center transform ${index % 2 === 0 ? 'rotate-1' : 'rotate-[-1deg]'} hover:rotate-0 transition-transform duration-300`}>
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="text-lg font-bold text-gray-800 font-terminal">{stat.value}</div>
            <div className="text-xs text-gray-600 font-body">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Music Personality */}
      <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200 transform rotate-[-1deg]">
        <h3 className="text-lg font-bold text-gray-800 mb-2 font-terminal">🎭 Music Personality</h3>
        <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 p-3 rounded-xl">
          <div className="text-lg font-semibold text-gray-800 font-terminal">{profile.musicPersonality}</div>
          <div className="text-sm text-gray-600 mt-1 font-body font-light">Based on your listening habits and preferences</div>
        </div>
      </div>
    </div>
  );

  const renderMusicProfile = () => (
    <div className="space-y-4">
      {/* Favorite Song */}
      {profile.favoriteSong && (
        <div className="bg-gradient-to-br from-pink-400/10 to-red-400/10 p-4 rounded-2xl border-2 border-dashed border-pink-200 transform rotate-1">
          <h3 className="text-lg font-bold text-gray-800 mb-2 font-terminal flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-400" />
            Favorite Song
          </h3>
          <div className="bg-white p-3 rounded-xl">
            <div className="font-semibold text-gray-800 font-terminal">{profile.favoriteSong.title}</div>
            <div className="text-gray-600 font-body">by {profile.favoriteSong.artist}</div>
            <div className="text-sm text-gray-500 mt-2 italic font-body font-light">"{profile.favoriteSong.reason}"</div>
          </div>
        </div>
      )}

      {/* Favorite People */}
      <div className="grid md:grid-cols-2 gap-3">
        {profile.favoriteSongwriter && (
          <div className="bg-gradient-to-br from-blue-400/10 to-teal-400/10 p-3 rounded-2xl border-2 border-dashed border-blue-200 transform rotate-[-1deg]">
            <h4 className="font-bold text-gray-800 mb-2 font-terminal">✏️ Favorite Songwriter</h4>
            <div className="bg-white p-3 rounded-xl">
              <div className="font-semibold font-terminal">{profile.favoriteSongwriter.name}</div>
              <div className="text-sm text-gray-500 mt-1 font-body font-light">"{profile.favoriteSongwriter.reason}"</div>
            </div>
          </div>
        )}

        {profile.favoriteMusician && (
          <div className="bg-gradient-to-br from-purple-400/10 to-pink-400/10 p-3 rounded-2xl border-2 border-dashed border-purple-200 transform rotate-1">
            <h4 className="font-bold text-gray-800 mb-2 font-terminal">🎤 Favorite Musician</h4>
            <div className="bg-white p-3 rounded-xl">
              <div className="font-semibold font-terminal">{profile.favoriteMusician.name}</div>
              <div className="text-sm text-gray-500 mt-1 font-body font-light">"{profile.favoriteMusician.reason}"</div>
            </div>
          </div>
        )}
      </div>

      {/* Genre Collection */}
      <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200">
        <h3 className="text-lg font-bold text-gray-800 mb-3 font-terminal flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-400" />
          Genre Collection
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {profile.genreCollection.map((genre, index) => (
            <div key={genre.genre} className="bg-gray-50 p-3 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-800 font-body text-sm">{genre.genre}</span>
                {genre.badge && <span className="text-lg">{genre.badge}</span>}
              </div>
              <div className="text-sm text-gray-600 mb-1 font-body">Level {genre.level}</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(genre.songsCollected / genre.totalSongs) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1 font-body font-light">
                {genre.songsCollected}/{genre.totalSongs} songs
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderActivities = () => (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-800 font-terminal">📋 Recent Activities</h3>
      {profile.boardActivities.slice(0, 10).map((activity, index) => (
        <div key={activity.id} className={`bg-white p-3 rounded-xl border-2 border-dashed border-gray-200 transform ${index % 2 === 0 ? 'rotate-1' : 'rotate-[-1deg]'} hover:rotate-0 transition-transform duration-300`}>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center">
              {activity.type === 'post' && '📝'}
              {activity.type === 'comment' && '💬'}
              {activity.type === 'like' && '❤️'}
              {activity.type === 'share' && '🔄'}
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-800 font-body">{activity.content}</div>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                <span className="font-body font-light">{new Date(activity.timestamp).toLocaleDateString()}</span>
                <span className="flex items-center gap-1 font-body">
                  <ThumbsUp className="w-3 h-3" />
                  {activity.likes}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderClips = () => (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-800 font-terminal">🎬 My Clips</h3>
      <div className="grid md:grid-cols-2 gap-3">
        {profile.myClips.map((clip, index) => (
          <div key={clip.id} className={`bg-white p-3 rounded-xl border-2 border-dashed border-gray-200 transform ${index % 2 === 0 ? 'rotate-1' : 'rotate-[-1deg]'} hover:rotate-0 transition-transform duration-300`}>
            <div className="aspect-video bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-lg mb-2 flex items-center justify-center">
              <Play className="w-6 h-6 text-gray-400" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-1 font-terminal text-sm">{clip.title}</h4>
            <p className="text-sm text-gray-600 mb-2 font-body font-light">{clip.description}</p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded-full font-body">{clip.clipType}</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-body">
                  <Eye className="w-3 h-3" />
                  {clip.views}
                </span>
                <span className="flex items-center gap-1 font-body">
                  <ThumbsUp className="w-3 h-3" />
                  {clip.likes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStyleMatches = () => (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-800 font-terminal">🤝 Style Matches</h3>
      <div className="space-y-2">
        {styleMatches.map((match, index) => (
          <div key={match.userId} className={`bg-white p-3 rounded-xl border-2 border-dashed border-gray-200 transform ${index % 2 === 0 ? 'rotate-1' : 'rotate-[-1deg]'} hover:rotate-0 transition-transform duration-300`}>
            <div className="flex items-center gap-3">
              <img 
                src="/ChatGPT Image 2025년 4월 13일 오전 01_07_36.png" 
                alt={match.username}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800 font-body text-sm">{match.username}</span>
                  <span className="text-lg font-bold text-green-400 font-terminal">{match.matchPercentage}%</span>
                </div>
                <div className="text-sm text-gray-600 font-body font-light">
                  Common interests: {match.commonInterests.join(', ')}
                </div>
              </div>
              <button className="px-3 py-2 bg-green-400 text-black font-medium rounded-lg hover:scale-105 transition-transform duration-200 font-body text-sm">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomize = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800 font-terminal">🎨 Customize Your Space</h3>
      
      {/* Theme Colors */}
      <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3 font-terminal">Color Theme</h4>
        <div className="grid grid-cols-6 gap-2">
          {[
            { name: 'Neon Green', primary: '#39FF14', secondary: '#2BCC10' },
            { name: 'Coral Pink', primary: '#FF6B6B', secondary: '#FF5252' },
            { name: 'Ocean Blue', primary: '#4ECDC4', secondary: '#26A69A' },
            { name: 'Sunset Orange', primary: '#FFE66D', secondary: '#FFC107' },
            { name: 'Purple Dream', primary: '#B794F6', secondary: '#9C27B0' },
            { name: 'Rose Gold', primary: '#FF8A80', secondary: '#F48FB1' }
          ].map((theme) => (
            <button
              key={theme.name}
              className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:scale-110 transition-transform duration-200"
              style={{ background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})` }}
              onClick={() => onUpdateProfile({
                profileTheme: {
                  ...profile.profileTheme,
                  primaryColor: theme.primary,
                  secondaryColor: theme.secondary
                }
              })}
            />
          ))}
        </div>
      </div>

      {/* Background Patterns */}
      <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3 font-terminal">Background Pattern</h4>
        <div className="grid grid-cols-4 gap-2">
          {['dots', 'waves', 'music-notes', 'stars'].map((pattern) => (
            <button
              key={pattern}
              className="aspect-square bg-gray-100 rounded-xl border-2 border-dashed border-gray-200 hover:scale-110 transition-transform duration-200 flex items-center justify-center"
              onClick={() => onUpdateProfile({
                profileTheme: {
                  ...profile.profileTheme,
                  backgroundPattern: pattern
                }
              })}
            >
              <span className="text-xl">
                {pattern === 'dots' && '⚪'}
                {pattern === 'waves' && '〰️'}
                {pattern === 'music-notes' && '🎵'}
                {pattern === 'stars' && '⭐'}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      {/* Tab Navigation */}
      <div className="bg-white p-2 rounded-2xl border-2 border-dashed border-gray-200 mb-6 overflow-x-auto">
        <div className="flex gap-2 min-w-fit">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-3 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap font-body text-sm
                ${activeTab === tab.id 
                  ? 'bg-green-400 text-black transform scale-105' 
                  : 'text-gray-600 hover:bg-gray-50 hover:scale-105'
                }
                ${index % 2 === 0 ? 'transform rotate-1' : 'transform rotate-[-1deg]'}
                hover:rotate-0
              `}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'music' && renderMusicProfile()}
        {activeTab === 'activities' && renderActivities()}
        {activeTab === 'clips' && renderClips()}
        {activeTab === 'matches' && renderStyleMatches()}
        {activeTab === 'customize' && renderCustomize()}
      </div>
    </div>
  );
}