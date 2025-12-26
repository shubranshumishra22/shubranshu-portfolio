'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import CourtBackground from '../CourtBackground';

export default function GymAndSports() {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current as HTMLElement;
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 at top, 1 at bottom
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight))
      );

      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const workoutSplit = [
    {
      day: 'Day 1',
      title: 'Chest, Triceps & Shoulders',
      tagline: 'Push-focused strength and muscle balance',
      exercises: [
        'Bench Press / Dumbbell Press',
        'Incline Dumbbell Press',
        'Shoulder Press',
        'Lateral Raises',
        'Cable Chest Fly / Pec Deck',
        'Tricep Dips',
        'Tricep Pushdowns',
      ],
      focus: 'Upper-body push strength, shoulder stability',
    },
    {
      day: 'Day 2',
      title: 'Back & Biceps',
      tagline: 'Pull strength and posture',
      exercises: [
        'Deadlifts / Rack Pulls',
        'Lat Pulldown / Pull-ups',
        'Seated Cable Row',
        'Single-Arm Dumbbell Row',
        'Barbell / Dumbbell Curls',
        'Hammer Curls',
      ],
      focus: 'Back thickness, arm strength, posture',
    },
    {
      day: 'Day 3',
      title: 'Legs & Core',
      tagline: 'Lower-body power and stability',
      exercises: [
        'Squats / Leg Press',
        'Romanian Deadlifts',
        'Walking Lunges',
        'Leg Curls',
        'Calf Raises',
        'Hanging Leg Raises',
        'Plank Variations',
      ],
      focus: 'Leg strength, core control, balance',
    },
  ];

  const dietPlan = [
    {
      day: 'Day 1',
      type: 'High Protein',
      meals: [
        { meal: 'Breakfast', item: 'Oats with milk, protein powder, nuts' },
        { meal: 'Lunch', item: 'Paneer, brown rice, vegetables' },
        { meal: 'Snack', item: 'Curd with seeds' },
        { meal: 'Dinner', item: 'Dal, roti, sabzi' },
      ],
    },
    {
      day: 'Day 2',
      type: 'Balanced Nutrition',
      meals: [
        { meal: 'Breakfast', item: 'Vegetable omelette (or tofu scramble), whole-grain toast' },
        { meal: 'Lunch', item: 'Rajma, rice/quinoa, salad' },
        { meal: 'Snack', item: 'Fruit with nuts' },
        { meal: 'Dinner', item: 'Paneer/tofu with vegetables' },
      ],
    },
    {
      day: 'Day 3',
      type: 'Clean & Light',
      meals: [
        { meal: 'Breakfast', item: 'Protein smoothie (milk, banana, seeds)' },
        { meal: 'Lunch', item: 'Khichdi with curd' },
        { meal: 'Snack', item: 'Buttermilk / fruit' },
        { meal: 'Dinner', item: 'Light dal or soup' },
      ],
    },
    {
      day: 'Day 4',
      type: 'High Protein',
      meals: [
        { meal: 'Breakfast', item: 'Besan chilla with curd' },
        { meal: 'Lunch', item: 'Tofu or paneer, roti, vegetables' },
        { meal: 'Snack', item: 'Roasted chana' },
        { meal: 'Dinner', item: 'Chickpea curry with salad' },
      ],
    },
    {
      day: 'Day 5',
      type: 'Balanced Nutrition',
      meals: [
        { meal: 'Breakfast', item: 'Upma / poha with peanuts' },
        { meal: 'Lunch', item: 'Chole, rice, vegetables' },
        { meal: 'Snack', item: 'Peanut butter with fruit' },
        { meal: 'Dinner', item: 'Paneer bhurji with roti' },
      ],
    },
    {
      day: 'Day 6',
      type: 'Clean & Recovery',
      meals: [
        { meal: 'Breakfast', item: 'Smoothie bowl with seeds' },
        { meal: 'Lunch', item: 'Vegetable pulao with curd' },
        { meal: 'Snack', item: 'Coconut water / fruit' },
        { meal: 'Dinner', item: 'Vegetable soup, sautéed veggies' },
      ],
    },
    {
      day: 'Day 7',
      type: 'Flexible & Sustainable',
      meals: [
        { meal: 'Breakfast', item: 'Any high-protein vegetarian meal' },
        { meal: 'Lunch', item: 'Home-cooked balanced meal' },
        { meal: 'Snack', item: 'Nuts / curd' },
        { meal: 'Dinner', item: 'Light protein-focused meal' },
      ],
    },
  ];

  return (
    <section
      id="gym"
      ref={ref}
      className="section relative min-h-screen flex items-center py-section bg-charcoal overflow-hidden"
    >
      {/* Blueprint Court Background */}
      <CourtBackground />

      {/* Background animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: scrollProgress * 0.3,
        }}
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-slate rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-stone rounded-full mix-blend-multiply filter blur-3xl" />
      </motion.div>

      <div className="container-max relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Basketball Image Animation */}
          <div className="mb-20 h-96 flex items-center justify-center relative">
            {/* Basketball Image */}
            <motion.img
              src="https://i.postimg.cc/9QhPwvXv/Chat-GPT-Image-Dec-25-2025-06-00-38-PM.png"
              alt="Basketball"
              className="h-80 w-80 object-contain rounded-full"
              style={{
                scale: 1 - scrollProgress * 0.3,
                opacity: Math.max(0, 1 - scrollProgress * 1.5),
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-h2 font-display font-bold mb-6">Discipline & Consistency</h2>
            <p className="text-body-lg text-stone max-w-3xl mx-auto">
              From the gym to the cricket field, discipline is built through training. I carry that same mindset into engineering.
            </p>
          </motion.div>

          {/* Three Column Layout - Workout, Avatar, Diet */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 items-start"
          >
            {/* Left Column - 3-Day Workout Split Scrollable */}
            <motion.div
              variants={itemVariants}
              className="glass rounded-xl overflow-hidden flex flex-col h-screen"
            >
              <h3 className="text-h4 font-display font-bold p-6 sticky top-0 bg-charcoal/80 backdrop-blur">
                3-Day Workout
              </h3>
              <div className="overflow-y-auto flex-1 p-6 space-y-6">
                {workoutSplit.map((workout) => (
                  <div key={workout.day} className="border-b border-stone/20 pb-4 last:border-b-0">
                    <p className="text-xs text-stone/70 font-mono mb-1">{workout.day}</p>
                    <h4 className="text-sm font-display font-bold mb-1">{workout.title}</h4>
                    <p className="text-xs text-stone italic mb-3">{workout.tagline}</p>
                    <div className="space-y-2">
                      {workout.exercises.map((exercise, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-stone/50 mt-0.5">•</span>
                          <span className="text-xs text-stone">{exercise}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-stone/70 mt-3 pt-3 border-t border-stone/20">
                      <span className="font-semibold">Focus:</span> {workout.focus}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Center - Avatar Image */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center justify-center gap-8"
            >
              <img
                src="https://i.postimg.cc/RVfRV2nH/Chat-GPT-Image-Dec-25-2025-09-17-59-PM.png"
                alt="Fitness Avatar"
                className="rounded-xl w-full max-w-sm object-cover shadow-lg"
              />
              
              {/* Running PR Visualization */}
              <div className="w-full max-w-sm">
                <h4 className="text-sm font-display font-bold mb-4 text-center">Marathon Distance</h4>
                <svg viewBox="0 0 300 100" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
                  {/* Full marathon route (42km) - light background */}
                  <path
                    d="M 10 60 Q 150 30, 290 60"
                    stroke="rgba(185, 175, 160, 0.2)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  
                  {/* Personal best route (12km) - highlighted */}
                  <path
                    d="M 10 60 Q 75 40, 140 60"
                    stroke="url(#prGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="prGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(185, 175, 160, 0.6)" />
                      <stop offset="100%" stopColor="rgba(185, 175, 160, 1)" />
                    </linearGradient>
                  </defs>
                  
                  {/* Start marker */}
                  <circle cx="10" cy="60" r="3" fill="rgba(185, 175, 160, 0.6)" />
                  
                  {/* Personal best marker */}
                  <circle cx="140" cy="60" r="5" fill="rgba(185, 175, 160, 1)" />
                  
                  {/* End of marathon marker */}
                  <circle cx="290" cy="60" r="3" fill="rgba(185, 175, 160, 0.3)" />
                </svg>
                <div className="mt-4 space-y-2 text-center">
                  <p className="text-sm text-stone">
                    <span className="font-bold text-ivory">12 km</span> / 42 km
                  </p>
                  <p className="text-xs text-stone/70">Personal Best</p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - 7-Day Nutrition Plan Scrollable */}
            <motion.div
              variants={itemVariants}
              className="glass rounded-xl overflow-hidden flex flex-col h-screen"
            >
              <h3 className="text-h4 font-display font-bold p-6 sticky top-0 bg-charcoal/80 backdrop-blur">
                7-Day Nutrition
              </h3>
              <div className="overflow-y-auto flex-1 p-6 space-y-6">
                {dietPlan.map((day) => (
                  <div key={day.day} className="border-b border-stone/20 pb-4 last:border-b-0">
                    <p className="text-xs text-stone/70 font-mono mb-1">{day.day}</p>
                    <h4 className="text-sm font-display font-bold mb-3">{day.type}</h4>
                    <div className="space-y-2">
                      {day.meals.map((mealItem, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <p className="text-xs font-semibold text-stone/60 uppercase tracking-wider">
                            {mealItem.meal}
                          </p>
                          <p className="text-xs text-stone">{mealItem.item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
