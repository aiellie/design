// Carousel preview — canonical image carousel from examples/ui/carousel.tsx,
// plus a one-slide-per-view quote carousel (padding reserves room for the
// absolutely-positioned previous/next controls).
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export { CarouselExample as Showcase } from "@/examples/ui/carousel"

const quotes = [
  {
    quote: "We swapped our whole component layer in a weekend.",
    author: "Sophie L.",
    role: "Design engineer",
  },
  {
    quote: "The violet palette reads beautifully in both themes.",
    author: "Ken Ito",
    role: "Product designer",
  },
  {
    quote: "Base UI underneath means the a11y is just there.",
    author: "Nadia Ali",
    role: "Frontend lead",
  },
]

export function QuoteSlides() {
  return (
    // Inline padding: reserves 3rem per side for the absolute prev/next
    // buttons (px-12 is not in the compiled bundle CSS).
    <div className="flex w-full justify-center" style={{ paddingInline: "3rem" }}>
      <Carousel className="w-full max-w-sm">
        <CarouselContent>
          {quotes.map((entry) => (
            <CarouselItem key={entry.author}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                    <p className="text-sm leading-relaxed">
                      &ldquo;{entry.quote}&rdquo;
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {entry.author} · {entry.role}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}
