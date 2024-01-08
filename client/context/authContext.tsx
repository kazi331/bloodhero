import axios from '@/lib/axios';
import { userProps } from '@/lib/types';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{ user: userProps, loading: boolean }>({ user: {} as userProps, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<userProps>({} as userProps);

    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        setLoading(true)
        const fetchUser = async () => {
            const res = await axios.get(`/logged-user`, { withCredentials: true })
            setUser(res.data)
            setLoading(false)
        }
        try {
            fetchUser();
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }, [])
    return <AuthContext.Provider value={{ user, loading }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;

export const useAuth = () => useContext(AuthContext);