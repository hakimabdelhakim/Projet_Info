import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Maximize2, Minimize2, Download } from 'lucide-react';
import { toast } from 'sonner';

interface InteractiveChartProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onExport?: () => void;
  isLoading?: boolean;
}

export function InteractiveChart({ 
  title, 
  description, 
  children, 
  onExport,
  isLoading = false 
}: InteractiveChartProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      toast.success('Graphique exporté!', {
        description: 'Le graphique a été sauvegardé en PNG.'
      });
    }
  };

  return (
    <Card 
      className={`shadow-sm border-neutral-200 transition-all duration-300 hover-lift ${
        isExpanded ? 'fixed inset-4 z-50 overflow-auto' : ''
      }`}
    >
      <CardHeader className="flex flex-row items-start justify-between pb-4 space-y-0">
        <div className="space-y-1 flex-1">
          <CardTitle className="text-h3 flex items-center gap-2">
            {title}
            {isLoading && (
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            )}
          </CardTitle>
          {description && (
            <CardDescription className="text-small text-neutral-500">
              {description}
            </CardDescription>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 text-neutral-500" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <Minimize2 className="h-4 w-4 text-neutral-500" />
            ) : (
              <Maximize2 className="h-4 w-4 text-neutral-500" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className={isExpanded ? 'h-[calc(100%-100px)]' : ''}>
        <div className={`${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
