"use client"
import axios from '@/lib/axios';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';


const Donor = {
    _id: "659c20183d2190b0c0a37d53",
    name: "Shariful Islam",
    provider: "google",
    googleId: "102628776680461221475",
    isAvailable: false,
    image: "https://lh3.googleusercontent.com/a/ACg8ocLkxJturE9xJnuHCVs_466WKUTCXdf8xHcaQs3Uw5T42w=s96-c",
    lastDonation: "1971-09-02T00:00:00.000Z",
    donations: [{ _id: "5fdaa1b0e9b7b5b0c0a37d5a", date: "2020-12-16T00:00:00.000Z", isApproved: true, donor: "659c20183d2190b0c0a37d53", __v: 0 }],
    joined: "2024-01-08T16:17:28.562Z",
    area: "dagra para",
    gender: "male",
    phone: 1612178331,
    type: "b",
}

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
    donation: {},
    setDonation: (value: any) => { },
    donor: {},
    setDonor: (value: any) => { }
});

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [expandSidebar, setExpandSidebar] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [donors, setDonors] = useState([])
    const [donations, setDonations] = useState([])
    const [requests, setRequests] = useState([])
    const [donation, setDonation] = useState({})
    const [donor, setDonor] = useState({})
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
        donation,
        setDonation,
        donor,
        setDonor
    }}>
        {children}
    </DashboardContext.Provider>
}

// export default DashboardContext;

export const useDash = () => useContext(DashboardContext);