import React from 'react';
import { LogOut, Shield } from 'lucide-react';
import { auth } from '../firebaseAuth';
import { signOut } from 'firebase/auth';
import { RealAnalytics } from './RealAnalytics';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      onLogout();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-surface p-4 md:p-8 font-sans relative">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-surface-container/80 backdrop-blur-md border border-outline-variant p-6 rounded-3xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-container rounded-2xl flex items-center justify-center text-on-primary shadow-lg shadow-primary/20">
              <Shield size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-on-surface">TacoPDF Admin</h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <p className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
                  SysAdmin: {auth.currentUser?.email}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-error/10 hover:bg-error/20 text-error border border-error/20 rounded-xl font-bold transition-all shadow-sm cursor-pointer z-50"
            >
              <LogOut size={16} /> Keluar (Logout)
            </button>
          </div>
        </header>

        <div className="flex flex-col gap-8 relative z-10">
          <main className="w-full space-y-8">
            <section>
              <h2 className="text-xl font-bold text-on-surface border-b border-outline-variant pb-2 mb-4">Statistik Penggunaan Real-time</h2>
              <RealAnalytics />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

