
export type TabType = 'dashboard' | 'settings' | 'reports';
export type UserRole = 'Admin' | 'Operator' | 'Viewer';

export interface UserProfile {
  name: string;
  role: UserRole;
  avatar: string;
  username: string;
  email: string;
}

export interface VisitData {
  gender: { name: string; value: number }[];
  visitType: { name: string; visits: number }[];
  paymentType: { name: string; value: number }[];
  ageGroups: { range: string; visits: number }[];
  kelurahan: { name: string; visits: number }[];
}

export interface ChartProps {
  data: any;
  title: string;
}
