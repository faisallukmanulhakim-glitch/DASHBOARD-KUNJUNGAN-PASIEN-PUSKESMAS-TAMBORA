
import React, { useState, useRef, useMemo } from 'react';
import { 
  FileDown, 
  Table, 
  FileText, 
  Download, 
  CheckCircle2, 
  Loader2, 
  Upload, 
  FileSpreadsheet,
  AlertCircle,
  X,
  History,
  Calendar,
  Filter as FilterIcon,
  Search,
  Info
} from 'lucide-react';
import { MOCK_DATA } from '../constants';

const Reports: React.FC = () => {
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Date filter state
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');
  const [appliedDateRange, setAppliedDateRange] = useState({ start: '2024-01-01', end: '2024-01-31' });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = (type: 'CSV' | 'PDF') => {
    setIsExporting(type);
    setTimeout(() => {
      setIsExporting(null);
      alert(`${type} berhasil diunduh untuk periode ${appliedDateRange.start} s/d ${appliedDateRange.end} (Simulasi)`);
    }, 2000);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleDownloadTemplate = () => {
    alert('Mengunduh template_import_kunjungan.xlsx... (Simulasi)');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsImporting(true);
      setTimeout(() => {
        setIsImporting(false);
        setImportSuccess(true);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setTimeout(() => setImportSuccess(false), 4000);
      }, 2500);
    }
  };

  const handleApplyFilter = () => {
    setIsFiltering(true);
    // Simulate API delay for filtering
    setTimeout(() => {
      setAppliedDateRange({ start: startDate, end: endDate });
      setIsFiltering(false);
    }, 800 * (Math.random() * 0.5 + 0.5)); // Short random delay
  };

  // Simulated dynamic data based on the selected date range
  const filteredData = useMemo(() => {
    const seed = (new Date(appliedDateRange.start).getTime() + new Date(appliedDateRange.end).getTime()) / 1000000;
    
    return MOCK_DATA.kelurahan.map(item => {
      const variation = Math.floor(Math.sin(seed + item.name.length) * 50);
      return {
        ...item,
        visits: Math.max(10, item.visits + variation)
      };
    });
  }, [appliedDateRange]);

  const historyLogs = [
    { user: 'Admin', action: 'Export Laporan Bulanan', date: '20 Feb 2024, 14:20' },
    { user: 'Operator', action: 'Import Data Kelurahan', date: '19 Feb 2024, 09:15' },
    { user: 'Admin', action: 'Update Parameter BPJS', date: '18 Feb 2024, 16:45' },
  ];

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 transition-colors relative">
      {/* Header & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Laporan & Data</h2>
          <p className="text-slate-500 dark:text-slate-400">Kelola ekspor, impor, dan filter rentang waktu data kunjungan.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept=".csv, .xlsx, .xls"
          />
          
          <div className="flex flex-col items-end gap-1">
            <button
              onClick={handleImportClick}
              disabled={isImporting || isExporting !== null || isFiltering}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-sky-200 dark:border-sky-900 text-sky-600 dark:text-sky-400 rounded-xl font-semibold hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all disabled:opacity-50 shadow-sm"
            >
              {isImporting ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
              {isImporting ? 'Memproses...' : 'Import Data'}
            </button>
            <button 
              onClick={handleDownloadTemplate}
              className="text-[10px] font-bold text-sky-500 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 flex items-center gap-1 mr-1 transition-colors"
            >
              <Info size={10} /> Download Format Template
            </button>
          </div>

          <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700 mx-1 hidden lg:block"></div>

          <button
            onClick={() => handleExport('CSV')}
            disabled={isImporting || isExporting !== null || isFiltering}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all disabled:opacity-50"
          >
            {isExporting === 'CSV' ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
            CSV
          </button>
          <button
            onClick={() => handleExport('PDF')}
            disabled={isImporting || isExporting !== null || isFiltering}
            className="flex items-center gap-2 px-6 py-2 bg-sky-600 text-white rounded-xl font-semibold hover:bg-sky-700 transition-all shadow-lg shadow-sky-100 dark:shadow-none disabled:opacity-50"
          >
            {isExporting === 'PDF' ? <Loader2 size={18} className="animate-spin" /> : <FileDown size={18} />}
            Export PDF
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-4 transition-colors">
        <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 mr-2">
          <FilterIcon size={18} />
          <span className="text-sm font-bold uppercase tracking-wider">Filter Data:</span>
        </div>
        
        <div className="flex flex-1 flex-col sm:flex-row items-center gap-4 w-full">
          <div className="flex flex-1 items-center gap-3 w-full">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Calendar size={14}/></span>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900/40 outline-none transition-all"
              />
            </div>
            <span className="text-slate-400 font-bold">s/d</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Calendar size={14}/></span>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-900/40 outline-none transition-all"
              />
            </div>
          </div>
          <button 
            onClick={handleApplyFilter}
            disabled={isFiltering}
            className="w-full sm:w-auto px-6 py-2 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 rounded-xl font-bold hover:bg-sky-100 dark:hover:bg-sky-900/40 transition-all flex items-center justify-center gap-2 border border-sky-100 dark:border-sky-900/50"
          >
            {isFiltering ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Terapkan Filter
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {importSuccess && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 p-4 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 animate-in slide-in-from-top-2 duration-300">
          <div className="bg-emerald-500 p-1.5 rounded-full text-white">
            <CheckCircle2 size={16} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold">Data Berhasil Diimpor!</p>
            <p className="text-xs opacity-80">Database kunjungan telah diperbarui dengan data terbaru dari file.</p>
          </div>
          <button onClick={() => setImportSuccess(false)} className="text-emerald-400 hover:text-emerald-600">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Main Content Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors relative">
        {isFiltering && (
          <div className="absolute inset-0 bg-white/60 dark:bg-slate-900/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
             <div className="flex flex-col items-center gap-3">
               <Loader2 className="animate-spin text-sky-500" size={32} />
               <p className="text-sm font-bold text-slate-600 dark:text-slate-300">Memperbarui Data...</p>
             </div>
          </div>
        )}

        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-slate-100">
            <Table size={20} className="text-sky-500" />
            <span>Preview Data Kelurahan</span>
            <span className="ml-2 text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-400 dark:text-slate-500 font-normal">
              {appliedDateRange.start} — {appliedDateRange.end}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status:</span>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/30">Live Terkoneksi</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">No</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Kelurahan</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Jumlah Kunjungan</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Persentase</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Terakhir Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredData.map((item, index) => {
                const total = filteredData.reduce((acc, curr) => acc + curr.visits, 0);
                const percent = ((item.visits / total) * 100).toFixed(1);
                return (
                  <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-slate-800 dark:text-slate-100 font-bold">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 font-semibold">{item.visits}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 w-40">
                        <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-sky-400 rounded-full transition-all duration-700 ease-out" style={{ width: `${percent}%` }}></div>
                        </div>
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 w-10">{percent}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-slate-400 dark:text-slate-500 italic">Baru saja diperbarui</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* History Modal Simulation */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-sky-100 dark:bg-sky-900/20 p-2 rounded-xl text-sky-600">
                  <History size={20} />
                </div>
                <h3 className="font-bold text-xl text-slate-800 dark:text-slate-100">Riwayat Aktivitas</h3>
              </div>
              <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {historyLogs.map((log, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                   <div className="w-2 h-2 mt-2 bg-sky-500 rounded-full"></div>
                   <div>
                     <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{log.action}</p>
                     <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Oleh {log.user} • {log.date}</p>
                   </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800/30 text-center">
              <button onClick={() => setShowHistory(false)} className="px-8 py-2.5 bg-slate-800 dark:bg-slate-100 dark:text-slate-800 text-white rounded-xl font-bold hover:scale-105 transition-transform">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Links / Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-6 rounded-2xl text-white shadow-lg shadow-sky-100 dark:shadow-none group transition-all">
          <FileSpreadsheet className="mb-4 opacity-50 group-hover:scale-110 transition-transform" size={32} />
          <h4 className="font-bold text-lg">Template Import</h4>
          <p className="text-sky-100 text-sm mt-1">Unduh template CSV/Excel untuk mempermudah proses import data.</p>
          <button 
            onClick={handleDownloadTemplate}
            className="mt-4 text-sm font-bold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <Download size={14} /> Unduh Template
          </button>
        </div>
        
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-sky-200 dark:hover:border-sky-900 transition-colors">
           <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">Log Aktivitas Data</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Lihat riwayat import dan perubahan data oleh operator.</p>
          </div>
          <button 
            onClick={() => setShowHistory(true)}
            className="mt-4 text-sm font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 flex items-center gap-2 w-fit transition-colors"
          >
            Buka Riwayat <FileText size={16} />
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-sky-200 transition-colors">
           <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100">Integrasi API</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Hubungkan data secara otomatis dengan sistem pusat.</p>
          </div>
          <button className="mt-4 text-sm font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-lg cursor-not-allowed">
            Segera Hadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
