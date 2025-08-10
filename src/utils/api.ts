// src/utils/api.ts
import { type Tweet } from '../types/index';

/**
 * @description API Configuration
 * IMPORTANT: Replace this with the public ngrok URL from your running backend API.
 */
const API_URL = "https://30tb201b1zdiuycyz54q0kywjvs_7fmurs4twpybciem6dehq.ngrok-free.app";

/**
 * @description Calls the backend API to generate a tweet and get its predicted likes.
 * @param topic - The topic for the tweet.
 * @param tone - The desired tone of the tweet.
 * @returns A promise that resolves to a Tweet object.
 * @throws Will throw an error if the API call fails.
 */
export const generateTweetAndPredict = async (topic: string, tone: string): Promise<Tweet> => {
  const response = await fetch(`${API_URL}/generate-with-llm-and-predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // This header is the key to bypassing the ngrok browser warning page
      'ngrok-skip-browser-warning': 'true'
    },
    body: JSON.stringify({
      company: "My Awesome Brand", // This could be made dynamic
      topic: topic,
      tone: tone,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'Unknown API error' }));
    throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorData.detail}`);
  }

  const data = await response.json();

  return {
    id: Date.now(),
    text: data.generated_tweet,
    likes: data.predicted_likes,
  };
};
