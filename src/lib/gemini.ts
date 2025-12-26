import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey || '');

export async function generateWorkoutPlan(userInput: string): Promise<string> {
  try {
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
      throw new Error('Empty response from API');
    }
    
    return text;
  } catch (error) {
    throw new Error(`Failed to generate workout plan: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateDietPlan(userInput: string): Promise<string> {
  try {
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
      throw new Error('Empty response from API');
    }
    
    return text;
  } catch (error) {
    throw new Error(`Failed to generate diet plan: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateRecipe(ingredients: string, cuisinePreference?: string): Promise<string> {
  try {
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
      throw new Error('Empty response from API');
    }
    
    return text;
  } catch (error) {
    throw new Error(`Failed to generate recipe: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
