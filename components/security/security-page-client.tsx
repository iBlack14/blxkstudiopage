"use client"

import dynamic from "next/dynamic"
import { SecurityHero } from "@/components/security/security-hero"

const FloatingThemeToggle = dynamic(
    () => import("@/components/layout/theme-toggle").then((m) => ({ default: m.FloatingThemeToggle })),
    { ssr: false }
)

const SecurityServices = dynamic(
    () => import("@/components/security/security-services").then((m) => ({ default: m.SecurityServices })),
    { loading: () => <div className="animate-pulse bg-muted/40 py-20" /> }
)

const SecurityThreats = dynamic(
    () => import("@/components/security/security-threats").then((m) => ({ default: m.SecurityThreats })),
    { loading: () => <div className="animate-pulse bg-muted/30 py-20" /> }
)

const SecurityProcess = dynamic(
    () => import("@/components/security/security-process").then((m) => ({ default: m.SecurityProcess })),
    { loading: () => <div className="animate-pulse bg-muted/40 py-20" /> }
)

const SecurityCta = dynamic(
    () => import("@/components/security/security-cta").then((m) => ({ default: m.SecurityCta })),
    { loading: () => <div className="animate-pulse bg-muted/30 py-20" /> }
)

export function SecurityPageClient() {
    return (
        <>
            <FloatingThemeToggle />
            <SecurityHero />
            <SecurityServices />
            <SecurityThreats />
            <SecurityProcess />
            <SecurityCta />
        </>
    )
}
