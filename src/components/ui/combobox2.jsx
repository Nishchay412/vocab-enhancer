"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const fluencys = [
  { value: "BEGINNER", label: "BEGINNER" },
  { value: "INTERMEDIATE", label: "INTERMEDIATE" },
  { value: "ADVANCED", label: "ADVANCED" },
]

export function Comboboxdemo2({ onChange }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? "" : currentValue
    setValue(newValue)
    setOpen(false)
    if (onChange) onChange(newValue) // Call onChange prop with the new value
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? fluencys.find((fluency) => fluency.value === value)?.label
            : "Select fluency..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search fluency..." />
          <CommandList>
            <CommandEmpty>No fluency found.</CommandEmpty>
            <CommandGroup>
              {fluencys.map((fluency) => (
                <CommandItem
                  key={fluency.value}
                  value={fluency.value}
                  onSelect={() => handleSelect(fluency.value)} // Pass fluency.value to handleSelect
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === fluency.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {fluency.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
