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

    const prompt = `You are a professional nutritionist and fitness expert. Create a personalized daily diet/nutrition plan based on this information: ${userInput}

Format the response as a structured nutrition plan with:
1. Caloric/Macronutrient Goals
2. 7-Day meal plan with:
   - Breakfast
   - Lunch
   - Snack
   - Dinner
3. Meal prep tips
4. Hydration guidelines
5. Supplementation suggestions (if needed)

Make it vegetarian-friendly when possible and include Indian foods if preferred. Keep it balanced and sustainable.`;

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
    console.error('Error generating diet plan:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate diet plan',
      },
      { status: 500 }
    );
  }
}
