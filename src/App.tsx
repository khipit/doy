import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchSection } from './components/SearchSection';
import { AdminPanel } from './components/AdminPanel';
import { NetworkSection } from './components/NetworkSection';
import { Features } from './components/Features';
import { Footer } from './components/Footer';
import { LoginModal } from './components/LoginModal';
import { ProfileDashboard } from './components/ProfileDashboard';
import { ManualDataModal } from './components/ManualDataModal';
import { useMusicNetwork } from './hooks/useMusicNetwork';
import { useAuth } from './hooks/useAuth';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'profile'>('home');
  const [showManualDataModal, setShowManualDataModal] = useState(false);
  
  const {
    nodes,
    showAdmin,
    isCrawling,
    searchPerson,
    expandPerson,
    expandSong,
    expandCollaborator,
    clearNetwork,
    toggleAdmin,
    startCrawling,
    addManualData,
    getStats
  } = useMusicNetwork();

  const {
    user,
    userProfile,
    showLoginModal,
    styleMatches,
    login,
    signup,
    logout,
    updateProfile,
    setShowLoginModal
  } = useAuth();

  const stats = getStats();

  const handleNavClick = (section: string) => {
    console.log(`Navigating to: ${section}`);
    if (section === 'profile') {
      setCurrentView('profile');
    } else {
      setCurrentView('home');
    }
  };

  const handleProfileClick = () => {
    setCurrentView('profile');
  };

  const handleLogoClick = () => {
    setCurrentView('home');
  };

  const handleLogout = () => {
    logout();
    setCurrentView('home');
  };

  const handleAddManualData = () => {
    setShowManualDataModal(true);
  };

  const handleManualDataSubmit = (data: any) => {
    addManualData(data);
    setShowManualDataModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onNavClick={handleNavClick}
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        onProfileClick={handleProfileClick}
      />
      
      <main className="relative">
        {currentView === 'home' ? (
          <>
            <Hero />
            
            <div className="px-6 py-6">
              <SearchSection
                onSearch={searchPerson}
                onToggleAdmin={toggleAdmin}
                onClear={clearNetwork}
                onStartCrawling={startCrawling}
                onAddManualData={handleAddManualData}
                isCrawling={isCrawling}
              />
              
              <AdminPanel 
                isVisible={showAdmin} 
                stats={stats.database}
                onStartCrawling={startCrawling}
                onAddManualData={handleAddManualData}
                isCrawling={isCrawling}
              />
              
              <NetworkSection
                nodes={nodes}
                onExpandPerson={expandPerson}
                onExpandSong={expandSong}
                onExpandCollaborator={expandCollaborator}
                stats={{ nodes: stats.nodes, connections: stats.connections }}
              />
              
              <div className="mt-12">
                <Features />
              </div>

              {/* Guide Section */}
              <section className="max-w-4xl mx-auto mt-6 bg-gray-800 p-4 rounded-2xl text-white">
                <div className="text-lg font-bold mb-3 text-green-400 font-terminal">📖 How to Use</div>
                <div className="space-y-1 text-sm font-body font-light">
                  <div>• 🔍 <strong>Search:</strong> Enter an artist or producer name</div>
                  <div>• 👤 <strong>Click Person Cards:</strong> Expand to see their songs</div>
                  <div>• 🎵 <strong>Click Song Cards:</strong> View all collaborators</div>
                  <div>• 👥 <strong>Click Collaborators:</strong> Explore their other projects</div>
                  <div>• ℹ️ <strong>Info Button:</strong> Click + button for detailed information</div>
                  <div>• 🤖 <strong>Auto Crawl:</strong> Automatically discover new music data</div>
                  {user && <div>• 👤 <strong>Profile:</strong> Customize your music space and connect with others</div>}
                </div>
              </section>
            </div>
          </>
        ) : (
          userProfile && (
            <ProfileDashboard
              profile={userProfile}
              onUpdateProfile={updateProfile}
              styleMatches={styleMatches}
            />
          )
        )}
      </main>
      
      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={login}
        onSignup={signup}
      />

      <ManualDataModal
        isOpen={showManualDataModal}
        onClose={() => setShowManualDataModal(false)}
        onAddData={handleManualDataSubmit}
      />
    </div>
  );
}

export default App;