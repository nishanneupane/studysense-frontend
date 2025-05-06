"use client";
import { motion } from 'framer-motion';
import SubjectList from '../components/SubjectList';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="w-full p-6">
      {/* <h1 className="text-4xl font-bold mb-6 text-gray-900">StudySense</h1> */}
      <SubjectList />
    </div>
  );
}