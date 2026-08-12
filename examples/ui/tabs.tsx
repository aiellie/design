"use client"

import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Analytics01Icon,
  DashboardSquare01Icon,
  File01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons"

const tabs = [
  {
    value: "overview",
    label: "Overview",
    icon: DashboardSquare01Icon,
    description:
      "View your key metrics and recent project activity. Track progress across all your active projects.",
    content: "You have 12 active projects and 3 pending tasks.",
  },
  {
    value: "analytics",
    label: "Analytics",
    icon: Analytics01Icon,
    description:
      "Track performance and user engagement metrics. Monitor trends and identify growth opportunities.",
    content: "Page views are up 25% compared to last month.",
  },
  {
    value: "reports",
    label: "Reports",
    icon: File01Icon,
    description:
      "Generate and download your detailed reports. Export data in multiple formats for analysis.",
    content: "You have 5 reports ready and available to export.",
  },
  {
    value: "settings",
    label: "Settings",
    icon: Settings01Icon,
    description:
      "Manage your account preferences and options. Customize your experience to fit your needs.",
    content: "Configure notifications, security, and themes.",
  },
]

export function TabsExample() {
  const [activeTab, setActiveTab] = React.useState<string>("overview")

  return (
    <div className="flex w-full items-center justify-center">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as string)}
        className="w-[400px]"
      >
        <TabsList>
          {tabs.map((tab) => (
            <Tooltip key={tab.value} disabled={activeTab === tab.value}>
              <TooltipTrigger
                render={
                  <TabsTrigger
                    value={tab.value}
                    className="group/trigger flex-none gap-0"
                  >
                    <HugeiconsIcon icon={tab.icon} strokeWidth={2} />
                    <span className="inline-grid grid-cols-[0fr] transition-[grid-template-columns] duration-300 ease-out group-data-active/trigger:grid-cols-[1fr]">
                      <span className="min-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-300 group-data-active/trigger:pl-1.5 group-data-active/trigger:opacity-100">
                        {tab.label}
                      </span>
                    </span>
                  </TabsTrigger>
                }
              />
              <TooltipContent>{tab.label}</TooltipContent>
            </Tooltip>
          ))}
        </TabsList>
        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon
                    icon={tab.icon}
                    className="text-muted-foreground size-5"
                  />
                  {tab.label}
                </CardTitle>
                <CardDescription>{tab.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {tab.content}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
