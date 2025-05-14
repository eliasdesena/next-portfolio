import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { funFact } = await request.json();

    if (!funFact) {
      return NextResponse.json({ error: 'Fun fact is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });

    const prompt = `You are an enthusiastic and slightly quirky assistant reacting to a user's fun fact. Respond with a short, positive, and engaging reaction to the following fun fact. Keep it concise, maximum two sentences. Respond with only the reaction text and nothing else.

User's fun fact: ${funFact}

Reaction:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reaction = response.text();

    return NextResponse.json({ reaction });
  } catch (error) {
    console.error('Error generating fun fact reaction:', error);
    return NextResponse.json({ error: 'Failed to generate fun fact reaction' }, { status: 500 });
  }
} 