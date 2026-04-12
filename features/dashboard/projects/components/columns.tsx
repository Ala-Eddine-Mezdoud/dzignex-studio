"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash } from "lucide-react"
import { useState } from "react"

import { Button } from "../../../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu"
import { Checkbox } from "../../components/ui/checkbox"
import { Badge } from "../../components/ui/badge"
import { ProjectDetailsSheet } from "./ProjectDetailsSheet"
import { ProjectEditSheet } from "./ProjectEditSheet"
import { ProjectDeleteDialog } from "./ProjectDeleteDialog"

export type Project = {
  id: string
  title: string
  slug: string
  summary: string | null
  description: string | null
  category: string | null
  services: string[] | null
  thumbnailUrl: string | null
  clientName: string | null
  isPublished: boolean
}

export const columns: ColumnDef<Project>[] = [
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
    accessorKey: "thumbnailUrl",
    header: "Thumbnail",
    cell: ({ row }) => {
      const thumbnailUrl = row.getValue("thumbnailUrl") as string
      const title = row.getValue("title") as string
      
      if (!thumbnailUrl) {
        return (
          <div className="w-16 h-12 rounded-lg bg-muted flex items-center justify-center">
            <span className="text-xs text-muted-foreground">No image</span>
          </div>
        )
      }
      
      return (
        <div className="w-16 h-12 rounded-lg overflow-hidden bg-muted">
          <img 
            src={thumbnailUrl} 
            alt={title || "Project thumbnail"} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const parent = e.currentTarget.parentElement
              if (parent) {
                parent.innerHTML = '<span class="text-xs text-muted-foreground">Error</span>'
              }
            }}
          />
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "clientName",
    header: "Client",
    cell: ({ row }) => row.getValue("clientName") || "N/A",
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      return category ? <Badge variant="outline">{category}</Badge> : null
    },
  },
  {
    accessorKey: "services",
    header: "Services",
    cell: ({ row }) => {
      const services = row.getValue("services") as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {services?.map((service) => (
            <Badge key={service} variant="secondary" className="px-1 py-0 text-[10px]">
              {service}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => {
      const isPublished = row.getValue("isPublished") as boolean
      return (
        <Badge variant={isPublished ? "default" : "secondary"}>
          {isPublished ? "Published" : "Draft"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original
      const [showDetails, setShowDetails] = useState(false)
      const [showEdit, setShowEdit] = useState(false)
      const [showDelete, setShowDelete] = useState(false)

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(project.id)}
              >
                Copy project ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowDetails(true)}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowEdit(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Project
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setShowDelete(true)} className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ProjectDetailsSheet
            slug={project.slug}
            isOpen={showDetails}
            onOpenChange={setShowDetails}
          />

          <ProjectEditSheet
            open={showEdit}
            onOpenChange={setShowEdit}
            projectSlug={project.slug}
          />

          <ProjectDeleteDialog
            open={showDelete}
            onOpenChange={setShowDelete}
            projectId={project.id}
            projectTitle={project.title}
          />
        </>
      )
    },
  },
]
