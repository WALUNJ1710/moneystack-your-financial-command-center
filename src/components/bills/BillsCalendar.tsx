import { useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Bill {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
  status: string;
}

interface BillsCalendarProps {
  bills: Bill[];
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

export function BillsCalendar({ bills, currentMonth, onMonthChange }: BillsCalendarProps) {
  const calendarData = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: { date: number; bills: Bill[]; isToday: boolean }[] = [];
    const today = new Date();

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const dayBills = bills.filter((bill) => {
        const billDate = new Date(bill.dueDate);
        return billDate.getDate() === i && billDate.getMonth() === month && billDate.getFullYear() === year;
      });
      
      days.push({
        date: i,
        bills: dayBills,
        isToday: today.getDate() === i && today.getMonth() === month && today.getFullYear() === year,
      });
    }

    return { days, startDay };
  }, [bills, currentMonth]);

  const handlePrevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    onMonthChange(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    onMonthChange(newDate);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">
          {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={handlePrevMonth} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleNextMonth} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty cells for start offset */}
        {Array.from({ length: calendarData.startDay }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}

        {/* Days */}
        {calendarData.days.map((day) => {
          const hasBills = day.bills.length > 0;
          const hasOverdue = day.bills.some((b) => b.status === "overdue");
          const hasDueSoon = day.bills.some((b) => b.status === "due-soon");
          const totalAmount = day.bills.reduce((sum, b) => sum + b.amount, 0);

          return (
            <motion.div
              key={day.date}
              whileHover={{ scale: 1.05 }}
              className={`aspect-square p-1 rounded-lg cursor-pointer transition-colors ${
                day.isToday
                  ? "bg-primary/20 border border-primary"
                  : hasBills
                  ? hasOverdue
                    ? "bg-destructive/10 border border-destructive/30"
                    : hasDueSoon
                    ? "bg-warning/10 border border-warning/30"
                    : "bg-secondary/50 border border-border"
                  : "hover:bg-secondary/30"
              }`}
            >
              <div className="h-full flex flex-col">
                <span className={`text-xs font-medium ${
                  day.isToday ? "text-primary" : ""
                }`}>
                  {day.date}
                </span>
                {hasBills && (
                  <div className="flex-1 flex flex-col justify-end">
                    <div className={`text-[10px] font-medium truncate ${
                      hasOverdue ? "text-destructive" : hasDueSoon ? "text-warning" : "text-primary"
                    }`}>
                      ${totalAmount.toFixed(0)}
                    </div>
                    <div className="flex gap-0.5 mt-0.5">
                      {day.bills.slice(0, 3).map((bill, i) => (
                        <div
                          key={bill.id}
                          className={`w-1.5 h-1.5 rounded-full ${
                            bill.status === "overdue"
                              ? "bg-destructive"
                              : bill.status === "due-soon"
                              ? "bg-warning"
                              : bill.status === "paid"
                              ? "bg-success"
                              : "bg-primary"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-destructive" />
          <span className="text-xs text-muted-foreground">Overdue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-warning" />
          <span className="text-xs text-muted-foreground">Due Soon</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Upcoming</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">Paid</span>
        </div>
      </div>
    </motion.div>
  );
}
