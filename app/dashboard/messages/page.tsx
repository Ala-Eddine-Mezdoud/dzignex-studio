import { AppSidebar } from "../../../features/dashboard/messages/components/side-bar"

export default function Page() {
  return (
    <div className="flex h-[calc(100svh-var(--header-height))] overflow-hidden">
      <AppSidebar 
        className="hidden md:flex border-r"
        style={{ "--sidebar-width": "350px" } as React.CSSProperties}
      /> 
      <div className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto">
        {Array.from({ length: 24 }).map((_, index) => (
          <div
            key={index}
            className="aspect-video h-12 w-full rounded-lg bg-muted/50"
          />
        ))}
      </div>
    </div>
  )
}
