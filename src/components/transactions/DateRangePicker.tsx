import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
  className?: string;
}

const presets = [
  { label: "Today", days: 0 },
  { label: "Last 7 days", days: 7 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
  { label: "This month", days: -1 },
  { label: "Last month", days: -2 },
];

export function DateRangePicker({ date, onDateChange, className }: DateRangePickerProps) {
  const handlePreset = (days: number) => {
    const today = new Date();
    let from: Date;
    let to: Date = today;

    if (days === 0) {
      from = today;
    } else if (days === -1) {
      // This month
      from = new Date(today.getFullYear(), today.getMonth(), 1);
    } else if (days === -2) {
      // Last month
      from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      to = new Date(today.getFullYear(), today.getMonth(), 0);
    } else {
      from = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
    }

    onDateChange({ from, to });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "justify-start text-left font-normal border-border hover:border-primary/50",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "MMM d")} - {format(date.to, "MMM d, yyyy")}
              </>
            ) : (
              format(date.from, "MMM d, yyyy")
            )
          ) : (
            <span>Select date range</span>
          )}
          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 glass-card border-border" align="start">
        <div className="flex">
          {/* Presets */}
          <div className="border-r border-border p-3 space-y-1">
            <p className="text-xs font-medium text-muted-foreground mb-2 px-2">Quick Select</p>
            {presets.map((preset) => (
              <button
                key={preset.label}
                onClick={() => handlePreset(preset.days)}
                className="w-full text-left text-sm px-3 py-1.5 rounded-md hover:bg-secondary transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
          {/* Calendar */}
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
            className="p-3 pointer-events-auto"
          />
        </div>
        {/* Footer */}
        <div className="border-t border-border p-3 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDateChange(undefined)}
            className="text-muted-foreground"
          >
            Clear
          </Button>
          <div className="text-xs text-muted-foreground">
            {date?.from && date?.to && (
              <>
                {Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)) + 1} days selected
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
