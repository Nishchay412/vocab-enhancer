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

const LANGUAGEs = [
  { value: "ENGLISH", label: "ENGLISH" },
  { value: "FRENCH", label: "FRENCH" },
  { value: "SPANISH", label: "SPANISH" },
]

export function ComboboxDemo({ onChange }) {
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
            ? LANGUAGEs.find((LANGUAGE) => LANGUAGE.value === value)?.label
            : "Select LANGUAGE..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search LANGUAGE..." />
          <CommandList>
            <CommandEmpty>No LANGUAGE found.</CommandEmpty>
            <CommandGroup>
              {LANGUAGEs.map((LANGUAGE) => (
                <CommandItem
                  key={LANGUAGE.value}
                  value={LANGUAGE.value}
                  onSelect={() => handleSelect(LANGUAGE.value)} // Pass LANGUAGE.value to handleSelect
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === LANGUAGE.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {LANGUAGE.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
