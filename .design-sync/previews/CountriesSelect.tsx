// CountriesSelect preview — no repo example; composed from the source's
// public API (CountriesSelect + countryGroups). The wrapper doesn't forward
// Base UI's open/defaultOpen, so an open-popup cell isn't statically
// reachable — cells show placeholder / selected / disabled trigger states,
// with countryGroups driving the caption counts.
import { CountriesSelect, countryGroups } from "@/components/countries-select"
import { Label } from "@/components/ui/label"

const countryCount = countryGroups.reduce(
  (total, group) => total + group.items.length,
  0
)

export function Showcase() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="shipping-country">Shipping country</Label>
      <CountriesSelect
        id="shipping-country"
        defaultValue="jp"
        className="w-full"
      />
      <p className="text-sm text-muted-foreground">
        {countryCount} countries across {countryGroups.length} continents,
        grouped by region in the dropdown.
      </p>
    </div>
  )
}

export function States() {
  return (
    <div className="flex flex-col items-start gap-4">
      <CountriesSelect />
      <CountriesSelect defaultValue="br" />
      <CountriesSelect defaultValue="de" disabled />
    </div>
  )
}
