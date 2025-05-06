import NotesList from '@/components/NotesList';
import UploadForm from '@/components/UploadForm';

export default async function SubjectPage({ params }: { params: { subject: string } }) {
    const subject = await (params).subject;

    return (
        <div className="container mx-auto p-6">
            <NotesList subject={subject} />
            <UploadForm subject={subject} />
        </div>
    );
}
