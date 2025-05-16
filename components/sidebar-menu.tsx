"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { NotificationBadge } from "./ui/notification-badge"
import {
  ChevronsLeft,
  ChevronsRight,
  Home,
  Library,
  Layers,
  Lock,
  Shield,
  SidebarIcon,
  Settings,
  X,
  Siren,
  ShieldPlus,
  GitBranch,
  NotebookText,
} from "lucide-react"

interface SidebarMenuProps {
  sidebarOpen: boolean
  toggleSidebar: () => void
  animationStyle: {
    transitionDuration: string
    transitionTimingFunction: string
  }
}

export default function SidebarMenu({ sidebarOpen, toggleSidebar, animationStyle }: SidebarMenuProps) {
  const [expanded, setExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Example notification counts - in a real app, these would come from an API or context
  const [alertCount, setAlertCount] = useState(5)
  const [reportCount, setReportCount] = useState(2)
  const [ctiCount, setCtiCount] = useState(3)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Toggle expanded state
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  // Menu items with labels and notification counts
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/", notificationCount: 0 },
    { icon: Siren, label: "Alerts", path: "/alerts", notificationCount: alertCount, variant: "destructive" },
    { icon: ShieldPlus, label: "OpenCTI", path: "/opencti", notificationCount: ctiCount, variant: "warning" },
    { icon: GitBranch, label: "Threat Graph", path: "/threat-graph", notificationCount: 0 },
    { icon: Layers, label: "Threat Modelling", path: "/threat-modelling", notificationCount: 0 },
    { icon: NotebookText, label: "Playbook", path: "/playbook", notificationCount: 0 },
    { icon: Shield, label: "Indicators", path: "/indicators", notificationCount: 0 },
    { icon: Lock, label: "Security", path: "/security", notificationCount: 0 },
    { icon: SidebarIcon, label: "Reports", path: "/reports", notificationCount: reportCount, variant: "primary" },
    { icon: Library, label: "Knowledge Base", path: "/knowledge-base", notificationCount: 0 },
    { icon: Settings, label: "Settings", path: "/settings", notificationCount: 0 },
  ]

  return (
    <div
      className={`fixed lg:relative ${isMobile ? "w-64" : expanded ? "w-64" : "w-16"} bg-sidebar border-r border-border flex flex-col z-30 h-full ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
      style={{
        transitionProperty: "transform, width",
        transitionDuration: animationStyle.transitionDuration,
        transitionTimingFunction: animationStyle.transitionTimingFunction,
      }}
    >
      <div className="flex w-full justify-between items-center p-4">
        <div className="flex items-center">
          {!(expanded || isMobile) && !sidebarOpen ? (
            <Image
              src="/images/rinjani-logo.svg"
              alt="Rinjani Analytics Logo"
              width={32}
              height={32}
              className="mx-auto"
            />
          ) : (
            <span className="text-primary font-bold text-lg font-header">Rinjani Analytics</span>
          )}
        </div>
        {isMobile ? (
          <button onClick={toggleSidebar} className="text-muted-foreground hover:text-foreground">
            <X size={20} strokeWidth={2} className="shrink-0" />
          </button>
        ) : (
          <button
            onClick={toggleExpanded}
            className="text-muted-foreground hover:text-foreground transition-opacity duration-200"
            style={{ opacity: expanded ? 1 : 0 }}
          >
            <ChevronsLeft size={20} strokeWidth={2} className="shrink-0" />
          </button>
        )}
      </div>

      {/* Expand toggle button for desktop (outside the sidebar) */}
      {!isMobile && !expanded && (
        <button
          onClick={toggleExpanded}
          className="absolute -right-3 top-10 bg-secondary rounded-full p-1 shadow-md border border-border z-40"
        >
          <ChevronsRight size={20} strokeWidth={2} className="text-primary shrink-0" />
        </button>
      )}

      <div className="flex flex-col items-center gap-6 flex-1 mt-4">
        {menuItems.map((item, index) => {
          const ItemContent = () => (
            <>
              <div className="relative w-6 h-6 flex items-center justify-center">
                <item.icon size={20} strokeWidth={2} className="shrink-0" />
                {item.notificationCount > 0 && (
                  <NotificationBadge
                    count={item.notificationCount}
                    variant={item.variant as "primary" | "destructive" | "warning" || "primary"}
                    size={expanded || isMobile ? "sm" : "md"}
                  />
                )}
              </div>
              {(expanded || isMobile) && <span className="ml-3 text-sm font-medium font-subheader">{item.label}</span>}
            </>
          );
          
          return item.path ? (
            <Link
              key={index}
              href={item.path}
              className={`p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center ${
                expanded || isMobile ? "w-[90%] justify-start" : "justify-center"
              }`}
              style={{ minHeight: "40px" }}
            >
              <ItemContent />
            </Link>
          ) : (
            <button
              key={index}
              className={`p-2 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground flex items-center ${
                expanded || isMobile ? "w-[90%] justify-start" : "justify-center"
              }`}
              style={{ minHeight: "40px" }}
            >
              <ItemContent />
            </button>
          );
        })}
      </div>
      <div className="mb-4 flex justify-center">
        <button className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">RA</button>
      </div>
    </div>
  )
}
