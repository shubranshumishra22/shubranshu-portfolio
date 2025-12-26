'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Achievement {
  title: string;
  description: string;
  icon: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  company: string;
  description: string;
  align: 'left' | 'right';
}

export default function SoftwareEngineer() {
  const ref = useRef(null);
  const timelineRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  });

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

  const achievements: Achievement[] = [
    {
      title: 'ML Systems',
      description: 'Deep learning, NLP, computer vision, production ML pipelines',
      icon: '🧠',
    },
    {
      title: 'Full Stack',
      description: 'React, Node.js, Next.js, TypeScript, databases, cloud infrastructure',
      icon: '⚙️',
    },
    {
      title: 'Core CS',
      description: 'Algorithms, data structures, system design, distributed systems',
      icon: '🔧',
    },
    {
      title: 'Research',
      description: 'Published in Springer, peer-reviewed journals, novel methodologies',
      icon: '📚',
    },
  ];

  const timeline: TimelineEvent[] = [
    {
      year: '2025',
      title: 'Published Researcher',
      company: 'Springer LNNS (Scopus Indexed)',
      description:
        'Published peer-reviewed research on IoT-enabled plant health monitoring using CNN. Presented at ICTIS 2025, Bangkok.',
      align: 'right',
    },
    {
      year: '2024',
      title: 'Machine Learning & Full-Stack Projects',
      company: 'Academic & Independent Work',
      description:
        'Built end-to-end ML systems with data preprocessing and feature engineering. Deployed full-stack apps using Next.js, Node.js, Flask.',
      align: 'left',
    },
    {
      year: '2023',
      title: 'Hackathon Finalist',
      company: 'IEEE SRMIST – HackTrix Hackathon',
      description:
        'Designed and prototyped innovative technical solutions under time constraints. Focused on rapid problem-solving and collaboration.',
      align: 'right',
    },
    {
      year: '2023',
      title: 'Full-Stack Developer',
      company: 'CookMate & WellTech',
      description:
        'Built platforms with authentication, APIs, databases, and UI. Implemented role-based access, AI integration, and scalable deployments.',
      align: 'left',
    },
    {
      year: '2019',
      title: 'NASA Space Settlement Design Contest',
      company: 'Global 1st Place Winner',
      description:
        'Part of international team designing sustainable space settlement. Awarded Global First Place by NASA.',
      align: 'right',
    },
  ];

  const skills = {
    'ML & AI': ['TensorFlow', 'PyTorch', 'LLMs', 'Computer Vision', 'NLP', 'Data Science'],
    'Backend': ['Node.js', 'Python', 'Go', 'PostgreSQL', 'Redis', 'AWS', 'Docker'],
    'Frontend': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    'Tools': ['Git', 'CI/CD', 'Kubernetes', 'Kafka', 'GraphQL', 'REST APIs'],
  };

  return (
    <section id="engineer" className="section bg-charcoal py-section">
      <div className="container-max">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-20"
        >
          <motion.h2 variants={itemVariants} className="text-h2 font-display font-bold mb-6">
            Software Engineer
          </motion.h2>
          <motion.p variants={itemVariants} className="text-body-lg text-stone max-w-2xl">
            Combining rigorous engineering fundamentals with cutting-edge ML expertise. Proven ability
            to architect, build, and ship systems that scale to millions of users.
          </motion.p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
        >
          {[
            { label: 'Academic Background', value: 'B.Tech (ECE) · SRMIST', accent: 'from-slate/20 to-transparent' },
            { label: 'Research Publication', value: 'Springer LNNS (Scopus Indexed)', accent: 'from-stone/20 to-transparent' },
            { label: 'Global Recognition', value: 'NASA Space Settlement Design Contest — Global 1st Place', accent: 'from-slate/20 to-transparent' },
            { label: 'Core Focus Areas', value: 'Machine Learning · Full-Stack Development · System Design', accent: 'from-stone/20 to-transparent' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={`glass p-6 rounded-xl border border-stone/20 hover:border-stone/40 transition-all group bg-gradient-to-br ${stat.accent}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-1 h-6 bg-gradient-to-b from-slate to-stone rounded-full opacity-60 group-hover:opacity-100 transition-opacity" />
                <p className="text-sm font-display font-bold text-ivory tracking-wide uppercase">{stat.label}</p>
              </div>
              <p className="text-body text-stone leading-relaxed ml-4">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-20"
        >
          <motion.h3 variants={itemVariants} className="text-h3 font-display font-bold mb-12">
            Technical Expertise
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <motion.div key={category} variants={itemVariants} className="glass p-8 rounded-xl">
                <h4 className="text-h4 font-display font-semibold mb-6 text-ivory">{category}</h4>
                <div className="flex flex-wrap gap-3">
                  {items.map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-4 py-2 bg-graphite/50 rounded-full text-body-sm text-cloud border border-slate/30 hover:border-stone/60 transition-colors cursor-default"
                      whileHover={{ scale: 1.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-20"
        >
          <motion.h3 variants={itemVariants} className="text-h3 font-display font-bold mb-12">
            Professional Journey
          </motion.h3>

          <div className="relative" ref={timelineRef}>
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-stone/40" />

            {/* Mouse icon - moves with scroll */}
            <motion.div
              className="absolute flex items-center justify-center pointer-events-none"
              style={{
                left: '50%',
                top: 0,
                x: '-50%',
                y: useTransform(scrollYProgress, [0, 1], [0, 800]),
              }}
            >
              <motion.img
                src="https://i.postimg.cc/02tYVxmv/Chat-GPT-Image-Dec-25-2025-09-04-16-PM.png"
                alt="Timeline"
                className="w-10 h-auto opacity-70"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Timeline events */}
            <div className="space-y-12">
              {timeline.map((event, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`flex ${event.align === 'right' ? 'flex-row-reverse' : 'flex-row'} gap-8`}
                >
                  {/* Content */}
                  <div className="w-1/2">
                    <div className={`glass p-6 rounded-xl ${event.align === 'right' ? 'text-right' : 'text-left'}`}>
                      <p className="text-body-sm text-stone font-semibold">{event.year}</p>
                      <h4 className="text-h4 font-display font-bold mt-2">{event.title}</h4>
                      <p className="text-body-sm text-cloud mt-1">{event.company}</p>
                      <p className="text-body text-stone mt-3">{event.description}</p>
                    </div>
                  </div>

                  {/* Empty space */}
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Achievements */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h3 variants={itemVariants} className="text-h3 font-display font-bold mb-12">
            Core Competencies
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {achievements.map((achievement) => (
              <motion.div
                key={achievement.title}
                variants={itemVariants}
                className="glass p-8 rounded-xl group hover:border-stone/60 transition-all"
              >
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h4 className="text-h4 font-display font-semibold mb-3">{achievement.title}</h4>
                <p className="text-body text-stone">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
