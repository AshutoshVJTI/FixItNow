import { Database } from '../types/database';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';  // Replace with actual endpoint
const DEEPSEEK_API_KEY = 'your_deepseek_api_key';  // Replace with your API key

interface DeepSeekResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

export async function generateSolution(frustration: string): Promise<string> {
  try {
    const prompt = `Generate a creative and slightly humorous solution for this everyday frustration: "${frustration}". 
    The solution should be practical, specific, and written in a friendly tone. Include an emoji if appropriate.
    Keep the response under 150 characters.`;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 100,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate solution');
    }

    const data: DeepSeekResponse = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    throw new Error('Failed to generate solution. Please try again.');
  }
} 