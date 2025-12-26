import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const { userInput } = await request.json();

    if (!userInput?.trim()) {
      return NextResponse.json(
        { error: 'User input is required' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    const prompt = `You are a professional fitness trainer. Create a personalized workout plan based on this information: ${userInput}

Format the response as a structured workout plan with:
1. Goal Analysis
2. Weekly Split (days and muscle groups)
3. Exercises per session (with sets and reps)
4. Rest days and recovery tips
5. Progression strategy

Keep it practical and achievable like the example: 3-Day split with push, pull, and legs focus.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      return NextResponse.json(
        { error: 'Empty response from API' },
        { status: 500 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error('Error generating workout plan:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate workout plan',
      },
      { status: 500 }
    );
  }
}
