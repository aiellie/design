// DirectionProvider preview — the repo example is the canonical demo
// (language select + chat bubbles, English/LTR by default). The second cell
// pins the RTL state statically: direction="rtl" flips the bubble layout
// for Arabic without any interaction.
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { DirectionProvider } from "@/components/ui/direction"
import { LanguageSelector } from "@/components/language-selector"

export { DirectionExample as Showcase } from "@/examples/ui/direction"

export function RTL() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <LanguageSelector value="ar" onValueChange={() => {}} />
      <DirectionProvider direction="rtl">
        <div dir="rtl" className="flex flex-col gap-3 rounded-xl border p-3">
          <Bubble variant="muted">
            <BubbleContent>مرحبًا — ما مدى تقدم التحويل؟</BubbleContent>
          </Bubble>
          <Bubble align="end">
            <BubbleContent>أوشكنا على الانتهاء، حوالي ٧٠٪.</BubbleContent>
          </Bubble>
        </div>
      </DirectionProvider>
    </div>
  )
}
