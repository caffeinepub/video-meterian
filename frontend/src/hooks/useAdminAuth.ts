import { createContext, useContext, useState, useEffect, type ReactNode, createElement } from 'react';

const ADMIN_USERNAME = 'odishaexam';
const ADMIN_PASSWORD = 'Odishaexam_2026#';
const STORAGE_KEY = 'vmp_admin_session';

interface AdminAuthContextType {
  isAdminAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, isAdminAuthenticated ? 'true' : 'false');
    } catch {
      // ignore
    }
  }, [isAdminAuthenticated]);

  function login(username: string, password: string): boolean {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  }

  function logout() {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  return createElement(AdminAuthContext.Provider, { value: { isAdminAuthenticated, login, logout } }, children);
}

export function useAdminAuth(): AdminAuthContextType {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
