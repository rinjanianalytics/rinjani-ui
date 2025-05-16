"use client"

import { useState } from "react"
import SidebarMenu from "@/components/sidebar-menu"
import HeaderTop from "@/components/header-top"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, AlertTriangle, AlertCircle, Info, Shield, Users, Activity, Database, Server, Lock, Globe, FileWarning, BarChart } from "lucide-react"

export default function AlertsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const animationStyle = {
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Alert statistics
  const alertStats = {
    total: 24,
    critical: 9,
    warning: 11,
    info: 4,
    new: 15,
    acknowledged: 7,
    resolved: 2,
  }

  // Horizontal bar data
  const securityScores = [
    { category: "Network", score: 65, maxScore: 100 },
    { category: "Endpoint", score: 85, maxScore: 100 },
    { category: "Cloud", score: 55, maxScore: 100 },
    { category: "Application", score: 70, maxScore: 100 },
  ]

  // Even softer color palette with severity-based colors
  const colors = {
    critical: "rgba(239, 68, 68, 0.5)", // Even softer red for critical
    warning: "rgba(245, 158, 11, 0.5)",  // Even softer amber for warning
    info: "rgba(59, 130, 246, 0.5)",     // Even softer blue for info
    new: "rgba(59, 130, 246, 0.5)",      // Even softer blue for new
    acknowledged: "rgba(139, 92, 246, 0.5)", // Even softer purple for acknowledged
    resolved: "rgba(34, 197, 94, 0.5)",  // Even softer green for resolved
  }

  // Function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return "rgba(34, 197, 94, 0.5)" // Even softer green
    if (score >= 60) return "rgba(245, 158, 11, 0.5)" // Even softer amber
    return "rgba(239, 68, 68, 0.5)" // Even softer red
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <SidebarMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} animationStyle={animationStyle} />

      <div className="flex-1 overflow-auto flex flex-col">
        <HeaderTop toggleSidebar={toggleSidebar} title="Alerts" />

        <div className="p-6 flex-1 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <h1 className="text-3xl font-bold gradient-text font-header mb-4 md:mb-0">ALERTS DASHBOARD</h1>
            <Tabs defaultValue="all" className="w-auto" onValueChange={setActiveTab}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="all" className="font-subheader text-xs">ALL THREATS</TabsTrigger>
                <TabsTrigger value="cve" className="font-subheader text-xs">CVEs</TabsTrigger>
                <TabsTrigger value="actor" className="font-subheader text-xs">THREAT ACTORS</TabsTrigger>
                <TabsTrigger value="campaign" className="font-subheader text-xs">CAMPAIGNS</TabsTrigger>
                <TabsTrigger value="threat" className="font-subheader text-xs">LATEST THREATS</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Alert Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">TOTAL ALERTS</p>
                  <p className="text-3xl font-bold font-header mt-1">{alertStats.total}</p>
                  <p className="text-xs text-muted-foreground mt-1">Updated 5 minutes ago</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">CRITICAL</p>
                  <p className="text-3xl font-bold text-red-500/60 font-header mt-1">{alertStats.critical}</p>
                  <p className="text-xs text-muted-foreground mt-1">Requires immediate action</p>
                </div>
                <div className="p-3 bg-red-100/50 rounded-full dark:bg-red-900/20">
                  <AlertCircle className="h-6 w-6 text-red-500/60" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">WARNING</p>
                  <p className="text-3xl font-bold text-amber-500/60 font-header mt-1">{alertStats.warning}</p>
                  <p className="text-xs text-muted-foreground mt-1">Needs attention soon</p>
                </div>
                <div className="p-3 bg-amber-100/50 rounded-full dark:bg-amber-900/20">
                  <AlertTriangle className="h-6 w-6 text-amber-500/60" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">NEW ALERTS</p>
                  <p className="text-3xl font-bold text-blue-500/60 font-header mt-1">{alertStats.new}</p>
                  <p className="text-xs text-muted-foreground mt-1">In the last 24 hours</p>
                </div>
                <div className="p-3 bg-blue-100/50 rounded-full dark:bg-blue-900/20">
                  <Info className="h-6 w-6 text-blue-500/60" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alert Distribution with Horizontal Bars - 2 Flex Cards */}
          <div className="mb-8">
            <h2 className="text-xl font-bold gradient-text mb-4 font-header">ALERT DISTRIBUTION</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Alert Severity Distribution */}
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="p-5 border-b">
                  <CardTitle className="text-base flex items-center gap-2 font-header">
                    <AlertCircle className="h-5 w-5 text-red-500/60" />
                    Alert Severity Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="space-y-4">
                    {/* Critical */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Critical</span>
                        <span className="text-red-500/60 font-medium">{alertStats.critical}</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${(alertStats.critical / alertStats.total) * 100}%`,
                            backgroundColor: colors.critical
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Warning */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Warning</span>
                        <span className="text-amber-500/60 font-medium">{alertStats.warning}</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${(alertStats.warning / alertStats.total) * 100}%`,
                            backgroundColor: colors.warning
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Info */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Info</span>
                        <span className="text-blue-500/60 font-medium">{alertStats.info}</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${(alertStats.info / alertStats.total) * 100}%`,
                            backgroundColor: colors.info
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alert Status Distribution */}
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="p-5 border-b">
                  <CardTitle className="text-base flex items-center gap-2 font-header">
                    <Activity className="h-5 w-5 text-blue-500/60" />
                    Alert Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="space-y-4">
                    {/* New */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>New</span>
                        <span className="text-blue-500/60 font-medium">{alertStats.new}</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${(alertStats.new / alertStats.total) * 100}%`,
                            backgroundColor: colors.new
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Acknowledged */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Acknowledged</span>
                        <span className="text-purple-500/60 font-medium">{alertStats.acknowledged}</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${(alertStats.acknowledged / alertStats.total) * 100}%`,
                            backgroundColor: colors.acknowledged
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Resolved */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Resolved</span>
                        <span className="text-green-500/60 font-medium">{alertStats.resolved}</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full" 
                          style={{ 
                            width: `${(alertStats.resolved / alertStats.total) * 100}%`,
                            backgroundColor: colors.resolved
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Security Scores - Horizontal Bars */}
          <div className="mb-8">
            <h2 className="text-xl font-bold gradient-text mb-4 font-header">SECURITY POSTURE</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Scores */}
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="p-5 border-b">
                  <CardTitle className="text-base flex items-center gap-2 font-header">
                    <Shield className="h-5 w-5 text-primary/80" />
                    Security Scores
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="space-y-4">
                    {securityScores.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.category}</span>
                          <span className={`font-medium ${
                            item.score >= 80 ? "text-green-500/60" : 
                            item.score >= 60 ? "text-amber-500/60" : 
                            "text-red-500/60"
                          }`}>{item.score}</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${(item.score / item.maxScore) * 100}%`,
                              backgroundColor: getScoreColor(item.score)
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Overall Security Score */}
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="p-5 border-b">
                  <CardTitle className="text-base flex items-center gap-2 font-header">
                    <BarChart className="h-5 w-5 text-primary/80" />
                    Overall Security Score
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="relative inline-flex items-center justify-center">
                        <svg className="w-32 h-32" viewBox="0 0 100 100">
                          {/* Background circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="hsl(var(--muted))"
                            strokeWidth="10"
                          />
                          {/* Progress circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="rgba(245, 158, 11, 0.5)" // Even softer amber for 69/100
                            strokeWidth="10"
                            strokeDasharray={`${2 * Math.PI * 45 * 0.69} ${2 * Math.PI * 45 * 0.31}`}
                            strokeDashoffset={2 * Math.PI * 45 * 0.25}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                          <span className="text-3xl font-bold">69</span>
                          <span className="text-xs text-muted-foreground">out of 100</span>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-muted-foreground">
                        Overall security posture needs improvement
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Threat Intelligence Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold gradient-text mb-4 font-header">THREAT INTELLIGENCE DETAILS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* CVEs Card */}
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="p-5 border-b bg-gradient-to-r from-red-900/20 to-transparent">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500/60" />
                    <CardTitle className="text-base font-header">Critical CVEs</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">CVE-2023-23397</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100/50 text-red-800/70 dark:bg-red-900/20 dark:text-red-300/70">
                        CVSS: 9.8
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">CVE-2021-44228</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100/50 text-red-800/70 dark:bg-red-900/20 dark:text-red-300/70">
                        CVSS: 10.0
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">CVE-2022-3786</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100/50 text-red-800/70 dark:bg-red-900/20 dark:text-red-300/70">
                        CVSS: 8.8
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Threat Actors Card */}
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="p-5 border-b bg-gradient-to-r from-purple-900/20 to-transparent">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-purple-500/60" />
                    <CardTitle className="text-base font-header">Threat Actors</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">APT41</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100/50 text-purple-800/70 dark:bg-purple-900/20 dark:text-purple-300/70">
                        China
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Lazarus Group</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100/50 text-purple-800/70 dark:bg-purple-900/20 dark:text-purple-300/70">
                        North Korea
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Sandworm</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100/50 text-purple-800/70 dark:bg-purple-900/20 dark:text-purple-300/70">
                        Russia
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Campaigns Card */}
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="p-5 border-b bg-gradient-to-r from-amber-900/20 to-transparent">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500/60" />
                    <CardTitle className="text-base font-header">Active Campaigns</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">BlackCat/ALPHV</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-100/50 text-amber-800/70 dark:bg-amber-900/20 dark:text-amber-300/70">
                        Ransomware
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Supply Chain Attack</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-100/50 text-amber-800/70 dark:bg-amber-900/20 dark:text-amber-300/70">
                        Software
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cloud Infrastructure</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-100/50 text-amber-800/70 dark:bg-amber-900/20 dark:text-amber-300/70">
                        Kubernetes
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Latest Threats Card */}
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="p-5 border-b bg-gradient-to-r from-blue-900/20 to-transparent">
                  <div className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500/60" />
                    <CardTitle className="text-base font-header">Latest Threats</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Raccoon Stealer</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100/50 text-blue-800/70 dark:bg-blue-900/20 dark:text-blue-300/70">
                        Malware
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">DDoS Infrastructure</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100/50 text-blue-800/70 dark:bg-blue-900/20 dark:text-blue-300/70">
                        Network
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">PDF Reader Exploit</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-100/50 text-blue-800/70 dark:bg-blue-900/20 dark:text-blue-300/70">
                        Zero-day
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
