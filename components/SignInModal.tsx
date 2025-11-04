
import React from 'react';
import Button from './Button';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSignIn }) => {
  if (!isOpen) return null;

  const handleSignInClick = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-base-100 rounded-lg shadow-2xl p-8 w-full max-w-md transform transition-all"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-neutral">Sign In</h2>
            <button onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <form onSubmit={handleSignInClick} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-base-300 rounded-md focus:ring-primary focus:border-primary"
              defaultValue="jessica.j@example.com"
            />
          </div>
          <div>
            <label htmlFor="password"className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-base-300 rounded-md focus:ring-primary focus:border-primary"
              defaultValue="password"
            />
          </div>
           <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary focus:ring-primary-focus border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary-focus">
                Forgot your password?
              </a>
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full">Sign In</Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New to Nexora?{' '}
            <a href="#" className="font-medium text-primary hover:text-primary-focus">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInModal;
