"use client"

import Image from "next/image"
import { Bell, Menu, Moon, Search, SquareUser, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import { NotificationBadge } from "./ui/notification-badge"

interface HeaderTopProps {
  toggleSidebar: () => void
  title?: string
  companyName?: string
}

export default function HeaderTop({
  toggleSidebar,
  title = "Rinjani",
  companyName = "Rinjani",
}: HeaderTopProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3) // Example notification count

  // useEffect only runs on the client, so we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <header className="p-4 flex items-center justify-between bg-background border-b border-border">
      <div className="flex items-center gap-4">
        <button className="lg:hidden bg-secondary rounded-full p-1" onClick={toggleSidebar}>
          <Menu size={16} strokeWidth={2} className="text-primary shrink-0" />
        </button>
        <div className="flex items-center gap-3">
          {/* <Image src="./images/rinjani-logo.svg" alt="Rinjani Analytics Logo" width={28} height={28} className="mr-1" /> */}
          {/* <div className="flex items-center gap-2 bg-[#1a2035] rounded-full px-3 py-1.5">
            <span>{companyName}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div> */}
        </div>
        <h1 className="text-xl font-medium ml-4 gradient-text font-header">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-md hover:bg-secondary"
          aria-label="Toggle theme"
        >
          {mounted && (
            theme === "light" ? (
              <Moon size={20} strokeWidth={2} className="text-foreground shrink-0" />
            ) : (
              <Sun size={20} strokeWidth={2} className="text-foreground shrink-0" />
            )
          )}
        </Button>
        <Button variant="ghost" size="icon" className="rounded-md hover:bg-secondary relative">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Bell size={20} strokeWidth={2} className="shrink-0" />
            <NotificationBadge count={notificationCount} variant="destructive" />
          </div>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-md hover:bg-secondary">
          <Search size={20} strokeWidth={2} className="shrink-0" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-md hover:bg-secondary">
          <SquareUser size={20} strokeWidth={2} className="shrink-0" />
        </Button>
      </div>
    </header>
  )
}
