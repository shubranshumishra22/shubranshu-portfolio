'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import FormattedAIResponse from './FormattedAIResponse';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'workout' | 'diet' | 'recipe';

export default function AIAssistantModal({ isOpen, onClose }: AIAssistantModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('workout');
  const [workoutInput, setWorkoutInput] = useState('');
  const [dietInput, setDietInput] = useState('');
  const [recipeInput, setRecipeInput] = useState('');
  const [recipeCuisine, setRecipeCuisine] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateWorkout = async () => {
    if (!workoutInput.trim()) {
      setError('Please enter your fitness goals and preferences');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate-workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: workoutInput }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to generate workout plan');
      }
      const data = await res.json();
      setResult(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate workout plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDiet = async () => {
    if (!dietInput.trim()) {
      setError('Please enter your dietary preferences and goals');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate-diet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInput: dietInput }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to generate diet plan');
      }
      const data = await res.json();
      setResult(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate diet plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRecipe = async () => {
    if (!recipeInput.trim()) {
      setError('Please enter at least one ingredient');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: recipeInput, cuisinePreference: recipeCuisine }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to generate recipe');
      }
      const data = await res.json();
      setResult(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setResult('');
    setError('');
    setWorkoutInput('');
    setDietInput('');
    setRecipeInput('');
    setRecipeCuisine('');
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    resetForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-charcoal/80 backdrop-blur border-b border-stone/20 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-h3 font-display font-bold">Ask Shub</h2>
                <button
                  onClick={onClose}
                  className="text-stone hover:text-ivory transition-colors text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-3 overflow-x-auto">
                {[
                  { id: 'workout' as Tab, label: '💪 Workout Plan' },
                  { id: 'diet' as Tab, label: '🥗 Diet Plan' },
                  { id: 'recipe' as Tab, label: '👨‍🍳 Recipe' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'bg-stone/40 text-ivory border border-stone/60'
                        : 'text-stone hover:text-ivory'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {!result ? (
                <AnimatePresence mode="wait">
                  {/* Workout Tab */}
                  {activeTab === 'workout' && (
                    <motion.div
                      key="workout"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="text-sm font-semibold text-ivory mb-2 block">
                          Your Fitness Profile
                        </label>
                        <textarea
                          value={workoutInput}
                          onChange={(e) => setWorkoutInput(e.target.value)}
                          placeholder="E.g., Beginner, 3 days/week, want to build muscle, no equipment"
                          className="w-full bg-charcoal/50 border border-stone/30 rounded-lg p-3 text-stone placeholder:text-stone/50 focus:outline-none focus:border-stone/60"
                          rows={4}
                        />
                      </div>
                      <button
                        onClick={handleGenerateWorkout}
                        disabled={loading}
                        className="w-full btn btn-primary"
                      >
                        {loading ? 'Generating...' : 'Generate Workout Plan'}
                      </button>
                    </motion.div>
                  )}

                  {/* Diet Tab */}
                  {activeTab === 'diet' && (
                    <motion.div
                      key="diet"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="text-sm font-semibold text-ivory mb-2 block">
                          Your Dietary Preferences & Goals
                        </label>
                        <textarea
                          value={dietInput}
                          onChange={(e) => setDietInput(e.target.value)}
                          placeholder="E.g., Vegetarian, want to lose weight, high protein, Indian foods preferred, 2000 cal/day"
                          className="w-full bg-charcoal/50 border border-stone/30 rounded-lg p-3 text-stone placeholder:text-stone/50 focus:outline-none focus:border-stone/60"
                          rows={4}
                        />
                      </div>
                      <button
                        onClick={handleGenerateDiet}
                        disabled={loading}
                        className="w-full btn btn-primary"
                      >
                        {loading ? 'Generating...' : 'Generate Diet Plan'}
                      </button>
                    </motion.div>
                  )}

                  {/* Recipe Tab */}
                  {activeTab === 'recipe' && (
                    <motion.div
                      key="recipe"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="text-sm font-semibold text-ivory mb-2 block">
                          Ingredients You Have
                        </label>
                        <textarea
                          value={recipeInput}
                          onChange={(e) => setRecipeInput(e.target.value)}
                          placeholder="E.g., Chicken, broccoli, rice, garlic, ginger"
                          className="w-full bg-charcoal/50 border border-stone/30 rounded-lg p-3 text-stone placeholder:text-stone/50 focus:outline-none focus:border-stone/60"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-ivory mb-2 block">
                          Cuisine Preference (Optional)
                        </label>
                        <input
                          type="text"
                          value={recipeCuisine}
                          onChange={(e) => setRecipeCuisine(e.target.value)}
                          placeholder="E.g., Indian, Italian, Asian"
                          className="w-full bg-charcoal/50 border border-stone/30 rounded-lg p-3 text-stone placeholder:text-stone/50 focus:outline-none focus:border-stone/60"
                        />
                      </div>
                      <button
                        onClick={handleGenerateRecipe}
                        disabled={loading}
                        className="w-full btn btn-primary"
                      >
                        {loading ? 'Generating...' : 'Generate Recipe'}
                      </button>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-charcoal/50 border border-stone/30 rounded-lg p-6 max-h-96 overflow-y-auto">
                    <FormattedAIResponse content={result} />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        const text = result;
                        navigator.clipboard.writeText(text);
                      }}
                      className="flex-1 btn btn-secondary"
                    >
                      📋 Copy
                    </button>
                    <button
                      onClick={resetForm}
                      className="flex-1 btn btn-primary"
                    >
                      Generate New
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
