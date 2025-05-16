import type React from "react"
import type { Metadata } from "next"
import { Rubik, Oswald, Lato } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

// Define fonts
const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
})

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-lato",
})

export const metadata: Metadata = {
  title: "Rinjani Analytics - Threat Intelligence Platform",
  description: "Cybersecurity threat intelligence dashboard by Rinjani Analytics",
  icons: {
    icon: "./images/rinjani-logo.svg",
  },
    generator: 'PearAI'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${rubik.variable} ${oswald.variable} ${lato.variable}`}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
