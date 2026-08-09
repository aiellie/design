"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Analytics01Icon,
  Notification01Icon,
  Settings01Icon,
} from "@hugeicons/core-free-icons"

export function TabsExample() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="overview">
            <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} />
            Overview
          </TabsTrigger>
          <TabsTrigger value="alerts">
            <HugeiconsIcon icon={Notification01Icon} strokeWidth={2} />
            Alerts
          </TabsTrigger>
          <TabsTrigger value="settings">
            <HugeiconsIcon icon={Settings01Icon} strokeWidth={2} />
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="text-muted-foreground">
          Traffic is up 12% this week, with 4,820 unique visitors across all
          projects.
        </TabsContent>
        <TabsContent value="alerts" className="text-muted-foreground">
          2 unread alerts: a deploy finished on production and a domain
          renewal is due next month.
        </TabsContent>
        <TabsContent value="settings" className="text-muted-foreground">
          Manage workspace name, members, and notification preferences.
        </TabsContent>
      </Tabs>
      <Tabs defaultValue="preview" className="w-full">
        <TabsList variant="line">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="export" disabled>
            Export
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="text-muted-foreground">
          The line variant keeps tabs flush with the surrounding layout.
        </TabsContent>
        <TabsContent value="code" className="text-muted-foreground">
          <code className="font-mono text-xs">
            &lt;TabsList variant=&quot;line&quot;&gt;
          </code>
        </TabsContent>
      </Tabs>
    </div>
  )
}
