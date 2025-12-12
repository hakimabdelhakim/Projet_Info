import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'motion/react';

export interface FilterOption {
  id: string;
  label: string;
  options: {
    value: string;
    label: string;
  }[];
}

interface AdvancedFiltersProps {
  filters: FilterOption[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterId: string, values: string[]) => void;
  onClearAll: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export function AdvancedFilters({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = 'Rechercher...'
}: AdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const activeFilterCount = Object.values(activeFilters).reduce(
    (sum, values) => sum + values.length,
    0
  );

  const handleToggleFilter = (filterId: string, value: string) => {
    const currentValues = activeFilters[filterId] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(filterId, newValues);
  };

  const getActiveFiltersDisplay = () => {
    const items: { filterId: string; value: string; label: string }[] = [];
    
    filters.forEach(filter => {
      const values = activeFilters[filter.id] || [];
      values.forEach(value => {
        const option = filter.options.find(o => o.value === value);
        if (option) {
          items.push({
            filterId: filter.id,
            value,
            label: `${filter.label}: ${option.label}`
          });
        }
      });
    });
    
    return items;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search Input */}
        {onSearchChange && (
          <div className="flex-1 min-w-[200px] max-w-md">
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-9"
            />
          </div>
        )}

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map(filter => (
            <DropdownMenu key={filter.id}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="w-3.5 h-3.5" />
                  {filter.label}
                  {(activeFilters[filter.id]?.length || 0) > 0 && (
                    <Badge variant="default" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                      {activeFilters[filter.id].length}
                    </Badge>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>{filter.label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {filter.options.map(option => (
                  <DropdownMenuCheckboxItem
                    key={option.value}
                    checked={(activeFilters[filter.id] || []).includes(option.value)}
                    onCheckedChange={() => handleToggleFilter(filter.id, option.value)}
                  >
                    {option.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}

          {/* Clear All Button */}
          {activeFilterCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="gap-2 text-neutral-600 hover:text-neutral-900"
            >
              <X className="w-3.5 h-3.5" />
              Effacer ({activeFilterCount})
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      <AnimatePresence>
        {activeFilterCount > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 flex-wrap"
          >
            <span className="text-xs text-neutral-600 font-medium">Filtres actifs:</span>
            {getActiveFiltersDisplay().map((item, index) => (
              <motion.div
                key={`${item.filterId}-${item.value}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge
                  variant="secondary"
                  className="gap-1 pr-1 cursor-pointer hover:bg-neutral-300 transition-colors"
                  onClick={() => handleToggleFilter(item.filterId, item.value)}
                >
                  <span className="text-xs">{item.label}</span>
                  <X className="w-3 h-3" />
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
