import { create } from 'zustand';

interface UIState {
    isSidebarOpen: boolean;
    theme: 'light' | 'dark' | 'system';
    notifications: Notification[];
}

interface Notification {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    duration?: number;
}

interface UIActions {
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    addNotification: (notification: Omit<Notification, 'id'>) => void;
    removeNotification: (id: string) => void;
}

type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>(set => ({
    isSidebarOpen: false,
    theme: 'system',
    notifications: [],

    toggleSidebar: () => {
        set(state => ({ isSidebarOpen: !state.isSidebarOpen }));
    },

    setSidebarOpen: isOpen => {
        set({ isSidebarOpen: isOpen });
    },

    setTheme: theme => {
        set({ theme });
        if (typeof window !== 'undefined') {
            document.documentElement.classList.remove('light', 'dark');
            if (theme !== 'system') {
                document.documentElement.classList.add(theme);
            }
        }
    },

    addNotification: notification => {
        const id = Math.random().toString(36).substring(7);
        set(state => ({
            notifications: [...state.notifications, { ...notification, id }],
        }));

        if (notification.duration !== 0) {
            setTimeout(() => {
                set(state => ({
                    notifications: state.notifications.filter(n => n.id !== id),
                }));
            }, notification.duration || 5000);
        }
    },

    removeNotification: id => {
        set(state => ({
            notifications: state.notifications.filter(n => n.id !== id),
        }));
    },
}));
