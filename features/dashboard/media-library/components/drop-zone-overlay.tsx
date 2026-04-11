export function DropZoneOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-dashed border-white/30 bg-slate-950/80 px-8 py-10 text-center text-white shadow-2xl">
        <p className="text-2xl font-semibold">Drop files to upload</p>
        <p className="max-w-sm text-sm text-slate-200/80">Files dropped here will upload directly to R2 in the current folder.</p>
      </div>
    </div>
  )
}
