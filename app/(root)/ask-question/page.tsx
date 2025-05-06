import QuestionForm from "@/components/QuestionForm";

export default function AskQuestion() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Ask a Question</h1>
            <QuestionForm />
        </div>
    );
}