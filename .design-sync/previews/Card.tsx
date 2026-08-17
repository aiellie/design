// Card preview — canonical project card ported from examples/ui/card.tsx,
// plus a minimal composition showing the basic anatomy.
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export { CardExample as Showcase } from "@/examples/ui/card"

export function Basic() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Weekly report</CardTitle>
        <CardDescription>Sent every Monday at 9:00 to the whole team.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Summary of shipped work, open reviews, and anything blocked. Edit the
          sections below to change what gets included.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" size="sm">
          Preview
        </Button>
        <Button size="sm">Save changes</Button>
      </CardFooter>
    </Card>
  )
}
