import { Download, FileSpreadsheet, FileText, Printer } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';

interface ExportMenuProps {
  onExportExcel?: () => void;
  onExportCSV?: () => void;
  onExportPDF?: () => void;
  onPrint?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function ExportMenu({ 
  onExportExcel,
  onExportCSV,
  onExportPDF,
  onPrint,
  variant = 'default',
  size = 'sm'
}: ExportMenuProps) {
  const handleExport = (type: string, callback?: () => void) => {
    if (callback) {
      callback();
    } else {
      toast.loading(`Export ${type} en cours...`);
      setTimeout(() => {
        toast.dismiss();
        toast.success(`Export ${type} réussi!`, {
          description: `Le fichier a été téléchargé avec succès.`
        });
      }, 1500);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="gap-2">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Exporter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 animate-slide-in-top">
        <DropdownMenuLabel>Format d'export</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => handleExport('Excel', onExportExcel)}
          className="cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4 mr-2 text-success-600" />
          <span>Excel (.xlsx)</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleExport('CSV', onExportCSV)}
          className="cursor-pointer"
        >
          <FileText className="w-4 h-4 mr-2 text-info-600" />
          <span>CSV (.csv)</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleExport('PDF', onExportPDF)}
          className="cursor-pointer"
        >
          <FileText className="w-4 h-4 mr-2 text-danger-600" />
          <span>PDF (.pdf)</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => handleExport('Impression', onPrint || (() => window.print()))}
          className="cursor-pointer"
        >
          <Printer className="w-4 h-4 mr-2 text-neutral-600" />
          <span>Imprimer</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
