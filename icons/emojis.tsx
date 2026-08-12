import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Emoji glyphs for the icon gallery. Covers every RGI flag emoji: the 249
 * assigned ISO 3166-1 alpha-2 codes, the extra CLDR regions (Kosovo, Canary
 * Islands, EU, UN, ...), and the three subdivision flags (England, Scotland,
 * Wales). Flags are generated from their codes so an entry can never drift
 * out of sync with its glyph.
 */

export interface FlagEmoji {
  /** ISO 3166-1 alpha-2 code, or a CLDR subdivision code like "gbsct". */
  code: string
  label: string
  flag: string
}

export interface FlagEmojiGroup {
  label: string
  items: FlagEmoji[]
}

/**
 * Builds a flag emoji from an ISO 3166-1 alpha-2 code ("fr" → France) or a
 * CLDR subdivision code ("gbsct" → Scotland).
 */
export function flagEmoji(code: string): string {
  if (code.length === 2) {
    return String.fromCodePoint(
      ...[...code.toUpperCase()].map((char) => 0x1f1e6 + char.charCodeAt(0) - 65)
    )
  }
  return `\u{1F3F4}${[...code.toLowerCase()]
    .map((char) => String.fromCodePoint(0xe0000 + char.charCodeAt(0)))
    .join("")}\u{E007F}`
}

type FlagEntry = [code: string, label: string]

const flagEntries: { label: string; entries: FlagEntry[] }[] = [
  {
    label: "Africa",
    entries: [
      ["dz", "Algeria"],
      ["ao", "Angola"],
      ["ac", "Ascension Island"],
      ["bj", "Benin"],
      ["bw", "Botswana"],
      ["io", "British Indian Ocean Territory"],
      ["bf", "Burkina Faso"],
      ["bi", "Burundi"],
      ["cm", "Cameroon"],
      ["ic", "Canary Islands"],
      ["cv", "Cape Verde"],
      ["cf", "Central African Republic"],
      ["ea", "Ceuta and Melilla"],
      ["td", "Chad"],
      ["km", "Comoros"],
      ["ci", "Côte d'Ivoire"],
      ["cd", "Democratic Republic of the Congo"],
      ["dg", "Diego Garcia"],
      ["dj", "Djibouti"],
      ["eg", "Egypt"],
      ["gq", "Equatorial Guinea"],
      ["er", "Eritrea"],
      ["sz", "Eswatini"],
      ["et", "Ethiopia"],
      ["ga", "Gabon"],
      ["gm", "Gambia"],
      ["gh", "Ghana"],
      ["gn", "Guinea"],
      ["gw", "Guinea-Bissau"],
      ["ke", "Kenya"],
      ["ls", "Lesotho"],
      ["lr", "Liberia"],
      ["ly", "Libya"],
      ["mg", "Madagascar"],
      ["mw", "Malawi"],
      ["ml", "Mali"],
      ["mr", "Mauritania"],
      ["mu", "Mauritius"],
      ["yt", "Mayotte"],
      ["ma", "Morocco"],
      ["mz", "Mozambique"],
      ["na", "Namibia"],
      ["ne", "Niger"],
      ["ng", "Nigeria"],
      ["cg", "Republic of the Congo"],
      ["re", "Réunion"],
      ["rw", "Rwanda"],
      ["sh", "Saint Helena"],
      ["st", "São Tomé and Príncipe"],
      ["sn", "Senegal"],
      ["sc", "Seychelles"],
      ["sl", "Sierra Leone"],
      ["so", "Somalia"],
      ["za", "South Africa"],
      ["ss", "South Sudan"],
      ["sd", "Sudan"],
      ["tz", "Tanzania"],
      ["tg", "Togo"],
      ["ta", "Tristan da Cunha"],
      ["tn", "Tunisia"],
      ["ug", "Uganda"],
      ["eh", "Western Sahara"],
      ["zm", "Zambia"],
      ["zw", "Zimbabwe"],
    ],
  },
  {
    label: "Asia",
    entries: [
      ["af", "Afghanistan"],
      ["am", "Armenia"],
      ["az", "Azerbaijan"],
      ["bh", "Bahrain"],
      ["bd", "Bangladesh"],
      ["bt", "Bhutan"],
      ["bn", "Brunei"],
      ["kh", "Cambodia"],
      ["cn", "China"],
      ["ge", "Georgia"],
      ["hk", "Hong Kong"],
      ["in", "India"],
      ["id", "Indonesia"],
      ["ir", "Iran"],
      ["iq", "Iraq"],
      ["il", "Israel"],
      ["jp", "Japan"],
      ["jo", "Jordan"],
      ["kz", "Kazakhstan"],
      ["kw", "Kuwait"],
      ["kg", "Kyrgyzstan"],
      ["la", "Laos"],
      ["lb", "Lebanon"],
      ["mo", "Macao"],
      ["my", "Malaysia"],
      ["mv", "Maldives"],
      ["mn", "Mongolia"],
      ["mm", "Myanmar"],
      ["np", "Nepal"],
      ["kp", "North Korea"],
      ["om", "Oman"],
      ["pk", "Pakistan"],
      ["ps", "Palestine"],
      ["ph", "Philippines"],
      ["qa", "Qatar"],
      ["sa", "Saudi Arabia"],
      ["sg", "Singapore"],
      ["kr", "South Korea"],
      ["lk", "Sri Lanka"],
      ["sy", "Syria"],
      ["tw", "Taiwan"],
      ["tj", "Tajikistan"],
      ["th", "Thailand"],
      ["tl", "Timor-Leste"],
      ["tr", "Turkey"],
      ["tm", "Turkmenistan"],
      ["ae", "United Arab Emirates"],
      ["uz", "Uzbekistan"],
      ["vn", "Vietnam"],
      ["ye", "Yemen"],
    ],
  },
  {
    label: "Europe",
    entries: [
      ["ax", "Åland Islands"],
      ["al", "Albania"],
      ["ad", "Andorra"],
      ["at", "Austria"],
      ["by", "Belarus"],
      ["be", "Belgium"],
      ["ba", "Bosnia and Herzegovina"],
      ["bg", "Bulgaria"],
      ["hr", "Croatia"],
      ["cy", "Cyprus"],
      ["cz", "Czechia"],
      ["dk", "Denmark"],
      ["gbeng", "England"],
      ["ee", "Estonia"],
      ["fo", "Faroe Islands"],
      ["fi", "Finland"],
      ["fr", "France"],
      ["de", "Germany"],
      ["gi", "Gibraltar"],
      ["gr", "Greece"],
      ["gg", "Guernsey"],
      ["hu", "Hungary"],
      ["is", "Iceland"],
      ["ie", "Ireland"],
      ["im", "Isle of Man"],
      ["it", "Italy"],
      ["je", "Jersey"],
      ["xk", "Kosovo"],
      ["lv", "Latvia"],
      ["li", "Liechtenstein"],
      ["lt", "Lithuania"],
      ["lu", "Luxembourg"],
      ["mt", "Malta"],
      ["md", "Moldova"],
      ["mc", "Monaco"],
      ["me", "Montenegro"],
      ["nl", "Netherlands"],
      ["mk", "North Macedonia"],
      ["no", "Norway"],
      ["pl", "Poland"],
      ["pt", "Portugal"],
      ["ro", "Romania"],
      ["ru", "Russia"],
      ["sm", "San Marino"],
      ["gbsct", "Scotland"],
      ["rs", "Serbia"],
      ["sk", "Slovakia"],
      ["si", "Slovenia"],
      ["es", "Spain"],
      ["sj", "Svalbard and Jan Mayen"],
      ["se", "Sweden"],
      ["ch", "Switzerland"],
      ["ua", "Ukraine"],
      ["gb", "United Kingdom"],
      ["va", "Vatican City"],
      ["gbwls", "Wales"],
    ],
  },
  {
    label: "North America",
    entries: [
      ["ai", "Anguilla"],
      ["ag", "Antigua and Barbuda"],
      ["aw", "Aruba"],
      ["bs", "Bahamas"],
      ["bb", "Barbados"],
      ["bz", "Belize"],
      ["bm", "Bermuda"],
      ["vg", "British Virgin Islands"],
      ["ca", "Canada"],
      ["bq", "Caribbean Netherlands"],
      ["ky", "Cayman Islands"],
      ["cp", "Clipperton Island"],
      ["cr", "Costa Rica"],
      ["cu", "Cuba"],
      ["cw", "Curaçao"],
      ["dm", "Dominica"],
      ["do", "Dominican Republic"],
      ["sv", "El Salvador"],
      ["gl", "Greenland"],
      ["gd", "Grenada"],
      ["gp", "Guadeloupe"],
      ["gt", "Guatemala"],
      ["ht", "Haiti"],
      ["hn", "Honduras"],
      ["jm", "Jamaica"],
      ["mq", "Martinique"],
      ["mx", "Mexico"],
      ["ms", "Montserrat"],
      ["ni", "Nicaragua"],
      ["pa", "Panama"],
      ["pr", "Puerto Rico"],
      ["bl", "Saint Barthélemy"],
      ["kn", "Saint Kitts and Nevis"],
      ["lc", "Saint Lucia"],
      ["mf", "Saint Martin"],
      ["pm", "Saint Pierre and Miquelon"],
      ["vc", "Saint Vincent and the Grenadines"],
      ["sx", "Sint Maarten"],
      ["tt", "Trinidad and Tobago"],
      ["tc", "Turks and Caicos Islands"],
      ["us", "United States"],
      ["vi", "U.S. Virgin Islands"],
    ],
  },
  {
    label: "South America",
    entries: [
      ["ar", "Argentina"],
      ["bo", "Bolivia"],
      ["br", "Brazil"],
      ["cl", "Chile"],
      ["co", "Colombia"],
      ["ec", "Ecuador"],
      ["fk", "Falkland Islands"],
      ["gf", "French Guiana"],
      ["gy", "Guyana"],
      ["py", "Paraguay"],
      ["pe", "Peru"],
      ["sr", "Suriname"],
      ["uy", "Uruguay"],
      ["ve", "Venezuela"],
    ],
  },
  {
    label: "Oceania",
    entries: [
      ["as", "American Samoa"],
      ["au", "Australia"],
      ["cx", "Christmas Island"],
      ["cc", "Cocos (Keeling) Islands"],
      ["ck", "Cook Islands"],
      ["fj", "Fiji"],
      ["pf", "French Polynesia"],
      ["gu", "Guam"],
      ["ki", "Kiribati"],
      ["mh", "Marshall Islands"],
      ["fm", "Micronesia"],
      ["nr", "Nauru"],
      ["nc", "New Caledonia"],
      ["nz", "New Zealand"],
      ["nu", "Niue"],
      ["nf", "Norfolk Island"],
      ["mp", "Northern Mariana Islands"],
      ["pw", "Palau"],
      ["pg", "Papua New Guinea"],
      ["pn", "Pitcairn Islands"],
      ["ws", "Samoa"],
      ["sb", "Solomon Islands"],
      ["tk", "Tokelau"],
      ["to", "Tonga"],
      ["tv", "Tuvalu"],
      ["um", "U.S. Outlying Islands"],
      ["vu", "Vanuatu"],
      ["wf", "Wallis and Futuna"],
    ],
  },
  {
    label: "Antarctica",
    entries: [
      ["aq", "Antarctica"],
      ["bv", "Bouvet Island"],
      ["tf", "French Southern Territories"],
      ["hm", "Heard and McDonald Islands"],
      ["gs", "South Georgia and South Sandwich Islands"],
    ],
  },
  {
    label: "International",
    entries: [
      ["eu", "European Union"],
      ["un", "United Nations"],
    ],
  },
]

export const flagEmojiGroups: FlagEmojiGroup[] = flagEntries.map(
  ({ label, entries }) => ({
    label,
    items: entries
      .map(([code, name]) => ({ code, label: name, flag: flagEmoji(code) }))
      .sort((a, b) => a.label.localeCompare(b.label, "en")),
  })
)

/** Renders an emoji with the platform color-emoji font stack. */
export function Emoji({
  emoji,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { emoji: string }) {
  return (
    <span
      className={cn(
        "leading-none [font-family:'Apple_Color_Emoji','Segoe_UI_Emoji','Noto_Color_Emoji',sans-serif]",
        className
      )}
      {...props}
    >
      {emoji}
    </span>
  )
}
