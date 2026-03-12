import type { Locale } from "./core"
import { messages } from "./core"

export type { Locale } from "./core"

export type Messages = (typeof messages)[Locale]
