import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({} as any);

export const AuthProvider2 = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
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
    }, [])

    return <AuthContext.Provider value={{ user, loading }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;

export const useAuth2 = () => useContext(AuthContext);