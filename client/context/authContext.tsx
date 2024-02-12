import axios from '@/lib/axios';
import { auth } from '@/lib/logins';
import { userProps } from '@/lib/types';
import { onAuthStateChanged } from 'firebase/auth';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{ user: userProps, loading: boolean }>({ user: {} as userProps, loading: false });

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<userProps>({} as userProps);
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                axios.get(`/signed-in-user/${user.providerData[0].uid}`)
                    .then(({ data }) => setUser(data))
                    .catch(err => console.log(err));
                setLoading(false);
            } else {
                setUser({} as userProps)
                setLoading(false);
            }
        })
    }, [])

    return <AuthContext.Provider value={{ user, loading }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;

export const useAuth = () => useContext(AuthContext);