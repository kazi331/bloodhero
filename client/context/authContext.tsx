import { auth } from '@/lib/SocialLogin';
import { userProps } from '@/lib/types';
import { onAuthStateChanged } from 'firebase/auth';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext<{ user: userProps, loading: boolean }>({ user: {} as userProps, loading: false });

export const AuthProvider = ({ children }: { children: ReactNode }) => {


    const [user, setUser] = useState<userProps>({} as userProps);
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true)
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
                console.log(user.providerData[0]);
                setUser({
                    _id: user.uid,
                    name: user.displayName,
                    email: user.email,
                    image: user.photoURL,
                    joined: user.metadata.creationTime,
                })
            } else {
                setLoading(false)
                setUser({} as userProps)
            }

        })
    }, [])

    return <AuthContext.Provider value={{ user, loading }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;

export const useAuth = () => useContext(AuthContext);