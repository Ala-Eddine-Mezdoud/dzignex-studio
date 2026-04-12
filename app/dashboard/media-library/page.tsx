

import { listMedia } from "../../../features/dashboard/media-library/actions"
import { MediaLibraryClient } from "../../../features/dashboard/media-library/components"


const Page = async () => {
  const response = await listMedia()
  const initialItems = response.success && response.data ? [...response.data.folders, ...response.data.files] : []
  const initialPath = response.success && response.data ? response.data.currentPath : ""

    return (
      <div >
          <MediaLibraryClient initialItems={initialItems} initialPath={initialPath} />
      </div>
    )
}

export default Page