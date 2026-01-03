
import React, { useState } from 'react';
import { Bell, Search, Sun, Moon, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  user: UserProfile;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, isDarkMode, toggleDarkMode }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    { id: 1, text: "Laporan bulanan Januari siap diunduh.", time: "5m ago", unread: true },
    { id: 2, text: "Data Kelurahan Krendang diperbarui oleh Operator.", time: "1h ago", unread: true },
    { id: 3, text: "Batas waktu penginputan data sisa 2 hari.", time: "4h ago", unread: false },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Mencari data untuk: "${searchQuery}"... (Fitur simulasi)`);
    }
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-30 transition-colors duration-300">
      <form onSubmit={handleSearch} className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full w-96 transition-colors">
        <Search size={18} className="text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari data pasien atau kelurahan..."
          className="bg-transparent border-none outline-none text-sm w-full dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
        />
      </form>

      <div className="flex items-center gap-6">
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-500 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          title={isDarkMode ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`relative p-2 rounded-xl transition-all ${showNotifications ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-600' : 'text-slate-500 hover:text-sky-600 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Notifikasi</h3>
                <button className="text-xs text-sky-600 font-semibold hover:underline">Tandai semua dibaca</button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-50 dark:border-slate-700/50 last:border-0 ${n.unread ? 'bg-sky-50/30 dark:bg-sky-900/10' : ''}`}>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{n.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-3 text-center border-t border-slate-100 dark:border-slate-700">
                <button className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">Lihat Semua</button>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{user.name}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500">{user.role}</p>
          </div>
          <img
            src={user.avatar}
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-sky-100 dark:border-sky-900 object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
