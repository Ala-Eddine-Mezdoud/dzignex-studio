import { HardDrive, Image, Video, FileText } from "lucide-react"
import { Button } from "../../components/ui/button"
import { cn } from "../../../../lib/utils"

interface SidebarSection {
  title: string
  items: SidebarItem[]
}

interface SidebarItem {
  id: string
  label: string
  icon: React.ElementType
  count?: number
  active?: boolean
}

interface MediaSidebarProps {
  currentSection?: string
  onSectionChange?: (section: string) => void
  storageUsed?: string
  storagePercentage?: number
}

export function MediaSidebar({ currentSection = "all", onSectionChange, storageUsed = "0 B", storagePercentage = 0 }: MediaSidebarProps) {
  const sections: SidebarSection[] = [
    {
      title: "Favorites",
      items: [
        { id: "all", label: "All Media", icon: HardDrive, active: currentSection === "all" },
        { id: "images", label: "Images", icon: Image, active: currentSection === "images" },
        { id: "videos", label: "Videos", icon: Video, active: currentSection === "videos" },
        { id: "documents", label: "Documents", icon: FileText, active: currentSection === "documents" },
      ],
    },
  ]

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border/50 bg-muted/30">
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="mb-2 px-3 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">
              {section.title}
            </h3>
            <nav className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.id}
                    onClick={() => onSectionChange?.(item.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      item.active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.count !== undefined && (
                      <span className="text-xs opacity-60">{item.count}</span>
                    )}
                  </button>
                )
              })}
            </nav>
          </div>
        ))}
      </div>
      
      <div className="border-t border-border/50 px-3 py-3">
        <div className="rounded-lg bg-muted/50 px-3 py-2">
          <p className="text-xs text-muted-foreground">
            Storage used: <span className="font-medium text-foreground">{storageUsed}</span>
          </p>
          <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted">
            <div 
              className="h-1.5 rounded-full bg-primary transition-all" 
              style={{ width: `${Math.min(storagePercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  )
}
