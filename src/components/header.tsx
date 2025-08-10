// src/components/Header.tsx
import React from 'react';
import { Sun, Moon, Wand2 } from './icons';
import type { Page } from '../App'; // Assuming Page type is exported from App.tsx
 // Assuming Page type is exported from App.tsx

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  page: Page;
  setPage: (page: Page) => void;
}

const NavLink: React.FC<{ children: React.ReactNode; pageName: Page; currentPage: Page; setPage: (page: Page) => void; }> = ({ children, pageName, currentPage, setPage }) => (
  <button
    onClick={() => setPage(pageName)}
    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
      currentPage === pageName
        ? 'bg-blue-500 text-white'
        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
    }`}
  >
    {children}
  </button>
);

export const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, page, setPage }) => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <Wand2 className="text-blue-500" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">TweetGen</h1>
      </div>
      <nav className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
        <NavLink pageName="generator" currentPage={page} setPage={setPage}>Generator</NavLink>
        <NavLink pageName="history" currentPage={page} setPage={setPage}>History</NavLink>
      </nav>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-700" />}
      </button>
    </header>
  );
};
