import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SearchContextType {
    searchQuery: string;
    setSearchQuery: (searchQuery: string) => void;
}

const defaultContextValue: SearchContextType = {
    searchQuery: '',
    setSearchQuery: () => { }
};

const SearchContext = createContext<SearchContextType>(defaultContextValue);

export const useSearch = () => useContext(SearchContext);


interface SearchProviderProps {
    children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
            {children}
        </SearchContext.Provider>
    );
};
