"use client"

import { useState } from "react"
import { SlidersHorizontal, X, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface FilterGroup {
  key: string
  label: string
  value: string
  options: FilterOption[]
  onChange: (value: string) => void
}

export interface SortConfig {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}

interface ProductFiltersProps {
  groups: FilterGroup[]
  sort?: SortConfig
  resultCount: number
  /** number of groups currently set to a non-default value */
  activeCount: number
  onClear: () => void
}

/* ---------- pill ---------- */

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-none border transition-colors whitespace-nowrap",
        active
          ? "bg-krinuh-primary text-white border-krinuh-primary"
          : "bg-white text-krinuh-text border-krinuh-hairline hover:border-krinuh-primary hover:text-krinuh-primary",
      )}
    >
      {children}
    </button>
  )
}

/* ---------- groups (shared by desktop + mobile sheet) ---------- */

function Groups({ groups }: { groups: FilterGroup[] }) {
  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <div key={g.key}>
          <p className="text-[11px] uppercase tracking-[0.15em] text-krinuh-muted font-semibold mb-3">{g.label}</p>
          <div className="flex flex-wrap gap-2">
            {g.options.map((o) => (
              <Pill key={o.value} active={g.value === o.value} onClick={() => g.onChange(o.value)}>
                {o.label}
                {o.count != null && <span className="opacity-60">{o.count}</span>}
              </Pill>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------- sort (styled radix select) ---------- */

function SortMenu({ sort }: { sort: SortConfig }) {
  return (
    <div className="flex items-center gap-2">
      <span className="hidden sm:inline text-[11px] uppercase tracking-[0.15em] text-krinuh-muted">Sort</span>
      <Select value={sort.value} onValueChange={sort.onChange}>
        <SelectTrigger className="h-9 w-[170px] rounded-none border-krinuh-hairline text-xs text-krinuh-text focus:ring-1 focus:ring-krinuh-primary">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-none border-krinuh-hairline">
          {sort.options.map((o) => (
            <SelectItem key={o.value} value={o.value} className="text-xs">
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

/* ---------- main ---------- */

export function ProductFilters({ groups, sort, resultCount, activeCount, onClear }: ProductFiltersProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-8">
      {/* Top bar: mobile trigger + count + sort */}
      <div className="flex items-center justify-between gap-3 border-b border-krinuh-hairline pb-4">
        <div className="flex items-center gap-4">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="md:hidden inline-flex items-center gap-2 border border-krinuh-primary text-krinuh-primary px-4 py-2 text-xs uppercase tracking-[0.12em] font-semibold rounded-none"
              >
                <SlidersHorizontal size={14} />
                Filters
                {activeCount > 0 && (
                  <span className="bg-krinuh-primary text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                    {activeCount}
                  </span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs bg-white overflow-y-auto p-6">
              <SheetHeader className="text-left">
                <SheetTitle className="font-serif text-2xl font-medium text-krinuh-ink">Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-7">
                <Groups groups={groups} />
              </div>
              <div className="mt-8 flex gap-3">
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={onClear}
                    className="flex-1 border-2 border-krinuh-primary text-krinuh-primary text-xs uppercase tracking-[0.12em] font-semibold py-2.5 rounded-none hover:bg-krinuh-primary hover:text-white transition-colors"
                  >
                    Clear all
                  </button>
                )}
                <SheetClose asChild>
                  <button
                    type="button"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-krinuh-primary text-white text-xs uppercase tracking-[0.12em] font-semibold py-2.5 rounded-none"
                  >
                    <Check size={14} />
                    Show {resultCount}
                  </button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>

          <p className="text-sm text-krinuh-muted">
            <span className="text-krinuh-text font-semibold">{resultCount}</span>{" "}
            {resultCount === 1 ? "piece" : "pieces"}
          </p>
        </div>

        {sort && <SortMenu sort={sort} />}
      </div>

      {/* Desktop inline groups */}
      <div className="hidden md:block mt-6">
        <Groups groups={groups} />
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="mt-5 inline-flex items-center gap-1.5 text-xs text-krinuh-muted hover:text-krinuh-primary transition-colors"
          >
            <X size={13} />
            Clear all filters
          </button>
        )}
      </div>
    </div>
  )
}
