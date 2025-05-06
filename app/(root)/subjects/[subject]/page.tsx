import NotesList from '@/components/NotesList';
import UploadForm from '@/components/UploadForm';
import { useRouter } from 'next/router';


export default function SubjectPage() {
    const router = useRouter();
    const { subject } = router.query;

    if (!subject) return <p className="text-center">Loading...</p>;

    const handleUpload = () => {
        router.reload(); // Refresh notes after upload
    };

    return (
        <div className="container mx-auto p-6">
            <NotesList subject={subject} />
            <UploadForm subject={subject} onUpload={handleUpload} />
        </div>
    );
}