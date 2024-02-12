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
        onAuthStateChanged(auth, async (user) => {
            try {

                if (user) {
                    const token = await user.getIdToken();
                    const res = await axios.get(`/signed-in-user/${user.providerData[0].uid}`)
                    setUser({ ...res.data, token })
                    setLoading(false);
                } else {
                    setUser({} as userProps)
                    setLoading(false);
                }
            } catch (error: any) {
                console.log(error.message)
            }
        })
    }, [])

    return <AuthContext.Provider value={{ user, loading }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;

export const useAuth = () => useContext(AuthContext);
