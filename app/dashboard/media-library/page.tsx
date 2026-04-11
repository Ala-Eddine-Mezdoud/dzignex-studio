

import { listMedia } from "../../../features/dashboard/media-library/actions"
import { MediaLibraryClient } from "../../../features/dashboard/media-library/components"


const Page = async () => {
  const response = await listMedia()
  const initialItems = response.success && response.data ? [...response.data.folders, ...response.data.files] : []
  const initialPath = response.success && response.data ? response.data.currentPath : ""

    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tighter">Media Library</h1>
            <p className="text-muted-foreground">Upload, organize, preview, and manage your media with folder hierarchy.</p>
          </div>
        </div>
          <MediaLibraryClient initialItems={initialItems} initialPath={initialPath} />
      </div>
    )
}

export default Page