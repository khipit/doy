import React, { useState } from 'react';
import { X, Music, Mail, Lock, User, Sparkles } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignup: (username: string, email: string, password: string) => void;
}

export function LoginModal({ isOpen, onClose, onLogin, onSignup }: LoginModalProps) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      onSignup(formData.username, formData.email, formData.password);
    } else {
      onLogin(formData.email, formData.password);
    }
    setFormData({ username: '', email: '', password: '' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 max-w-md w-full p-8 relative transform rotate-1 hover:rotate-0 transition-transform duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-400/10 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-2">
            <Music className="w-8 h-8 text-green-400" />
            <Sparkles className="absolute top-0 right-0 w-6 h-6 text-yellow-400 opacity-60" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 font-fredoka">
            {isSignup ? 'Join MusicNet' : 'Welcome Back'}
          </h2>
          <p className="text-gray-600 text-sm">
            {isSignup ? 'Create your music profile' : 'Sign in to your account'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:bg-green-50/50 transition-all duration-300"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:bg-green-50/50 transition-all duration-300"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl focus:outline-none focus:border-green-400 focus:bg-green-50/50 transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-400 text-black font-bold rounded-xl hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-lg hover:shadow-green-400/30 font-fredoka"
          >
            {isSignup ? '🎵 Create Account' : '🎯 Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-green-400 hover:text-green-500 font-medium transition-colors"
          >
            {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}