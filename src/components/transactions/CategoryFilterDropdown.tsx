import { LucideIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export interface CategoryFilter {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
  checked: boolean;
}

interface CategoryFilterDropdownProps {
  categories: CategoryFilter[];
  onChange: (id: string, checked: boolean) => void;
  onClearAll: () => void;
  onSelectAll: () => void;
}

export function CategoryFilterDropdown({
  categories,
  onChange,
  onClearAll,
  onSelectAll,
}: CategoryFilterDropdownProps) {
  const selectedCount = categories.filter((c) => c.checked).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-border hover:border-primary/50">
          <Filter className="h-4 w-4 mr-2" />
          Categories
          {selectedCount > 0 && selectedCount < categories.length && (
            <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-primary text-primary-foreground">
              {selectedCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 glass-card border-border">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Filter by Category</span>
          <div className="flex gap-1">
            <button
              onClick={onSelectAll}
              className="text-xs text-primary hover:underline"
            >
              All
            </button>
            <span className="text-muted-foreground">/</span>
            <button
              onClick={onClearAll}
              className="text-xs text-muted-foreground hover:underline"
            >
              None
            </button>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category.id}
            checked={category.checked}
            onCheckedChange={(checked) => onChange(category.id, checked)}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className={`p-1 rounded ${category.color}`}>
                <category.icon className="h-3 w-3 text-primary-foreground" />
              </div>
              <span>{category.label}</span>
            </div>
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
