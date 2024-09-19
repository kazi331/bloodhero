"use client"

import { useDash } from "@/context/dashboardContext";
import { useEffect } from "react";

const Requests = () => {
    const { requests, loading, loadRequests } = useDash();
    useEffect(() => {
        loadRequests();
    }, [loadRequests]);
    return (
        <>
            <title>Requests | Blood Hero</title>
            <div>
                requests
            </div>
        </>
    )
}

export default Requests