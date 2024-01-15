"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDash } from "@/context/dashboardContext";
import { useEffect } from "react";
import { Approved } from "./Approved";


const donations = () => {
    const { donations, loadDonations } = useDash();
    useEffect(() => {
        loadDonations();
    }, []);
    console.log(donations)
    return (
        <>
            <title>Donations | Blood Hero</title>
            <Tabs defaultValue="approved" className="w-full">
                <TabsList className="bg-gray-700/20 w-full flex justify-start px-4 py-6 ">
                    <TabsTrigger value="approved" className="data-[state=active]:bg-transparent border-b border-b-transparent data-[state=active]:border-b-primary text-gray-400 data-[state=active]:text-white ">Approved</TabsTrigger>
                    <TabsTrigger value="pending" className="data-[state=active]:bg-transparent border-b border-b-transparent data-[state=active]:border-b-primary text-gray-400 data-[state=active]:text-white ">Pending</TabsTrigger>
                    <TabsTrigger value="rejected" className="data-[state=active]:bg-transparent border-b border-b-transparent data-[state=active]:border-b-primary text-gray-400 data-[state=active]:text-white ">Rejected</TabsTrigger>
                </TabsList>
                <div className="px-4">
                    <TabsContent value="approved"><Approved donations={donations} /></TabsContent>
                    <TabsContent value="pending">Pending donations</TabsContent>
                    <TabsContent value="rejected">Rejected Donations</TabsContent>
                </div>
            </Tabs>

        </>
    )
}

export default donations