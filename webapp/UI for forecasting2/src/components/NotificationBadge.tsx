import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Stock critique',
    message: 'ACC-023 - Stock épuisé',
    time: 'Il y a 5 min',
    type: 'error',
    read: false
  },
  {
    id: '2',
    title: 'Commande validée',
    message: 'Bon de commande #1234 approuvé',
    time: 'Il y a 1h',
    type: 'success',
    read: false
  },
  {
    id: '3',
    title: 'Prévision mise à jour',
    message: 'Prévisions octobre disponibles',
    time: 'Il y a 2h',
    type: 'info',
    read: true
  },
];

export function NotificationBadge() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'error':
        return 'border-l-danger-500 bg-danger-50/50';
      case 'warning':
        return 'border-l-warning-500 bg-warning-50/50';
      case 'success':
        return 'border-l-success-500 bg-success-50/50';
      default:
        return 'border-l-info-500 bg-info-50/50';
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-bounce-in pulse-ring"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 animate-slide-in-top" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-body">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs h-7"
            >
              Tout marquer lu
            </Button>
          )}
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-neutral-500">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
              <p className="text-small">Aucune notification</p>
            </div>
          ) : (
            notifications.map((notification, index) => (
              <div
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`p-4 border-b border-l-4 cursor-pointer transition-all hover:bg-neutral-50 ${
                  getTypeColor(notification.type)
                } ${!notification.read ? 'bg-opacity-100' : 'opacity-60'}`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-small text-neutral-900 truncate">
                      {notification.title}
                    </p>
                    <p className="text-small text-neutral-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-neutral-400 mt-2">
                      {notification.time}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1 animate-pulse" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
