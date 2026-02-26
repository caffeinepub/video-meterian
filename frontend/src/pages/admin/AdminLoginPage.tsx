import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAdminAuth } from '../../hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, User, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const { login, isAdminAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate({ to: '/admin' });
    }
  }, [isAdminAuthenticated, navigate]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate({ to: '/admin' });
      } else {
        setError('Incorrect username or password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 400);
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground mt-1 text-sm">Video Materials and PDFs</p>
        </div>

        <Card className="border-border shadow-card">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Sign In</CardTitle>
            <CardDescription>Enter your admin credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter admin username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                    autoFocus
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !username || !password}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Signing in…
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <a href="/" className="hover:text-primary transition-colors">← Back to main site</a>
        </p>
      </div>
    </div>
  );
}
