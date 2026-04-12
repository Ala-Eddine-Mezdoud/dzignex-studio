import { ChartAreaInteractive } from "../../features/dashboard/components/chart-area-interactive"
import { SectionCards } from "../../features/dashboard/components/section-cards"
import { getDashboardKPIs } from "../../db-actions/dashboard"

export default async function Page() {
  const kpis = await getDashboardKPIs()

  return (

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards kpis={kpis} />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>

  )
}
