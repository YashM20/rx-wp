import { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

type AuthContextType = {
  isLoaded: boolean;
  isSignedIn: boolean;
  signIn: (phoneNumber: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: { phoneNumber: string } | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<{ phoneNumber: string } | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userString = await SecureStore.getItemAsync('user');
      if (userString) {
        setUser(JSON.parse(userString));
      }
    } catch (error) {
      console.log('Error loading user:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  const signIn = async (phoneNumber: string) => {
    const userData = { phoneNumber };
    await SecureStore.setItemAsync('user', JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoaded,
        isSignedIn: !!user,
        signIn,
        signOut,
        user,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};