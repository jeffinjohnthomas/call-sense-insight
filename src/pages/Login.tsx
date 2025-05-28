
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Activity, Eye, EyeOff, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors = { email: '', password: '', general: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({ email: '', password: '', general: '' });

    // Simulate API call
    setTimeout(() => {
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const user = registeredUsers.find((u: any) => u.email === email);

      if (!user) {
        setErrors({ email: '', password: '', general: 'No account found with this email address. Please sign up first.' });
        setIsLoading(false);
        return;
      }

      if (user.password !== password) {
        setErrors({ email: '', password: '', general: 'Invalid email or password. Please try again.' });
        setIsLoading(false);
        return;
      }

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userName', user.name || email.split('@')[0]);
      
      toast({
        title: "Login successful",
        description: "Welcome back to CallSense Insight!",
      });
      
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <Card className="w-full max-w-md bg-gray-800/60 backdrop-blur-xl border-gray-700/50 text-white relative z-10 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 rounded-3xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex items-center justify-center space-x-2">
            <Activity className="h-8 w-8 text-cyan-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              CallSense
            </span>
            <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Welcome Back</CardTitle>
          <CardDescription className="text-gray-300">
            Sign in to access your dashboard
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {errors.general && (
              <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/30 rounded-2xl backdrop-blur-sm">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <span className="text-sm text-red-300">{errors.general}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-200">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/30 rounded-xl ${
                  errors.email ? 'border-red-500 focus:border-red-500' : ''
                }`}
                required
              />
              {errors.email && <span className="text-sm text-red-400">{errors.email}</span>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-200">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500 focus:ring-cyan-500/30 pr-10 rounded-xl ${
                    errors.password ? 'border-red-500 focus:border-red-500' : ''
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <span className="text-sm text-red-400">{errors.password}</span>}
            </div>

            <div className="text-right">
              <Link 
                to="/forgot-password" 
                className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white border border-cyan-500/30 hover:border-cyan-400/50 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
            
            <div className="text-center text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline transition-colors">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
