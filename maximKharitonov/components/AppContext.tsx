// AppContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>;
    currentCity: string;
    setCurrentCity: React.Dispatch<React.SetStateAction<string>>;
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkTheme: boolean; // новое состояние для темы
    toggleTheme: () => void; // функция для переключения темы
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [count, setCount] = useState<number>(0);
    const [currentCity, setCurrentCity] = useState<string>('Якутск,ru');
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false); 

    const toggleTheme = () => {
        setIsDarkTheme(prev => !prev);
    };

    return (
        <AppContext.Provider value={{ count, setCount, currentCity, setCurrentCity, isActive, setIsActive, isDarkTheme, toggleTheme }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};

export default AppProvider;
