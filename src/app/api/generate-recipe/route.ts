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

    const { ingredients, cuisinePreference } = await request.json();

    if (!ingredients?.trim()) {
      return NextResponse.json(
        { error: 'Ingredients are required' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    const cuisineText = cuisinePreference ? ` Prefer ${cuisinePreference} cuisine.` : '';
    const prompt = `You are a professional chef and nutritionist. Create a healthy recipe based on these ingredients: ${ingredients}.${cuisineText}

Format the response with:
1. Recipe Name
2. Prep Time & Cook Time
3. Servings
4. Ingredients with quantities
5. Step-by-step instructions
6. Nutritional information (approximate)
7. Tips for healthy cooking

Make it delicious, nutritious, and easy to follow for home cooks.`;

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
    console.error('Error generating recipe:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to generate recipe',
      },
      { status: 500 }
    );
  }
}
