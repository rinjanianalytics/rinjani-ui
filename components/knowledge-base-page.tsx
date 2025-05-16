"use client"

import { useState } from "react"
import SidebarMenu from "@/components/sidebar-menu"
import HeaderTop from "@/components/header-top"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function KnowledgeBasePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("articles")

  // Animation settings
  const animationStyle = {
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // Sample knowledge base articles
  const articles = [
    {
      id: 1,
      title: "Understanding APT Tactics",
      category: "Threat Intelligence",
      summary: "A comprehensive guide to Advanced Persistent Threat tactics, techniques, and procedures.",
      date: "2025-04-15",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Ransomware Prevention Best Practices",
      category: "Security",
      summary: "Essential strategies to protect your organization from ransomware attacks.",
      date: "2025-04-10",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Cloud Security Architecture",
      category: "Cloud",
      summary: "Building secure cloud environments with proper access controls and monitoring.",
      date: "2025-04-05",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Incident Response Playbook",
      category: "Incident Response",
      summary: "Step-by-step guide for responding to security incidents effectively.",
      date: "2025-03-28",
      readTime: "12 min read"
    },
    {
      id: 5,
      title: "Supply Chain Attack Mitigation",
      category: "Security",
      summary: "Strategies to identify and mitigate risks in your supply chain.",
      date: "2025-03-20",
      readTime: "7 min read"
    },
    {
      id: 6,
      title: "Zero Trust Implementation Guide",
      category: "Architecture",
      summary: "Practical steps to implement a zero trust security model in your organization.",
      date: "2025-03-15",
      readTime: "9 min read"
    }
  ]

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Menu Component */}
      <SidebarMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} animationStyle={animationStyle} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <HeaderTop toggleSidebar={toggleSidebar} title="Knowledge Base" />

        {/* Main Content */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white gradient-text font-header mb-4 md:mb-0">SECURITY KNOWLEDGE BASE</h1>
            <Tabs defaultValue="articles" className="w-auto" onValueChange={setActiveTab}>
              <TabsList className="bg-secondary">
                <TabsTrigger value="articles" className={`font-subheader text-xs ${activeTab === "articles" ? "bg-accent" : ""}`}>
                  ARTICLES
                </TabsTrigger>
                <TabsTrigger value="guides" className={`font-subheader text-xs ${activeTab === "guides" ? "bg-accent" : ""}`}>
                  GUIDES
                </TabsTrigger>
                <TabsTrigger value="playbooks" className={`font-subheader text-xs ${activeTab === "playbooks" ? "bg-accent" : ""}`}>
                  PLAYBOOKS
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <Input
              placeholder="Search knowledge base..."
              className="pl-12 bg-card border-none rounded-xl h-14 shadow-sm"
            />
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map(article => (
              <Card key={article.id} className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardHeader className="p-5 border-b bg-gradient-to-r from-primary/10 to-transparent">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-primary font-subheader">{article.category.toUpperCase()}</span>
                    <CardTitle className="text-base text-gray-900 dark:text-white font-header">{article.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 font-body">{article.summary}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{article.date}</span>
                      <span className="bg-background/50 px-2 py-1 rounded-md">{article.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}