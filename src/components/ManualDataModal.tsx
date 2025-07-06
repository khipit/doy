import React, { useState } from 'react';
import { X, Plus, Trash2, Music, User, Mic, PenTool } from 'lucide-react';

interface ManualDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddData: (data: any) => void;
}

export function ManualDataModal({ isOpen, onClose, onAddData }: ManualDataModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    releaseDate: '',
    streamCount: '',
    chartRank: '',
    credits: [{ name: '', role: 'artist' }]
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSong = {
      title: formData.title,
      artist: formData.artist,
      releaseDate: formData.releaseDate,
      streamCount: parseInt(formData.streamCount),
      chartRank: parseInt(formData.chartRank),
      credits: formData.credits.reduce((acc, credit) => {
        if (credit.name.trim()) {
          if (!acc[credit.name]) acc[credit.name] = [];
          acc[credit.name].push(credit.role);
        }
        return acc;
      }, {} as Record<string, string[]>)
    };

    onAddData(newSong);
    setFormData({
      title: '',
      artist: '',
      releaseDate: '',
      streamCount: '',
      chartRank: '',
      credits: [{ name: '', role: 'artist' }]
    });
    onClose();
  };

  const addCredit = () => {
    setFormData({
      ...formData,
      credits: [...formData.credits, { name: '', role: 'artist' }]
    });
  };

  const removeCredit = (index: number) => {
    setFormData({
      ...formData,
      credits: formData.credits.filter((_, i) => i !== index)
    });
  };

  const updateCredit = (index: number, field: string, value: string) => {
    const newCredits = [...formData.credits];
    newCredits[index] = { ...newCredits[index], [field]: value };
    setFormData({ ...formData, credits: newCredits });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'artist': return <User className="w-4 h-4" />;
      case 'producer': return <Mic className="w-4 h-4" />;
      case 'songwriter': return <PenTool className="w-4 h-4" />;
      default: return <Music className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform rotate-1 hover:rotate-0 transition-transform duration-300">
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center transform rotate-2">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-terminal">Add Music Data</h2>
              <p className="text-sm opacity-90 font-body font-light">Manually add song information to the database</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-body">Song Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-purple-50/50 transition-all duration-300 font-body"
                placeholder="Enter song title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-body">Main Artist</label>
              <input
                type="text"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-purple-50/50 transition-all duration-300 font-body"
                placeholder="Enter artist name"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-body">Release Date</label>
              <input
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-purple-50/50 transition-all duration-300 font-body"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-body">Stream Count</label>
              <input
                type="number"
                value={formData.streamCount}
                onChange={(e) => setFormData({ ...formData, streamCount: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-purple-50/50 transition-all duration-300 font-body"
                placeholder="e.g., 50000000"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 font-body">Chart Rank</label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.chartRank}
                onChange={(e) => setFormData({ ...formData, chartRank: e.target.value })}
                className="w-full px-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl focus:outline-none focus:border-purple-400 focus:bg-purple-50/50 transition-all duration-300 font-body"
                placeholder="e.g., 1"
                required
              />
            </div>
          </div>

          {/* Credits */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-gray-700 font-body">Credits & Collaborators</label>
              <button
                type="button"
                onClick={addCredit}
                className="flex items-center gap-2 px-3 py-2 bg-green-400 text-black font-medium rounded-lg hover:scale-105 transition-transform duration-200 font-body"
              >
                <Plus className="w-4 h-4" />
                Add Credit
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {formData.credits.map((credit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-600">
                    {getRoleIcon(credit.role)}
                  </div>
                  
                  <input
                    type="text"
                    value={credit.name}
                    onChange={(e) => updateCredit(index, 'name', e.target.value)}
                    className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 transition-colors font-body"
                    placeholder="Enter name"
                  />
                  
                  <select
                    value={credit.role}
                    onChange={(e) => updateCredit(index, 'role', e.target.value)}
                    className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-purple-400 transition-colors font-body"
                  >
                    <option value="artist">Artist</option>
                    <option value="producer">Producer</option>
                    <option value="songwriter">Songwriter</option>
                  </select>
                  
                  {formData.credits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCredit(index)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-600 font-medium rounded-xl hover:bg-gray-200 transition-colors font-body"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-purple-400 text-white font-bold rounded-xl hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-lg hover:shadow-purple-400/30 font-terminal"
            >
              🎵 Add to Database
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}