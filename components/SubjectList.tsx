"use client";
import { useState, useEffect } from "react";
import { deleteSubject, getSubjects, getNotes, createSubject } from "@/lib/api";
import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const SubjectList = () => {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [notesStatus, setNotesStatus] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [subjectsPerPage] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getSubjects();
        const subjectsData = response?.data;

        if (!subjectsData || !Array.isArray(subjectsData)) {
          throw new Error("Invalid subjects data received");
        }

        setSubjects(subjectsData);

        const notesPromises = subjectsData.map(async (subject: string) => {
          try {
            const notesResponse = await getNotes(subject);
            const notes = notesResponse?.data;
            return {
              subject,
              hasNotes: Array.isArray(notes) && notes.length > 0,
            };
          } catch (err) {
            console.error(`Error fetching notes for ${subject}:`, err);
            return { subject, hasNotes: false };
          }
        });

        const notesResults = await Promise.all(notesPromises);
        const notesStatusMap = notesResults.reduce(
          (acc, { subject, hasNotes }) => {
            acc[subject] = hasNotes;
            return acc;
          },
          {} as { [key: string]: boolean }
        );
        setNotesStatus(notesStatusMap);
      } catch (err) {
        console.error("Error fetching subjects:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load subjects. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (subject: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const confirmed = window.confirm(
      `Are you sure you want to delete the subject "${subject}"? This action cannot be undone.`
    );
    if (confirmed) {
      try {
        await deleteSubject(subject);
        setSubjects(subjects.filter((s) => s !== subject));
        setNotesStatus((prev) => {
          const newStatus = { ...prev };
          delete newStatus[subject];
          return newStatus;
        });
        toast.success("Deletion successful");
        router.refresh();
        if (paginatedSubjects.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error(`Failed to delete: ${error.message || "Unknown error"}`);
      }
    }
  };

  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim()) {
      toast.error("Subject name cannot be empty");
      return;
    }
    if (subjects.includes(newSubject.trim())) {
      toast.error("Subject already exists");
      return;
    }

    try {
      await createSubject(newSubject.trim());
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject("");
      setIsModalOpen(false);
      toast.success("Subject added successfully");
      router.refresh();
    } catch (error) {
      console.error("Error adding subject:", error);
      toast.error(`Failed to add subject: ${error.message || "Unknown error"}`);
    }
  };

  const indexOfLastSubject = currentPage * subjectsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
  const paginatedSubjects = subjects.slice(indexOfFirstSubject, indexOfLastSubject);
  const totalPages = Math.ceil(subjects.length / subjectsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  return (
    <div className="w-full px-4 py-12 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="relative">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="animate-pulse absolute w-32 h-32 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 blur-3xl top-1/4 left-1/3" />
          <div className="animate-ping absolute w-20 h-20 bg-blue-300 rounded-full opacity-10 blur-2xl bottom-10 right-10" />
        </div>

        <div className="flex items-center justify-between px-2">
          <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text z-10 relative">
            Explore Your Subjects
          </h2>
          <Button onClick={() => setIsModalOpen(true)}>Add Subject</Button>
        </div>

        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 z-10 relative"
        >
          {paginatedSubjects.map((subject, index) => (
            <motion.div
              key={subject}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, rotate: 0.5 }}
            >
              <Card className="relative overflow-hidden bg-white/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl group transition-all duration-300">
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500 group-hover:shadow-[0_0_30px_5px_rgba(99,102,241,0.5)] transition-all duration-300 ease-in-out pointer-events-none" />
                <div className="absolute top-2 right-2 z-20">
                  <Button
                    variant="destructive"
                    onClick={(e) => handleDelete(subject, e)}
                    className="border-none bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </Button>
                </div>
                <Link href={`/subjects/${subject}`}>
                  <CardHeader className="p-6 z-10 relative text-center">
                    <div className="mb-2">
                      <span
                        className={`inline-block text-xs font-semibold text-white px-3 py-1 rounded-full shadow ${notesStatus[subject]
                            ? "bg-gradient-to-r from-green-500 to-emerald-600"
                            : "bg-gradient-to-r from-red-500 to-pink-600"
                          }`}
                      >
                        {notesStatus[subject] ? "Notes Available" : "No Notes Uploaded"}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                      {subject}
                    </CardTitle>
                    <p className="mt-2 text-sm text-gray-500">Click to explore details & topics.</p>
                  </CardHeader>
                </Link>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8 z-10 relative space-x-2">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Previous
            </Button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`${currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-white text-blue-600 hover:bg-blue-100"
                    } border border-blue-200`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Add Subject Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subject</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubject}>
              <div className="my-4">
                <Input
                  type="text"
                  placeholder="Enter subject name"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  className="w-full"
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setNewSubject("");
                    setIsModalOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Subject</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SubjectList;