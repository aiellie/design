import { Dashboard } from "@/app/components/dashboard"
import type { StatusMap } from "@/app/components/status-provider"
import statuses from "@/examples/statuses.json"

export default function Page() {
  return <Dashboard initialStatuses={statuses as StatusMap} />
}
