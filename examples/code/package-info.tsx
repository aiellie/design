"use client";

import {
  PackageInfo,
  PackageInfoChangeType,
  PackageInfoContent,
  PackageInfoDependencies,
  PackageInfoDependency,
  PackageInfoDescription,
  PackageInfoHeader,
  PackageInfoName,
  PackageInfoVersion,
} from "@/components/code/package-info";

export function PackageInfoExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <PackageInfo
        changeType="minor"
        currentVersion="18.2.0"
        name="react"
        newVersion="18.3.1"
      />
      <PackageInfo changeType="added" name="@tanstack/react-query" newVersion="5.59.0">
        <PackageInfoHeader>
          <PackageInfoName />
          <PackageInfoChangeType />
        </PackageInfoHeader>
        <PackageInfoVersion />
        <PackageInfoDescription>
          Powerful asynchronous state management for fetching, caching, and
          updating data.
        </PackageInfoDescription>
        <PackageInfoContent>
          <PackageInfoDependencies>
            <PackageInfoDependency name="@tanstack/query-core" version="5.59.0" />
          </PackageInfoDependencies>
        </PackageInfoContent>
      </PackageInfo>
      <PackageInfo
        changeType="removed"
        currentVersion="4.17.21"
        name="lodash"
      />
    </div>
  );
}
