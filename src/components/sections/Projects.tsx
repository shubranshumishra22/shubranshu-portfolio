'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  problem: string;
  impact: string;
  tech: string[];
  image: string;
  github?: string;
  live?: string;
  featured: boolean;
}

export default function Projects() {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [, setSelectedProject] = useState<number | null>(null);

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

  const projects: Project[] = [
    {
      id: 1,
      title: 'Robotic Plant Health Monitoring System',
      description: 'An IoT-enabled autonomous system for real-time plant disease detection using convolutional neural networks.',
      problem: 'Traditional plant disease detection is manual, slow, and prone to error, leading to delayed treatment and crop loss.',
      impact: 'Achieved 99.37% classification accuracy using CNN-based ML models. Integrated automated pesticide spraying and IoT-based monitoring for precision farming. Published as a peer-reviewed paper in Springer LNNS and presented at ICTIS 2025 (Bangkok).',
      tech: ['Python', 'CNN', 'IoT', 'TensorFlow/Keras', 'OpenCV'],
      image: '/projects/plant-health.jpg',
      featured: true,
    },
    {
      id: 2,
      title: 'Wafer Sensor Fault Detection System',
      description: 'An end-to-end ML pipeline for detecting defects in semiconductor wafer sensors using high-dimensional sensor data.',
      problem: 'Manufacturing defect data is highly imbalanced, making accurate fault detection difficult.',
      impact: 'Built a complete pipeline with automated EDA, preprocessing, and feature selection on 500+ sensor features. Improved minority-class detection using SMOTETomek. Achieved best performance using Random Forest, outperforming SVC and Logistic Regression. Deployed a Flask-based batch inference service with CSV upload support.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'SMOTETomek', 'Random Forest'],
      image: '/projects/wafer-detection.jpg',
      github: 'https://github.com',
      featured: true,
    },
    {
      id: 3,
      title: 'CookMate – Full-Stack Service Marketplace',
      description: 'A cloud-native service marketplace platform enabling users to discover, post, and manage service requirements.',
      problem: 'Lack of scalable, secure platforms for localized service discovery and management.',
      impact: 'Built a full-stack application with Next.js and Express/Node.js, deployed on Vercel and Railway. Implemented Supabase PKCE authentication, JWT validation, and role-based access control (RLS). Optimized service discovery using PostgreSQL views. Integrated Google Gemini AI for multilingual translation, reducing API calls by ~60%. Hardened APIs with Helmet, CORS, Zod validation, and structured logging.',
      tech: ['Next.js', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Docker', 'Gemini AI'],
      image: '/projects/cookmate.jpg',
      live: 'https://example.com',
      featured: true,
    },
    {
      id: 4,
      title: 'WellTech – Health Prediction Platform',
      description: 'A web-based health prediction and assistance platform with integrated hospital discovery.',
      problem: 'Users needed a centralized platform for health prediction and nearby healthcare facility discovery.',
      impact: 'Developed frontend using HTML, CSS, and JavaScript. Integrated MySQL for persistent storage. Added Google Maps API for locating nearby hospitals and labs. Included a mental health chatbot for virtual counseling.',
      tech: ['HTML', 'CSS', 'JavaScript', 'MySQL', 'Google Maps API'],
      image: '/projects/welltech.jpg',
      github: 'https://github.com',
      featured: true,
    },
  ];

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

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <section id="projects" className="section bg-midnight py-section">
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
            Projects
          </motion.h2>
          <motion.p variants={itemVariants} className="text-body-lg text-stone max-w-2xl">
            A selection of machine learning systems, full-stack applications, and research-driven projects built with a focus on real-world problems.
          </motion.p>
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => setSelectedProject(project.id)}
              whileHover={{ y: -8 }}
            >
              <div className="glass p-8 rounded-xl h-full hover:border-stone/60 transition-all overflow-hidden">
                {/* Badge */}
                <div className="inline-block mb-4 px-3 py-1 bg-graphite/50 rounded-full text-body-sm text-cloud border border-slate/30">
                  Featured
                </div>

                {/* Title */}
                <h3 className="text-h3 font-display font-bold mb-4 group-hover:text-ivory transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-body text-stone mb-6">{project.description}</p>

                {/* Problem & Impact */}
                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-body-sm font-semibold text-slate mb-2">Problem</p>
                    <p className="text-body text-stone">{project.problem}</p>
                  </div>
                  <div>
                    <p className="text-body-sm font-semibold text-slate mb-2">Impact</p>
                    <p className="text-body text-stone">{project.impact}</p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-graphite/30 rounded-full text-body-sm text-cloud border border-slate/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      className="text-body-sm font-semibold text-cloud hover:text-ivory transition-colors flex items-center gap-2"
                      whileHover={{ x: 4 }}
                    >
                      GitHub →
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      className="text-body-sm font-semibold text-cloud hover:text-ivory transition-colors flex items-center gap-2"
                      whileHover={{ x: 4 }}
                    >
                      Live Demo →
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
