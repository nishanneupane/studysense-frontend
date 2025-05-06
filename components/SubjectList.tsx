"use client";
import { useState, useEffect } from "react";
import { getSubjects } from "../lib/api";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubjects()
      .then((res) => setSubjects(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading subjects...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjects.map((subject) => (
        <Link key={subject} href={`/subjects/${subject}`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                {subject}
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default SubjectList;
