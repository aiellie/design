import { notFound } from "next/navigation"

import { Dashboard } from "@/app/components/dashboard"
import type { StatusMap } from "@/app/components/status-provider"
import { allExamples } from "@/examples"
import statuses from "@/examples/statuses.json"

export function generateStaticParams() {
  return [
    { slug: [] },
    ...allExamples.map((example) => ({ slug: [example.slug] })),
  ]
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  if (
    slug &&
    (slug.length > 1 ||
      !allExamples.some((example) => example.slug === slug[0]))
  ) {
    notFound()
  }
  return <Dashboard initialStatuses={statuses as StatusMap} />
}
