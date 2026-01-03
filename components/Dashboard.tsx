
import React, { useState } from 'react';
import { 
  PieChart as RePieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, 
  TooltipProps
} from 'recharts';
import { Calendar, Filter, Users, UserPlus, CreditCard, Home, RefreshCw, Check, Clock } from 'lucide-react';
import { MOCK_DATA, COLORS } from '../constants';

interface DashboardProps {
  isDarkMode: boolean;
}

const CustomTooltip = ({ active, payload, label, isDark }: TooltipProps<number, string> & { isDark: boolean }) => {
  if (active && payload && payload.length) {
    return (
      <div className={`${isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border-slate-100 text-slate-800'} p-3 shadow-xl border rounded-lg transition-colors`}>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">{label || payload[0].name}</p>
        <p className={`text-lg font-bold ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
          {payload[0].value} <span className="text-xs font-normal text-slate-400">Pasien</span>
        </p>
      </div>
    );
  }
  return null;
};

const Dashboard: React.FC<DashboardProps> = ({ isDarkMode }) => {
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  const [activePreset, setActivePreset] = useState('Bulan Ini');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleApplyFilter = () => {
    setIsFiltering(true);
    setActivePreset('Kustom');
    setTimeout(() => {
      setIsFiltering(false);
    }, 800);
  };

  const setPreset = (preset: string) => {
    setActivePreset(preset);
    setIsFiltering(true);
    
    // Simulate setting dates for presets
    const today = new Date().toISOString().split('T')[0];
    if (preset === 'Hari Ini') {
      setStartDate(today);
      setEndDate(today);
    } else if (preset === 'Minggu Ini') {
      setStartDate('2024-01-24');
      setEndDate(today);
    } else if (preset === 'Bulan Ini') {
      setStartDate('2024-01-01');
      setEndDate('2024-01-31');
    }

    setTimeout(() => {
      setIsFiltering(false);
    }, 600);
  };

  const totalPayment = MOCK_DATA.paymentType.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 transition-colors">
      {/* Header Info & Enhanced Filter */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Ringkasan Kunjungan</h2>
          <p className="text-slate-500 dark:text-slate-400">Pantau data statistik pasien Puskesmas Tambora secara real-time.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          {/* Quick Presets */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl transition-colors">
            {['Hari Ini', 'Minggu Ini', 'Bulan Ini'].map((p) => (
              <button
                key={p}
                onClick={() => setPreset(p)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activePreset === p 
                    ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Date Picker Range */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 rounded-2xl shadow-sm transition-colors">
            <div className="flex items-center px-2 py-1.5">
              <Calendar size={16} className="text-sky-500 mr-2" />
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent border-none outline-none text-xs font-semibold text-slate-600 dark:text-slate-300 w-28"
              />
              <span className="mx-2 text-slate-300 dark:text-slate-600">—</span>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent border-none outline-none text-xs font-semibold text-slate-600 dark:text-slate-300 w-28"
              />
            </div>
            <button 
              onClick={handleApplyFilter}
              disabled={isFiltering}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isFiltering ? <RefreshCw size={14} className="animate-spin" /> : <Filter size={14} />}
              Terapkan
            </button>
          </div>

          <button 
            onClick={handleRefresh}
            className={`p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm text-slate-500 dark:text-slate-400 hover:text-sky-600 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
            title="Refresh Data"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area with Loading Overlay */}
      <div className="relative">
        {isFiltering && (
          <div className="absolute inset-0 z-20 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-[2px] rounded-3xl flex items-center justify-center transition-all duration-300">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 flex flex-col items-center gap-4">
              <div className="relative">
                <RefreshCw size={40} className="text-sky-500 animate-spin" />
                <Clock size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sky-300" />
              </div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Memproses Data...</p>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {/* Top Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Kunjungan', value: '1,000', icon: Users, color: 'sky' },
              { label: 'Kunjungan Baru', value: '320', icon: UserPlus, color: 'emerald' },
              { label: 'Pasien BPJS', value: '750', icon: CreditCard, color: 'indigo' },
              { label: 'Wilayah Terbanyak', value: 'Krendang', icon: Home, color: 'amber' },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group cursor-default">
                <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
                <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mt-1">{stat.value}</h3>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Gender Distribution */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-sky-500 rounded-full"></div>
                Jenis Kelamin
              </h4>
              <div className="h-80 w-full">
                <ResponsiveContainer>
                  <RePieChart>
                    <Pie
                      data={MOCK_DATA.gender}
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {MOCK_DATA.gender.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.gender[index % COLORS.gender.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={(props) => <CustomTooltip {...props} isDark={isDarkMode} />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      formatter={(value) => <span className="text-slate-600 dark:text-slate-400 text-xs font-medium">{value}</span>}
                    />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Visit Type */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
                Jenis Kunjungan
              </h4>
              <div className="h-80 w-full">
                <ResponsiveContainer>
                  <BarChart data={MOCK_DATA.visitType}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#334155" : "#f1f5f9"} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 12}} />
                    <Tooltip content={(props) => <CustomTooltip {...props} isDark={isDarkMode} />} cursor={{fill: isDarkMode ? '#1e293b' : '#f8fafc'}} />
                    <Bar dataKey="visits" fill="#10b981" radius={[8, 8, 0, 0]} barSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Age Groups */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                Kunjungan Berdasarkan Usia
              </h4>
              <div className="h-80 w-full">
                <ResponsiveContainer>
                  <AreaChart data={MOCK_DATA.ageGroups}>
                    <defs>
                      <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#334155" : "#f1f5f9"} />
                    <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 12}} />
                    <Tooltip content={(props) => <CustomTooltip {...props} isDark={isDarkMode} />} />
                    <Area type="monotone" dataKey="visits" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Payment Type (Improved Donut) */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-amber-500 rounded-full"></div>
                Jenis Pembayaran
              </h4>
              <div className="h-80 w-full relative">
                <ResponsiveContainer>
                  <RePieChart>
                    <Pie
                      data={MOCK_DATA.paymentType}
                      innerRadius={80}
                      outerRadius={105}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {MOCK_DATA.paymentType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS.chart[index % COLORS.chart.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={(props) => <CustomTooltip {...props} isDark={isDarkMode} />} />
                    <Legend 
                      verticalAlign="middle" 
                      align="right"
                      layout="vertical"
                      iconType="circle"
                      formatter={(value, entry: any) => {
                        const { payload } = entry;
                        const percent = ((payload.value / totalPayment) * 100).toFixed(0);
                        return (
                          <span className="text-slate-600 dark:text-slate-400 text-sm font-semibold ml-2">
                            {value} <span className="text-slate-400 dark:text-slate-500 font-normal ml-1">({percent}%)</span>
                          </span>
                        );
                      }}
                    />
                  </RePieChart>
                </ResponsiveContainer>
                {/* Center Label */}
                <div className="absolute top-1/2 left-[32%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{totalPayment}</p>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Pasien</p>
                </div>
              </div>
            </div>

            {/* Kelurahan Distribution */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm lg:col-span-2 transition-colors">
              <h4 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-sky-500 rounded-full"></div>
                Distribusi Kelurahan
              </h4>
              <div className="h-80 w-full">
                <ResponsiveContainer>
                  <BarChart layout="vertical" data={MOCK_DATA.kelurahan} margin={{ left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={isDarkMode ? "#334155" : "#f1f5f9"} />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#64748b' : '#94a3b8', fontSize: 12}} />
                    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{fill: isDarkMode ? '#94a3b8' : '#64748b', fontSize: 12, fontWeight: 500}} />
                    <Tooltip content={(props) => <CustomTooltip {...props} isDark={isDarkMode} />} cursor={{fill: isDarkMode ? '#1e293b' : '#f8fafc'}} />
                    <Bar dataKey="visits" fill="#0ea5e9" radius={[0, 8, 8, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
