"use client";
import { useState } from 'react';
import { askQuestion } from '../lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

import { toast } from 'sonner';

const QuestionForm = () => {
    const [question, setQuestion] = useState('');
    const [subject, setSubject] = useState('');
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleSubmit = async () => {
        if (!question || !subject) {
            toast.error("Please fill in both subject and question fields.");
            return;
        }
        setLoading(true);
        try {
            const res = await askQuestion(question, subject);
            setAnswer(res.data.answer);
            toast.success("Answer received successfully!");
        } catch (error) {
            setAnswer('Error fetching answer');
            toast.error("Failed to fetch answer. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success("Code copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Ask a Question</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        placeholder="Enter subject (e.g., Machine Learning)"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <Textarea
                        placeholder="Type your question here"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        rows={5}
                        className="border-gray-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || !question || !subject}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {loading ? 'Asking...' : 'Ask Question'}
                    </Button>
                </CardContent>
            </Card>

            {answer && (
                <Card>
                    <CardHeader>
                        <CardTitle>Answer</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none">
                            <ReactMarkdown
                                components={{
                                    code({ node, inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <div className="relative">
                                                <button
                                                    onClick={() => handleCopy(String(children))}
                                                    className="absolute top-2 right-2 p-1 bg-gray-800 text-white rounded hover:bg-gray-700"
                                                    title="Copy code"
                                                >
                                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                                </button>
                                                {...props}

                                                {String(children).replace(/\n$/, '')}

                                            </div>
                                        ) : (
                                            <code className={className} {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                    ul({ children }) {
                                        return <ul className="list-disc pl-6 space-y-2">{children}</ul>;
                                    },
                                    ol({ children }) {
                                        return <ol className="list-decimal pl-6 space-y-2">{children}</ol>;
                                    },
                                    li({ children }) {
                                        return <li className="text-gray-700">{children}</li>;
                                    },
                                    p({ children }) {
                                        return <p className="text-gray-700 leading-relaxed">{children}</p>;
                                    },
                                    h1({ children }) {
                                        return <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-2">{children}</h1>;
                                    },
                                    h2({ children }) {
                                        return <h2 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{children}</h2>;
                                    },
                                    h3({ children }) {
                                        return <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">{children}</h3>;
                                    },
                                }}
                            >
                                {answer}
                            </ReactMarkdown>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default QuestionForm;