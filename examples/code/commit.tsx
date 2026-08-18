"use client"

import {
  Commit,
  CommitActions,
  CommitAuthor,
  CommitAuthorAvatar,
  CommitContent,
  CommitCopyButton,
  CommitFile,
  CommitFileAdditions,
  CommitFileChanges,
  CommitFileDeletions,
  CommitFileIcon,
  CommitFileInfo,
  CommitFilePath,
  CommitFiles,
  CommitFileStatus,
  CommitHash,
  CommitHeader,
  CommitInfo,
  CommitMessage,
  CommitMetadata,
  CommitSeparator,
  CommitTimestamp,
} from "@/components/code/commit"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const DAY = 24 * 60 * 60 * 1000

// Anchored to UTC noon so the relative label is stable no matter what time of
// day the page renders, and identical on the server and the client.
const daysAgo = (days: number) =>
  new Date(Math.floor(Date.now() / DAY) * DAY + DAY / 2 - days * DAY)

const commit = {
  author: "Aiellie",
  avatar: "/avatars/elliegithub.png",
  fullHash: "9f4e2b1c8d0a3e5f7419b6c2d8053ae1",
  hash: "9f4e2b1",
  initials: "AI",
  message: "feat(ai): add streaming to the chat composer",
}

const files = [
  {
    additions: 159,
    deletions: 0,
    path: "components/code/artifact.tsx",
    status: "added",
  },
  {
    additions: 471,
    deletions: 0,
    path: "components/code/commit.tsx",
    status: "added",
  },
  {
    additions: 62,
    deletions: 2,
    path: "registry.json",
    status: "modified",
  },
  {
    additions: 8,
    deletions: 3,
    path: "app/globals.css",
    status: "modified",
  },
  {
    additions: 0,
    deletions: 0,
    path: "docs/patterns.md",
    status: "renamed",
  },
  {
    additions: 0,
    deletions: 88,
    path: "components/legacy/commit-card.tsx",
    status: "deleted",
  },
] satisfies {
  additions: number
  deletions: number
  path: string
  status: "added" | "modified" | "deleted" | "renamed"
}[]

const handleCopy = () => {
  console.log("Copied commit hash to clipboard")
}

const handleCopyError = () => {
  console.error("Failed to copy commit hash to clipboard")
}

export function CommitExample() {
  return (
      <div className="w-full max-w-lg border-none">
        <Commit >
          <CommitHeader>
            <CommitAuthor>
              <CommitAuthorAvatar
                alt={`${commit.author} avatar`}
                initials={commit.initials}
                src={commit.avatar}
              />
            </CommitAuthor>
            <CommitInfo>
              <CommitMessage>{commit.message}</CommitMessage>
              <CommitMetadata>
                <span>{commit.author}</span>
                <CommitSeparator />
                <CommitHash>{commit.hash}</CommitHash>
                <CommitSeparator />
                <CommitTimestamp date={daysAgo(1)} />
              </CommitMetadata>
            </CommitInfo>
            <CommitActions>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <CommitCopyButton
                      hash={commit.fullHash}
                      onCopy={handleCopy}
                      onError={handleCopyError}
                    />
                  }
                />
                <TooltipContent>Copy commit hash</TooltipContent>
              </Tooltip>
            </CommitActions>
          </CommitHeader>
          <CommitContent>
            <CommitFiles>
              {files.map((file) => (
                <CommitFile key={file.path}>
                  <CommitFileInfo>
                    <CommitFileStatus status={file.status} />
                    <CommitFileIcon path={file.path} />
                    <CommitFilePath>{file.path}</CommitFilePath>
                  </CommitFileInfo>
                  <CommitFileChanges>
                    <CommitFileAdditions count={file.additions} />
                    <CommitFileDeletions count={file.deletions} />
                  </CommitFileChanges>
                </CommitFile>
              ))}
            </CommitFiles>
          </CommitContent>
        </Commit>
      </div>
  )
}
