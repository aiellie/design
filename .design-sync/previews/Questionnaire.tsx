// Questionnaire preview — the repo's 3-step onboarding flow from
// examples/ui/questionnaire.tsx, plus a checked multiple-choice step with
// keyboard shortcuts and a free-text step.
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"

export { QuestionnaireExample as Showcase } from "@/examples/ui/questionnaire"

export function MultipleChoice() {
  return (
    <Questionnaire
      className="w-full max-w-md"
      items={[
        {
          name: "tools",
          choices: [
            { value: "figma" },
            { value: "code" },
            { value: "docs" },
            { value: "analytics" },
          ],
        },
      ]}
      shortcuts="letters"
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireItem name="tools" multiple>
        <QuestionnaireTitle>Which tools does your team use?</QuestionnaireTitle>
        <QuestionnaireDescription>
          We&apos;ll pre-connect the integrations you pick.
        </QuestionnaireDescription>
        <QuestionnaireChoices>
          <QuestionnaireChoice value="figma" defaultChecked>
            Figma
            <QuestionnaireChoiceDescription>
              Sync styles and components both ways
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="code" defaultChecked>
            GitHub
            <QuestionnaireChoiceDescription>
              Open pull requests when tokens change
            </QuestionnaireChoiceDescription>
          </QuestionnaireChoice>
          <QuestionnaireChoice value="docs">Notion</QuestionnaireChoice>
          <QuestionnaireChoice value="analytics">Amplitude</QuestionnaireChoice>
        </QuestionnaireChoices>
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireSubmit>Continue</QuestionnaireSubmit>
      </QuestionnaireActions>
    </Questionnaire>
  )
}

export function TextStep() {
  return (
    <Questionnaire
      className="w-full max-w-md"
      items={[{ name: "workspace" }]}
      onSubmit={(event) => event.preventDefault()}
    >
      <QuestionnaireItem name="workspace">
        <QuestionnaireTitle>Name your workspace</QuestionnaireTitle>
        <QuestionnaireDescription>
          Shown in the sidebar and on shared links.
        </QuestionnaireDescription>
        <QuestionnaireInput defaultValue="Ellie Studio" />
      </QuestionnaireItem>
      <QuestionnaireActions>
        <QuestionnaireSubmit />
      </QuestionnaireActions>
    </Questionnaire>
  )
}
