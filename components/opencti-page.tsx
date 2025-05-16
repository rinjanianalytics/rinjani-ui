"use client"

import { useState } from "react"
import SidebarMenu from "@/components/sidebar-menu"
import HeaderTop from "@/components/header-top"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertTriangle, Globe, Database, Search, FileText, Network } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function OpenCTIPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("threats")

  // Animation settings
  const animationStyle = {
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Sample threat intelligence data
  const threatData = [
    {
      id: "APT-001",
      name: "DragonFly",
      type: "Threat Actor",
      description: "Advanced persistent threat group targeting energy sector organizations.",
      severity: "High",
      lastUpdated: "2025-05-01"
    },
    {
      id: "MAL-023",
      name: "BlackEnergy",
      type: "Malware",
      description: "Malware used in attacks against industrial control systems and critical infrastructure.",
      severity: "Critical",
      lastUpdated: "2025-04-28"
    },
    {
      id: "CVE-2025-1234",
      name: "Apache Log4j Vulnerability",
      type: "Vulnerability",
      description: "Remote code execution vulnerability in Apache Log4j library.",
      severity: "Critical",
      lastUpdated: "2025-05-05"
    },
    {
      id: "IOC-789",
      name: "Suspicious Domain",
      type: "Indicator",
      description: "Domain associated with command and control infrastructure.",
      severity: "Medium",
      lastUpdated: "2025-05-08"
    }
  ]

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Menu Component */}
      <SidebarMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} animationStyle={animationStyle} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <HeaderTop toggleSidebar={toggleSidebar} title="OpenCTI" />

        {/* Main Content */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white gradient-text font-header mb-4 md:mb-0">THREAT INTELLIGENCE</h1>
            <Tabs defaultValue="threats" className="w-auto" onValueChange={setActiveTab}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="threats" className="font-subheader text-xs">THREATS</TabsTrigger>
                <TabsTrigger value="actors" className="font-subheader text-xs">ACTORS</TabsTrigger>
                <TabsTrigger value="indicators" className="font-subheader text-xs">INDICATORS</TabsTrigger>
                <TabsTrigger value="reports" className="font-subheader text-xs">REPORTS</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <Input 
              placeholder="Search threat intelligence..." 
              className="pl-12 bg-card border-none rounded-xl h-14 shadow-sm"
            />
          </div>

          {/* Threat Intelligence Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">THREAT ACTORS</p>
                  <p className="text-3xl font-bold font-header mt-1">42</p>
                  <p className="text-xs text-muted-foreground mt-1">+3 new this week</p>
                </div>
                <div className="p-3 bg-red-100/50 dark:bg-red-900/20 rounded-full">
                  <Shield className="h-6 w-6 text-red-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">INDICATORS</p>
                  <p className="text-3xl font-bold font-header mt-1">156</p>
                  <p className="text-xs text-muted-foreground mt-1">+12 new this week</p>
                </div>
                <div className="p-3 bg-amber-100/50 dark:bg-amber-900/20 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-amber-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">CAMPAIGNS</p>
                  <p className="text-3xl font-bold font-header mt-1">28</p>
                  <p className="text-xs text-muted-foreground mt-1">+2 new this week</p>
                </div>
                <div className="p-3 bg-blue-100/50 dark:bg-blue-900/20 rounded-full">
                  <Globe className="h-6 w-6 text-blue-500/60" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground font-subheader">OBSERVABLES</p>
                  <p className="text-3xl font-bold font-header mt-1">312</p>
                  <p className="text-xs text-muted-foreground mt-1">+24 new this week</p>
                </div>
                <div className="p-3 bg-purple-100/50 dark:bg-purple-900/20 rounded-full">
                  <Database className="h-6 w-6 text-purple-500/60" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Threat Intelligence */}
          <div className="mb-8">
            <h2 className="text-xl font-bold gradient-text mb-4 font-header">RECENT THREAT INTELLIGENCE</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {threatData.map((threat, index) => (
                <Card key={index} className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="p-5 border-b bg-gradient-to-r from-primary/10 to-transparent">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs font-medium text-primary font-subheader">{threat.type.toUpperCase()}</p>
                        <CardTitle className="text-base text-gray-900 dark:text-white font-header">{threat.name}</CardTitle>
                      </div>
                      <div className={`px-2 py-1 rounded-md text-xs font-medium ${
                        threat.severity === "Critical" ? "bg-red-100/50 text-red-600 dark:bg-red-900/20 dark:text-red-400" :
                        threat.severity === "High" ? "bg-amber-100/50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400" :
                        "bg-blue-100/50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                      }`}>
                        {threat.severity}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700 dark:text-gray-300 font-body">{threat.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>ID: {threat.id}</span>
                        <span>Updated: {threat.lastUpdated}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                  <FileText size={20} className="text-primary" />
                  Recent Reports
                </CardTitle>
                <CardDescription>Latest threat intelligence reports</CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div className="p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">APT Campaign Analysis</h3>
                      <span className="text-xs text-gray-500">2025-05-10</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Analysis of recent APT campaign targeting financial institutions.</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">Ransomware Trends</h3>
                      <span className="text-xs text-gray-500">2025-05-08</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Overview of emerging ransomware trends and tactics.</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg hover:bg-background/80 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">Supply Chain Vulnerabilities</h3>
                      <span className="text-xs text-gray-500">2025-05-05</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Analysis of recent supply chain vulnerabilities and mitigation strategies.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="p-5 border-b">
                <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                  <Network size={20} className="text-primary" />
                  Threat Relationships
                </CardTitle>
                <CardDescription>Connections between threat actors and campaigns</CardDescription>
              </CardHeader>
              <CardContent className="p-5">
                <div className="h-[220px] flex items-center justify-center bg-background/50 p-4 rounded-lg">
                  <div className="text-center">
                    <Network className="h-20 w-20 mx-auto mb-3 text-gray-400 dark:text-gray-600" />
                    <p className="text-gray-600 dark:text-gray-400 font-medium font-body">Threat relationship visualization</p>
                    <button className="mt-4 text-sm text-primary hover:underline font-subheader">VIEW DETAILS</button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
