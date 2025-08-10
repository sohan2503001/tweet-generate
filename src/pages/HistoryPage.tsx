// src/pages/HistoryPage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TweetCard } from '../components/Tweetcard';
import type { Tweet } from '../types';

interface HistoryPageProps {
  tweets: Tweet[];
  deleteTweet: (tweetId: number) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ tweets, deleteTweet }) => {
  return (
    <motion.div
      key="history"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="p-4 md:p-8"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Saved Tweets</h2>
        {tweets.length > 0 ? (
          [...tweets].reverse().map(tweet => (
            <TweetCard key={tweet.id} tweet={tweet} onDelete={deleteTweet} isHistoryCard={true} />
          ))
        ) : (
          <div className="text-center py-12 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">You haven't saved any tweets yet.</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Generate and save a tweet to see it here.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
