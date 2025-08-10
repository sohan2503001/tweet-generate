// src/pages/GeneratorPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { TweetCard } from '../components/tweetcard';
import { generateTweetAndPredict } from '../utils/api';
import type { Tweet } from '../types';
import { Wand2 } from '../components/icons';

interface GeneratorPageProps {
  saveTweet: (tweet: Tweet) => void;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ saveTweet }) => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [generatedTweet, setGeneratedTweet] = useState<Tweet | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const tones = ['Professional', 'Funny', 'Inspirational', 'Sarcastic', 'Casual', 'Excited'];
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic) {
      toast.error('Please enter a topic to generate a tweet.');
      return;
    }
    setIsLoading(true);
    setGeneratedTweet(null);

    try {
      const tweet = await generateTweetAndPredict(topic, tone);
      setGeneratedTweet(tweet);
      toast.success('Tweet generated successfully!');
    } catch (error) {
      console.error("Failed to generate tweet:", error);
      toast.error(error instanceof Error ? error.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      key="generator"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="p-4 md:p-8"
    >
      <div className="max-w-2xl mx-auto space-y-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Topic</label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., our new AI platform"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
              <label htmlFor="tone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tone</label>
              <select
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {tones.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5"/>
                Generate Tweet
              </>
            )}
          </button>
        </form>

        {generatedTweet && <TweetCard tweet={generatedTweet} onSave={saveTweet} />}
      </div>
    </motion.div>
  );
};
