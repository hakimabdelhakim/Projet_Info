import { useState, useEffect } from 'react';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  description: string;
  url?: string;
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'ACC-001',
    category: 'Pièce',
    description: 'Accouplement élastique 50mm'
  },
  {
    id: '2',
    title: 'Prévisions Octobre',
    category: 'Document',
    description: 'Rapport de prévisions mensuelles'
  },
  {
    id: '3',
    title: 'Budget 2025',
    category: 'Finance',
    description: 'Allocation budgétaire annuelle'
  },
];

const recentSearches = ['ACC-001', 'Stock critique', 'Prévisions'];

export function QuickSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (query.length > 0) {
      // Simulated search
      const filtered = mockResults.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Pièce':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Document':
        return 'bg-info-50 text-info-600 border-info-200';
      case 'Finance':
        return 'bg-warning-50 text-warning-600 border-warning-200';
      default:
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <Input
          type="text"
          placeholder="Rechercher pièces, documents, rapports..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length === 0 && setIsOpen(true)}
          className="pl-10 pr-10 h-10 rounded-input border-neutral-300 focus:border-primary transition-all"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto shadow-elevation-4 border-neutral-200 animate-slide-in-top z-50">
          {query.length === 0 ? (
            <div className="p-4">
              <div className="flex items-center gap-2 text-neutral-600 mb-3">
                <Clock className="w-4 h-4" />
                <p className="text-small font-semibold">Recherches récentes</p>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-neutral-50 transition-colors text-small text-neutral-700"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => {
                    setQuery('');
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-3 rounded-lg hover:bg-primary/5 transition-all group"
                  style={{
                    animationDelay: `${index * 50}ms`
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-small text-neutral-900 group-hover:text-primary transition-colors">
                        {result.title}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        {result.description}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getCategoryColor(result.category)}`}
                    >
                      {result.category}
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-neutral-500">
              <Search className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-small">Aucun résultat trouvé</p>
            </div>
          )}
        </Card>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
