import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });

    const prompt = `Generate a single, humorous, short, friendly greeting for someone named ${name}. Respond with only the greeting text and nothing else. If the name is inappropriate, respond with "I'm sorry, I can't greet that name.", no further comments.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const greeting = response.text();

    return NextResponse.json({ greeting });
  } catch (error) {
    console.error('Error generating greeting:', error);
    return NextResponse.json({ error: 'Failed to generate greeting' }, { status: 500 });
  }
} 