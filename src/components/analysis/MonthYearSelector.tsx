import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MonthYearSelectorProps {
  month: number;
  year: number;
  onChange: (month: number, year: number) => void;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const years = [2024, 2023, 2022, 2021];

export function MonthYearSelector({ month, year, onChange }: MonthYearSelectorProps) {
  const handlePrev = () => {
    if (month === 0) {
      onChange(11, year - 1);
    } else {
      onChange(month - 1, year);
    }
  };

  const handleNext = () => {
    if (month === 11) {
      onChange(0, year + 1);
    } else {
      onChange(month + 1, year);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrev}
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="min-w-[180px] border-border hover:border-primary/50"
          >
            <Calendar className="h-4 w-4 mr-2" />
            {months[month]} {year}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="glass-card border-border p-2" align="center">
          <div className="grid grid-cols-3 gap-1 mb-2">
            {months.map((m, i) => (
              <button
                key={m}
                onClick={() => onChange(i, year)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  month === i
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
              >
                {m.slice(0, 3)}
              </button>
            ))}
          </div>
          <div className="border-t border-border pt-2 flex justify-center gap-2">
            {years.map((y) => (
              <button
                key={y}
                onClick={() => onChange(month, y)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  year === y
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-secondary"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
