"use client"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useDash } from "@/context/dashboardContext"
import axios from "@/lib/axios"
import { ArrowUpDown, ChevronDownIcon } from "lucide-react"
import moment from "moment"
import { toast } from "sonner"

export type donation = {
    _id: string,
    date: string | Date,
    donor: string,
    hospital: string,
    isApproved: boolean,
    patient: string,
    phone: string,
    type: string,
}

export const columns: ColumnDef<donation>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
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
        header: ({ column }) => {
            return (
                <Button
                    className="hover:bg-gray-700 hover:text-gray-200"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Patient
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
        header: ({ column }) => {
            return (
                <Button
                    className="hover:bg-gray-700 hover:text-gray-200"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
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
        cell: ({ row }) => (<div className="capitalize">{row.getValue("isApproved") ?
            <Badge variant="active_neon">Approved</Badge> : <Badge variant="inactive_neon">Pending</Badge>}</div>),
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => {
            const { setDonation, setDonor } = useDash();

            const fetchDonor = async () => {
                try {
                    const res = await axios.get(`/donors/${row.original.donor}`)
                    setDonor(res.data)
                    console.log(res.data)
                } catch (err: any) {
                    console.log(err.message)
                    if (err.response) toast.error(err.response?.data?.message)
                }
            }




            return <DrawerTrigger asChild onClick={() => {
                setDonation(row.original)
                fetchDonor()
            }}><Button size="sm">View Donor</Button></DrawerTrigger>
        },
    },

]

export function DataTable({ donations }: { donations: any }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const { donation, setDonation, donor, setDonor } = useDash();

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

    return (<Drawer onClose={() => setDonation({})} >
        <div className="w-full">
            <div className="flex items-center py-2 pl-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getSelectedRowModel().rows.length > 0 ? <Button variant="destructive" onClick={() => {
                        const selected = table.getSelectedRowModel().rows.map((row) => row.original._id)
                        console.log(selected)
                    }}>Delete Selected</Button> : null}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="ml-auto">
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
        <DrawerContent className="bg-gray-700  border-none mx-auto max-w-2xl">
            <DrawerHeader className="text-gray-200">
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>

                <div className="text-sm overflow-hidden">
                    <div className="fixed inset-0 overflow-hidden z-50">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            {/* Overlay */}
                            <div className="fixed inset-0 transition-opacity">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                            </div>

                            {/* Drawer */}
                            <div className=" p-6 rounded-lg shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                                {/* Donor Information */}
                                <div className="mt-6">
                                    <h2 className="text-2xl font-semibold mb-4">Donor Information</h2>
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={donor.image}
                                            alt={donor.name}
                                            className="w-10 h-10 rounded-full mr-2"
                                        />
                                        <div>
                                            <p className="font-semibold">{donor.name}</p>
                                            <p className="text-gray-500">{donor.area}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-semibold mr-2">Phone:</span>
                                        <span>{donor.phone}</span>
                                    </div>
                                    {/* Add other donor information as needed */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </DrawerHeader>
            <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose asChild>
                    <Button variant="outline" className="text-gray-800">Close</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
    )
}
