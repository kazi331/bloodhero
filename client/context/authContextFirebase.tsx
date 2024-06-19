import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext({} as any);

export const AuthProviderFirebase = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        try {
            setLoading(true);
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    // console.log(user)
                    setUser(user)
                    setLoading(false);
                    // window.location.href = '/'
                } else {
                    setUser(null)
                    setLoading(false);
                    // window.location.href = '/login'
                }
            })
        } catch (err) {
            setLoading(false)
            console.log(err);
            toast.error('Error loading user data.')
        }
        
    }, [])

    return <AuthContext.Provider value={{ user, loading }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;

export const useAuthFirebase = () => useContext(AuthContext);