import axios from '@/lib/axios';
import { donorType } from '@/lib/types';
import { useSearchParams } from 'next/navigation';
import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const DonorContext = createContext({
    donors: [] as donorType[],
    loading: false,
});

export const DonorProvider = ({ children }: { children: ReactNode }) => {

    const parmas = useSearchParams().toString();
    const [donors, setDonors] = useState<donorType[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchDonors = async () => {
            setLoading(true)
            try {
                const res = await axios.get(`/donors?${parmas}`)
                const donors: donorType[] = await res.data;
                setDonors(donors)
                setLoading(false)
            } catch (err) {
                setLoading(false)
                // setDonors([])
            }
        }
        fetchDonors();
    }, [parmas]);

    return <DonorContext.Provider value={{ donors, loading }}>
        {children}
    </DonorContext.Provider>
}

export default DonorContext;

export const useDonors = () => useContext(DonorContext);