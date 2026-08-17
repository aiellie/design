// Tabs preview — Showcase re-exports the repo example (icon tabs whose
// active label expands, over a card panel). UnderlineVariant shows the
// `line` TabsList with the active-underline marker; VerticalOrientation
// shows the stacked rail with its side panel.
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export { TabsExample as Showcase } from "@/examples/ui/tabs"

export function UnderlineVariant() {
  return (
    <div className="flex w-full justify-center">
      <Tabs defaultValue="account" className="w-full max-w-sm">
        <TabsList variant="line">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p className="text-sm text-muted-foreground">
            Update your name, email address, and public profile details.
          </p>
        </TabsContent>
        <TabsContent value="password">
          <p className="text-sm text-muted-foreground">
            Change your password and configure two-factor authentication.
          </p>
        </TabsContent>
        <TabsContent value="notifications">
          <p className="text-sm text-muted-foreground">
            Choose which updates land in your inbox and on your devices.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export function VerticalOrientation() {
  return (
    <div className="flex w-full justify-center">
      <Tabs orientation="vertical" defaultValue="general" className="w-full max-w-md">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <p className="text-sm text-muted-foreground">
            Workspace name, default language, and appearance preferences.
          </p>
        </TabsContent>
        <TabsContent value="security">
          <p className="text-sm text-muted-foreground">
            Manage sessions, passkeys, and sign-in requirements.
          </p>
        </TabsContent>
        <TabsContent value="billing">
          <p className="text-sm text-muted-foreground">
            Review invoices and update the payment method on file.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
