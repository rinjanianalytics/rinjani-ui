"use client"

import { useState, useEffect } from "react"
import ForceGraph from "@/components/force-graph"
import SidebarMenu from "@/components/sidebar-menu"
import HeaderTop from "@/components/header-top"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ThreatGraphPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // Define types for graph data
  interface Node {
    id: string
    name: string
    type: string
    group: number
  }

  interface Link {
    source: string
    target: string
    value: number
  }

  const [graphData, setGraphData] = useState<{ nodes: Node[], links: Link[] }>({ nodes: [], links: [] })
  const [activeTab, setActiveTab] = useState("threats")

  const animationStyle = {
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockData = {
      nodes: [
        { id: "threat1", name: "APT29", type: "threat-actor", group: 1 },
        { id: "threat2", name: "FIN7", type: "threat-actor", group: 1 },
        { id: "indicator1", name: "C2 IP: 192.168.1.1", type: "indicator", group: 2 },
        { id: "indicator2", name: "Malware Hash", type: "indicator", group: 2 },
        { id: "victim1", name: "Finance Dept", type: "victim", group: 3 },
        { id: "victim2", name: "HR System", type: "victim", group: 3 },
      ],
      links: [
        { source: "threat1", target: "indicator1", value: 5 },
        { source: "threat1", target: "indicator2", value: 3 },
        { source: "threat2", target: "indicator1", value: 2 },
        { source: "indicator1", target: "victim1", value: 7 },
        { source: "indicator2", target: "victim2", value: 4 },
      ]
    }
    setGraphData(mockData)
  }, [])

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          style={{
            transition: `opacity ${animationStyle.transitionDuration} ${animationStyle.transitionTimingFunction}`,
          }}
        />
      )}

      {/* Sidebar Menu Component */}
      <SidebarMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} animationStyle={animationStyle} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <HeaderTop toggleSidebar={toggleSidebar} title="Threat Graph" />

        {/* Main Content */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white gradient-text">THREAT RELATIONSHIPS</h1>
            <Tabs defaultValue="threats" className="w-auto" onValueChange={setActiveTab}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="threats" className={activeTab === "threats" ? "bg-accent" : ""}>
                  THREATS
                </TabsTrigger>
                <TabsTrigger value="indicators" className={activeTab === "indicators" ? "bg-accent" : ""}>
                  INDICATORS
                </TabsTrigger>
                <TabsTrigger value="victims" className={activeTab === "victims" ? "bg-accent" : ""}>
                  VICTIMS
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <Card className="bg-card border-none rounded-xl overflow-hidden p-4 h-[calc(100vh-200px)]">
            <ForceGraph 
              nodes={graphData.nodes} 
              links={graphData.links} 
              nodeColor={(node: any) => {
                if (node.group === 1) return "#ef4444" // Red for threat actors
                if (node.group === 2) return "#3b82f6" // Blue for indicators
                return "#10b981" // Green for victims
              }}
              nodeLabel={(node: any) => `${node.name}\n(${node.type})`}
              linkDirectionalArrowLength={6}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}