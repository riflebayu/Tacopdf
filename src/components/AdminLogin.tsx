import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, ShieldAlert } from 'lucide-react';
import { auth } from '../firebaseAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export default function AdminLogin({ onLoginSuccess, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err: any) {
      console.error(err);
      setError('Gagal login. Periksa kembali email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md bg-surface-container border border-outline-variant p-8 rounded-3xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary-container to-primary" />
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-container/20 text-primary mb-4 border border-primary/20">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-bold text-on-surface">Admin Login</h2>
          <p className="text-sm text-on-surface-variant mt-2">Masuk ke panel kontrol TacoPDF</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl flex items-start gap-3"
          >
            <ShieldAlert className="text-error shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-error">{error}</p>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-surface border border-outline-variant rounded-xl py-3 pl-11 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="admin@tacopdf.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-on-surface mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-on-surface-variant">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-surface border border-outline-variant rounded-xl py-3 pl-11 pr-4 text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-on-primary font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100 mt-2 cursor-pointer"
          >
            {loading ? 'Memeriksa...' : 'Masuk ke Dashboard'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={onBack}
            className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
          >
            &larr; Kembali ke Beranda
          </button>
        </div>
      </motion.div>
    </div>
  );
}
