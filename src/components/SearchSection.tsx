import React, { useState } from 'react';
import { Search, Settings, RotateCcw } from 'lucide-react';

interface SearchSectionProps {
  onSearch: (query: string) => void;
  onToggleAdmin: () => void;
  onClear: () => void;
  onStartCrawling: () => void;
  onAddManualData: () => void;
  isCrawling: boolean;
}

export function SearchSection({ 
  onSearch, 
  onToggleAdmin, 
  onClear, 
  onStartCrawling, 
  onAddManualData,
  isCrawling 
}: SearchSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Please enter a search term!');
      return;
    }
    onSearch(searchQuery.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-6 mb-8">
      <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-200 shadow-xl">
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='🔍 Search "Jung Kook", "Tony Esterly", "aespa"...'
            className="w-full pl-12 pr-6 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl text-lg focus:outline-none focus:border-teal-400 focus:bg-teal-50/50 transition-all duration-300 font-body"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        
        <div className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-teal-400 text-white font-bold text-lg rounded-2xl hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-lg hover:shadow-teal-400/30 font-terminal"
          >
            🔍 Start Exploring
          </button>
          
          <button
            onClick={onToggleAdmin}
            className="px-4 py-2 bg-white border-2 border-dashed border-gray-200 text-gray-600 font-medium rounded-xl hover:border-red-400 hover:text-red-400 hover:rotate-[-1deg] transition-all duration-300 font-body"
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Admin
          </button>
          
          <button
            onClick={onClear}
            className="px-4 py-2 bg-white border-2 border-dashed border-gray-200 text-gray-600 font-medium rounded-xl hover:border-blue-400 hover:text-blue-400 hover:rotate-1 transition-all duration-300 font-body"
          >
            <RotateCcw className="w-4 h-4 inline mr-2" />
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}