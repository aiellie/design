"use client"

import * as React from "react"

import { CountriesSelect } from "@/components/locale/countries-select"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

export function CountriesSelectExample() {
  const [country, setCountry] = React.useState<string | null>("jp")

  return (
    <div className="flex w-full items-center justify-center">
      <FieldGroup className="w-full max-w-sm">
        <Field>
          <FieldLabel htmlFor="countries-select">Country</FieldLabel>
          <CountriesSelect
            id="countries-select"
            value={country}
            onValueChange={setCountry}
            className="w-full"
          />
          <FieldDescription>
            The full country list ships with the component, grouped by
            continent with a flag on every option.
          </FieldDescription>
        </Field>
      </FieldGroup>
    </div>
  )
}
