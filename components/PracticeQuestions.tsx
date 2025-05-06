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
    const [checkLoading, setCheckLoading] = useState(false);

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
            setCheckLoading(true)
            const res = await evaluateAnswer(question, userAnswer, subject);

            setResults(prev => ({ ...prev, [question]: res.data }));
        } catch (error) {
            alert('Error evaluating answer');
        } finally {
            setCheckLoading(false)
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
                        {answers[q.question] && checkLoading ? "Checking ..." : "Check"}
                    </Button>
                    {results[q.question] && (
                        <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 shadow-sm">
                            <p className="text-sm font-medium text-green-700">
                                ✅ <span className="font-semibold">Score:</span> {results[q.question].score}
                            </p>
                            <p className="mt-1 text-sm text-green-700">
                                💬 <span className="font-semibold">Feedback:</span> {results[q.question].feedback}
                            </p>
                        </div>
                    )}

                </div>
            ))}
        </div>
    );
};

export default PracticeQuestions;