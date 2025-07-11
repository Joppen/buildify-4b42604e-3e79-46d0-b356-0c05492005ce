
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard');
        }
      }
    };
    
    checkUser();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Demo accounts
      if (email === 'admin@buildify.com' && password === 'admin123') {
        // Admin login
        const adminUser = {
          id: 'admin-user-id',
          email: 'admin@buildify.com',
          role: 'admin',
          name: 'Admin User'
        };
        
        localStorage.setItem('user', JSON.stringify(adminUser));
        
        toast({
          title: "Admin login successful",
          description: "You have been logged in as an administrator.",
        });
        
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 500);
        return;
      } else if (email === 'demo@buildify.com' && password === 'demo123') {
        // Demo user login
        const demoUser = {
          id: 'demo-user-id',
          email: 'demo@buildify.com',
          role: 'user',
          name: 'Demo User'
        };
        
        localStorage.setItem('user', JSON.stringify(demoUser));
        
        toast({
          title: "Login successful",
          description: "You have been logged in as a demo user.",
        });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 500);
        return;
      }
      
      // If credentials don't match the demo accounts, try Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Store user in localStorage for easier access
      if (data.user) {
        localStorage.setItem('user', JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          role: 'user',
          name: data.user.email?.split('@')[0] || 'User'
        }));
      }

      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@buildify.com');
    setPassword('demo123');
  };

  const handleAdminLogin = () => {
    setEmail('admin@buildify.com');
    setPassword('admin123');
  };

  const loginWithDemo = () => {
    setEmail('demo@buildify.com');
    setPassword('demo123');
    
    // Create a synthetic form submission event
    const event = {
      preventDefault: () => {}
    } as React.FormEvent;
    
    handleLogin(event);
  };

  const loginWithAdmin = () => {
    setEmail('admin@buildify.com');
    setPassword('admin123');
    
    // Create a synthetic form submission event
    const event = {
      preventDefault: () => {}
    } as React.FormEvent;
    
    handleLogin(event);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login to your account</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          
          <div className="mt-4 space-y-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Demo Accounts</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                onClick={loginWithDemo}
                className="text-sm"
                disabled={loading}
              >
                Demo User
              </Button>
              <Button 
                variant="outline" 
                onClick={loginWithAdmin}
                className="text-sm"
                disabled={loading}
              >
                Admin User
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm text-gray-500 mt-2">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;