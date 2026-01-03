
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import Reports from './components/Reports';
import Login from './components/Login';
import { TabType, UserProfile } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleLogin = (userData: UserProfile) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('dashboard');
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updated } as UserProfile);
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />;
  }

  return (
    <div className="flex bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />
      
      <main className="flex-1 ml-64 min-h-screen">
        <Header 
          user={user!} 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode} 
        />
        
        <div className="content-area">
          {activeTab === 'dashboard' && <Dashboard isDarkMode={isDarkMode} />}
          
          {activeTab === 'reports' && (
            user?.role !== 'Viewer' ? (
              <Reports />
            ) : (
              <div className="p-8 text-center py-20 animate-in fade-in duration-500">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl">⚠️</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Akses Terbatas</h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-2">Akun Viewer Anda tidak memiliki izin untuk mengakses modul laporan dan ekspor data.</p>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="mt-6 px-6 py-2 bg-slate-600 dark:bg-slate-700 text-white rounded-xl font-medium"
                  >
                    Kembali ke Dashboard
                  </button>
                </div>
              </div>
            )
          )}

          {activeTab === 'settings' && user && (
            <Settings user={user} onUpdate={handleUpdateUser} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
