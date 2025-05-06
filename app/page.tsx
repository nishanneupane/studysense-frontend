"use client";
import { motion } from 'framer-motion';
import SubjectList from '../components/SubjectList';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
        >
          Welcome to StudySense
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
        >
          Unlock your potential with expertly curated study resources across a wide range of subjects.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3 rounded-full"
          >
            <a href="#subjects">Explore Subjects</a>
          </Button>
        </motion.div>
      </section>

      {/* Subject List Section */}
      <section id="subjects" className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
          Browse Subjects
        </h2>
        <SubjectList />
      </section>
    </div>
  );
}