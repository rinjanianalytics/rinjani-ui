// This file is no longer needed but we'll keep it in the project
// It's not being imported or used anymore
"use client"

import { useState, useEffect } from "react"
import { Settings, X } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export type AnimationSettings = {
  duration: number
  easing: string
  enabled: boolean
}

const DEFAULT_SETTINGS: AnimationSettings = {
  duration: 300,
  easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  enabled: true,
}

interface AnimationSettingsProps {
  onSettingsChange: (settings: AnimationSettings) => void
}

export function AnimationSettings({ onSettingsChange }: AnimationSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AnimationSettings>(DEFAULT_SETTINGS)

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("animationSettings")
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        setSettings(parsedSettings)
        onSettingsChange(parsedSettings)
      } catch (e) {
        console.error("Failed to parse animation settings", e)
      }
    }
  }, [onSettingsChange])

  // Save settings to localStorage and notify parent component
  const updateSettings = (newSettings: Partial<AnimationSettings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)
    localStorage.setItem("animationSettings", JSON.stringify(updatedSettings))
    onSettingsChange(updatedSettings)
  }

  const easingOptions = [
    { value: "linear", label: "Linear" },
    { value: "ease", label: "Ease" },
    { value: "ease-in", label: "Ease In" },
    { value: "ease-out", label: "Ease Out" },
    { value: "ease-in-out", label: "Ease In Out" },
    { value: "cubic-bezier(0.4, 0, 0.2, 1)", label: "Default" },
    { value: "cubic-bezier(0.8, 0, 0.2, 1)", label: "Overshoot" },
    { value: "cubic-bezier(0.25, 0.1, 0.25, 1)", label: "Smooth" },
  ]

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="p-4 bg-[#162a30] border-[#1e2d35] w-80 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium">Animation Settings</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X size={16} />
            </Button>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="animation-enabled">Animations Enabled</Label>
                <Switch
                  id="animation-enabled"
                  checked={settings.enabled}
                  onCheckedChange={(checked) => updateSettings({ enabled: checked })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="animation-duration">Animation Speed: {settings.duration}ms</Label>
              <Slider
                id="animation-duration"
                min={0}
                max={1000}
                step={50}
                value={[settings.duration]}
                onValueChange={(value) => updateSettings({ duration: value[0] })}
                disabled={!settings.enabled}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Fast</span>
                <span>Slow</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="animation-easing">Easing Function</Label>
              <Select
                value={settings.easing}
                onValueChange={(value) => updateSettings({ easing: value })}
                disabled={!settings.enabled}
              >
                <SelectTrigger id="animation-easing">
                  <SelectValue placeholder="Select easing" />
                </SelectTrigger>
                <SelectContent>
                  {easingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => {
                  updateSettings(DEFAULT_SETTINGS)
                }}
              >
                Reset to Defaults
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="bg-[#162a30] border-[#1e2d35] hover:bg-[#1e2d35] text-white"
          onClick={() => setIsOpen(true)}
        >
          <Settings size={18} />
        </Button>
      )}
    </div>
  )
}
