import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseAuth';
import { onAuthStateChanged, User } from 'firebase/auth';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

interface AdminContainerProps {
  onBack: () => void;
}

export default function AdminContainer({ onBack }: AdminContainerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return user ? (
    <AdminDashboard onLogout={() => setUser(null)} />
  ) : (
    <AdminLogin onLoginSuccess={() => {}} onBack={onBack} />
  );
}
