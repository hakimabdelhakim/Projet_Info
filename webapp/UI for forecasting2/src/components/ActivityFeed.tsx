import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  TrendingUp, 
  FileText, 
  User,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Activity {
  id: string;
  type: 'success' | 'warning' | 'info' | 'update';
  title: string;
  description: string;
  user?: string;
  timestamp: Date;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'success',
    title: 'Prévision validée',
    description: 'ACC-045 - Prévision octobre approuvée',
    user: 'Fatima Ziani',
    timestamp: new Date(Date.now() - 5 * 60000)
  },
  {
    id: '2',
    type: 'update',
    title: 'Stock mis à jour',
    description: 'BRG-012 - Quantité actualisée',
    user: 'Mohamed Alami',
    timestamp: new Date(Date.now() - 15 * 60000)
  },
  {
    id: '3',
    type: 'warning',
    title: 'Seuil critique',
    description: 'ACC-023 - Stock sous le seuil minimum',
    timestamp: new Date(Date.now() - 30 * 60000)
  },
  {
    id: '4',
    type: 'info',
    title: 'Rapport généré',
    description: 'Rapport mensuel disponible',
    user: 'Sarah Benali',
    timestamp: new Date(Date.now() - 60 * 60000)
  },
];

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);

  useEffect(() => {
    // Simulate new activities
    const interval = setInterval(() => {
      const types: Activity['type'][] = ['success', 'warning', 'info', 'update'];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: randomType,
        title: randomType === 'success' ? 'Nouvelle validation' : 'Mise à jour',
        description: `Activité système - ${new Date().toLocaleTimeString('fr-FR')}`,
        timestamp: new Date()
      };

      setActivities(prev => [newActivity, ...prev].slice(0, 10));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-success-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning-600" />;
      case 'info':
        return <Info className="w-4 h-4 text-info-600" />;
      case 'update':
        return <TrendingUp className="w-4 h-4 text-primary" />;
    }
  };

  const getTypeColor = (type: Activity['type']) => {
    switch (type) {
      case 'success':
        return 'border-l-success-500 bg-success-50/30';
      case 'warning':
        return 'border-l-warning-500 bg-warning-50/30';
      case 'info':
        return 'border-l-info-500 bg-info-50/30';
      case 'update':
        return 'border-l-primary bg-primary/5';
    }
  };

  const getRelativeTime = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'À l\'instant';
    if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)}h`;
    return `Il y a ${Math.floor(seconds / 86400)}j`;
  };

  return (
    <Card className="shadow-sm border-neutral-200 hover-lift">
      <CardHeader className="pb-3">
        <CardTitle className="text-h3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Activité récente
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <AnimatePresence mode="popLayout">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`px-4 py-3 border-l-4 border-b border-b-neutral-100 ${getTypeColor(activity.type)} hover:bg-opacity-50 transition-all cursor-pointer`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">
                    {getIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-small text-neutral-900 truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {activity.user && (
                        <div className="flex items-center gap-1 text-xs text-neutral-500">
                          <User className="w-3 h-3" />
                          <span>{activity.user}</span>
                        </div>
                      )}
                      <span className="text-xs text-neutral-400">
                        {getRelativeTime(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
