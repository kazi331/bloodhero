"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDash } from "@/context/dashboardContext";
import { donationType } from "@/lib/types";
import { useEffect } from "react";
import { DataTable } from "./DataTable";



const Donation = () => {
    const { donations, loadDonations } = useDash();
    useEffect(() => {
        loadDonations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <title>Donations | Blood Hero</title>
            <Tabs defaultValue="all" className="">
                <TabsList className="bg-gray-700/20  flex justify-start px-4 py-6 ">
                    <TabsTrigger value="all" className="data-[state=active]:bg-transparent border-b border-b-transparent data-[state=active]:border-b-primary text-gray-400 data-[state=active]:text-white ">All</TabsTrigger>
                    <TabsTrigger value="approved" className="data-[state=active]:bg-transparent border-b border-b-transparent data-[state=active]:border-b-primary text-gray-400 data-[state=active]:text-white ">Approved</TabsTrigger>
                    <TabsTrigger value="pending" className="data-[state=active]:bg-transparent border-b border-b-transparent data-[state=active]:border-b-primary text-gray-400 data-[state=active]:text-white ">Pending</TabsTrigger>
                </TabsList>
                <div className="px-4 w-full">
                    <div className="px-4 overflow-auto">
                        <TabsContent value="all" className=""><DataTable donations={donations} /></TabsContent>
                        <TabsContent value="approved" className=""><DataTable donations={donations.filter((item: donationType) => item.isApproved === true)} /></TabsContent>
                        <TabsContent value="pending" className=""><DataTable donations={donations.filter((item: donationType) => item.isApproved === false)} /></TabsContent>
                    </div>
                </div>
            </Tabs>

        </>
    )
}

export default Donation