"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash, Shield, ShieldAlert, PanelLeftOpen  } from "lucide-react"
import { useState } from "react"

import { Button } from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Checkbox } from "../../components/ui/checkbox"
import { Badge } from "../../components/ui/badge"
import { UserDetailsSheet } from "./UserDetailsSheet"

export type User = {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  role: "ADMIN" | "USER"
  acknowledged: boolean | null
  banned: boolean
  createdAt: string | Date | null
  image: string | null
}

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as string
      const email = row.original.email
      return (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{name || "Unnamed User"}</span>
          <span className="text-xs text-muted-foreground">{email}</span>
        </div>
      )
    }
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <Badge variant={role === "ADMIN" ? "default" : "secondary"} className="gap-1">
          {role === "ADMIN" ? <Shield className="h-3 w-3" /> : null}
          {role}
        </Badge>
      )
    },
  },
  {
    accessorKey: "acknowledged",
    header: "Status",
    cell: ({ row }) => {
      const acknowledged = row.getValue("acknowledged") as boolean
      const banned = row.original.banned
      
      if (banned) {
        return (
          <Badge variant="destructive" className="gap-1">
            <ShieldAlert className="h-3 w-3" />
            Banned
          </Badge>
        )
      }
      
      return (
        <Badge variant={acknowledged ? "default" : "secondary"}>
          {acknowledged ? "Verified" : "Pending"}
        </Badge>
      )
    },
  },
  {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => row.getValue("phone") || "N/A",
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return (
        <span className="text-sm">
          {date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
      const [showDetails, setShowDetails] = useState(false)

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setShowDetails(true)}>
                <span className="sr-only">Open menu</span>
                <PanelLeftOpen className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </DropdownMenu>

          <UserDetailsSheet
            userId={user.id}
            isOpen={showDetails}
            onOpenChange={setShowDetails}
          />
        </>
      )
    },
  },
]
