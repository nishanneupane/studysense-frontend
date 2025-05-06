import Flashcards from "@/components/FlashCards";

export default function FlashcardsPage() {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-900">Flashcards</h1>
            <Flashcards />
        </div>
    );
}