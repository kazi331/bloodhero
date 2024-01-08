import axios from '@/lib/axios';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({ user: null, loading: false });

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true)
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