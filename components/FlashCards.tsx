"use client"

import { useState } from 'react';
import { generateFlashcards } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

const Flashcards = () => {
    const [subject, setSubject] = useState('');
    const [numFlashcards, setNumFlashcards] = useState(5);
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await generateFlashcards(subject, numFlashcards);
            setFlashcards(res.data);
            setFlipped({});
        } catch (error) {
            alert('Error generating flashcards');
        } finally {
            setLoading(false);
        }
    };

    const toggleFlip = (index) => {
        setFlipped(prev => ({ ...prev, [index]: !prev[index] }));
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-4">
                <Input
                    placeholder="Subject"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                />
                <Input
                    type="number"
                    placeholder="Number of flashcards"
                    value={numFlashcards}
                    onChange={e => setNumFlashcards(e.target.value)}
                    min={1}
                />
                <Button onClick={handleGenerate} disabled={loading || !subject}>
                    {loading ? 'Generating...' : 'Generate'}
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {flashcards.map((fc, index) => (
                    <Card
                        key={index}
                        className="cursor-pointer hover:shadow-lg transition-shadow"
                        onClick={() => toggleFlip(index)}
                    >
                        <CardContent className="p-6 h-40 flex items-center justify-center">
                            <p className="text-center">
                                {flipped[index] ? fc.back : fc.front}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Flashcards;