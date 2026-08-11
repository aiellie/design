"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const countryItems = {
  us: "United States",
  ca: "Canada",
  uk: "United Kingdom",
}

export function InputExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {/* Basic */}
      <Input aria-label="Basic input" placeholder="Basic input" />

      {/* Field */}
      <Field>
        <FieldLabel htmlFor="input-username">Username</FieldLabel>
        <Input id="input-username" />
        <FieldDescription>
          Choose a unique username for your account.
        </FieldDescription>
      </Field>

      {/* Field Group */}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="input-name">Name</FieldLabel>
          <Input id="input-name" />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-email">Email</FieldLabel>
          <Input id="input-email" type="email" />
          <FieldDescription>
            We&apos;ll send updates to this address.
          </FieldDescription>
        </Field>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Reset</Button>
          <Button>Submit</Button>
        </div>
      </FieldGroup>

      {/* Disabled */}
      <Field data-disabled>
        <FieldLabel htmlFor="input-disabled">Email</FieldLabel>
        <Input id="input-disabled" disabled />
        <FieldDescription>This field is currently disabled.</FieldDescription>
      </Field>

      {/* Invalid */}
      <Field data-invalid>
        <FieldLabel htmlFor="input-invalid">Invalid Input</FieldLabel>
        <Input id="input-invalid" aria-invalid />
        <FieldDescription>
          This field contains validation errors.
        </FieldDescription>
      </Field>

      {/* File */}
      <Field>
        <FieldLabel htmlFor="input-picture">Picture</FieldLabel>
        <Input id="input-picture" type="file" />
        <FieldDescription>Select a picture to upload.</FieldDescription>
      </Field>

      {/* Inline */}
      <Field orientation="horizontal">
        <Input aria-label="Search" placeholder="Search" />
        <Button>Search</Button>
      </Field>

      {/* Grid */}
      <FieldGroup className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="input-first-name">First Name</FieldLabel>
          <Input id="input-first-name" />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-last-name">Last Name</FieldLabel>
          <Input id="input-last-name" />
        </Field>
      </FieldGroup>

      {/* Required */}
      <Field>
        <FieldLabel htmlFor="input-required">Required Field *</FieldLabel>
        <Input id="input-required" required />
        <FieldDescription>This field must be filled out.</FieldDescription>
      </Field>

      {/* Badge */}
      <Field>
        <FieldLabel htmlFor="input-webhook">
          Webhook URL <Badge>Beta</Badge>
        </FieldLabel>
        <Input id="input-webhook" />
      </Field>

      {/* Input Group */}
      <Field>
        <FieldLabel htmlFor="input-website">Website URL</FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <InputGroupInput id="input-website" />
        </InputGroup>
      </Field>

      {/* Button Group */}
      <Field>
        <FieldLabel htmlFor="input-search">Search</FieldLabel>
        <ButtonGroup className="w-full">
          <Input id="input-search" placeholder="Search" />
          <Button variant="outline">Search</Button>
        </ButtonGroup>
      </Field>

      {/* Form */}
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="form-name">Name</FieldLabel>
          <Input id="form-name" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-email">Email</FieldLabel>
          <Input id="form-email" type="email" />
          <FieldDescription>
            We&apos;ll never share your email with anyone.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="form-phone">Phone</FieldLabel>
          <Input id="form-phone" type="tel" />
        </Field>
        <Field>
          <FieldLabel htmlFor="form-country">Country</FieldLabel>
          <Select items={countryItems} defaultValue="us">
            <SelectTrigger id="form-country" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="ca">Canada</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="form-address">Address</FieldLabel>
          <Input id="form-address" />
        </Field>
        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </div>
      </FieldGroup>
    </div>
  )
}
