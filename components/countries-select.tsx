"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface Country {
  /** ISO 3166-1 alpha-2 code, lowercase. */
  value: string
  label: string
  /** Flag emoji — renders as Apple Color Emoji on Apple platforms. */
  flag: string
}

export interface CountryGroup {
  /** Continent name, used as the group label. */
  label: string
  items: Country[]
}

export const countryGroups: CountryGroup[] = [
  {
    label: "Africa",
    items: [
      { value: "eg", label: "Egypt", flag: "🇪🇬" },
      { value: "et", label: "Ethiopia", flag: "🇪🇹" },
      { value: "gh", label: "Ghana", flag: "🇬🇭" },
      { value: "ke", label: "Kenya", flag: "🇰🇪" },
      { value: "ma", label: "Morocco", flag: "🇲🇦" },
      { value: "ng", label: "Nigeria", flag: "🇳🇬" },
      { value: "sn", label: "Senegal", flag: "🇸🇳" },
      { value: "za", label: "South Africa", flag: "🇿🇦" },
      { value: "tz", label: "Tanzania", flag: "🇹🇿" },
      { value: "tn", label: "Tunisia", flag: "🇹🇳" },
    ],
  },
  {
    label: "Asia",
    items: [
      { value: "cn", label: "China", flag: "🇨🇳" },
      { value: "in", label: "India", flag: "🇮🇳" },
      { value: "id", label: "Indonesia", flag: "🇮🇩" },
      { value: "il", label: "Israel", flag: "🇮🇱" },
      { value: "jp", label: "Japan", flag: "🇯🇵" },
      { value: "my", label: "Malaysia", flag: "🇲🇾" },
      { value: "ph", label: "Philippines", flag: "🇵🇭" },
      { value: "sa", label: "Saudi Arabia", flag: "🇸🇦" },
      { value: "sg", label: "Singapore", flag: "🇸🇬" },
      { value: "kr", label: "South Korea", flag: "🇰🇷" },
      { value: "th", label: "Thailand", flag: "🇹🇭" },
      { value: "tr", label: "Turkey", flag: "🇹🇷" },
      { value: "ae", label: "United Arab Emirates", flag: "🇦🇪" },
      { value: "vn", label: "Vietnam", flag: "🇻🇳" },
    ],
  },
  {
    label: "Europe",
    items: [
      { value: "at", label: "Austria", flag: "🇦🇹" },
      { value: "be", label: "Belgium", flag: "🇧🇪" },
      { value: "cz", label: "Czechia", flag: "🇨🇿" },
      { value: "dk", label: "Denmark", flag: "🇩🇰" },
      { value: "fi", label: "Finland", flag: "🇫🇮" },
      { value: "fr", label: "France", flag: "🇫🇷" },
      { value: "de", label: "Germany", flag: "🇩🇪" },
      { value: "gr", label: "Greece", flag: "🇬🇷" },
      { value: "ie", label: "Ireland", flag: "🇮🇪" },
      { value: "it", label: "Italy", flag: "🇮🇹" },
      { value: "nl", label: "Netherlands", flag: "🇳🇱" },
      { value: "no", label: "Norway", flag: "🇳🇴" },
      { value: "pl", label: "Poland", flag: "🇵🇱" },
      { value: "pt", label: "Portugal", flag: "🇵🇹" },
      { value: "es", label: "Spain", flag: "🇪🇸" },
      { value: "se", label: "Sweden", flag: "🇸🇪" },
      { value: "ch", label: "Switzerland", flag: "🇨🇭" },
      { value: "ua", label: "Ukraine", flag: "🇺🇦" },
      { value: "gb", label: "United Kingdom", flag: "🇬🇧" },
    ],
  },
  {
    label: "North America",
    items: [
      { value: "ca", label: "Canada", flag: "🇨🇦" },
      { value: "cr", label: "Costa Rica", flag: "🇨🇷" },
      { value: "cu", label: "Cuba", flag: "🇨🇺" },
      { value: "do", label: "Dominican Republic", flag: "🇩🇴" },
      { value: "gt", label: "Guatemala", flag: "🇬🇹" },
      { value: "jm", label: "Jamaica", flag: "🇯🇲" },
      { value: "mx", label: "Mexico", flag: "🇲🇽" },
      { value: "pa", label: "Panama", flag: "🇵🇦" },
      { value: "us", label: "United States", flag: "🇺🇸" },
    ],
  },
  {
    label: "South America",
    items: [
      { value: "ar", label: "Argentina", flag: "🇦🇷" },
      { value: "bo", label: "Bolivia", flag: "🇧🇴" },
      { value: "br", label: "Brazil", flag: "🇧🇷" },
      { value: "cl", label: "Chile", flag: "🇨🇱" },
      { value: "co", label: "Colombia", flag: "🇨🇴" },
      { value: "ec", label: "Ecuador", flag: "🇪🇨" },
      { value: "py", label: "Paraguay", flag: "🇵🇾" },
      { value: "pe", label: "Peru", flag: "🇵🇪" },
      { value: "uy", label: "Uruguay", flag: "🇺🇾" },
      { value: "ve", label: "Venezuela", flag: "🇻🇪" },
    ],
  },
  {
    label: "Oceania",
    items: [
      { value: "au", label: "Australia", flag: "🇦🇺" },
      { value: "fj", label: "Fiji", flag: "🇫🇯" },
      { value: "nz", label: "New Zealand", flag: "🇳🇿" },
      { value: "pg", label: "Papua New Guinea", flag: "🇵🇬" },
      { value: "ws", label: "Samoa", flag: "🇼🇸" },
    ],
  },
]

function CountryFlag({ flag }: { flag: string }) {
  return (
    <span
      aria-hidden="true"
      className="w-5 shrink-0 text-center leading-none [font-family:'Apple_Color_Emoji','Segoe_UI_Emoji','Noto_Color_Emoji',sans-serif]"
    >
      {flag}
    </span>
  )
}

export interface CountriesSelectProps {
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  placeholder?: string
  id?: string
  name?: string
  disabled?: boolean
  className?: string
}

export function CountriesSelect({
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select a country",
  id,
  name,
  disabled,
  className,
}: CountriesSelectProps) {
  const items = React.useMemo(
    () => [
      { label: placeholder, value: null },
      ...countryGroups.flatMap((group) =>
        group.items.map((country) => ({
          value: country.value,
          label: (
            <>
              <CountryFlag flag={country.flag} />
              {country.label}
            </>
          ),
        }))
      ),
    ],
    [placeholder]
  )

  return (
    <Select
      items={items}
      value={value}
      defaultValue={defaultValue}
      onValueChange={
        onValueChange
          ? (nextValue) => onValueChange(nextValue as string | null)
          : undefined
      }
      name={name}
      disabled={disabled}
    >
      <SelectTrigger
        id={id}
        className={cn("w-56", className)}
        data-name="countries-select"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {countryGroups.map((group) => (
          <SelectGroup key={group.label}>
            <SelectLabel>{group.label}</SelectLabel>
            {group.items.map((country) => (
              <SelectItem key={country.value} value={country.value}>
                <CountryFlag flag={country.flag} />
                {country.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  )
}
