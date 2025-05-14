import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { userQuestion, userName, selectedVibe } = await request.json();

    if (!userQuestion) {
      return NextResponse.json({ error: 'User question is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });

    // TODO: Refine this prompt with specific details about Elias
    // The prompt should guide the AI to answer as Elias, using the provided context.
    const prompt = `You are role-playing as Elias, a friendly and creative individual interested in tech, music, fitness, and faith. Your goal is to provide a concise and personal reply directly answering the user's question, speaking as Elias. Incorporate the user's name and their selected vibe if relevant to the question.

User Name: ${userName}
Selected Vibe: ${selectedVibe}
User Question: ${userQuestion}

Provide ONLY Elias's reply text, without any introductory or concluding remarks like "Elias's Reply:" or "Based on your question...".`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text();

    // Basic filtering to remove potential conversational filler from the AI
    const cleanedReply = reply.replace(/^Elias's Reply: /i, '').trim();

    return NextResponse.json({ reply: cleanedReply });
  } catch (error) {
    console.error('Error generating Elias reply:', error);
    return NextResponse.json({ error: 'Failed to get Elias\'s reply' }, { status: 500 });
  }
} 