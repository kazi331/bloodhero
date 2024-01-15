import axios from '@/lib/axios';
import { userProps } from '@/lib/types';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext<{ user: userProps, loading: boolean }>({ user: {} as userProps, loading: false });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userProps>({} as userProps);
    const [loading, setLoading] = useState<boolean>(false)

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
            toast.error('Error loading user data.')
            setLoading(false)
        }
    }, [])

    return <AuthContext.Provider value={{ user, loading }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;

export const useAuth = () => useContext(AuthContext);