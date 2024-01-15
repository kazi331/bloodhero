"use client"
import axios from '@/lib/axios';
import { userProps } from '@/lib/types';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

// const DashboardContext = createContext<{ user: userProps, loading: boolean }>({ user: {} as userProps, loading: false });
const DashboardContext = createContext({
    loading: false,
    expandSidebar: false,
    setExpandSidebar: (value: boolean) => { },
    donors: [],
    donations: [],
    loadDonations: () => { },
    requests: [],
    loadRequests: () => { },
    showModal: false,
    setShowModal: (value: boolean) => { },
});

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<userProps>({} as userProps);
    const [loading, setLoading] = useState<boolean>(false)
    const [expandSidebar, setExpandSidebar] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [donors, setDonors] = useState([])
    const [donations, setDonations] = useState([])
    const [requests, setRequests] = useState([])

    const loadDonations = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/donations')
            setDonations(res.data)
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.log(err.message)
            if (err.response) toast.error(err.response.data.message)
        }
    }

    const loadRequests = async () => {
        setLoading(true);
        try {
            const res = await axios.get('/requests')
            setRequests(res.data)
            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            console.log(err.message)
            if (err.response) toast.error(err.response.data.message)
        }
    }

    useEffect(() => {
        const fetchDonors = async () => {
            setLoading(true)
            try {
                const res = await axios.get('/donors')
                setDonors(res.data)
                setLoading(false)
            } catch (err: any) {
                setLoading(false)
                console.log(err.message)
                if (err.response) toast.error(err.response.data.message)
            }
        }
        fetchDonors()
    }, [])

    return <DashboardContext.Provider value={{

        loading,
        expandSidebar,
        setExpandSidebar,
        donors,
        donations,
        loadDonations,
        requests,
        loadRequests,
        showModal,
        setShowModal,
    }}>
        {children}
    </DashboardContext.Provider>
}

// export default DashboardContext;

export const useDash = () => useContext(DashboardContext);