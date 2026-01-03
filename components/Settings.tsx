
import React, { useState } from 'react';
import { User, Lock, Save, CheckCircle, Shield, Users, Edit2, Trash2, ShieldCheck, UserCog, Mail } from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface SettingsProps {
  user: UserProfile;
  onUpdate: (updated: Partial<UserProfile>) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    username: user.username,
    password: '',
    confirmPassword: ''
  });
  const [saved, setSaved] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<'profile' | 'management'>('profile');

  const [systemUsers, setSystemUsers] = useState<UserProfile[]>([
    { name: 'dr. Andi Wijaya', role: 'Admin', username: 'andiwijaya', avatar: 'https://picsum.photos/seed/doctor/200/200', email: 'admin@puskesmastambora.id' },
    { name: 'Siti Aminah', role: 'Operator', username: 'siti_a', avatar: 'https://picsum.photos/seed/nurse/200/200', email: 'siti@puskesmastambora.id' },
    { name: 'Budi Santoso', role: 'Viewer', username: 'budi_v', avatar: 'https://picsum.photos/seed/staff/200/200', email: 'budi@puskesmastambora.id' },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ name: formData.name, username: formData.username });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleDeleteUser = (username: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus user ${username}?`)) {
      setSystemUsers(systemUsers.filter(u => u.username !== username));
      alert('User berhasil dihapus.');
    }
  };

  const handleEditUser = (u: UserProfile) => {
    alert(`Mengedit user: ${u.name}... (Fitur simulasi modal)`);
  };

  const handleAddUser = () => {
    alert('Buka formulir tambah user baru... (Fitur simulasi modal)');
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'Admin': return <span className="bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 px-2.5 py-1 rounded-lg text-xs font-bold border border-rose-100 dark:border-rose-900/30 flex items-center gap-1"><Shield size={12}/> Admin</span>;
      case 'Operator': return <span className="bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 px-2.5 py-1 rounded-lg text-xs font-bold border border-sky-100 dark:border-sky-900/30 flex items-center gap-1"><UserCog size={12}/> Operator</span>;
      case 'Viewer': return <span className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-lg text-xs font-bold border border-slate-100 dark:border-slate-700 flex items-center gap-1"><ShieldCheck size={12}/> Viewer</span>;
    }
  };

  return (
    <div className="p-8 max-w-5xl animate-in fade-in slide-in-from-right-4 duration-500 transition-colors">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Setelan</h2>
          <p className="text-slate-500 dark:text-slate-400">Kelola informasi profil dan hak akses sistem.</p>
        </div>
        
        {user.role === 'Admin' && (
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl transition-colors">
            <button 
              onClick={() => setActiveSettingsTab('profile')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeSettingsTab === 'profile' ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              Profil Saya
            </button>
            <button 
              onClick={() => setActiveSettingsTab('management')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeSettingsTab === 'management' ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
            >
              Manajemen User
            </button>
          </div>
        )}
      </div>

      {activeSettingsTab === 'profile' ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <div className="p-8 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col md:flex-row items-center gap-6">
            <div className="relative group cursor-pointer" title="Klik untuk ubah foto">
              <img
                src={user.avatar}
                alt="Avatar"
                className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 shadow-md object-cover"
              />
              <button className="absolute inset-0 bg-black/40 rounded-full text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">Ubah</button>
            </div>
            <div className="text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{user.name}</h3>
                {getRoleBadge(user.role)}
              </div>
              <p className="text-slate-500 dark:text-slate-400 mt-1">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <User size={16} /> Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900/40 focus:border-sky-400 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Mail size={16} /> Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900/40 focus:border-sky-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-4 transition-colors"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Lock size={16} /> Kata Sandi Baru
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900/40 focus:border-sky-400 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Lock size={16} /> Konfirmasi Kata Sandi
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900/40 focus:border-sky-400 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              {saved ? (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium animate-in fade-in slide-in-from-left-2">
                  <CheckCircle size={20} />
                  <span>Perubahan berhasil disimpan</span>
                </div>
              ) : <div />}
              
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 active:scale-95 transition-all shadow-lg shadow-sky-200 dark:shadow-none"
              >
                <Save size={18} />
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500 transition-colors">
          <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
              <Users size={20} className="text-sky-500" />
              <span>Daftar Pengguna Sistem</span>
            </div>
            <button 
              onClick={handleAddUser}
              className="bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 px-4 py-2 rounded-xl text-sm font-bold hover:bg-sky-100 dark:hover:bg-sky-900/40 transition-all border border-transparent dark:border-sky-900/50"
            >
              + Tambah User
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 dark:bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {systemUsers.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={item.avatar} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700" alt=""/>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{item.name}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500">{item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{item.username}</td>
                    <td className="px-6 py-4">{getRoleBadge(item.role)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEditUser(item)}
                          className="p-2 text-slate-400 hover:text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/20 rounded-lg transition-all"
                        >
                          <Edit2 size={16}/>
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(item.username)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-all"
                        >
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
