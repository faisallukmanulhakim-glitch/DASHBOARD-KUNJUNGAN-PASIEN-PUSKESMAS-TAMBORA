
import React, { useState } from 'react';
import { HeartPulse, Mail, Lock, ArrowRight, Loader2, Shield, Sun, Moon } from 'lucide-react';

interface LoginProps {
  onLogin: (user: any) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, isDarkMode, toggleDarkMode }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('admin@puskesmastambora.id');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      let role: 'Admin' | 'Operator' | 'Viewer' = 'Admin';
      if (email.includes('operator')) role = 'Operator';
      if (email.includes('viewer')) role = 'Viewer';

      onLogin({
        name: role === 'Admin' ? 'dr. Andi Wijaya' : (role === 'Operator' ? 'Siti Aminah' : 'Budi Santoso'),
        role: role,
        username: email.split('@')[0],
        email: email,
        avatar: role === 'Admin' ? 'https://picsum.photos/seed/doctor/200/200' : 
                (role === 'Operator' ? 'https://picsum.photos/seed/nurse/200/200' : 'https://picsum.photos/seed/staff/200/200')
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-sky-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-colors duration-300">
      {/* Theme Toggle on Login */}
      <button 
        onClick={toggleDarkMode}
        className="absolute top-8 right-8 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-sky-600 transition-all shadow-sm"
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-sky-100 dark:shadow-none border border-white dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-500 transition-colors">
        <div className="p-10">
          <div className="flex justify-center mb-8">
            <div className="bg-sky-500 p-4 rounded-2xl text-white shadow-lg shadow-sky-200 dark:shadow-none animate-bounce">
              <HeartPulse size={40} />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Selamat Datang</h1>
            <p className="text-slate-400 dark:text-slate-500 mt-2">Sistem Laporan Kunjungan Puskesmas Tambora</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email / Username</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@puskesmas.id"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900/50 focus:border-sky-400 dark:focus:border-sky-500 outline-none transition-all text-slate-700 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900/50 focus:border-sky-400 dark:focus:border-sky-500 outline-none transition-all text-slate-700 dark:text-slate-100"
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-sky-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-sky-700 active:scale-95 transition-all shadow-lg shadow-sky-200 dark:shadow-none flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Masuk Sekarang
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
        
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 text-center border-t border-slate-100 dark:border-slate-800 transition-colors">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Akses Cepat (Demo)</p>
            <div className="flex justify-center gap-4">
               <button onClick={() => setEmail('admin@puskesmastambora.id')} className="text-xs font-bold text-rose-500 dark:text-rose-400 hover:underline">Admin</button>
               <button onClick={() => setEmail('operator@puskesmastambora.id')} className="text-xs font-bold text-sky-500 dark:text-sky-400 hover:underline">Operator</button>
               <button onClick={() => setEmail('viewer@puskesmastambora.id')} className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:underline">Viewer</button>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-slate-400 dark:text-slate-500 text-sm flex items-center gap-2">
        <Shield size={16} /> Keamanan Data Terjamin oleh Kemenkes RI
      </p>
    </div>
  );
};

export default Login;
