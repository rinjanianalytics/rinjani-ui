"use client"

import { useState } from "react"
import SidebarMenu from "@/components/sidebar-menu"
import HeaderTop from "@/components/header-top"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bell, Shield, User, Lock, Database } from "lucide-react"

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  // Animation settings
  const animationStyle = {
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Menu Component */}
      <SidebarMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} animationStyle={animationStyle} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col">
        {/* Header */}
        <HeaderTop toggleSidebar={toggleSidebar} title="Settings" />

        {/* Main Content */}
        <div className="p-6 flex-1 overflow-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white gradient-text font-header">SYSTEM SETTINGS</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-3">
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-5">
                  <div className="space-y-2">
                    <div
                      className={`flex items-center gap-2 p-3 rounded-md cursor-pointer transition-colors ${activeTab === "general" ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                      onClick={() => setActiveTab("general")}
                    >
                      <Settings className="h-5 w-5" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200 font-subheader">GENERAL</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 p-3 rounded-md cursor-pointer transition-colors ${activeTab === "notifications" ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                      onClick={() => setActiveTab("notifications")}
                    >
                      <Bell className="h-5 w-5" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200 font-subheader">NOTIFICATIONS</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 p-3 rounded-md cursor-pointer transition-colors ${activeTab === "security" ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                      onClick={() => setActiveTab("security")}
                    >
                      <Shield className="h-5 w-5" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200 font-subheader">SECURITY</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 p-3 rounded-md cursor-pointer transition-colors ${activeTab === "account" ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                      onClick={() => setActiveTab("account")}
                    >
                      <User className="h-5 w-5" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200 font-subheader">ACCOUNT</span>
                    </div>
                    <div
                      className={`flex items-center gap-2 p-3 rounded-md cursor-pointer transition-colors ${activeTab === "api" ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                      onClick={() => setActiveTab("api")}
                    >
                      <Database className="h-5 w-5" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-200 font-subheader">API ACCESS</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-9">
              <Card className="bg-card border-none rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                {activeTab === "general" && (
                  <>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                      <Settings size={20} className="text-primary" />
                      General Settings
                    </CardTitle>
                    <CardDescription>Configure general system settings and preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white font-subheader">DARK MODE</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-body">Enable dark mode for the dashboard</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white font-subheader">DATA REFRESH RATE</h3>
                          <span className="text-sm text-gray-500">5 minutes</span>
                        </div>
                        <Slider defaultValue={[5]} max={30} step={1} />
                        <p className="text-sm text-gray-500 dark:text-gray-400">How often to refresh dashboard data (1-30 minutes)</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="language" className="text-base font-medium text-gray-900 dark:text-white font-subheader">LANGUAGE</Label>
                        <Select defaultValue="en">
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="ja">Japanese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timezone" className="text-base font-medium text-gray-900 dark:text-white font-subheader">TIMEZONE</Label>
                        <Select defaultValue="utc">
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="utc">UTC</SelectItem>
                            <SelectItem value="est">Eastern Time (ET)</SelectItem>
                            <SelectItem value="cst">Central Time (CT)</SelectItem>
                            <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                            <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  </>
                )}
                
                {activeTab === "notifications" && (
                  <>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                      <Bell size={20} className="text-primary" />
                      Notification Settings
                    </CardTitle>
                    <CardDescription>Configure how and when you receive notifications.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">Browser Notifications</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications in browser</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">Critical Alerts Only</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Only notify for critical severity alerts</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base font-medium text-gray-900 dark:text-white">Notification Email</Label>
                        <Input id="email" placeholder="your.email@example.com" />
                      </div>
                    </div>
                  </CardContent>
                  </>
                )}
                
                {activeTab === "security" && (
                  <>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                      <Shield size={20} className="text-primary" />
                      Security Settings
                    </CardTitle>
                    <CardDescription>Configure security settings and access controls.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Require 2FA for all users</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">Session Timeout</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Automatically log out after inactivity</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">Session Timeout Duration</h3>
                          <span className="text-sm text-gray-500">30 minutes</span>
                        </div>
                        <Slider defaultValue={[30]} max={120} step={5} />
                        <p className="text-sm text-gray-500 dark:text-gray-400">Time before automatic logout (5-120 minutes)</p>
                      </div>
                      
                      <div className="pt-4">
                        <Button variant="outline" className="w-full">
                          <Lock className="mr-2 h-4 w-4" />
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  </>
                )}
                
                {activeTab === "account" && (
                  <>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                      <User size={20} className="text-primary" />
                      Account Settings
                    </CardTitle>
                    <CardDescription>Manage your account information and preferences.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-base font-medium text-gray-900 dark:text-white">Full Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-base font-medium text-gray-900 dark:text-white">Job Title</Label>
                        <Input id="title" placeholder="Security Analyst" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="department" className="text-base font-medium text-gray-900 dark:text-white">Department</Label>
                        <Select defaultValue="security">
                          <SelectTrigger id="department">
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="security">Security</SelectItem>
                            <SelectItem value="it">IT</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="management">Management</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="pt-4 flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  </CardContent>
                  </>
                )}
                
                {activeTab === "api" && (
                  <>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-gray-900 dark:text-white font-header">
                      <Database size={20} className="text-primary" />
                      API Access
                    </CardTitle>
                    <CardDescription>Manage API keys and access tokens.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white">API Access</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Enable API access for integrations</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="apikey" className="text-base font-medium text-gray-900 dark:text-white">API Key</Label>
                        <div className="flex space-x-2">
                          <Input id="apikey" value="••••••••••••••••••••••••••••••" readOnly className="font-mono" />
                          <Button variant="outline">Copy</Button>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Your API key is secret. Never share it publicly.</p>
                      </div>
                      
                      <div className="pt-4 flex space-x-2">
                        <Button variant="outline">Regenerate API Key</Button>
                        <Button variant="outline">View API Documentation</Button>
                      </div>
                    </div>
                  </CardContent>
                  </>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}