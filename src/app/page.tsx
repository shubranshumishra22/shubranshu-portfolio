'use client';

import { useState } from 'react';
import Hero from '@/components/sections/Hero';
import SoftwareEngineer from '@/components/sections/SoftwareEngineer';
import Projects from '@/components/sections/Projects';
import BuildWithMe from '@/components/sections/BuildWithMe';
import GymAndSports from '@/components/sections/GymAndSports';
import VisionBoard from '@/components/sections/VisionBoard';
import Media from '@/components/sections/Media';
import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import Footer from '@/components/Footer';
import AIAssistantModal from '@/components/AIAssistantModal';

export default function Home() {
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);

  return (
    <main className="overflow-x-hidden">
      <Navigation />
      <ScrollProgress />
      <Hero />
      <SoftwareEngineer />
      <Projects />
      <BuildWithMe />
      <GymAndSports />
      <VisionBoard />
      <Media />
      <Footer />
      
      {/* AI Assistant Button */}
      <button
        onClick={() => setIsAIAssistantOpen(true)}
        className="fixed bottom-8 right-8 z-40 group"
        title="Ask Shub"
      >
        <div className="relative w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-2 border-stone/30 hover:border-stone/60 transition-all shadow-lg hover:shadow-xl hover:scale-110">
          <img 
            src="https://i.postimg.cc/G2dcX8vd/Chat-GPT-Image-Dec-26-2025-11-03-52-AM.png"
            alt="AI Assistant"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </button>

      <AIAssistantModal 
        isOpen={isAIAssistantOpen} 
        onClose={() => setIsAIAssistantOpen(false)} 
      />
    </main>
  );
}
