"use client"

import {
  EnvironmentVariable,
  EnvironmentVariableCopyButton,
  EnvironmentVariableGroup,
  EnvironmentVariableName,
  EnvironmentVariableRequired,
  EnvironmentVariables,
  EnvironmentVariablesContent,
  EnvironmentVariablesDownloadButton,
  EnvironmentVariablesHeader,
  EnvironmentVariablesTitle,
  EnvironmentVariablesToggle,
  EnvironmentVariableValue,
} from "@/components/code/environment-variables"

const variables = [
  {
    name: "DATABASE_URL",
    required: true,
    value: "postgresql://localhost:5432/mydb",
  },
  {
    name: "API_KEY",
    required: true,
    value: "sk-1234567890abcdef",
  },
  {
    name: "NODE_ENV",
    required: false,
    value: "production",
  },
  {
    name: "PORT",
    required: false,
    value: "3000",
  },
] satisfies {
  name: string
  required: boolean
  value: string
}[]

export function EnvironmentVariablesExample() {
  return (
    <div className="flex w-full justify-center">
        <div className="w-full max-w-lg border-none">
        <EnvironmentVariables defaultShowValues={false}>
          <EnvironmentVariablesHeader>
            <EnvironmentVariablesTitle />
            <EnvironmentVariableGroup className="shrink-0 gap-1">
              <EnvironmentVariablesToggle />
              <EnvironmentVariablesDownloadButton />
            </EnvironmentVariableGroup>
          </EnvironmentVariablesHeader>
          <EnvironmentVariablesContent>
            {variables.map((variable) => (
              <EnvironmentVariable
                key={variable.name}
                name={variable.name}
                value={variable.value}
              >
                <EnvironmentVariableGroup className="min-w-0">
                  <EnvironmentVariableName />
                  {variable.required && <EnvironmentVariableRequired />}
                </EnvironmentVariableGroup>
                <EnvironmentVariableGroup className="shrink-0">
                  {variable.value ? (
                    <EnvironmentVariableValue />
                  ) : (
                    // Children override the masked value — nothing to hide here.
                    <EnvironmentVariableValue className="italic">
                      Not set
                    </EnvironmentVariableValue>
                  )}
                  <EnvironmentVariableCopyButton
                    disabled={!variable.value}
                    tooltip={
                      variable.value
                        ? undefined
                        : "Nothing to copy — value unset"
                    }
                  />
                </EnvironmentVariableGroup>
              </EnvironmentVariable>
            ))}
          </EnvironmentVariablesContent>
        </EnvironmentVariables>
        </div>
            </div>
  )
}
