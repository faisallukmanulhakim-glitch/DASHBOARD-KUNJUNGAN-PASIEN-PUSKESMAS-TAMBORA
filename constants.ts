
export const COLORS = {
  primary: '#0ea5e9',
  secondary: '#64748b',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  chart: ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#0284c7'],
  gender: ['#38bdf8', '#fb7185']
};

export const MOCK_DATA = {
  gender: [
    { name: 'Laki-laki', value: 450 },
    { name: 'Perempuan', value: 550 },
  ],
  visitType: [
    { name: 'Kunjungan Baru', visits: 320 },
    { name: 'Kunjungan Lama', visits: 680 },
  ],
  paymentType: [
    { name: 'BPJS', value: 750 },
    { name: 'Umum', value: 200 },
    { name: 'Asuransi Lain', value: 50 },
  ],
  ageGroups: [
    { range: '0-5', visits: 120 },
    { range: '6-12', visits: 80 },
    { range: '13-18', visits: 150 },
    { range: '19-45', visits: 380 },
    { range: '46-60', visits: 210 },
    { range: '60+', visits: 60 },
  ],
  kelurahan: [
    { name: 'Tambora', visits: 180 },
    { name: 'Jembatan Besi', visits: 210 },
    { name: 'Angke', visits: 140 },
    { name: 'Pekojan', visits: 130 },
    { name: 'Roa Malaka', visits: 90 },
    { name: 'Krendang', visits: 250 },
  ].sort((a, b) => b.visits - a.visits),
};
