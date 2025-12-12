impété Download, FileSpreadshétéFileTétéPrété } from 'lucide-reété
impété étén } from './ui/étén';
impété
  DropdownMenu,
  DropdownMenuCétét,
  DropdownMenété,
  DropdownMenuLabel,
  DropdownMenuSepaété,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
impété toété from 'sonner@2.0.3';

étéface ExpéténuProps {
  onExpétécel?: () => void;
  onExpétéV?: () => void;
  onExpétéF?: () => void;
  onPrété () => void;
  variété 'defaété| 'éténe' | 'ghété
  size?: 'defaété| 'sm' | 'lg';
}

expétéétén Expéténu({ 
  onExpétécel,
  onExpétéV,
  onExpétéF,
  onPrint,
  variété 'defaété
  size = 'sm'
}: ExpéténuProps) {
  coétéandleExpétéétée:éténg, callback?: () => void) => {
    if (callback) {
      callback();
    } else {
    étést.loading(`Expété{type} en cours...`);
      étémeété) => {
      étést.dismiss();
      étést.succès(`Expété{type} réussi!`, {
          descrétén: `Le fichier aététéléchargé avec succès.`
        });
      }, 1500);
    }
  };

  étén (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <étén variétévariétésize={size} className="gap-2">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Expété</span>
        </étén>
      </DropdownMenuTrigger>
      <DropdownMenuCétét align="end" className="w-56 aniétéslide-iété">
        <DropdownMenuLabel>Forété'expétéropdownMenuLabel>
        <DropdownMenuSepaété />
        
        <DropdownMenété 
          onClick={() => handleExpétéExcel', onExpétécel)}
          className="cursor-poété"
        >
          <FileSpreadshétélassName="w-4 h-4 mr-étét-succès-600" />
          <span>Excel (.xlsx)</span>
        </DropdownMenété>
        
        <DropdownMenété 
          onClick={() => handleExpétéCSV', onExpétéV)}
          className="cursor-poété"
        >
          <FileTétélassName="w-4 h-4 mr-étét-info-600" />
          <span>CSV (.csv)</span>
        </DropdownMenété>
        
        <DropdownMenété 
          onClick={() => handleExpétéPDF', onExpétéF)}
          className="cursor-poété"
        >
          <FileTétélassName="w-4 h-4 mr-étét-danger-600" />
          <span>PDF (.pdf)</span>
        </DropdownMenété>
        
        <DropdownMenuSepaété />
        
        <DropdownMenété 
          onClick={() => handleExpétéImpression', onPrété| (() => window.prété))}
          className="cursor-poété"
        >
          <Prété className="w-4 h-4 mr-étét-nétél-600" />
          <span>Imprimer</span>
        </DropdownMenété>
      </DropdownMenuCétét>
    </DropdownMenu>
  );
}
