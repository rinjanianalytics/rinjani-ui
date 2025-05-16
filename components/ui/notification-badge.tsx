import React from "react"

interface NotificationBadgeProps {
  count?: number
  variant?: "primary" | "destructive" | "warning"
  size?: "sm" | "md"
  showZero?: boolean
  pulse?: boolean
}

export function NotificationBadge({
  count,
  variant = "primary",
  size = "sm",
  showZero = false,
  pulse = true,
}: NotificationBadgeProps) {
  // Don't render if count is 0 and showZero is false
  if (count === 0 && !showZero) {
    return null
  }

  // Determine background color based on variant
  const bgColorClass = {
    primary: "bg-primary",
    destructive: "bg-destructive",
    warning: "bg-amber-500",
  }[variant]

  // Determine size
  const sizeClass = {
    sm: "w-4 h-4 text-[10px]",
    md: "w-5 h-5 text-xs",
  }[size]

  return (
    <div
      className={`${bgColorClass} ${sizeClass} absolute -top-1.5 -right-1.5 rounded-full flex items-center justify-center text-white font-medium ${
        pulse ? "animate-notification-pulse" : ""
      }`}
    >
      {count !== undefined && count > 0 ? (count > 99 ? "99+" : count) : ""}
    </div>
  )
}