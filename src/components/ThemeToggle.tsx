"use client"

import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"
import { Switch } from "./ui/switch"
import { Label } from "./ui/label"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="flex items-center space-x-2 justify-between">
      <Switch
        id="mode"
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <Label htmlFor="mode">
        {theme === "light" ? (
          <SunIcon className="w-4 h-4 text-muted-foreground" />
        ) : theme === "dark" ? (
          <MoonIcon className="w-4 h-4 text-muted-foreground" />
        ) : (
          <div className="flex">
            <MoonIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">/</span>
            <SunIcon className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
      </Label>
    </div>
  )
}
