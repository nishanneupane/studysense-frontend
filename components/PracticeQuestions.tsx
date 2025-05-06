"use client"
import { useState } from 'react';
import { generatePracticeQuestions, evaluateAnswer } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const PracticeQuestions = () => {
    const [subject, setSubject] = useState('');
    const [numQuestions, setNumQuestions] = useState(1);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const res = await generatePracticeQuestions(subject, numQuestions);
            setQuestions(res.data);
            setAnswers({});
            setResults({});
        } catch (error) {
            alert('Error generating questions');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = async (question) => {
        const userAnswer = answers[question];
        if (!userAnswer) return;
        try {
            const res = await evaluateAnswer(question, userAnswer, subject);
            setResults(prev => ({ ...prev, [question]: res.data }));
        } catch (error) {
            alert('Error evaluating answer');
        }
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
                    placeholder="Number of questions"
                    value={numQuestions}
                    onChange={e => setNumQuestions(e.target.value)}
                    min={1}
                />
                <Button onClick={handleGenerate} disabled={loading || !subject}>
                    {loading ? 'Generating...' : 'Generate'}
                </Button>
            </div>
            {questions.map(q => (
                <div key={q.question} className="p-4 bg-white shadow rounded-lg">
                    <p className="font-semibold">{q.question}</p>
                    <Textarea
                        placeholder="Your answer"
                        value={answers[q.question] || ''}
                        onChange={e => setAnswers(prev => ({ ...prev, [q.question]: e.target.value }))}
                        className="mt-2"
                    />
                    <Button
                        onClick={() => handleAnswer(q.question)}
                        className="mt-2"
                        disabled={!answers[q.question]}
                    >
                        Check
                    </Button>
                    {results[q.question] && (
                        <p className="mt-2 text-green-600">Result: {results[q.question].evaluation}</p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PracticeQuestions;