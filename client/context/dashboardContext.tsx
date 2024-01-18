"use client"
import axios from '@/lib/axios';
import { donorType } from '@/lib/types';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';


// const DashboardContext = createContext<{ user: userProps, loading: boolean }>({ user: {} as userProps, loading: false });
const DashboardContext = createContext<{
    loading: boolean,
    expandSidebar: boolean,
    setExpandSidebar: (value: boolean) => void,
    donors: any[],
    donations: any[],
    loadDonations: () => void,
    requests: any[],
    loadRequests: () => void,
    modal: boolean | undefined,
    setModal: (value: boolean) => void,
    donation: any,
    setDonation: (value: any) => void,
    donor: donorType,
    setDonor: (value: any) => void,
    donationId: string | null,
    setDonationId: (value: any) => void,


}>({
    loading: false,
    expandSidebar: false,
    setExpandSidebar: (value: boolean) => { },
    donors: [],
    donations: [],
    loadDonations: () => { },
    requests: [],
    loadRequests: () => { },
    modal: undefined,
    setModal: (value: boolean) => { },
    donation: {},
    setDonation: (value: any) => { },
    donor: {
        _id: "",
        name: "",
        dob: "",
        isAvailable: false,
        image: "",
        lastDonation: "",
        donations: [],
        joined: "",
        area: "",
        gender: "male",
        phone: 0,
        type: "a",
    },
    setDonor: (value: any) => { },
    donationId: null,
    setDonationId: (value: any) => { },
});

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [expandSidebar, setExpandSidebar] = useState<boolean>(false)
    const [donors, setDonors] = useState([])
    const [donations, setDonations] = useState([])
    const [requests, setRequests] = useState([])
    const [donation, setDonation] = useState({})
    const [donationId, setDonationId] = useState(null)
    const [donor, setDonor] = useState({} as donorType)
    const [modal, setModal] = useState<undefined | boolean>(false);

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
        donation, setDonation,
        donor, setDonor,
        donationId,
        setDonationId,
        modal, setModal
    }}>
        {children}
    </DashboardContext.Provider>
}

// export default DashboardContext;

export const useDash = () => useContext(DashboardContext);