import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { prompt: userPrompt } = await request.json();

    if (!userPrompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });

    const prompt = `You are a creative assistant that generates a witty one-liner based on a single word, framed as 'If Elias were [the word]...'. Respond with ONLY the one-liner, no extra text.

User provided word: ${userPrompt}

One-liner:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const oneLiner = response.text();

    return NextResponse.json({ oneLiner });
  } catch (error) {
    console.error('Error generating one-liner:', error);
    return NextResponse.json({ error: 'Failed to generate one-liner' }, { status: 500 });
  }
} 