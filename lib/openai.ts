import OpenAI from 'openai';
import { config } from '../config';

// Validate API key
if (!config.openai.apiKey || config.openai.apiKey === 'your_openai_api_key') {
  throw new Error('OpenAI API key is not configured. Please check your .env file.');
}

const openai = new OpenAI({
  apiKey: config.openai.apiKey,
  dangerouslyAllowBrowser: true // Required for React Native
});

export async function generateSolution(frustration: string): Promise<string> {
  try {
    const prompt = `Generate a creative and slightly humorous solution for this everyday frustration: "${frustration}". 
    The solution should be practical, specific, and written in a friendly tone. Include an emoji if appropriate.
    Keep the response under 150 characters.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    if (!response.choices[0]?.message?.content) {
      throw new Error('No solution generated');
    }

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error; // Preserve the original error for better debugging
  }
} 