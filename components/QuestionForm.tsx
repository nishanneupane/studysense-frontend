"use client";
import { useState, useEffect } from 'react';
import { askQuestion, getSubjects } from '../lib/api';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, ChevronsUpDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const QuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [subject, setSubject] = useState('');
  const [answer, setAnswer] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [subjectsLoading, setSubjectsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  // Fetch subjects on mount
  useEffect(() => {
    getSubjects()
      .then((res) => {
        if (res.data) {
          setSubjects(res.data);
        }
        setSubjectsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching subjects:', err);
        toast.error('Failed to load subjects. Please try again.');
        setSubjectsLoading(false);
      });
  }, []);

  const handleSubmit = async () => {
    if (!question || !subject) {
      toast.error('Please select a subject and enter a question.');
      return;
    }
    setLoading(true);
    try {
      const res = await askQuestion(question, subject);
      setAnswer(res.data.answer);
      toast.success('Answer received successfully!');
    } catch (error) {
      setAnswer('Error fetching answer');
      toast.error('Failed to fetch answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {subjectsLoading ? (
            <div className="text-gray-600">Loading subjects...</div>
          ) : (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    'w-full justify-between border-gray-300 focus:ring-2 focus:ring-blue-500',
                    !subject && 'text-muted-foreground'
                  )}
                  disabled={subjects.length === 0}
                >
                  {subject || 'Select a subject'}
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
                            setSubject(subj);
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
          <Textarea
            placeholder="Type your question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={5}
            className="border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleSubmit}
            disabled={loading || !question || !subject || subjectsLoading}
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
                        <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
                          <code className={className} {...props}>
                            {String(children).replace(/\n$/, '')}
                          </code>
                        </pre>
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