"use client"

import * as React from "react"

import { getStyleSheet, type StyleSheetName } from "@/lib/read-stylesheet-action"
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockDownloadButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/code/code-block"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CodeIcons } from "@/icons/icons"

export function StyleSheetCard({
  title,
  description,
  filename,
  children,
}: {
  title: string
  description: string
  filename: StyleSheetName
  children: React.ReactNode
}) {
  const [css, setCss] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    getStyleSheet(filename).then((source) => {
      if (!cancelled) setCss(source)
    })
    return () => {
      cancelled = true
    }
  }, [filename])

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardAction>
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="outline" size="xs">
                  <CodeIcons.css className="size-3.5" />
                  css
                </Button>
              }
            />
            <DialogContent className="gap-3 overflow-hidden sm:max-w-2xl">
              <DialogHeader className="pr-8">
                <DialogTitle>{filename}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
              </DialogHeader>
              {css ? (
                <CodeBlock
                  code={css.trim()}
                  language="css"
                  showLineNumbers
                  className="flex max-h-[min(28rem,60vh)] flex-col overflow-hidden rounded-lg"
                  contentClassName="min-h-0 flex-1"
                >
                  <CodeBlockHeader>
                    <CodeBlockTitle>
                      <CodeIcons.css className="size-3.5" />
                      <CodeBlockFilename>styles/{filename}</CodeBlockFilename>
                    </CodeBlockTitle>
                    <CodeBlockActions>
                      <CodeBlockCopyButton />
                      <CodeBlockDownloadButton filename={filename} />
                    </CodeBlockActions>
                  </CodeBlockHeader>
                </CodeBlock>
              ) : (
                <div className="h-40 animate-pulse rounded-lg bg-muted" />
              )}
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        <Breadcrumb>
          <BreadcrumbList className="gap-0.5 font-mono text-xs">
            <BreadcrumbItem>
              <BreadcrumbLink href="#" className="flex items-center gap-1.5">
                <CodeIcons.css className="size-3.5" />
                styles
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>{filename}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Badge variant="secondary" className="shrink-0 font-mono">
          css
        </Badge>
      </CardFooter>
    </Card>
  )
}
