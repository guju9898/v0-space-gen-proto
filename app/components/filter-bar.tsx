"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function FilterBar() {
  const [roomType, setRoomType] = useState("All Rooms")
  const [style, setStyle] = useState("All Styles")
  const [sortBy, setSortBy] = useState("Most Recent")

  const roomTypes = ["All Rooms", "Living Room", "Bedroom", "Kitchen", "Bathroom", "Office", "Exterior"]
  const styles = ["All Styles", "Modern", "Minimalist", "Scandinavian", "Industrial", "Bohemian", "Traditional"]
  const sortOptions = ["Most Recent", "Most Popular", "Most Transformative"]

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full md:w-auto justify-between">
            {roomType}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          {roomTypes.map((type) => (
            <DropdownMenuItem
              key={type}
              className="flex items-center justify-between"
              onClick={() => setRoomType(type)}
            >
              {type}
              {roomType === type && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full md:w-auto justify-between">
            {style}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[200px]">
          {styles.map((s) => (
            <DropdownMenuItem key={s} className="flex items-center justify-between" onClick={() => setStyle(s)}>
              {s}
              {style === s && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex-1"></div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full md:w-auto justify-between">
            Sort: {sortBy}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              className="flex items-center justify-between"
              onClick={() => setSortBy(option)}
            >
              {option}
              {sortBy === option && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
