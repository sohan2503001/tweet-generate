// src/App.tsx
import React, { useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'sonner';

import { useLocalStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { GeneratorPage } from './pages/GeneratorPage';
import { HistoryPage } from './pages/HistoryPage';
import type { Tweet } from './types';

export type Page = 'generator' | 'history';

export default function App() {
  const [page, setPage] = useLocalStorage<Page>('page', 'generator');
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);
  const [tweets, setTweets] = useLocalStorage<Tweet[]>('savedTweets', []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const saveTweet = useCallback((tweetToSave: Tweet) => {
    if (tweets.some(t => t.id === tweetToSave.id)) {
        toast.info('This tweet is already saved!');
        return;
    }
    setTweets(prev => [tweetToSave, ...prev]);
    toast.success('Tweet saved to history!');
  }, [tweets, setTweets]);

  const deleteTweet = useCallback((tweetId: number) => {
    setTweets(prev => prev.filter(t => t.id !== tweetId));
    toast.success('Tweet deleted from history.');
  }, [setTweets]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Toaster richColors position="top-right" theme={darkMode ? 'dark' : 'light'} />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} page={page} setPage={setPage} />
      <main>
        <AnimatePresence mode="wait">
          {page === 'generator' && <GeneratorPage saveTweet={saveTweet} />}
          {page === 'history' && <HistoryPage tweets={tweets} deleteTweet={deleteTweet} />}
        </AnimatePresence>
      </main>
    </div>
  );
}
