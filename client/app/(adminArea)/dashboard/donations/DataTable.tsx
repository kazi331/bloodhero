"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/selectDark"

import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTrigger } from "@/components/ui/drawer"
import {
    ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useDash } from "@/context/dashboardContext"
import axios from "@/lib/axios"
import { bloodType } from "@/lib/types"
import { ArrowUpDown, ChevronDownIcon, Phone, Trash } from "lucide-react"
import moment from "moment"
import Image from "next/image"
import { toast } from "sonner"

type donationType = {
    _id: string,
    date: string | Date,
    donor: string,
    hospital: string,
    isApproved: boolean,
    patient: string,
    phone: string,
    type: bloodType,
}

export const columns: ColumnDef<donationType>[] = [
    {
        id: "select",
        header: ({ table }) => (<Checkbox
            checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
        />
        ),
        cell: ({ row }) => (<Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
        />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "patient",
        // header: "Patient",
        header: ({ column }) => (<Button
            className="hover:bg-gray-700 hover:text-gray-200"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            Patient
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        )
        ,
        cell: ({ row }) => (<div className="capitalize">{row.getValue("patient")}</div>),

    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => (<a href={`tel:${row.getValue('phone')}`} className="capitalize">{row.getValue("phone")}</a>),
    },
    {
        accessorKey: "date",
        // header: "Date",
        header: ({ column }) => (<Button
            className="hover:bg-gray-700 hover:text-gray-200"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
        ),
        cell: ({ row }) => (<div className="capitalize">{moment(row.getValue("date")).format('ll')}</div>),
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (<div className="capitalize">{row.getValue("type")}</div>),
    },
    {
        accessorKey: "isApproved",
        header: "Status",
        cell: ({ row }) => {
            const { loadDonations } = useDash();
            return (<Select
                defaultValue={row.getValue('isApproved') ? 'approved' : 'pending'}
                onValueChange={async (value) => {
                    const status = value === 'approved' ? true : false;
                    try {
                        const res = await axios.patch(`/donations/${row.original._id}?status=${status}`)
                        if (res.data) toast.success('Status updated successfully!')
                        loadDonations();
                    } catch (err: any) {
                        console.log(err.message)
                        if (err.response) toast.error(err.response?.data?.message)
                    }
                }}
            >
                <SelectTrigger className={`w-28 ${row.getValue('isApproved') ? 'bg-green-600/20 text-green-500' : 'bg-yellow-600/20 text-yellow-500'} `}>
                    <SelectValue placeholder={row.getValue('isApproved') ? 'Approved' : 'Pending'} />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem defaultChecked value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
            </Select>)
        },
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const { setDonationId, setDonor, modal, setModal } = useDash();
            const fetchDonor = async () => {
                try {
                    const res = await axios.get(`/donors/${row.original.donor}`)
                    setDonor(res.data)
                } catch (err: any) {
                    console.log(err.message)
                    if (err.response) toast.error(err.response?.data?.message)
                }
            }
            return <DrawerTrigger asChild onClick={() => {
                console.log(row.original._id)
                setDonationId(row.original._id)
                console.log(modal)
                fetchDonor();
                setModal(true);
            }}><Button size="sm">View Donor</Button></DrawerTrigger>
        },
    },

]

export function DataTable({ donations }: { donations: donationType[] }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const { donation, loadDonations, setDonation, donationId, setDonationId, donor, setDonor, modal, setModal } = useDash();


    const table = useReactTable({
        data: donations,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const deleteSelected = async () => {
        try {
            const selected = table.getSelectedRowModel().rows.map((row) => row.original._id)
            const res = await axios.delete('/donations-delete-multiple', { data: { ids: selected } })
            if (res.data?.success) toast.success('Donations deleted successfully!')
            loadDonations();
        } catch (err: any) {
            console.log(err.message);
            if (err.response) toast.error(err.response?.data?.message)
        }
    }
    const approveSelected = () => {
        const selected = table.getSelectedRowModel().rows.map((row) => row.original._id)
        console.log(selected)
    }
    const pendingSelected = () => {
        const selected = table.getSelectedRowModel().rows.map((row) => row.original._id)
        console.log(selected)
    }

    return (<Drawer onClose={() => {
        setModal(false);
        setDonation({})
    }} shouldScaleBackground open={modal}>
        <div className="w-full">
            <div className="flex items-center py-2">
                {table.getSelectedRowModel().rows.length > 0 ? <Button variant="destructive_neon" size="sm" className="flex gap-1 ml-0" onClick={deleteSelected}><Trash size={16} />Delete</Button> : null}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="ml-auto" size="sm">
                            Columns <ChevronDownIcon className="ml-2 h-4 w-4 " />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800 text-white border-gray-500/20">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize hover:!bg-gray-200/20 hover:!text-white "
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border border-gray-500/20">
                <Table >
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg- bg-gray-800 border-b-gray-500/20">
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-gray-300">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody >
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className=" hover:bg-gray-500/10 border-none data-[state=selected]:bg-gray-500/30 whitespace-nowrap"
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>

        {/* Drawser area */}
        <DrawerContent className="bg-gray-700  border-none mx-auto" >
            <DrawerHeader className="text-gray-200 items-center">
                <div className="w-full  max-w-2xl mx-auto py-6 space-y-6 ">
                    <div className="flex items-center justify-center gap-8 ">
                        <Image alt="Donor Avatar"
                            className="rounded-full ring-2 ring-sky-500 ring-offset-0 object-cover object-center aspect-square "
                            height="80" width="80" src={donor?.image || "/images/user-round.png"} />
                        <div className="space-y-4 ">
                            <h1 className="text-2xl font-bold text-gray-200">{donor.name}</h1>
                            <div className='flex items-center space-x-2 mt-2 '>
                                <Badge className='capitalize rounded-md' >{donor.type?.split('')[0]} {donor.type?.split('')[1] === '-' ? 'Negative' : 'Positive'}</Badge>
                                <Badge variant={`${donor.isAvailable ? 'active_neon' : 'inactive_neon'}`} >
                                    {donor.isAvailable ? "Available" : "Unavailable"}
                                </Badge>
                                <a href={`tel:${donor.phone}`} ><Phone className={`ml-2 ${donor.isAvailable ? 'text-green-600' : 'text-yellow-500'}`} size={20} /></a>
                            </div>
                        </div>
                    </div>
                    <div className='w-full border-t-2 border-gray-200/10'></div>
                    <div className="grid gap-4 grid-cols-1 xs:grid-cols-2">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">Last Donation</p>
                            <p className="text-gray-200">{donor.lastDonation ? moment(donor.lastDonation).format('LL') : 'No record found!'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">Village</p>
                            <p className="text-gray-200 capitalize">{donor.area || 'Not provided'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">Date of Birth</p>
                            <p className="text-gray-200">{donor.dob ? moment(donor.dob).format('ll') : 'Not provided'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">Joined Date</p>
                            <p className="text-gray-200">{moment(donor.joined).format('LL')}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-400">Phone Number</p>
                            <p className="text-gray-200">{String(donor.phone) || 'not provided'}</p>
                        </div>
                    </div>
                </div>

            </DrawerHeader>
            <DrawerFooter>
                <div className="max-w-2xl mx-auto flex flex-col gap-2 w-full">
                    <Button variant="destructive_neon" className="hover:bg-red-500/40" onClick={() => {
                        axios.delete(`/donations/${donationId}`)
                            .then(res => {
                                if (res.data?.success) toast.success('Donation deleted successfully!')
                                setDonationId(null);
                                setModal(false);
                                loadDonations();
                            })
                            .catch(err => {
                                console.log(err.message)
                                if (err.response) toast.error(err.response?.data?.message)
                            })
                    }}>
                        Delete This Donation
                    </Button>
                    <DrawerClose asChild>
                        <Button variant="outline" className="text-gray-800" onClick={() => setModal(false)}>Close</Button>
                    </DrawerClose>
                </div>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
    )
}
