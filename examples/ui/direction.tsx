"use client"

import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { DirectionProvider } from "@/components/ui/direction"
import {
  LanguageSelector,
  useTranslation,
  type Translations,
} from "@/components/locale/language-selector"

const translations: Translations<{
  incoming: string
  outgoing: string
  progress: string
  progressLabel: string
}> = {
  en: {
    dir: "ltr",
    locale: "en-US",
    values: {
      incoming: "Hey — how far along is the transfer?",
      outgoing: "Almost there, about 70%.",
      progress: "70%",
      progressLabel: "Transfer progress",
    },
  },
  ar: {
    dir: "rtl",
    locale: "ar-EG",
    values: {
      incoming: "مرحبًا — ما مدى تقدم التحويل؟",
      outgoing: "أوشكنا على الانتهاء، حوالي ٧٠٪.",
      progress: "٧٠٪",
      progressLabel: "تقدم التحويل",
    },
  },
  he: {
    dir: "rtl",
    locale: "he-IL",
    values: {
      incoming: "היי — כמה התקדמה ההעברה?",
      outgoing: "כמעט שם, בערך 70%.",
      progress: "70%",
      progressLabel: "התקדמות ההעברה",
    },
  },
}

export function DirectionExample() {
  const { language, setLanguage, dir, t } = useTranslation(translations)

  return (
    <div className="flex w-full flex-col gap-4">
      <LanguageSelector value={language} onValueChange={setLanguage} />
      <DirectionProvider direction={dir}>
        <div
          dir={dir}
          className="flex flex-col gap-3 rounded-xl border p-3"
        >
          <Bubble variant="muted">
            <BubbleContent>{t.incoming}</BubbleContent>
          </Bubble>
          <Bubble align="end">
            <BubbleContent>{t.outgoing}</BubbleContent>
          </Bubble>
         
        </div>
      </DirectionProvider>
    </div>
  )
}
