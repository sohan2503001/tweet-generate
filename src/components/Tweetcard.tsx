// src/components/TweetCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import type { Tweet } from '../types';
import { Copy, Twitter, Save, Trash2 } from './icons';

interface TweetCardProps {
  tweet: Tweet;
  onSave?: (tweet: Tweet) => void;
  onDelete?: (tweetId: number) => void;
  isHistoryCard?: boolean;
}

export const TweetCard: React.FC<TweetCardProps> = ({ tweet, onSave, onDelete, isHistoryCard = false }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(tweet.text);
    toast.success('Tweet copied to clipboard!');
  };

  const handleShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet.text)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 space-y-4"
    >
      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{tweet.text}</p>
      {tweet.likes !== null && (
         <div className="text-sm text-gray-500 dark:text-gray-400">
            Predicted Likes: <span className="font-bold text-blue-500">{tweet.likes}</span>
         </div>
      )}
      <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"><Copy className="w-4 h-4" /> Copy</button>
        <button onClick={handleShare} className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"><Twitter className="w-4 h-4" /> Share</button>
        {isHistoryCard ? (
          <button onClick={() => onDelete?.(tweet.id)} className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors ml-auto"><Trash2 className="w-4 h-4" /> Delete</button>
        ) : (
          <button onClick={() => onSave?.(tweet)} className="flex items-center gap-1.5 text-sm text-green-600 hover:text-green-800 dark:hover:text-green-400 transition-colors ml-auto"><Save className="w-4 h-4" /> Save</button>
        )}
      </div>
    </motion.div>
  );
};
