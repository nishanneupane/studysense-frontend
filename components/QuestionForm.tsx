"use client"
import { useState } from 'react';
import { askQuestion } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const QuestionForm = () => {
    const [question, setQuestion] = useState('');
    const [subject, setSubject] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!question || !subject) return;
        setLoading(true);
        try {
            const res = await askQuestion(question, subject);
            setAnswer(res.data.answer);
        } catch (error) {
            setAnswer('Error fetching answer');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <Input
                placeholder="Subject"
                value={subject}
                onChange={e => setSubject(e.target.value)}
            />
            <Textarea
                placeholder="Type your question here"
                value={question}
                onChange={e => setQuestion(e.target.value)}
            />
            <Button onClick={handleSubmit} disabled={loading || !question || !subject}>
                {loading ? 'Asking...' : 'Ask'}
            </Button>
            {answer && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                    <p className="font-semibold">Answer:</p>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};

export default QuestionForm;