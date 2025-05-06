"use client";
import { useState, useEffect } from "react";
import { getSubjects } from "../lib/api";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSubjects()
      .then((res) => setSubjects(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load subjects. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-gradient-to-b from-gray-50 to-gray-100">
        <motion.div
          className="relative flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute w-16 h-16 border-4 border-t-blue-500 border-gray-200 rounded-full"></div>
          <div className="text-blue-500 font-semibold text-lg">Loading...</div>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-gradient-to-b from-gray-50 to-gray-100">
        <motion.p
          className="text-red-400 text-xl font-semibold bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      </div>
    );
  }

  // Empty state
  if (subjects.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-gradient-to-b from-gray-50 to-gray-100">
        <motion.p
          className="text-gray-500 text-xl font-semibold bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          No subjects available.
        </motion.p>
      </div>
    );
  }

  // Main content
  return (
    <div className="w-full px-4 py-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Subjects
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {subjects.map((subject, index) => (
          <motion.div
            key={subject}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <Link href={`/subjects/${subject}`}>
              <Card className="relative overflow-hidden bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="p-6 relative z-10">
                  <CardTitle className="text-xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 truncate">
                    {subject}
                  </CardTitle>
                </CardHeader>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SubjectList;