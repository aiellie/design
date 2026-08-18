"use client"

import {
  RateLimits,
  type RateLimitTier,
} from "@/components/models/rate-limits"

const tiers: RateLimitTier[] = [
  {
    tier: "Free",
    standard: { rpm: null, tpm: null, batchQueueLimit: null },
    longContext: { rpm: null, tpm: null, batchQueueLimit: null },
  },
  {
    tier: "Tier 1",
    standard: { rpm: 500, tpm: 500_000, batchQueueLimit: 1_500_000 },
    longContext: { rpm: null, tpm: null, batchQueueLimit: null },
  },
  {
    tier: "Tier 2",
    standard: { rpm: 5_000, tpm: 1_000_000, batchQueueLimit: 3_000_000 },
    longContext: { rpm: null, tpm: null, batchQueueLimit: null },
  },
  {
    tier: "Tier 3",
    standard: { rpm: 5_000, tpm: 2_000_000, batchQueueLimit: 100_000_000 },
    longContext: { rpm: null, tpm: null, batchQueueLimit: null },
  },
  {
    tier: "Tier 4",
    standard: { rpm: 10_000, tpm: 4_000_000, batchQueueLimit: 200_000_000 },
    longContext: {
      rpm: 10_000,
      tpm: 1_000_000,
      batchQueueLimit: 200_000_000,
    },
  },
  {
    tier: "Tier 5",
    standard: {
      rpm: 15_000,
      tpm: 40_000_000,
      batchQueueLimit: 15_000_000_000,
    },
    longContext: {
      rpm: 15_000,
      tpm: 2_000_000,
      batchQueueLimit: 15_000_000_000,
    },
  },
]

export function RateLimitsExample() {
  return <RateLimits tiers={tiers} />
}
