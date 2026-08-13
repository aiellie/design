"use client"

import * as React from "react"

import { Button } from '@/components/ui/button'
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from '@/components/ui/questionnaire'

const items = [
  {
    name: "team",
    required: true,
    choices: [
      { value: "solo" },
      { value: "small" },
      { value: "medium" },
      { value: "large" },
    ],
  },
  {
    name: "focus",
    choices: [
      { value: "design" },
      { value: "engineering" },
      { value: "marketing" },
    ],
  },
  { name: "workspace" },
]

const itemClassName =
  "data-active:animate-in data-active:fade-in-0 data-active:slide-in-from-bottom-2 data-active:duration-300 motion-reduce:animate-none"

export function QuestionnaireExample() {
  const [submitted, setSubmitted] = React.useState(false)

  if (submitted) {
    return (
      <div className="flex w-full flex-col items-center gap-3 py-6 text-center">
        <p className="text-sm font-medium">Thanks — you&apos;re all set!</p>
        <p className="text-sm text-muted-foreground">
          We&apos;ll tailor your workspace with these answers.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSubmitted(false)}
        >
          Start over
        </Button>
      </div>
    )
  }

  return (
    <Questionnaire
      className="mx-auto max-w-md"
      items={items}
      shortcuts="letters"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <QuestionnaireProgress
        className="w-full"
        render={(props, state) => (
          <div {...props}>
            <div className="mb-2 flex gap-1.5" aria-hidden="true">
              {Array.from({ length: state.total }, (_, index) => (
                <span
                  key={index}
                  className={
                    index < state.current
                      ? "h-1.5 flex-1 rounded-full bg-primary"
                      : "h-1.5 flex-1 rounded-full bg-muted"
                  }
                />
              ))}
            </div>
            <span>
              Step {state.current} of {state.total}
            </span>
          </div>
        )}
      />
      <QuestionnaireItem className={itemClassName} name="team" required>
        <QuestionnaireTitle>How big is your team?</QuestionnaireTitle>
        <QuestionnaireDescription>
          This helps us pick the right defaults for you.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="solo">Just me</QuestionnaireChoice>
          <QuestionnaireChoice value="small">2–10 people</QuestionnaireChoice>
          <QuestionnaireChoice value="medium">11–50 people</QuestionnaireChoice>
          <QuestionnaireChoice value="large">50+ people</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem className={itemClassName} name="focus" multiple>
        <QuestionnaireTitle>What will you use it for?</QuestionnaireTitle>
        <QuestionnaireDescription>
          Select all that apply — you can change this later.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="design">
            Design
            <QuestionnaireChoiceDescription>
              Mockups, prototypes, and reviews
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="engineering">
            Engineering
          </QuestionnaireChoice>
          <QuestionnaireChoice value="marketing">Marketing</QuestionnaireChoice>
        </QuestionnaireChoices>
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireItem className={itemClassName} name="workspace">
        <QuestionnaireTitle>Name your workspace</QuestionnaireTitle>
        <QuestionnaireInput placeholder="Acme Inc." />
        <QuestionnaireError />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnairePrevious />
        <QuestionnaireSkip />
        <QuestionnaireNext />
        <QuestionnaireSubmit />
      </QuestionnaireActions>
    </Questionnaire>
  )
}
