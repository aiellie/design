import { ExampleCard } from "@/components/example-card"
import { exampleCategories } from "@/examples"

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-muted dark:bg-background">
      <main className="mx-auto flex max-w-7xl flex-col gap-12 p-4 sm:p-6 lg:p-12">
        <header className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Design System
          </h1>
          <p className="text-muted-foreground">
            Foundations, icons, and a live example for every UI component.
          </p>
        </header>

        {exampleCategories.map((category) => (
          <section key={category.title} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold tracking-tight">
              {category.title}
            </h2>
            <div className="columns-1 gap-4 space-y-4 md:columns-2 xl:columns-3">
              {category.examples.map(
                ({ slug, name, icon, status, component: Example }) => (
                  <ExampleCard
                    key={slug}
                    title={name}
                    icon={icon}
                    status={status}
                  >
                    <Example />
                  </ExampleCard>
                )
              )}
            </div>
          </section>
        ))}
      </main>
    </div>
  )
}
