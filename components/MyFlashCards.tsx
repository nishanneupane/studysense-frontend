"use client";
import { useState, useEffect } from "react";
import { deleteSingleFlashCard, getFlashcards, getSubjects, saveSingleFlashcard } from "../lib/api";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronsUpDown, LucideTrash, Save } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const MyFlashCards = () => {
    const [subjects, setSubjects] = useState<string[]>([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [flashcards, setFlashcards] = useState<{ id: String; question: string; answer: string }[]>([]);
    const [flipped, setFlipped] = useState<boolean[]>([]);
    const [subjectsLoading, setSubjectsLoading] = useState(true);
    const [flashcardsLoading, setFlashcardsLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter()

    // Fetch subjects on mount
    useEffect(() => {
        getSubjects()
            .then((res) => {
                setSubjects(res.data);
                setSubjectsLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching subjects:", err);
                toast.error("Failed to load subjects. Please try again.");
                setSubjectsLoading(false);
            });
    }, []);

    // Fetch flashcards when subject changes
    useEffect(() => {
        if (selectedSubject) {
            setFlashcardsLoading(true);
            getFlashcards(selectedSubject)
                .then((data) => {
                    setFlashcards(data);
                    setFlipped(new Array(data.length).fill(false));
                    setFlashcardsLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching flashcards:", err);
                    toast.error("Failed to load flashcards. Please try again.");
                    setFlashcardsLoading(false);
                });
        }
    }, [selectedSubject]);

    const toggleFlip = (index: number) => {
        setFlipped((prev) => {
            const newFlipped = [...prev];
            newFlipped[index] = !newFlipped[index];
            return newFlipped;
        });
    };

    const deleteFlashCard = async (subject, flashcard: { id: string; question: string; answer: string }) => {
        try {
            await deleteSingleFlashCard(subject, flashcard);
            toast.success("Flashcard Deleted successfully!");
            router.refresh()
        } catch (error) {
            console.error("Error deleting flashcard:", error);
            toast.error("Failed to deleting flashcard. Please try again.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8">
            {/* Subject Selection */}
            <div className="flex justify-center">
                <div className="w-full max-w-md">
                    {subjectsLoading ? (
                        <div className="text-gray-600 text-center">Loading subjects...</div>
                    ) : (
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={cn(
                                        "w-full justify-between border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white/80 backdrop-blur-md",
                                        !selectedSubject && "text-muted-foreground"
                                    )}
                                    disabled={subjects.length === 0}
                                >
                                    {selectedSubject || "Select a subject"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="Search subjects..." />
                                    <CommandList>
                                        <CommandEmpty>No subjects found.</CommandEmpty>
                                        <CommandGroup>
                                            {subjects.map((subj) => (
                                                <CommandItem
                                                    key={subj}
                                                    value={subj}
                                                    onSelect={() => {
                                                        setSelectedSubject(subj);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    {subj}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>

            {/* Flashcards Display */}
            {flashcardsLoading ? (
                <div className="text-gray-600 text-center">Loading flashcards...</div>
            ) : selectedSubject && flashcards.length === 0 ? (
                <div className="text-gray-600 text-center">
                    No flashcards available for {selectedSubject}.
                </div>
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {flashcards.map((fc, index) => {
                        const gradientVariants = [
                            "bg-gradient-to-br from-blue-500 to-purple-600",
                            "bg-gradient-to-br from-green-500 to-teal-600",
                            "bg-gradient-to-br from-red-500 to-pink-600",
                            "bg-gradient-to-br from-yellow-500 to-orange-600",
                            "bg-gradient-to-br from-indigo-500 to-blue-600",
                        ];
                        const randomGradient = gradientVariants[index % gradientVariants.length];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Card
                                    onClick={() => toggleFlip(index)}
                                    className={cn(
                                        "cursor-pointer rounded-xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.3)] border border-neutral-800 transform transition-transform duration-300",
                                        randomGradient,

                                    )}
                                    style={{ perspective: "1000px" }}
                                >
                                    <CardContent
                                        className="p-6 h-48 flex items-center justify-center relative"
                                        style={{
                                            transformStyle: "preserve-3d",

                                            transition: "transform 0.6s",
                                        }}
                                    >
                                        <p
                                            className="text-center text-gray-100 text-lg font-medium tracking-wide absolute w-full"
                                            style={{
                                                backfaceVisibility: "hidden",
                                                transform: flipped[index] ? "rotateY(180deg)" : "rotateY(0deg)",
                                            }}
                                        >
                                            {fc.question}
                                        </p>
                                        <p
                                            className="text-center text-gray-100 text-lg font-medium tracking-wide absolute w-full"
                                            style={{
                                                backfaceVisibility: "hidden",
                                                transform: flipped[index] ? "rotateY(0deg)" : "rotateY(-180deg)",
                                            }}
                                        >
                                            {fc.answer}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex justify-center p-4">
                                        <Button
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent flip when clicking Save
                                                deleteFlashCard(selectedSubject, fc);
                                            }}
                                            className="bg-red-50 hover:bg-white/80 text-black font-semibold rounded-lg px-4 py-2 cursor-pointer"
                                        >
                                            <LucideTrash className="h-4 w-4 mr-2 text-red-500" />
                                            Delete
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </div>
    );
};

export default MyFlashCards;